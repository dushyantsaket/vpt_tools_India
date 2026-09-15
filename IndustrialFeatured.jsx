import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Settings,
  Box,
  Zap,
  Shield,
  Wrench,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { handToolsData } from "../data/handToolsData";
import { storageData } from "../data/storageData";
import { planersData } from "../data/planersData";
import { newDiamondBlades } from "../data/newDiamondBlades";
import { unboxDiamondBlades } from "../data/unboxDiamondBlades";
import { tataAgricoData } from "../data/tataAgricoData";
import { armatureData } from "../data/armatureData";

import "../styles/IndustrialFeatured.css";

import ToolImage from "./ToolImage";

const ProductScrollSection = ({
  title,
  products,
  linkPrefix = "/product/",
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="ind-edition-section">
      <div className="ind-edition-header">
        <h3 className="ind-edition-title">{title}</h3>
        <div className="ind-edition-nav">
          <button onClick={() => scroll("left")} className="ind-nav-btn">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll("right")} className="ind-nav-btn">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="ind-edition-scroll" ref={scrollRef}>
        {products.map((product, index) => {
          let finalImage = product.image || product.image_url;

          return (
            <div key={`${product.id}-${index}`} className="ind-tool-card ind-tool-card--mini">
              <Link
                to={`${linkPrefix}${product.id}`}
                className="ind-tool-card__image-container"
              >
                {finalImage ? (
                  <img
                    src={finalImage}
                    alt={product.name}
                    className="ind-tool-card__main-img"
                  />
                ) : (
                  <ToolImage
                    toolName={product.name}
                    category={product.category}
                    className="ind-tool-card__main-img"
                  />
                )}
              </Link>
              <div className="ind-tool-card__content-box">
                <h4 className="ind-tool-card__name">{product.name}</h4>
                <p className="ind-tool-card__price">
                  {product.sale_price ||
                    product.price_inr ||
                    "Contact for Price"}
                </p>
                <Link
                  to={`${linkPrefix}${product.id}`}
                  className="ind-tool-card__link"
                >
                  View Details <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IndustrialFeatured = () => {
  // Grouping products based on user request mapping
  const industrialEditionProducts = handToolsData.slice(0, 12);
  const heatGunEditionProducts = [
    ...planersData,
    ...storageData,
    ...unboxDiamondBlades.slice(0, 6),
  ];
  const StorageDataEditionProducts = [
    ...armatureData,
    ...newDiamondBlades,
    ...handToolsData.slice(0, 12),
  ];
  const agriEditionProducts = tataAgricoData.slice(0, 12);

  return (
    <section className="ind-featured">
      <div className="ind-featured__container">
        {/* Header */}
        <div className="ind-featured__header">
          <div className="ind-featured__label">
            <span className="ind-featured__label-line"></span>
            <span className="ind-featured__label-text">
              Industrial Solutions
            </span>
          </div>
          <h2 className="ind-featured__title">
            Professional <br />
            <span className="ind-featured__title-accent">Power Gear</span>
          </h2>
          <p className="ind-featured__desc">
            Explore our massive catalog of industrial tools, precision blades,
            and workshop storage solutions.
          </p>
        </div>

        {/* Dynamic Edition Sections */}
        <div className="ind-editions-grid">
          <ProductScrollSection
            title="Industrial Tools Edition"
            products={industrialEditionProducts}
          />

          <ProductScrollSection
            title="Professional Heat Gun & Planers"
            products={heatGunEditionProducts}
          />

          <ProductScrollSection
            title="IGBT Inverter Welding & Storage"
            products={StorageDataEditionProducts}
          />

          <ProductScrollSection
            title="Agri & Garden Gear"
            products={agriEditionProducts}
          />
        </div>
      </div>
    </section>
  );
};

export default IndustrialFeatured;
