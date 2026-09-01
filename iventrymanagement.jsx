import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Package, AlertTriangle, CheckCircle, Plus, Trash2, Edit3,
  Search, TrendingUp, Users, RefreshCw, Eye, EyeOff, Bell
} from 'lucide-react';
import AdminProductForm from './AdminProductForm';

const API = '/api';

const stockBadge = (status) => {
  const map = {
    'In Stock':     { bg: '#f0fdf4', color: '#16a34a', text: 'In Stock' },
    'Low Stock':    { bg: '#fffbeb', color: '#d97706', text: 'Low Stock ⚠️' },
    'Out of Stock': { bg: '#fef2f2', color: '#dc2626', text: 'Out of Stock' },
  };
  const s = map[status] || map['In Stock'];
  return (
    <span style={{
      fontSize: '9px', fontWeight: 900, padding: '3px 8px',
      borderRadius: '4px', background: s.bg, color: s.color,
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>{s.text}</span>
  );
};

const card = { background: '#fff', borderRadius: '12px', border: '1px solid #f0f0f0', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' };

export default function InventoryManager() {
  const token = localStorage.getItem('adminToken');

  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [search,    setSearch]    = useState('');
  const [category,  setCategory]  = useState('All');
  const [showForm,  setShowForm]  = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [toast,     setToast]     = useState('');
  const [lowAlert,  setLowAlert]  = useState([]);

  /* ── Fetch products ─────────────────────────────────────────────── */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/products?limit=200`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const list = data.products || data;
      setProducts(Array.isArray(list) ? list : []);
      // collect low-stock for notification
      setLowAlert((Array.isArray(list) ? list : []).filter(p => p.stock_quantity < 5 && p.isActive));
    } catch {
      setError('Failed to load products. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  /* ── Toast helper ───────────────────────────────────────────────── */
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  /* ── Stats ─────────────────────────────────────────────────────── */
  const stats = useMemo(() => ({
    total:    products.length,
    inStock:  products.filter(p => p.stockStatus === 'In Stock').length,
    lowStock: products.filter(p => p.stockStatus === 'Low Stock').length,
    outStock: products.filter(p => p.stockStatus === 'Out of Stock').length,
    totalSold: products.reduce((s, p) => s + (p.sold_quantity || 0), 0),
  }), [products]);

  /* ── Filters ────────────────────────────────────────────────────── */
  const categories = useMemo(() =>
    ['All', ...new Set(products.map(p => p.category).filter(Boolean))],
    [products]);

  const filtered = useMemo(() =>
    products.filter(p => {
      const matchCat = category === 'All' || p.category === category;
      const matchSrc = !search || p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSrc;
    }),
    [products, category, search]);

  /* ── Delete ─────────────────────────────────────────────────────── */
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await fetch(`${API}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
      showToast(`✅ "${name}" deleted successfully`);
    } catch {
      showToast('❌ Delete failed. Try again.');
    }
  };

  /* ── Toggle active ──────────────────────────────────────────────── */
  const handleToggle = async (id) => {
    try {
      const res = await fetch(`${API}/products/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(prev => prev.map(p => p._id === id ? { ...p, isActive: data.isActive } : p));
      showToast(`Product ${data.isActive ? 'activated' : 'hidden'} on homepage`);
    } catch {
      showToast('❌ Toggle failed.');
    }
  };

  /* ── Form success callback ─────────────────────────────────────── */
  const handleFormSuccess = (product, action) => {
    if (action === 'added') {
      setProducts(prev => [product, ...prev]);
    } else {
      setProducts(prev => prev.map(p => p._id === product._id ? product : p));
    }
    setShowForm(false);
    setEditing(null);
    showToast(`✅ Product "${product.name}" ${action} — live on homepage!`);
    // Refresh low-alert
    setLowAlert(prev => {
      const next = products.filter(p => p.stock_quantity < 5 && p.isActive);
      return next;
    });
  };

  return (
    <div style={{ color: '#111', position: 'relative' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999,
          background: '#111', color: '#fff', padding: '14px 20px',
          borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          fontSize: '12px', fontWeight: 700, borderLeft: '4px solid #dc2626',
          maxWidth: '340px',
        }}>
          {toast}
        </div>
      )}

      {/* Low-stock notification banner */}
      {lowAlert.length > 0 && (
        <div style={{
          background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px',
          padding: '14px 18px', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <Bell size={18} color="#d97706" />
          <div>
            <p style={{ fontSize: '12px', fontWeight: 900, color: '#92400e', margin: 0 }}>
              ⚠️ {lowAlert.length} product{lowAlert.length > 1 ? 's' : ''} low on stock!
            </p>
            <p style={{ fontSize: '11px', color: '#b45309', margin: '2px 0 0', fontWeight: 600 }}>
              {lowAlert.map(p => `${p.name} (${p.stock_quantity} left)`).join(' • ')}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Total Products', val: stats.total,    icon: Package,      color: '#111' },
          { label: 'In Stock',       val: stats.inStock,  icon: CheckCircle,  color: '#16a34a' },
          { label: 'Low Stock',      val: stats.lowStock, icon: AlertTriangle, color: '#d97706' },
          { label: 'Out of Stock',   val: stats.outStock, icon: AlertTriangle, color: '#dc2626' },
          { label: 'Units Sold',     val: stats.totalSold,icon: TrendingUp,   color: '#3b82f6' },
        ].map((s, i) => (
          <div key={i} style={{ ...card, display: 'flex', alignItems: 'center', gap: '14px', padding: '16px' }}>
            <div style={{ width: '40px', height: '40px', background: `${s.color}15`, color: s.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={18} />
            </div>
            <div>
              <p style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', color: '#9ca3af', margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: '22px', fontWeight: 900, color: '#111', margin: '2px 0 0' }}>{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>

        {/* Sidebar categories */}
        <aside style={{ width: '200px', flexShrink: 0 }}>
          <div style={{ ...card, padding: '16px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', color: '#6b7280' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '9px 12px',
                    fontSize: '10px', fontWeight: 800, textTransform: 'uppercase',
                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                    background: category === cat ? '#111' : 'transparent',
                    color: category === cat ? '#fff' : '#6b7280', transition: 'all 0.15s',
                  }}>
                  {cat.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0 12px', height: '42px', flex: 1, maxWidth: '360px' }}>
              <Search size={16} color="#9ca3af" />
              <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ background: 'none', border: 'none', outline: 'none', padding: '0 10px', fontSize: '13px', width: '100%', fontWeight: 600 }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={fetchProducts}
                style={{ height: '42px', padding: '0 14px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: '#6b7280' }}>
                <RefreshCw size={14} /> Refresh
              </button>
              <button onClick={() => { setEditing(null); setShowForm(true); }}
                style={{ height: '42px', padding: '0 20px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={16} /> Add Product
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px', color: '#dc2626', fontSize: '12px', fontWeight: 700 }}>
              ⚠️ {error}
            </div>
          )}

          {/* Table */}
          <div style={{ ...card, padding: 0, overflowX: 'auto' }}>
            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#9ca3af', fontSize: '13px', fontWeight: 700 }}>
                Loading products...
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <Package size={48} color="#e5e7eb" style={{ marginBottom: '12px' }} />
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#9ca3af' }}>No products found. Add your first product!</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '750px' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f0f0f0' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Status', 'Visible', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: h === 'Actions' ? 'right' : 'left', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p._id} style={{ borderBottom: '1px solid #f9fafb', opacity: p.isActive ? 1 : 0.5, transition: 'opacity 0.2s' }}>
                      {/* Product */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '8px', border: '1px solid #f0f0f0', overflow: 'hidden', background: '#f9fafb', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {p.image
                              ? <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : <Package size={20} color="#d1d5db" />}
                          </div>
                          <div>
                            <p style={{ fontSize: '12px', fontWeight: 800, color: '#111', margin: 0, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                            <p style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 700, margin: '2px 0 0' }}>{p.brand}</p>
                          </div>
                        </div>
                      </td>
                      {/* Category */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '9px', fontWeight: 900, padding: '3px 8px', background: '#f3f4f6', borderRadius: '4px', textTransform: 'uppercase', color: '#6b7280' }}>
                          {(p.category || '').replace(/-/g, ' ')}
                        </span>
                      </td>
                      {/* Price */}
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <p style={{ fontSize: '13px', fontWeight: 900, color: '#111', margin: 0 }}>₹{(p.price_inr || 0).toLocaleString('en-IN')}</p>
                        {p.mrp_inr > p.price_inr && (
                          <p style={{ fontSize: '9px', color: '#9ca3af', textDecoration: 'line-through', margin: '1px 0 0' }}>₹{p.mrp_inr.toLocaleString('en-IN')}</p>
                        )}
                      </td>
                      {/* Stock qty */}
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ fontSize: '14px', fontWeight: 900, color: p.stock_quantity < 5 ? '#dc2626' : '#111', margin: 0 }}>{p.stock_quantity}</p>
                        <p style={{ fontSize: '9px', color: '#9ca3af', margin: '1px 0 0', fontWeight: 600 }}>units</p>
                      </td>
                      {/* Stock status badge */}
                      <td style={{ padding: '14px 16px' }}>{stockBadge(p.stockStatus || 'In Stock')}</td>
                      {/* Visible toggle */}
                      <td style={{ padding: '14px 16px' }}>
                        <button onClick={() => handleToggle(p._id)}
                          title={p.isActive ? 'Visible on homepage – click to hide' : 'Hidden – click to show'}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: p.isActive ? '#16a34a' : '#d1d5db', display: 'flex' }}>
                          {p.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button onClick={() => { setEditing(p); setShowForm(true); }}
                            style={{ padding: '7px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', color: '#374151', display: 'flex' }}>
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => handleDelete(p._id, p.name)}
                            style={{ padding: '7px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', cursor: 'pointer', color: '#dc2626', display: 'flex' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginTop: '12px', textAlign: 'right' }}>
            Showing {filtered.length} of {products.length} products
          </p>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <AdminProductForm
          editProduct={editing}
          token={token}
          onSuccess={handleFormSuccess}
          onClose={() => { setShowForm(false); setEditing(null); }}
        />
      )}
    </div>
  );
}
