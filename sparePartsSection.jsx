import React from 'react';
import { Settings, Hammer, Scissors, Zap, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const spareParts = [
  { id: 'grinder', name: 'Grinder Spare Parts',       count: 120, icon: Settings, accent: '#2563eb' },
  { id: 'hammer',  name: 'Demolition Hammer Spare',   count: 85,  icon: Hammer,   accent: '#dc2626' },
  { id: 'cutter',  name: 'Cutter Spare Parts',         count: 64,  icon: Scissors, accent: '#16a34a' },
  { id: 'welding', name: 'Welding Machine Spare',      count: 42,  icon: Zap,      accent: '#d97706' },
];

const SparePartsSection = () => {
  return (
    <section style={{ padding: '56px 0', background: '#f9fafb', borderTop: '1px solid #f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#dc2626', display: 'block', marginBottom: '8px' }}>
            Component Ecosystem
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.03em', margin: 0 }}>
            Spare Parts <span style={{ color: '#dc2626' }}>Range</span>
          </h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px', maxWidth: '480px', lineHeight: 1.6 }}>
            Original components for all major brands — ensuring maximum tool lifespan.
          </p>
        </div>

        {/* Category Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '36px' }}>
          {spareParts.map((part) => {
            const Icon = part.icon;
            return (
              <Link
                key={part.id}
                to={`/spare-parts/${part.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0',
                    padding: '22px 20px',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.22s, border-color 0.22s, transform 0.22s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = part.accent;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '44px', height: '44px',
                    background: `${part.accent}12`,
                    borderRadius: '0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: part.accent,
                    marginBottom: '16px',
                  }}>
                    <Icon size={20} />
                  </div>

                  {/* Name */}
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '4px' }}>
                    {part.name}
                  </h3>

                  {/* Count */}
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                    {part.count}+ Original SKU Assets
                  </p>

                  {/* CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: part.accent, fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Explore Range <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div style={{ background: '#111', borderRadius: '0', padding: '24px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
              <Package size={22} />
            </div>
            <p style={{ fontSize: '15px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
              Seeking a specific component?{' '}
              <span style={{ color: '#dc2626' }}>Connect with our support desk</span>
            </p>
          </div>
          <Link
            to="/contact"
            style={{ background: '#fff', color: '#111', padding: '12px 22px', borderRadius: '0', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
          >
            Get Support <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SparePartsSection;
