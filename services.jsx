
import React, { useState } from "react";
import {
  ShoppingCart,
  Wrench,
  PackageSearch,
  Factory,
  ShieldCheck,
  PenTool,
  Star,
  Cpu,
  Zap,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  Truck,
  Award,
  ThumbsUp,
  Video,
  Image as ImageIcon,
  FileText,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";

// ---------- Service Data ----------
const serviceData = {
  "tool-sales": {
    id: "tool-sales",
    name: "Tool Sales",
    icon: ShoppingCart,
    description:
      "Wide range of industrial power tools, hand tools, and accessories from top brands.",
    subServices: [
      {
        id: "power-tools",
        label: "Power Tools",
        description: "Drills, grinders, cutters, saws, and more.",
        details: [
          "Bosch, Makita, DeWalt, Hilti",
          "Industrial & professional grades",
          "Warranty & after-sales support",
          "Bulk discounts available",
        ],
        price: "₹5,000 – ₹1,20,000",
        image: "https://via.placeholder.com/400x300?text=Power+Tools",
        faq: [
          {
            q: "Do you provide warranty?",
            a: "Yes, all tools come with manufacturer warranty.",
          },
          {
            q: "Can I get bulk discount?",
            a: "Yes, for orders above ₹50,000.",
          },
        ],
        related: ["spare-parts", "repair"],
      },
      {
        id: "hand-tools",
        label: "Hand Tools",
        description:
          "Screwdrivers, pliers, wrenches, hammers, measuring tools.",
        details: [
          "Ergonomic designs",
          "High-quality steel",
          "Lifetime guarantee on select items",
        ],
        price: "₹200 – ₹8,000",
        image: "https://via.placeholder.com/400x300?text=Hand+Tools",
        faq: [
          {
            q: "Are these made in India?",
            a: "We source globally, including domestic brands.",
          },
        ],
        related: ["power-tools", "hardware"],
      },
    ],
  },
  repair: {
    id: "repair",
    name: "Tool Repair",
    icon: Wrench,
    description:
      "Expert repair services for all brands and types of power tools.",
    subServices: [
      {
        id: "motor-repair",
        label: "Motor Repair",
        description: "Rewinding, bearing replacement, and full motor overhaul.",
        details: [
          "Complete diagnostic",
          "OEM parts used",
          "Dynamic balancing",
          "90-day warranty",
        ],
        price: "₹1,500 – ₹25,000",
        image: "https://via.placeholder.com/400x300?text=Motor+Repair",
        faq: [
          { q: "How long does it take?", a: "Usually 2–3 working days." },
          { q: "Do you pick up?", a: "Yes, we offer doorstep service." },
        ],
        related: ["armature", "bearing"],
      },
      {
        id: "armature",
        label: "Armature Repair",
        description: "Rewinding and balancing of armature for all power tools.",
        details: [
          "Precision winding",
          "Dynamic balancing",
          "Insulation testing",
        ],
        price: "₹800 – ₹8,000",
        image: "https://via.placeholder.com/400x300?text=Armature",
        faq: [],
        related: ["motor-repair", "bearing"],
      },
      {
        id: "bearing",
        label: "Bearing Replacement",
        description: "Replace worn bearings with genuine OEM parts.",
        details: [
          "High-speed bearings",
          "Press-fit installation",
          "Lubrication",
        ],
        price: "₹300 – ₹2,500",
        image: "https://via.placeholder.com/400x300?text=Bearing",
        faq: [],
        related: ["motor-repair", "armature"],
      },
    ],
  },
  "spare-parts": {
    id: "spare-parts",
    name: "Spare Parts",
    icon: PackageSearch,
    description: "Genuine spare parts for all major power tool brands.",
    subServices: [
      {
        id: "drill-parts",
        label: "Drill Parts",
        description: "Chucks, gears, switches, armatures, and more.",
        details: ["OEM quality", "Fast shipping", "Warranty on parts"],
        price: "₹100 – ₹8,000",
        image: "https://via.placeholder.com/400x300?text=Drill+Parts",
        faq: [],
        related: ["power-tools"],
      },
    ],
  },
  "equipment-supply": {
    id: "equipment-supply",
    name: "Equipment Supply",
    icon: Factory,
    description:
      "Industrial machinery and heavy equipment for construction and manufacturing.",
    subServices: [
      {
        id: "construction",
        label: "Construction Equipment",
        description: "Compactors, generators, concrete mixers, etc.",
        details: ["New & used", "Rental options", "Service contracts"],
        price: "₹50,000 – ₹5,00,000",
        image: "https://via.placeholder.com/400x300?text=Construction",
        faq: [],
        related: [],
      },
    ],
  },
  "warranty-support": {
    id: "warranty-support",
    name: "Warranty Support",
    icon: ShieldCheck,
    description: "Hassle-free warranty claims and service for your tools.",
    subServices: [
      {
        id: "claim",
        label: "Warranty Claim",
        description: "Submit a claim and get your tool repaired or replaced.",
        details: [
          "Online claim submission",
          "Quick approval",
          "Pick-up service",
        ],
        price: "Free (if under warranty)",
        image: "https://via.placeholder.com/400x300?text=Warranty",
        faq: [
          {
            q: "What is covered?",
            a: "Manufacturing defects and material failures.",
          },
        ],
        related: [],
      },
    ],
  },
  "authorized-service": {
    id: "authorized-service",
    name: "Authorized Service",
    icon: PenTool,
    description: "Factory-certified service centers for professional repairs.",
    subServices: [
      {
        id: "service-center",
        label: "Service Centers",
        description: "Locate our authorized service centers across India.",
        details: ["Trained technicians", "Genuine parts", "Service warranty"],
        price: "Varies",
        image: "https://via.placeholder.com/400x300?text=Service+Center",
        faq: [
          { q: "Where are your centers?", a: "We have centers in 18 states." },
        ],
        related: [],
      },
    ],
  },
};

// ---------- Helper: Star Rating (dummy) ----------
const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} style={{ color: i <= rating ? "#f59e0b" : "#d1d5db" }}>
        ★
      </span>
    ))}
  </div>
);

// ---------- Main Component ----------
const Services = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navStack, setNavStack] = useState([]); // array of { type: 'service' | 'sub', id }

  // Get current items based on stack
  const getCurrentItems = () => {
    if (navStack.length === 0) {
      // Show all main services
      return Object.values(serviceData).map((s) => ({
        type: "service",
        id: s.id,
        label: s.name,
        icon: s.icon,
        description: s.description,
        data: s,
      }));
    } else if (navStack.length === 1) {
      // Show sub-services of the selected service
      const serviceId = navStack[0].id;
      const service = serviceData[serviceId];
      if (!service) return [];
      return service.subServices.map((sub) => ({
        type: "sub",
        id: sub.id,
        label: sub.label,
        description: sub.description,
        data: sub,
        parentId: serviceId,
      }));
    } else {
      // Detail view – show the selected sub-service details
      const last = navStack[navStack.length - 1];
      const serviceId = navStack[0].id;
      const service = serviceData[serviceId];
      const sub = service?.subServices.find((s) => s.id === last.id);
      if (!sub) return [];
      return [{ type: "detail", data: sub }];
    }
  };

  const currentItems = getCurrentItems();

  const handleCardClick = (item) => {
    if (item.type === "service") {
      setNavStack([{ type: "service", id: item.id }]);
      setIsDrawerOpen(true);
    } else if (item.type === "sub") {
      setNavStack([...navStack, { type: "sub", id: item.id }]);
    }
    // For detail, no further navigation; we show detail view.
  };

  const handleBack = () => {
    if (navStack.length === 0) {
      setIsDrawerOpen(false);
    } else {
      setNavStack(navStack.slice(0, -1));
    }
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    setNavStack([]);
  };

  // Breadcrumb
  const getBreadcrumb = () => {
    const items = [{ label: "Home", onClick: handleClose }];
    if (navStack.length >= 1) {
      const serviceId = navStack[0].id;
      const service = serviceData[serviceId];
      items.push({
        label: service?.name || "Services",
        onClick: () => setNavStack([{ type: "service", id: serviceId }]),
      });
    }
    if (navStack.length >= 2) {
      const last = navStack[navStack.length - 1];
      const serviceId = navStack[0].id;
      const service = serviceData[serviceId];
      const sub = service?.subServices.find((s) => s.id === last.id);
      if (sub) {
        items.push({ label: sub.label, onClick: () => {} }); // current, no click
      }
    }
    return items;
  };

  const breadcrumb = getBreadcrumb();

  // ---------- Render ----------
  return (
    <section id="services" style={{ padding: "48px 0", background: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              color: "#111",
              marginBottom: "8px",
            }}
          >
            Our <span style={{ color: "#dc2626" }}>Services</span>
          </h2>
          <div
            style={{
              width: "48px",
              height: "4px",
              background: "#dc2626",
              borderRadius: "2px",
              marginBottom: "12px",
            }}
          ></div>
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              fontWeight: 600,
              maxWidth: "560px",
              lineHeight: 1.7,
            }}
          >
            Beyond world-class tools, we provide end-to-end industrial support
            to keep your operations running continuously.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "14px",
            marginBottom: "48px",
          }}
        >
          {Object.values(serviceData).map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setNavStack([{ type: "service", id: s.id }]);
                  setIsDrawerOpen(true);
                }}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "24px",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = "#111";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "#f3f4f6",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    color: "#111",
                  }}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    color: "#111",
                    marginBottom: "6px",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    fontWeight: 600,
                    lineHeight: 1.7,
                    marginBottom: "16px",
                  }}
                >
                  {s.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#111",
                    fontWeight: 800,
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  Explore <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Service Features (static) */}
        <div
          style={{
            borderTop: "1px solid #f0f0f0",
            paddingTop: "40px",
            marginBottom: "40px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#dc2626",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Why Choose Us
            </span>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                color: "#111",
                marginBottom: "8px",
              }}
            >
              Service <span style={{ color: "#dc2626" }}>Advantages</span>
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                fontWeight: 600,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Our technical command centers handle complex repairs for
              industrial-grade armaments across every major manufacturer.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            {[
              {
                icon: Cpu,
                label: "Certified Technicians",
                desc: "Factory-trained professionals for precision repairs",
              },
              {
                icon: Zap,
                label: "Express Service",
                desc: "24–48 hour turnaround on most repairs",
              },
              {
                icon: ShieldCheck,
                label: "Genuine Parts",
                desc: "Only OEM-certified replacement components",
              },
              {
                icon: Star,
                label: "Quality Guaranteed",
                desc: "90-day service warranty on all work",
              },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  background: "#f9fafb",
                  padding: "20px",
                  borderRadius: "10px",
                  border: "1px solid #f0f0f0",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#fff",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#dc2626",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <f.icon size={16} />
                </div>
                <h4
                  style={{
                    fontSize: "11px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#111",
                    marginBottom: "4px",
                  }}
                >
                  {f.label}
                </h4>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#6b7280",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            background: "#111",
            color: "#fff",
            borderRadius: "12px",
            padding: "clamp(28px, 4vw, 48px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ maxWidth: "480px" }}>
            <h3
              style={{
                fontSize: "clamp(1.3rem, 3vw, 2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              Direct Technical
              <br />
              <span style={{ color: "#dc2626" }}>Command Support</span>
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {[
                "Free Diagnosis",
                "Genuine Spare Parts",
                "Pick-up & Drop Service",
                "90-Day Service Warranty",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  <CheckCircle size={14} style={{ color: "#dc2626" }} /> {item}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <a
              href="https://wa.me/919504391391"
              style={{
                background: "#fff",
                color: "#111",
                padding: "16px 32px",
                borderRadius: "8px",
                fontWeight: 800,
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                textDecoration: "none",
              }}
            >
              Connect With Expert
            </a>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Response Time: &lt; 1 Hour
            </span>
          </div>
        </div>
      </div>

      {/* ---------- DRAWER ---------- */}
      {isDrawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            justifyContent: "flex-end",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(3px)",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={handleClose}
        >
          <div
            style={{
              width: "600px",
              maxWidth: "90vw",
              height: "100%",
              background: "#fff",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={20} />
              </button>
              {navStack.length > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <ChevronLeft size={18} /> Back
                </button>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.8rem",
                  color: "#6b7280",
                  flexWrap: "wrap",
                  marginLeft: "auto",
                }}
              >
                {breadcrumb.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <ChevronRight size={14} color="#94a3b8" />}
                    <span
                      onClick={item.onClick}
                      style={{
                        cursor: item.onClick ? "pointer" : "default",
                        fontWeight: idx === breadcrumb.length - 1 ? 700 : 400,
                        color:
                          idx === breadcrumb.length - 1 ? "#111" : "#6b7280",
                      }}
                    >
                      {item.label}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Drawer Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              {currentItems.length === 0 ? (
                <p>No content</p>
              ) : currentItems[0].type === "detail" ? (
                // Detail view of a sub-service
                (() => {
                  const sub = currentItems[0].data;
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <img
                        src={
                          sub.image ||
                          "https://via.placeholder.com/400x300?text=Service"
                        }
                        alt={sub.label}
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          objectFit: "cover",
                          maxHeight: "220px",
                        }}
                      />
                      <h3
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: 800,
                          color: "#111",
                        }}
                      >
                        {sub.label}
                      </h3>
                      <p style={{ fontSize: "1rem", color: "#4b5563" }}>
                        {sub.description}
                      </p>

                      {sub.details && sub.details.length > 0 && (
                        <div>
                          <h4
                            style={{
                              fontWeight: 700,
                              marginBottom: "8px",
                              fontSize: "0.9rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Key Details
                          </h4>
                          <ul
                            style={{
                              listStyle: "none",
                              padding: 0,
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            {sub.details.map((item, i) => (
                              <li
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  fontSize: "0.95rem",
                                }}
                              >
                                <CheckCircle size={16} color="#dc2626" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {sub.price && (
                        <div>
                          <h4
                            style={{
                              fontWeight: 700,
                              marginBottom: "4px",
                              fontSize: "0.9rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Price Range
                          </h4>
                          <p
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: 800,
                              color: "#dc2626",
                            }}
                          >
                            {sub.price}
                          </p>
                        </div>
                      )}

                      {sub.faq && sub.faq.length > 0 && (
                        <div>
                          <h4
                            style={{
                              fontWeight: 700,
                              marginBottom: "8px",
                              fontSize: "0.9rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Frequently Asked
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            {sub.faq.map((item, i) => (
                              <div
                                key={i}
                                style={{
                                  borderBottom: "1px solid #e5e7eb",
                                  paddingBottom: "6px",
                                }}
                              >
                                <strong style={{ fontSize: "0.9rem" }}>
                                  {item.q}
                                </strong>
                                <p
                                  style={{
                                    fontSize: "0.85rem",
                                    color: "#4b5563",
                                    marginTop: "2px",
                                  }}
                                >
                                  {item.a}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {sub.related && sub.related.length > 0 && (
                        <div>
                          <h4
                            style={{
                              fontWeight: 700,
                              marginBottom: "8px",
                              fontSize: "0.9rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Related Services
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {sub.related.map((relId) => {
                              // find related sub-service (we can try to get its label)
                              const serviceId = navStack[0].id;
                              const service = serviceData[serviceId];
                              const relSub = service?.subServices.find(
                                (s) => s.id === relId,
                              );
                              if (!relSub) return null;
                              return (
                                <span
                                  key={relId}
                                  onClick={() => {
                                    // navigate to that sub-service
                                    const newStack = navStack.slice(0, 1);
                                    newStack.push({ type: "sub", id: relId });
                                    setNavStack(newStack);
                                  }}
                                  style={{
                                    background: "#f3f4f6",
                                    padding: "6px 16px",
                                    borderRadius: "100px",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                    border: "1px solid #e5e7eb",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                      "#e5e7eb")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                      "#f3f4f6")
                                  }
                                >
                                  {relSub.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Book Service Button */}
                      <div style={{ marginTop: "12px" }}>
                        <a
                          href="https://wa.me/919504391391?text=Book%20Service%20for%20{{sub.label}}"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#dc2626",
                            color: "#fff",
                            padding: "14px 32px",
                            borderRadius: "8px",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            textDecoration: "none",
                            transition: "transform 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.02)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          <MessageCircle size={18} /> Book Service
                        </a>
                      </div>
                    </div>
                  );
                })()
              ) : (
                // List of items (services or sub-services)
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {currentItems.map((item) => {
                    const Icon = item.icon || Wrench;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "16px 20px",
                          background: "#f9fafb",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "background 0.2s, transform 0.2s",
                          border: "1px solid #e5e7eb",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f3f4f6";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#f9fafb";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <Icon size={24} color="#dc2626" />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                            {item.label}
                          </div>
                          {item.description && (
                            <div
                              style={{ fontSize: "0.85rem", color: "#6b7280" }}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>
                        <ChevronRight size={18} color="#94a3b8" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          `}</style>
        </div>
      )}
    </section>
  );
};

export default Services;
