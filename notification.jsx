// Settings.jsx - Complete Enterprise Settings Module with all features
import React, { useState, useCallback, useRef } from "react";
import {
  Save,
  X,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Shield,
  User,
  Users,
  Building2,
  Wallet,
  Package,
  Truck,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Monitor,
  Globe,
  Languages,
  DollarSign,
  Calendar,
  Clock,
  Lock,
  Key,
  Fingerprint,
  Database,
  Cloud,
  Upload,
  Download,
  RefreshCw,
  Settings as SettingsIcon,
  CheckCircle,
  AlertCircle,
  Info,
  Printer,
  FileText,
  CreditCard,
  Phone,
  MapPin,
  Link,
  Zap,
  ShieldCheck,
  BarChart3,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Warehouse as WarehouseIcon,
  Box,
  Layers,
  Copy,
  LogOut,
} from "lucide-react";
import "./notificationSettings.css";

// ============================================
// IMAGE UPLOAD COMPONENT (with drag & drop)
// ============================================
const ImageUpload = ({ label, value, onChange, accept = "image/*" }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onChange(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="image-upload-wrapper">
      <label>{label}</label>
      <div
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {value ? (
          <img src={value} alt={label} className="preview-image" />
        ) : (
          <div className="drop-placeholder">
            <Upload size={24} />
            <p>Drag & drop or click to upload</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files[0]) handleFile(e.target.files[0]);
          }}
        />
      </div>
      {value && (
        <button className="remove-btn" onClick={() => onChange(null)}>
          <Trash2 size={16} /> Remove
        </button>
      )}
    </div>
  );
};

// ============================================
// MAIN SETTINGS COMPONENT
// ============================================
const Settings = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [saveStatus, setSaveStatus] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [showTransferStock, setShowTransferStock] = useState(false);
  const [showAddTaxTemplate, setShowAddTaxTemplate] = useState(false);
  const [editingTaxTemplateId, setEditingTaxTemplateId] = useState(null);

  // Company Settings State
  const [companySettings, setCompanySettings] = useState({
    name: "Dushyant Power Tools",
    ownerName: "Dushyant Saket",
    gst: "22AAAAA1234A1Z5",
    pan: "ABCDE1234F",
    msme: "UDYAM-MP-01-0012345",
    businessType: "Proprietorship",
    registrationNo: "U12345MP2023PTC001234",
    email: "dushyantsaket20@gmail.com",
    mobile: "+919244526432",
    whatsapp: "+919244526432",
    website: "www.dushyantpowertools.com",
    address: "Gopal Das Rd, Sidhi, Jamodi Khurd, Madhya Pradesh 486661",
    state: "Madhya Pradesh",
    city: "Sidhi",
    pincode: "486661",
    country: "India",
    logo: null,
    invoiceLogo: null,
    signature: null,
    stamp: null,
    upiQR: null,
    bankQR: null,
    terms: "All disputes subject to Sidhi jurisdiction. E&OE.",
    footer: "© 2026 Dushyant Power Tools. All Rights Reserved.",
  });

  // User Management State
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dushyant Saket",
      email: "dushyantsaket20@gmail.com",
      mobile: "+919244526432",
      role: "Admin",
      status: "Active",
      lastLogin: "2026-07-01 10:30 AM",
      permissions: {
        add: true,
        delete: true,
        edit: true,
        export: true,
        print: true,
        reports: true,
        settings: true,
        approve: true,
      },
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@dpt.com",
      mobile: "+919876543210",
      role: "Manager",
      status: "Active",
      lastLogin: "2026-06-30 05:45 PM",
      permissions: {
        add: true,
        delete: false,
        edit: true,
        export: true,
        print: true,
        reports: true,
        settings: false,
        approve: true,
      },
    },
    {
      id: 3,
      name: "Priya Patel",
      email: "priya@dpt.com",
      mobile: "+919012345678",
      role: "Accountant",
      status: "Active",
      lastLogin: "2026-06-29 03:20 PM",
      permissions: {
        add: true,
        delete: false,
        edit: true,
        export: true,
        print: true,
        reports: true,
        settings: false,
        approve: false,
      },
    },
  ]);

  // Warehouse State
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: "Main Warehouse - Sidhi",
      code: "WH-SID-01",
      manager: "Rahul Sharma",
      status: "Active",
      address: "Gopal Das Rd, Sidhi, MP 486661",
      capacity: "5000 sq ft",
      contact: "+919876543210",
    },
    {
      id: 2,
      name: "Branch Warehouse - Jabalpur",
      code: "WH-JBP-01",
      manager: "Amit Singh",
      status: "Active",
      address: "Near Bus Stand, Jabalpur, MP 482001",
      capacity: "3000 sq ft",
      contact: "+918765432109",
    },
  ]);

  // Inventory Settings
  const [inventorySettings, setInventorySettings] = useState({
    negativeStock: false,
    lowStockAlert: 5,
    autoSKU: true,
    barcodeEnabled: true,
    qrCodeEnabled: false,
    notifyOnLowStock: true,
    notifyEmail: "dushyantsaket20@gmail.com",
    defaultUnit: "Pcs",
    weightUnit: "Kg",
  });

  // Tax Settings
  const [taxSettings, setTaxSettings] = useState({
    cgst: 9,
    sgst: 9,
    igst: 18,
    cess: 0,
    tds: 1,
    tcs: 0.1,
    defaultTax: 18,
    taxTemplates: [
      {
        id: 1,
        name: "Standard 18%",
        cgst: 9,
        sgst: 9,
        igst: 18,
        gstApplicable: true,
        type: "percentage",
      },
      {
        id: 2,
        name: "Reduced 5%",
        cgst: 2.5,
        sgst: 2.5,
        igst: 5,
        gstApplicable: true,
        type: "percentage",
      },
      {
        id: 3,
        name: "Zero 0%",
        cgst: 0,
        sgst: 0,
        igst: 0,
        gstApplicable: false,
        type: "percentage",
      },
    ],
    additionalCharges: [
      {
        id: 101,
        name: "Packing Charges",
        value: 50,
        type: "fixed",
        gstApplicable: true,
        enabled: true,
      },
      {
        id: 102,
        name: "Freight Charges",
        value: 100,
        type: "fixed",
        gstApplicable: true,
        enabled: true,
      },
    ],
  });

  // Invoice Settings
  const [invoiceSettings, setInvoiceSettings] = useState({
    prefix: "INV",
    suffix: "2026",
    startNumber: 1,
    quotationPrefix: "QUOT",
    purchasePrefix: "PUR",
    expensePrefix: "EXP",
    creditNotePrefix: "CRN",
    debitNotePrefix: "DRN",
    autoGenerate: true,
    theme: "professional",
    showSign: true,
    showStamp: true,
    showQr: true,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      orderConfirmed: true,
      orderShipped: true,
      orderDelivered: true,
      lowStockAlert: true,
      paymentReceived: true,
      newRegistration: true,
      contactQuery: true,
      newCustomer: false,
      purchaseOrder: false,
      warehouseTransfer: false,
      paymentDue: false,
      invoiceCreated: false,
    },
    sms: {
      orderConfirmed: false,
      orderShipped: false,
      orderDelivered: false,
      lowStockAlert: false,
      otp: true,
      newCustomer: false,
      purchaseOrder: false,
      warehouseTransfer: false,
      paymentDue: false,
      invoiceCreated: false,
    },
    whatsapp: {
      orderConfirmed: false,
      orderShipped: false,
      orderDelivered: false,
      newCustomer: false,
      purchaseOrder: false,
      warehouseTransfer: false,
      paymentDue: false,
      invoiceCreated: false,
    },
    push: {
      orderConfirmed: true,
      orderShipped: true,
      lowStockAlert: true,
      newCustomer: false,
      purchaseOrder: false,
      warehouseTransfer: false,
      paymentDue: false,
      invoiceCreated: false,
    },
  });

  // Integration Settings (unchanged)
  const [integrationSettings, setIntegrationSettings] = useState({
    googleDrive: { enabled: false, folderId: "" },
    dropbox: { enabled: false, token: "" },
    whatsapp: { enabled: false, phoneNumber: "", apiKey: "" },
    sms: { enabled: false, provider: "Twilio", apiKey: "", senderId: "" },
    email: {
      enabled: true,
      host: "smtp.gmail.com",
      port: 587,
      username: "",
      password: "",
      encryption: "TLS",
    },
    paymentGateway: {
      enabled: false,
      provider: "Razorpay",
      apiKey: "",
      secret: "",
    },
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    sidebarColor: "#1a4ab9",
    primaryColor: "#2c3691",
    compactMode: false,
    language: "Hindi",
    currency: "₹",
    dateFormat: "DD-MM-YYYY",
    timeZone: "Asia/Kolkata",
    showSalesWidget: true,
    showPurchaseWidget: true,
    showExpenseWidget: true,
    showProfitWidget: true,
    showLowStockWidget: true,
  });

  // Business Preferences
  const [businessPrefs, setBusinessPrefs] = useState({
    financialYear: "2026-27",
    openingStock: 0,
    openingBalance: 0,
    defaultWarehouse: warehouses[0]?.name || "",
    defaultTax: taxSettings.defaultTax || 18,
    defaultCurrency: "₹",
    defaultLanguage: "Hindi",
    roundOff: false,
    decimalPlaces: 2,
    weightUnit: "Kg",
    lengthUnit: "cm",
  });

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 1,
      user: "Dushyant Saket",
      action: "Login",
      time: "2026-07-01 10:30 AM",
      ip: "192.168.1.1",
      device: "Chrome Windows",
    },
    {
      id: 2,
      user: "Rahul Sharma",
      action: "Deleted Product",
      time: "2026-06-30 05:45 PM",
      ip: "192.168.1.2",
      device: "Safari Mac",
    },
    {
      id: 3,
      user: "Priya Patel",
      action: "Updated Settings",
      time: "2026-06-29 03:20 PM",
      ip: "192.168.1.3",
      device: "Firefox Linux",
    },
    {
      id: 4,
      user: "Dushyant Saket",
      action: "Generated Report",
      time: "2026-06-28 11:00 AM",
      ip: "192.168.1.1",
      device: "Chrome Windows",
    },
  ]);

  // API Settings
  const [apiSettings, setApiSettings] = useState({
    apiKey: "dpt_api_2026_xyz123",
    secretKey: "••••••••••••••••",
    jwtSecret: "••••••••••••••••",
    webhookUrl: "https://api.dushyantpowertools.com/webhook",
    accessToken: "••••••••••••••••",
  });
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showJWTSecret, setShowJWTSecret] = useState(false);
  const [showAccessToken, setShowAccessToken] = useState(false);

  // Handlers
  const handleSave = useCallback((section, data) => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 1000);
    console.log(`Saved ${section}:`, data);
  }, []);

  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      status: "Active",
      lastLogin: "Never",
      permissions: {
        add: false,
        delete: false,
        edit: false,
        export: false,
        print: false,
        reports: false,
        settings: false,
        approve: false,
      },
    };
    setUsers([...users, newUser]);
    setShowAddUserModal(false);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleTogglePermission = (userId, permission) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            permissions: {
              ...u.permissions,
              [permission]: !u.permissions[permission],
            },
          };
        }
        return u;
      }),
    );
  };

  // Warehouse handlers
  const handleAddWarehouse = (data) => {
    const newWarehouse = {
      id: warehouses.length + 1,
      ...data,
      status: "Active",
    };
    setWarehouses([...warehouses, newWarehouse]);
    setShowAddWarehouseModal(false);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleDeleteWarehouse = (id) => {
    if (window.confirm("Delete this warehouse?")) {
      setWarehouses(warehouses.filter((w) => w.id !== id));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleEditWarehouse = (warehouse) => {
    setEditingWarehouse(warehouse);
  };

  const handleSaveWarehouse = (updated) => {
    setWarehouses(warehouses.map((w) => (w.id === updated.id ? updated : w)));
    setEditingWarehouse(null);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleTransferStock = (data) => {
    console.log("Stock transferred:", data);
    setShowTransferStock(false);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  // Tax template handlers
  const handleAddTaxTemplate = (template) => {
    setTaxSettings({
      ...taxSettings,
      taxTemplates: [
        ...taxSettings.taxTemplates,
        { ...template, id: Date.now() },
      ],
    });
    setShowAddTaxTemplate(false);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleEditTaxTemplate = (id) => {
    setEditingTaxTemplateId(id);
  };

  const handleSaveTaxTemplate = (updated) => {
    setTaxSettings({
      ...taxSettings,
      taxTemplates: taxSettings.taxTemplates.map((t) =>
        t.id === updated.id ? updated : t,
      ),
    });
    setEditingTaxTemplateId(null);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleDeleteTaxTemplate = (id) => {
    if (window.confirm("Delete this tax template?")) {
      setTaxSettings({
        ...taxSettings,
        taxTemplates: taxSettings.taxTemplates.filter((t) => t.id !== id),
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleBackup = (type) => {
    setSaveStatus("saving");
    setTimeout(() => {
      const data = {
        company: companySettings,
        users,
        warehouses,
        inventory: inventorySettings,
        tax: taxSettings,
        invoice: invoiceSettings,
        timestamp: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-${type}-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 1500);
  };

  const handleChangePassword = (oldPass, newPass) => {
    if (oldPass && newPass && newPass.length >= 8) {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
      setShowPasswordModal(false);
    } else {
      alert("Password must be at least 8 characters.");
    }
  };

  // Tabs
  const tabs = [
    { id: "company", label: "Company", icon: Building2 },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing & Invoice", icon: FileText },
    { id: "tax", label: "Tax & GST", icon: CreditCard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "warehouse", label: "Warehouse", icon: WarehouseIcon },
    { id: "expenses", label: "Expenses", icon: Wallet },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "backup", label: "Backup", icon: Database },
    { id: "integrations", label: "Integrations", icon: Link },
    { id: "appearance", label: "Appearance", icon: Monitor },
    { id: "preferences", label: "Preferences", icon: Sliders },
    { id: "logs", label: "Logs", icon: Info },
    { id: "api", label: "API", icon: Key },
    { id: "developer", label: "Developer", icon: Zap },
  ];

  return (
    <div className="settings-container">
      {saveStatus && (
        <div className={`settings-toast ${saveStatus}`}>
          {saveStatus === "saving" ? (
            <RefreshCw size={20} className="spinning" />
          ) : (
            <CheckCircle size={20} />
          )}
          <span>
            {saveStatus === "saving"
              ? "Saving..."
              : "Settings saved successfully!"}
          </span>
        </div>
      )}

      <div className="settings-layout">
        <div className="settings-sidebar">
          <div className="settings-sidebar-header">
            <SettingsIcon size={24} />
            <span>Settings</span>
          </div>
          <div className="settings-sidebar-menu">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`settings-menu-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
                {tab.id === "security" && <span className="menu-badge">2</span>}
                {tab.id === "notifications" && (
                  <span className="menu-badge">3</span>
                )}
                {tab.id === "logs" && <span className="menu-dot" />}
              </button>
            ))}
          </div>
          <div className="settings-sidebar-footer">
            <button
              className="settings-save-btn"
              onClick={() =>
                handleSave("all", { companySettings, users, warehouses })
              }
            >
              <Save size={16} /> Save All Changes
            </button>
          </div>
        </div>

        <div className="settings-content">
          {activeTab === "company" && (
            <CompanySettings
              settings={companySettings}
              setSettings={setCompanySettings}
              onSave={handleSave}
            />
          )}
          {activeTab === "users" && (
            <UserManagement
              users={users}
              onAddUser={() => setShowAddUserModal(true)}
              onDeleteUser={handleDeleteUser}
              onTogglePermission={handleTogglePermission}
            />
          )}
          {activeTab === "security" && (
            <SecuritySettings
              onChangePassword={() => setShowPasswordModal(true)}
              onToggle2FA={() => setShow2FAModal(true)}
            />
          )}
          {activeTab === "billing" && (
            <BillingSettings
              settings={invoiceSettings}
              setSettings={setInvoiceSettings}
              companySettings={companySettings}
              onSave={handleSave}
            />
          )}
          {activeTab === "tax" && (
            <TaxSettings
              settings={taxSettings}
              setSettings={setTaxSettings}
              onAddTemplate={() => setShowAddTaxTemplate(true)}
              onEditTemplate={handleEditTaxTemplate}
              onDeleteTemplate={handleDeleteTaxTemplate}
              editingId={editingTaxTemplateId}
              onSaveTemplate={handleSaveTaxTemplate}
              onSave={handleSave}
            />
          )}
          {activeTab === "inventory" && (
            <InventorySettings
              settings={inventorySettings}
              setSettings={setInventorySettings}
              products={[]}
              onSave={handleSave}
            />
          )}
          {activeTab === "warehouse" && (
            <WarehouseSettings
              warehouses={warehouses}
              onAddWarehouse={() => setShowAddWarehouseModal(true)}
              onDeleteWarehouse={handleDeleteWarehouse}
              onEditWarehouse={handleEditWarehouse}
              onTransfer={() => setShowTransferStock(true)}
              onSave={handleSave}
            />
          )}
          {activeTab === "expenses" && <ExpenseSettings onSave={handleSave} />}
          {activeTab === "payments" && (
            <PaymentSettings
              settings={integrationSettings.paymentGateway}
              setSettings={(data) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  paymentGateway: data,
                })
              }
              onSave={handleSave}
            />
          )}
          {activeTab === "notifications" && (
            <NotificationSettings
              settings={notificationSettings}
              setSettings={setNotificationSettings}
              onSave={handleSave}
            />
          )}
          {activeTab === "backup" && (
            <BackupSettings
              onBackup={handleBackup}
              onRestore={() => document.getElementById("restoreInput")?.click()}
            />
          )}
          {activeTab === "integrations" && (
            <IntegrationSettings
              settings={integrationSettings}
              setSettings={setIntegrationSettings}
              onSave={handleSave}
            />
          )}
          {activeTab === "appearance" && (
            <AppearanceSettings
              settings={appearanceSettings}
              setSettings={setAppearanceSettings}
              onSave={handleSave}
            />
          )}
          {activeTab === "preferences" && (
            <BusinessPreferences
              settings={businessPrefs}
              setSettings={setBusinessPrefs}
              warehouses={warehouses}
              taxSettings={taxSettings}
              onSave={handleSave}
            />
          )}
          {activeTab === "logs" && (
            <LogsSettings
              logs={activityLogs}
              onClear={() => setActivityLogs([])}
            />
          )}
          {activeTab === "api" && (
            <APISettings
              settings={apiSettings}
              setSettings={setApiSettings}
              showSecretKey={showSecretKey}
              setShowSecretKey={setShowSecretKey}
              showJWTSecret={showJWTSecret}
              setShowJWTSecret={setShowJWTSecret}
              showAccessToken={showAccessToken}
              setShowAccessToken={setShowAccessToken}
              onSave={handleSave}
            />
          )}
          {activeTab === "developer" && (
            <DeveloperSettings onSave={handleSave} />
          )}
        </div>
      </div>

      {/* Modals */}
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSubmit={handleChangePassword}
        />
      )}
      {show2FAModal && (
        <TwoFactorModal
          onClose={() => setShow2FAModal(false)}
          onEnable={() => {
            setShow2FAModal(false);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus(""), 3000);
          }}
        />
      )}
      {showAddUserModal && (
        <AddUserModal
          onClose={() => setShowAddUserModal(false)}
          onSubmit={handleAddUser}
        />
      )}
      {showAddWarehouseModal && (
        <AddWarehouseModal
          onClose={() => setShowAddWarehouseModal(false)}
          onSubmit={handleAddWarehouse}
        />
      )}
      {editingWarehouse && (
        <EditWarehouseModal
          warehouse={editingWarehouse}
          onClose={() => setEditingWarehouse(null)}
          onSave={handleSaveWarehouse}
        />
      )}
      {showTransferStock && (
        <TransferStockModal
          warehouses={warehouses}
          onClose={() => setShowTransferStock(false)}
          onTransfer={handleTransferStock}
        />
      )}
      {showAddTaxTemplate && (
        <AddTaxTemplateModal
          onClose={() => setShowAddTaxTemplate(false)}
          onAdd={handleAddTaxTemplate}
        />
      )}
      {editingTaxTemplateId && (
        <EditTaxTemplateModal
          template={taxSettings.taxTemplates.find(
            (t) => t.id === editingTaxTemplateId,
          )}
          onClose={() => setEditingTaxTemplateId(null)}
          onSave={handleSaveTaxTemplate}
        />
      )}
    </div>
  );
};

// ============================================
// COMPANY SETTINGS (with ImageUpload)
// ============================================
const CompanySettings = ({ settings, setSettings, onSave }) => {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });

  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Company Settings</h2>
          <p>Manage your company information, branding, and legal details</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("company", settings)}
        >
          <Save size={16} /> Save Company
        </button>
      </div>

      <div className="settings-grid">
        {/* Basic Information */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Building2 size={20} />
            <h3>Basic Information</h3>
          </div>
          <div className="settings-form">
            <ImageUpload
              label="Company Logo"
              value={settings.logo}
              onChange={(val) => handleChange("logo", val)}
            />
            <div className="form-row">
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Owner Name *</label>
                <input
                  type="text"
                  value={settings.ownerName}
                  onChange={(e) => handleChange("ownerName", e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Business Type</label>
                <select
                  value={settings.businessType}
                  onChange={(e) => handleChange("businessType", e.target.value)}
                >
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Private Limited">Private Limited</option>
                  <option value="Public Limited">Public Limited</option>
                  <option value="LLP">LLP</option>
                </select>
              </div>
              <div className="form-group">
                <label>Registration Number</label>
                <input
                  type="text"
                  value={settings.registrationNo}
                  onChange={(e) =>
                    handleChange("registrationNo", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>GST Number</label>
                <input
                  type="text"
                  value={settings.gst}
                  onChange={(e) => handleChange("gst", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>PAN Number</label>
                <input
                  type="text"
                  value={settings.pan}
                  onChange={(e) => handleChange("pan", e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>MSME / Udyam Number</label>
                <input
                  type="text"
                  value={settings.msme}
                  onChange={(e) => handleChange("msme", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Phone size={20} />
            <h3>Contact Information</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  value={settings.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>WhatsApp Number</label>
                <input
                  type="tel"
                  value={settings.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                value={settings.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="settings-card full-width">
          <div className="settings-card-header">
            <MapPin size={20} />
            <h3>Address</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Full Address *</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  value={settings.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  value={settings.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  value={settings.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Branding + QR Codes */}
        <div className="settings-card full-width">
          <div className="settings-card-header">
            <FileText size={20} />
            <h3>Branding & QR Codes</h3>
          </div>
          <div className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <ImageUpload
                  label="Invoice Logo"
                  value={settings.invoiceLogo}
                  onChange={(val) => handleChange("invoiceLogo", val)}
                />
              </div>
              <div className="form-group">
                <ImageUpload
                  label="Signature"
                  value={settings.signature}
                  onChange={(val) => handleChange("signature", val)}
                />
              </div>
              <div className="form-group">
                <ImageUpload
                  label="Company Stamp"
                  value={settings.stamp}
                  onChange={(val) => handleChange("stamp", val)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <ImageUpload
                  label="UPI QR Code"
                  value={settings.upiQR}
                  onChange={(val) => handleChange("upiQR", val)}
                />
              </div>
              <div className="form-group">
                <ImageUpload
                  label="Bank QR Code"
                  value={settings.bankQR}
                  onChange={(val) => handleChange("bankQR", val)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Terms & Conditions</label>
              <textarea
                value={settings.terms}
                onChange={(e) => handleChange("terms", e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Invoice Footer</label>
              <input
                type="text"
                value={settings.footer}
                onChange={(e) => handleChange("footer", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// USER MANAGEMENT (with role presets)
// ============================================
const UserManagement = ({
  users,
  onAddUser,
  onDeleteUser,
  onTogglePermission,
}) => {
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>User Management</h2>
          <p>Manage users, roles, and permissions</p>
        </div>
        <button className="settings-add-btn" onClick={onAddUser}>
          <Plus size={16} /> Add User
        </button>
      </div>
      <div className="settings-card">
        <div className="users-list">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <div className="user-avatar">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <p>{user.mobile}</p>
                </div>
                <div className="user-status">
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                  <span className="role-badge">{user.role}</span>
                </div>
                <div className="user-actions">
                  <button className="icon-btn">
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="icon-btn danger"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="permissions-grid">
                {[
                  "add",
                  "edit",
                  "delete",
                  "export",
                  "print",
                  "reports",
                  "settings",
                  "approve",
                ].map((perm) => (
                  <label key={perm} className="toggle-label">
                    <input
                      type="checkbox"
                      checked={user.permissions[perm]}
                      onChange={() => onTogglePermission(user.id, perm)}
                    />
                    <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
                  </label>
                ))}
              </div>
              <div className="user-footer">
                <span className="last-login">Last Login: {user.lastLogin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// SECURITY SETTINGS (unchanged)
// ============================================
const SecuritySettings = ({ onChangePassword, onToggle2FA }) => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Security Settings</h2>
          <p>Manage password, 2FA, and session security</p>
        </div>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Lock size={20} />
            <h3>Password</h3>
          </div>
          <div className="settings-form">
            <button className="settings-action-btn" onClick={onChangePassword}>
              <Key size={16} /> Change Password
            </button>
            <p className="settings-hint">Last changed: 30 days ago</p>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Fingerprint size={20} />
            <h3>Two-Factor Authentication</h3>
          </div>
          <div className="settings-form">
            <div className="toggle-group">
              <span>Enable 2FA</span>
              <button
                className={`toggle-switch ${twoFAEnabled ? "active" : ""}`}
                onClick={() => {
                  if (!twoFAEnabled) onToggle2FA();
                  else setTwoFAEnabled(false);
                }}
              >
                {twoFAEnabled ? (
                  <ToggleRight size={24} />
                ) : (
                  <ToggleLeft size={24} />
                )}
              </button>
            </div>
            {twoFAEnabled && (
              <div className="settings-hint success">
                <CheckCircle size={16} />
                <span>2FA is enabled for your account</span>
              </div>
            )}
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Monitor size={20} />
            <h3>Active Sessions</h3>
          </div>
          <div className="settings-form">
            <div className="session-item">
              <div>
                <strong>Chrome • Windows</strong>
                <p>IP: 192.168.1.1 • Last active: Now</p>
              </div>
              <span className="status-badge active">Active</span>
            </div>
            <div className="session-item">
              <div>
                <strong>Safari • Mac</strong>
                <p>IP: 192.168.1.2 • Last active: 2 hours ago</p>
              </div>
              <span className="status-badge active">Active</span>
            </div>
            <button className="settings-action-btn danger">
              <LogOut size={16} /> Logout All Devices
            </button>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Shield size={20} />
            <h3>Login History</h3>
          </div>
          <div className="settings-form">
            <div className="login-history">
              <div className="login-item">
                <span>Today 10:30 AM</span>
                <span>Chrome • Windows</span>
                <span>192.168.1.1</span>
                <span className="status-badge success">Success</span>
              </div>
              <div className="login-item">
                <span>Yesterday 5:45 PM</span>
                <span>Safari • Mac</span>
                <span>192.168.1.2</span>
                <span className="status-badge success">Success</span>
              </div>
              <div className="login-item">
                <span>2 days ago 3:20 PM</span>
                <span>Firefox • Linux</span>
                <span>192.168.1.3</span>
                <span className="status-badge danger">Failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// BILLING SETTINGS (with sync from company)
// ============================================
const BillingSettings = ({
  settings,
  setSettings,
  companySettings,
  onSave,
}) => {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });
  const syncFromCompany = () => {
    setSettings((prev) => ({
      ...prev,
      // In a real app, you would copy logo, stamp, signature, terms, footer from companySettings
      // But since invoice settings don't have those fields, we can show a message
    }));
    alert(
      "Company branding (logo, stamp, signature, terms, footer) will be used in invoice templates.",
    );
  };

  const themes = ["Classic", "Modern", "Professional", "Compact"];

  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Billing & Invoice Settings</h2>
          <p>Configure invoice numbering, themes, and templates</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="settings-action-btn" onClick={syncFromCompany}>
            <RefreshCw size={16} /> Sync from Company
          </button>
          <button
            className="settings-save-btn"
            onClick={() => onSave("billing", settings)}
          >
            <Save size={16} /> Save Invoice
          </button>
        </div>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <FileText size={20} />
            <h3>Invoice Numbering</h3>
          </div>
          <div className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label>Prefix</label>
                <input
                  type="text"
                  value={settings.prefix}
                  onChange={(e) => handleChange("prefix", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Suffix</label>
                <input
                  type="text"
                  value={settings.suffix}
                  onChange={(e) => handleChange("suffix", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Start Number</label>
                <input
                  type="number"
                  value={settings.startNumber}
                  onChange={(e) =>
                    handleChange("startNumber", parseInt(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.autoGenerate}
                  onChange={(e) =>
                    handleChange("autoGenerate", e.target.checked)
                  }
                />{" "}
                Auto-generate invoice numbers
              </label>
            </div>
            <div className="form-group">
              <label>
                Preview: {settings.prefix}-
                {String(settings.startNumber).padStart(4, "0")}-
                {settings.suffix}
              </label>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Printer size={20} />
            <h3>Invoice Theme</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Theme</label>
              <div className="theme-options">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    className={`theme-option ${settings.theme === theme.toLowerCase() ? "active" : ""}`}
                    onClick={() => handleChange("theme", theme.toLowerCase())}
                  >
                    <div className={`theme-preview ${theme.toLowerCase()}`} />
                    <span>{theme}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.showSign}
                  onChange={(e) => handleChange("showSign", e.target.checked)}
                />{" "}
                Show Signature
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.showStamp}
                  onChange={(e) => handleChange("showStamp", e.target.checked)}
                />{" "}
                Show Stamp
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.showQr}
                  onChange={(e) => handleChange("showQr", e.target.checked)}
                />{" "}
                Show QR Code
              </label>
            </div>
          </div>
        </div>
        <div className="settings-card full-width">
          <div className="settings-card-header">
            <FileText size={20} />
            <h3>Document Prefixes</h3>
          </div>
          <div className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label>Quotation</label>
                <input
                  type="text"
                  value={settings.quotationPrefix}
                  onChange={(e) =>
                    handleChange("quotationPrefix", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Purchase Order</label>
                <input
                  type="text"
                  value={settings.purchasePrefix}
                  onChange={(e) =>
                    handleChange("purchasePrefix", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Expense</label>
                <input
                  type="text"
                  value={settings.expensePrefix}
                  onChange={(e) =>
                    handleChange("expensePrefix", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Credit Note</label>
                <input
                  type="text"
                  value={settings.creditNotePrefix}
                  onChange={(e) =>
                    handleChange("creditNotePrefix", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// TAX SETTINGS (with add/edit/delete templates)
// ============================================
const TaxSettings = ({
  settings,
  setSettings,
  onAddTemplate,
  onEditTemplate,
  onDeleteTemplate,
  editingId,
  onSaveTemplate,
  onSave,
}) => {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });
  const handleTaxTemplateChange = (id, key, value) => {
    setSettings({
      ...settings,
      taxTemplates: settings.taxTemplates.map((t) =>
        t.id === id ? { ...t, [key]: parseFloat(value) || 0 } : t,
      ),
    });
  };

  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Tax & GST Settings</h2>
          <p>Configure GST, TDS, TCS, and tax templates</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="settings-add-btn" onClick={onAddTemplate}>
            <Plus size={16} /> Add Tax Template
          </button>
          <button
            className="settings-save-btn"
            onClick={() => onSave("tax", settings)}
          >
            <Save size={16} /> Save Tax
          </button>
        </div>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <CreditCard size={20} />
            <h3>GST Rates</h3>
          </div>
          <div className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label>CGST (%)</label>
                <input
                  type="number"
                  value={settings.cgst}
                  onChange={(e) =>
                    handleChange("cgst", parseFloat(e.target.value) || 0)
                  }
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>SGST (%)</label>
                <input
                  type="number"
                  value={settings.sgst}
                  onChange={(e) =>
                    handleChange("sgst", parseFloat(e.target.value) || 0)
                  }
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>IGST (%)</label>
                <input
                  type="number"
                  value={settings.igst}
                  onChange={(e) =>
                    handleChange("igst", parseFloat(e.target.value) || 0)
                  }
                  step="0.1"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>CESS (%)</label>
                <input
                  type="number"
                  value={settings.cess}
                  onChange={(e) =>
                    handleChange("cess", parseFloat(e.target.value) || 0)
                  }
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>TDS (%)</label>
                <input
                  type="number"
                  value={settings.tds}
                  onChange={(e) =>
                    handleChange("tds", parseFloat(e.target.value) || 0)
                  }
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>TCS (%)</label>
                <input
                  type="number"
                  value={settings.tcs}
                  onChange={(e) =>
                    handleChange("tcs", parseFloat(e.target.value) || 0)
                  }
                  step="0.1"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Default Tax (%)</label>
              <input
                type="number"
                value={settings.defaultTax}
                onChange={(e) =>
                  handleChange("defaultTax", parseFloat(e.target.value) || 0)
                }
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="settings-card full-width">
          <div className="settings-card-header">
            <FileText size={20} />
            <h3>Tax Templates</h3>
          </div>
          <div className="settings-form">
            <div className="tax-templates">
              {settings.taxTemplates.map((template) => (
                <div key={template.id} className="tax-template">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={template.name}
                      onChange={(e) =>
                        handleTaxTemplateChange(
                          template.id,
                          "name",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>CGST</label>
                    <input
                      type="number"
                      value={template.cgst}
                      onChange={(e) =>
                        handleTaxTemplateChange(
                          template.id,
                          "cgst",
                          e.target.value,
                        )
                      }
                      step="0.1"
                    />
                  </div>
                  <div className="form-group">
                    <label>SGST</label>
                    <input
                      type="number"
                      value={template.sgst}
                      onChange={(e) =>
                        handleTaxTemplateChange(
                          template.id,
                          "sgst",
                          e.target.value,
                        )
                      }
                      step="0.1"
                    />
                  </div>
                  <div className="form-group">
                    <label>IGST</label>
                    <input
                      type="number"
                      value={template.igst}
                      onChange={(e) =>
                        handleTaxTemplateChange(
                          template.id,
                          "igst",
                          e.target.value,
                        )
                      }
                      step="0.1"
                    />
                  </div>
                  <div className="template-total">
                    Total: {template.cgst + template.sgst}%
                  </div>
                  <div className="template-actions">
                    <button
                      className="icon-btn"
                      onClick={() => onEditTemplate(template.id)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => onDeleteTemplate(template.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// INVENTORY SETTINGS (unchanged)
// ============================================
const InventorySettings = ({
  settings,
  setSettings,
  products = [],
  onSave,
}) => {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });
  const lowStockProducts = products.filter(
    (p) => p.stock_quantity <= settings.lowStockAlert,
  );

  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Inventory Settings</h2>
          <p>Manage stock alerts, SKU generation, and barcode settings</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("inventory", settings)}
        >
          <Save size={16} /> Save Inventory
        </button>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Package size={20} />
            <h3>Stock Management</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.negativeStock}
                  onChange={(e) =>
                    handleChange("negativeStock", e.target.checked)
                  }
                />{" "}
                Allow Negative Stock{" "}
                <span className="hint">(Not recommended)</span>
              </label>
            </div>
            <div className="form-group">
              <label>Low Stock Alert (Quantity)</label>
              <input
                type="number"
                value={settings.lowStockAlert}
                onChange={(e) =>
                  handleChange("lowStockAlert", parseInt(e.target.value) || 0)
                }
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.notifyOnLowStock}
                  onChange={(e) =>
                    handleChange("notifyOnLowStock", e.target.checked)
                  }
                />{" "}
                Send Notification on Low Stock
              </label>
            </div>
            {settings.notifyOnLowStock && (
              <div className="form-group">
                <label>Notification Email</label>
                <input
                  type="email"
                  value={settings.notifyEmail}
                  onChange={(e) => handleChange("notifyEmail", e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Box size={20} />
            <h3>SKU & Barcode</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.autoSKU}
                  onChange={(e) => handleChange("autoSKU", e.target.checked)}
                />{" "}
                Auto-generate SKU
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.barcodeEnabled}
                  onChange={(e) =>
                    handleChange("barcodeEnabled", e.target.checked)
                  }
                />{" "}
                Enable Barcode
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.qrCodeEnabled}
                  onChange={(e) =>
                    handleChange("qrCodeEnabled", e.target.checked)
                  }
                />{" "}
                Enable QR Code
              </label>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Layers size={20} />
            <h3>Units</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Default Unit</label>
              <select
                value={settings.defaultUnit}
                onChange={(e) => handleChange("defaultUnit", e.target.value)}
              >
                <option value="Pcs">Pcs</option>
                <option value="Kg">Kg</option>
                <option value="Gm">Gm</option>
                <option value="Ltr">Ltr</option>
                <option value="Mtr">Mtr</option>
                <option value="Ft">Ft</option>
                <option value="Box">Box</option>
              </select>
            </div>
            <div className="form-group">
              <label>Weight Unit</label>
              <select
                value={settings.weightUnit}
                onChange={(e) => handleChange("weightUnit", e.target.value)}
              >
                <option value="Kg">Kg</option>
                <option value="Gm">Gm</option>
                <option value="Lbs">Lbs</option>
                <option value="Oz">Oz</option>
              </select>
            </div>
          </div>
        </div>
        {lowStockProducts.length > 0 && (
          <div className="settings-card full-width">
            <div className="settings-card-header">
              <AlertCircle size={20} className="warning" />
              <h3>Low Stock Products</h3>
            </div>
            <div className="settings-form">
              <div className="low-stock-list">
                {lowStockProducts.slice(0, 5).map((p) => (
                  <div key={p.id} className="low-stock-item">
                    <span>{p.name}</span>
                    <span className="stock-qty">Qty: {p.stock_quantity}</span>
                    <span className="status-badge warning">Low Stock</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// WAREHOUSE SETTINGS (with edit & transfer)
// ============================================
const WarehouseSettings = ({
  warehouses,
  onAddWarehouse,
  onDeleteWarehouse,
  onEditWarehouse,
  onTransfer,
  onSave,
}) => {
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Warehouse Management</h2>
          <p>Manage multiple warehouses, stock transfers, and locations</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="settings-add-btn" onClick={onAddWarehouse}>
            <Plus size={16} /> Add Warehouse
          </button>
          <button className="settings-action-btn" onClick={onTransfer}>
            <Truck size={16} /> Transfer Stock
          </button>
        </div>
      </div>
      <div className="settings-grid">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id} className="settings-card warehouse-card">
            <div className="settings-card-header">
              <WarehouseIcon size={20} />
              <h3>{warehouse.name}</h3>
              <span
                className={`status-badge ${warehouse.status.toLowerCase()}`}
              >
                {warehouse.status}
              </span>
            </div>
            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Code</label>
                  <input type="text" value={warehouse.code} disabled />
                </div>
                <div className="form-group">
                  <label>Manager</label>
                  <input type="text" value={warehouse.manager} disabled />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" value={warehouse.address} disabled />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="text" value={warehouse.capacity} disabled />
                </div>
                <div className="form-group">
                  <label>Contact</label>
                  <input type="text" value={warehouse.contact} disabled />
                </div>
              </div>
              <div className="warehouse-actions">
                <button
                  className="settings-action-btn"
                  onClick={() => onEditWarehouse(warehouse)}
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  className="settings-action-btn"
                  onClick={() => onDeleteWarehouse(warehouse.id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
                <button className="settings-action-btn" onClick={onTransfer}>
                  <Truck size={16} /> Transfer Stock
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// EXPENSE SETTINGS (unchanged)
// ============================================
const ExpenseSettings = ({ onSave }) => {
  const [categories, setCategories] = useState([
    "Rent",
    "Salary",
    "Electricity",
    "Internet",
    "Fuel",
    "Travel",
    "Repair",
    "Marketing",
    "Food",
    "Maintenance",
    "Insurance",
    "Tax",
    "Office Supplies",
    "Software",
    "Training",
    "Miscellaneous",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [approvalRequired, setApprovalRequired] = useState(true);
  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };
  const deleteCategory = (cat) =>
    setCategories(categories.filter((c) => c !== cat));

  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Expense Settings</h2>
          <p>Manage expense categories and approval workflow</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("expenses", { categories, approvalRequired })}
        >
          <Save size={16} /> Save Expenses
        </button>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Wallet size={20} />
            <h3>Expense Categories</h3>
          </div>
          <div className="settings-form">
            <div className="category-input">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                onKeyPress={(e) => e.key === "Enter" && addCategory()}
              />
              <button className="settings-action-btn" onClick={addCategory}>
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="category-list">
              {categories.map((cat) => (
                <div key={cat} className="category-item">
                  <span>{cat}</span>
                  <button
                    className="icon-btn danger"
                    onClick={() => deleteCategory(cat)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <ShieldCheck size={20} />
            <h3>Approval Settings</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={approvalRequired}
                  onChange={(e) => setApprovalRequired(e.target.checked)}
                />{" "}
                Require Approval for Expenses
              </label>
            </div>
            {approvalRequired && (
              <div className="settings-hint">
                <Info size={16} />
                <span>Expenses above ₹10,000 will need manager approval</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PAYMENT SETTINGS (unchanged)
// ============================================
const PaymentSettings = ({ settings, setSettings, onSave }) => {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "cash", name: "Cash", enabled: true, icon: "💵" },
    { id: "bank", name: "Bank Transfer", enabled: true, icon: "🏦" },
    { id: "upi", name: "UPI", enabled: true, icon: "📱" },
    { id: "card", name: "Card Payment", enabled: false, icon: "💳" },
    { id: "cheque", name: "Cheque", enabled: false, icon: "📝" },
  ]);
  const toggleMethod = (id) =>
    setPaymentMethods(
      paymentMethods.map((m) =>
        m.id === id ? { ...m, enabled: !m.enabled } : m,
      ),
    );

  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Payment Settings</h2>
          <p>Configure payment methods and online gateways</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("payments", { settings, paymentMethods })}
        >
          <Save size={16} /> Save Payments
        </button>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <CreditCard size={20} />
            <h3>Payment Methods</h3>
          </div>
          <div className="settings-form">
            {paymentMethods.map((m) => (
              <div key={m.id} className="payment-method">
                <span className="method-icon">{m.icon}</span>
                <span className="method-name">{m.name}</span>
                <button
                  className={`toggle-switch ${m.enabled ? "active" : ""}`}
                  onClick={() => toggleMethod(m.id)}
                >
                  {m.enabled ? (
                    <ToggleRight size={24} />
                  ) : (
                    <ToggleLeft size={24} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Link size={20} />
            <h3>Online Payment Gateway</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Provider</label>
              <select
                value={settings.provider || "Razorpay"}
                onChange={(e) => handleChange("provider", e.target.value)}
              >
                <option value="Razorpay">Razorpay</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Cashfree">Cashfree</option>
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <div className="form-group">
              <label>API Key</label>
              <input
                type="text"
                value={settings.apiKey || ""}
                onChange={(e) => handleChange("apiKey", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Secret Key</label>
              <div className="password-input">
                <input
                  type="password"
                  value={settings.secret || ""}
                  onChange={(e) => handleChange("secret", e.target.value)}
                />
                <button className="toggle-visibility">
                  <EyeOff size={16} />
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.enabled || false}
                  onChange={(e) => handleChange("enabled", e.target.checked)}
                />{" "}
                Enable Online Payments
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// NOTIFICATION SETTINGS (expanded events)
// ============================================
const NotificationSettings = ({ settings, setSettings, onSave }) => {
  const handleChange = (channel, key, value) => {
    setSettings({
      ...settings,
      [channel]: { ...settings[channel], [key]: value },
    });
  };

  const events = [
    { id: "orderConfirmed", label: "Order Confirmed" },
    { id: "orderShipped", label: "Order Shipped" },
    { id: "orderDelivered", label: "Order Delivered" },
    { id: "lowStockAlert", label: "Low Stock Alert" },
    { id: "paymentReceived", label: "Payment Received" },
    { id: "newRegistration", label: "New Registration" },
    { id: "contactQuery", label: "Contact Query" },
    { id: "otp", label: "OTP Verification" },
    { id: "newCustomer", label: "New Customer" },
    { id: "purchaseOrder", label: "Purchase Order" },
    { id: "warehouseTransfer", label: "Warehouse Transfer" },
    { id: "paymentDue", label: "Payment Due" },
    { id: "invoiceCreated", label: "Invoice Created" },
  ];

  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Notification Settings</h2>
          <p>Configure email, SMS, WhatsApp, and push notifications</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("notifications", settings)}
        >
          <Save size={16} /> Save Notifications
        </button>
      </div>
      <div className="settings-card">
        <div className="settings-notification-grid">
          <div className="notif-header">
            <span>Event</span>
            <span>Email</span>
            <span>SMS</span>
            <span>WhatsApp</span>
            <span>Push</span>
          </div>
          {events.map((event) => (
            <div key={event.id} className="notif-row">
              <span className="notif-label">{event.label}</span>
              <div className="notif-toggles">
                <input
                  type="checkbox"
                  checked={settings.email[event.id] || false}
                  onChange={(e) =>
                    handleChange("email", event.id, e.target.checked)
                  }
                />
                <input
                  type="checkbox"
                  checked={settings.sms[event.id] || false}
                  onChange={(e) =>
                    handleChange("sms", event.id, e.target.checked)
                  }
                />
                <input
                  type="checkbox"
                  checked={settings.whatsapp[event.id] || false}
                  onChange={(e) =>
                    handleChange("whatsapp", event.id, e.target.checked)
                  }
                />
                <input
                  type="checkbox"
                  checked={settings.push[event.id] || false}
                  onChange={(e) =>
                    handleChange("push", event.id, e.target.checked)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// BACKUP SETTINGS (unchanged)
// ============================================
const backups = [
  {
    id: 1,
    name: "Full Backup",
    date: "2026-07-01 02:00 AM",
    size: "256 MB",
    type: "Auto",
  },
  {
    id: 2,
    name: "Full Backup",
    date: "2026-06-30 02:00 AM",
    size: "248 MB",
    type: "Auto",
  },
  {
    id: 3,
    name: "Manual Backup",
    date: "2026-06-29 03:30 PM",
    size: "242 MB",
    type: "Manual",
  },
];
const BackupSettings = ({ onBackup, onRestore }) => (
  <div className="settings-section">
    <div className="settings-header">
      <div>
        <h2>Backup & Restore</h2>
        <p>Manage automatic backups and restore data</p>
      </div>
      <div className="settings-header-actions">
        <button
          className="settings-action-btn"
          onClick={() => onBackup("manual")}
        >
          <Upload size={16} /> Manual Backup
        </button>
        <button className="settings-action-btn" onClick={onRestore}>
          <Download size={16} /> Restore
        </button>
      </div>
    </div>
    <div className="settings-grid">
      <div className="settings-card">
        <div className="settings-card-header">
          <Cloud size={20} />
          <h3>Backup Settings</h3>
        </div>
        <div className="settings-form">
          <div className="form-group">
            <label>Automatic Backup</label>
            <select defaultValue="daily">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div className="form-group">
            <label>Backup Time</label>
            <input type="time" defaultValue="02:00" />
          </div>
          <div className="form-group">
            <label>Storage Location</label>
            <select defaultValue="local">
              <option value="local">Local Storage</option>
              <option value="google">Google Drive</option>
              <option value="dropbox">Dropbox</option>
              <option value="onedrive">OneDrive</option>
            </select>
          </div>
        </div>
      </div>
      <div className="settings-card full-width">
        <div className="settings-card-header">
          <Database size={20} />
          <h3>Backup History</h3>
        </div>
        <div className="settings-form">
          <div className="backup-list">
            {backups.map((b) => (
              <div key={b.id} className="backup-item">
                <div>
                  <strong>{b.name}</strong>
                  <p>
                    {b.date} • {b.size}
                  </p>
                </div>
                <span
                  className={`status-badge ${b.type === "Auto" ? "success" : "info"}`}
                >
                  {b.type}
                </span>
                <div className="backup-actions">
                  <button className="icon-btn">
                    <Download size={16} />
                  </button>
                  <button className="icon-btn danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// INTEGRATION SETTINGS (unchanged)
// ============================================
const IntegrationSettings = ({ settings, setSettings, onSave }) => {
  const integrations = [
    {
      id: "googleDrive",
      name: "Google Drive",
      icon: "☁️",
      description: "Auto backup to Google Drive",
    },
    {
      id: "dropbox",
      name: "Dropbox",
      icon: "📁",
      description: "Sync with Dropbox",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      icon: "💬",
      description: "WhatsApp notifications & orders",
    },
    {
      id: "sms",
      name: "SMS Service",
      icon: "✉️",
      description: "SMS notifications via Twilio/MSG91",
    },
    {
      id: "email",
      name: "Email SMTP",
      icon: "📧",
      description: "Email configuration",
    },
  ];
  const handleToggle = (id) =>
    setSettings({
      ...settings,
      [id]: { ...settings[id], enabled: !settings[id].enabled },
    });
  const handleChange = (id, key, value) =>
    setSettings({ ...settings, [id]: { ...settings[id], [key]: value } });
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Integrations</h2>
          <p>Connect with third-party services and APIs</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("integrations", settings)}
        >
          <Save size={16} /> Save Integrations
        </button>
      </div>
      <div className="settings-grid">
        {integrations.map((integration) => (
          <div key={integration.id} className="settings-card integration-card">
            <div className="integration-header">
              <div className="integration-icon">{integration.icon}</div>
              <div className="integration-info">
                <h4>{integration.name}</h4>
                <p>{integration.description}</p>
              </div>
              <button
                className={`toggle-switch ${settings[integration.id]?.enabled ? "active" : ""}`}
                onClick={() => handleToggle(integration.id)}
              >
                {settings[integration.id]?.enabled ? (
                  <ToggleRight size={24} />
                ) : (
                  <ToggleLeft size={24} />
                )}
              </button>
            </div>
            {settings[integration.id]?.enabled && (
              <div className="integration-config">
                {integration.id === "googleDrive" && (
                  <div className="form-group">
                    <label>Folder ID</label>
                    <input
                      type="text"
                      value={settings.googleDrive.folderId || ""}
                      onChange={(e) =>
                        handleChange("googleDrive", "folderId", e.target.value)
                      }
                    />
                  </div>
                )}
                {integration.id === "whatsapp" && (
                  <>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        value={settings.whatsapp.phoneNumber || ""}
                        onChange={(e) =>
                          handleChange(
                            "whatsapp",
                            "phoneNumber",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>API Key</label>
                      <input
                        type="text"
                        value={settings.whatsapp.apiKey || ""}
                        onChange={(e) =>
                          handleChange("whatsapp", "apiKey", e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
                {integration.id === "email" && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>SMTP Host</label>
                        <input
                          type="text"
                          value={settings.email.host || ""}
                          onChange={(e) =>
                            handleChange("email", "host", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Port</label>
                        <input
                          type="number"
                          value={settings.email.port || 587}
                          onChange={(e) =>
                            handleChange(
                              "email",
                              "port",
                              parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Username</label>
                        <input
                          type="text"
                          value={settings.email.username || ""}
                          onChange={(e) =>
                            handleChange("email", "username", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <div className="password-input">
                          <input
                            type="password"
                            value={settings.email.password || ""}
                            onChange={(e) =>
                              handleChange("email", "password", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// APPEARANCE SETTINGS (unchanged)
// ============================================
const AppearanceSettings = ({ settings, setSettings, onSave }) => {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });
  const themes = ["light", "dark", "auto"];
  const languages = [
    "Hindi",
    "English",
    "Marathi",
    "Tamil",
    "Telugu",
    "Bengali",
  ];
  const currencies = ["₹", "$", "€", "£", "¥"];
  const dateFormats = ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"];
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Appearance Settings</h2>
          <p>Customize theme, language, and dashboard layout</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("appearance", settings)}
        >
          <Save size={16} /> Save Appearance
        </button>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Monitor size={20} />
            <h3>Theme & Colors</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Theme</label>
              <div className="theme-options">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    className={`theme-option ${settings.theme === theme ? "active" : ""}`}
                    onClick={() => handleChange("theme", theme)}
                  >
                    <div className={`theme-preview ${theme}`} />
                    <span>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Primary Color</label>
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Sidebar Color</label>
                <input
                  type="color"
                  value={settings.sidebarColor}
                  onChange={(e) => handleChange("sidebarColor", e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.compactMode}
                  onChange={(e) =>
                    handleChange("compactMode", e.target.checked)
                  }
                />{" "}
                Compact Mode
              </label>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Languages size={20} />
            <h3>Language & Regional</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date Format</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => handleChange("dateFormat", e.target.value)}
              >
                {dateFormats.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Time Zone</label>
              <select
                value={settings.timeZone}
                onChange={(e) => handleChange("timeZone", e.target.value)}
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Australia/Sydney">
                  Australia/Sydney (AEST)
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="settings-card full-width">
          <div className="settings-card-header">
            <BarChart3 size={20} />
            <h3>Dashboard Widgets</h3>
          </div>
          <div className="settings-form">
            <div className="widget-grid">
              {[
                "showSalesWidget",
                "showPurchaseWidget",
                "showExpenseWidget",
                "showProfitWidget",
                "showLowStockWidget",
              ].map((widget) => (
                <label key={widget} className="widget-toggle">
                  <input
                    type="checkbox"
                    checked={settings[widget]}
                    onChange={(e) => handleChange(widget, e.target.checked)}
                  />
                  <span>
                    {widget
                      .replace("show", "")
                      .replace("Widget", "")
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// BUSINESS PREFERENCES (unchanged)
// ============================================
const BusinessPreferences = ({
  settings,
  setSettings,
  warehouses,
  taxSettings,
  onSave,
}) => {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Business Preferences</h2>
          <p>Configure financial year, defaults, and rounding rules</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("preferences", settings)}
        >
          <Save size={16} /> Save Preferences
        </button>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Calendar size={20} />
            <h3>Financial Settings</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Financial Year</label>
              <select
                value={settings.financialYear}
                onChange={(e) => handleChange("financialYear", e.target.value)}
              >
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
                <option value="2027-28">2027-28</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Opening Stock</label>
                <input
                  type="number"
                  value={settings.openingStock}
                  onChange={(e) =>
                    handleChange("openingStock", parseInt(e.target.value) || 0)
                  }
                />
              </div>
              <div className="form-group">
                <label>Opening Balance</label>
                <input
                  type="number"
                  value={settings.openingBalance}
                  onChange={(e) =>
                    handleChange(
                      "openingBalance",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Sliders size={20} />
            <h3>Defaults</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Default Warehouse</label>
              <select
                value={settings.defaultWarehouse}
                onChange={(e) =>
                  handleChange("defaultWarehouse", e.target.value)
                }
              >
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.name}>
                    {wh.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Default Tax (%)</label>
              <select
                value={settings.defaultTax}
                onChange={(e) =>
                  handleChange("defaultTax", parseFloat(e.target.value))
                }
              >
                {taxSettings.taxTemplates?.map((t) => (
                  <option key={t.id} value={t.cgst + t.sgst}>
                    {t.name} ({t.cgst + t.sgst}%)
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Default Currency</label>
              <select
                value={settings.defaultCurrency}
                onChange={(e) =>
                  handleChange("defaultCurrency", e.target.value)
                }
              >
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Clock size={20} />
            <h3>Rounding & Units</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.roundOff}
                  onChange={(e) => handleChange("roundOff", e.target.checked)}
                />{" "}
                Round Off Amounts
              </label>
            </div>
            <div className="form-group">
              <label>Decimal Places</label>
              <select
                value={settings.decimalPlaces}
                onChange={(e) =>
                  handleChange("decimalPlaces", parseInt(e.target.value))
                }
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Weight Unit</label>
                <select
                  value={settings.weightUnit}
                  onChange={(e) => handleChange("weightUnit", e.target.value)}
                >
                  <option value="Kg">Kg</option>
                  <option value="Gm">Gm</option>
                  <option value="Lbs">Lbs</option>
                </select>
              </div>
              <div className="form-group">
                <label>Length Unit</label>
                <select
                  value={settings.lengthUnit}
                  onChange={(e) => handleChange("lengthUnit", e.target.value)}
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                  <option value="ft">ft</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// LOGS SETTINGS (unchanged)
// ============================================
const LogsSettings = ({ logs, onClear }) => {
  const [filter, setFilter] = useState("all");
  const filteredLogs =
    filter === "all" ? logs : logs.filter((log) => log.action.includes(filter));
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Activity Logs</h2>
          <p>Audit trail of all user activities</p>
        </div>
        <div className="settings-header-actions">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="settings-filter"
          >
            <option value="all">All Activities</option>
            <option value="Login">Login</option>
            <option value="Delete">Delete</option>
            <option value="Update">Update</option>
            <option value="Create">Create</option>
            <option value="Export">Export</option>
            <option value="Print">Print</option>
            <option value="Settings">Settings</option>
          </select>
          <button className="settings-action-btn danger" onClick={onClear}>
            <Trash2 size={16} /> Clear Logs
          </button>
        </div>
      </div>
      <div className="settings-card">
        <div className="settings-form">
          <div className="logs-list">
            {filteredLogs.map((log) => (
              <div key={log.id} className="log-item">
                <div className="log-info">
                  <strong>{log.user}</strong>
                  <span>{log.action}</span>
                  <span className="log-time">{log.time}</span>
                </div>
                <div className="log-details">
                  <span className="log-ip">IP: {log.ip}</span>
                  <span className="log-device">{log.device}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// API SETTINGS (unchanged)
// ============================================
const APISettings = ({
  settings,
  setSettings,
  showSecretKey,
  setShowSecretKey,
  showJWTSecret,
  setShowJWTSecret,
  showAccessToken,
  setShowAccessToken,
  onSave,
}) => {
  const handleChange = (key, value) =>
    setSettings({ ...settings, [key]: value });
  const regenerate = (key) => {
    const newVal =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    handleChange(key, newVal);
  };
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>API Settings</h2>
          <p>Manage API keys, webhooks, and authentication</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() => onSave("api", settings)}
        >
          <Save size={16} /> Save API
        </button>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Key size={20} />
            <h3>API Keys</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>API Key</label>
              <div className="api-key-display">
                <code>{settings.apiKey}</code>
                <button
                  className="icon-btn"
                  onClick={() => regenerate("apiKey")}
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Secret Key</label>
              <div className="api-key-display">
                <code>
                  {showSecretKey ? settings.secretKey : "••••••••••••••••"}
                </code>
                <button
                  className="icon-btn"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                >
                  {showSecretKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  className="icon-btn"
                  onClick={() => regenerate("secretKey")}
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <Link size={20} />
            <h3>Webhooks</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Webhook URL</label>
              <input
                type="url"
                value={settings.webhookUrl}
                onChange={(e) => handleChange("webhookUrl", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="settings-card full-width">
          <div className="settings-card-header">
            <Shield size={20} />
            <h3>Authentication</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>JWT Secret</label>
              <div className="api-key-display">
                <code>
                  {showJWTSecret ? settings.jwtSecret : "••••••••••••••••"}
                </code>
                <button
                  className="icon-btn"
                  onClick={() => setShowJWTSecret(!showJWTSecret)}
                >
                  {showJWTSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  className="icon-btn"
                  onClick={() => regenerate("jwtSecret")}
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Access Token</label>
              <div className="api-key-display">
                <code>
                  {showAccessToken ? settings.accessToken : "••••••••••••••••"}
                </code>
                <button
                  className="icon-btn"
                  onClick={() => setShowAccessToken(!showAccessToken)}
                >
                  {showAccessToken ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  className="icon-btn"
                  onClick={() => regenerate("accessToken")}
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DEVELOPER SETTINGS (unchanged)
// ============================================
const DeveloperSettings = ({ onSave }) => {
  const [debugMode, setDebugMode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [cacheEnabled, setCacheEnabled] = useState(true);
  return (
    <div className="settings-section">
      <div className="settings-header">
        <div>
          <h2>Developer Settings</h2>
          <p>Advanced settings for developers and system administrators</p>
        </div>
        <button
          className="settings-save-btn"
          onClick={() =>
            onSave("developer", { debugMode, maintenanceMode, cacheEnabled })
          }
        >
          <Save size={16} /> Save
        </button>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Zap size={20} />
            <h3>Debug & Performance</h3>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={debugMode}
                  onChange={(e) => setDebugMode(e.target.checked)}
                />{" "}
                Debug Mode{" "}
                <span className="hint">Shows detailed error logs</span>
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                />{" "}
                Maintenance Mode{" "}
                <span className="hint">Shows maintenance page to visitors</span>
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={cacheEnabled}
                  onChange={(e) => setCacheEnabled(e.target.checked)}
                />{" "}
                Enable Cache{" "}
                <span className="hint">Speeds up page loading</span>
              </label>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <AlertCircle size={20} className="warning" />
            <h3>Danger Zone</h3>
          </div>
          <div className="settings-form">
            <button className="settings-action-btn danger full">
              <Trash2 size={16} /> Reset All Settings
            </button>
            <button className="settings-action-btn danger full">
              <Database size={16} /> Clear All Data
            </button>
            <p className="settings-hint danger">
              <AlertCircle size={14} /> These actions cannot be undone!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MODALS
// ============================================
// PasswordModal (unchanged)
const PasswordModal = ({ onClose, onSubmit }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    onSubmit(oldPassword, newPassword);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Change Password</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input">
              <input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowOld(!showOld)}
              >
                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>New Password</label>
            <div className="password-input">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="modal-btn submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// TwoFactorModal (unchanged)
const qrPattern = [
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
];
const TwoFactorModal = ({ onClose, onEnable }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Enable Two-Factor Authentication</h3>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <div className="modal-body">
        <div className="twofa-info">
          <Fingerprint size={48} className="twofa-icon" />
          <h4>Scan QR Code</h4>
          <div className="qr-placeholder">
            <div className="qr-code">
              <div className="qr-pattern">
                <div className="qr-corner" />
                <div className="qr-corner" />
                <div className="qr-corner" />
                <div className="qr-dots">
                  {qrPattern.map((filled, i) => (
                    <div
                      key={i}
                      className={`qr-dot ${filled ? "filled" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="twofa-hint">
            Scan this QR code with Google Authenticator or Authy
          </p>
          <div className="twofa-secret">
            <span>Secret Key:</span>
            <code>DPT2FA-2026-XYZ123</code>
            <button className="icon-btn">
              <Copy size={16} />
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Enter 6-digit code</label>
          <input
            type="text"
            placeholder="Enter code"
            maxLength="6"
            className="otp-input"
          />
        </div>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn submit" onClick={onEnable}>
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  </div>
);

// AddUserModal (with role presets)
const AddUserModal = ({ onClose, onSubmit }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "Staff",
    permissions: {
      add: false,
      delete: false,
      edit: false,
      export: false,
      print: false,
      reports: false,
      settings: false,
      approve: false,
    },
  });
  const handleChange = (key, value) =>
    setUserData({ ...userData, [key]: value });
  const handlePermissionToggle = (perm) =>
    setUserData({
      ...userData,
      permissions: {
        ...userData.permissions,
        [perm]: !userData.permissions[perm],
      },
    });

  const applyRolePreset = (role) => {
    let perms = {
      add: false,
      delete: false,
      edit: false,
      export: false,
      print: false,
      reports: false,
      settings: false,
      approve: false,
    };
    if (role === "Admin")
      perms = {
        add: true,
        delete: true,
        edit: true,
        export: true,
        print: true,
        reports: true,
        settings: true,
        approve: true,
      };
    else if (role === "Manager")
      perms = {
        add: true,
        delete: false,
        edit: true,
        export: true,
        print: true,
        reports: true,
        settings: false,
        approve: true,
      };
    else if (role === "Accountant")
      perms = {
        add: true,
        delete: false,
        edit: true,
        export: true,
        print: true,
        reports: true,
        settings: false,
        approve: false,
      };
    else if (role === "Sales")
      perms = {
        add: true,
        delete: false,
        edit: false,
        export: false,
        print: true,
        reports: false,
        settings: false,
        approve: false,
      };
    else if (role === "Warehouse")
      perms = {
        add: false,
        delete: false,
        edit: false,
        export: false,
        print: false,
        reports: false,
        settings: false,
        approve: false,
      };
    else if (role === "Viewer")
      perms = {
        add: false,
        delete: false,
        edit: false,
        export: false,
        print: false,
        reports: false,
        settings: false,
        approve: false,
      };
    setUserData({ ...userData, permissions: perms });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New User</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mobile *</label>
              <input
                type="tel"
                value={userData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <select
                value={userData.role}
                onChange={(e) => {
                  handleChange("role", e.target.value);
                  applyRolePreset(e.target.value);
                }}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Accountant">Accountant</option>
                <option value="Sales">Sales</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Staff">Staff</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Permissions</label>
            <div className="permissions-grid">
              {[
                "add",
                "edit",
                "delete",
                "export",
                "print",
                "reports",
                "settings",
                "approve",
              ].map((perm) => (
                <label key={perm} className="permission-check">
                  <input
                    type="checkbox"
                    checked={userData.permissions[perm]}
                    onChange={() => handlePermissionToggle(perm)}
                  />
                  <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="modal-btn submit">
              <Plus size={16} /> Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// AddWarehouseModal (unchanged)
const AddWarehouseModal = ({ onClose, onSubmit }) => {
  const [data, setData] = useState({
    name: "",
    code: "",
    manager: "",
    address: "",
    capacity: "",
    contact: "",
  });
  const handleChange = (key, val) => setData({ ...data, [key]: val });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Warehouse</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Warehouse Name *</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Code *</label>
              <input
                type="text"
                value={data.code}
                onChange={(e) => handleChange("code", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Manager</label>
              <input
                type="text"
                value={data.manager}
                onChange={(e) => handleChange("manager", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="text"
                value={data.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              type="tel"
              value={data.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn submit">
              <Plus size={16} /> Add Warehouse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// EditWarehouseModal
const EditWarehouseModal = ({ warehouse, onClose, onSave }) => {
  const [data, setData] = useState({ ...warehouse });
  const handleChange = (key, val) => setData({ ...data, [key]: val });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Warehouse</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Warehouse Name *</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Code *</label>
              <input
                type="text"
                value={data.code}
                onChange={(e) => handleChange("code", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Manager</label>
              <input
                type="text"
                value={data.manager}
                onChange={(e) => handleChange("manager", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="text"
                value={data.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              type="tel"
              value={data.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// TransferStockModal
const TransferStockModal = ({ warehouses, onClose, onTransfer }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    onTransfer({ from, to, product, quantity });
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Transfer Stock</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>From Warehouse</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              >
                <option value="">Select</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>To Warehouse</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              >
                <option value="">Select</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Product</label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Product name or SKU"
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              min="1"
              required
            />
          </div>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn submit">
              <Truck size={16} /> Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// AddTaxTemplateModal
const AddTaxTemplateModal = ({ onClose, onAdd }) => {
  const [template, setTemplate] = useState({
    name: "",
    cgst: 0,
    sgst: 0,
    igst: 0,
    gstApplicable: true,
    type: "percentage",
  });
  const handleChange = (key, val) => setTemplate({ ...template, [key]: val });
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...template, id: Date.now() });
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Tax Template</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Template Name</label>
            <input
              type="text"
              value={template.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              placeholder="e.g., Packing Charges"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>CGST (%)</label>
              <input
                type="number"
                value={template.cgst}
                onChange={(e) =>
                  handleChange("cgst", parseFloat(e.target.value) || 0)
                }
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>SGST (%)</label>
              <input
                type="number"
                value={template.sgst}
                onChange={(e) =>
                  handleChange("sgst", parseFloat(e.target.value) || 0)
                }
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>IGST (%)</label>
              <input
                type="number"
                value={template.igst}
                onChange={(e) =>
                  handleChange("igst", parseFloat(e.target.value) || 0)
                }
                step="0.1"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select
                value={template.type}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={template.gstApplicable}
                  onChange={(e) =>
                    handleChange("gstApplicable", e.target.checked)
                  }
                />{" "}
                GST Applicable
              </label>
            </div>
          </div>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn submit">
              <Plus size={16} /> Add Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// EditTaxTemplateModal
const EditTaxTemplateModal = ({ template, onClose, onSave }) => {
  const [data, setData] = useState({ ...template });
  const handleChange = (key, val) => setData({ ...data, [key]: val });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Tax Template</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Template Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>CGST (%)</label>
              <input
                type="number"
                value={data.cgst}
                onChange={(e) =>
                  handleChange("cgst", parseFloat(e.target.value) || 0)
                }
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>SGST (%)</label>
              <input
                type="number"
                value={data.sgst}
                onChange={(e) =>
                  handleChange("sgst", parseFloat(e.target.value) || 0)
                }
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>IGST (%)</label>
              <input
                type="number"
                value={data.igst}
                onChange={(e) =>
                  handleChange("igst", parseFloat(e.target.value) || 0)
                }
                step="0.1"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select
                value={data.type}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={data.gstApplicable}
                  onChange={(e) =>
                    handleChange("gstApplicable", e.target.checked)
                  }
                />{" "}
                GST Applicable
              </label>
            </div>
          </div>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
