import React from "react";
import { categoriesData } from "../data/categories";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  return (
    <section id="categories" style={{ padding: "64px 0", background: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: "48px",
            gap: "24px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  height: "4px",
                  width: "24px",
                  background: "#dc2626",
                  borderRadius: "0",
                }}
              ></div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "#9ca3af",
                }}
              >
                Inventory Categories
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "#111",
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Professional <br />
              <span style={{ color: "#dc2626" }}>Power Solutions</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#6b7280",
              maxWidth: "400px",
              lineHeight: 1.6,
            }}
          >
            Engineered for high-performing professionals who demand precision,
            durability, and results in every procurement.
          </p>
        </div>

        {/* Category cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "64px",
          }}
        >
          {categoriesData.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              onClick={() => window.scrollTo(0, 0)}
              style={{
                textDecoration: "none",
                background: "#fff",
                borderRadius: "0",
                border: "1px solid #f0f0f0",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.03)";
              }}
            >
              <div
                style={{
                  height: "200px",
                  background: "#f3f4f6",
                  position: "relative",
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "#111",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "0",
                    fontSize: "9px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {category.type}
                </span>
              </div>
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "#111",
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    marginBottom: "8px",
                  }}
                >
                  {category.name}
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    marginBottom: "16px",
                    height: "33px",
                    overflow: "hidden",
                  }}
                >
                  {category.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#dc2626",
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  View Range <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Feature promo strip */}
        <div
          style={{
            background: "#111",
            borderRadius: "0",
            overflow: "hidden",
            display: "flex",
            flexWrap: "wrap",
            border: "1px solid #1f2937",
          }}
        >
          <div style={{ flex: "1 1 300px", background: "#000" }}>
            <div style={{ position: "relative", paddingTop: "177.77%" }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                src="https://www.youtube-nocookie.com/embed/9aUNFW43xFU?feature=oembed&autoplay=1&mute=1&modestbranding=1&loop=1&rel=0&playlist=9aUNFW43xFU&iv_load_policy=3&controls=0"
                title="INGCO 20V Cordless Tools"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div
            style={{
              flex: "1 1 400px",
              padding: "clamp(32px, 5vw, 64px)",
              color: "#fff",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#dc2626",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "0",
                fontSize: "9px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "16px",
              }}
            >
              Featured Category
            </span>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              INGCO 20V Cordless Tools
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                fontWeight: 600,
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              Power meets innovation. Our latest range of 20V cordless tools
              provides professionals with unparalleled performance and
              versatility.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              {[
                "One Battery Fits All Tools",
                "Rapid Charge Technology",
                "Heavy Duty Brushless Motors",
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: "#dc2626" }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Link
              to="/cordless-tools"
              onClick={() => window.scrollTo(0, 0)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#fff",
                color: "#111",
                padding: "16px 32px",
                borderRadius: "0",
                fontWeight: 800,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                textDecoration: "none",
              }}
            >
              Explore Cordless Range <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
