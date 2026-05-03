// ═══════════════════════════════════════════════════════════════
// XPRESS SOLAR — PRODUCT & CONTENT DATA
// ═══════════════════════════════════════════════════════════════

const PRODUCTS = [
  {
    slug: 'lf280k-3v2-280ah',
    name: '3.2V LiFePO₄ Battery Cell — 280Ah',
    shortName: '3.2V LiFePO₄ 280Ah',
    brand: 'Docan Power',
    sku: 'XS-LF280K',
    category: 'batteries',
    subtitle: 'Lithium Iron Phosphate · 6,000+ cycles · Grade A',
    price: 185000,
    oldPrice: 220000,
    rating: 4.9,
    reviewCount: 127,
    inStock: 47,
    badge: '-16%',
    image: '🔋',
    description: 'Premium-grade LiFePO₄ (Lithium Iron Phosphate) prismatic battery cell from Docan Power. Engineered for solar energy storage systems, electric vehicles, and backup power applications. Long cycle life, high thermal stability, and safe chemistry — ideal for daily deep-cycle use. This is a Grade A cell with matched internal resistance, ensuring optimal performance when assembled into battery banks.',
    stats: [
      { label: 'CAPACITY', value: '280Ah', color: 'primary' },
      { label: 'VOLTAGE', value: '3.2V' },
      { label: 'CYCLES', value: '6000+', color: 'success' }
    ],
    specs: [
      { label: 'Brand', value: 'Docan Power' },
      { label: 'Model', value: 'LF280K' },
      { label: 'Chemistry', value: 'LiFePO₄ (LFP)' },
      { label: 'Nominal Voltage', value: '3.2V' },
      { label: 'Charging Voltage', value: '3.65V' },
      { label: 'Capacity', value: '280Ah' },
      { label: 'Internal Resistance', value: '≤ 0.18 mΩ' },
      { label: 'Cycle Life', value: '6,000+ cycles' },
      { label: 'Operating Temp', value: '-20°C to 60°C' },
      { label: 'Weight', value: '5.4 kg' },
      { label: 'Dimensions', value: '173 × 72 × 207 mm' },
      { label: 'Origin', value: 'Made in China' }
    ],
    compatibility: ['Solar Inverters', '12V Systems', '24V Systems', '48V Systems', 'EV Conversions', 'UPS Backup'],
    included: ['1× LiFePO₄ Cell (280Ah)', '2× Battery Terminal Bolts', '1× Quick Start Guide', '12-Month Warranty Card'],
    warranty: [
      { label: 'Warranty Period', value: '12 Months' },
      { label: 'Coverage', value: 'Manufacturer Defects' },
      { label: 'Returns', value: '7 days, unused' },
      { label: 'Support', value: 'WhatsApp + Phone' }
    ],
    reviews: [
      { name: 'Adebayo K.', date: '2 weeks ago', stars: 5, text: 'Exactly as described. Already powering my 5KVA inverter for 3 days non-stop. Excellent product.' },
      { name: 'Chidinma O.', date: '1 month ago', stars: 5, text: 'Bought 16 cells for my 48V system. Xpress Solar delivered same-day in Lagos. Cells are well-balanced.' }
    ]
  },
  {
    slug: 'deye-5kva-hybrid',
    name: '5KVA Hybrid Inverter',
    shortName: '5KVA Hybrid Inverter',
    brand: 'Deye',
    sku: 'XS-DEYE5K',
    category: 'inverters',
    subtitle: 'High-frequency · MPPT · WiFi-enabled',
    price: 485000,
    oldPrice: null,
    rating: 4.8,
    reviewCount: 89,
    inStock: 12,
    badge: null,
    image: '⚡',
    description: 'Deye 5KVA hybrid inverter with built-in MPPT solar charge controller. Supports both grid-tie and off-grid operation. WiFi monitoring through the SOLARMAN app. Industry-leading efficiency and reliable performance for homes and small businesses.',
    stats: [
      { label: 'CAPACITY', value: '5KVA', color: 'primary' },
      { label: 'VOLTAGE', value: '48V' },
      { label: 'EFFICIENCY', value: '97%', color: 'success' }
    ],
    specs: [
      { label: 'Brand', value: 'Deye' },
      { label: 'Model', value: 'SUN-5K-SG03LP1-EU' },
      { label: 'Capacity', value: '5KVA / 5000W' },
      { label: 'Battery Voltage', value: '48V' },
      { label: 'Max PV Input', value: '6500W' },
      { label: 'Efficiency', value: '97%' },
      { label: 'Surge Power', value: '10000W (5s)' },
      { label: 'Communication', value: 'WiFi / RS485' },
      { label: 'Weight', value: '11 kg' },
      { label: 'Origin', value: 'Made in China' }
    ],
    compatibility: ['Solar Panels', 'LiFePO₄ Batteries', 'Lead-Acid Batteries', 'Grid-Tie', 'Off-Grid', 'Hybrid Systems'],
    included: ['1× 5KVA Inverter', '1× WiFi Module', '1× User Manual', '24-Month Warranty Card', 'Mounting Hardware'],
    warranty: [
      { label: 'Warranty Period', value: '24 Months' },
      { label: 'Coverage', value: 'Full Manufacturer Warranty' },
      { label: 'Returns', value: '7 days, sealed' },
      { label: 'Support', value: 'WhatsApp + On-site' }
    ],
    reviews: [
      { name: 'Tunde M.', date: '3 weeks ago', stars: 5, text: 'Brilliant inverter. Switching is seamless. WiFi monitoring lets me check my system from anywhere.' }
    ]
  },
  {
    slug: 'felicity-200ah-lithium',
    name: '200Ah Lithium Battery',
    shortName: '200Ah Lithium Battery',
    brand: 'Felicity',
    sku: 'XS-FEL200',
    category: 'batteries',
    subtitle: 'Wall-mount · Built-in BMS · 6000 cycles',
    price: 650000,
    oldPrice: 720000,
    rating: 4.7,
    reviewCount: 64,
    inStock: 8,
    badge: 'SALE',
    image: '🔋',
    description: 'Premium 48V 200Ah lithium battery from Felicity. Wall-mountable design with built-in BMS protection, LCD display, and CAN/RS485 communication. Plug-and-play with most leading hybrid inverters.',
    stats: [
      { label: 'CAPACITY', value: '200Ah', color: 'primary' },
      { label: 'VOLTAGE', value: '48V' },
      { label: 'CYCLES', value: '6000+', color: 'success' }
    ],
    specs: [
      { label: 'Brand', value: 'Felicity' },
      { label: 'Model', value: 'LPBA48200' },
      { label: 'Chemistry', value: 'LiFePO₄' },
      { label: 'Voltage', value: '48V (51.2V nominal)' },
      { label: 'Capacity', value: '200Ah / 10.24 kWh' },
      { label: 'Cycles', value: '6,000 @ 80% DoD' },
      { label: 'Communication', value: 'CAN, RS485' },
      { label: 'Weight', value: '95 kg' },
      { label: 'IP Rating', value: 'IP21' }
    ],
    compatibility: ['Deye', 'Growatt', 'Sungrow', 'SunSynk', 'Voltronic'],
    included: ['1× Battery Unit', '1× Wall Mount Kit', '1× Communication Cable', '1× User Manual', '24-Month Warranty'],
    warranty: [
      { label: 'Warranty Period', value: '24 Months' },
      { label: 'Coverage', value: 'Manufacturer Defects' },
      { label: 'Returns', value: '7 days, unused' },
      { label: 'Support', value: 'On-site available' }
    ],
    reviews: []
  },
  {
    slug: 'canadian-solar-450w',
    name: '450W Mono Solar Panel',
    shortName: '450W Mono Solar Panel',
    brand: 'Canadian Solar',
    sku: 'XS-CS450',
    category: 'panels',
    subtitle: 'Monocrystalline · 25-year warranty · A-grade',
    price: 155000,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 156,
    inStock: 84,
    badge: null,
    image: '☀️',
    description: 'Canadian Solar HiKu 450W monocrystalline panel. Industry-leading efficiency with 25-year linear performance warranty. Perfect for residential and commercial installations.',
    stats: [
      { label: 'POWER', value: '450W', color: 'primary' },
      { label: 'EFFICIENCY', value: '20.9%' },
      { label: 'WARRANTY', value: '25yr', color: 'success' }
    ],
    specs: [
      { label: 'Brand', value: 'Canadian Solar' },
      { label: 'Model', value: 'HiKu CS3W-450MS' },
      { label: 'Type', value: 'Monocrystalline' },
      { label: 'Power', value: '450W' },
      { label: 'Efficiency', value: '20.9%' },
      { label: 'Voltage (Vmp)', value: '41.4V' },
      { label: 'Current (Imp)', value: '10.87A' },
      { label: 'Dimensions', value: '2108 × 1048 × 35 mm' },
      { label: 'Weight', value: '24.9 kg' }
    ],
    compatibility: ['MPPT Charge Controllers', 'Hybrid Inverters', 'Grid-Tie Inverters', 'String Inverters'],
    included: ['1× 450W Solar Panel', 'Mounting Brackets (sold separately)', '25-Year Linear Performance Warranty'],
    warranty: [
      { label: 'Performance Warranty', value: '25 Years' },
      { label: 'Product Warranty', value: '12 Years' },
      { label: 'Coverage', value: 'Manufacturer Defects' },
      { label: 'Support', value: 'Direct from importer' }
    ],
    reviews: []
  },
  {
    slug: 'growatt-3-5kva-mppt',
    name: '3.5KVA MPPT Inverter',
    shortName: '3.5KVA MPPT Inverter',
    brand: 'Growatt',
    sku: 'XS-GW3500',
    category: 'inverters',
    subtitle: 'Pure sine wave · 80A MPPT · Reliable',
    price: 345000,
    oldPrice: null,
    rating: 4.6,
    reviewCount: 42,
    inStock: 18,
    badge: null,
    image: '⚡',
    description: 'Growatt 3.5KVA off-grid inverter with built-in 80A MPPT charge controller. Pure sine wave output for sensitive electronics. Compact, reliable, and easy to install.',
    stats: [
      { label: 'CAPACITY', value: '3.5KVA', color: 'primary' },
      { label: 'VOLTAGE', value: '24V' },
      { label: 'MPPT', value: '80A', color: 'success' }
    ],
    specs: [
      { label: 'Brand', value: 'Growatt' },
      { label: 'Capacity', value: '3.5KVA / 3500W' },
      { label: 'Battery Voltage', value: '24V' },
      { label: 'MPPT Current', value: '80A' },
      { label: 'Efficiency', value: '93%' },
      { label: 'Output Type', value: 'Pure Sine Wave' },
      { label: 'Weight', value: '8 kg' }
    ],
    compatibility: ['Solar Panels', 'Lithium / Lead-Acid Batteries', 'Off-Grid Systems'],
    included: ['1× Inverter Unit', '1× User Manual', '12-Month Warranty Card'],
    warranty: [
      { label: 'Warranty Period', value: '12 Months' },
      { label: 'Coverage', value: 'Manufacturer Defects' },
      { label: 'Returns', value: '7 days, sealed' },
      { label: 'Support', value: 'WhatsApp' }
    ],
    reviews: []
  },
  {
    slug: 'trojan-100ah-agm',
    name: '100Ah AGM Battery',
    shortName: '100Ah AGM Battery',
    brand: 'Trojan',
    sku: 'XS-TR100AGM',
    category: 'batteries',
    subtitle: 'Sealed · Maintenance-free · Deep cycle',
    price: 195000,
    oldPrice: 230000,
    rating: 4.5,
    reviewCount: 73,
    inStock: 22,
    badge: '-15%',
    image: '🔋',
    description: 'Trojan 100Ah deep-cycle AGM battery. Sealed and maintenance-free. Ideal for solar backup systems where lithium is not yet within budget.',
    stats: [
      { label: 'CAPACITY', value: '100Ah', color: 'primary' },
      { label: 'VOLTAGE', value: '12V' },
      { label: 'TYPE', value: 'AGM', color: 'success' }
    ],
    specs: [
      { label: 'Brand', value: 'Trojan' },
      { label: 'Type', value: 'AGM (Sealed)' },
      { label: 'Voltage', value: '12V' },
      { label: 'Capacity', value: '100Ah' },
      { label: 'Cycles', value: '500+ @ 50% DoD' },
      { label: 'Weight', value: '28 kg' }
    ],
    compatibility: ['12V Systems', '24V Banks (2 in series)', '48V Banks (4 in series)'],
    included: ['1× AGM Battery', '12-Month Warranty Card'],
    warranty: [
      { label: 'Warranty Period', value: '12 Months' },
      { label: 'Coverage', value: 'Manufacturer Defects' },
      { label: 'Returns', value: '7 days, unused' }
    ],
    reviews: []
  },
  {
    slug: 'deye-10kva-hybrid',
    name: '10KVA Hybrid Inverter',
    shortName: '10KVA Hybrid Inverter',
    brand: 'Deye',
    sku: 'XS-DEYE10K',
    category: 'inverters',
    subtitle: '3-phase · WiFi · Commercial-grade',
    price: 985000,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 28,
    inStock: 5,
    badge: 'NEW',
    image: '⚡',
    description: 'Deye 10KVA 3-phase hybrid inverter for commercial and high-load residential applications. Industry-leading reliability with smart monitoring.',
    stats: [
      { label: 'CAPACITY', value: '10KVA', color: 'primary' },
      { label: 'PHASE', value: '3-Phase' },
      { label: 'EFFICIENCY', value: '97.6%', color: 'success' }
    ],
    specs: [
      { label: 'Brand', value: 'Deye' },
      { label: 'Capacity', value: '10KVA / 10000W' },
      { label: 'Phase', value: '3-Phase' },
      { label: 'Battery Voltage', value: '48V' },
      { label: 'Max PV Input', value: '13000W' },
      { label: 'Efficiency', value: '97.6%' },
      { label: 'Communication', value: 'WiFi / RS485 / CAN' }
    ],
    compatibility: ['Solar Panels', 'LiFePO₄ Batteries', 'Commercial 3-Phase Loads'],
    included: ['1× 10KVA Inverter', '1× WiFi Module', '1× User Manual', '24-Month Warranty'],
    warranty: [
      { label: 'Warranty Period', value: '24 Months' },
      { label: 'Coverage', value: 'Full Manufacturer Warranty' },
      { label: 'Support', value: 'On-site Available' }
    ],
    reviews: []
  },
  {
    slug: 'jinko-350w-poly',
    name: '350W Poly Solar Panel',
    shortName: '350W Poly Solar Panel',
    brand: 'Jinko',
    sku: 'XS-JK350',
    category: 'panels',
    subtitle: 'Polycrystalline · Cost-effective',
    price: 95000,
    oldPrice: null,
    rating: 4.4,
    reviewCount: 91,
    inStock: 56,
    badge: null,
    image: '☀️',
    description: 'Jinko 350W polycrystalline solar panel. Cost-effective option for budget-conscious installations without compromising on quality.',
    stats: [
      { label: 'POWER', value: '350W', color: 'primary' },
      { label: 'TYPE', value: 'Poly' },
      { label: 'WARRANTY', value: '20yr', color: 'success' }
    ],
    specs: [
      { label: 'Brand', value: 'Jinko' },
      { label: 'Type', value: 'Polycrystalline' },
      { label: 'Power', value: '350W' },
      { label: 'Voltage (Vmp)', value: '37.6V' },
      { label: 'Current (Imp)', value: '9.31A' },
      { label: 'Weight', value: '22.5 kg' }
    ],
    compatibility: ['MPPT Controllers', 'Off-Grid Systems', 'Hybrid Inverters'],
    included: ['1× 350W Solar Panel', '20-Year Performance Warranty'],
    warranty: [
      { label: 'Performance Warranty', value: '20 Years' },
      { label: 'Product Warranty', value: '10 Years' }
    ],
    reviews: []
  }
];

const FAQS = [
  {
    category: 'Products',
    q: 'What kind of solar systems do you sell?',
    a: 'We sell complete solar power solutions including lithium and AGM batteries, hybrid and MPPT inverters, mono and poly solar panels, and all related accessories. Whether you need a small home backup or a full off-grid system, we have you covered.'
  },
  {
    category: 'Delivery',
    q: 'How long does delivery take?',
    a: 'Same-day delivery is available within Lagos for orders placed before 12 PM. For other states in Nigeria, delivery takes 2-3 working days through our trusted logistics partners.'
  },
  {
    category: 'Installation',
    q: 'Do you offer installation services?',
    a: 'Yes! Our certified technicians provide professional installation for all systems we sell. Installation is included for full systems and available as an add-on for individual components.'
  },
  {
    category: 'Warranty',
    q: 'What is the warranty on your products?',
    a: 'Most products come with a 12-month manufacturer warranty covering defects. Solar panels typically have 25-year performance warranties. Specific warranty terms are listed on each product page.'
  },
  {
    category: 'Payment',
    q: 'Can I pay on delivery?',
    a: 'Yes, pay-on-delivery is available within Lagos. For nationwide orders, we require payment confirmation before dispatch. We accept bank transfers, card payments, and approved POS payments.'
  },
  {
    category: 'Products',
    q: 'Can I get a custom solar system designed?',
    a: 'Absolutely. Our energy consultants will assess your power needs and design a custom system. Just request a free consultation and we will get back to you within 24 hours.'
  },
  {
    category: 'Warranty',
    q: 'What if my product develops a fault?',
    a: 'Contact our support team via WhatsApp or phone. Faulty products under warranty are replaced or repaired at no cost. Out-of-warranty products are repaired at fair, transparent rates.'
  },
  {
    category: 'Delivery',
    q: 'Do you serve customers outside Nigeria?',
    a: 'Currently we operate within Nigeria only. We serve all 36 states with delivery and major cities with installation services. International expansion is on our 2027 roadmap.'
  }
];

const CATEGORIES = [
  { id: 'batteries', name: 'Solar Batteries', icon: '🔋', count: 24 },
  { id: 'inverters', name: 'Inverters', icon: '⚡', count: 18 },
  { id: 'panels', name: 'Solar Panels', icon: '☀️', count: 32 },
  { id: 'accessories', name: 'Accessories', icon: '🔌', count: 47 }
];

const TEAM = [
  { name: 'Uche Shedrach', role: 'FOUNDER & CEO', avatar: '👨🏾' },
  { name: 'Adaeze Nwosu', role: 'HEAD OF OPERATIONS', avatar: '👩🏾' },
  { name: 'Tunde Adebayo', role: 'LEAD INSTALLER', avatar: '👨🏾‍🔧' },
  { name: 'Kemi Falade', role: 'CUSTOMER SUCCESS', avatar: '👩🏾‍💼' }
];

const VALUES = [
  { icon: '💯', title: 'Quality First', desc: 'We only sell genuine products from authorised manufacturers.' },
  { icon: '🤝', title: 'Honest Pricing', desc: 'No hidden fees. No bait-and-switch. Transparent always.' },
  { icon: '⏰', title: 'On-Time Delivery', desc: 'Same-day in Lagos. Nationwide in 2-3 days. Promised.' },
  { icon: '🛡', title: 'Lifetime Support', desc: 'Real customer support, not a chatbot. We are here.' }
];

const WHY_US = [
  { icon: '✓', title: 'Genuine Products', desc: 'All products sourced directly from authorised manufacturers.' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day delivery within Lagos. Nationwide in 2-3 days.' },
  { icon: '🛠', title: 'Expert Installation', desc: 'Certified technicians for hassle-free setup at your location.' },
  { icon: '🛡', title: '12-Month Warranty', desc: 'Comprehensive warranty on all major products.' }
];

const WHATSAPP_NUMBER = '2348068755564';
const PHONE_NUMBER = '+234 806 875 5564';

// Helper: format Naira
function formatNGN(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

// Helper: get product by slug
function getProduct(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}
