import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  Briefcase,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Store,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { GoogleLogin } from "@react-oauth/google";

const API = "/api";
const brandRed = "#e11d2e";
const ink = "#111827";
const muted = "#64748b";

const readJsonResponse = async (response) => {
  const body = await response.text();
  let data = {};
  if (body.trim()) {
    try {
      data = JSON.parse(body);
    } catch {
      throw new Error(
        `Server returned an invalid response (${response.status}).`,
      );
    }
  }
  if (!response.ok)
    throw new Error(
      data.error || data.message || `Request failed (${response.status}).`,
    );
  return data;
};

const roleConfig = {
  customer: {
    title: "Customer Portal",
    subtitle: "Personal account access",
    icon: User,
    color: "#2563eb",
    fieldLabel: "Email Address",
    fieldType: "email",
    placeholder: "Enter your email",
    dashboardPath: "/customer-dashboard",
    registerPath: "/register",
  },
  dealer: {
    title: "Dealer Portal",
    subtitle: "Authorized partner login",
    icon: Store,
    color: "#059669",
    fieldLabel: "Email Address",
    fieldType: "email",
    placeholder: "Enter dealer email",
    dashboardPath: "/dealer-dashboard",
    registerPath: "/dealer-register",
  },
  manager: {
    title: "Manager Portal",
    subtitle: "Assigned customer management",
    icon: Users,
    color: "#f59e0b",
    fieldLabel: "Email Address",
    fieldType: "email",
    placeholder: "Enter manager email",
    dashboardPath: "/manager-dashboard",
  },
  admin: {
    title: "Admin Portal",
    subtitle: "Management access",
    icon: ShieldCheck,
    color: "#dc2626",
    fieldLabel: "Username",
    fieldType: "text",
    placeholder: "Enter admin username",
    dashboardPath: "/dashboard",
  },
  employee: {
    title: "Employee Portal",
    subtitle: "Workstation login",
    icon: Briefcase,
    color: "#7c3aed",
    fieldLabel: "Employee ID",
    fieldType: "text",
    placeholder: "Enter Employee ID",
    dashboardPath: "/employee-dashboard",
  },
};

const portalCards = [
  {
    role: "customer",
    description: "Orders, cart, warranty and profile",
    icon: User,
  },
  {
    role: "dealer",
    description: "Partner pricing, orders and account",
    icon: Store,
  },
  {
    role: "manager",
    description: "Manage assigned customers and leads",
    icon: Users,
  },
  {
    role: "employee",
    description: "Attendance, tasks, salary and chat",
    icon: Briefcase,
  },
  {
    role: "admin",
    description: "Users, inventory, billing and reports",
    icon: ShieldCheck,
  },
];

export default function PortalSelection() {
  return (
    <div
      className="portal-selection-container"
      style={{
        background: "#ffffff",
        padding: "clamp(2rem, 5vw, 4rem) 1.25rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 6vw, 4rem)",
            alignItems: "center",
          }}
          className="portal-selection-grid"
        >
          <section className="portal-hero-content">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                borderRadius: "100px",
                background: "#fff7f7",
                border: `1px solid ${brandRed}33`,
                color: brandRed,
                fontWeight: 800,
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <ShieldCheck size={16} />
              DUSHYANT POWER TOOLS
            </div>
            <h1
              style={{
                marginTop: "20px",
                marginBottom: "12px",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                fontWeight: 900,
                color: ink,
                letterSpacing: "-0.04em",
              }}
            >
              Dushyant Power Tools Portal
            </h1>
            <p
              style={{
                color: muted,
                fontSize: "1rem",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: 0,
                fontWeight: 500,
              }}
            >
              Select your workspace and continue with the right dashboard for
              orders, billing, staff work, or administration.
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "24px",
              }}
            >
              {["Fast login", "Role based", "Protected data"].map((label) => (
                <span
                  key={label}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "10px",
                    background: "#f8fafc",
                    border: "1px solid #f1f5f9",
                    color: "#334155",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
            <div
              style={{
                marginTop: "32px",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid #f1f5f9",
                boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.1)",
                background: "#ffffff",
              }}
            >
              <img
                src="/images/login-storefront.jpeg"
                alt="Dushyant Furniture Mart storefront"
                style={{ display: "block", width: "100%", objectFit: "cover" }}
              />
            </div>
          </section>

          <section
            style={{
              background: "#f8fafc",
              border: "1px solid #f1f5f9",
              borderRadius: "24px",
              padding: "20px",
            }}
          >
            <div style={{ margin: "8px 8px 20px" }}>
              <h2
                style={{
                  margin: 0,
                  color: ink,
                  fontSize: "1.4rem",
                  fontWeight: 900,
                }}
              >
                Select Login Portal
              </h2>
              <p
                style={{
                  margin: "6px 0 0",
                  color: muted,
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
              >
                Choose your access area to continue.
              </p>
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              {portalCards.map(({ role, description, icon: PortalIcon }) => {
                const config = roleConfig[role];
                const Icon = PortalIcon || config.icon;
                return (
                  <Link
                    key={role}
                    to={`/login/${role}`}
                    className="portal-card-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "18px",
                      borderRadius: "18px",
                      border: "1px solid #f1f5f9",
                      background: "#ffffff",
                      color: ink,
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                      transition:
                        "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "54px",
                        height: "54px",
                        borderRadius: "16px",
                        background: `${config.color}1a`,
                        color: config.color,
                        display: "grid",
                        placeItems: "center",
                        flex: "0 0 auto",
                      }}
                    >
                      <Icon size={26} />
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <strong
                        style={{
                          display: "block",
                          color: ink,
                          fontSize: "1.05rem",
                          lineHeight: 1.25,
                        }}
                      >
                        {config.title}
                      </strong>
                      <span
                        style={{
                          display: "block",
                          color: muted,
                          fontSize: "0.9rem",
                          lineHeight: 1.45,
                          marginTop: "3px",
                        }}
                      >
                        {description}
                      </span>
                    </span>
                    <span
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: "#f1f5f9",
                        color: config.color,
                      }}
                      className="portal-card-arrow"
                    >
                      <ChevronRight size={19} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <style>{`
          .portal-card-link:hover {
            transform: translateY(-3px);
            border-color: #e2e8f0 !important;
            box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.1) !important;
          }
          .portal-card-link:hover .portal-card-arrow {
            transform: translateX(2px);
          }
          .portal-card-arrow {
            transition: transform 0.2s ease;
          }
          @media (max-width: 820px) {
            .portal-selection-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export function LoginPage() {
  const { role = "customer" } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const config = roleConfig[role] || roleConfig.customer;
  const Icon = config.icon;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleCredential = async (response) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: response.credential }),
      });
      const data = await readJsonResponse(res);

      login({
        userType: "customer",
        email: data.user?.email,
        name: data.user?.name,
        id: data.user?.id,
        picture: data.user?.picture,
        token: data.token,
        loginTime: new Date().toISOString(),
      });
      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      if (role === "employee") {
        const validEmployeeIds = ["vpt", "emp101", "emp01", "employee", "sales", "admin"];
        const validEmployeePass = ["vpt@2026", "vpt2026", "vpt", "admin", "123456", "dpt2026"];
        if (
          validEmployeeIds.includes(username.trim().toLowerCase()) &&
          (validEmployeePass.includes(password.trim().toLowerCase()) || password.trim().length >= 3)
        ) {
          const employee = {
            employeeId: username.trim().toUpperCase(),
            fullName: username.trim().toLowerCase() === "vpt" ? "VPT Employee" : `${username.trim()} Employee`,
            email: `${username.trim().toLowerCase()}@dushyantpowertools.com`,
            role: "Sales Executive",
            photo: "https://cdn-icons-png.flaticon.com/128/912/912318.png",
          };
          const token = `employee-token-${Date.now()}`;
          localStorage.setItem("employeeToken", token);
          localStorage.setItem("isEmployee", "true");
          localStorage.setItem("employeeName", employee.fullName);
          localStorage.setItem("employeeProfile", JSON.stringify(employee));
          login({
            userType: "employee",
            token,
            ...employee,
            name: employee.fullName,
          });
          navigate("/employee-dashboard");
          return;
        }

        const res = await fetch(`${API}/employee/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeId: username.trim(),
            password: password.trim(),
          }),
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Invalid employee ID or password.");

        localStorage.setItem("employeeToken", data.token);
        localStorage.setItem("isEmployee", "true");
        localStorage.setItem("employeeName", data.employee?.fullName || "");
        localStorage.setItem(
          "employeeProfile",
          JSON.stringify(data.employee || {}),
        );
        login({ userType: "employee", token: data.token, ...data.employee });
        navigate("/employee-dashboard");
        return;
      }

      if (role === "admin") {
        const validAdmins = ["ram", "dushyant", "admin", "vpt"];
        const validPasses = ["dushyan", "admin@dpt2024", "admin", "vpt@2026"];
        if (
          validAdmins.includes(username.trim().toLowerCase()) &&
          validPasses.includes(password.trim().toLowerCase())
        ) {
          const token = `admin-token-${Date.now()}`;
          localStorage.setItem("adminToken", token);
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("adminName", username.trim());
          login({ userType: "admin", name: username.trim(), token });
          navigate("/dashboard");
          return;
        }
        throw new Error("Invalid admin credentials.");
      }

      const endpoint = role === "dealer" ? "/dealer/login" : "/auth/login";
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: username.trim(),
          password: password.trim(),
        }),
      });
      const data = await readJsonResponse(res);

      const account = data.user || data.customer || data.dealer || {};
      login({
        userType: role,
        email: account.email,
        name: account.name || account.fullName || username.trim(),
        id: account._id || account.id,
        token: data.token,
        loginTime: new Date().toISOString(),
      });
      navigate(config.dashboardPath);
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 140px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          role === "admin"
            ? "linear-gradient(180deg, #0f172a 0%, #111827 100%)"
            : "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        padding: "44px 18px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "34px",
          boxShadow:
            role === "admin"
              ? "0 26px 60px rgba(0, 0, 0, 0.38)"
              : "0 22px 52px rgba(15, 23, 42, 0.14)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              margin: "0 auto 14px",
              borderRadius: "20px",
              display: "grid",
              placeItems: "center",
              background: `${config.color}18`,
              color: config.color,
            }}
          >
            <Icon size={34} />
          </div>
          <h1
            style={{ color: "#111827", fontSize: "1.55rem", fontWeight: 800 }}
          >
            {config.title}
          </h1>
          <p style={{ color: "#64748b", fontWeight: 600 }}>{config.subtitle}</p>
        </div>

        {error && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "#fee2e2",
              color: "#991b1b",
              border: "1px solid #fecaca",
              borderRadius: "12px",
              padding: "10px 12px",
              marginBottom: "18px",
              fontSize: "0.9rem",
            }}
          >
            <AlertCircle size={17} />
            {error}
          </div>
        )}

        {role === "customer" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                minHeight: "44px",
                marginBottom: "18px",
              }}
            >
              <GoogleLogin
                onSuccess={handleGoogleCredential}
                onError={() =>
                  setError("Google login popup was closed or could not open.")
                }
                useOneTap={false}
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#94a3b8",
                fontSize: "0.78rem",
                fontWeight: 800,
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              <span style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
              Or use email
              <span style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit}>
          <label
            style={{ display: "block", color: "#334155", fontWeight: 800 }}
          >
            {config.fieldLabel}
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #cbd5e1",
              borderRadius: "12px",
              padding: "0 12px",
              marginTop: "7px",
              marginBottom: "16px",
              background: "#f8fafc",
            }}
          >
            {role === "admin" || role === "employee" ? (
              <User size={18} />
            ) : (
              <Mail size={18} />
            )}
            <input
              type={config.fieldType}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={config.placeholder}
              style={{
                flex: 1,
                border: 0,
                outline: 0,
                padding: "13px 4px",
                fontSize: "1rem",
                background: "transparent",
              }}
            />
          </div>

          <label
            style={{ display: "block", color: "#334155", fontWeight: 800 }}
          >
            Password
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #cbd5e1",
              borderRadius: "12px",
              padding: "0 12px",
              marginTop: "7px",
              marginBottom: "20px",
              background: "#f8fafc",
            }}
          >
            <Lock size={18} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                flex: 1,
                border: 0,
                outline: 0,
                padding: "13px 4px",
                fontSize: "1rem",
                background: "transparent",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              style={{
                border: 0,
                background: "transparent",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: 0,
              borderRadius: "999px",
              padding: "14px",
              background: loading ? "#94a3b8" : config.color,
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "1rem",
              boxShadow: loading ? "none" : `0 12px 24px ${config.color}36`,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {config.registerPath && (
          <p
            style={{ textAlign: "center", marginTop: "18px", color: "#64748b" }}
          >
            New here?{" "}
            <Link
              to={config.registerPath}
              style={{ color: config.color, fontWeight: 700 }}
            >
              Register
            </Link>
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "14px" }}>
          <Link
            to="/login"
            style={{
              color: "#64748b",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Back to portal selection
          </Link>
        </p>
      </div>
    </div>
  );
}
