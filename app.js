// ═══════════════════════════════════════════════════════════════
// XPRESS SOLAR — APP LOGIC
// Routing · Rendering · Cart · Checkout
// ═══════════════════════════════════════════════════════════════

// ─── State ────────────────────────────────────────────────────
const state = {
  cart: [],
  checkoutStep: 0,
  shipping: {},
  payment: { method: 'card' },
  delivery: 'free',
  orderId: null
};

// Load cart from localStorage
try {
  const saved = localStorage.getItem('xpress_cart');
  if (saved) state.cart = JSON.parse(saved);
} catch (e) {}

function saveCart() {
  try { localStorage.setItem('xpress_cart', JSON.stringify(state.cart)); } catch (e) {}
}

// ─── Toast ────────────────────────────────────────────────────
let toastTimeout;
function showToast(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), duration);
}

// ─── Cart logic ───────────────────────────────────────────────
function cartItemCount() { return state.cart.reduce((sum, i) => sum + i.qty, 0); }
function cartSubtotal() { return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0); }

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const count = cartItemCount();
  badge.textContent = count;
  badge.classList.toggle('show', count > 0);
}

function addToCart(slug, qty = 1) {
  const product = getProduct(slug);
  if (!product) return;
  const existing = state.cart.find(i => i.slug === slug);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ slug, name: product.shortName, brand: product.brand, price: product.price, image: product.image, qty });
  }
  saveCart();
  updateCartBadge();
  renderCart();
  showToast(`Added to cart · ${product.shortName}`);
}

function updateQty(slug, delta) {
  const item = state.cart.find(i => i.slug === slug);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.slug !== slug);
  }
  saveCart();
  updateCartBadge();
  renderCart();
}

function removeFromCart(slug) {
  state.cart = state.cart.filter(i => i.slug !== slug);
  saveCart();
  updateCartBadge();
  renderCart();
  showToast('Removed from cart');
}

// ─── Cart drawer ──────────────────────────────────────────────
function openCart() {
  renderCart();
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const headerCount = document.getElementById('cartHeaderCount');
  const count = cartItemCount();
  headerCount.textContent = count === 1 ? '1 item' : `${count} items`;

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet. Browse our solar products and find what you need.</p>
        <button class="btn btn-primary" onclick="closeCart(); navigate('shop');">Start Shopping</button>
      </div>
    `;
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.image}</div>
      <div class="cart-item-info">
        <span class="cart-item-brand">${item.brand.toUpperCase()}</span>
        <strong class="cart-item-name">${item.name}</strong>
        <span class="cart-item-price">${formatNGN(item.price)}</span>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQty('${item.slug}', -1)" aria-label="Decrease">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.slug}', 1)" aria-label="Increase">+</button>
          </div>
          <span class="cart-item-remove" onclick="removeFromCart('${item.slug}')">Remove</span>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = cartSubtotal();
  footer.innerHTML = `
    <div class="cart-summary-row"><span>Subtotal</span><span class="value">${formatNGN(subtotal)}</span></div>
    <div class="cart-summary-row"><span>Delivery</span><span class="value free-tag">FREE</span></div>
    <div class="cart-summary-row total"><span>Total</span><span class="value">${formatNGN(subtotal)}</span></div>
    <button class="btn btn-primary btn-block btn-lg" onclick="openCheckout()">Proceed to Checkout →</button>
    <button class="btn btn-secondary btn-block" onclick="closeCart()">Continue Shopping</button>
  `;
}

// ─── Mobile nav menu ──────────────────────────────────────────
function toggleMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('mobileNavOverlay');
  const nav = document.getElementById('mobileNav');
  const isOpen = nav.classList.contains('open');
  if (isOpen) {
    overlay.classList.remove('open');
    nav.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.textContent = '☰';
  } else {
    overlay.classList.add('open');
    nav.classList.add('open');
    menuBtn.classList.add('active');
    menuBtn.textContent = '✕';
  }
}
function closeMenu() {
  document.getElementById('mobileNavOverlay').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.classList.remove('active');
  menuBtn.textContent = '☰';
}

// ─── Routing ──────────────────────────────────────────────────
function navigate(route) {
  let hash = '#/';
  if (route === 'home') hash = '#/';
  else if (route === 'shop') hash = '#/shop';
  else if (route === 'about') hash = '#/about';
  else if (route === 'faq') hash = '#/faq';
  else if (route.startsWith('product/')) hash = '#/' + route;
  window.location.hash = hash;
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '') || 'home';
  if (hash === '' || hash === '/') return { type: 'home' };
  if (hash === 'shop') return { type: 'shop' };
  if (hash === 'about') return { type: 'about' };
  if (hash === 'faq') return { type: 'faq' };
  if (hash.startsWith('product/')) return { type: 'product', slug: hash.split('/')[1] };
  if (hash === 'scan') return { type: 'scan' };
  return { type: 'home' };
}

function handleRoute() {
  const route = parseRoute();
  const main = document.getElementById('mainContent');
  const scanScreen = document.getElementById('scan');
  const app = document.getElementById('app');

  if (route.type === 'scan') {
    scanScreen.classList.add('active');
    app.style.display = 'none';
    return;
  } else {
    scanScreen.classList.remove('active');
    app.style.display = 'flex';
  }

  closeMenu();
  window.scrollTo(0, 0);

  // Update nav active states
  document.querySelectorAll('[data-route]').forEach(el => {
    const linkRoute = el.dataset.route;
    el.classList.toggle('active', linkRoute === route.type);
  });

  if (route.type === 'home') main.innerHTML = renderHome();
  else if (route.type === 'shop') main.innerHTML = renderShop();
  else if (route.type === 'about') main.innerHTML = renderAbout();
  else if (route.type === 'faq') main.innerHTML = renderFAQ();
  else if (route.type === 'product') main.innerHTML = renderProduct(route.slug);
}

// ─── Home page ────────────────────────────────────────────────
function renderHome() {
  return `
    <section class="hero">
      <span class="hero-tag">Trusted by 1,200+ homes</span>
      <h1>Reliable Solar Power for Every Home & Business</h1>
      <p class="hero-sub">Premium solar inverters, batteries, and panels — sourced, installed, and supported by experts.</p>
      <div class="hero-ctas">
        <a href="#/shop" class="btn btn-primary btn-lg btn-block">Shop Now</a>
        <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" class="btn btn-secondary btn-block">💬 Get Free Quote</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><strong>1,200+</strong><span>Installations</span></div>
        <div class="hero-stat"><strong>5+ yrs</strong><span>Experience</span></div>
        <div class="hero-stat"><strong>24/7</strong><span>Support</span></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head"><h2>Shop by Category</h2><p>Find what you need for your solar setup</p></div>
        <div class="cat-grid">
          ${CATEGORIES.map(c => `
            <a href="#/shop" class="cat-card">
              <div class="cat-icon">${c.icon}</div>
              <div class="cat-info"><strong>${c.name}</strong><small>${c.count} products</small></div>
              <span class="arrow">›</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head-row">
          <div><h2>Best Sellers</h2><p>Top picks this month</p></div>
          <a href="#/shop">See all →</a>
        </div>
        <div class="product-grid">
          ${PRODUCTS.slice(0, 4).map(p => productCardHTML(p)).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head"><h2>Why Choose Xpress Solar</h2><p>More than just products — a full energy partner</p></div>
        <div class="why-grid">
          ${WHY_US.map(w => `
            <div class="why-card">
              <div class="why-icon">${w.icon}</div>
              <div><strong>${w.title}</strong><p>${w.desc}</p></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="testimonial">
      <div class="container">
        <h2>What Our Customers Say</h2>
        <blockquote>"Xpress Solar transformed my home. No more generator noise. The inverter and batteries have been running flawlessly for 18 months. Highly recommended."</blockquote>
        <div class="stars">★★★★★</div>
        <p class="author">Adebayo K. — Lekki, Lagos</p>
      </div>
    </section>

    <section class="final-cta">
      <h2>Ready to Switch to Solar?</h2>
      <p>Get a free consultation and quote tailored to your power needs.</p>
      <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" class="btn btn-primary">Get Free Quote</a>
      <span class="phone">📞 ${PHONE_NUMBER}</span>
    </section>
  `;
}

function productCardHTML(p) {
  return `
    <a href="#/product/${p.slug}" class="product-card">
      <div class="product-img">
        ${p.badge ? `<span class="product-badge ${p.badge.includes('%') ? 'discount' : ''}">${p.badge}</span>` : ''}
        ${p.image}
      </div>
      <div class="product-info">
        <span class="product-brand">${p.brand.toUpperCase()}</span>
        <strong class="product-name">${p.shortName}</strong>
        <span class="product-rate"><span class="star">★</span> ${p.rating} · In stock</span>
        <div class="product-price-row">
          <strong class="product-price">${formatNGN(p.price)}</strong>
          ${p.oldPrice ? `<span class="product-old-price">${formatNGN(p.oldPrice)}</span>` : ''}
        </div>
      </div>
    </a>
  `;
}

// ─── Shop page ────────────────────────────────────────────────
let shopFilter = 'all';
function renderShop() {
  const filtered = shopFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === shopFilter);
  return `
    <section class="shop-title container">
      <h1>Shop</h1>
      <p>${PRODUCTS.length} products available</p>
    </section>
    <div class="shop-controls container">
      <div class="search-bar">
        <span>🔍</span>
        <input type="text" placeholder="Search batteries, inverters, panels..." oninput="searchProducts(this.value)" />
      </div>
      <div class="shop-filters" id="shopFilters">
        <button class="filter-chip ${shopFilter==='all'?'active':''}" onclick="setShopFilter('all')">All</button>
        ${CATEGORIES.map(c => `<button class="filter-chip ${shopFilter===c.id?'active':''}" onclick="setShopFilter('${c.id}')">${c.name}</button>`).join('')}
      </div>
    </div>
    <div class="shop-sort container">
      <span class="results">Showing ${filtered.length} results</span>
      <button class="shop-sort-btn">Sort: Featured ▾</button>
    </div>
    <div class="shop-grid container">
      <div class="product-grid" id="shopGrid">
        ${filtered.map(p => productCardHTML(p)).join('')}
      </div>
    </div>
  `;
}

function setShopFilter(filter) {
  shopFilter = filter;
  document.getElementById('mainContent').innerHTML = renderShop();
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  let filtered = shopFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === shopFilter);
  if (q) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q)
    );
  }
  grid.innerHTML = filtered.map(p => productCardHTML(p)).join('') || '<p style="text-align:center;padding:40px;color:var(--color-text-muted);">No products match your search.</p>';
}

// ─── Product detail page ──────────────────────────────────────
function renderProduct(slug) {
  const p = getProduct(slug);
  if (!p) return `<div class="container" style="padding:80px 20px;text-align:center;"><h2>Product not found</h2><p style="margin-top:12px;color:var(--color-text-muted);">This product doesn't exist or has been removed.</p><a href="#/shop" class="btn btn-primary" style="margin-top:24px;">Browse Shop</a></div>`;

  return `
    <div class="product-detail-hero">${p.image}</div>
    <div class="product-detail-body">
      <div class="pd-title-block">
        <div class="pd-brand-line">
          <span class="pd-brand">${p.brand.toUpperCase()}</span>
          <span class="pd-sep"></span>
          <span class="pd-sku">SKU: ${p.sku}</span>
        </div>
        <h1 class="pd-name">${p.name}</h1>
        <p class="pd-subtitle">${p.subtitle}</p>
        <div class="pd-rating">
          <span class="stars">${'★'.repeat(Math.round(p.rating))}</span>
          <span class="score">${p.rating}</span>
          <span class="count">(${p.reviewCount} reviews)</span>
        </div>
      </div>

      <div class="pd-price-card">
        <div class="pd-price-row">
          <span class="pd-price">${formatNGN(p.price)}</span>
          ${p.oldPrice ? `<span class="pd-old-price">${formatNGN(p.oldPrice)}</span>` : ''}
          ${p.oldPrice ? `<span class="pd-discount">Save ${Math.round((1 - p.price/p.oldPrice)*100)}%</span>` : ''}
        </div>
        <p class="pd-delivery">🚚 Free delivery within Lagos · 💳 Pay on delivery available</p>
      </div>

      <div class="pd-stats">
        ${p.stats.map(s => `<div class="pd-stat ${s.color || ''}"><strong>${s.value}</strong><span>${s.label}</span></div>`).join('')}
      </div>

      <div class="pd-card">
        <h3>Product Description</h3>
        <p class="pd-description">${p.description}</p>
      </div>

      <div class="pd-card">
        <h3>Specifications</h3>
        ${p.specs.map(s => `<div class="pd-row"><span class="label">${s.label}</span><span class="value">${s.value}</span></div>`).join('')}
      </div>

      <div class="pd-card">
        <h3>Compatible With</h3>
        <div class="pd-chips">
          ${p.compatibility.map(c => `<span class="pd-chip">${c}</span>`).join('')}
        </div>
      </div>

      <div class="pd-card">
        <h3>What's Included</h3>
        <div class="pd-included">
          ${p.included.map(item => `<div class="pd-included-item"><span class="pd-check">✓</span><span>${item}</span></div>`).join('')}
        </div>
      </div>

      <div class="pd-card">
        <h3>Warranty & Support</h3>
        ${p.warranty.map(w => `<div class="pd-row"><span class="label">${w.label}</span><span class="value">${w.value}</span></div>`).join('')}
      </div>

      ${p.reviews.length > 0 ? `
      <div class="pd-card">
        <h3>Customer Reviews</h3>
        ${p.reviews.map(r => `
          <div style="padding:12px 0;border-top:1px solid var(--color-border);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <strong style="font-size:13px;">${r.name}</strong>
              <small style="font-size:11px;color:var(--color-text-muted);">${r.date}</small>
            </div>
            <div style="color:var(--color-star);font-size:12px;margin-bottom:6px;">${'★'.repeat(r.stars)}</div>
            <p style="font-size:12px;line-height:1.6;color:var(--color-text-muted);">${r.text}</p>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <div class="pd-actions">
        <button class="btn btn-primary btn-lg pd-buy-now" onclick="addToCart('${p.slug}'); openCart();">Buy Now</button>
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I\'m interested in the ' + p.name + ' (SKU: ' + p.sku + ')')}" target="_blank" rel="noopener" class="btn btn-whatsapp">💬 Chat on WhatsApp</a>
      </div>

      <div class="pd-help-card">
        <h4>Need help choosing?</h4>
        <p>Our solar experts are available to guide you through the right battery setup for your system.</p>
        <span class="phone">📞 ${PHONE_NUMBER}</span>
      </div>

      <div class="pd-footer-meta">
        <span class="updated">Last updated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        <span class="copy">© 2026 Xpress Solar · xpresssolar.com</span>
      </div>
    </div>
  `;
}

// ─── About page ───────────────────────────────────────────────
function renderAbout() {
  return `
    <section class="about-hero">
      <span class="about-tag">ABOUT US</span>
      <h1>Lighting Up Nigeria, One Home at a Time</h1>
      <p>Founded in 2020, Xpress Solar is on a mission to make clean, reliable energy accessible to every Nigerian.</p>
    </section>

    <section class="about-section about-story container">
      <h2>Our Story</h2>
      <div class="about-img">📷 Team Photo</div>
      <p>Xpress Solar started with a simple frustration — the constant power cuts that disrupt Nigerian homes and businesses every day. We knew there had to be a better way.</p>
      <p>Today, we are one of Lagos' most trusted solar companies, having installed over 1,200 systems across homes, schools, hospitals, and businesses. Every installation is backed by genuine products, certified technicians, and ongoing support.</p>
    </section>

    <section class="about-section container">
      <div class="mv-grid">
        <div class="mv-card mission">
          <div class="icon">🎯</div>
          <h3>Our Mission</h3>
          <p>To make solar energy affordable, reliable, and accessible to every Nigerian home and business.</p>
        </div>
        <div class="mv-card vision">
          <div class="icon">🌍</div>
          <h3>Our Vision</h3>
          <p>A Nigeria where clean, uninterrupted power is the standard — not the exception.</p>
        </div>
      </div>
    </section>

    <section class="about-section container">
      <div class="section-head"><h2>What We Stand For</h2><p>The values that guide every decision we make</p></div>
      <div class="values-grid">
        ${VALUES.map(v => `
          <div class="value-card">
            <div class="value-icon">${v.icon}</div>
            <div><strong>${v.title}</strong><p>${v.desc}</p></div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="about-section container">
      <div class="section-head"><h2>Meet the Team</h2><p>The people behind Xpress Solar</p></div>
      <div class="team-grid">
        ${TEAM.map(t => `
          <div class="team-card">
            <div class="team-avatar">${t.avatar}</div>
            <div class="team-name">${t.name}</div>
            <div class="team-role">${t.role}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="final-cta">
      <h2>Ready to Power Up?</h2>
      <p>Talk to our team about your solar needs.</p>
      <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" class="btn btn-primary">Get a Free Quote</a>
    </section>
  `;
}

// ─── FAQ page ─────────────────────────────────────────────────
let faqCategory = 'All';
function renderFAQ() {
  const cats = ['All', ...new Set(FAQS.map(f => f.category))];
  const filtered = faqCategory === 'All' ? FAQS : FAQS.filter(f => f.category === faqCategory);

  return `
    <section class="faq-hero">
      <span class="tag">SUPPORT</span>
      <h1>Frequently Asked Questions</h1>
      <p>Got questions? We have answers. Find what you need below.</p>
    </section>

    <div class="faq-tabs">
      ${cats.map(c => `<button class="faq-tab ${c===faqCategory?'active':''}" onclick="setFaqCategory('${c}')">${c}</button>`).join('')}
    </div>

    <div class="faq-list">
      ${filtered.map((f, i) => `
        <div class="faq-item ${i===0?'open':''}" id="faq-${i}">
          <div class="faq-question" onclick="toggleFaq(${i})">
            <strong>${f.q}</strong>
            <span class="faq-toggle">${i===0?'−':'+'}</span>
          </div>
          <div class="faq-answer">${f.a}</div>
        </div>
      `).join('')}
    </div>

    <section class="final-cta">
      <h2>Still have questions?</h2>
      <p>Our team is just a message away.</p>
      <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" class="btn btn-whatsapp">💬 Chat on WhatsApp</a>
      <a href="tel:${WHATSAPP_NUMBER}" class="btn btn-outline" style="margin-top:8px;">📞 ${PHONE_NUMBER}</a>
    </section>
  `;
}

function setFaqCategory(c) {
  faqCategory = c;
  document.getElementById('mainContent').innerHTML = renderFAQ();
}

function toggleFaq(i) {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item, idx) => {
    if (idx === i) {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open');
      item.querySelector('.faq-toggle').textContent = isOpen ? '+' : '−';
    } else {
      item.classList.remove('open');
      item.querySelector('.faq-toggle').textContent = '+';
    }
  });
}

// ─── CHECKOUT FLOW ────────────────────────────────────────────
function openCheckout() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  closeCart();
  state.checkoutStep = 0;
  document.getElementById('checkoutOverlay').classList.add('open');
  const modal = document.getElementById('checkoutModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  renderCheckout();
}
function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('open');
  const modal = document.getElementById('checkoutModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function checkoutBack() {
  if (state.checkoutStep > 0) {
    state.checkoutStep--;
    renderCheckout();
  }
}

function renderCheckout() {
  // Update title and progress steps
  const titles = ['Checkout', 'Payment', 'Order Confirmed'];
  const subtitles = ['Step 1 of 3', 'Step 2 of 3', 'Step 3 of 3'];
  document.getElementById('checkoutTitle').textContent = titles[state.checkoutStep];
  document.getElementById('checkoutSubtitle').textContent = subtitles[state.checkoutStep];
  document.getElementById('checkoutBackBtn').style.display = state.checkoutStep === 1 ? 'inline-flex' : 'none';

  for (let i = 0; i < 3; i++) {
    const step = document.getElementById('step' + i);
    step.classList.toggle('active', i === state.checkoutStep);
    step.classList.toggle('complete', i < state.checkoutStep);
  }
  document.getElementById('line1').classList.toggle('complete', state.checkoutStep > 0);
  document.getElementById('line2').classList.toggle('complete', state.checkoutStep > 1);

  if (state.checkoutStep === 0) renderShipping();
  else if (state.checkoutStep === 1) renderPayment();
  else if (state.checkoutStep === 2) renderConfirmation();
}

function renderShipping() {
  const body = document.getElementById('checkoutBody');
  const footer = document.getElementById('checkoutFooter');

  body.innerHTML = `
    <div class="checkout-section">
      <h4>Shipping Information</h4>
      <div class="input-group">
        <label>FULL NAME</label>
        <input type="text" id="ship-name" value="${state.shipping.name || ''}" placeholder="John Doe" />
      </div>
      <div class="input-group row" style="display:flex;gap:12px;">
        <div class="input-group" style="flex:1;">
          <label>PHONE</label>
          <input type="tel" id="ship-phone" value="${state.shipping.phone || ''}" placeholder="+234 ..." />
        </div>
        <div class="input-group" style="flex:1;">
          <label>EMAIL</label>
          <input type="email" id="ship-email" value="${state.shipping.email || ''}" placeholder="you@email.com" />
        </div>
      </div>
      <div class="input-group">
        <label>DELIVERY ADDRESS</label>
        <input type="text" id="ship-address" value="${state.shipping.address || ''}" placeholder="Street, area..." />
      </div>
      <div class="input-group row" style="display:flex;gap:12px;">
        <div class="input-group" style="flex:1;">
          <label>CITY</label>
          <input type="text" id="ship-city" value="${state.shipping.city || 'Lagos'}" />
        </div>
        <div class="input-group" style="flex:1;">
          <label>STATE</label>
          <input type="text" id="ship-state" value="${state.shipping.state || 'Lagos'}" />
        </div>
      </div>
    </div>

    <div class="checkout-section" style="margin-top:8px;">
      <h4>DELIVERY METHOD</h4>
      <div class="delivery-option ${state.delivery==='free'?'selected':''}" onclick="setDelivery('free')">
        <div class="radio-circle"></div>
        <div class="option-content">
          <strong>Free Delivery</strong>
          <small>Same-day in Lagos · 2-3 days nationwide</small>
        </div>
        <span class="option-price free">FREE</span>
      </div>
      <div class="delivery-option ${state.delivery==='express'?'selected':''}" onclick="setDelivery('express')">
        <div class="radio-circle"></div>
        <div class="option-content">
          <strong>Express Delivery</strong>
          <small>Within 3 hours · Lagos only</small>
        </div>
        <span class="option-price">${formatNGN(5000)}</span>
      </div>
      <div class="delivery-option ${state.delivery==='pickup'?'selected':''}" onclick="setDelivery('pickup')">
        <div class="radio-circle"></div>
        <div class="option-content">
          <strong>Self Pickup</strong>
          <small>Pick up from our Lagos showroom</small>
        </div>
        <span class="option-price free">FREE</span>
      </div>
    </div>
  `;

  const total = checkoutTotal();
  footer.innerHTML = `
    <div class="checkout-footer-total"><span class="label">Total</span><strong class="value">${formatNGN(total)}</strong></div>
    <button class="btn btn-primary" onclick="goToPayment()">Continue to Payment →</button>
  `;
}

function setDelivery(d) {
  state.delivery = d;
  renderCheckout();
}

function checkoutTotal() {
  let total = cartSubtotal();
  if (state.delivery === 'express') total += 5000;
  return total;
}

function goToPayment() {
  // Save shipping info
  state.shipping = {
    name: document.getElementById('ship-name').value,
    phone: document.getElementById('ship-phone').value,
    email: document.getElementById('ship-email').value,
    address: document.getElementById('ship-address').value,
    city: document.getElementById('ship-city').value,
    state: document.getElementById('ship-state').value
  };
  // Validate
  if (!state.shipping.name || !state.shipping.phone || !state.shipping.address) {
    showToast('Please fill in your name, phone, and address');
    return;
  }
  state.checkoutStep = 1;
  renderCheckout();
}

function renderPayment() {
  const body = document.getElementById('checkoutBody');
  const footer = document.getElementById('checkoutFooter');

  body.innerHTML = `
    <div class="checkout-section">
      <h4>Choose Payment Method</h4>
      <div class="payment-option ${state.payment.method==='card'?'selected':''}" onclick="setPaymentMethod('card')">
        <div class="radio-circle"></div>
        <div class="payment-icon">💳</div>
        <div class="option-content">
          <strong>Card Payment</strong>
          <small>Visa, Mastercard, Verve</small>
        </div>
      </div>
      <div class="payment-option ${state.payment.method==='transfer'?'selected':''}" onclick="setPaymentMethod('transfer')">
        <div class="radio-circle"></div>
        <div class="payment-icon">🏦</div>
        <div class="option-content">
          <strong>Bank Transfer</strong>
          <small>Pay via your bank app or USSD</small>
        </div>
      </div>
      <div class="payment-option ${state.payment.method==='pod'?'selected':''}" onclick="setPaymentMethod('pod')">
        <div class="radio-circle"></div>
        <div class="payment-icon">💵</div>
        <div class="option-content">
          <strong>Pay on Delivery</strong>
          <small>Cash on delivery (Lagos only)</small>
        </div>
      </div>
      <div class="payment-option ${state.payment.method==='whatsapp'?'selected':''}" onclick="setPaymentMethod('whatsapp')">
        <div class="radio-circle"></div>
        <div class="payment-icon">💬</div>
        <div class="option-content">
          <strong>Pay via WhatsApp</strong>
          <small>Get bank details via WhatsApp</small>
        </div>
      </div>
    </div>

    ${state.payment.method === 'card' ? `
      <div class="checkout-section" style="margin-top:8px;">
        <h4>CARD DETAILS</h4>
        <div class="input-group">
          <label>CARD NUMBER</label>
          <input type="text" id="card-num" placeholder="1234 5678 9012 3456" maxlength="19" />
        </div>
        <div class="input-group row" style="display:flex;gap:12px;">
          <div class="input-group" style="flex:1;">
            <label>EXPIRY</label>
            <input type="text" id="card-exp" placeholder="MM/YY" maxlength="5" />
          </div>
          <div class="input-group" style="flex:1;">
            <label>CVV</label>
            <input type="text" id="card-cvv" placeholder="123" maxlength="3" />
          </div>
        </div>
        <div class="input-group">
          <label>NAME ON CARD</label>
          <input type="text" id="card-name" placeholder="${(state.shipping.name || '').toUpperCase()}" />
        </div>
        <div class="security-banner" style="margin-top:8px;">
          <span>🔒</span>
          <span>Your payment is secured. We do not store card details.</span>
        </div>
      </div>
    ` : state.payment.method === 'transfer' ? `
      <div class="checkout-section" style="margin-top:8px;">
        <h4>BANK ACCOUNT DETAILS</h4>
        <div style="background:white;padding:20px;border-radius:12px;border:1px solid var(--color-border);">
          <p style="font-size:12px;color:var(--color-text-muted);margin-bottom:8px;">Make transfer to:</p>
          <p style="font-size:14px;font-weight:700;">Xpress Solar Ltd.</p>
          <p style="font-size:18px;font-weight:700;font-family:monospace;letter-spacing:2px;margin:8px 0;">0123456789</p>
          <p style="font-size:13px;color:var(--color-text-muted);">GTBank · Use your phone number as payment reference</p>
        </div>
      </div>
    ` : state.payment.method === 'pod' ? `
      <div class="checkout-section" style="margin-top:8px;">
        <div style="background:var(--color-success-light);padding:16px;border-radius:12px;">
          <p style="font-size:13px;color:var(--color-success);font-weight:600;line-height:1.6;">Pay our delivery agent in cash when your order arrives. Lagos only — orders above ₦100,000 may require partial deposit.</p>
        </div>
      </div>
    ` : `
      <div class="checkout-section" style="margin-top:8px;">
        <div style="background:var(--color-accent-light);padding:16px;border-radius:12px;">
          <p style="font-size:13px;color:var(--color-text);line-height:1.6;">After placing this order, we will send you our bank details and confirm payment via WhatsApp at +234 806 875 5564.</p>
        </div>
      </div>
    `}
  `;

  const total = checkoutTotal();
  footer.innerHTML = `
    <div class="checkout-footer-total"><span class="label">Total</span><strong class="value">${formatNGN(total)}</strong></div>
    <button class="btn btn-primary" onclick="completePayment()">Pay ${formatNGN(total)} →</button>
  `;
}

function setPaymentMethod(m) {
  state.payment.method = m;
  renderCheckout();
}

function completePayment() {
  // Generate fake order ID
  state.orderId = 'XS-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
  state.checkoutStep = 2;
  renderCheckout();
}

function renderConfirmation() {
  const body = document.getElementById('checkoutBody');
  const footer = document.getElementById('checkoutFooter');
  const total = checkoutTotal();
  const itemCount = cartItemCount();
  const methodLabels = { card: 'Card Payment', transfer: 'Bank Transfer', pod: 'Pay on Delivery', whatsapp: 'WhatsApp' };

  body.innerHTML = `
    <div class="confirm-content">
      <div class="confirm-icon">✓</div>
      <h2 class="confirm-title">Order Confirmed!</h2>
      <p class="confirm-sub">Thank you for your order, ${state.shipping.name.split(' ')[0]}. We are preparing it for delivery.</p>

      <div class="order-id-card">
        <span class="label">ORDER ID</span>
        <div class="id">#${state.orderId}</div>
        <p class="note">A confirmation has been sent to ${state.shipping.email || 'your email'}</p>
      </div>

      <div class="confirm-summary">
        <h4>Order Summary</h4>
        <div class="confirm-summary-row"><span class="label">Items</span><span class="value">${itemCount} product${itemCount===1?'':'s'}</span></div>
        <div class="confirm-summary-row"><span class="label">Delivery</span><span class="value">${state.delivery === 'express' ? 'Express · Lagos' : state.delivery === 'pickup' ? 'Self Pickup' : 'Free · Same-day'}</span></div>
        <div class="confirm-summary-row"><span class="label">Payment</span><span class="value">${methodLabels[state.payment.method]}</span></div>
        <div class="confirm-summary-row"><span class="label">Total Paid</span><span class="value success">${formatNGN(total)}</span></div>
      </div>

      <div class="next-steps">
        <h4>What happens next?</h4>
        <div class="next-step">
          <div class="next-step-num">1</div>
          <div><strong>Order Confirmation</strong><p>You'll get a confirmation message in the next few minutes.</p></div>
        </div>
        <div class="next-step">
          <div class="next-step-num">2</div>
          <div><strong>We Prepare Your Order</strong><p>Our team is packaging your products with care.</p></div>
        </div>
        <div class="next-step">
          <div class="next-step-num">3</div>
          <div><strong>Out for Delivery</strong><p>You'll get a WhatsApp message when our rider is on the way.</p></div>
        </div>
      </div>

      <div class="confirm-actions">
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I just placed order ' + state.orderId)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-block">💬 Track on WhatsApp</a>
        <button class="btn btn-secondary btn-block" onclick="finishCheckout()">Continue Shopping</button>
      </div>
    </div>
  `;
  footer.innerHTML = '';
}

function finishCheckout() {
  // Clear cart
  state.cart = [];
  saveCart();
  updateCartBadge();
  state.checkoutStep = 0;
  state.orderId = null;
  closeCheckout();
  navigate('home');
}

// ─── Scan screen ──────────────────────────────────────────────
function exitScan() {
  navigate('home');
}

// On scan page load, after delay, route to product
function handleScanFlow() {
  if (parseRoute().type === 'scan') {
    // Update status text after 1.5s
    setTimeout(() => {
      const statusText = document.getElementById('scanStatusText');
      if (statusText) statusText.textContent = '✓ Detected — opening product page';
    }, 1500);
    // Navigate to product after 2.5s
    setTimeout(() => {
      window.location.hash = '#/product/lf280k-3v2-280ah';
    }, 2500);
  }
}

// ─── Init ─────────────────────────────────────────────────────
window.addEventListener('hashchange', handleRoute);
window.addEventListener('hashchange', handleScanFlow);
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  handleRoute();
  handleScanFlow();
  // Close menu when nav link clicked
  document.addEventListener('click', e => {
    if (e.target.closest('.mobile-nav-link, .cat-chip')) {
      setTimeout(closeMenu, 100);
    }
  });
  // ESC key closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu();
      closeCart();
      // Don't auto-close checkout (user might lose data)
    }
  });
});
