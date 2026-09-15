
import React, { useState } from "react";
import {
  Wrench,
  Settings,
  Users,
  Headphones,
  ChevronRight,
  ChevronLeft,
  X,
  Shield,
  Award,
  Star,
  FileText,
  Truck,
  Clock,
  CheckCircle,
} from "lucide-react";

// ---------- Data ----------
const featureData = {
  "high-quality-tools": {
    id: "high-quality-tools",
    name: "High Quality Tools",
    icon: Wrench,
    description:
      "Our tools are designed for industrial, construction, and professional applications.",
    subTopics: [
      {
        id: "durability",
        label: "Durability",
        description:
          "Built to last with heavy-duty steel body, heat and rust resistant, shock proof.",
        details: [
          "Heavy-duty steel body",
          "Heat resistant up to 300°C",
          "Rust resistant coating",
          "Shock resistant design",
          "Industrial grade materials",
          "Tested under extreme conditions",
        ],
        expectedLife: "5–10 Years",
        applications: ["Construction", "Fabrication", "Mining", "Workshop"],
        reviews: [
          {
            user: "Rajesh K.",
            rating: 5,
            comment: "Unmatched durability – survived a year of daily use.",
          },
        ],
        relatedProducts: ["Hammer", "Drill", "Angle Grinder"],
        brochure: "/brochure-durability.pdf",
      },
      {
        id: "premium-materials",
        label: "Premium Materials",
        description:
          "Aerospace-grade aluminium and hardened steel alloys for lightweight strength.",
        details: [
          "Chromium-vanadium steel",
          "TPE ergonomic grips",
          "Precision-machined components",
        ],
        expectedLife: "8–12 Years",
        applications: ["Precision work", "Heavy-duty operations"],
        reviews: [
          {
            user: "Anil M.",
            rating: 5,
            comment: "The grip is fantastic – no slipping.",
          },
        ],
        relatedProducts: ["Screwdriver Set", "Pliers"],
        brochure: "/brochure-materials.pdf",
      },
      {
        id: "industrial-testing",
        label: "Industrial Testing",
        description:
          "Every tool undergoes rigorous testing to meet international standards.",
        details: [
          "Impact Test",
          "Drop Test",
          "Heat Test",
          "Dust Test",
          "Water Resistance",
          "Continuous Operation",
        ],
        expectedLife: "N/A",
        applications: ["Quality assurance", "Compliance"],
        reviews: [],
        relatedProducts: ["Test Kits"],
        brochure: "/brochure-testing.pdf",
      },
      {
        id: "warranty-support",
        label: "Warranty & Support",
        description: "5-year limited warranty and 24/7 technical support.",
        details: [
          "5-year limited warranty",
          "Free replacement for defects",
          "24/7 technical support",
        ],
        expectedLife: "N/A",
        applications: ["All users"],
        reviews: [
          {
            user: "Meera D.",
            rating: 5,
            comment: "Amazing support – replaced within 48 hours.",
          },
        ],
        relatedProducts: ["Extended Service Plans"],
        brochure: "/brochure-warranty.pdf",
      },
      {
        id: "safety-standards",
        label: "Safety Standards",
        description: "CE, UL, and OSHA certified for maximum protection.",
        details: [
          "Insulated handles for electrical safety",
          "Non-sparking materials",
          "Overload protection",
        ],
        expectedLife: "N/A",
        applications: ["Electrical work", "Oil & gas", "Mining"],
        reviews: [
          {
            user: "Vikram P.",
            rating: 5,
            comment: "I feel safe using these near live wires.",
          },
        ],
        relatedProducts: ["Insulated Screwdrivers", "Safety Gloves"],
        brochure: "/brochure-safety.pdf",
      },
    ],
  },
  "repair-services": {
    id: "repair-services",
    name: "Repair Services",
    icon: Settings,
    description:
      "Fast, reliable repair for all industrial equipment with certified technicians.",
    subTopics: [
      {
        id: "motor-repair",
        label: "Motor Repair",
        description: "Complete motor rewinding and overhaul services.",
        details: ["Rewinding", "Bearing replacement", "Dynamic balancing"],
        expectedLife: "Extended motor life",
        applications: ["Industrial motors", "Pumps"],
        reviews: [
          {
            user: "Suresh R.",
            rating: 5,
            comment: "They fixed my compressor in record time.",
          },
        ],
        relatedProducts: ["Motor parts"],
        brochure: "/brochure-motor.pdf",
      },
      // add more sub-topics as needed
    ],
  },
  "verified-suppliers": {
    id: "verified-suppliers",
    name: "Verified Suppliers",
    icon: Users,
    description:
      "Trusted partners with verified credentials and quality assurance.",
    subTopics: [
      {
        id: "supplier-network",
        label: "Supplier Network",
        description: "2,100+ active contractors and suppliers across India.",
        details: ["GST verified", "ISO certified", "Pan-India delivery"],
        expectedLife: "N/A",
        applications: ["B2B procurement", "Bulk orders"],
        reviews: [
          {
            user: "Vijay M.",
            rating: 5,
            comment: "They understand our needs perfectly.",
          },
        ],
        relatedProducts: ["Contractor Kits"],
        brochure: "/brochure-suppliers.pdf",
      },
    ],
  },
  "customer-support": {
    id: "customer-support",
    name: "Customer Support",
    icon: Headphones,
    description: "24/7 support via phone, email, chat, and WhatsApp.",
    subTopics: [
      {
        id: "support-channels",
        label: "Support Channels",
        description: "Reach us through multiple channels for quick resolution.",
        details: ["Phone", "Email", "Live Chat", "WhatsApp", "Telegram"],
        expectedLife: "N/A",
        applications: ["All customers"],
        reviews: [
          {
            user: "Deepa N.",
            rating: 5,
            comment: "They resolved my issue at 2 AM – incredible.",
          },
        ],
        relatedProducts: ["Premium Support Plans"],
        brochure: "/brochure-support.pdf",
      },
    ],
  },
};

// ---------- Helper Components ----------
const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={16}
        fill={i <= rating ? "#f59e0b" : "none"}
        color={i <= rating ? "#f59e0b" : "#d1d5db"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

// ---------- Main Component ----------
const WhyChooseUsWithDrawer = () => {
  // Navigation stack: array of objects { type: 'feature' | 'subTopic', id: string }
  const [navStack, setNavStack] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Current items based on stack
  const getCurrentItems = () => {
    if (navStack.length === 0) {
      // Home level: show all features
      return Object.values(featureData).map((f) => ({
        type: "feature",
        id: f.id,
        label: f.name,
        icon: f.icon,
        description: f.description,
        data: f,
      }));
    } else if (navStack.length === 1) {
      // Feature level: show sub-topics
      const featureId = navStack[0].id;
      const feature = featureData[featureId];
      return feature.subTopics.map((st) => ({
        type: "subTopic",
        id: st.id,
        label: st.label,
        description: st.description,
        data: st,
        parentFeatureId: featureId,
      }));
    } else {
      // Detail level: show related items or details (we'll just show details)
      // For simplicity, we show details of the last sub-topic with related products etc.
      const last = navStack[navStack.length - 1];
      const featureId = navStack[0].id;
      const feature = featureData[featureId];
      const subTopic = feature.subTopics.find((st) => st.id === last.id);
      if (!subTopic) return [];
      // Return a special "detail" view
      return [{ type: "detail", data: subTopic }];
    }
  };

  const currentItems = getCurrentItems();

  const handleItemClick = (item) => {
    if (item.type === "feature") {
      setNavStack([{ type: "feature", id: item.id }]);
      setIsPanelOpen(true);
    } else if (item.type === "subTopic") {
      setNavStack([...navStack, { type: "subTopic", id: item.id }]);
    }
    // If type is 'detail', we don't navigate further; show details.
  };

  const handleBack = () => {
    if (navStack.length === 0) {
      setIsPanelOpen(false);
    } else {
      setNavStack(navStack.slice(0, -1));
    }
  };

  const handleClose = () => {
    setIsPanelOpen(false);
    setNavStack([]);
  };

  // Render breadcrumb
  const renderBreadcrumb = () => {
    const items = [
      { label: "Home", onClick: handleClose },
      {
        label: "Why Choose Us",
        onClick: () => {
          setNavStack([]);
        },
      },
    ];
    // Add feature name if stack >=1
    if (navStack.length >= 1) {
      const featureId = navStack[0].id;
      const feature = featureData[featureId];
      items.push({
        label: feature.name,
        onClick: () => {
          setNavStack([{ type: "feature", id: featureId }]);
        },
      });
    }
    if (navStack.length >= 2) {
      const last = navStack[navStack.length - 1];
      const featureId = navStack[0].id;
      const feature = featureData[featureId];
      const sub = feature.subTopics.find((st) => st.id === last.id);
      if (sub) items.push({ label: sub.label, onClick: () => {} });
    }
    return items;
  };

  const breadcrumb = renderBreadcrumb();

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >


      {/* Slide-over Panel */}
      {isPanelOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            justifyContent: "flex-end",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
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
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close, Back, Breadcrumb */}
            <div
              style={{
                padding: "20px 24px",
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
                  color: "#64748b",
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
                    color: "#64748b",
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
                  color: "#475569",
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
                          idx === breadcrumb.length - 1 ? "#0f172a" : "#64748b",
                      }}
                    >
                      {item.label}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              {currentItems.length === 0 ? (
                <p>No content</p>
              ) : currentItems[0].type === "detail" ? (
                // Detail view of a sub-topic
                (() => {
                  const detail = currentItems[0].data;
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: 800,
                          color: "#0f172a",
                        }}
                      >
                        {detail.label}
                      </h3>
                      <p style={{ fontSize: "1rem", color: "#475569" }}>
                        {detail.description}
                      </p>
                      {detail.details && (
                        <div>
                          <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>
                            Key Features
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
                            {detail.details.map((item, i) => (
                              <li
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <CheckCircle size={16} color="#dc2626" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {detail.expectedLife && (
                        <div>
                          <strong>Expected Life:</strong> {detail.expectedLife}
                        </div>
                      )}
                      {detail.applications && (
                        <div>
                          <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>
                            Applications
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {detail.applications.map((app, i) => (
                              <span
                                key={i}
                                style={{
                                  background: "#f1f5f9",
                                  padding: "4px 12px",
                                  borderRadius: "100px",
                                  fontSize: "0.85rem",
                                }}
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {detail.reviews && detail.reviews.length > 0 && (
                        <div>
                          <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>
                            Customer Reviews
                          </h4>
                          {detail.reviews.map((r, i) => (
                            <div
                              key={i}
                              style={{
                                background: "#f8fafc",
                                padding: "12px",
                                borderRadius: "8px",
                                marginBottom: "8px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <strong>{r.user}</strong>{" "}
                                <StarRating rating={r.rating} />
                              </div>
                              <p style={{ marginTop: "4px" }}>{r.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {detail.relatedProducts &&
                        detail.relatedProducts.length > 0 && (
                          <div>
                            <h4
                              style={{ fontWeight: 700, marginBottom: "8px" }}
                            >
                              Related Products
                            </h4>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                              }}
                            >
                              {detail.relatedProducts.map((p, i) => (
                                <span
                                  key={i}
                                  style={{
                                    background: "#dc2626",
                                    color: "#fff",
                                    padding: "4px 16px",
                                    borderRadius: "100px",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      {detail.brochure && (
                        <a
                          href={detail.brochure}
                          download
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#111",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "0",
                            textDecoration: "none",
                            fontWeight: 600,
                            width: "fit-content",
                          }}
                        >
                          <FileText size={18} /> Download Brochure
                        </a>
                      )}
                    </div>
                  );
                })()
              ) : (
                // List of items (features or sub-topics)
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {currentItems.map((item) => {
                    const isFeature = item.type === "feature";
                    const Icon = isFeature
                      ? item.icon
                      : item.icon || ChevronRight;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "16px 20px",
                          background: "#f8fafc",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "background 0.2s, transform 0.2s",
                          border: "1px solid #e5e7eb",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f1f5f9";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#f8fafc";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        {Icon && <Icon size={24} color="#dc2626" />}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                            {item.label}
                          </div>
                          {item.description && (
                            <div
                              style={{ fontSize: "0.85rem", color: "#64748b" }}
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
    </div>
  );
};

export default WhyChooseUsWithDrawer;
