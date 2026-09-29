import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import adminRoutes from "./routes/admin.js";
import dealerRoutes from "./routes/dealer.js";
import customerAuthRoutes from "./routes/customerAuth.js";
import cartRoutes from "./routes/cart.js";
import analyticsRoutes from "./routes/analytics.js";
import mediaRoutes from "./routes/media.js";
import folderRoutes from "./routes/folders.js";
import publicDealerRoutes from "./routes/publicDealer.js";
import sessionAuthRoutes from "./routes/sessionAuth.js";
import videoRoutes from "./routes/videos.js";
import reviewApiRoutes from "./routes/review-api.js";
import contentRoutes from "./routes/content.js";

// New Admin Panel Routes
import partyRoutes from "./routes/parties.js";
import invoiceRoutes from "./routes/invoices.js";
import quotationRoutes from "./routes/quotations.js";
import purchaseRoutes from "./routes/purchases.js";
import expenseRoutes from "./routes/expenses.js";
import godownRoutes from "./routes/godowns.js";
import inventoryRoutes from "./routes/inventory.js";
import transactionRoutes from "./routes/transactions.js";
import billingInventoryRoutes from "./routes/billing_inventory.js";
import orderRoutes from "./routes/orders.js";
import warrantyRoutes from "./routes/warranty.js";
import paymentRoutes from "./routes/payment.js";

// Employee Management Module Routes
import employeeRoutes from "./routes/employee.js";
import employeeManagementRoutes from "./routes/employeeManagement.js";
import adminOrderRoutes from "./routes/adminOrders.js";
import employeeHRRoutes from "./routes/employeeHR.js";
import newsRoutes from "./routes/news.js";

import User from "./models/User.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter(
  (key) => !process.env[key] || !String(process.env[key]).trim(),
);

if (missingEnvVars.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missingEnvVars.join(", "),
  );
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 5001);
const rateBuckets = new Map();

app.disable("x-powered-by");
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

const sanitizePayload = (value) => {
  if (!value || typeof value !== "object") return value;
  for (const key of Object.keys(value)) {
    if (key.startsWith("$") || key.includes(".")) {
      delete value[key];
      continue;
    }
    if (typeof value[key] === "string") {
      value[key] = value[key]
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/javascript:/gi, "");
    } else {
      sanitizePayload(value[key]);
    }
  }
  return value;
};

const securityHeaders = (_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
};

const rateLimit = (req, res, next) => {
  const key = req.ip || req.socket?.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const max = Number(process.env.RATE_LIMIT_MAX || 500);
  const bucket = rateBuckets.get(key) || { count: 0, resetAt: now + windowMs };

  if (bucket.resetAt < now) {
    bucket.count = 0;
    bucket.resetAt = now + windowMs;
  }
  bucket.count += 1;
  rateBuckets.set(key, bucket);

  if (bucket.count > max) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }
  next();
};

/* ── Middleware ─────────────────────────────────────────────────────────── */
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL].filter(Boolean)
    : [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5174",
      ];

app.use(compression());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin))
        return callback(null, true);
      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  }),
);
app.use(securityHeaders);
app.use(rateLimit);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
// Add support for text/plain payload (often used by navigator.sendBeacon)
app.use(express.text({ type: "text/plain", limit: "2mb" }));

// Session configuration (store in MongoDB)
const sessionSecret = process.env.SESSION_SECRET || "dpt-session-secret";
app.use(
  session({
    name: process.env.SESSION_COOKIE_NAME || "dpt_sid",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGO_URI ||
        "mongodb://localhost:27017/dushyant_power_tools",
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  }),
);

app.use((req, _res, next) => {
  sanitizePayload(req.body);
  sanitizePayload(req.query);
  sanitizePayload(req.params);
  next();
});

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve uploaded files with long-lived caching for static media
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "30d",
    immutable: true,
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  }),
);

const policyPdfPaths = [
  path.join(__dirname, "..", "public", "VPT-Tools-India-Policy-Handbook.pdf"),
  path.join(__dirname, "..", "dist", "VPT-Tools-India-Policy-Handbook.pdf"),
];

app.get("/api/company-policy-pdf", (_req, res) => {
  const policyPdfPath = policyPdfPaths.find((filePath) =>
    fs.existsSync(filePath),
  );

  if (!policyPdfPath) {
    return res.status(404).json({
      success: false,
      error:
        "VPT-Tools-India-Policy-Handbook.pdf is missing from the public assets.",
    });
  }

  return res.sendFile(policyPdfPath, {
    headers: {
      "Content-Disposition":
        'inline; filename="VPT-Tools-India-Policy-Handbook.pdf"',
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
});

/* ── Routes ─────────────────────────────────────────────────────────────── */
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionAuthRoutes);
app.use("/api/dealer-applications", publicDealerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dealer", dealerRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/reviews", reviewApiRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/news", newsRoutes);

// New Admin Panel Routes
app.use("/api/parties", partyRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/godowns", godownRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/billing-inventory", billingInventoryRoutes); // New complete backend routes
app.use("/api/orders", orderRoutes);
app.use("/api/warranty", warrantyRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/create-order", paymentRoutes);
app.use("/complete-order", paymentRoutes);

// Employee Management Module API Mounts
app.use("/api/employee", employeeRoutes);
app.use("/api/employee-admin", employeeManagementRoutes);
app.use("/api/employee-hr", employeeHRRoutes);

// New Routes for Checkout, Analytics & Customer Auth
app.use("/api/customer", customerAuthRoutes);
app.use("/cart", cartRoutes); // Root level as per frontend expectation
app.use("/", analyticsRoutes); // Mounts /1/events and /rd/uedata at root

/* ── Health Check ───────────────────────────────────────────────────────── */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), time: new Date() });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error Handler (must be after routes)
app.use(errorHandler);

/* ── MongoDB Connect + Seed default admins ────────────────────────────────── */
async function seedDefaultAdmins() {
  try {
    const { default: Admin } = await import("./models/Admin.js");

    const adminPass = process.env.ADMIN_SEED_PASSWORD || "change-me-admin-2026";
    const adminData = [
      {
        username: "dushyant",
        name: "Dushyant",
        email: "dushyant@dpt.com",
        password: adminPass,
        role: "admin",
      },
      {
        username: "ram",
        name: "Ram",
        email: "ram@dpt.com",
        password: adminPass,
        role: "admin",
      },
      {
        username: "admin",
        name: "admin",
        email: "admin@dpt.com",
        password: adminPass,
        role: "admin",
      },
    ];

    for (const data of adminData) {
      // Sync Admin model
      let adminDoc = await Admin.findOne({
        $or: [
          { username: data.username.toLowerCase() },
          { email: data.email.toLowerCase() },
        ],
      });
      if (!adminDoc) {
        await Admin.create({
          username: data.username.toLowerCase(),
          email: data.email.toLowerCase(),
          password: data.password,
        });
        console.log(`✅ Admin created: ${data.username}`);
      } else {
        adminDoc.password = data.password;
        await adminDoc.save();
        console.log(`✅ Admin password synced: ${data.username}`);
      }

      // Sync User model (backup)
      let userDoc = await User.findOne({ email: data.email.toLowerCase() });
      if (!userDoc) {
        await User.create({
          name: data.name,
          email: data.email.toLowerCase(),
          password: data.password,
          role: "admin",
        });
        console.log(`✅ User admin created: ${data.name}`);
      } else {
        userDoc.password = data.password;
        userDoc.role = "admin";
        await userDoc.save();
      }
    }
  } catch (err) {
    console.error("Admin seed error:", err.message);
  }
}

/* ── Start Server ───────────────────────────────────────────────────────── */
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/dushyant_power_tools",
  )
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedDefaultAdmins();

    app.listen(PORT, "0.0.0.0", () => {
      console.log("═══════════════════════════════════════════════");
      console.log("🔧  Dushyant Power Tools  —  API Server Ready");
      console.log(`📡  http://localhost:${PORT}`);
      console.log("═══════════════════════════════════════════════");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
