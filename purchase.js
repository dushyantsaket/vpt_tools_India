import mongoose from 'mongoose';

const purchaseItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true }, 
  quantity: { type: Number, required: true },
  purchasePrice: { type: Number, required: true }, 
  taxRate: { type: Number, default: 0 }, 
  taxAmount: { type: Number, default: 0 },
  total: { type: Number, required: true }
});

const purchaseSchema = new mongoose.Schema({
  purchaseNumber: { type: String, required: true, unique: true },
  supplierInvoiceNumber: { type: String }, // The bill number from the supplier
  date: { type: Date, default: Date.now },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  supplierName: { type: String, default: 'Direct Supplier' },
  items: [purchaseItemSchema],
  subTotal: { type: Number, required: true },
  totalTax: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },
  balanceDue: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['paid', 'partial', 'unpaid'], default: 'unpaid' },
  status: { type: String, enum: ['received', 'pending', 'cancelled'], default: 'received' },
  billImage: { type: String }, // URL/Path to the uploaded purchasing bill scan
  billFile: { name: String, type: String, dataUrl: String },
  extractedText: { type: String },
  productsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  notes: { type: String }
}, { timestamps: true });

export default mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);
