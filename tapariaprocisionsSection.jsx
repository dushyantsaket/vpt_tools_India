import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Wrench } from 'lucide-react';
import ToolImage from './ToolImage';

const TapariaPrecisionSeries = () => {
  const [activeTab, setActiveTab] = useState('first');
  const [openItems, setOpenItems] = useState({ first: true });

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const productData = [
    {
      id: 'first',
      name: 'Pipe Wrench (Stillson Type)',
      conformity: 'Generally Conforming to IS 4003 (I) 1978',
      description: 'Used for heavy duty applications. Jaws are drop forged from high grade carbon steel. Precision machined integral teeth.',
      specs: [
        { prodNo: '1272', d: '33', t: '15', l: '250', wt: '500' },
        { prodNo: '1273', d: '42', t: '19', l: '300', wt: '750' },
        { prodNo: '1274', d: '48', t: '21', l: '350', wt: '1000' },
        { prodNo: '1275', d: '60', t: '24', l: '450', wt: '1540' },
        { prodNo: '1276', d: '73', t: '28', l: '600', wt: '2920' },
        { prodNo: '1277', d: '90', t: '34', l: '900', wt: '5880' },
      ],
      columns: ['PROD. NO.', 'D', 'T', 'L', 'WT. GMS'],
    },
    {
      id: 'second',
      name: 'Universal Pipe Wrench',
      conformity: '-',
      description: 'Precision machined jaw teeth with appropriate teeth angle enables positive grip on the job.',
      specs: [
        { prodNo: '1510', a: '38', b: '17', c: '275', d: '310', wt: '690' },
        { prodNo: '2014', a: '52', b: '21', c: '360', d: '420', wt: '1244' },
      ],
      columns: ['PROD. NO.', 'A', 'B', 'C', 'D', 'WT. GMS'],
    },
    {
      id: 'third',
      name: 'Heavy Duty Pipe Wrench',
      conformity: 'Generally Conforming to IS 4003 Part II 1986',
      description: 'Drop forged from Chrome Molybdenum (Cr Mo) Steel. Handle made from ductile cast iron which enables higher torque values.',
      specs: [
        { prodNo: 'HPW 08', nom: '35', t: '15', l: '200', wt: '4200' },
        { prodNo: 'HPW 10', nom: '49', t: '17', l: '250', wt: '850' },
        { prodNo: 'HPW 12', nom: '60', t: '23', l: '300', wt: '1100' },
        { prodNo: 'HPW 36', nom: '140', t: '37', l: '900', wt: '8800' },
      ],
      columns: ['PROD. NO.', 'NOM. PIPE', 'T', 'L', 'WT. GMS']
    },
    {
      id: 'fourth',
      name: 'Aluminium Handle Pipe Wrench',
      conformity: 'Generally Conforming to IS 4003 Part II 1986',
      description: 'Handle made from special grade Aluminium Alloy which reduces weight by upto 40%.',
      specs: [
        { prodNo: 'APW 10', nom: '49', t: '17', l: '250', wt: '600' },
        { prodNo: 'APW 14', nom: '60', t: '23', l: '350', wt: '1000' },
        { prodNo: 'APW 48', nom: '166', t: '37', l: '1200', wt: '7700' },
      ],
      columns: ['PROD. NO.', 'NOM. PIPE', 'T', 'L', 'WT. GMS']
    },
    {
      id: 'fifth',
      name: 'Chain Pipe Wrench',
      conformity: 'Generally Conforming to IS 4123 - 1982',
      description: 'Drop forged jaws with high-grade steel. Easy for reverse operation.',
      specs: [
        { prodNo: 'CPW04', nom: '900', l1: '165', e: '80', t: '12', wt: '1100' },
        { prodNo: 'CPW06', nom: '1000', l1: '180', e: '90', t: '13', wt: '9500' },
      ],
      columns: ['PROD. NO.', 'MAX D', 'L', 'L1', 'E', 'T', 'WT. GMS']
    },
    {
      id: 'seventh',
      name: 'Pipe Vices',
      conformity: 'Generally Conforming to IS 6007 - 1971',
      description: 'Body made from malleable cast iron. Jaws are drop forged and differentially hardened.',
      specs: [
        { prodNo: 'PV 00', nom: '10-40', d: '16', t: '95', l: '60', wt: '1100' },
        { prodNo: 'PV 01', nom: '10-60', d: '24', t: '145', l: '105', wt: '4250' },
      ],
      columns: ['PROD. NO.', 'NOM. PIPE', 'D', 'T', 'L', 'WT. GMS']
    }
  ];

  const tapariaCatalog = [
    { name: "Internal Circlip Plier Straight Nose", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/woocommerce-placeholder.webp?resize=300%2C300&ssl=1", price: null },
    { name: "Allen Key Taparia MM Size", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/allen-key.webp?resize=300%2C300&ssl=1", priceRange: [10, 70] },
    { name: "Taparia Socket 1/4\" Chrome", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/socket.webp?resize=300%2C300&ssl=1", priceRange: [35, 45] },
    { name: "Taparia Screw Driver 842-I (3.5 X 0.5)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/825.webp?resize=300%2C300&ssl=1", mrp: 49, price: 40 },
    { name: "Line Testor 814 Taparia", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2022/04/814-1.png?resize=300%2C300&ssl=1", mrp: 52, price: 45 },
    { name: "Extension Bar 1/4\" 50 mm (A743)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/14-extension-bar.png?resize=300%2C300&ssl=1", mrp: 97, price: 45 },
    { name: "Line Tester 813 Taparia (Yellow)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2022/04/813-3.png?resize=300%2C300&ssl=1", mrp: 65, price: 49 },
    { name: "Taparia Screw Driver 803 (3.5 X 0.5)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/803.webp?resize=300%2C300&ssl=1", mrp: 59, price: 50 },
    { name: "Taparia Socket 1/2\" Chrome Plated", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/taparia-socket.webp?resize=300%2C300&ssl=1", priceRange: [55, 150] },
    { name: "Extension Bar 1/4\" 100 mm (A753)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/extension-14.png?resize=300%2C300&ssl=1", mrp: 118, price: 55 },
    { name: "Taparia Screw Driver 804 (5.0 X 0.8)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/804.webp?resize=300%2C300&ssl=1", mrp: 74, price: 60 },
    { name: "Taparia Screw Driver 825 (6.0 x 0.8)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/825.webp?resize=300%2C300&ssl=1", mrp: 76, price: 65 },
    { name: "Taparia Screw Driver 826 (6.0 x 0.8)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/826.webp?resize=300%2C300&ssl=1", mrp: 82, price: 70 },
    { name: "Taparia Screw Driver 850 (2 in 1)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/850.webp?resize=300%2C300&ssl=1", mrp: 91, price: 75 },
    { name: "Spinner Handle 1/4\" 150 mm (A704)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/spinner-handle.png?resize=300%2C300&ssl=1", mrp: 183, price: 85 },
    { name: "Taparia 2 in 1 Insulated Screwdriver 903 I", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/02/removal.ai_tmp-63454144696f3.webp?resize=300%2C300&ssl=1", priceRange: [90, 850] },
    { name: "Taparia Screw Driver 827 (8.0 x 1.2)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/827.webp?resize=300%2C300&ssl=1", mrp: 110, price: 90 },
    { name: "Sliding Handle 1/4\" (A733)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/sliding-14.png?resize=300%2C300&ssl=1", mrp: 169, price: 90 },
    { name: "Taparia Digital Voltage Tester MDT 81", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2022/04/mdt-1.png?resize=300%2C300&ssl=1", mrp: 138, price: 95 },
    { name: "Taparia Screw Driver 827-I (8.0 x 1.2)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/827.webp?resize=300%2C300&ssl=1", mrp: 124, price: 100 },
    { name: "Extension Bar 1/2\" Taparia", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/extension-12-inch.png?resize=300%2C300&ssl=1", priceRange: [105, 240] },
    { name: "Universal Joint 1/4\" 39 mm (A773)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/universal-joint.png?resize=300%2C300&ssl=1", mrp: 209, price: 115 },
    { name: "Taparia MDTN82 Digital Tester", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2022/04/mdtn-1.png?resize=300%2C300&ssl=1", mrp: 182, price: 125 },
    { name: "Angle Handle L-Handle 1/2\" Taparia", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/angle-handle-small.png?resize=300%2C300&ssl=1", priceRange: [145, 465] },
    { name: "Taparia Screw Driver 927 (10.0 X 1.2)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/10/928.webp?resize=300%2C300&ssl=1", mrp: 183, price: 150 },
    { name: "T-Socket Wrench Taparia", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2023/02/resizedImage-1.webp?resize=300%2C300&ssl=1", priceRange: [155, 165] },
    { name: "Taparia 802 Screwdriver Set", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/12/802-1.webp?resize=300%2C300&ssl=1", mrp: 352, price: 175 },
    { name: "Adjustable Wrench (Phosphate)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/adjustable-wrench.webp?resize=300%2C300&ssl=1", priceRange: [185, 450] },
    { name: "Allen Key Set MM KM9V", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/allen.webp?resize=300%2C300&ssl=1", mrp: 280, price: 190 },
    { name: "Pipe Wrench Stillson Type", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/11/pipe-wrench.webp?resize=300%2C300&ssl=1", priceRange: [195, 1175] },
    { name: "Side Cutting Plier 1110-6 (165mm)", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2022/04/side.png?resize=300%2C300&ssl=1", mrp: 237, price: 196 },
    { name: "Taparia 812 Screwdriver Set", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/12/812.webp?resize=300%2C300&ssl=1", mrp: 289, price: 215 },
    { name: "Taparia 821 Steel Screwdriver Set", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2024/12/821-1.webp?resize=300%2C300&ssl=1", mrp: 356, price: 220 },
    { name: "Screwdriver Set PSFP-6", image: "https://i0.wp.com/industrialshoppy.com/wp-content/uploads/2022/03/pafp6-1.png?resize=300%2C300&ssl=1", mrp: 302, price: 239 },
  ];

  return (
    <div style={{ background: '#f8f9fa', fontFamily: '"Inter", Arial, sans-serif', color: '#333', paddingBottom: '40px' }}>

      {/* === HEADER BANNER === */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#2c3e50', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>
          Pipe Wrenches & Vice
        </h1>
        <p style={{ color: '#777', fontSize: '13px', marginTop: '8px' }}>Taparia Precision Series — Technical Benchmarks</p>
      </div>

      {/* === MAIN LAYOUT === */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width: '220px', flexShrink: 0 }} className="hidden md:block">
          <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden', position: 'sticky', top: '80px' }}>
            <div style={{ background: '#2980b9', color: '#fff', padding: '12px 16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              All Products
            </div>
            <div style={{ padding: '8px 0' }}>
              <div style={{ padding: '8px 16px', background: '#f0f7ff', borderLeft: '3px solid #2980b9', color: '#2980b9', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                Pipe Wrenches & Vice
              </div>
              {productData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setOpenItems({ [item.id]: true }); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 600,
                    background: activeTab === item.id ? '#fff8f0' : 'transparent',
                    color: activeTab === item.id ? '#e67e22' : '#555',
                    border: 'none', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.3px',
                    borderLeft: activeTab === item.id ? '3px solid #e67e22' : '3px solid transparent'
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* DESCRIPTION CARD */}
          <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#2c3e50', marginBottom: '12px' }}>
              Taparia Pipe Wrenches
            </h2>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#555', fontSize: '13px', lineHeight: '22px' }}>
              <li style={{ marginBottom: '6px' }}>Precision machined integral teeth with included angle of 76 Deg. provides best matching strength and firm gripping.</li>
              <li style={{ marginBottom: '6px' }}>Differential hardness pattern of the handle and jaw permits wear resistance teeth and tough body.</li>
              <li>The jaws are drop forged from high grade carbon steel.</li>
            </ul>
          </div>

          {/* PRODUCT RANGE HEADING */}
          <div style={{ background: '#444', color: '#fff', padding: '10px 16px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wrench style={{ width: '16px', height: '16px', color: '#f39c12' }} />
            Product Range
          </div>

          {/* PRODUCT RANGE LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {productData.map((item) => (
              <div key={item.id} id={item.id} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
                {/* Product Header */}
                <div
                  onClick={() => toggleItem(item.id)}
                  style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: openItems[item.id] ? '1px solid #eee' : 'none' }}
                >
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#2980b9', margin: 0 }}>{item.name}</h3>
                    {item.conformity !== '-' && (
                      <p style={{ fontSize: '11px', color: '#c0392b', fontWeight: 600, marginTop: '4px', fontStyle: 'italic' }}>{item.conformity}</p>
                    )}
                    <p style={{ fontSize: '12px', color: '#777', marginTop: '4px' }}>{item.description}</p>
                  </div>
                  <ChevronRight style={{ width: '18px', height: '18px', color: '#999', transform: openItems[item.id] ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }} />
                </div>

                {/* Spec Table */}
                <AnimatePresence>
                  {openItems[item.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '16px 20px', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                          <thead>
                            <tr style={{ background: '#f5f5f5' }}>
                              {item.columns.map((col, i) => (
                                <th key={i} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: '#444', borderBottom: '2px solid #ddd', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {item.specs.map((row, idx) => (
                              <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                                {Object.values(row).map((val, i) => (
                                  <td key={i} style={{ padding: '8px 12px', borderBottom: '1px solid #eee', color: '#555', fontFamily: 'monospace' }}>{val}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* === TAPARIA HAND TOOLS PRODUCT GRID === */}
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#2c3e50', marginBottom: '24px', borderBottom: '2px solid #e67e22', paddingBottom: '8px', display: 'inline-block' }}>
              Taparia Hand Tools
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {tapariaCatalog.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02, duration: 0.3 }}
                  style={{
                    background: '#fff', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s',
                  }}
                  className="hover:shadow-md"
                >
                  {/* Product Image */}
                  <div style={{ position: 'relative', aspectRatio: '1', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    {product.mrp && (
                      <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#e67e22', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>Sale</span>
                    )}
                    {!product.image ? (
                      <ToolImage toolName={product.name} category="handTools" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                      <img src={product.image} alt={product.name} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px', lineHeight: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.name}
                    </h4>

                    {/* Pricing */}
                    <div style={{ marginTop: 'auto', paddingTop: '6px' }}>
                      {product.priceRange ? (
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#c0392b' }}>₹{product.priceRange[0]} – ₹{product.priceRange[1]}</span>
                      ) : product.mrp ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '11px', color: '#999', textDecoration: 'line-through' }}>₹{product.mrp}</span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#c0392b' }}>₹{product.price}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#999' }}>Price on request</span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button style={{
                      marginTop: '10px', width: '100%', padding: '8px', fontSize: '11px', fontWeight: 700,
                      background: '#2980b9', color: '#fff', border: 'none', borderRadius: '4px',
                      textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', transition: 'background 0.2s'
                    }}
                      onMouseEnter={(e) => e.target.style.background = '#2471a3'}
                      onMouseLeave={(e) => e.target.style.background = '#2980b9'}
                    >
                      {product.priceRange ? 'Select Options' : 'Add to Cart'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default TapariaPrecisionSeries;
