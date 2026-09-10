import express from "express";
import Cart from "../models/Cart.js";
import Lead from "../models/Lead.js";
import Product from "../models/Product.js";

const router = express.Router();

// Helper to get or create cart
async function getCart({ cartId, userId, sessionId, ip, device }) {
  let cart = null;
  if (cartId) {
    cart = await Cart.findById(cartId);
  } else if (userId) {
    cart = await Cart.findOne({ userId });
  } else if (sessionId) {
    cart = await Cart.findOne({ sessionId });
  }

  if (!cart) {
    cart = new Cart({ userId, sessionId, ip, device, items: [] });
    await cart.save();
  }
  cart.ip = ip || cart.ip;
  cart.device = device || cart.device;
  cart.lastActivityAt = new Date();
  return cart;
}

// Add to cart
router.post("/add-to-cart", async (req, res) => {
  try {
    const { cartId, productId, quantity, sessionId, customer = {} } = req.body;
    const qty = Number(quantity || 0);

    if (!productId || qty <= 0) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Product ID and valid quantity required",
        });
    }

    const product =
      (await Product.findById(productId).catch(() => null)) ||
      (await Product.findOne({ productId }));
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    if (!product.isActive || product.stockStatus === "Out of Stock") {
      return res
        .status(400)
        .json({
          success: false,
          error: "Product is out of stock and cannot be added to cart",
        });
    }

    if (qty > Number(product.stock_quantity || 0)) {
      return res.status(400).json({
        success: false,
        error: `Only ${product.stock_quantity || 0} unit(s) available for ${product.name}`,
      });
    }

    const itemPrice = Number(product.price_inr ?? product.mrp_inr ?? 0);
    const device = req.get("user-agent") || req.body.device || "Unknown device";
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      req.ip;
    const cart = await getCart({
      cartId,
      userId: req.user?.id,
      sessionId: sessionId || cartId || `guest-${Date.now()}`,
      ip,
      device,
    });

    const existingItem = cart.items.find(
      (item) => String(item.productId) === String(product._id),
    );
    if (existingItem) {
      const nextQty = existingItem.quantity + qty;
      if (nextQty > Number(product.stock_quantity || 0)) {
        return res.status(400).json({
          success: false,
          error: `Cannot add ${qty}. Only ${product.stock_quantity - existingItem.quantity} more available for ${product.name}`,
        });
      }
      existingItem.quantity = nextQty;
      existingItem.priceAtAdd = itemPrice;
    } else {
      cart.items.push({
        productId: String(product._id),
        quantity: qty,
        priceAtAdd: itemPrice,
      });
    }

    await cart.save();
    await Lead.create({
      customer: customer.name || "Website Visitor",
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      product: product.name,
      type: "Order Request",
      status: "New",
      notes: `New Cart Activity | Qty: ${qty} | Price: ${itemPrice} | IP: ${ip} | Device: ${device} | Session: ${cart.sessionId || cart._id}`,
    });

    const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    res.json({
      success: true,
      cartId: cart._id,
      cartCount,
      subtotal: cart.subtotal,
      cart,
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update cart quantity
router.post("/update-quantity", async (req, res) => {
  try {
    const { cartId, itemId, quantity } = req.body;
    if (!itemId || quantity === undefined) {
      return res
        .status(400)
        .json({ success: false, error: "Item ID and quantity required" });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    // Assuming itemId refers to productId here
    const itemIndex = cart.items.findIndex(
      (item) => String(item.productId) === String(itemId),
    );
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      res.json({ success: true, cart, subtotal: cart.subtotal });
    } else {
      res.status(404).json({ success: false, error: "Item not in cart" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Remove from cart
router.post("/remove-item", async (req, res) => {
  try {
    const { cartId, itemId } = req.body;
    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, error: "Item ID required" });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => String(item.productId) !== String(itemId),
    );
    await cart.save();

    res.json({ success: true, cart, subtotal: cart.subtotal });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Apply promo code
router.post("/apply-promo", async (req, res) => {
  try {
    const { cartId, promoCode } = req.body;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    // Basic mock logic for promo code
    if (promoCode === "DISCOUNT10") {
      cart.promoCode = promoCode;
      // In a real scenario, applying a promo code would involve calculating a discount and storing it
      // For now, we just save the code. The subtotal calculation might need adjusting to handle discounts.
      await cart.save();
      // Example of mocking a new total
      const newTotal = cart.subtotal * 0.9;
      res.json({ success: true, cart, newTotal });
    } else {
      res.status(400).json({ success: false, error: "Invalid promo code" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
