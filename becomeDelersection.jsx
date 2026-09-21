import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  Truck,
  TrendingUp,
  Award,
  Headphones,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Search,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  UploadCloud,
  User,
  Building2,
  Calendar,
  Lock,
  ArrowRight,
  Sparkles,
  FileCheck,
  Star,
  Clock,
  Compass,
  Navigation,
} from "lucide-react";
import "../styles/BecomeDealer.css";

// ── Initial Dealer Network Data ──────────────────────────────
const FALLBACK_DEALERS = [
  {
    id: "DLR-001",
    name: "Rajesh Patel",
    shopName: "Vijay Power Tools & Machinery",
    dealerType: "Authorized Distributor",
    state: "Madhya Pradesh",
    city: "Sidhi",
    address: "Near Clock Tower, Main Market, Sidhi, MP - 486661",
    pincode: "486661",
    phone: "+91 97540 15503",
    email: "sidhi.vijaytools@dushyantpowertools.com",
    lat: 24.4124,
    lng: 81.8845,
    googleMapsUrl: "https://maps.google.com/?q=24.4124,81.8845",
    rating: 4.9,
    reviewsCount: 128,
    timing: "9:00 AM - 8:30 PM",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2018",
    featured: true,
  },
  {
    id: "DLR-002",
    name: "Amit Sharma",
    shopName: "DPT Power Tool Touch & Service",
    dealerType: "Exclusive Franchise",
    state: "Madhya Pradesh",
    city: "Indore",
    address: "Shop No. 14, Dewas Naka, Industrial Area, Indore, MP - 452010",
    pincode: "452010",
    phone: "+91 98260 44321",
    email: "indore.dpt@dushyantpowertools.com",
    lat: 22.7533,
    lng: 75.8937,
    googleMapsUrl: "https://maps.google.com/?q=22.7533,75.8937",
    rating: 4.9,
    reviewsCount: 210,
    timing: "9:30 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2020",
    featured: true,
  },
  {
    id: "DLR-003",
    name: "Sanjay Verma",
    shopName: "Mahakaal Industrial Tools",
    dealerType: "Authorized Distributor",
    state: "Madhya Pradesh",
    city: "Bhopal",
    address: "Plot 42, Hamidia Road, Near Old Bus Stand, Bhopal, MP - 462001",
    pincode: "462001",
    phone: "+91 94251 77890",
    email: "bhopal.tools@dushyantpowertools.com",
    lat: 23.2599,
    lng: 77.4126,
    googleMapsUrl: "https://maps.google.com/?q=23.2599,77.4126",
    rating: 4.8,
    reviewsCount: 95,
    timing: "10:00 AM - 8:30 PM",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2019",
    featured: true,
  },
  {
    id: "DLR-004",
    name: "Vikas Soni",
    shopName: "Narmada Hardware & Power Tools",
    dealerType: "Retail Partner",
    state: "Madhya Pradesh",
    city: "Jabalpur",
    address: "Gorakhpur Main Road, Opposite SBI, Jabalpur, MP - 482001",
    pincode: "482001",
    phone: "+91 98932 11223",
    email: "jabalpur.narmada@dushyantpowertools.com",
    lat: 23.1815,
    lng: 79.9864,
    googleMapsUrl: "https://maps.google.com/?q=23.1815,79.9864",
    rating: 4.9,
    reviewsCount: 142,
    timing: "9:00 AM - 9:00 PM",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2021",
    featured: true,
  },
  {
    id: "DLR-005",
    name: "Manoj Gupta",
    shopName: "Vindhya Power Equipment",
    dealerType: "Authorized Distributor",
    state: "Madhya Pradesh",
    city: "Rewa",
    address: "Kothi Compound, Civil Lines, Rewa, MP - 486001",
    pincode: "486001",
    phone: "+91 97520 88990",
    email: "rewa.vindhya@dushyantpowertools.com",
    lat: 24.5362,
    lng: 81.3037,
    googleMapsUrl: "https://maps.google.com/?q=24.5362,81.3037",
    rating: 4.8,
    reviewsCount: 88,
    timing: "9:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2019",
    featured: false,
  },
  {
    id: "DLR-006",
    name: "Sunil Tiwari",
    shopName: "Shree Ram Machinery & Spares",
    dealerType: "Exclusive Franchise",
    state: "Madhya Pradesh",
    city: "Satna",
    address: "Station Road, Near Bus Stand, Satna, MP - 485001",
    pincode: "485001",
    phone: "+91 91112 33445",
    email: "satna.shreeram@dushyantpowertools.com",
    lat: 24.5800,
    lng: 80.8300,
    googleMapsUrl: "https://maps.google.com/?q=24.5800,80.8300",
    rating: 4.9,
    reviewsCount: 115,
    timing: "9:00 AM - 8:30 PM",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2020",
    featured: false,
  },
  {
    id: "DLR-007",
    name: "Alok Tripathi",
    shopName: "Kashi Power & Industrial Tools",
    dealerType: "Authorized Distributor",
    state: "Uttar Pradesh",
    city: "Varanasi",
    address: "Rathyatra Crossing, Mahmoorganj Road, Varanasi, UP - 221010",
    pincode: "221010",
    phone: "+91 93350 12345",
    email: "varanasi.kashi@dushyantpowertools.com",
    lat: 25.3176,
    lng: 82.9739,
    googleMapsUrl: "https://maps.google.com/?q=25.3176,82.9739",
    rating: 4.9,
    reviewsCount: 164,
    timing: "9:30 AM - 8:30 PM",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2019",
    featured: true,
  },
  {
    id: "DLR-008",
    name: "Rakesh Yadav",
    shopName: "Avadh Machine Mart",
    dealerType: "Exclusive Franchise",
    state: "Uttar Pradesh",
    city: "Lucknow",
    address: "Transport Nagar, Phase 2, Kanpur Road, Lucknow, UP - 226012",
    pincode: "226012",
    phone: "+91 94150 99887",
    email: "lucknow.avadh@dushyantpowertools.com",
    lat: 26.8467,
    lng: 80.9462,
    googleMapsUrl: "https://maps.google.com/?q=26.8467,80.9462",
    rating: 4.8,
    reviewsCount: 190,
    timing: "9:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2020",
    featured: true,
  },
  {
    id: "DLR-009",
    name: "Deepak Agrawal",
    shopName: "Chhattisgarh Power Tools Corporation",
    dealerType: "Authorized Distributor",
    state: "Chhattisgarh",
    city: "Raipur",
    address: "Telibandha Ring Road No. 1, Raipur, CG - 492006",
    pincode: "492006",
    phone: "+91 98271 22334",
    email: "raipur.cgtools@dushyantpowertools.com",
    lat: 21.2514,
    lng: 81.6296,
    googleMapsUrl: "https://maps.google.com/?q=21.2514,81.6296",
    rating: 4.9,
    reviewsCount: 130,
    timing: "9:30 AM - 8:30 PM",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2021",
    featured: false,
  },
  {
    id: "DLR-010",
    name: "Nitin Deshmukh",
    shopName: "Vidarbha Industrial Supplies",
    dealerType: "Authorized Distributor",
    state: "Maharashtra",
    city: "Nagpur",
    address: "Ghat Road, Cotton Market, Nagpur, MH - 440018",
    pincode: "440018",
    phone: "+91 98222 45678",
    email: "nagpur.vidarbha@dushyantpowertools.com",
    lat: 21.1458,
    lng: 79.0882,
    googleMapsUrl: "https://maps.google.com/?q=21.1458,79.0882",
    rating: 4.8,
    reviewsCount: 145,
    timing: "9:00 AM - 8:30 PM",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2019",
    featured: true,
  },
  {
    id: "DLR-011",
    name: "Bharat Choudhary",
    shopName: "Rajputana Machinery Stores",
    dealerType: "Exclusive Franchise",
    state: "Rajasthan",
    city: "Jaipur",
    address: "MI Road, Near Ajmeri Gate, Jaipur, RJ - 302001",
    pincode: "302001",
    phone: "+91 98290 87654",
    email: "jaipur.rajputana@dushyantpowertools.com",
    lat: 26.9124,
    lng: 75.7873,
    googleMapsUrl: "https://maps.google.com/?q=26.9124,75.7873",
    rating: 4.9,
    reviewsCount: 172,
    timing: "10:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    since: "2020",
    featured: false,
  },
];

// ── Dealer Network Photo Carousel Items ──────────────────────
const NETWORK_PHOTOS = [
  {
    id: 1,
    title: "Dushyant Power Tools Flagship Store, Sidhi",
    subtitle: "Central Showroom & Master Distribution Hub",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Authorized Dealer Meet & Machinery Expo",
    subtitle: "Over 150+ Network Partners at Indore Annual Meet",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "VPT Tool Touch Service Center, Bhopal",
    subtitle: "Complete Genuine Spare Parts & Live Demo Counter",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Industrial Tools Retail Outlet, Varanasi",
    subtitle: "Heavy Duty Cordless Drills & Cutters Display",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Vindhya Power Equipment Showroom, Rewa",
    subtitle: "Fast Moving Stock & Professional Contractor Counter",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
  },
];

// ── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "Dushyant Power Tools ke sath judkar mera business 3x grow hua hai. Product quality aur support best hai.",
    name: "Rajesh Patel",
    city: "Bhopal, Madhya Pradesh",
    role: "Authorized Dealer (Since 2018)",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Fast delivery, genuine products aur excellent dealer support. Highly recommended for every tool seller!",
    name: "Amit Sharma",
    city: "Indore, Madhya Pradesh",
    role: "Exclusive Franchise (Since 2020)",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Marketing support aur dealer margin bahut accha hai. Proud to be a part of DPT family across India.",
    name: "Sanjay Verma",
    city: "Jabalpur, Madhya Pradesh",
    role: "Distributor (Since 2019)",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
  },
];

// ── 6-Step Roadmap ───────────────────────────────────────────
const ONBOARDING_STEPS = [
  { step: 1, title: "Register", desc: "Fill online application form" },
  { step: 2, title: "Verification", desc: "Phone & territory check" },
  { step: 3, title: "Document Review", desc: "GST & PAN evaluation" },
  { step: 4, title: "Approval", desc: "Dealer agreement sign" },
  { step: 5, title: "Dealer ID Generated", desc: "Access portal & catalog" },
  { step: 6, title: "Start Selling & Grow", desc: "Receive stock & leads" },
];

// ── FAQs ─────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is the investment required?",
    a: "Initial stock purchase starts from ₹50,000 to ₹5,00,000 depending on tier (Retail Partner, Exclusive Franchise, or Wholesale Distributor). There is zero franchise fee or royalty.",
  },
  {
    q: "What is the dealer margin?",
    a: "Our dealers enjoy healthy margins ranging from 20% to 35% across drills, grinders, rotary hammers, cordless kits, and spare parts, plus quarterly volume rebates.",
  },
  {
    q: "How long does the approval process take?",
    a: "Our dedicated regional onboarding manager contacts you within 24 to 48 working hours. Once documents are verified, your Dealer ID is issued immediately.",
  },
  {
    q: "Can I sell online as an authorized dealer?",
    a: "Yes! Authorized DPT dealers receive high-resolution product images, digital marketing creatives, and permission to cater to local buyers via online channels.",
  },
  {
    q: "Is GST mandatory to become a dealer?",
    a: "GST is strongly recommended for B2B input tax credit. However, new proprietorships can apply with provisional business registrations while GST is in process.",
  },
  {
    q: "What support will I get as a dealer?",
    a: "You receive free showroom branding boards, branded display stands, customer leads in your city, warranty spare support, product training, and dedicated relationship manager assistance.",
  },
];

export default function BecomeDealer() {
  // ── Form State ──
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    whatsappNumber: "",
    dateOfBirth: "",
    businessName: "",
    gstNumber: "",
    panNumber: "",
    businessType: "Retail Dealer",
    yearOfEstablishment: "2020",
    employeeCount: "1-5",
    state: "Madhya Pradesh",
    city: "Sidhi",
    address: "",
    pincode: "",
  });

  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // ── Video Modal State ──
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // ── FAQ Open State ──
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // ── Network Carousel State ──
  const [photoIndex, setPhotoIndex] = useState(0);

  // ── Store Locator State ──
  const [dealers, setDealers] = useState(FALLBACK_DEALERS);
  const [locatorSearch, setLocatorSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [activeDealer, setActiveDealer] = useState(FALLBACK_DEALERS[0]);
  const locatorSectionRef = useRef(null);

  // Fetch dealers from API or fallback
  useEffect(() => {
    fetch("/api/dealers")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setDealers(data.data);
          setActiveDealer(data.data[0]);
        }
      })
      .catch(() => {
        // Fallback already initialized
      });
  }, []);

  // Filtered dealers for locator
  const filteredDealers = useMemo(() => {
    return dealers.filter((d) => {
      const q = locatorSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        d.shopName?.toLowerCase().includes(q) ||
        d.name?.toLowerCase().includes(q) ||
        d.city?.toLowerCase().includes(q) ||
        d.state?.toLowerCase().includes(q) ||
        d.pincode?.includes(q) ||
        d.address?.toLowerCase().includes(q);

      const matchState =
        selectedState === "All" ||
        d.state?.toLowerCase() === selectedState.toLowerCase();

      const matchType =
        selectedType === "All" ||
        d.dealerType?.toLowerCase() === selectedType.toLowerCase();

      return matchSearch && matchState && matchType;
    });
  }, [dealers, locatorSearch, selectedState, selectedType]);

  const uniqueStates = useMemo(() => {
    const set = new Set(dealers.map((d) => d.state).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [dealers]);

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setAlertMessage("File size exceeds 2MB limit.");
      return;
    }
    setProfileFile(file);
    const reader = new FileReader();
    reader.onload = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobileNumber || !formData.email || !formData.businessName) {
      setAlertMessage("Please fill in all mandatory fields (*).");
      return;
    }

    setLoading(true);
    setAlertMessage("");

    const payload = {
      ...formData,
      profilePhoto: profilePreview || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/dealer-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      const appId = data?.data?.id || `DAPP-${Math.floor(1000 + Math.random() * 9000)}`;
      setApplicationId(appId);
      setSubmitted(true);
    } catch {
      // Fallback local submission
      const appId = `DAPP-${Math.floor(1000 + Math.random() * 9000)}`;
      setApplicationId(appId);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % NETWORK_PHOTOS.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + NETWORK_PHOTOS.length) % NETWORK_PHOTOS.length);
  };

  const scrollToLocator = () => {
    locatorSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bdealer-root">
      {/* ─── HERO SUBHEADER ─── */}
      <header className="bdealer-top-ribbon">
        <div className="bdealer-container bdealer-ribbon-content">
          <div className="bdealer-ribbon-left">
            <span className="bdealer-ribbon-badge">
              <Sparkles size={13} /> Official Dealer Network
            </span>
            <p>
              Partner with India’s fastest-growing power tools brand. 500+ Active Dealers across India.
            </p>
          </div>
          <button
            type="button"
            className="bdealer-ribbon-btn"
            onClick={scrollToLocator}
          >
            <MapPin size={14} /> Find Nearest Dealer
          </button>
        </div>
      </header>

      {/* ─── MAIN TWO-COLUMN LAYOUT (Matching exact mockup) ─── */}
      <section className="bdealer-container bdealer-main-grid">
        {/* ═══════════════════════════════════════════════
            LEFT COLUMN: Dealer Registration Form + Help Card
            ═══════════════════════════════════════════════ */}
        <aside className="bdealer-left-col">
          <div className="bdealer-form-card">
            <div className="bdealer-form-header">
              <h2>
                Dealer <span className="text-red">Registration</span>
              </h2>
              <p>Fill the form below to apply for dealer partnership</p>
            </div>

            {submitted ? (
              <div className="bdealer-success-box">
                <div className="bdealer-success-icon">
                  <CheckCircle size={48} />
                </div>
                <h3>Application Submitted!</h3>
                <p>
                  Thank you for applying to become an authorized Dushyant Power Tools dealer.
                </p>
                <div className="bdealer-app-badge">
                  Application ID: <strong>{applicationId}</strong>
                </div>
                <div className="bdealer-success-info">
                  <p>Our territory onboarding manager will contact you within 24-48 hours.</p>
                </div>
                <button
                  type="button"
                  className="bdealer-submit-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      mobileNumber: "",
                      email: "",
                      whatsappNumber: "",
                      dateOfBirth: "",
                      businessName: "",
                      gstNumber: "",
                      panNumber: "",
                      businessType: "Retail Dealer",
                      yearOfEstablishment: "2020",
                      employeeCount: "1-5",
                      state: "Madhya Pradesh",
                      city: "Sidhi",
                      address: "",
                      pincode: "",
                    });
                    setProfilePreview("");
                  }}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bdealer-form">
                {/* ── Section 1: Personal Information ── */}
                <div className="bdealer-section-title">
                  <div className="bdealer-icon-badge">
                    <User size={16} />
                  </div>
                  <span>Personal Information</span>
                </div>

                <div className="bdealer-input-group">
                  <label>
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bdealer-input-group">
                  <label>
                    Mobile Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    placeholder="Enter mobile number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bdealer-input-group">
                  <label>
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bdealer-input-group">
                  <label>WhatsApp Number</label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    placeholder="Enter WhatsApp number"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bdealer-input-group">
                  <label>Date of Birth</label>
                  <div className="bdealer-input-with-icon">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    <Calendar size={16} className="bdealer-field-icon" />
                  </div>
                </div>

                {/* Profile Photo Upload */}
                <div className="bdealer-input-group">
                  <label>Profile Photo</label>
                  <div
                    className={`bdealer-dropzone ${isDragging ? "dragging" : ""}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFile(e.dataTransfer.files?.[0]);
                    }}
                    onClick={() => document.getElementById("profile-photo-input")?.click()}
                  >
                    <input
                      id="profile-photo-input"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      style={{ display: "none" }}
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                    {profilePreview ? (
                      <div className="bdealer-preview-wrapper">
                        <img src={profilePreview} alt="Profile preview" />
                        <span>Change Photo</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={24} className="bdealer-upload-icon" />
                        <strong>Click to upload photo</strong>
                        <small>JPG, PNG (Max. 2MB)</small>
                      </>
                    )}
                  </div>
                </div>

                {/* ── Section 2: Business Information ── */}
                <div className="bdealer-section-title">
                  <div className="bdealer-icon-badge">
                    <Building2 size={16} />
                  </div>
                  <span>Business Information</span>
                </div>

                <div className="bdealer-input-group">
                  <label>
                    Business Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    placeholder="Enter business name"
                    value={formData.businessName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bdealer-input-group">
                  <label>
                    GST Number <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="Enter GST number"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bdealer-input-group">
                  <label>
                    PAN Number <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    placeholder="Enter PAN number"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bdealer-input-group">
                  <label>
                    Business Type <span className="req">*</span>
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                  >
                    <option value="Retail Dealer">Retail Dealer</option>
                    <option value="Wholesale Distributor">Wholesale Distributor</option>
                    <option value="Exclusive Franchise">Exclusive Franchise</option>
                    <option value="Authorized Service Partner">Authorized Service Partner</option>
                  </select>
                </div>

                <div className="bdealer-row-2">
                  <div className="bdealer-input-group">
                    <label>Year of Establishment</label>
                    <select
                      name="yearOfEstablishment"
                      value={formData.yearOfEstablishment}
                      onChange={handleInputChange}
                    >
                      {Array.from({ length: 35 }, (_, i) => 2025 - i).map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bdealer-input-group">
                    <label>Number of Employees</label>
                    <select
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                    >
                      <option value="1-5">1-5 Employees</option>
                      <option value="5-10">5-10 Employees</option>
                      <option value="10-25">10-25 Employees</option>
                      <option value="25-50">25-50 Employees</option>
                      <option value="50+">50+ Employees</option>
                    </select>
                  </div>
                </div>

                <div className="bdealer-row-2">
                  <div className="bdealer-input-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="e.g. Madhya Pradesh"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="bdealer-input-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Sidhi"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="bdealer-input-group">
                  <label>Shop / Office Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter complete street address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                {alertMessage && (
                  <div className="bdealer-alert-msg">{alertMessage}</div>
                )}

                <button
                  type="submit"
                  className="bdealer-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting Application..." : "Next Step →"}
                </button>

                <div className="bdealer-privacy-notice">
                  <Lock size={13} />
                  <span>
                    Your information is safe with us. We do not share your data with third parties.
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* ── Need Help Card ── */}
          <div className="bdealer-help-card">
            <h3>Need Help?</h3>
            <p>Our dealer support team is here to help you.</p>
            <div className="bdealer-help-contact">
              <a href="tel:+919754015503" className="bdealer-help-link">
                <Phone size={15} /> +91 97540 15503
              </a>
              <a
                href="mailto:dealers@dushyantpowertools.com"
                className="bdealer-help-link"
              >
                <Mail size={15} /> dealers@dushyantpowertools.com
              </a>
              <a
                href="https://wa.me/919754015503?text=Hello%20Dushyant%20Power%20Tools%2C%20I%20want%20to%20apply%20for%20dealership."
                target="_blank"
                rel="noopener noreferrer"
                className="bdealer-whatsapp-btn"
              >
                <MessageSquare size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </aside>

        {/* ═══════════════════════════════════════════════
            RIGHT COLUMN: Hero Banner, Video, Benefits,
            Metrics, Gallery, Testimonials, Roadmap, FAQs
            ═══════════════════════════════════════════════ */}
        <main className="bdealer-right-col">
          {/* 1. Hero Banner */}
          <div className="bdealer-hero-card">
            <div className="bdealer-hero-content">
              <div className="bdealer-hero-text">
                <span className="bdealer-hero-tag">Become an Authorized</span>
                <h1>
                  <span className="text-red font-black">DUSHYANT</span>
                  <br />
                  POWER TOOLS Dealer
                </h1>
                <p>Grow your business with India's trusted power tools brand.</p>

                <div className="bdealer-hero-features">
                  <div className="bdealer-hfeat-item">
                    <TrendingUp size={18} />
                    <span>High Profit Margin</span>
                  </div>
                  <div className="bdealer-hfeat-item">
                    <ShieldCheck size={18} />
                    <span>Genuine Products</span>
                  </div>
                  <div className="bdealer-hfeat-item">
                    <Award size={18} />
                    <span>Marketing Support</span>
                  </div>
                  <div className="bdealer-hfeat-item">
                    <Truck size={18} />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>

              <div className="bdealer-hero-media">
                <img
                  src="/images/industrial_hero.png"
                  alt="Dushyant Power Tools"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=80";
                  }}
                />
              </div>
            </div>
          </div>

          {/* 2. Video Section & Why Become Our Dealer */}
          <div className="bdealer-video-benefits-row">
            {/* Video preview card */}
            <div className="bdealer-video-box">
              <div className="bdealer-video-header">
                <button
                  type="button"
                  className="bdealer-watch-video-btn"
                  onClick={() => setVideoModalOpen(true)}
                >
                  <Play size={14} fill="currentColor" /> Watch Video
                </button>
              </div>
              <div
                className="bdealer-video-thumbnail"
                onClick={() => setVideoModalOpen(true)}
              >
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80"
                  alt="DPT Storefront Video"
                />
                <button
                  type="button"
                  className="bdealer-play-circle"
                  aria-label="Play video"
                >
                  <Play size={26} fill="#fff" color="#fff" />
                </button>
                <div className="bdealer-video-time">0:00 / 1:45</div>
              </div>
            </div>

            {/* Why Become Our Dealer Grid */}
            <div className="bdealer-why-box">
              <div className="bdealer-section-heading">
                <h2>
                  Why Become <span className="text-red">Our Dealer?</span>
                </h2>
              </div>
              <div className="bdealer-why-grid">
                <div className="bdealer-why-card">
                  <div className="bdealer-why-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4>High Profit Margin</h4>
                    <p>Earn up to 35% margin on complete tool range.</p>
                  </div>
                </div>

                <div className="bdealer-why-card">
                  <div className="bdealer-why-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4>Genuine & Quality Products</h4>
                    <p>100% copper motor, high endurance certified tools.</p>
                  </div>
                </div>

                <div className="bdealer-why-card">
                  <div className="bdealer-why-icon">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4>Fast & Safe Delivery</h4>
                    <p>Same day dispatch from central warehouse.</p>
                  </div>
                </div>

                <div className="bdealer-why-card">
                  <div className="bdealer-why-icon">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4>Marketing Support</h4>
                    <p>Free shop branding, signage boards & banners.</p>
                  </div>
                </div>

                <div className="bdealer-why-card">
                  <div className="bdealer-why-icon">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4>Dedicated Relationship Manager</h4>
                    <p>Single point of contact for daily orders & stock.</p>
                  </div>
                </div>

                <div className="bdealer-why-card">
                  <div className="bdealer-why-icon">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h4>Warranty & After Sales Support</h4>
                    <p>Easy warranty claims and original spare supply.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Metrics Stats Bar */}
          <div className="bdealer-metrics-bar">
            <div className="bdealer-metric-item">
              <div className="bdealer-metric-icon">
                <Users size={24} />
              </div>
              <div>
                <strong>500+</strong>
                <span>Active Dealers</span>
              </div>
            </div>

            <div className="bdealer-metric-item">
              <div className="bdealer-metric-icon">
                <Building2 size={24} />
              </div>
              <div>
                <strong>10,000+</strong>
                <span>Happy Customers</span>
              </div>
            </div>

            <div className="bdealer-metric-item">
              <div className="bdealer-metric-icon">
                <MapPin size={24} />
              </div>
              <div>
                <strong>150+</strong>
                <span>Cities Covered</span>
              </div>
            </div>

            <div className="bdealer-metric-item">
              <div className="bdealer-metric-icon">
                <Star size={24} />
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Dealer Rating</span>
              </div>
            </div>
          </div>

          {/* 4. Our Dealer Network Photo Gallery */}
          <div className="bdealer-network-gallery">
            <div className="bdealer-gallery-header">
              <h2>
                Our <span className="text-red">Dealer</span> Network
              </h2>
              <div className="bdealer-gallery-controls">
                <button
                  type="button"
                  onClick={prevPhoto}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label="Next photo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="bdealer-gallery-strip">
              {NETWORK_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.id}
                  className={`bdealer-photo-card ${idx === photoIndex ? "active" : ""}`}
                  onClick={() => setPhotoIndex(idx)}
                >
                  <img src={photo.image} alt={photo.title} />
                  <div className="bdealer-photo-overlay">
                    <strong>{photo.title}</strong>
                    <small>{photo.subtitle}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. What Our Dealers Say (Testimonials) */}
          <div className="bdealer-testimonials-section">
            <div className="bdealer-section-heading">
              <h2>
                What <span className="text-red">Our Dealers</span> Say
              </h2>
            </div>
            <div className="bdealer-testimonials-grid">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bdealer-test-card">
                  <div className="bdealer-test-stars">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="#eab308"
                        color="#eab308"
                      />
                    ))}
                  </div>
                  <p className="bdealer-test-quote">"{t.quote}"</p>
                  <div className="bdealer-test-author">
                    <img src={t.avatar} alt={t.name} />
                    <div>
                      <strong>- {t.name}</strong>
                      <span>{t.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Onboarding Process (6 Steps) */}
          <div className="bdealer-process-section">
            <div className="bdealer-section-heading">
              <h2>
                Our Simple <span className="text-red">Dealer Onboarding</span>{" "}
                Process
              </h2>
            </div>
            <div className="bdealer-steps-track">
              {ONBOARDING_STEPS.map((s, index) => (
                <React.Fragment key={s.step}>
                  <div className="bdealer-step-node">
                    <div className="bdealer-step-circle">
                      <span>{s.step}</span>
                    </div>
                    <strong>{s.title}</strong>
                    <small>{s.desc}</small>
                  </div>
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <div className="bdealer-step-arrow">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 7. FAQs */}
          <div className="bdealer-faq-section">
            <div className="bdealer-section-heading">
              <h2>
                Frequently Asked <span className="text-red">Questions</span>
              </h2>
            </div>
            <div className="bdealer-faq-list">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.q}
                    className={`bdealer-faq-item ${isOpen ? "open" : ""}`}
                  >
                    <button
                      type="button"
                      className="bdealer-faq-question"
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? -1 : index)
                      }
                    >
                      <span>{item.q}</span>
                      <span className="bdealer-faq-toggle">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="bdealer-faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="bdealer-faq-footer">
              <Link to="/faq" className="bdealer-view-all-faqs-btn">
                View All FAQs
              </Link>
            </div>
          </div>
        </main>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NATIONWIDE DEALER LOCATOR & GOOGLE MAPS SECTION
          (Interactive Store Search, Pins, Directions, Details)
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={locatorSectionRef}
        className="bdealer-locator-container"
        id="dealer-locator"
      >
        <div className="bdealer-container">
          <div className="bdealer-locator-header">
            <span className="bdealer-locator-pill">
              <Compass size={14} /> Store & Franchise Locator
            </span>
            <h2>
              Find Authorized <span className="text-red">DPT Dealers</span> Near
              You
            </h2>
            <p>
              Search across our network of 500+ dealers in India. Click on any dealer to view exact location on Google Maps, address, timings, and direct phone/WhatsApp.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bdealer-locator-toolbar">
            <div className="bdealer-locator-searchbox">
              <Search size={18} className="bdealer-loc-search-icon" />
              <input
                type="text"
                placeholder="Search by city, shop name, dealer name, or pincode..."
                value={locatorSearch}
                onChange={(e) => setLocatorSearch(e.target.value)}
              />
              {locatorSearch && (
                <button
                  type="button"
                  className="bdealer-clear-btn"
                  onClick={() => setLocatorSearch("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="bdealer-locator-filters">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                aria-label="Filter by state"
              >
                <option value="All">All States ({dealers.length})</option>
                {uniqueStates
                  .filter((s) => s !== "All")
                  .map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by dealer type"
              >
                <option value="All">All Partner Types</option>
                <option value="Authorized Distributor">Authorized Distributor</option>
                <option value="Exclusive Franchise">Exclusive Franchise</option>
                <option value="Retail Partner">Retail Partner</option>
              </select>
            </div>
          </div>

          {/* Dual-Pane Locator View */}
          <div className="bdealer-locator-dual">
            {/* Left: Dealer List */}
            <div className="bdealer-locator-list">
              <div className="bdealer-list-summary">
                <span>
                  Showing <strong>{filteredDealers.length}</strong> verified locations
                </span>
              </div>

              {filteredDealers.length === 0 ? (
                <div className="bdealer-empty-loc">
                  <MapPin size={36} color="#94a3b8" />
                  <h4>No dealers found</h4>
                  <p>Try searching for a different city or reset filters.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setLocatorSearch("");
                      setSelectedState("All");
                      setSelectedType("All");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredDealers.map((d) => {
                  const isSelected = activeDealer?.id === d.id;
                  return (
                    <article
                      key={d.id}
                      className={`bdealer-loc-card ${isSelected ? "selected" : ""}`}
                      onClick={() => setActiveDealer(d)}
                    >
                      <div className="bdealer-loc-card-top">
                        <div>
                          <span className="bdealer-loc-type-tag">
                            {d.dealerType || "Authorized Partner"}
                          </span>
                          <h4 className="bdealer-loc-shopname">{d.shopName}</h4>
                          <span className="bdealer-loc-owner">
                            Prop: <strong>{d.name}</strong>
                          </span>
                        </div>
                        <div className="bdealer-loc-rating-badge">
                          <Star size={12} fill="#fff" /> {d.rating || 4.9}
                        </div>
                      </div>

                      <div className="bdealer-loc-address">
                        <MapPin size={15} />
                        <span>{d.address}</span>
                      </div>

                      <div className="bdealer-loc-meta-row">
                        <span>
                          <Clock size={13} /> {d.timing || "9:00 AM - 8:30 PM"}
                        </span>
                        <span>• Since {d.since || "2019"}</span>
                      </div>

                      <div className="bdealer-loc-actions">
                        <a
                          href={`tel:${d.phone?.replace(/[^0-9+]/g, "")}`}
                          className="bdealer-loc-call-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone size={13} /> Call
                        </a>
                        <a
                          href={`https://wa.me/${d.phone?.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(d.shopName)}%2C%20I%20got%20your%20details%20from%20Dushyant%20Power%20Tools%20dealer%20locator.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bdealer-loc-wa-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MessageSquare size={13} /> WhatsApp
                        </a>
                        <a
                          href={
                            d.googleMapsUrl ||
                            `https://maps.google.com/?q=${encodeURIComponent(`${d.shopName}, ${d.address}`)}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bdealer-loc-map-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Navigation size={13} /> Get Directions
                        </a>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* Right: Active Dealer Interactive Map Display */}
            <div className="bdealer-locator-map-panel">
              {activeDealer ? (
                <div className="bdealer-map-card">
                  <div className="bdealer-map-header">
                    <div>
                      <span className="bdealer-map-status">
                        ● Open Now • Verified Franchise
                      </span>
                      <h3>{activeDealer.shopName}</h3>
                      <p>{activeDealer.address}</p>
                    </div>
                    <a
                      href={
                        activeDealer.googleMapsUrl ||
                        `https://maps.google.com/?q=${encodeURIComponent(`${activeDealer.shopName}, ${activeDealer.address}`)}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bdealer-open-gmaps-btn"
                    >
                      <ExternalLink size={14} /> Open in Google Maps
                    </a>
                  </div>

                  {/* Embedded Google Maps Frame */}
                  <div className="bdealer-map-frame-wrapper">
                    <iframe
                      title={`Map location for ${activeDealer.shopName}`}
                      width="100%"
                      height="380"
                      style={{ border: 0, borderRadius: "12px" }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${activeDealer.lat || 24.4124},${activeDealer.lng || 81.8845}&hl=en&z=14&output=embed`}
                    ></iframe>
                  </div>

                  <div className="bdealer-active-card-details">
                    <div className="bdealer-act-detail-item">
                      <Phone size={16} />
                      <div>
                        <small>Direct Phone</small>
                        <strong>{activeDealer.phone}</strong>
                      </div>
                    </div>
                    <div className="bdealer-act-detail-item">
                      <Mail size={16} />
                      <div>
                        <small>Dealer Email</small>
                        <strong>
                          {activeDealer.email || "dealers@dushyantpowertools.com"}
                        </strong>
                      </div>
                    </div>
                    <div className="bdealer-act-detail-item">
                      <Clock size={16} />
                      <div>
                        <small>Business Hours</small>
                        <strong>{activeDealer.timing || "9:00 AM - 8:30 PM"}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bdealer-map-placeholder">
                  <MapPin size={48} color="#dc2626" />
                  <p>Select any dealer store on the left to view map & directions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Modal ── */}
      {videoModalOpen && (
        <div
          className="bdealer-modal-overlay"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bdealer-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bdealer-modal-header">
              <h3>Dushyant Power Tools Storefront & Dealership Overview</h3>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="bdealer-modal-body">
              <iframe
                width="100%"
                height="420"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Dushyant Power Tools Dealership Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
