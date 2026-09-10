import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import PDFDocument from 'pdfkit';
import path from 'path';

import Party from '../models/Party.js';
import Item from '../models/Product.js'; // Assuming Product is used for Item
import Godown from '../models/Godown.js';
import PurchaseBill from '../models/PurchaseBill.js';
import SalesBill from '../models/SalesBill.js';
import Quotation from '../models/Quotation.js';
import CreditNote from '../models/CreditNote.js';
import DeliveryChallan from '../models/DeliveryChallan.js';
import ProformaInvoice from '../models/ProformaInvoice.js';
import StockMovement from '../models/StockMovement.js';

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ==================== API ROUTES ====================

// 1. GODOWN MANAGEMENT (34 Godowns)
router.post('/godowns', async (req, res) => {
  try {
    const godown = new Godown(req.body);
    await godown.save();
    res.status(201).json(godown);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/godowns', async (req, res) => {
  try {
    const godowns = await Godown.find().populate('items.item');
    res.json(godowns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/godowns/:id/stock', async (req, res) => {
  try {
    const godown = await Godown.findById(req.params.id).populate('items.item');
    if (!godown) return res.status(404).json({ error: 'Godown not found' });

    const totalItems = godown.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalValue = godown.items.reduce((sum, i) => sum + (i.quantity * (i.item?.sellingPrice || 0)), 0);
    
    res.json({
      godown: godown.name,
      totalItems,
      totalValue,
      items: godown.items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. BULK ITEMS ADD via Excel Upload
router.post('/items/bulk-upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    const items = [];
    for (const row of data) {
      const item = new Item({
        name: row.Name,
        sku: row.SKU,
        hsn: row.HSN,
        purchasePrice: row.PurchasePrice,
        sellingPrice: row.SellingPrice,
        currentStock: row.Stock || 0,
        minStock: row.MinStock || 5,
        godownLocation: row.Godown || 'Main',
        barcode: row.Barcode
      });
      await item.save();
      items.push(item);
    }
    
    res.json({ message: `${items.length} items added successfully`, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. BARCODE SCAN - Auto add item
router.post('/items/scan', async (req, res) => {
  try {
    const { barcode } = req.body;
    const item = await Item.findOne({ barcode });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. PURCHASE BILL with Image Upload
router.post('/purchases/new', upload.single('billImage'), async (req, res) => {
  try {
    const purchaseData = req.body.data ? JSON.parse(req.body.data) : req.body;
    const purchase = new PurchaseBill({
      ...purchaseData,
      billImage: req.file ? req.file.path : null
    });
    
    await purchase.save();
    
    // Update stock
    for (const item of purchase.items) {
      const product = await Item.findById(item.item);
      if (product) {
        const oldStock = product.currentStock || 0;
        product.currentStock = oldStock + item.quantity;
        await product.save();
        
        // Record stock movement
        await StockMovement.create({
          item: item.item,
          type: 'purchase',
          quantity: item.quantity,
          previousStock: oldStock,
          newStock: product.currentStock,
          reference: purchase.billNo
        });
      }
    }
    
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. CREATE SALES BILL (GST/Normal)
router.post('/sales/new', async (req, res) => {
  try {
    const salesData = req.body;
    const sales = new SalesBill(salesData);
    
    // Check stock availability
    for (const item of sales.items) {
      const product = await Item.findById(item.item);
      if (product && (product.currentStock || 0) < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}. Available: ${product.currentStock || 0}` 
        });
      }
    }
    
    await sales.save();
    
    // Reduce stock
    for (const item of sales.items) {
      const product = await Item.findById(item.item);
      if (product) {
        const oldStock = product.currentStock || 0;
        product.currentStock = oldStock - item.quantity;
        await product.save();
        
        await StockMovement.create({
          item: item.item,
          type: 'sale',
          quantity: -item.quantity,
          previousStock: oldStock,
          newStock: product.currentStock,
          reference: sales.billNo
        });
      }
    }
    
    // Update party balance
    if (sales.customer) {
      const party = await Party.findById(sales.customer);
      if (party) {
        party.currentBalance = (party.currentBalance || 0) + (sales.grandTotal - sales.paidAmount);
        await party.save();
      }
    }
    
    res.status(201).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. GET ALL TRANSACTIONS with Filters
router.get('/transactions/all', async (req, res) => {
  try {
    const { startDate, endDate, type, page = 1, limit = 20 } = req.query;
    
    let query = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    
    let sales = [], purchases = [];
    
    if (!type || type === 'sales') {
      sales = await SalesBill.find(query)
        .populate('customer')
        .populate('items.item')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip((page - 1) * limit);
    }
    
    if (!type || type === 'purchases') {
      purchases = await PurchaseBill.find(query)
        .populate('supplier')
        .populate('items.item')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip((page - 1) * limit);
    }
    
    res.json({
      sales,
      purchases,
      page: parseInt(page),
      total: sales.length + purchases.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. GET 365 DAYS SALES DATA with PDF Download
router.get('/sales/report/:days', async (req, res) => {
  try {
    const days = parseInt(req.params.days) || 365;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const sales = await SalesBill.find({
      createdAt: { $gte: startDate }
    }).populate('customer').sort({ createdAt: -1 });
    
    const totalAmount = sales.reduce((sum, s) => sum + s.grandTotal, 0);
    const totalItems = sales.reduce((sum, s) => sum + s.items.reduce((i, item) => i + item.quantity, 0), 0);
    
    res.json({
      period: `${days} days`,
      totalSales: sales.length,
      totalAmount,
      totalItems,
      data: sales
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. DOWNLOAD SALES REPORT as PDF
router.get('/sales/report/pdf/:days', async (req, res) => {
  try {
    const days = parseInt(req.params.days) || 365;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const sales = await SalesBill.find({
      createdAt: { $gte: startDate }
    }).populate('customer');
    
    const doc = new PDFDocument();
    const filename = `sales_report_${days}_days.pdf`;
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');
    
    doc.pipe(res);
    
    // Header
    doc.fontSize(20).text('DUSHYANT POWER TOOLS', { align: 'center' });
    doc.fontSize(12).text('Sales Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Period: Last ${days} days`, { align: 'center' });
    doc.moveDown();
    
    // Summary
    const totalSales = sales.length;
    const totalAmount = sales.reduce((sum, s) => sum + s.grandTotal, 0);
    
    doc.fontSize(12).text(`Total Sales: ${totalSales}`, { continued: true });
    doc.text(`  |  Total Amount: INR ${totalAmount.toLocaleString()}`, { align: 'right' });
    doc.moveDown();
    
    // Table Header
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Date', 50, doc.y, { continued: true });
    doc.text('Bill No', 120, doc.y, { continued: true });
    doc.text('Customer', 220, doc.y, { continued: true });
    doc.text('Amount', 400, doc.y, { continued: true });
    doc.text('Status', 480, doc.y);
    doc.moveDown();
    
    // Table Rows
    doc.font('Helvetica');
    sales.forEach(sale => {
      const customerName = sale.customer?.name || 'Walk-in';
      doc.text(new Date(sale.createdAt).toLocaleDateString(), 50, doc.y, { continued: true });
      doc.text(sale.billNo || '-', 120, doc.y, { continued: true });
      doc.text(customerName, 220, doc.y, { continued: true });
      doc.text(`INR ${sale.grandTotal.toLocaleString()}`, 400, doc.y, { continued: true });
      doc.text(sale.paymentStatus, 480, doc.y);
      doc.moveDown();
    });
    
    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. CREATE QUOTATION
router.post('/quotations/new', async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.status(201).json(quotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. CONVERT QUOTATION TO SALES BILL
router.post('/quotations/:id/convert', async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    
    const salesBill = new SalesBill({
      billNo: `INV-${Date.now()}`,
      billType: 'gst',
      customer: quotation.customer,
      items: quotation.items,
      subtotal: quotation.subtotal,
      grandTotal: quotation.grandTotal,
      paymentStatus: 'pending'
    });
    
    await salesBill.save();
    
    quotation.status = 'converted';
    await quotation.save();
    
    res.json({ message: 'Quotation converted to sales bill', salesBill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 11. CREATE DELIVERY CHALLAN
router.post('/delivery-challans', async (req, res) => {
  try {
    const challan = new DeliveryChallan(req.body);
    await challan.save();
    res.status(201).json(challan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
  
