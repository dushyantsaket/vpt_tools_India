import express from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";
import AuditLog from "../models/AuditLog.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dpt_secret_key_2026";

// Helper to log audit actions
const logAction = async (employee, action, moduleName, oldVal, newVal, req) => {
  try {
    const userAgent = req.headers["user-agent"] || "";
    let deviceName = "Unknown Device";
    if (userAgent.includes("Mobi")) deviceName = "Mobile Device";
    else if (userAgent.includes("Windows")) deviceName = "Windows PC";
    else if (userAgent.includes("Macintosh")) deviceName = "Mac Device";
    else if (userAgent.includes("Linux")) deviceName = "Linux PC";

    let browserName = "Unknown Browser";
    if (userAgent.includes("Chrome")) browserName = "Chrome";
    else if (userAgent.includes("Safari")) browserName = "Safari";
    else if (userAgent.includes("Firefox")) browserName = "Firefox";
    else if (userAgent.includes("Edg")) browserName = "Edge";

    await AuditLog.create({
      userId: employee.employeeId,
      username: employee.fullName,
      role: employee.role,
      moduleName,
      actionType: action,
      oldValues: oldVal,
      newValues: newVal,
      ipAddress: req.ip || req.socket.remoteAddress,
      device: deviceName,
      browser: browserName,
      location: employee.liveLocation ? `${employee.liveLocation.latitude},${employee.liveLocation.longitude}` : undefined,
    });
  } catch (err) {
    console.error("Audit logging failed:", err);
  }
};

// Middleware to verify Employee JWT
export const verifyEmployee = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const employee = await Employee.findById(decoded.id);
    if (!employee) {
      return res.status(401).json({ error: "Employee not found" });
    }
    if (employee.status !== "Active") {
      return res.status(403).json({ error: "Employee account is suspended or terminated" });
    }

    // Verify session still active
    const sessionActive = employee.activeSessions.some(s => s.token === token);
    if (!sessionActive) {
      return res.status(401).json({ error: "Session expired or logged out from this device" });
    }

    req.employee = employee;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Seed a default employee for testing if none exist
router.post("/seed", async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    if (count === 0) {
      const defaultEmp = await Employee.create({
        employeeId: "EMP101",
        password: "password", // Will be hashed by pre-save
        fullName: "Rahul Sharma",
        fatherName: "Mr. Sharma",
        motherName: "Mrs. Sharma",
        dob: new Date("1995-05-12"),
        gender: "Male",
        mobile: "9876543210",
        email: "rahul@dpt.com",
        department: "Sales",
        designation: "Sales Officer",
        salary: 35000,
        role: "Sales Employee",
        status: "Active",
        shift: "9:00 AM - 6:00 PM",
        joiningDate: new Date(),
      });
      return res.json({ message: "Default employee seeded successfully", employee: { employeeId: defaultEmp.employeeId, name: defaultEmp.fullName } });
    }
    res.json({ message: "Employees already exist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Employee Login
router.post("/login", async (req, res) => {
  try {
    const { employeeId, password, rememberMe } = req.body;
    if (!employeeId || !password) {
      return res.status(400).json({ error: "Employee ID and Password are required" });
    }

    const employee = await Employee.findOne({ employeeId: employeeId.toUpperCase().trim() });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (employee.status !== "Active") {
      return res.status(403).json({ error: "Account suspended or terminated. Contact administrator." });
    }

    // Check account lockout
    if (employee.lockUntil && employee.lockUntil > Date.now()) {
      return res.status(403).json({ error: `Account is locked. Try again after ${new Date(employee.lockUntil).toLocaleTimeString()}` });
    }

    const isMatch = await employee.comparePassword(password);
    if (!isMatch) {
      employee.loginAttempts += 1;
      if (employee.loginAttempts >= 5) {
        employee.lockUntil = Date.now() + 15 * 60 * 1000; // 15 mins lock
        employee.loginAttempts = 0;
      }
      await employee.save();

      // Log alert
      employee.loginAlerts.push({
        ip: req.ip || req.socket.remoteAddress,
        device: req.headers["user-agent"],
        browser: req.headers["user-agent"],
        status: "Failed",
      });
      await employee.save();

      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Reset login attempts
    employee.loginAttempts = 0;
    employee.lockUntil = undefined;

    // Generate JWT
    const token = jwt.sign(
      { id: employee._id, employeeId: employee.employeeId, role: employee.role },
      JWT_SECRET,
      { expiresIn: rememberMe ? "30d" : "8h" }
    );

    // Track active session
    const userAgent = req.headers["user-agent"] || "";
    let deviceName = "Windows PC";
    if (userAgent.includes("Mobi")) deviceName = "Mobile Device";
    else if (userAgent.includes("Macintosh")) deviceName = "Mac Device";

    let browserName = "Chrome";
    if (userAgent.includes("Firefox")) browserName = "Firefox";
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browserName = "Safari";

    const newSession = {
      deviceId: Math.random().toString(36).substr(2, 9),
      deviceName,
      browser: browserName,
      ip: req.ip || req.socket.remoteAddress,
      token,
      loginAt: new Date(),
    };

    employee.activeSessions.push(newSession);
    employee.loginAlerts.push({
      ip: newSession.ip,
      device: userAgent,
      browser: browserName,
      status: "Success",
    });

    await employee.save();

    // Audit Log
    await logAction(employee, "Login", "Authentication", null, { session: newSession.deviceId }, req);

    res.json({
      token,
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        fullName: employee.fullName,
        role: employee.role,
        department: employee.department,
        designation: employee.designation,
        photo: employee.photo,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout
router.post("/logout", verifyEmployee, async (req, res) => {
  try {
    const employee = req.employee;
    const token = req.token;

    // Remove current session
    employee.activeSessions = employee.activeSessions.filter(s => s.token !== token);
    await employee.save();

    await logAction(employee, "Logout", "Authentication", { token }, null, req);

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout All Devices
router.post("/logout-all", verifyEmployee, async (req, res) => {
  try {
    const employee = req.employee;
    employee.activeSessions = [];
    await employee.save();

    await logAction(employee, "Logout", "Authentication", { scope: "all_devices" }, null, req);

    res.json({ message: "Logged out from all devices" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get profile
router.get("/profile", verifyEmployee, async (req, res) => {
  res.json(req.employee);
});

// Update profile details
router.put("/profile/update", verifyEmployee, async (req, res) => {
  try {
    const employee = req.employee;
    const { email, mobile, alternateMobile, currentAddress, password, photo } = req.body;

    const oldValues = {
      email: employee.email,
      mobile: employee.mobile,
      alternateMobile: employee.alternateMobile,
      currentAddress: employee.currentAddress,
      photo: employee.photo,
    };

    if (email) employee.email = email;
    if (mobile) employee.mobile = mobile;
    if (alternateMobile) employee.alternateMobile = alternateMobile;
    if (currentAddress) employee.currentAddress = currentAddress;
    if (photo) employee.photo = photo;

    if (password) {
      employee.password = password; // Will trigger pre-save hashing
    }

    await employee.save();

    await logAction(
      employee,
      "Update",
      "Employee Profile",
      oldValues,
      { email, mobile, alternateMobile, currentAddress, photo, passwordChanged: !!password },
      req
    );

    res.json({ message: "Profile updated successfully", employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Live GPS Coordinates Update (Field Staff)
router.post("/gps/track", verifyEmployee, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "Latitude and Longitude required" });
    }

    const employee = req.employee;
    employee.liveLocation = {
      latitude,
      longitude,
      updatedAt: new Date(),
    };
    employee.routeHistory.push({ latitude, longitude, timestamp: new Date() });
    
    // Cap route history at last 100 entries to save space
    if (employee.routeHistory.length > 100) {
      employee.routeHistory.shift();
    }

    await employee.save();
    res.json({ message: "GPS Location updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mock Face Login Verification
router.post("/face-login-verify", async (req, res) => {
  try {
    const { employeeId, imageBase64 } = req.body;
    if (!employeeId || !imageBase64) {
      return res.status(400).json({ error: "Employee ID and Face Scan are required" });
    }

    const employee = await Employee.findOne({ employeeId: employeeId.toUpperCase().trim() });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (employee.status !== "Active") {
      return res.status(403).json({ error: "Account suspended or terminated" });
    }

    // Mock Face ID Match: succeed if photo is uploaded, or matches some format
    // Real systems would do facial embedding comparisons.
    // For demo, we verify and sign JWT
    const token = jwt.sign(
      { id: employee._id, employeeId: employee.employeeId, role: employee.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    const newSession = {
      deviceId: Math.random().toString(36).substr(2, 9),
      deviceName: "Camera Face Login",
      browser: "Webcam App",
      ip: req.ip || req.socket.remoteAddress,
      token,
      loginAt: new Date(),
    };

    employee.activeSessions.push(newSession);
    await employee.save();

    await logAction(employee, "Login", "Face Recognition Authentication", null, { session: newSession.deviceId }, req);

    res.json({
      token,
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        fullName: employee.fullName,
        role: employee.role,
        department: employee.department,
        designation: employee.designation,
        photo: employee.photo,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
 
