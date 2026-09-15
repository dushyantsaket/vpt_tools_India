import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Plus, Edit2, Trash2 } from "lucide-react";
import { buildInitialCatalog } from "../utils/catalog/buildCatalog";

const API = "/api";

const categoryCards = [
  { id: "all", name: "All Products", count: 1534, image: "" },
  {
    id: "air-tools",
    name: "Air Tools",
    count: 21,
    image: "https://cdn.moglix.com/p/UYhORf23UIvAM-medium.jpg",
  },
  {
    id: "automobile-tools",
    name: "Automobile Tools",
    count: 13,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/04/03-Akari-Gc-Wheel-4-Inch-2-5-Mm-Black-300x300.jpg",
  },
  {
    id: "cordless-power-tools",
    name: "Cordless Power Tools",
    count: 22,
    image: "https://cdn.moglix.com/p/nEktYTEbzXH0z-large.jpg",
  },
  {
    id: "spare-parts",
    name: "Spare Parts",
    count: 73,
    image:
      "https://unboxtools.com/wp-content/uploads/2025/12/GDC120-1-300x300.png",
  },
  {
    id: "garden-tools",
    name: "Garden Tools",
    count: 50,
    image: "https://cdn.moglix.com/p/CJGyrDcoWIJGH-medium.jpg",
  },
  {
    id: "hand-tools",
    name: "Hand Tools",
    count: 508,
    image: "https://tapariatools.com/wp-content/uploads/2022/10/Bits.jpg",
  },
  {
    id: "hardware",
    name: "Hardware",
    count: 43,
    image: "https://tapariatools.com/wp-content/uploads/2022/10/Bits.jpg",
  },
  {
    id: "light-construction-tools",
    name: "Light Construction Tools",
    count: 4,
    image: "https://s7ap1.scene7.com/is/image/TslDXP/drywall-screw_2",
  },
  {
    id: "material-handling",
    name: "Material Handling & Packing Equipments",
    count: 21,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/04/Kobmax-5-Inch-Angle-Grinder-1500W-125mm-Kxt50C-300x300.jpg",
  },
  {
    id: "measuring-tools",
    name: "Measuring Tools",
    count: 57,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/06/01-Alpha-4-Inch-46-Grit-Gc-Wheel-100-Mm-1-300x300.png",
  },
  {
    id: "power-tools",
    name: "Power Tools",
    count: 146,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/04/Kobmax-5-Inch-Angle-Grinder-1500W-125mm-Kxt50C-300x300.jpg",
  },
  {
    id: "power-tools-accessories",
    name: "Power Tools Accessories",
    count: 226,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/06/01-Alpha-4-Inch-46-Grit-Gc-Wheel-100-Mm-1-300x300.png",
  },
  {
    id: "pumps",
    name: "Pumps",
    count: 25,
    image: "https://cdn.moglix.com/p/9gcR9lQRPoPfo-medium.jpg",
  },
  {
    id: "pump-accessories",
    name: "Pump Accessories",
    count: 2,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/06/01-Alpha-4-Inch-46-Grit-Gc-Wheel-100-Mm-1-300x300.png",
  },
  {
    id: "safety-products",
    name: "Safety Products",
    count: 65,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/04/01-Akari-Dc-Wheel-4-Inch-16-Mm-Black-300x300.jpg",
  },
  {
    id: "welding",
    name: "Welding",
    count: 17,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/06/01-Akari-2000-W-Heat-Gun-Apthg2000-300x300.png",
  },
  {
    id: "painting-accessories",
    name: "Painting Accessories",
    count: 59,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/06/01-Akari-2000-W-Heat-Gun-Apthg2000-300x300.png",
  },
  {
    id: "electrical-accessories",
    name: "Electrical Accessories",
    count: 32,
    image: "https://cdn.moglix.com/assets/img/home_card.webp",
  },
  {
    id: "sockets",
    name: "Sockets",
    count: 64,
    image: "https://cdn.moglix.com/p/LkSwOGWIMfxhO-large.jpg",
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    count: 2,
    image:
      "https://unboxtools.com/wp-content/uploads/2024/06/01-Alpha-4-Inch-46-Grit-Gc-Wheel-100-Mm-1-300x300.png",
  },
];

const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      category: "tools",
      price_inr: 0,
      mrp_inr: 0,
      description: "",
      image: "",
      stock_quantity: 50,
    },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("quantity") ||
        name.includes("price") ||
        name.includes("mrp")
          ? Number(value)
          : value,
    }));
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>

        <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
          <div>
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="Product name"
            />
          </div>

          <div>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="e.g., power-tools"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <label>Selling Price (Γé╣) *</label>
              <input
                type="number"
                name="price_inr"
                value={formData.price_inr}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                }}
                placeholder="0"
              />
            </div>
            <div>
              <label>MRP (Γé╣)</label>
              <input
                type="number"
                name="mrp_inr"
                value={formData.mrp_inr}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                }}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="0"
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
                minHeight: "80px",
              }}
              placeholder="Product description"
            />
          </div>

          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              background: "#f5f5f5",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            style={{
              padding: "8px 16px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {product ? "Update" : "Add"} Product
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsNew = () => {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [sortOption, setSortOption] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [visibleCount, setVisibleCount] = useState(24);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [cartToast, setCartToast] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const categoryScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isAdmin = isLoggedIn && localStorage.getItem("userRole") === "admin";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  // initialize scroll button visibility
  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const onResize = () => {
      setCanScrollLeft(el.scrollLeft > 8);
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 8);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const loadProducts = async (pageArg = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/products?page=${pageArg}&limit=2000`);
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      const newProducts = Array.isArray(data.products) ? data.products : data;
      setProducts(newProducts);
      setHasMore(newProducts.length === 2000);
    } catch (error) {
      console.warn("Failed to load products:", error);
      const fallbackProducts = buildInitialCatalog()
        .slice(0, 100)
        .map((product) => ({
          ...product,
          _id: product._id || product.id,
          price_inr:
            product.price_inr || product.price || product.sale_price || 0,
          mrp_inr: product.mrp_inr || product.regular_price || product.mrp || 0,
        }));
      setProducts(fallbackProducts);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const normalizeText = (v) =>
    String(v || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const productMatchesCategory = (product, category) => {
    if (category.id === "all") return true;
    const hay = normalizeText(
      `${product.category} ${product.sub_category} ${product.name} ${product.brand} ${product.description}`,
    );
    return (
      normalizeText(category.name)
        .split(" ")
        .some((kw) => hay.includes(kw)) ||
      (product.category &&
        normalizeText(product.category).includes(normalizeText(category.id)))
    );
  };

  const filteredProducts = products.filter((p) =>
    productMatchesCategory(
      p,
      categoryCards.find((c) => c.id === activeCategoryId) || categoryCards[0],
    ),
  );

  const sortedProducts = (() => {
    if (!sortOption) return filteredProducts;
    const arr = [...filteredProducts];
    switch (sortOption) {
      case "low-high":
        return arr.sort((a, b) => (a.price_inr || 0) - (b.price_inr || 0));
      case "high-low":
        return arr.sort((a, b) => (b.price_inr || 0) - (a.price_inr || 0));
      case "discount":
        return arr.sort(
          (a, b) =>
            b.mrp_inr - (b.price_inr || 0) - (a.mrp_inr - (a.price_inr || 0)),
        );
      default:
        return arr;
    }
  })();

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const isOutOfStock =
      product.stockStatus === "Out of Stock" ||
      Number(product.stock_quantity ?? 0) <= 0;
    if (isOutOfStock) return;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price_inr,
      image: product.image,
      stockStatus: product.stockStatus,
      stock_quantity: product.stock_quantity,
      quantity: 1,
    };
    addToCart(cartItem);
    setCartToast(product.name);
    setTimeout(() => setCartToast(null), 2500);
  };

  const handleSaveProduct = async (formData) => {
    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `${API}/products/${editingProduct._id}`
        : `${API}/products`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save product");
      const savedProduct = await response.json();

      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p._id === savedProduct._id ? savedProduct : p)),
        );
      } else {
        setProducts((prev) => [savedProduct, ...prev]);
      }

      setShowModal(false);
      setEditingProduct(null);
      setCartToast(editingProduct ? "Product updated" : "Product added");
      setTimeout(() => setCartToast(null), 2500);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API}/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setCartToast("Product deleted");
      setTimeout(() => setCartToast(null), 2500);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <section
      id="products"
      style={{
        padding: isMobile ? "20px 0" : "40px 0",
        background: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "0 15px" : "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isMobile ? "20px" : "30px",
            flexDirection: isMobile ? "column" : "row",
            gap: "15px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Products ({sortedProducts.length})
          </h2>
          {isAdmin && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowModal(true);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              <Plus size={20} /> Add Product
            </button>
          )}
        </div>

        <div style={{ marginBottom: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 900 }}>
              Shop by Categories
            </h3>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => {
                  setActiveCategoryId("all");
                  setSortOption(null);
                  setPage(1);
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: activeCategoryId === "all" ? "#dc2626" : "#fff",
                  color: activeCategoryId === "all" ? "#fff" : "#111827",
                  border: "1px solid #e5e7eb",
                  fontWeight: 900,
                }}
              >
                All Products
              </button>
              {[
                "Best Selling",
                "New Arrivals",
                "Discount",
                "Price: Low to High",
                "Price: High to Low",
              ].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === "Price: Low to High")
                      setSortOption("low-high");
                    else if (label === "Price: High to Low")
                      setSortOption("high-low");
                    else if (label === "Discount") setSortOption("discount");
                    else setSortOption(null);
                    setPage(1);
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background:
                      sortOption &&
                      ((label === "Price: Low to High" &&
                        sortOption === "low-high") ||
                        (label === "Price: High to Low" &&
                          sortOption === "high-low") ||
                        (label === "Discount" && sortOption === "discount"))
                        ? "#dc2626"
                        : "#fff",
                    color: sortOption ? "#fff" : "#111827",
                    border: "1px solid #e5e7eb",
                    fontWeight: 800,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => {
                  const el = categoryScrollRef.current;
                  if (el) el.scrollBy({ left: -280, behavior: "smooth" });
                }}
                aria-label="Scroll categories left"
                style={{
                  position: "absolute",
                  left: -8,
                  top: "32px",
                  zIndex: 5,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  border: "none",
                  background: "#fff",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                }}
              >
                ΓùÇ
              </button>
            )}
            <div
              ref={categoryScrollRef}
              tabIndex={0}
              onKeyDown={(e) => {
                const el = categoryScrollRef.current;
                if (!el) return;
                if (e.key === "ArrowLeft")
                  el.scrollBy({ left: -280, behavior: "smooth" });
                if (e.key === "ArrowRight")
                  el.scrollBy({ left: 280, behavior: "smooth" });
              }}
              onScroll={() => {
                const el = categoryScrollRef.current;
                if (!el) return;
                setCanScrollLeft(el.scrollLeft > 8);
                setCanScrollRight(
                  el.scrollWidth - el.clientWidth - el.scrollLeft > 8,
                );
              }}
              style={{
                display: "grid",
                gridAutoFlow: "column",
                gridAutoColumns: "minmax(160px,1fr)",
                gap: "12px",
                overflowX: "auto",
                paddingBottom: "6px",
                scrollBehavior: "smooth",
              }}
            >
              {categoryCards.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    setPage(1);
                    setVisibleCount(24);
                  }}
                  style={{
                    minHeight: "120px",
                    textAlign: "left",
                    borderRadius: "12px",
                    border:
                      activeCategoryId === cat.id
                        ? "2px solid #dc2626"
                        : "1px solid #e5e7eb",
                    background: "#fff",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{
                          width: "56px",
                          height: "56px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          background: "#f3f4f6",
                          borderRadius: 8,
                        }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 900 }}>{cat.name}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        {cat.count} Products
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {canScrollRight && (
              <button
                type="button"
                onClick={() => {
                  const el = categoryScrollRef.current;
                  if (el) el.scrollBy({ left: 280, behavior: "smooth" });
                }}
                aria-label="Scroll categories right"
                style={{
                  position: "absolute",
                  right: -8,
                  top: "32px",
                  zIndex: 5,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  border: "none",
                  background: "#fff",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                }}
              >
                Γû╢
              </button>
            )}
          </div>
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#999",
            }}
          >
            Loading products...
          </div>
        )}

        {!loading && products.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#999",
            }}
          >
            No products available
          </div>
        )}

        {!loading && products.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(auto-fill, minmax(150px, 1fr))"
                : "repeat(auto-fill, minmax(200px, 1fr))",
              gap: isMobile ? "12px" : "20px",
            }}
          >
            {(() => {
              const featured = {
                id: "",
                title: "",
                subtitle: "",
                bullets: [],
                image:
                  "https://res-sg.togroup.com/stc/home_product/ingco/website-center/upload/images/25509f3165474f368e831a512cdff6e2.webp",
                link: "/cordless-tools",
              };

              const nodes = [];
              visibleProducts.forEach((product, idx) => {
                const isOutOfStock =
                  product.stockStatus === "Out of Stock" ||
                  Number(product.stock_quantity ?? 0) <= 0;

                nodes.push(
                  <div
                    key={product._id || product.id}
                    style={{
                      background: "#fff",
                      border: "1px solid #d5d9d9",
                      borderRadius: "6px",
                      overflow: "hidden",
                      transition: "box-shadow 0.18s, transform 0.18s",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      opacity: isOutOfStock ? 0.7 : 1,
                      height: "100%",
                      boxShadow: "0 2px 8px rgba(15,17,17,0.04)",
                    }}
                    onClick={() =>
                      navigate(`/product/${product._id || product.id}`)
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(15,17,17,0.06)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(15,17,17,0.04)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        height: isMobile ? "120px" : "160px",
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        position: "relative",
                        padding: "12px",
                      }}
                    >
                      {isOutOfStock && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            zIndex: 2,
                            background: "#dc2626",
                            color: "#fff",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            fontSize: "10px",
                            fontWeight: 900,
                            letterSpacing: "0.04em",
                          }}
                        >
                          OUT OF STOCK
                        </span>
                      )}
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            padding: "8px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            color: "#d1d5db",
                            fontSize: "12px",
                          }}
                        >
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        padding: isMobile ? "10px" : "12px",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: 700,
                          margin: "0 0 8px 0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.name}
                      </h3>

                      <p
                        style={{
                          fontSize: isMobile ? "11px" : "12px",
                          color: "#6b7280",
                          margin: "0 0 8px 0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.category}
                      </p>

                      {/* Price */}
                      <div style={{ marginBottom: "8px" }}>
                        <div
                          style={{
                            fontSize: isMobile ? "15px" : "18px",
                            fontWeight: 900,
                            color: "#b91c1c",
                          }}
                        >
                          Γé╣{product.price_inr}
                        </div>
                        {product.mrp_inr > product.price_inr && (
                          <div
                            style={{
                              fontSize: isMobile ? "11px" : "12px",
                              color: "#9ca3af",
                              textDecoration: "line-through",
                            }}
                          >
                            Γé╣{product.mrp_inr}
                          </div>
                        )}
                      </div>

                      {/* Stock */}
                      <div
                        style={{
                          fontSize: isMobile ? "11px" : "12px",
                          color: !isOutOfStock ? "#16a34a" : "#dc2626",
                          marginBottom: "8px",
                        }}
                      >
                        {!isOutOfStock
                          ? `Stock: ${product.stock_quantity}`
                          : "OUT OF STOCK"}
                      </div>

                      {/* Buttons */}
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginTop: "auto",
                        }}
                      >
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={isOutOfStock}
                          style={{
                            flex: 1,
                            padding: isMobile ? "10px 12px" : "12px 18px",
                            background: isOutOfStock ? "#f3f4f6" : "#ffd814",
                            color: isOutOfStock ? "#6b7280" : "#111",
                            border: isOutOfStock
                              ? "1px solid #e5e7eb"
                              : "1px solid #f0c14b",
                            borderRadius: "999px",
                            cursor: isOutOfStock ? "not-allowed" : "pointer",
                            fontSize: isMobile ? "13px" : "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            fontWeight: 900,
                            boxShadow: isOutOfStock
                              ? "none"
                              : "0 2px 0 rgba(0,0,0,0.06)",
                          }}
                        >
                          <ShoppingCart size={isMobile ? 14 : 16} />
                          {isOutOfStock
                            ? "Unavailable"
                            : isMobile
                              ? "Add"
                              : "Add to Cart"}
                        </button>
                        {isAdmin && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingProduct(product);
                                setShowModal(true);
                              }}
                              style={{
                                padding: isMobile ? "6px 8px" : "8px 12px",
                                background: "#3b82f6",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              <Edit2 size={isMobile ? 14 : 16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProduct(product._id);
                              }}
                              style={{
                                padding: isMobile ? "6px 8px" : "8px 12px",
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              <Trash2 size={isMobile ? 14 : 16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>,
                );

                if (idx === 2) {
                  nodes.push(
                    <div
                      key={featured.id}
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        padding: "16px",
                        background: "linear-gradient(135deg,#fff,#fffaf5)",
                      }}
                    >
                      <img
                        src={featured.image}
                        alt={featured.title}
                        style={{
                          width: isMobile ? "100%" : "120px",
                          height: isMobile ? "auto" : "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "16px",
                            fontWeight: 900,
                          }}
                        >
                          {featured.title}
                        </h3>
                        <p style={{ margin: "8px 0", color: "#4b5563" }}>
                          {featured.subtitle}
                        </p>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: "10px",
                            color: "#374151",
                          }}
                        >
                          {featured.bullets.map((b) => (
                            <li
                              key={b}
                              style={{ fontSize: "2px", fontWeight: 800 }}
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div style={{ marginTop: "10px" }}>
                          <button
                            onClick={() => navigate(featured.link)}
                            style={{
                              background: "#dc2626",
                              color: "#fff",
                              padding: "2px 10px",
                              borderRadius: "8px",
                              border: "none",
                              fontWeight: 700,
                            }}
                          >
                            Explore Cordless Range
                          </button>
                        </div>
                      </div>
                    </div>,
                  );
                }
              });

              return nodes;
            })()}
          </div>
        )}

        {/* Load More */}
        {sortedProducts.length > visibleCount && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={() =>
                setVisibleCount((v) => Math.min(v + 24, sortedProducts.length))
              }
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              See More Products
            </button>
          </div>
        )}

        {/* Load More (server pagination) */}
        {hasMore && !loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <button
              onClick={() => setPage((prev) => prev + 1)}
              style={{
                padding: "10px 24px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Load More Products
            </button>
          </div>
        )}
      </div>

      {/* Cart Toast */}
      {cartToast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#10b981",
            color: "white",
            padding: "12px 20px",
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          {cartToast} added to cart
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        }
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ProductsNew;

