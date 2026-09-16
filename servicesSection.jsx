import React from 'react';
import { Wrench, ShieldCheck, ChevronRight, Hammer, Clock, Zap, RotateCw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import BrandCollaboration from './BrandCollaboration';

const constructionEquipment = [
  { id: 'vib-850', name: 'Akari 850W Concrete Vibrator 35Mm', type: 'Concrete Vibrator', image: 'https://unboxtools.com/wp-content/uploads/2024/08/850-1-300x300.jpg', url: 'https://unboxtools.com/product/akari-850w-vibrator-35mm-armature/', power: '850W', desc: 'High-frequency internal vibrator for concrete compaction. Ideal for slabs and columns.' },
  { id: 'vib-900', name: 'Akari 900W Concrete Vibrator 35Mm', type: 'Concrete Vibrator', image: 'https://unboxtools.com/wp-content/uploads/2024/12/900W-1-300x300.jpg', url: 'https://unboxtools.com/product/akari-900w-vibrator-35mm-armature/', power: '900W', desc: 'Professional 900W vibrator for consistent concrete densification on construction sites.' },
  { id: 'vib-1400', name: 'Akari 1400W Concrete Vibrator 50Mm', type: 'Concrete Vibrator', image: 'https://unboxtools.com/wp-content/uploads/2024/12/1400W-1-300x300.jpg', url: 'https://unboxtools.com/product/akari-1400w-vibrator-50mm-armature/', power: '1400W', desc: '1400W heavy-duty vibrator with 50mm needle for large pour applications.' },
  { id: 'vib-2200', name: 'Akari 2200W Concrete Vibrator 50Mm', type: 'Concrete Vibrator', image: 'https://unboxtools.com/wp-content/uploads/2024/12/ev2200-1-300x300.jpg', url: 'https://unboxtools.com/product/akari-2200w-vibrator-50mm-armature/', power: '2200W', desc: 'Industrial 2200W vibrator for deep concrete foundation work and retaining walls.' },
  { id: 'vib-frame', name: 'Akari 2400W Frame Vibrator 50Mm', type: 'Frame Vibrator', image: 'https://unboxtools.com/wp-content/uploads/2024/12/Akari-2400W-Frame-Vibrator-50Mm-Armature-1-300x300.png', url: 'https://unboxtools.com/product/akari-2400w-frame-vibrator-50mm-armature/', power: '2400W', desc: 'External frame vibrator designed for precast panels, tunnel linings, and mould vibration.' },
  { id: 'mixer-ff160', name: 'Akari FF160 Paint & Mortar Mixer', type: 'Mixer', image: 'https://unboxtools.com/wp-content/uploads/2024/07/FF160-1-300x300.jpg', url: 'https://unboxtools.com/product/akari-ff160-paint-mixer-armature/', power: 'Electric', desc: 'Heavy-duty electric mixer for paint, plaster, mortar, and adhesive compounds.' }
];

const serviceBrands = [
  { company: 'BSCPOWER', logoText: 'BSC | BSCPOWER | BEST POWER TOOLS' },
  { company: 'KEIL', logoText: 'KEIL | R | Chainsaw' },
  { company: 'BOSCH', logoText: 'BOSCH | Invented for life' },
  { company: 'ROBOT POWER', logoText: 'ROBOT | POWER | Make the World' },
  { company: 'GAOCHENG', logoText: 'GAOCHENG | POWER TOOLS' },
  { company: 'R IDEAL', logoText: 'R ideal | POWERTOOLS' },
  { company: 'ENDICO', logoText: 'ENDICO | POWER TOOLS (INDIA)' },
  { company: 'TOTAL', logoText: 'TOTAL | One-Stop Tools Station' },
  { company: 'HIGGO', logoText: 'HIGGO | Make the World' },
  { company: 'SMART ENGINEERING', logoText: 'SMART ENGINEERING' },
];

const serviceCards = [
  { id: 1, title: 'Tool Sales', icon: Zap, desc: 'Premium industrial equipment procurement with full warranty support.', link: '/products', cta: 'VISIT SALES SHOWROOM' },
  { id: 2, title: 'Strategic Repair', icon: Wrench, desc: 'Expert restoration of professional power tools across all major brands.', link: '/services', cta: 'VIEW SERVICE PROTOCOLS' },
  { id: 3, title: 'Component Replacement', icon: Hammer, desc: 'Original spare parts integration for extended lifespan.', link: '/categories', cta: 'VIEW SERVICE PROTOCOLS' },
];

const trustBadges = [
  { icon: Clock, label: '24-Hour TAT', sub: 'Response Guarantee' },
  { icon: ShieldCheck, label: 'Genuine Parts', sub: '100% Original' },
  { icon: Hammer, label: 'Expert Techs', sub: 'Certified Workforce' },
  { icon: RotateCw, label: 'Service Warranty', sub: 'Post-Repair Support' },
];

const ServicesSection = () => {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '48px 0', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#dc2626', display: 'block', marginBottom: '8px' }}>Service Intelligence</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.04em', marginBottom: '12px' }}>
            We Provide <span style={{ color: '#dc2626' }}>Service For All</span> Major Brands
          </h2>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', maxWidth: '500px', lineHeight: 1.8 }}>
            Our technical command centers are equipped to handle complex repairs and maintenance for industrial-grade armaments.
          </p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dc2626', color: '#fff', padding: '12px 24px', borderRadius: '0', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', marginTop: '16px' }}>
            BOOK SERVICE APPOINTMENT <RotateCw size={14} />
          </Link>
        </div>

        {/* Authorized Brand Grid */}
        <div style={{ background: '#fff', borderRadius: '0', padding: '24px', border: '1px solid #e5e7eb', marginBottom: '40px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>Authorized Support Ecosystem</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
            {serviceBrands.map((brand, idx) => (
              <div key={idx} style={{ background: '#f9fafb', borderRadius: '0', padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '0', background: '#dc2626', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{brand.company}</span>
                </div>
                <span style={{ fontSize: '8px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', paddingLeft: '11px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{brand.logoText}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Collaboration */}
        <div style={{ marginBottom: '40px', borderRadius: '0', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
          <BrandCollaboration />
        </div>

        {/* Service Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {serviceCards.map((card) => (
            <div key={card.id} onClick={() => navigate(card.link)} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0', padding: '28px 24px', cursor: 'pointer', transition: 'box-shadow 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.07)'; e.currentTarget.style.borderColor = '#111'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
            >
              <div style={{ width: '48px', height: '48px', background: '#f3f4f6', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#111' }}>
                <card.icon size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '6px' }}>{card.title}</h3>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', lineHeight: 1.8, marginBottom: '24px', flex: 1 }}>{card.desc}</p>
              <div style={{ background: '#111', color: '#fff', padding: '12px', borderRadius: '0', fontWeight: 800, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                {card.cta} <ChevronRight size={12} />
              </div>
            </div>
          ))}
        </div>

        {/* DEWALT Innovation */}
        <div style={{ background: '#111', borderRadius: '0', overflow: 'hidden', marginBottom: '48px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', padding: 'clamp(32px, 4vw, 56px)' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#dc2626', display: 'block', marginBottom: '16px' }}>Innovation Spotlight</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '16px' }}>
                DEWALT®<br/><span style={{ color: '#dc2626' }}>IMPACT CONNECT™</span>
              </h2>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', lineHeight: 1.8, marginBottom: '24px', maxWidth: '400px' }}>
                Revolutionizing the jobsite with the next generation of power tool connectivity and efficiency. Professional grade solutions for elite craftsmen.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {['High Torque', 'Pro Warranty', 'Global Partnership'].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '0', background: 'rgba(220,38,38,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                      {i === 0 ? <Zap size={14} /> : i === 1 ? <ShieldCheck size={14} /> : <Wrench size={14} />}
                    </div>
                    <span style={{ color: '#fff', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: '1 1 300px', minHeight: '280px', position: 'relative', background: '#222' }}>
              <video style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                src="https://bynder.sbdinc.com/m/41fac8df89bf6894/original/DW_IMPACT-CONNECT-91sec-16x9-EN_VIV1.mp4"
                autoPlay loop muted playsInline />
            </div>
          </div>
        </div>

        {/* DCA Showcase */}
        <div style={{ marginBottom: '48px' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#dc2626', display: 'block', marginBottom: '6px' }}>Global Partnership</span>
          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.04em', marginBottom: '8px' }}>
            Authorized <span style={{ color: '#dc2626' }}>DCA Showcase</span>
          </h3>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: '20px' }}>
            Industry-leading performance powered by Dongcheng engineering. Providing Global Standard solutions for the Indian market.
          </p>
          <div style={{ borderRadius: '0', overflow: 'hidden', position: 'relative', height: '320px', background: '#000', border: '4px solid #f3f4f6' }}>
            <video style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5)' }}
              src="https://dongcheng.obs.ap-southeast-1.myhuaweicloud.com/cms/2024/7/27/1724728225802/DCA网页视频13 8.19.mp4"
              autoPlay loop muted playsInline />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.2rem, 3vw, 2rem)', textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: '6px' }}>Trusted Industrial Partner</h4>
                <p style={{ color: '#dc2626', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>AUTHORIZED DEALER & SERVICE CENTER</p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Catalog */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#dc2626', display: 'block', marginBottom: '6px' }}>Equipment Catalog</span>
              <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.04em' }}>
                Small Construction <span style={{ color: '#dc2626' }}>Equipments</span>
              </h3>
              <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginTop: '4px' }}>Compactors, concrete vibrators, and mixers — built for the site.</p>
            </div>
            <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#dc2626', textDecoration: 'none' }}>
              VIEW ALL EQUIPMENT <ChevronRight size={12} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {constructionEquipment.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
                style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0', overflow: 'hidden', textDecoration: 'none', color: 'inherit', transition: 'box-shadow 0.3s, border-color 0.3s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.07)'; e.currentTarget.style.borderColor = '#dc2626'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                <div style={{ background: '#f9fafb', padding: '16px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <img src={item.image} alt={item.name} style={{ maxHeight: '100%', objectFit: 'contain' }} />
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#111', color: '#fff', fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '3px 8px', borderRadius: '0' }}>{item.type}</span>
                  <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#dc2626', color: '#fff', fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '3px 8px', borderRadius: '0', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Zap size={8} /> {item.power}
                  </span>
                </div>
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '4px', lineHeight: 1.3 }}>{item.name}</h4>
                  <p style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    View Product <ChevronRight size={10} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', opacity: 0.7 }}>
          {trustBadges.map((badge, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
              <badge.icon size={28} style={{ color: '#9ca3af', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111' }}>{badge.label}</p>
                <p style={{ fontSize: '9px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
