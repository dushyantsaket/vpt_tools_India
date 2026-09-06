import express from "express";
import User from "../models/User.js";
import Session from "../models/Session.js";
import bcrypt from "bcryptjs";
import { requireSession } from "../middleware/sessionAuth.js";
import { parseUA } from "../utils/uaParser.js";

const router = express.Router();

// Session login (creates express session)
router.post("/login", async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    user.lastLogin = new Date();
    await user.save();

    // create session
    req.session.regenerate(async (err) => {
      if (err) return res.status(500).json({ error: err.message });
      req.session.userId = user._id;
      if (remember) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days

      // save session metadata
      const ua = req.get("User-Agent") || "";
      const meta = parseUA(ua);
      await Session.create({
        sessionId: req.session.id,
        userId: user._id,
        ip: req.ip,
        ua,
        browser: meta.browser,
        os: meta.os,
        device: meta.device,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + req.session.cookie.maxAge),
      });

      res.json({
        success: true,
        sessionId: req.session.id,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout (destroy current session)
router.post("/logout", requireSession, async (req, res) => {
  try {
    await Session.findOneAndUpdate(
      { sessionId: req.session.id },
      { status: "logged_out", lastActivity: new Date() },
    );
    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ error: "Failed to destroy session" });
      res.clearCookie(process.env.SESSION_COOKIE_NAME || "dpt_sid");
      res.json({ success: true });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List sessions for current user
router.get("/sessions", requireSession, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: sessions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Force logout a session (Owner/Admin permission check should be applied in route mount)
router.post("/sessions/:id/revoke", requireSession, async (req, res) => {
  try {
    const sid = req.params.id;
    const s = await Session.findOne({ _id: sid });
    if (!s) return res.status(404).json({ error: "Session not found" });
    s.status = "revoked";
    await s.save();
    // Also remove from store if possible (connect-mongo will expire it)
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
 
