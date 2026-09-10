import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import News from "../models/News.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import { nextAdminSessionVersion } from "../utils/adminSessions.js";
import { verifyIdToken } from "../services/googleAuthService.js";
import { protect, managerOnly } from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Middleware to protect customer routes and validate token version
export async function protectCustomer(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findById(decoded.id).select("-password");
    if (!customer || !customer.isActive) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (
      typeof decoded.tokenVersion !== "undefined" &&
      Number(decoded.tokenVersion) !== Number(customer.tokenVersion || 0)
    ) {
      return res.status(401).json({
        error: "Your session has been invalidated. Please login again.",
        code: "TOKEN_VERSION_MISMATCH",
      });
    }
    req.customer = decoded;
    req.customerRecord = customer;
    return next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Token expired"
        : "Invalid or expired token";
    return res.status(401).json({ error: message });
  }
}

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const customer = await Customer.create({ email, password, name, phone });

    const token = jwt.sign(
      {
        id: customer._id,
        email: customer.email,
        tokenVersion: customer.tokenVersion || 0,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      customer: {
        id: customer._id,
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dealer Register
router.post("/dealer/register", async (req, res) => {
  try {
    const { email, password, name, phone, companyName, gstNumber, location } =
      req.body;
    if (!email || !password || !gstNumber) {
      return res
        .status(400)
        .json({ error: "Email, password, and GST Number required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await User.create({
      email,
      password,
      name,
      phone,
      companyName,
      gstNumber,
      address: { city: location },
      role: "dealer",
    });

    const token = jwt.sign(
      { id: user._id, role: "dealer", tokenVersion: user.tokenVersion || 0 },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: "dealer",
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/manager/register", async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Name, email and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await User.create({
      email,
      password,
      name,
      phone,
      role: "manager",
    });

    const token = jwt.sign(
      { id: user._id, role: "manager", tokenVersion: user.tokenVersion || 0 },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: "manager",
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/manager/customers", protect, managerOnly, async (req, res) => {
  try {
    const customers = await Customer.find({ managerId: req.user._id }).select(
      "-password",
    );
    const normalized = customers.map((customer) => ({
      id: customer._id,
      email: customer.email,
      name: customer.name || customer.email.split("@")[0],
      phone: customer.phone,
      picture: customer.picture,
      isActive: customer.isActive,
      lastLogin: customer.lastLogin,
      createdAt: customer.createdAt,
    }));
    res.json({ success: true, data: normalized });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const username = (req.body.username || req.body.email || "").trim();
    const password = req.body.password;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username/email and password required" });
    }

    const admin = await Admin.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() },
      ],
    });

    if (admin) {
      if (!admin.isActive) {
        return res.status(403).json({ error: "Admin account disabled" });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      admin.lastLogin = new Date();
      await admin.save();

      const sessionVersion = nextAdminSessionVersion(admin._id.toString());
      const token = jwt.sign(
        {
          id: admin._id,
          role: "admin",
          sessionVersion,
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" },
      );

      return res.json({
        token,
        user: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: "admin",
        },
      });
    }

    // Try user login first
    const user = await User.findOne({
      $or: [
        { email: username.toLowerCase() },
        { name: new RegExp(`^${username}$`, "i") },
      ],
    });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (!user.isActive) {
        return res.status(403).json({ error: "Account disabled" });
      }

      if (user.role === "admin") {
        user.adminSessionVersion = Number(user.adminSessionVersion || 0) + 1;
      } else {
        user.tokenVersion = Number(user.tokenVersion || 0);
      }
      user.lastLogin = new Date();
      await user.save();

      const payload = {
        id: user._id,
        role: user.role,
      };
      if (user.role === "admin") {
        payload.sessionVersion = user.adminSessionVersion;
      } else {
        payload.tokenVersion = user.tokenVersion;
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          managerId: user.managerId,
        },
      });
    }

    const customer = await Customer.findOne({ email: username.toLowerCase() });
    if (!customer || !(await customer.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!customer.isActive) {
      return res.status(403).json({ error: "Account disabled" });
    }

    customer.lastLogin = new Date();
    await customer.save();

    const token = jwt.sign(
      {
        id: customer._id,
        role: "customer",
        tokenVersion: customer.tokenVersion || 0,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        id: customer._id,
        name: customer.name || customer.email.split("@")[0],
        email: customer.email,
        role: "customer",
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: "Google ID token required" });
    }

    const userData = await verifyIdToken(idToken);
    const { name, email, picture, sub } = userData || {};
    if (!email) {
      return res.status(400).json({ error: "Google account email missing" });
    }

    const normalizedEmail = email.toLowerCase();
    let customer = await Customer.findOne({ email: normalizedEmail });
    if (!customer) {
      customer = await Customer.create({
        email: normalizedEmail,
        name: name || normalizedEmail.split("@")[0],
        picture,
        googleId: sub,
        password: `google-${sub}-${Date.now()}-${Math.random()}`,
      });
    } else {
      if (!customer.isActive) {
        return res.status(403).json({ error: "Account disabled" });
      }
      customer.name = customer.name || name;
      customer.picture = picture || customer.picture;
      customer.googleId = customer.googleId || sub;
      customer.lastLogin = new Date();
      await customer.save();
    }

    if (!customer.isActive) {
      return res.status(403).json({ error: "Account disabled" });
    }

    const token = jwt.sign(
      {
        id: customer._id,
        role: "customer",
        tokenVersion: customer.tokenVersion || 0,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        id: customer._id,
        name: customer.name || email.split("@")[0],
        email: customer.email,
        picture: customer.picture,
        role: "customer",
      },
    });
  } catch (err) {
    res.status(401).json({ error: err.message || "Google login failed" });
  }
});

// Create/reset admin account (setup endpoint)
router.post("/create-admin", async (req, res) => {
  try {
    const { username, password, email, setupKey } = req.body;
    const expectedKey = process.env.SETUP_KEY || "dpt-setup-2026";
    if (setupKey !== expectedKey) {
      return res.status(403).json({ error: "Invalid setup key" });
    }
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    const adminEmail = email || `${username}@dpt.com`;
    await Admin.deleteOne({ username: username.toLowerCase() });
    const admin = await Admin.create({
      username: username.toLowerCase(),
      email: adminEmail,
      password,
    });
    res.json({
      success: true,
      message: `Admin "${username}" created. You can now login at /login/admin`,
      admin: { username: admin.username, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user profile
router.get("/me", protectCustomer, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select(
      "-password",
    );
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update current user profile
router.put("/me", protectCustomer, async (req, res) => {
  try {
    const { name, phone, picture, address } = req.body;
    const customer = await Customer.findById(req.customer.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    if (typeof name !== "undefined") customer.name = name;
    if (typeof phone !== "undefined") customer.phone = phone;
    if (typeof picture !== "undefined") customer.picture = picture;
    if (typeof address !== "undefined") customer.address = address;

    await customer.save();
    res.json({ success: true, data: customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function getOrCreateUserFromCustomer(customerId) {
  const customer = await Customer.findById(customerId);
  if (!customer) return null;

  let user = await User.findOne({ email: customer.email });
  if (!user) {
    user = await User.create({
      name: customer.name || customer.email.split("@")[0],
      email: customer.email,
      password: `customer-${customer._id}-${Date.now()}`,
      role: "customer",
      isActive: customer.isActive,
    });
  }
  return user;
}

// Browse active products for customers.
router.get("/products", async (req, res) => {
  try {
    const { search, category, page = 1, limit = 24 } = req.query;

    // Find unavailable brands and exclude their products
    const unavailableBrands = await Brand.find({ isAvailable: false }).distinct(
      "name",
    );

    const filter = { isActive: true, stockStatus: { $ne: "Out of Stock" } };
    if (unavailableBrands.length > 0) {
      // Create regex array for exact case-insensitive match or just string array if exact
      // Assuming product brand is stored as string matching brand name
      filter.brand = { $nin: unavailableBrands };
    }

    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    }).catch(() => null);
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Request quote: customer creates an order in pending approval.
router.post("/products/:id/request", protectCustomer, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });

    const user = await getOrCreateUserFromCustomer(req.customer.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });

    const quantity = Math.max(Number(req.body.quantity || 1), 1);
    const order = await Order.create({
      customerId: user._id,
      productId: product._id,
      quantity,
      totalAmount: Number(product.price_inr || product.mrp_inr || 0) * quantity,
      requestMessage: req.body.message,
      timeline: [
        {
          status: "pending_approval",
          changedBy: user._id,
          note: "Quote requested by customer",
        },
      ],
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/orders", protectCustomer, async (req, res) => {
  try {
    const user = await getOrCreateUserFromCustomer(req.customer.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });

    const orders = await Order.find({ customerId: user._id })
      .populate("dealerId", "name email phone companyName")
      .populate("productId", "name image price_inr")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/orders/:id/cancel", protectCustomer, async (req, res) => {
  try {
    const user = await getOrCreateUserFromCustomer(req.customer.id);
    const order = await Order.findOne({
      _id: req.params.id,
      customerId: user?._id,
    });
    if (!order)
      return res.status(404).json({ success: false, error: "Order not found" });
    if (!["pending_approval", "approved", "quoted"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: "This order can no longer be cancelled",
      });
    }

    order.status = "cancelled";
    order.timeline.push({
      status: "cancelled",
      changedBy: user._id,
      note: req.body.note || "Cancelled by customer",
    });
    await order.save();
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get published news
router.get("/news", async (req, res) => {
  try {
    const { brand } = req.query;
    const filter = { isPublished: true };
    if (brand) {
      filter.brand = new RegExp(brand, "i");
    }
    const news = await News.find(filter).sort({ publishDate: -1 });
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
