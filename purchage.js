import express from 'express';
import Purchase from '../models/Purchase.js';
import Product from '../models/Product.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, adminOnly);

const parseBillItems = (text = '') => {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const items = [];
  for (const line of lines) {
    const parts = line.split(/[,\t|]+/).map((part) => part.trim()).filter(Boolean);
    if (parts.length >= 3) {
      const name = parts[0];
      const quantity = Number(parts[1]) || 1;
      const purchasePrice = Number(String(parts[2]).replace(/[^\d.]/g, '')) || 0;
      if (name && purchasePrice > 0) items.push({ name, quantity, purchasePrice });
      continue;
    }
    const match = line.match(/^(.+?)\s+(\d+)\s+(\d+(?:\.\d+)?)$/);
    if (match) {
      items.push({ name: match[1].trim(), quantity: Number(match[2]), purchasePrice: Number(match[3]) });
    }
  }
  return items;
};

// Create Purchase
router.post('/', async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).json({ success: true, data: purchase });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all Purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('supplier', 'name').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bulk Scan endpoint (Placeholder for logic)
router.post('/bulk-scan', async (req, res) => {
  try {
    const billText = req.body.billText || req.body.extractedText || '';
    const parsedItems = req.body.items?.length ? req.body.items : parseBillItems(billText);
    if (!parsedItems.length) {
      return res.status(400).json({
        success: false,
        message: 'No bill items found. Use one item per line: Product Name, Qty, Purchase Price',
      });
    }

    const products = [];
    const purchaseItems = [];
    for (const item of parsedItems) {
      const quantity = Math.max(Number(item.quantity || 1), 1);
      const purchasePrice = Number(item.purchasePrice || item.price || 0);
      const sellingPrice = Math.round(purchasePrice * 1.3);
      const product = await Product.create({
        name: item.name,
        category: item.category || 'Purchased Stock',
        brand: item.brand || 'DPT',
        description: `Auto-created from purchase bill. Purchase Rs ${purchasePrice}, selling Rs ${sellingPrice}.`,
        price_inr: sellingPrice,
        mrp_inr: sellingPrice,
        stock_quantity: quantity,
        isAdminAdded: true,
      });
      products.push(product);
      purchaseItems.push({
        product: product._id,
        name: item.name,
        quantity,
        purchasePrice,
        taxRate: Number(item.taxRate || 0),
        taxAmount: 0,
        total: purchasePrice * quantity,
      });
    }

    const subTotal = purchaseItems.reduce((sum, item) => sum + item.total, 0);
    const purchase = await Purchase.create({
      purchaseNumber: req.body.purchaseNumber || `PUR-${Date.now().toString().slice(-8)}`,
      supplierInvoiceNumber: req.body.supplierInvoiceNumber || req.body.invoiceNumber,
      supplierName: req.body.supplierName || 'Bill Upload Supplier',
      items: purchaseItems,
      subTotal,
      totalTax: 0,
      grandTotal: subTotal,
      amountPaid: Number(req.body.amountPaid || 0),
      balanceDue: subTotal - Number(req.body.amountPaid || 0),
      paymentStatus: Number(req.body.amountPaid || 0) >= subTotal ? 'paid' : Number(req.body.amountPaid || 0) > 0 ? 'partial' : 'unpaid',
      status: req.body.status || 'received',
      billFile: req.body.billFile,
      extractedText: billText,
      productsCreated: products.map((product) => product._id),
      notes: 'Bulk scan import with 30 percent selling margin.',
    });

    res.status(201).json({
      success: true,
      message: 'Scan processed and products added to inventory.',
      data: purchase,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
