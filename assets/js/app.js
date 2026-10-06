/**
 * app.js — Shared UI logic loaded on every page
 * Handles: header, popup, search dropdown
 */

/* ══════════════════════════════════════════════
   HEADER — inject into every page
   ══════════════════════════════════════════════ */
function buildHeader(activePage) {
  const root = getRootPath();
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = `
    <div class="header-inner">
      <a href="${root}index.html" class="site-logo" id="logo-link">
        <img src="${root}assets/img/logo.jpg" alt="${SITE_CONFIG.name} logo">
        <span class="logo-text">${SITE_CONFIG.name}</span>
      </a>

      <div class="header-search">
        <input
          type="search"
          id="header-search-input"
          placeholder="Search products…"
          autocomplete="off"
          aria-label="Search products"
        >
        <span class="search-icon">🔍</span>
        <div id="search-results-dropdown"></div>
      </div>

      <nav class="header-nav" aria-label="Main navigation">
        <a href="${root}index.html"
           class="nav-link ${activePage === 'home' ? 'active' : ''}"
           id="nav-home">Home</a>
        ${CATEGORIES.filter(c => c.slug !== 'all').map(c =>
          `<a href="${root}categories/${c.slug}/index.html"
              class="nav-link ${activePage === c.slug ? 'active' : ''}"
              id="nav-${c.slug}">${c.icon} ${c.label}</a>`
        ).join('')}
        <a href="${SITE_CONFIG.shopNowUrl}"
           target="_blank"
           rel="noopener"
           class="nav-link cta"
           id="nav-shop-now">🛒 Shop Now</a>
      </nav>
    </div>
  `;
  initSearchDropdown();
}

/* ══════════════════════════════════════════════
   FOOTER — inject into every page
   ══════════════════════════════════════════════ */
function buildFooter() {
  const root = getRootPath();
  const el = document.getElementById('site-footer');
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="${root}index.html" class="site-logo" id="footer-logo">
          <img src="${root}assets/img/logo.jpg" alt="${SITE_CONFIG.name} logo">
          <span class="logo-text">${SITE_CONFIG.name}</span>
        </a>
        <p class="footer-desc">
          ${SITE_CONFIG.tagline}. Quality pre-loved items, honestly described,
          fairly priced. Browse our curated collection today.
        </p>
      </div>

      <div class="footer-col">
        <h5>Categories</h5>
        <ul>
          ${CATEGORIES.filter(c => c.slug !== 'all').map(c =>
            `<li><a href="${root}categories/${c.slug}/index.html" id="footer-cat-${c.slug}">${c.icon} ${c.label}</a></li>`
          ).join('')}
        </ul>
      </div>

      <div class="footer-col">
        <h5>Quick Links</h5>
        <ul>
          <li><a href="${SITE_CONFIG.shopNowUrl}" target="_blank" rel="noopener" id="footer-shop-now">🛒 Shop Now</a></li>
          <li><a href="${root}index.html" id="footer-all">📦 All Listings</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© ${year} ${SITE_CONFIG.name}. All rights reserved.</span>
      <span>Made with ♥ · Hosted on GitHub Pages</span>
    </div>
  `;
}

/* ══════════════════════════════════════════════
   GLOBAL POPUP
   ══════════════════════════════════════════════ */
function initPopup() {
  const cfg = SITE_CONFIG.popup;
  if (!cfg.enabled) return;

  // Check if already dismissed this session
  if (cfg.cookieKey) {
    const seen = sessionStorage.getItem(cfg.cookieKey);
    if (seen) return;
  }

  const el = document.getElementById('global-popup');
  if (!el) return;

  el.innerHTML = `
    <div class="popup-box" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <button class="popup-close" id="popup-close-btn" aria-label="Close popup">✕</button>
      <div class="popup-icon">${cfg.icon}</div>
      <h2 id="popup-title">${cfg.title}</h2>
      <p>${cfg.body.replace(/\n/g, '<br>')}</p>
      <div class="popup-actions">
        <button class="popup-btn-primary" id="popup-primary-btn">${cfg.primaryBtn}</button>
        <button class="popup-btn-ghost"   id="popup-ghost-btn">${cfg.ghostBtn}</button>
      </div>
    </div>
  `;

  // Show after short delay
  setTimeout(() => el.classList.add('open'), 700);

  function closePopup() {
    el.classList.remove('open');
    if (cfg.cookieKey) sessionStorage.setItem(cfg.cookieKey, '1');
  }

  el.querySelector('#popup-close-btn').addEventListener('click', closePopup);
  el.querySelector('#popup-ghost-btn').addEventListener('click', closePopup);
  el.querySelector('#popup-primary-btn').addEventListener('click', closePopup);
  el.addEventListener('click', e => { if (e.target === el) closePopup(); });
}

/* ══════════════════════════════════════════════
   LIVE SEARCH DROPDOWN
   ══════════════════════════════════════════════ */
function initSearchDropdown() {
  const input = document.getElementById('header-search-input');
  const dropdown = document.getElementById('search-results-dropdown');
  if (!input || !dropdown) return;

  const root = getRootPath();
  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim();
      if (q.length < 2) { dropdown.classList.remove('open'); return; }

      const results = searchProducts(q).slice(0, 8);
      if (results.length === 0) {
        dropdown.innerHTML = `<div class="search-no-result">No results for "<strong>${escHtml(q)}</strong>"</div>`;
      } else {
        dropdown.innerHTML = results.map(p => `
          <div class="search-result-item" onclick="location.href='${root}products/${p.category}/${p.slug}/index.html'" id="sri-${p.id}">
            <img src="${root}${p.thumb}" alt="${escHtml(p.name)}" onerror="this.src='${root}assets/img/placeholder.svg'">
            <div class="sri-info">
              <div class="sri-name">${escHtml(p.name)}</div>
              <div class="sri-cat">${getCategoryLabel(p.category)}</div>
            </div>
            <span class="sri-price">${formatPrice(p)}</span>
          </div>
        `).join('');
      }
      dropdown.classList.add('open');
    }, 200);
  });

  // Allow pressing Enter to go to a search results page (future feature)
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { dropdown.classList.remove('open'); input.blur(); }
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}

/* ══════════════════════════════════════════════
   PRODUCT CARD BUILDER
   ══════════════════════════════════════════════ */
function buildProductCard(product, rootPath = '') {
  const root = rootPath || getRootPath();
  const condBadge = conditionClass(product.condition);
  const badgeLabel = product.sold ? 'Sold' : product.condition;
  const badgeClass = product.sold ? 'badge-sold' : condBadge;
  const href = `${root}products/${product.category}/${product.slug}/index.html`;

  return `
    <article class="product-card" onclick="location.href='${href}'" id="card-${product.id}" aria-label="${escHtml(product.name)}">
      <div class="card-img-wrap">
        <img
          src="${root}${product.thumb}"
          alt="${escHtml(product.name)}"
          loading="lazy"
          onerror="this.src='${root}assets/img/placeholder.svg'"
        >
        <span class="card-badge ${badgeClass}">${badgeLabel}</span>
      </div>
      <div class="card-body">
        <span class="card-cat">${getCategoryLabel(product.category)}</span>
        <h3 class="card-name">${escHtml(product.name)}</h3>
      </div>
      <div class="card-footer">
        <span class="card-price">${formatPrice(product)}</span>
        <span class="card-view-btn">View →</span>
      </div>
    </article>
  `;
}

/* ══════════════════════════════════════════════
   UTILITIES
   ══════════════════════════════════════════════ */

/** Escape HTML entities */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Get category label from slug */
function getCategoryLabel(slug) {
  const cat = CATEGORIES.find(c => c.slug === slug);
  return cat ? `${cat.icon} ${cat.label}` : slug;
}

/**
 * Calculate the path prefix back to site root.
 * Works for any depth: ../../ for products/cat/slug/
 */
function getRootPath() {
  // Count depth from location.pathname
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length - 1;
  // For GitHub Pages: strip leading /repo-name/ segment
  // Simple heuristic: count segments after initial slash
  const parts = path.replace(/^\//, '').split('/').filter(Boolean);
  // Remove the filename (index.html or empty)
  const dirs = parts[parts.length - 1].includes('.') ? parts.slice(0, -1) : parts;
  if (dirs.length === 0) return './';
  return dirs.map(() => '../').join('');
}

/** Format date string nicely */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ══════════════════════════════════════════════
   INIT — called by every page's DOMContentLoaded
   ══════════════════════════════════════════════ */
function initPage(activePage) {
  buildHeader(activePage);
  buildFooter();
  initPopup();
}
