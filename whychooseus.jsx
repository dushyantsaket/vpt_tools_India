import React, { useState } from "react";
import {
  ShieldCheck,
  IndianRupee,
  Wrench,
  Users,
  HeadphonesIcon,
  X,
  ChevronRight,
  Home,
  CheckCircle,
  Star,
  Image,
  Video,
  FileText,
  MessageCircle,
  Award,
  HelpCircle,
  Package,
  ArrowLeft,
  TrendingUp,
  ThumbsUp,
  Zap,
  Shield,
  Settings,
  Clock,
  Truck,
  BarChart,
} from "lucide-react";
import "./WhyChooseUs.css";

// ------------------------------------------------------------
// Data: 5 main features with sub‑topics and detailed content
// ------------------------------------------------------------
const featuresData = [
  {
    id: "tools",
    name: "High-Quality Professional Tools",
    icon: ShieldCheck,
    shortDesc: "Premium-grade equipment for every job",
    color: "#dc2626",
    bgColor: "#fef2f2",
    description:
      "Our professional tools are engineered for demanding industrial and commercial applications. We source only the finest materials and employ rigorous quality control to ensure every tool exceeds expectations.",
    subTopics: [
      {
        id: "durability",
        label: "Durability",
        icon: Shield,
        content: {
          overview:
            "Built to withstand the harshest job sites, our tools are designed for long‑term performance. Every component is tested to endure heavy use without compromising accuracy or safety.",
          benefits: [
            "High carbon steel construction",
            "Rust‑resistant coating",
            "Heat treatment for enhanced strength",
            "Shock‑resistant body",
            "Industrial‑grade testing (ISO 9001)",
          ],
          suitableFor: [
            "Construction",
            "Plumbing",
            "Electrical",
            "Fabrication",
            "Automotive",
          ],
          maintenance:
            "Clean after each use, store in a dry place, and lubricate moving parts regularly to extend tool life.",
          relatedProducts: [
            "Hammer",
            "Drill",
            "Angle Grinder",
            "Impact Wrench",
          ],
          specifications: {
            material: "High‑carbon steel with anti‑corrosion finish",
            weight: "1.2 – 4.5 kg (varies by model)",
            warranty: "5‑year limited warranty",
          },
          reviews: [
            {
              user: "Rajesh K.",
              rating: 5,
              comment: "Unmatched durability – survived a year of daily use.",
            },
            {
              user: "Priya S.",
              rating: 4,
              comment: "Great quality, only minor rust after 6 months.",
            },
          ],
        },
      },
      {
        id: "premium-materials",
        label: "Premium Materials",
        icon: Award,
        content: {
          overview:
            "We use only the finest raw materials – from aerospace‑grade aluminium to hardened steel alloys – to ensure every tool is both lightweight and incredibly strong.",
          benefits: [
            "Corrosion‑resistant alloys",
            "Ergonomic grips made from sustainable rubber",
            "Precision‑machined components",
          ],
          suitableFor: ["Precision work", "Heavy‑duty operations"],
          maintenance:
            "Wipe with a soft cloth and apply anti‑corrosion oil periodically.",
          relatedProducts: ["Screwdriver Set", "Pliers", "Wrenches"],
          specifications: {
            material: "Chromium‑vanadium steel, TPE handles",
            weight: "0.8 – 3.2 kg",
            warranty: "3‑year warranty",
          },
          reviews: [
            {
              user: "Anil M.",
              rating: 5,
              comment:
                "The grip is fantastic – no slipping even with oily hands.",
            },
          ],
        },
      },
      {
        id: "precision-engineering",
        label: "Precision Engineering",
        icon: TrendingUp,
        content: {
          overview:
            "Our tools are crafted with micron‑level precision to deliver consistent results, whether you are aligning parts or cutting materials.",
          benefits: [
            "CNC‑machined tolerances ±0.01mm",
            "Laser‑calibrated for accuracy",
            "Balanced design for reduced vibration",
          ],
          suitableFor: [
            "Mechanical workshops",
            "Aerospace",
            "Medical device manufacturing",
          ],
          maintenance: "Regular calibration checks recommended.",
          relatedProducts: ["Digital Caliper", "Micrometer", "Laser Level"],
          specifications: {
            accuracy: "±0.01mm",
            material: "Hardened stainless steel",
            warranty: "2‑year accuracy guarantee",
          },
          reviews: [
            {
              user: "Sneha R.",
              rating: 5,
              comment: "Perfect for our lab – measurements are spot on.",
            },
          ],
        },
      },
      {
        id: "safety-standards",
        label: "Safety Standards",
        icon: Shield,
        content: {
          overview:
            "Every tool meets or exceeds international safety standards, including CE, UL, and OSHA requirements, to protect you on the job.",
          benefits: [
            "Insulated handles for electrical safety",
            "Non‑sparking materials for hazardous environments",
            "Overload protection mechanisms",
          ],
          suitableFor: ["Electrical work", "Oil & gas", "Mining"],
          maintenance: "Inspect insulation regularly; replace if damaged.",
          relatedProducts: [
            "Insulated Screwdrivers",
            "Safety Gloves",
            "Face Shields",
          ],
          specifications: {
            certification: "CE, UL, CSA",
            insulation: "Class II double insulation",
            warranty: "Lifetime safety guarantee",
          },
          reviews: [
            {
              user: "Vikram P.",
              rating: 5,
              comment: "I feel safe using these near live wires.",
            },
          ],
        },
      },
      {
        id: "warranty",
        label: "Warranty & Support",
        icon: Award,
        content: {
          overview:
            "We stand behind our tools with a comprehensive warranty and responsive customer support to keep your projects running smoothly.",
          benefits: [
            "5‑year limited warranty",
            "Free replacement for manufacturing defects",
            "24/7 technical support",
          ],
          suitableFor: ["All professional users"],
          maintenance: "Register your product online to activate warranty.",
          relatedProducts: ["Extended Service Plans", "Protective Cases"],
          specifications: {
            warrantyPeriod: "5 years",
            coverage: "Parts and labour",
            support: "Email, phone, and live chat",
          },
          reviews: [
            {
              user: "Meera D.",
              rating: 5,
              comment:
                "They replaced a faulty part within 48 hours – amazing support.",
            },
          ],
        },
      },
      {
        id: "maintenance-tips",
        label: "Maintenance Tips",
        icon: "",
        content: {
          overview:
            "Proper care extends tool life and ensures consistent performance. Follow these simple tips to keep your tools in top shape.",
          benefits: [
            "Clean after each use to prevent rust",
            "Lubricate moving parts regularly",
            "Store in a dry, temperature‑controlled environment",
          ],
          suitableFor: ["All tools"],
          maintenance:
            "Use a soft brush to remove debris, apply a light oil coating, and periodically check for loose fasteners.",
          relatedProducts: ["Maintenance Kit", "Lubricants", "Storage Racks"],
          specifications: {
            recommendedProducts: "WD‑40, 3‑in‑1 Oil, Silicone Spray",
          },
          reviews: [],
        },
      },
      {
        id: "recommended-industries",
        label: "Recommended Industries",
        icon: BarChart,
        content: {
          overview:
            "Our tools are trusted across a wide range of industries due to their reliability and precision.",
          benefits: [
            "Construction & Infrastructure",
            "Automotive Repair",
            "Aerospace Manufacturing",
            "Energy & Utilities",
            "Mining & Heavy Equipment",
          ],
          suitableFor: [
            "B2B clients",
            "Government projects",
            "Private contractors",
          ],
          maintenance: "Industry‑specific care guides available on request.",
          relatedProducts: ["Custom Tool Sets", "Industrial Carts"],
          specifications: {
            industryStandards: "ISO 9001, API, ASTM",
          },
          reviews: [
            {
              user: "Suresh N.",
              rating: 5,
              comment:
                "We use them across all our sites – they never disappoint.",
            },
          ],
        },
      },
      {
        id: "faqs",
        label: "FAQs",
        icon: HelpCircle,
        content: {
          overview: "Frequently asked questions about our professional tools.",
          benefits: [
            "Q: Are the tools covered by a warranty? A: Yes, 5‑year limited warranty.",
            "Q: Do you offer bulk discounts? A: Yes, for orders above 50 units.",
            "Q: Can I get custom branding? A: Yes, minimum order quantities apply.",
          ],
          suitableFor: ["All customers"],
          maintenance: "Visit our FAQ page for more answers.",
          relatedProducts: ["Contact Sales"],
          specifications: {},
          reviews: [],
        },
      },
      {
        id: "certifications",
        label: "Certifications",
        icon: Award,
        content: {
          overview:
            "Our tools are certified by leading independent bodies, ensuring quality and safety you can trust.",
          benefits: [
            "ISO 9001:2015 Quality Management",
            "ISO 14001 Environmental Management",
            "CE Marking",
            "UL Listed",
          ],
          suitableFor: ["Regulated industries", "Government contracts"],
          maintenance: "Certificates available upon request.",
          relatedProducts: ["Compliance Kits"],
          specifications: {
            certifications: "ISO, CE, UL, CSA",
          },
          reviews: [],
        },
      },
      {
        id: "customer-reviews",
        label: "Customer Reviews",
        icon: MessageCircle,
        content: {
          overview: "What our customers say about our high‑quality tools.",
          benefits: [
            "“Reliable and durable – every time.” – Arjun S.",
            "“The best tools I have used in 20 years.” – Lakshmi P.",
            "“Worth every rupee – highly recommend.” – Ravi G.",
          ],
          suitableFor: ["Decision‑makers", "Procurement teams"],
          maintenance: "Submit your own review to win a gift card!",
          relatedProducts: ["All products"],
          specifications: {},
          reviews: [
            { user: "Arjun S.", rating: 5, comment: "Absolutely top‑notch." },
            { user: "Lakshmi P.", rating: 5, comment: "They last forever." },
          ],
        },
      },
    ],
  },
  {
    id: "prices",
    name: "Affordable Prices",
    icon: IndianRupee,
    shortDesc: "Best value without compromising quality",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    description:
      "We offer competitive pricing that makes professional tools accessible to everyone, without sacrificing quality or performance.",
    subTopics: [
      {
        id: "pricing-model",
        label: "Transparent Pricing",
        icon: IndianRupee,
        content: {
          overview: "No hidden fees – what you see is what you pay.",
          benefits: [
            "Upfront quotes",
            "Volume discounts",
            "Price match guarantee",
          ],
          suitableFor: ["Budget‑conscious projects", "Large‑scale procurement"],
          maintenance: "Contact our sales team for tailored pricing.",
          relatedProducts: ["Bulk Packs", "Subscription Plans"],
          specifications: { discountTiers: "5% for 10+, 10% for 50+" },
          reviews: [
            {
              user: "Neha K.",
              rating: 5,
              comment: "Saved 30% on our annual order.",
            },
          ],
        },
      },
      // Additional sub‑topics for affordability could be added here
      // For brevity, we include only one example; you can expand similarly.
    ],
  },
  // The other three features (Repair Services, Trusted Contractors, Customer Support)
  // would follow the same structure. To keep the code manageable, I will include
  // placeholder sub‑topics for them, but you can easily expand.
  {
    id: "repair",
    name: "Reliable Repair Services",
    icon: Wrench,
    shortDesc: "Fast, dependable, and built to last",
    color: "#2563eb",
    bgColor: "#eff6ff",
    description:
      "Our certified technicians bring decades of experience to every repair, ensuring your equipment is back in service quickly.",
    subTopics: [
      {
        id: "repair-process",
        label: "Repair Process",
        icon: Settings,
        content: {
          overview: "Streamlined repair workflow from diagnosis to delivery.",
          benefits: [
            "Same‑day diagnosis",
            "OEM parts",
            "6‑month service guarantee",
          ],
          suitableFor: ["Industrial machinery", "Power tools"],
          maintenance: "Schedule regular check‑ups to prevent breakdowns.",
          relatedProducts: ["Extended Service Contracts"],
          specifications: { turnaround: "4–6 hours average" },
          reviews: [
            {
              user: "Suresh R.",
              rating: 5,
              comment: "They fixed my compressor in record time.",
            },
          ],
        },
      },
      // add more sub‑topics as needed
    ],
  },
  {
    id: "contractors",
    name: "Trusted by Local Contractors",
    icon: Users,
    shortDesc: "The preferred choice of industry professionals",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    description:
      "Over 2,000 local contractors rely on us for consistent quality and service. Join the community of satisfied professionals.",
    subTopics: [
      {
        id: "contractor-network",
        label: "Contractor Network",
        icon: Users,
        content: {
          overview:
            "We partner with contractors to deliver exceptional results.",
          benefits: [
            "Exclusive discounts",
            "Priority support",
            "Co‑marketing opportunities",
          ],
          suitableFor: ["General contractors", "Sub‑contractors"],
          maintenance: "Join our referral program to earn rewards.",
          relatedProducts: ["Contractor Kits"],
          specifications: { networkSize: "2,100+ active contractors" },
          reviews: [
            {
              user: "Vijay M.",
              rating: 5,
              comment: "They understand our needs perfectly.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "support",
    name: "Fast Customer Support",
    icon: HeadphonesIcon,
    shortDesc: "We are here when you need us most",
    color: "#f59e0b",
    bgColor: "#fffbeb",
    description:
      "Our support team operates 24/7 across multiple channels to resolve your issues quickly and effectively.",
    subTopics: [
      {
        id: "support-channels",
        label: "Support Channels",
        icon: HeadphonesIcon,
        content: {
          overview: "Reach us via phone, email, live chat, or social media.",
          benefits: [
            "Average response time under 1 minute",
            "Dedicated technical hotline",
          ],
          suitableFor: ["All customers"],
          maintenance: "Check our knowledge base for self‑help articles.",
          relatedProducts: ["Premium Support Plans"],
          specifications: {
            channels: "Phone, Email, Chat, WhatsApp, Telegram",
          },
          reviews: [
            {
              user: "Deepa N.",
              rating: 5,
              comment: "They resolved my issue at 2 AM – incredible.",
            },
          ],
        },
      },
    ],
  },
];

const featureImages = {
  tools:
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
  prices:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
  repair:
    "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop&q=80",
  contractors:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
  support:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=80",
};

const homepageAdvantages = [
  {
    id: "tools",
    name: "High Quality Tools",
    eyebrow: "Industrial Grade",
    description:
      "Our tools are designed for industrial, construction, and professional applications.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&auto=format&fit=crop&q=90",
  },
  {
    id: "repair",
    name: "Repair Services",
    eyebrow: "Certified Technicians",
    description:
      "Fast, reliable repair for all industrial equipment with certified technicians.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=900&auto=format&fit=crop&q=90",
  },
  {
    id: "contractors",
    name: "Verified Suppliers",
    eyebrow: "Quality Assured",
    description:
      "Trusted partners with verified credentials and quality assurance.",
    icon: Package,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=90",
  },
  {
    id: "support",
    name: "Customer Support",
    eyebrow: "Always Available",
    description: "24/7 support via phone, email, chat, and WhatsApp.",
    icon: HeadphonesIcon,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&auto=format&fit=crop&q=90",
  },
];

// ------------------------------------------------------------
// Helper component for rendering stars
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// Main Component
// ------------------------------------------------------------
// Customer photos for the Happy Customers carousel
const HAPPY_CUSTOMER_PHOTOS = [
  {
    name: "Happy Customer 1",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&fit=crop&q=80",
  },
  {
    name: "Happy Customer 5",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&fit=crop&q=80",
  },
  {
    name: "Happy Customer 2",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&fit=crop&q=80",
  },
  {
    name: "Happy Customer 3",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&fit=crop&q=80",
  },
  {
    name: "Happy Customer 4",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&fit=crop&q=80",
  },
  {
    name: "Happy Customer 6",
    image:
      "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=400&fit=crop&q=80",
  },
];

// Static reviews for the customer reviews carousel
const STATIC_REVIEWS = [
  {
    name: "Rohit Kumar",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    rating: 5,
    text: '"Dushyant Power Tools से जो मशीन ली है, वो बहुत अच्छी क्वालिटी की है और सर्विस भी शानदार है! पूरी तरह संतुष्ट हूँ।"',
    time: "2 days ago",
  },
  {
    name: "Amit Sharma",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    verified: true,
    rating: 5,
    text: '"बहुत बढ़िया प्रोडक्ट और fast delivery। Angle grinder बिल्कुल genuine है, highly recommend करता हूँ।"',
    time: "5 days ago",
  },
  {
    name: "Sanjay Verma",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
    verified: true,
    rating: 5,
    text: '"Professional quality tools at great price. Drill machine is solid and the after-sales support is excellent!"',
    time: "1 week ago",
  },
];

// Static videos for the video carousel
const STATIC_VIDEOS = [
  {
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    title: "Best Power Tools for Home & Workshop",
    duration: "07:45",
    url: "https://www.youtube.com/@dushyantfurnituremartsidhi",
  },
  {
    thumb: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    title: "Angle Grinder – Tips & Tricks",
    duration: "05:20",
    url: "https://www.youtube.com/@dushyantfurnituremartsidhi",
  },
  {
    thumb: "https://img.youtube.com/vi/L_jWHffIx5E/hqdefault.jpg",
    title: "Cordless Drill Review & Demo",
    duration: "06:10",
    url: "https://www.youtube.com/@dushyantfurnituremartsidhi",
  },
];

const WhyChooseUs = () => {
  // State: which feature is selected (null = closed)
  const [activeFeatureId, setActiveFeatureId] = useState(null);
  // State: which sub‑topic is selected (first by default when modal opens)
  const [activeSubTopicId, setActiveSubTopicId] = useState(null);
  // State: which tab is active inside the detail view (e.g., 'overview', 'benefits', etc.)
  const [activeTab, setActiveTab] = useState("overview");
  // Rich showcase panel state
  const [customerPhotoIdx, setCustomerPhotoIdx] = useState(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [videoIdx, setVideoIdx] = useState(0);

  // Find the currently active feature object
  const activeFeature = featuresData.find((f) => f.id === activeFeatureId);
  // Find the currently active sub‑topic object
  const activeSubTopic = activeFeature?.subTopics.find(
    (st) => st.id === activeSubTopicId,
  );

  // When a feature card is clicked, open modal and set first sub‑topic as active
  const handleFeatureClick = (featureId) => {
    const feature = featuresData.find((f) => f.id === featureId);
    if (feature) {
      setActiveFeatureId(featureId);
      setActiveSubTopicId(feature.subTopics[0]?.id || null);
      setActiveTab("overview");
      document.body.style.overflow = "hidden";
    }
  };

  // Close modal and reset state
  const closeModal = () => {
    setActiveFeatureId(null);
    setActiveSubTopicId(null);
    setActiveTab("overview");
    document.body.style.overflow = "auto";
  };

  // Handle sub‑topic click from left menu
  const handleSubTopicClick = (subTopicId) => {
    setActiveSubTopicId(subTopicId);
    setActiveTab("overview"); // reset tab when switching sub‑topic
  };

  // Breadcrumb
  const breadcrumbItems = [
    { label: "Home", icon: Home, onClick: closeModal },
    {
      label: "Why Choose Us",
      onClick: () => {
        /* stays in modal */
      },
    },
  ];
  if (activeFeature) {
    breadcrumbItems.push({ label: activeFeature.name, onClick: () => {} });
  }
  if (activeSubTopic) {
    breadcrumbItems.push({ label: activeSubTopic.label, onClick: () => {} });
  }

  // Tabs for detail view
  const tabKeys = [
    "overview",
    "benefits",
    "specifications",
    "maintenance",
    "reviews",
    "relatedProducts",
  ];
  const tabLabels = {
    overview: "Overview",
    benefits: "Benefits",
    specifications: "Specs",
    maintenance: "Maintenance",
    reviews: "Reviews",
    relatedProducts: "Related Products",
  };

  // Render the detail content based on activeTab and activeSubTopic
  const renderDetailContent = () => {
    if (!activeSubTopic) return null;
    const content = activeSubTopic.content;
    switch (activeTab) {
      case "overview":
        return (
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#1e293b" }}>
            {content.overview}
          </p>
        );
      case "benefits":
        return (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {content.benefits &&
              content.benefits.map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <CheckCircle
                    size={20}
                    color={activeFeature.color}
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <span>{b}</span>
                </li>
              ))}
          </ul>
        );
      case "specifications":
        const specs = content.specifications || {};
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {Object.entries(specs).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: "#f8fafc",
                  padding: "12px 16px",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  {key}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#0f172a",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        );
      case "maintenance":
        return (
          <div>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#1e293b" }}>
              {content.maintenance}
            </p>
            {content.suitableFor && (
              <>
                <h5
                  style={{
                    marginTop: "20px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  Suitable For
                </h5>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {content.suitableFor.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        background: "#e2e8f0",
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontSize: "0.85rem",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      case "reviews":
        const reviews = content.reviews || [];
        if (reviews.length === 0) return <p>No reviews yet.</p>;
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                style={{
                  background: "#f1f5f9",
                  padding: "16px",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{review.user}</strong>
                  <StarRating rating={review.rating} />
                </div>
                <p style={{ marginTop: "6px", color: "#334155" }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        );
      case "relatedProducts":
        const products = content.relatedProducts || [];
        if (products.length === 0) return <p>No related products.</p>;
        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {products.map((p, i) => (
              <span
                key={i}
                style={{
                  background: activeFeature.bgColor,
                  color: activeFeature.color,
                  padding: "8px 18px",
                  borderRadius: "100px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* ============================================================
          RICH SHOWCASE PANEL — Stats, About Store, Happy Customers,
          Reviews, Videos, Service Info
          ============================================================ */}
      <section className="dpt-showcase">
        <div className="dpt-showcase__shell">
          {/* ── Stats Bar ── */}
          <div className="dpt-stats-bar">
            <a
              href="https://www.youtube.com/@dushyantfurnituremartsidhi"
              target="_blank"
              rel="noopener noreferrer"
              className="dpt-stat-item dpt-stat-item--youtube"
            >
              <div className="dpt-stat-icon dpt-stat-icon--yt">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="28"
                  height="28"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div className="dpt-stat-text">
                <span className="dpt-stat-number">250K+</span>
                <span className="dpt-stat-label">Subscriber</span>
              </div>
              <div className="dpt-stat-stars">
                ★★★★★ <small>(4.6/5)</small>
              </div>
            </a>

            <div className="dpt-stat-divider" />

            <a
              href="https://www.google.com/local/place/fid/0x3985bd1ceebf5183:0xa98f65770695586c/photosphere?iu=https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid%3DKkr7gZ2lVoSKiZzqbHSSeQ%26cb_client%3Dsearch.gws-prod.gps%26yaw%3D184.03496%26pitch%3D0%26thumbfov%3D100%26w%3D0%26h%3D0&ik=CAISFktrcjdnWjJsVm9TS2laenFiSFNTZVE%3D&sa=X&ved=2ahUKEwjd95WT8L6WAxV_lOEIHYBtODEQpx96BAgLEBE"
              target="_blank"
              rel="noopener noreferrer"
              className="dpt-stat-item dpt-stat-item--google"
            >
              <div className="dpt-stat-icon dpt-stat-icon--google">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <div className="dpt-stat-text">
                <span className="dpt-stat-number">5000+</span>
                <span className="dpt-stat-label">Reviews</span>
              </div>
              <div className="dpt-stat-stars">
                ★★★★★ <small>(4.6/5)</small>
              </div>
            </a>

            <div className="dpt-stat-divider" />

            <a
              href="https://www.instagram.com/dushyant_power_tools_sidhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="dpt-stat-item dpt-stat-item--insta"
            >
              <div className="dpt-stat-icon dpt-stat-icon--insta">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="28"
                  height="28"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </div>
              <div className="dpt-stat-text">
                <span className="dpt-stat-number">200K+</span>
                <span className="dpt-stat-label">Followers</span>
              </div>
              <div className="dpt-stat-stars">
                ★★★★☆ <small>(4.2/5)</small>
              </div>
            </a>

            <div className="dpt-stat-divider" />

            <a
              href="https://www.instagram.com/dushyant_power_tools_sidhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="dpt-stat-item dpt-stat-item--insta2"
            >
              <div className="dpt-stat-icon dpt-stat-icon--insta">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="28"
                  height="28"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </div>
              <div className="dpt-stat-text">
                <span className="dpt-stat-number">100K+</span>
                <span className="dpt-stat-label">Followers</span>
              </div>
              <div className="dpt-stat-stars">
                ★★★★★ <small>(5/5)</small>
              </div>
            </a>
          </div>

          {/* ── About Our Store ── */}
          <div className="dpt-about-row">
            {/* Shop Photo */}
            <div className="dpt-about-photo">
              <img
                src="/src/assets/logo.png"
                alt="Dushyant Power Tools Store"
              />
              <div className="dpt-about-photo-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="20"
                  height="20"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>Est. 2010</span>
              </div>
            </div>

            {/* About Text */}
            <div className="dpt-about-content">
              <h3>
                About <span>Our Store</span>
              </h3>
              <div className="dpt-about-line" />
              <p>
                Dushyant Power Tools is a trusted and leading power tools and
                hardware store, serving our customers with genuine products and
                reliable service. We offer a wide range of high-quality tools
                for home, workshop and professional use. Our goal is to provide
                the best products, best prices and complete customer
                satisfaction.
              </p>
              <div className="dpt-about-badge">
                <span>★★★★★ </span> Trusted by <strong>50K+</strong> Happy
                Customers
              </div>
            </div>

            {/* Feature Badges */}
            <div className="dpt-about-badges">
              <div className="dpt-about-tag">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e05252"
                  strokeWidth="2"
                  width="20"
                  height="20"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <div>
                  <strong>Customised Products</strong>
                  <span>As per your need</span>
                </div>
              </div>
              <div className="dpt-about-tag">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e05252"
                  strokeWidth="2"
                  width="20"
                  height="20"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  <strong>Buy with Guarantee</strong>
                  <span>100% Genuine Products</span>
                </div>
              </div>
              <div className="dpt-about-tag">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e05252"
                  strokeWidth="2"
                  width="20"
                  height="20"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div>
                  <strong>High Quality at Budget</strong>
                  <span>Best Quality, Best Price</span>
                </div>
              </div>
              <div className="dpt-about-tag">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e05252"
                  strokeWidth="2"
                  width="20"
                  height="20"
                >
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <div>
                  <strong>Doorstep Delivery</strong>
                  <span>Safe &amp; Timely Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Happy Customers Photo Carousel ── */}
          <div className="dpt-happy-section">
            <div className="dpt-happy-header">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="22"
                height="22"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3>
                Happy <span>Customers</span>
              </h3>
              <div className="dpt-happy-badge">50K+ Happy Customer</div>
            </div>
            <div className="dpt-happy-carousel-wrap">
              <button
                className="dpt-carousel-btn dpt-carousel-btn--prev"
                onClick={() =>
                  setCustomerPhotoIdx((p) =>
                    p === 0 ? HAPPY_CUSTOMER_PHOTOS.length - 1 : p - 1,
                  )
                }
                aria-label="Previous"
              >
                &#8249;
              </button>
              <div className="dpt-happy-carousel">
                {HAPPY_CUSTOMER_PHOTOS.map((src, i) => (
                  <div
                    key={i}
                    className={`dpt-happy-photo ${
                      i === customerPhotoIdx
                        ? "dpt-happy-photo--active"
                        : i ===
                            (customerPhotoIdx + 1) %
                              HAPPY_CUSTOMER_PHOTOS.length
                          ? "dpt-happy-photo--next"
                          : i ===
                              (customerPhotoIdx -
                                1 +
                                HAPPY_CUSTOMER_PHOTOS.length) %
                                HAPPY_CUSTOMER_PHOTOS.length
                            ? "dpt-happy-photo--prev"
                            : "dpt-happy-photo--hidden"
                    }`}
                  >
                    <img src={src.image} alt={src.name} />
                  </div>
                ))}
              </div>
              <button
                className="dpt-carousel-btn dpt-carousel-btn--next"
                onClick={() =>
                  setCustomerPhotoIdx(
                    (p) => (p + 1) % HAPPY_CUSTOMER_PHOTOS.length,
                  )
                }
                aria-label="Next"
              >
                &#8250;
              </button>
            </div>
          </div>

          {/* ── Bottom 3-column: Reviews | Videos | Service Info ── */}
          <div className="dpt-bottom-grid">
            {/* Customer Reviews */}
            <div className="dpt-review-card">
              <div className="dpt-card-head">
                <span className="dpt-card-head-icon dpt-card-head-icon--star">
                  ★
                </span>
                <span className="dpt-card-head-title">
                  Customer <span>Reviews</span>
                </span>
                <span className="dpt-card-head-badge">4.8/5</span>
              </div>
              <div className="dpt-review-body">
                <div className="dpt-review-item">
                  <img
                    src={STATIC_REVIEWS[reviewIdx].avatar}
                    alt={STATIC_REVIEWS[reviewIdx].name}
                    className="dpt-review-avatar"
                  />
                  <div className="dpt-review-meta">
                    <span className="dpt-review-name">
                      {STATIC_REVIEWS[reviewIdx].name}{" "}
                      {STATIC_REVIEWS[reviewIdx].verified && (
                        <span className="dpt-review-verified">
                          ✔ Verified Customer
                        </span>
                      )}
                    </span>
                    <div className="dpt-review-stars">
                      {"★".repeat(STATIC_REVIEWS[reviewIdx].rating)}
                    </div>
                    <p>{STATIC_REVIEWS[reviewIdx].text}</p>
                    <span className="dpt-review-time">
                      {STATIC_REVIEWS[reviewIdx].time}
                    </span>
                  </div>
                </div>
                <div className="dpt-review-nav">
                  <button
                    onClick={() =>
                      setReviewIdx((p) =>
                        p === 0 ? STATIC_REVIEWS.length - 1 : p - 1,
                      )
                    }
                    className="dpt-carousel-btn dpt-carousel-btn--sm"
                  >
                    &#8249;
                  </button>
                  <div className="dpt-review-dots">
                    {STATIC_REVIEWS.map((_, i) => (
                      <button
                        key={i}
                        className={`dpt-dot ${i === reviewIdx ? "dpt-dot--active" : ""}`}
                        onClick={() => setReviewIdx(i)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setReviewIdx((p) => (p + 1) % STATIC_REVIEWS.length)
                    }
                    className="dpt-carousel-btn dpt-carousel-btn--sm"
                  >
                    &#8250;
                  </button>
                </div>
                <a
                  href="https://www.google.com/local/place/fid/0x3985bd1ceebf5183:0xa98f65770695586c/photosphere?iu=https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid%3DKkr7gZ2lVoSKiZzqbHSSeQ%26cb_client%3Dsearch.gws-prod.gps%26yaw%3D184.03496%26pitch%3D0%26thumbfov%3D100%26w%3D0%26h%3D0&ik=CAISFktrcjdnWjJsVm9TS2laenFiSFNTZVE%3D&sa=X&ved=2ahUKEwjd95WT8L6WAxV_lOEIHYBtODEQpx96BAgLEBE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dpt-view-all-btn"
                >
                  View All Reviews
                </a>
              </div>
            </div>

            {/* Our Videos */}
            <div className="dpt-video-card">
              <div className="dpt-card-head">
                <span className="dpt-card-head-icon dpt-card-head-icon--yt">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </span>
                <span className="dpt-card-head-title">
                  Our <span>Videos</span>
                </span>
                <a
                  href="https://www.youtube.com/@dushyantfurnituremartsidhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dpt-card-head-badge dpt-card-head-badge--btn"
                >
                  View All Videos
                </a>
              </div>
              <div className="dpt-video-body">
                <div className="dpt-video-thumb-wrap">
                  <button
                    className="dpt-carousel-btn dpt-carousel-btn--sm dpt-carousel-btn--abs-left"
                    onClick={() =>
                      setVideoIdx((p) =>
                        p === 0 ? STATIC_VIDEOS.length - 1 : p - 1,
                      )
                    }
                  >
                    &#8249;
                  </button>
                  <a
                    href={STATIC_VIDEOS[videoIdx].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dpt-video-thumb-link"
                  >
                    <img
                      src={STATIC_VIDEOS[videoIdx].thumb}
                      alt={STATIC_VIDEOS[videoIdx].title}
                      className="dpt-video-thumb"
                    />
                    <div className="dpt-video-play">
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        width="36"
                        height="36"
                      >
                        <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.5)" />
                        <polygon points="10,8 18,12 10,16" fill="white" />
                      </svg>
                    </div>
                    <div className="dpt-video-duration">
                      {STATIC_VIDEOS[videoIdx].duration}
                    </div>
                    <div className="dpt-video-title-overlay">
                      {STATIC_VIDEOS[videoIdx].title}
                    </div>
                  </a>
                  <button
                    className="dpt-carousel-btn dpt-carousel-btn--sm dpt-carousel-btn--abs-right"
                    onClick={() =>
                      setVideoIdx((p) => (p + 1) % STATIC_VIDEOS.length)
                    }
                  >
                    &#8250;
                  </button>
                </div>
                <div
                  className="dpt-review-dots"
                  style={{ justifyContent: "center", marginTop: "8px" }}
                >
                  {STATIC_VIDEOS.map((_, i) => (
                    <button
                      key={i}
                      className={`dpt-dot ${i === videoIdx ? "dpt-dot--active" : ""}`}
                      onClick={() => setVideoIdx(i)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="dpt-service-card">
              <div className="dpt-card-head">
                <span className="dpt-card-head-icon dpt-card-head-icon--service">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="20"
                    height="20"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.04 6.04l1.09-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="dpt-card-head-title">
                  Service <span>Info</span>
                </span>
              </div>
              <div className="dpt-service-items">
                <div className="dpt-service-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e05252"
                    strokeWidth="2"
                    width="22"
                    height="22"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <div>
                    <strong>10AM – 8PM</strong>
                    <span>We are here to assist you</span>
                  </div>
                </div>
                <div className="dpt-service-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e05252"
                    strokeWidth="2"
                    width="22"
                    height="22"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <strong>Online Payment</strong>
                    <span>UPI, Debit/Credit, Net Banking</span>
                  </div>
                </div>
                <div className="dpt-service-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e05252"
                    strokeWidth="2"
                    width="22"
                    height="22"
                  >
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <div>
                    <strong>Fast Delivery</strong>
                    <span>We dispatch as soon as possible</span>
                  </div>
                </div>
                <div className="dpt-service-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e05252"
                    strokeWidth="2"
                    width="22"
                    height="22"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.04 6.04l1.09-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <strong>24/7 Support</strong>
                    <span>Call or WhatsApp anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /dpt-bottom-grid */}
        </div>
        {/* /dpt-showcase__shell */}
      </section>
      {/* /dpt-showcase */}

      {/* Modal */}
      {activeFeature && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              maxWidth: "1100px",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
              animation: "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close & breadcrumb */}
            <div
              style={{
                padding: "20px 28px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={closeModal}
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
                  <X size={20} />
                </button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.85rem",
                    color: "#475569",
                  }}
                >
                  {breadcrumbItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <ChevronRight size={14} color="#94a3b8" />}
                      <span
                        onClick={
                          item.onClick && item.onClick !== closeModal
                            ? item.onClick
                            : undefined
                        }
                        style={{
                          cursor: item.onClick ? "pointer" : "default",
                          fontWeight:
                            idx === breadcrumbItems.length - 1 ? 700 : 400,
                          color:
                            idx === breadcrumbItems.length - 1
                              ? "#0f172a"
                              : "#64748b",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {item.icon && <item.icon size={14} />}
                        {item.label}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#1e293b",
                }}
              >
                Close
              </button>
            </div>

            {/* Main content: sidebar + detail */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
              {/* Left sidebar */}
              <div
                style={{
                  width: "280px",
                  minWidth: "200px",
                  background: "#f8fafc",
                  borderRight: "1px solid #e5e7eb",
                  padding: "20px 0",
                  overflowY: "auto",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    padding: "0 16px 12px",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#64748b",
                  }}
                >
                  {activeFeature.name}
                </div>
                {activeFeature.subTopics.map((st) => {
                  const Icon = st.icon || ChevronRight;
                  const isActive = st.id === activeSubTopicId;
                  return (
                    <div
                      key={st.id}
                      onClick={() => handleSubTopicClick(st.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        background: isActive
                          ? activeFeature.bgColor
                          : "transparent",
                        borderLeft: isActive
                          ? `4px solid ${activeFeature.color}`
                          : "4px solid transparent",
                        transition: "all 0.2s",
                        color: isActive ? activeFeature.color : "#1e293b",
                        fontWeight: isActive ? 600 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          e.currentTarget.style.background = "#f1f5f9";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <Icon size={18} />
                      <span style={{ fontSize: "0.9rem" }}>{st.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Right detail panel */}
              <div
                style={{
                  flex: 1,
                  padding: "24px 28px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {activeSubTopic ? (
                  <>
                    {/* Sub-topic title and description */}
                    <div style={{ marginBottom: "16px" }}>
                      <h3
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 800,
                          color: "#0f172a",
                          marginBottom: "4px",
                        }}
                      >
                        {activeSubTopic.label}
                      </h3>
                      <p style={{ fontSize: "0.95rem", color: "#475569" }}>
                        {activeSubTopic.content.overview
                          ? activeSubTopic.content.overview.substring(0, 100) +
                            "…"
                          : ""}
                      </p>
                    </div>

                    {/* Tabs */}
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        borderBottom: "1px solid #e5e7eb",
                        marginBottom: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      {tabKeys.map((key) => {
                        // Only show tab if content exists for that key
                        const hasContent =
                          activeSubTopic.content[key] &&
                          (Array.isArray(activeSubTopic.content[key])
                            ? activeSubTopic.content[key].length > 0
                            : activeSubTopic.content[key]);
                        if (!hasContent) return null;
                        return (
                          <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            style={{
                              padding: "8px 16px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              fontWeight: activeTab === key ? 700 : 400,
                              color:
                                activeTab === key
                                  ? activeFeature.color
                                  : "#64748b",
                              borderBottom:
                                activeTab === key
                                  ? `3px solid ${activeFeature.color}`
                                  : "3px solid transparent",
                              transition: "all 0.2s",
                              fontSize: "0.85rem",
                              textTransform: "capitalize",
                            }}
                          >
                            {tabLabels[key] || key}
                          </button>
                        );
                      })}
                    </div>

                    {/* Detail content */}
                    <div style={{ flex: 1 }}>{renderDetailContent()}</div>
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "#94a3b8",
                    }}
                  >
                    Select a topic from the left menu.
                  </div>
                )}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px) scale(0.97); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            /* Custom scroll */
            div[style*="overflow"]::-webkit-scrollbar {
              width: 6px;
            }
            div[style*="overflow"]::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 10px;
            }
            div[style*="overflow"]::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 10px;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default WhyChooseUs;
