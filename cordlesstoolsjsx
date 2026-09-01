import React from 'react';
import { Link } from 'react-router-dom';
import { cordlessData } from '../data/cordlessData';

// Simple grid display for cordless tools
const CordlessTools = () => {
  const items = Array.isArray(cordlessData.products) ? cordlessData.products : [];
  return (
    <section id="cordless-tools" style={{ padding: '40px 0', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>
          Cordless Tools
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {items.map((item, index) => (
            <Link
              key={`${item.productId}-${index}`}
              to={`/product/${item.productId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', padding: '12px' }}>
                <img src={item.image_url || item.image} alt={item.name} style={{ width: '100%', height: '140px', objectFit: 'contain' }} />
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginTop: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>₹{item.min_price?.toLocaleString() ?? ''} - ₹{item.max_price?.toLocaleString() ?? ''}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CordlessTools;
