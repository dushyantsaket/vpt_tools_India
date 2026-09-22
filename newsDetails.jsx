import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, MessageCircle } from "lucide-react";

const fallbackNewsData = [
  {
    id: 1,
    title:
      "TCT Saw Blades Explained: Which Blade Is Right for MDF, Plywood & Hardwood?",
    description:
      "Choosing the right TCT (Tungsten Carbide Tipped) saw blade is important for getting smooth, clean and chip-free cuts on different types of wood. MDF, plywood, and hardwood each require specific tooth counts and geometry for best results.",
    content:
      "Choosing the right TCT (Tungsten Carbide Tipped) saw blade is important for getting smooth, clean and chip-free cuts on different types of wood. MDF, plywood, and hardwood each require specific tooth counts and geometry for best results.\n\nWhen you are selecting a blade for your workshop, match the saw blade to the material and finish you need. A good blade improves accuracy, reduces tear-out, and protects your tool from unnecessary strain.",
    date: "27 Nov, 2025",
    category: "Technical Guide",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/ZV1QxerqMB6cn7lsQD01uThf3WfLpJoD6pHI0XXN.jpg",
    link: "https://www.endicopowertools.com/latest-news/tct-saw-blades-explained-which-blade-is-right-for-mdf-plywood-and-hardwood",
    featured: true,
    brand: "Endico Power Tools",
  },
  {
    id: 2,
    title:
      "Why Endico Power Tools Are Not Expensive — A Real Case Study for Professionals",
    description:
      "When customers compare prices in the Indian power tool market, Endico products may seem slightly more expensive at first glance. But a lifecycle cost analysis reveals a very different story — one of long-term savings.",
    content:
      "When customers compare prices in the Indian power tool market, Endico products may seem slightly more expensive at first glance. For example, an ordinary drill machine may cost around ₹2,000–₹2,500, while a similar Endico model might be priced at ₹3,500–₹4,000. However, the difference of ₹1,000–₹1,500 today can save them ₹10,000 or more over the next 5–10 years.\n\nThis happens because Endico tools are built for longevity. They use heavy-duty components, spare parts are available across dealer networks, and service support continues even after years of use. That means lower ownership cost over time — not just lower purchase price.",
    date: "30 Apr, 2025",
    category: "Industry Insight",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/wOhruz8jB9qZY53Q7pf3mUahAN5ywT0Of84CoFp9.jpg",
    link: "https://www.endicopowertools.com/latest-news/why-endico-power-tools-are-not-expensive-but-actually-cheaper-in-the-long-run-a-real-case-study-for-power-tools-professionals",
    brand: "Endico Power Tools",
  },
  {
    id: 3,
    title:
      "Buy a WoodWorking Router Machine to Match Your Project Requirements",
    description:
      "Modern woodworking projects are complicated and require efficient tools to ensure smooth work. Artisans use sophisticated tools to make precise cuts and joints. Here's how to choose the right router for your projects.",
    content:
      "Modern woodworking projects are complicated and require efficient tools to ensure smooth work. Artisans use sophisticated tools to make precise cuts and joints.\n\nWhen choosing a router, it helps to consider the type of work you will do, whether you need variable speed control, spindle capacity, and how often you will switch between tasks. A machine that matches your project requirements improves output and reduces unnecessary wear.",
    date: "25 Dec, 2024",
    category: "Buying Guide",
    image:
      "https://www.endicopowertools.com/storage/app/public/uploads/FOTrOdrPx5xlYYopqbxdEPM8rkDoJpNlSaOUjj4J.jpg",
    link: "https://www.endicopowertools.com/latest-news/buy-a-woodworking-router-machine-to-match-your-project-requirements",
    brand: "Endico Power Tools",
  },
];

const normalizeNews = (item, index) => {
  const title = item.title || "Untitled News";
  const description =
    item.description ||
    item.summary ||
    item.content ||
    "No description available.";
  const content =
    item.content ||
    item.description ||
    item.summary ||
    "No description available.";
  const category = item.category || item.brand || "General";
  const date =
    item.date ||
    new Date(item.publishDate || item.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return {
    id: String(item.id || `news-${index}`),
    title,
    description,
    content,
    category,
    image:
      item.image ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    link: item.link || item.url || "/latest-news",
    featured: Boolean(item.featured),
    brand: item.brand || "Dushyant Power Tools",
    publishedBy: item.publishedBy || item.brand || "Dushyant Power Tools",
  };
};

const categoryColors = {
  "Technical Guide": "#3b82f6",
  "Industry Insight": "#8b5cf6",
  "Buying Guide": "#f59e0b",
  "New Products": "#10b981",
  Events: "#ec4899",
  Maintenance: "#ef4444",
  "DIY Tutorial": "#f97316",
  Comparison: "#06b6d4",
  General: "#dc2626",
};

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        const res = await fetch("/api/news");
        const payload = await res.json();
        if (!isMounted) return;

        const liveItems = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : [];

        const backup = fallbackNewsData.map(normalizeNews);
        const live = liveItems.map(normalizeNews);
        const merged = [...backup, ...live];
        const unique = new Map();
        merged.forEach((item) => {
          if (!unique.has(item.id)) unique.set(item.id, item);
        });
        setNewsData([...unique.values()]);
      } catch {
        if (isMounted) setNewsData(fallbackNewsData.map(normalizeNews));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const article = useMemo(() => {
    return (
      newsData.find((item) => String(item.id) === String(newsId)) || newsData[0]
    );
  }, [newsData, newsId]);

  const recentUpdates = useMemo(() => {
    return newsData
      .filter((item) => String(item.id) !== String(article?.id))
      .slice(0, 8);
  }, [newsData, article?.id]);

  const formattedLabel = article?.category || "General";
  const detailContent = article?.content || article?.description || "";
  const renderHtml = /<p|<br|<ul|<li|<strong/i.test(detailContent);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-white px-4 py-16 text-center text-slate-500">
        Loading news details...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-24 min-h-screen bg-white px-4 py-16 text-center">
        <h2 className="text-2xl font-black text-slate-900">News not found</h2>
        <Link
          to="/latest-news"
          className="mt-4 inline-block text-red-600 font-bold"
        >
          Back to latest news
        </Link>
      </div>
    );
  }

  return (
    <div
      className="pt-24 min-h-screen bg-white pb-20"
      style={{ paddingTop: "100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/latest-news"
          className="inline-flex items-center gap-2 text-sm font-bold text-red-600 mb-6"
        >
          <ArrowLeft size={16} /> Back to News
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-8">
          <article className="bg-white">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]"
              style={{
                background: `${categoryColors[formattedLabel] || "#dc2626"}22`,
                color: categoryColors[formattedLabel] || "#dc2626",
              }}
            >
              <Tag size={11} /> {formattedLabel}
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-sm text-slate-500 mb-5">
              Published On: {article.date} by{" "}
              <span className="font-bold text-red-600">
                {article.publishedBy}
              </span>
            </p>

            <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50 mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="w-full object-cover"
                style={{ height: "20rem", maxHeight: "29rem" }}
              />
            </div>

            <div className="prose max-w-none text-[15px] leading-8 text-slate-700">
              {renderHtml ? (
                <div dangerouslySetInnerHTML={{ __html: detailContent }} />
              ) : (
                <div className="whitespace-pre-line">{detailContent}</div>
              )}
            </div>
          </article>

          <aside className="xl:sticky xl:top-24 self-start">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">
                Recent Updates
              </h3>
              <div className="space-y-3">
                {recentUpdates.map((item) => (
                  <Link
                    key={item.id}
                    to={`/latest-news/${encodeURIComponent(item.id)}`}
                    className="block rounded-2xl bg-white border border-slate-200 p-3 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg flex-none"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 leading-5 line-clamp-3">
                          {item.title}
                        </h4>
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                          <Calendar size={12} /> {item.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
