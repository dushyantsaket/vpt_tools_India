import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Bell,
  Calendar,
  Check,
  Clock,
  Download,
  Edit,
  Eye,
  File,
  FileText,
  Filter,
  Home,
  Info,
  Plus,
  RefreshCw,
  Search,
  Trash,
  User,
  X,
} from "lucide-react";
import "./LeavesPortalSection.css";

const LEAVE_TYPES = [
  { id: "cl", label: "Casual Leave", short: "CL", color: "#3B82F6" },
  { id: "sl", label: "Sick Leave", short: "SL", color: "#10B981" },
  { id: "el", label: "Emergency Leave", short: "EL", color: "#F97316" },
  { id: "lwp", label: "Leave Without Pay", short: "LWP", color: "#8B5CF6" },
];

const EMPLOYEES = [
  { id: 1, name: "Amit Singh", department: "Sales", role: "Manager" },
  { id: 2, name: "Rajesh Sharma", department: "Operations", role: "Employee" },
  { id: 3, name: "Priya Patel", department: "HR", role: "Employee" },
  { id: 4, name: "Vikram Singh", department: "Accounts", role: "Employee" },
  { id: 5, name: "Neha Verma", department: "Support", role: "Employee" },
];

const HOLIDAYS = ["2026-08-15", "2026-09-05", "2026-10-02", "2026-11-14"];

const ATTENDANCE_LOGS = [
  {
    date: "2026-07-24",
    checkIn: "09:05 AM",
    checkOut: "06:15 PM",
    hours: "09:10",
    status: "Present",
  },
  {
    date: "2026-07-23",
    checkIn: "09:10 AM",
    checkOut: "06:00 PM",
    hours: "08:50",
    status: "Present",
  },
  {
    date: "2026-07-22",
    checkIn: "09:00 AM",
    checkOut: "06:05 PM",
    hours: "09:05",
    status: "Present",
  },
  {
    date: "2026-07-21",
    checkIn: "09:30 AM",
    checkOut: "01:30 PM",
    hours: "04:00",
    status: "Half Day",
  },
  {
    date: "2026-07-18",
    checkIn: "09:15 AM",
    checkOut: "06:30 PM",
    hours: "09:15",
    status: "Present",
  },
];

const TEAM_LEAVE_OVERVIEW = [
  {
    id: 1,
    name: "Rajesh Sharma",
    department: "Sales",
    leaveType: "Sick Leave (SL)",
    from: "24 Jul 2026",
    to: "24 Jul 2026",
    days: 1,
    status: "Pending",
    reason: "Fever and cold",
  },
  {
    id: 2,
    name: "Priya Patel",
    department: "Sales",
    leaveType: "Casual Leave (CL)",
    from: "25 Jul 2026",
    to: "25 Jul 2026",
    days: 1,
    status: "Pending",
    reason: "Personal work",
  },
  {
    id: 3,
    name: "Vikram Singh",
    department: "Operations",
    leaveType: "Emergency Leave (EL)",
    from: "24 Jul 2026",
    to: "24 Jul 2026",
    days: 1,
    status: "Pending",
    reason: "Family emergency",
  },
  {
    id: 4,
    name: "Neha Verma",
    department: "HR",
    leaveType: "Sick Leave (SL)",
    from: "23 Jul 2026",
    to: "24 Jul 2026",
    days: 2,
    status: "Approved",
    reason: "Health issue",
  },
  {
    id: 5,
    name: "Aman Gupta",
    department: "Finance",
    leaveType: "Casual Leave (CL)",
    from: "22 Jul 2026",
    to: "22 Jul 2026",
    days: 1,
    status: "Approved",
    reason: "Bank work",
  },
];

const INITIAL_LEAVE_BALANCE = {
  cl: { available: 8, used: 4, total: 12 },
  sl: { available: 6, used: 4, total: 10 },
  el: { available: 3, used: 0, total: 3 },
  lwp: { available: 2, used: 0, total: 2 },
};

const INITIAL_LEAVES = [
  {
    id: 101,
    type: "cl",
    from: "2026-07-05",
    to: "2026-07-05",
    days: 1,
    appliedOn: "03 Jul 2026",
    reason: "Personal work",
    status: "Approved",
    requester: "Amit Singh",
  },
  {
    id: 102,
    type: "sl",
    from: "2026-07-10",
    to: "2026-07-10",
    days: 1,
    appliedOn: "08 Jul 2026",
    reason: "Fever and cold",
    status: "Approved",
    requester: "Amit Singh",
  },
  {
    id: 103,
    type: "el",
    from: "2026-06-28",
    to: "2026-06-28",
    days: 1,
    appliedOn: "26 Jun 2026",
    reason: "Family emergency",
    status: "Approved",
    requester: "Amit Singh",
  },
  {
    id: 104,
    type: "sl",
    from: "2026-06-15",
    to: "2026-06-16",
    days: 2,
    appliedOn: "13 Jun 2026",
    reason: "Not feeling well",
    status: "Approved",
    requester: "Amit Singh",
  },
  {
    id: 105,
    type: "cl",
    from: "2026-07-24",
    to: "2026-07-24",
    days: 1,
    appliedOn: "24 Jul 2026",
    reason: "Doctor appointment",
    status: "Pending",
    requester: "Rajesh Sharma",
  },
  {
    id: 106,
    type: "cl",
    from: "2026-07-25",
    to: "2026-07-25",
    days: 1,
    appliedOn: "24 Jul 2026",
    reason: "Urgent bank work",
    status: "Pending",
    requester: "Priya Patel",
  },
  {
    id: 107,
    type: "sl",
    from: "2026-07-26",
    to: "2026-07-26",
    days: 1,
    appliedOn: "24 Jul 2026",
    reason: "Migraine",
    status: "Rejected",
    requester: "Vikram Singh",
  },
  {
    id: 108,
    type: "lwp",
    from: "2026-07-28",
    to: "2026-07-28",
    days: 1,
    appliedOn: "24 Jul 2026",
    reason: "Personal work",
    status: "Cancelled",
    requester: "Neha Verma",
  },
];

const ROLES = {
  superAdmin: [
    "applyLeave",
    "viewOwnLeaves",
    "cancelPendingLeave",
    "uploadDocuments",
    "viewAttendance",
    "approveTeamLeave",
    "rejectTeamLeave",
    "viewTeamAttendance",
    "departmentReports",
    "createLeaveTypes",
    "assignLeaveBalance",
    "manageHolidays",
    "manageAttendance",
    "manageEmployees",
    "generateReports",
    "manageRoles",
    "systemSettings",
    "companyHolidays",
    "policies",
    "allCrud",
  ],
  hr: [
    "applyLeave",
    "viewOwnLeaves",
    "cancelPendingLeave",
    "uploadDocuments",
    "viewAttendance",
    "approveTeamLeave",
    "rejectTeamLeave",
    "viewTeamAttendance",
    "departmentReports",
    "createLeaveTypes",
    "assignLeaveBalance",
    "manageHolidays",
    "manageAttendance",
    "manageEmployees",
    "generateReports",
  ],
  manager: [
    "applyLeave",
    "viewOwnLeaves",
    "cancelPendingLeave",
    "uploadDocuments",
    "viewAttendance",
    "approveTeamLeave",
    "rejectTeamLeave",
    "viewTeamAttendance",
    "departmentReports",
  ],
  employee: [
    "applyLeave",
    "viewOwnLeaves",
    "cancelPendingLeave",
    "uploadDocuments",
    "viewAttendance",
  ],
};

const STATUS_LABELS = {
  Pending: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  Approved: { color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  Rejected: { color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  Cancelled: { color: "#6B7280", bg: "rgba(107,114,128,0.12)" },
};

const LeavesPortalSection = () => {
  const [activeRole, setActiveRole] = useState("manager");
  const [leaveBalance, setLeaveBalance] = useState(INITIAL_LEAVE_BALANCE);
  const [leaveHistory, setLeaveHistory] = useState(INITIAL_LEAVES);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    employee: "all",
    department: "all",
    from: "",
    to: "",
    query: "",
  });
  const [attendanceLogs] = useState(ATTENDANCE_LOGS);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("apply");
  const [toastMessage, setToastMessage] = useState(null);
  const [leaveForm, setLeaveForm] = useState({
    requester: "Amit Singh",
    type: "cl",
    from: "",
    to: "",
    halfDay: false,
    days: 0,
    reason: "",
    documentName: "",
    status: "Pending",
  });

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2700);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const currentRolePermissions = useMemo(() => ROLES[activeRole], [activeRole]);

  const isHoliday = useCallback(
    (dateString) => HOLIDAYS.includes(dateString),
    [],
  );

  const isWeekend = useCallback((dateString) => {
    const weekday = new Date(dateString).getDay();
    return weekday === 0 || weekday === 6;
  }, []);

  const calculateLeaveDays = useCallback(
    (from, to, halfDay) => {
      if (!from || !to) return 0;
      const start = new Date(from);
      const end = new Date(to);
      if (end < start) return 0;
      let count = 0;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().slice(0, 10);
        if (isWeekend(iso) || isHoliday(iso)) continue;
        count += 1;
      }
      return halfDay ? Math.max(0.5, count * 0.5) : count;
    },
    [isHoliday, isWeekend],
  );

  const handleInputChange = (field, value) => {
    const nextForm = { ...leaveForm, [field]: value };
    if (field === "from" || field === "to" || field === "halfDay") {
      nextForm.days = calculateLeaveDays(
        nextForm.from,
        nextForm.to,
        nextForm.halfDay,
      );
    }
    setLeaveForm(nextForm);
  };

  const checkLeaveBalance = (type, requestedDays) => {
    const typeBalance = leaveBalance[type];
    if (!typeBalance) return false;
    return requestedDays <= typeBalance.available;
  };

  const validateLeaveDates = () => {
    if (!leaveForm.from || !leaveForm.to) {
      setToastMessage({
        type: "error",
        text: "Please choose both From and To dates.",
      });
      return false;
    }
    if (new Date(leaveForm.to) < new Date(leaveForm.from)) {
      setToastMessage({
        type: "error",
        text: "To Date cannot be earlier than From Date.",
      });
      return false;
    }
    if (!checkLeaveBalance(leaveForm.type, leaveForm.days)) {
      setToastMessage({
        type: "error",
        text: "Requested days exceed available leave balance.",
      });
      return false;
    }
    return true;
  };

  const handleApplyLeave = () => {
    if (!currentRolePermissions.includes("applyLeave")) {
      setToastMessage({
        type: "warning",
        text: "Role does not have permission to apply leave.",
      });
      return;
    }
    if (!leaveForm.reason || !leaveForm.from || !leaveForm.to) {
      setToastMessage({
        type: "error",
        text: "All fields are required before applying.",
      });
      return;
    }
    if (!validateLeaveDates()) return;

    const newLeave = {
      ...leaveForm,
      id: Date.now(),
      appliedOn: new Date()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, " "),
      status: "Pending",
    };

    setLeaveHistory((prev) => [newLeave, ...prev]);
    setLeaveBalance((prev) => ({
      ...prev,
      [leaveForm.type]: {
        ...prev[leaveForm.type],
        available: Math.max(0, prev[leaveForm.type].available - leaveForm.days),
        used: prev[leaveForm.type].used + leaveForm.days,
      },
    }));
    setToastMessage({
      type: "success",
      text: "Leave application submitted successfully.",
    });
    setLeaveForm({
      ...leaveForm,
      from: "",
      to: "",
      reason: "",
      documentName: "",
      days: 0,
    });
  };

  const handleCancelLeave = (leaveId) => {
    const leave = leaveHistory.find((item) => item.id === leaveId);
    if (!leave) return;
    if (
      !currentRolePermissions.includes("cancelPendingLeave") &&
      leave.requester !== "Amit Singh"
    ) {
      setToastMessage({
        type: "warning",
        text: "You cannot cancel this leave.",
      });
      return;
    }
    setLeaveHistory((prev) =>
      prev.map((item) =>
        item.id === leaveId ? { ...item, status: "Cancelled" } : item,
      ),
    );
    setToastMessage({ type: "info", text: "Leave request cancelled." });
  };

  const updateLeaveStatus = (leaveId, status) => {
    setLeaveHistory((prev) =>
      prev.map((item) => (item.id === leaveId ? { ...item, status } : item)),
    );
    setToastMessage({
      type: status === "Approved" ? "success" : "error",
      text: `Leave ${status.toLowerCase()} successfully.`,
    });
  };

  const handleApproveLeave = (leaveId) => {
    if (!currentRolePermissions.includes("approveTeamLeave")) {
      setToastMessage({
        type: "warning",
        text: "You do not have permission to approve team leave.",
      });
      return;
    }
    updateLeaveStatus(leaveId, "Approved");
  };

  const handleRejectLeave = (leaveId) => {
    if (!currentRolePermissions.includes("rejectTeamLeave")) {
      setToastMessage({
        type: "warning",
        text: "You do not have permission to reject team leave.",
      });
      return;
    }
    updateLeaveStatus(leaveId, "Rejected");
  };

  const handleEditLeave = (leave) => {
    setModalMode("edit");
    setSelectedLeave(leave);
    setLeaveForm({ ...leave, halfDay: leave.days === 0.5 });
    setShowModal(true);
  };

  const handleDeleteLeave = (leaveId) => {
    setLeaveHistory((prev) => prev.filter((item) => item.id !== leaveId));
    setToastMessage({ type: "info", text: "Leave entry removed." });
  };

  const handleViewLeave = (leave) => {
    setSelectedLeave(leave);
    setShowModal(true);
    setModalMode("view");
  };

  const handleUploadDocument = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLeaveForm((prev) => ({ ...prev, documentName: file.name }));
    setToastMessage({
      type: "success",
      text: "Document uploaded successfully.",
    });
  };

  const filterLeaveHistory = useMemo(() => {
    return leaveHistory.filter((leave) => {
      if (filters.status !== "all" && leave.status !== filters.status)
        return false;
      if (filters.type !== "all" && leave.type !== filters.type) return false;
      if (filters.employee !== "all" && leave.requester !== filters.employee)
        return false;
      if (filters.department !== "all") {
        const employee = EMPLOYEES.find((emp) => emp.name === leave.requester);
        if (!employee || employee.department !== filters.department)
          return false;
      }
      const query = filters.query.toLowerCase();
      if (query) {
        const text =
          `${leave.requester} ${leave.type} ${leave.reason} ${leave.status}`.toLowerCase();
        if (!text.includes(query)) return false;
      }
      if (filters.from && new Date(leave.from) < new Date(filters.from))
        return false;
      if (filters.to && new Date(leave.to) > new Date(filters.to)) return false;
      return true;
    });
  }, [filters, leaveHistory]);

  const attendanceSummary = useMemo(() => {
    const total = attendanceLogs.length;
    const present = attendanceLogs.filter(
      (item) => item.status === "Present",
    ).length;
    const absent = attendanceLogs.filter(
      (item) => item.status === "Absent",
    ).length;
    const late = attendanceLogs.filter((item) => item.status === "Late").length;
    const halfDay = attendanceLogs.filter(
      (item) => item.status === "Half Day",
    ).length;
    return { total, present, absent, late, halfDay };
  }, [attendanceLogs]);

  const handleSearch = (value) =>
    setFilters((prev) => ({ ...prev, query: value }));

  const handleStatusFilter = (status) =>
    setFilters((prev) => ({ ...prev, status }));

  const handleLeaveTypeFilter = (type) =>
    setFilters((prev) => ({ ...prev, type }));

  const handleDepartmentFilter = (department) =>
    setFilters((prev) => ({ ...prev, department }));

  const handleDateFilter = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const handleModalClose = () => {
    setShowModal(false);
    setModalMode("apply");
    setSelectedLeave(null);
  };

  const handleModalSubmit = () => {
    if (modalMode === "edit" && selectedLeave) {
      setLeaveHistory((prev) =>
        prev.map((item) =>
          item.id === selectedLeave.id
            ? { ...selectedLeave, ...leaveForm }
            : item,
        ),
      );
      setToastMessage({ type: "success", text: "Leave updated successfully." });
      handleModalClose();
      return;
    }
    handleApplyLeave();
    setShowModal(false);
  };

  const handleDownloadReport = (type) => {
    setToastMessage({
      type: "success",
      text: `${type.toUpperCase()} report ready to download.`,
    });
  };

  const handlePrintReport = () => {
    setToastMessage({ type: "info", text: "Print preview opened." });
    window.print();
  };

  const handleRefreshDashboard = () => {
    setToastMessage({
      type: "success",
      text: "Dashboard refreshed successfully.",
    });
  };

  return (
    <div className="leave-portal-shell">
      <div className="leave-portal-header">
        <div>
          <p className="section-label">Leaves & Attendance</p>
          <h1 className="section-title">
            Apply for leave, track status and view leave history.
          </h1>
        </div>
        <div className="header-actions">
          <div className="role-selector">
            <label>Role:</label>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value)}
            >
              <option value="superAdmin">Super Admin</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <button className="ghost-button" onClick={() => setShowModal(true)}>
            <FaUserCircle /> Leave Balance
          </button>
          <button
            className="primary-button"
            onClick={() => {
              setModalMode("apply");
              setShowModal(true);
            }}
          >
            <FaPlus /> Apply Leave
          </button>
        </div>
      </div>

      <div className="balance-grid">
        {LEAVE_TYPES.map((item) => {
          const balance = leaveBalance[item.id];
          const usage = Math.min(
            100,
            Math.round((balance.used / balance.total) * 100),
          );
          return (
            <div className="balance-card" key={item.id}>
              <div className="balance-card-top">
                <span
                  className="balance-icon"
                  style={{
                    backgroundColor: `${item.color}22`,
                    color: item.color,
                  }}
                >
                  {item.short}
                </span>
                <div>
                  <p className="balance-title">{item.label}</p>
                  <p className="balance-subtitle">
                    {balance.available} Available
                  </p>
                </div>
              </div>
              <div className="balance-stats">
                <div>
                  <span>Total</span>
                  <h3>{balance.total}</h3>
                </div>
                <div>
                  <span>Used</span>
                  <h3>{balance.used}</h3>
                </div>
              </div>
              <div className="balance-progress">
                <div
                  className="progress-bar"
                  style={{ width: `${usage}%`, backgroundColor: item.color }}
                />
                <span>{usage}% used</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="portal-grid">
        <section className="left-panel">
          <div className="panel-card">
            <div className="panel-card-header">
              <div>
                <h2>Apply Leave</h2>
                <p>
                  Submit leave requests with balance validation and document
                  support.
                </p>
              </div>
              <button
                className="ghost-button small-button"
                onClick={handleRefreshDashboard}
              >
                <FaSync /> Refresh
              </button>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>Leave Type</label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                >
                  {LEAVE_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>From Date</label>
                <input
                  type="date"
                  value={leaveForm.from}
                  onChange={(e) => handleInputChange("from", e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>To Date</label>
                <input
                  type="date"
                  value={leaveForm.to}
                  onChange={(e) => handleInputChange("to", e.target.value)}
                />
              </div>
              <div className="input-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={leaveForm.halfDay}
                    onChange={(e) =>
                      handleInputChange("halfDay", e.target.checked)
                    }
                  />
                  Half Day
                </label>
              </div>
              <div className="input-group full-width">
                <label>Total Days</label>
                <div className="readonly-field">{leaveForm.days || 0} days</div>
              </div>
              <div className="input-group full-width">
                <label>Reason</label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  placeholder="Enter leave reason"
                />
              </div>
              <div className="input-group full-width">
                <label>Attach Document</label>
                <div className="upload-box">
                  <input
                    type="file"
                    id="documentUpload"
                    onChange={handleUploadDocument}
                  />
                  <label htmlFor="documentUpload">
                    Click to upload or drag and drop JPG, PNG, PDF
                  </label>
                  {leaveForm.documentName && (
                    <span className="upload-file-name">
                      {leaveForm.documentName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={() =>
                  setLeaveForm({
                    requester: "Amit Singh",
                    type: "cl",
                    from: "",
                    to: "",
                    halfDay: false,
                    days: 0,
                    reason: "",
                    documentName: "",
                    status: "Pending",
                  })
                }
              >
                Cancel
              </button>
              <button
                className="primary-button"
                type="button"
                onClick={handleApplyLeave}
              >
                Submit Leave
              </button>
            </div>
          </div>

          <div className="panel-card attendance-card">
            <div className="panel-card-header">
              <div>
                <h2>My Attendance</h2>
                <p>Track daily check-ins and latest attendance summary.</p>
              </div>
              <span className="status-pill">Live</span>
            </div>
            <div className="attendance-overview-card">
              <div className="calendar-preview">
                <div className="calendar-title">July 2026</div>
                <div className="calendar-grid">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (label) => (
                      <span key={label} className="calendar-day-label">
                        {label}
                      </span>
                    ),
                  )}
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                  ].map((day) => (
                    <span
                      key={day}
                      className={`calendar-day ${[4, 11, 18, 24].includes(day) ? "calendar-present" : [10, 17, 25].includes(day) ? "calendar-absent" : ""}`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="attendance-summary-list">
                <div className="summary-item">
                  <strong>{attendanceSummary.present}</strong>
                  <span>Present</span>
                </div>
                <div className="summary-item">
                  <strong>{attendanceSummary.absent}</strong>
                  <span>Absent</span>
                </div>
                <div className="summary-item">
                  <strong>{attendanceSummary.halfDay}</strong>
                  <span>Half Day</span>
                </div>
                <div className="summary-item">
                  <strong>{attendanceSummary.late}</strong>
                  <span>Late</span>
                </div>
              </div>
            </div>

            <div className="recent-attendance-table">
              <div className="table-head-row">
                <span>Date</span>
                <span>Check In</span>
                <span>Check Out</span>
                <span>Hours</span>
                <span>Status</span>
              </div>
              {attendanceLogs.map((item) => (
                <div key={item.date} className="attendance-row">
                  <span>{item.date}</span>
                  <span>{item.checkIn}</span>
                  <span>{item.checkOut}</span>
                  <span>{item.hours}</span>
                  <span
                    className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="right-panel">
          <div className="panel-card history-panel">
            <div className="panel-card-header">
              <div>
                <h2>Leave History</h2>
                <p>Review recent leave requests and status details.</p>
              </div>
              <div className="filter-actions">
                <input
                  type="text"
                  placeholder="Search leaves..."
                  value={filters.query}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <select
                  value={filters.status}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={filters.type}
                  onChange={(e) => handleLeaveTypeFilter(e.target.value)}
                >
                  <option value="all">All Leave Types</option>
                  {LEAVE_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={filters.from}
                  onChange={(e) => handleDateFilter("from", e.target.value)}
                />
                <input
                  type="date"
                  value={filters.to}
                  onChange={(e) => handleDateFilter("to", e.target.value)}
                />
                <button
                  className="icon-button"
                  onClick={() => handleDownloadReport("pdf")}
                >
                  <FaFilePdf />
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleDownloadReport("excel")}
                >
                  <FaFileExcel />
                </button>
                <button className="icon-button" onClick={handlePrintReport}>
                  <FaDownload />
                </button>
              </div>
            </div>

            <div className="history-grid">
              {filterLeaveHistory.slice(0, 5).map((leave) => {
                const typeInfo =
                  LEAVE_TYPES.find((item) => item.id === leave.type) ||
                  LEAVE_TYPES[0];
                return (
                  <div className="history-card" key={leave.id}>
                    <div className="history-card-top">
                      <div
                        className="history-chip"
                        style={{
                          backgroundColor: `${typeInfo.color}15`,
                          color: typeInfo.color,
                        }}
                      >
                        {typeInfo.short}
                      </div>
                      <span
                        className="status-badge"
                        style={{
                          color: STATUS_LABELS[leave.status].color,
                          backgroundColor: STATUS_LABELS[leave.status].bg,
                        }}
                      >
                        {leave.status}
                      </span>
                    </div>
                    <div className="history-body">
                      <div className="history-row">
                        <strong>{leave.requester}</strong>
                        <span>{leave.days} Day(s)</span>
                      </div>
                      <div className="history-row">
                        <span>
                          {leave.from} - {leave.to}
                        </span>
                        <span>Applied {leave.appliedOn}</span>
                      </div>
                      <p>{leave.reason}</p>
                    </div>
                    <div className="history-actions">
                      <button
                        className="secondary-button small-button"
                        onClick={() => handleViewLeave(leave)}
                      >
                        <FaEye /> View
                      </button>
                      {leave.status === "Pending" && (
                        <button
                          className="secondary-button small-button"
                          onClick={() => handleCancelLeave(leave.id)}
                        >
                          <FaTimesCircle /> Cancel
                        </button>
                      )}
                      <button
                        className="secondary-button small-button"
                        onClick={() => handleEditLeave(leave)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="secondary-button small-button"
                        onClick={() => handleDeleteLeave(leave.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="panel-card manager-panel">
            <div className="panel-card-header">
              <div>
                <h2>Team Leave Overview</h2>
                <p>
                  Manager dashboard for pending requests and team leave
                  insights.
                </p>
              </div>
              <div className="manager-stats">
                <div className="stat-pill">
                  <strong>{EMPLOYEES.length}</strong>
                  <span>Total Employees</span>
                </div>
                <div className="stat-pill">
                  <strong>
                    {
                      leaveHistory.filter((item) => item.status === "Pending")
                        .length
                    }
                  </strong>
                  <span>Pending Requests</span>
                </div>
                <div className="stat-pill">
                  <strong>
                    {
                      leaveHistory.filter((item) => item.status === "Approved")
                        .length
                    }
                  </strong>
                  <span>Approved Leaves</span>
                </div>
                <div className="stat-pill">
                  <strong>
                    {
                      TEAM_LEAVE_OVERVIEW.filter(
                        (item) => item.status === "Approved",
                      ).length
                    }
                  </strong>
                  <span>On Leave Today</span>
                </div>
              </div>
            </div>

            <div className="team-table-actions">
              <div className="filter-row">
                <select
                  value={filters.status}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={filters.type}
                  onChange={(e) => handleLeaveTypeFilter(e.target.value)}
                >
                  <option value="all">All Leave Types</option>
                  {LEAVE_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <select
                  value={filters.department}
                  onChange={(e) => handleDepartmentFilter(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {[...new Set(EMPLOYEES.map((emp) => emp.department))].map(
                    (dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            <div className="team-table">
              <div className="table-head-row sticky-header">
                <span>Employee Name</span>
                <span>Department</span>
                <span>Leave Type</span>
                <span>From</span>
                <span>To</span>
                <span>Days</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {TEAM_LEAVE_OVERVIEW.map((row) => (
                <div key={row.id} className="team-row">
                  <span>{row.name}</span>
                  <span>{row.department}</span>
                  <span>{row.leaveType}</span>
                  <span>{row.from}</span>
                  <span>{row.to}</span>
                  <span>{row.days}</span>
                  <span className={`status-badge ${row.status.toLowerCase()}`}>
                    {row.status}
                  </span>
                  <span className="action-buttons">
                    <button
                      className="icon-action approve"
                      onClick={() => handleApproveLeave(row.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="icon-action reject"
                      onClick={() => handleRejectLeave(row.id)}
                    >
                      Reject
                    </button>
                    <button
                      className="icon-action view"
                      onClick={() => handleViewLeave(row)}
                    >
                      View
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {toastMessage && (
        <div className={`toast-notification ${toastMessage.type}`}>
          <FaInfoCircle /> {toastMessage.text}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={handleModalClose}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalMode === "view"
                  ? "Leave Details"
                  : modalMode === "edit"
                    ? "Edit Leave"
                    : "Apply Leave"}
              </h3>
              <button className="modal-close" onClick={handleModalClose}>
                ×
              </button>
            </div>
            {modalMode === "view" && selectedLeave ? (
              <div className="modal-content">
                <div className="detail-row">
                  <span>Employee</span>
                  <strong>{selectedLeave.requester}</strong>
                </div>
                <div className="detail-row">
                  <span>Leave Type</span>
                  <strong>
                    {
                      LEAVE_TYPES.find((item) => item.id === selectedLeave.type)
                        ?.label
                    }
                  </strong>
                </div>
                <div className="detail-row">
                  <span>Duration</span>
                  <strong>{selectedLeave.days} days</strong>
                </div>
                <div className="detail-row">
                  <span>From - To</span>
                  <strong>
                    {selectedLeave.from} - {selectedLeave.to}
                  </strong>
                </div>
                <div className="detail-row">
                  <span>Applied On</span>
                  <strong>{selectedLeave.appliedOn}</strong>
                </div>
                <div className="detail-row long">
                  <span>Reason</span>
                  <p>{selectedLeave.reason}</p>
                </div>
                <div className="detail-row">
                  <span>Status</span>
                  <strong>{selectedLeave.status}</strong>
                </div>
              </div>
            ) : (
              <div className="modal-content">
                <div className="input-group">
                  <label>Leave Type</label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  >
                    {LEAVE_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>From Date</label>
                  <input
                    type="date"
                    value={leaveForm.from}
                    onChange={(e) => handleInputChange("from", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>To Date</label>
                  <input
                    type="date"
                    value={leaveForm.to}
                    onChange={(e) => handleInputChange("to", e.target.value)}
                  />
                </div>
                <div className="input-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={leaveForm.halfDay}
                      onChange={(e) =>
                        handleInputChange("halfDay", e.target.checked)
                      }
                    />{" "}
                    Half Day
                  </label>
                </div>
                <div className="input-group">
                  <label>Total Days</label>
                  <div className="readonly-field">
                    {leaveForm.days || 0} day(s)
                  </div>
                </div>
                <div className="input-group full-width">
                  <label>Reason</label>
                  <textarea
                    value={leaveForm.reason}
                    onChange={(e) =>
                      handleInputChange("reason", e.target.value)
                    }
                    placeholder="Explain reason for leave"
                  />
                </div>
                <div className="input-group full-width">
                  <label>Upload Document</label>
                  <input type="file" onChange={handleUploadDocument} />
                </div>
                <div className="modal-actions">
                  <button
                    className="secondary-button"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="primary-button"
                    onClick={handleModalSubmit}
                  >
                    {modalMode === "edit" ? "Save Changes" : "Submit Request"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeavesPortalSection;
