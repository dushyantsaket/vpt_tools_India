import mongoose from 'mongoose';

const SalesBillSchema = new mongoose.Schema({
  billNo: { type: String, unique: true },
  billType: { type: String, enum: ['gst', 'normal'], default: 'gst' },
  date: { type: Date, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: Number,
    price: Number,
    gst: Number,
    total: Number
  }],
  subtotal: Number,
  discount: { type: Number, default: 0 },
  gstTotal: Number,
  grandTotal: Number,
  paidAmount: { type: Number, default: 0 },
  paymentMode: { type: String, enum: ['cash', 'card', 'upi', 'credit'], default: 'cash' },
  paymentStatus: { type: String, enum: ['paid', 'pending', 'partial'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.SalesBill || mongoose.model('SalesBill', SalesBillSchema);
