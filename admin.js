import express from "express";
import BuyLead from "../models/BuyLead.js";
import EventLog from "../models/EventLog.js";
import Lead from "../models/Lead.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Session from "../models/Session.js";
import User from "../models/User.js";
import Customer from "../models/Customer.js";
import WarrantyClaim from "../models/WarrantyClaim.js";
import News from "../models/News.js";
import Brand from "../models/Brand.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();

const ok = (res, data, extra = {}) =>
  res.json({ success: true, data, ...extra });
const fail = (res, status, message) =>
  res.status(status).json({ success: false, error: message, message });

const parsePaging = (query) => {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 20), 1), 5000);
  return { page, limit, skip: (page - 1) * limit };
};

const productFilter = (query, includeInactive = true) => {
  const filter = {};
  if (!includeInactive) filter.isActive = true;
  if (query.category) filter.category = query.category;
  if (query.stockStatus) filter.stockStatus = query.stockStatus;
  if (query.search) {
    filter.$or = [
      { name: new RegExp(query.search, "i") },
      { brand: new RegExp(query.search, "i") },
      { category: new RegExp(query.search, "i") },
      { description: new RegExp(query.search, "i") },
    ];
  }
  return filter;
};

const leadFilter = (query) => {
  const filter = { isDeleted: { $ne: true }, status: { $ne: "deleted" } };
  if (query.status) filter.status = query.status;
  if (query.category) filter.category = new RegExp(query.category, "i");
  if (query.location) filter.location = new RegExp(query.location, "i");
  if (query.tab === "export") filter.isExport = true;
  if (query.search) {
    filter.$or = [
      { title: new RegExp(query.search, "i") },
      { description: new RegExp(query.search, "i") },
      { category: new RegExp(query.search, "i") },
    ];
  }
  return filter;
};

router.use(protect, adminOnly);

router.get("/dashboard", async (_req, res) => {
  try {
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      totalUsers,
      totalLeads,
      pendingOrders,
      lowStockProducts,
      revenue,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      User.countDocuments(),
      BuyLead.countDocuments({
        isDeleted: { $ne: true },
        status: { $ne: "deleted" },
      }),
      Order.countDocuments({ status: "pending_approval" }),
      Product.find({ stock_quantity: { $lt: 5 }, isActive: true })
        .sort({ stock_quantity: 1 })
        .limit(8),
      Order.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);

    ok(res, {
      totalProducts,
      activeProducts,
      totalOrders,
      totalUsers,
      totalLeads,
      pendingOrders,
      revenue: revenue[0]?.total || 0,
      lowStockProducts,
    });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.get("/stats", async (_req, res) => {
  try {
    const [
      totalProducts,
      activeProducts,
      outOfStock,
      lowStock,
      totalLeads,
      pendingLeads,
      pendingClaims,
      approvedClaims,
      soldAgg,
      stockAgg,
      lowStockProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ stockStatus: "Out of Stock" }),
      Product.countDocuments({ stockStatus: "Low Stock" }),
      Lead.countDocuments(),
      Lead.countDocuments({ status: { $in: ["New", "Pending"] } }),
      WarrantyClaim.countDocuments({ status: "Pending" }),
      WarrantyClaim.countDocuments({ status: "Approved" }),
      Product.aggregate([
        { $group: { _id: null, total: { $sum: "$sold_quantity" } } },
      ]),
      Product.aggregate([
        { $group: { _id: null, total: { $sum: "$stock_quantity" } } },
      ]),
      Product.find({ stock_quantity: { $lt: 5 }, isActive: true })
        .sort({ stock_quantity: 1 })
        .limit(8),
    ]);

    res.json({
      totalProducts,
      activeProducts,
      outOfStock,
      lowStock,
      totalLeads,
      pendingLeads,
      pendingClaims,
      approvedClaims,
      totalSold: soldAgg[0]?.total || 0,
      totalStock: stockAgg[0]?.total || 0,
      lowStockProducts,
    });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.get("/products", async (req, res) => {
  try {
    const { page, limit, skip } = parsePaging(req.query);
    const filter = productFilter(req.query);
    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);
    ok(res, products, {
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.patch("/products/:id/price", async (req, res) => {
  try {
    const { price, reason } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return fail(res, 404, "Product not found");

    product.priceHistory.push({
      oldPrice: product.price_inr,
      newPrice: Number(price),
      reason,
      changedBy: req.user._id,
    });
    product.price_inr = Number(price);
    await product.save();
    ok(res, product);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.patch("/products/:id/stock", async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return fail(res, 404, "Product not found");

    product.stockHistory.push({
      oldStock: product.stock_quantity,
      newStock: Number(stock),
      changedBy: req.user._id,
    });
    product.stock_quantity = Number(stock);
    await product.save();
    ok(res, product);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.get("/buyleads", async (req, res) => {
  try {
    const { page, limit, skip } = parsePaging(req.query);
    const filter = leadFilter(req.query);
    const sort =
      req.query.tab === "relevant"
        ? { relevanceScore: -1, createdAt: -1 }
        : { createdAt: -1 };
    const [leads, total] = await Promise.all([
      BuyLead.find(filter)
        .populate("postedBy", "name email phone role")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      BuyLead.countDocuments(filter),
    ]);
    ok(res, leads, {
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.post("/buyleads", async (req, res) => {
  try {
    const lead = await BuyLead.create({
      ...req.body,
      postedBy: req.user._id,
      postedByType: req.user.role,
      relevanceScore: req.body.relevanceScore || (req.body.isHotLead ? 90 : 50),
    });
    ok(res, lead);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.put("/buyleads/:id", async (req, res) => {
  try {
    const lead = await BuyLead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) return fail(res, 404, "Buy lead not found");
    ok(res, lead);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.delete("/buyleads/:id", async (req, res) => {
  try {
    const lead = await BuyLead.findByIdAndUpdate(
      req.params.id,
      { status: "deleted", isDeleted: true },
      { new: true },
    );
    if (!lead) return fail(res, 404, "Buy lead not found");
    ok(res, lead);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.get("/leads", async (_req, res) => {
  try {
    const rawLeads = await Lead.find().sort({ createdAt: -1 }).limit(300).lean();
    
    // Enrich leads with product photos and item breakdowns
    const leads = await Promise.all(
      rawLeads.map(async (l) => {
        const productText = l.product || "";
        const parts = productText.split(/,\s*(?=[A-Z0-9])/);
        const items = [];

        for (const part of parts) {
          const trimmed = part.trim();
          if (!trimmed) continue;
          const qtyMatch = trimmed.match(/^(.*?)\s*\(x(\d+)\)$/i);
          const title = qtyMatch ? qtyMatch[1].trim() : trimmed;
          const quantity = qtyMatch ? parseInt(qtyMatch[2], 10) : 1;

          let matchedProduct = null;
          try {
            const firstWords = title.split(" ").slice(0, 3).join(" ");
            matchedProduct = await Product.findOne({
              $or: [
                { name: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
                { name: new RegExp(firstWords.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
              ],
            }).lean();
          } catch {
            matchedProduct = null;
          }

          const price = matchedProduct?.price_inr || 2500;
          const mrp = matchedProduct?.mrp_inr || Math.round(price * 1.25);
          const image = matchedProduct?.image || matchedProduct?.images?.[0] || "";

          items.push({
            productId: matchedProduct?._id || null,
            name: matchedProduct?.name || title,
            productTitle: matchedProduct?.name || title,
            quantity,
            price,
            mrp,
            total: price * quantity,
            image,
            imageUrl: image,
            brand: matchedProduct?.brand || "DPT",
            category: matchedProduct?.category || "Power Tools",
          });
        }

        const amountMatch = (l.notes || l.requirement || "").match(/(?:Total:\s*Rs\s*|Amount:\s*Rs\s*|Total Amount:\s*₹?\s*)([\d,.]+)/i);
        const extractedAmount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : items.reduce((s, i) => s + i.total, 0);

        const firstItem = items[0] || {};
        const productImage = l.productImage || firstItem.image || "";

        return {
          ...l,
          id: l._id,
          customerName: l.customer,
          customerPhone: l.phone,
          customerEmail: l.email,
          productName: l.product,
          productImage,
          items,
          totalAmount: extractedAmount,
          amount: extractedAmount,
          type: l.type === "Order Request" ? "order" : l.type || "lead",
        };
      })
    );

    res.json(leads);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.patch("/leads/:id/status", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );
    if (!lead) return fail(res, 404, "Lead not found");
    res.json(lead);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.delete("/leads/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return fail(res, 404, "Lead not found");
    res.json({ success: true, message: "Lead deleted" });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.get("/users", async (req, res) => {
  try {
    const { page, limit, skip } = parsePaging(req.query);
    const filter = {};
    const customerFilter = {};
    if (req.query.role && req.query.role !== "customer") {
      filter.role = req.query.role;
    }
    if (req.query.role === "customer") {
      customerFilter.isActive = { $in: [true, false] };
    }
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      const orFilter = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
      ];
      filter.$or = orFilter;
      customerFilter.$or = orFilter;
    }

    const [users, customers, totalUsers, totalCustomers] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Customer.find(customerFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
      Customer.countDocuments(customerFilter),
    ]);

    const normalizedCustomers = customers.map((customer) => ({
      _id: customer._id,
      name: customer.name || customer.email.split("@")[0],
      email: customer.email,
      phone: customer.phone,
      role: "customer",
      isActive: customer.isActive,
      picture: customer.picture,
      createdAt: customer.createdAt,
      lastLogin: customer.lastLogin,
      managerId: customer.managerId,
    }));

    const combined = [...users, ...normalizedCustomers].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    ok(res, combined, {
      pagination: {
        page,
        limit,
        total: totalUsers + totalCustomers,
        pages: Math.ceil((totalUsers + totalCustomers) / limit),
      },
    });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.get("/user-sessions", async (req, res) => {
  try {
    const sessions = await Session.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email role");

    const normalized = sessions.map((session) => ({
      _id: session._id,
      sessionId: session.sessionId,
      status: session.status,
      userId: session.userId?._id,
      name: session.userId?.name || "Unknown",
      email: session.userId?.email || "Unknown",
      role: session.userId?.role || "customer",
      ip: session.ip,
      browser: session.browser,
      os: session.os,
      device: session.device,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity,
      expiresAt: session.expiresAt,
    }));

    ok(res, normalized);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.post("/sessions/:id/revoke", async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return fail(res, 404, "Session not found");

    session.status = "revoked";
    await session.save();
    ok(res, session);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.post("/users/:id/logout-all", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const customer = !user ? await Customer.findById(userId) : null;

    if (!user && !customer) return fail(res, 404, "User not found");

    if (user) {
      if (user.role === "admin") {
        user.adminSessionVersion = Number(user.adminSessionVersion || 0) + 1;
      } else {
        user.tokenVersion = Number(user.tokenVersion || 0) + 1;
      }
      await user.save();
    }

    if (customer) {
      customer.tokenVersion = Number(customer.tokenVersion || 0) + 1;
      await customer.save();
    }

    const result = await Session.updateMany(
      { userId, status: "active" },
      { status: "revoked" },
    );
    ok(res, { userId, revokedCount: result.modifiedCount || 0 });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const customer = !user ? await Customer.findById(userId) : null;

    if (!user && !customer) return fail(res, 404, "User not found");

    if (user) {
      user.isActive = false;
      if (user.role === "admin") {
        user.adminSessionVersion = Number(user.adminSessionVersion || 0) + 1;
      } else {
        user.tokenVersion = Number(user.tokenVersion || 0) + 1;
      }
      await user.save();
    }

    if (customer) {
      customer.isActive = false;
      customer.tokenVersion = Number(customer.tokenVersion || 0) + 1;
      await customer.save();
    }

    await Session.updateMany(
      { userId, status: "active" },
      { status: "revoked" },
    );

    ok(res, { id: userId, disabled: true });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.put("/users/:id/role", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true, runValidators: true },
    ).select("-password");
    if (!user) return fail(res, 404, "User not found");
    ok(res, user);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.put("/users/:id/toggle-status", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return fail(res, 404, "User not found");
    user.isActive = !user.isActive;
    await user.save();
    ok(res, user);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.get("/orders", async (req, res) => {
  try {
    const { page, limit, skip } = parsePaging(req.query);
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("customerId", "name email phone")
        .populate("dealerId", "name email phone companyName")
        .populate("productId", "name image price_inr")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);
    const normalized = orders.map((order) => {
      const firstItem = order.items?.[0];
      return {
        ...order.toObject(),
        status:
          order.orderStatus?.toLowerCase() === "placed"
            ? "pending_approval"
            : order.orderStatus?.toLowerCase(),
        totalAmount:
          order.amountPayable || order.grandTotal || order.sellingPriceTotal,
        quantity: order.totalItems || firstItem?.quantity || 1,
        requestMessage: order.customerNotes || order.orderNotes,
        customerId: order.userId,
        productId: firstItem
          ? {
              _id: firstItem.productId,
              name: firstItem.productTitle,
              image: firstItem.imageUrl,
              price_inr: firstItem.price,
              stockStatus: "In Stock",
              stock_quantity: 1,
            }
          : null,
      };
    });
    ok(res, normalized, {
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.put("/orders/:id/status", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return fail(res, 404, "Order not found");

    const statusMap = {
      approved: "CONFIRMED",
      processing: "PROCESSING",
      shipped: "SHIPPED",
      delivered: "DELIVERED",
      cancelled: "CANCELLED",
      pending_approval: "PLACED",
    };
    order.orderStatus =
      statusMap[req.body.status] ||
      String(req.body.status || "PLACED").toUpperCase();
    if (order.orderStatus === "DELIVERED") {
      order.deliveryStatus = "DELIVERED";
      order.deliveredAt = new Date();
    }
    order.timeline.push({
      status: order.orderStatus,
      message: req.body.note || `Admin marked ${order.orderStatus}`,
      updatedBy: req.user?.name || "admin",
    });
    await order.save();
    ok(res, order);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.get("/warranty", async (_req, res) => {
  try {
    res.json(await WarrantyClaim.find().sort({ createdAt: -1 }).limit(200));
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.patch("/warranty/:id/status", async (req, res) => {
  try {
    const rawStatus = String(req.body?.status || "Pending").trim();
    const statusMap = {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      resolved: "Resolved",
      completed: "Completed",
    };
    const status = statusMap[rawStatus.toLowerCase()] || rawStatus;
    const adminNotes = req.body?.adminNotes ?? req.body?.adminNote ?? "";

    const claim = await WarrantyClaim.findOneAndUpdate(
      { $or: [{ _id: req.params.id }, { claimId: req.params.id }] },
      { status, adminNotes },
      { new: true, runValidators: true },
    );

    if (!claim) return fail(res, 404, "Warranty claim not found");
    res.json(claim);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.delete("/warranty/:id", async (req, res) => {
  try {
    const claim = await WarrantyClaim.findOneAndDelete({
      $or: [{ _id: req.params.id }, { claimId: req.params.id }],
    });
    if (!claim) return fail(res, 404, "Warranty claim not found");
    ok(res, { deletedId: req.params.id, claimId: claim.claimId || claim._id });
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.get("/analytics", async (req, res) => {
  try {
    const filter = req.query.filter || "all";
    const now = new Date();
    let startDate = new Date(0);

    if (filter === "today") {
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
    } else if (filter === "7d") {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 7);
    } else if (filter === "30d") {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 30);
    }

    const dateQuery =
      filter !== "all" ? { createdAt: { $gte: startDate, $lte: now } } : {};

    const [orders, usersCount, dealersCount, warrantiesCount, leadsCount] =
      await Promise.all([
        Order.find(dateQuery).sort({ createdAt: -1 }).lean(),
        User.countDocuments({ role: "user", ...dateQuery }),
        User.countDocuments({ role: "dealer", ...dateQuery }),
        WarrantyClaim.countDocuments({ status: "pending", ...dateQuery }),
        BuyLead.countDocuments({ isDeleted: { $ne: true }, ...dateQuery }),
      ]);

    let totalRevenue = 0;
    let codOrders = 0;
    let onlineOrders = 0;
    const orderStatuses = {
      pending: 0,
      processing: 0,
      dispatched: 0,
      delivered: 0,
      cancelled: 0,
    };
    const productCounts = {};
    const monthly = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    orders.forEach((o) => {
      if (o.status !== "cancelled" && o.status !== "CANCELLED") {
        const amount =
          o.totalAmount || (o.pricing && o.pricing.grandTotal) || 0;
        totalRevenue += amount;
        if (o.createdAt) {
          const d = new Date(o.createdAt);
          const month = d.toLocaleString("en-US", { month: "short" });
          if (monthly[month] !== undefined) monthly[month] += amount;
        }
      }

      if (o.paymentMethod === "COD" || o.paymentMethod === "cod") codOrders++;
      else onlineOrders++;

      const s = (o.status || "pending").toLowerCase();
      if (orderStatuses[s] !== undefined) orderStatuses[s]++;
      else if (s === "pending_approval" || s === "approved")
        orderStatuses.pending++;

      if (o.items && Array.isArray(o.items)) {
        o.items.forEach((item) => {
          const name = item.name || item.title || "Unknown Product";
          productCounts[name] =
            (productCounts[name] || 0) + (item.quantity || 1);
        });
      }
    });

    const topProducts = Object.entries(productCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const totalOrdersCount = orders.length;

    res.json({
      success: true,
      data: {
        summary: {
          totalRevenue,
          totalOrders: totalOrdersCount,
          codOrders,
          onlineOrders,
          totalCustomers: usersCount,
          totalDealers: dealersCount,
          totalLeads: leadsCount,
          avgOrderValue:
            totalOrdersCount > 0
              ? Math.round(totalRevenue / totalOrdersCount)
              : 0,
          pendingOrders: orderStatuses.pending || 0,
          dispatchedOrders:
            orderStatuses.dispatched + orderStatuses.delivered || 0,
          warrantyPending: warrantiesCount,
        },
        topProducts,
        monthlySales: monthly,
        orderStatuses,
        recentOrders: orders.slice(0, 5),
      },
    });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.get("/analytics/events", async (req, res) => {
  try {
    const { page, limit, skip } = parsePaging(req.query);
    const filter = req.query.type ? { type: req.query.type } : {};
    const [events, total] = await Promise.all([
      EventLog.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limit),
      EventLog.countDocuments(filter),
    ]);
    ok(res, events, {
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

// --- Brands API ---
router.get("/brands", async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    ok(res, brands);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.post("/brands", async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    ok(res, brand);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.put("/brands/:id", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!brand) return fail(res, 404, "Brand not found");
    ok(res, brand);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.delete("/brands/:id", async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    ok(res, { message: "Brand deleted" });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

// --- News API ---
router.get("/news", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    ok(res, news);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.post("/news", async (req, res) => {
  try {
    const news = await News.create(req.body);
    ok(res, news);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.put("/news/:id", async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!news) return fail(res, 404, "News not found");
    ok(res, news);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.delete("/news/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    ok(res, { message: "News deleted" });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

export default router;
