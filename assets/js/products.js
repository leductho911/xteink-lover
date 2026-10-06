/**
 * products.js — Central product data registry
 * Add all products here. Each product page reads from this file.
 * 
 * HOW TO ADD A PRODUCT:
 * 1. Add an entry to the PRODUCTS array below
 * 2. Create: products/{category}/{slug}/index.html
 * 3. Add images to: products/{category}/{slug}/images/
 */

const SITE_CONFIG = {
  name: "XteInk Lover",
  tagline: "Curated Pre-loved Finds",

  /**
   * "Shop Now" button destination — change this to your store/link:
   * Examples:
   *   Shopee  : "https://shopee.vn/your-shop"
   *   Facebook: "https://facebook.com/your-page"
   *   Carousell: "https://carousell.com/your-profile"
   *   Any link: "https://example.com"
   */
  shopNowUrl: "https://shopee.vn/your-shop", // ← Change this!

  popup: {
    enabled: true,
    // Set to null to always show; or set a key like "promo-oct-2026"
    // so it only shows once per browser session per key.
    cookieKey: "popup-oct-2026",
    icon: "🎉",
    title: "Welcome to XteInk Lover!",
    body: `We sell carefully inspected, pre-loved items at honest prices. 
All products are described accurately — what you see is what you get. 
Browse our collection and feel free to message us for more details!`,
    primaryBtn: "Browse Products",
    ghostBtn: "Remind me later",
  }
};

/**
 * CATEGORIES — icon (emoji), label, slug (matches folder name)
 */
const CATEGORIES = [
  { slug: "all",         icon: "✦",  label: "All Items" },
  { slug: "electronics", icon: "📱", label: "Electronics" },
  { slug: "fashion",     icon: "👗", label: "Fashion" },
  { slug: "books",       icon: "📚", label: "Books" },
  { slug: "home",        icon: "🏠", label: "Home & Living" },
  { slug: "hobbies",     icon: "🎮", label: "Hobbies" },
];

/**
 * PRODUCTS — full product catalogue
 * 
 * Fields:
 *   id        : unique string ID
 *   slug      : URL-safe name (matches folder: products/category/slug/)
 *   name      : display name
 *   category  : must match a CATEGORIES slug (not "all")
 *   price     : number (in your currency)
 *   currency  : "$" | "₫" | "€" etc.
 *   condition : "Like New" | "Good" | "Fair"
 *   thumb     : relative path to thumbnail image (from site root)
 *   images    : array of image paths shown in the gallery
 *   tags      : array of keyword strings for search
 *   sold      : true/false — marks as sold, removes from active listings
 *   featured  : true/false — shown first
 *   date      : "YYYY-MM-DD" listing date
 */
const PRODUCTS = [

  // ── ELECTRONICS ──────────────────────────
  {
    id: "elec-001",
    slug: "iphone-12-blue",
    name: "iPhone 12 – Blue 64GB",
    category: "electronics",
    price: 280,
    currency: "$",
    condition: "Good",
    thumb: "products/electronics/iphone-12-blue/images/thumb.jpg",
    images: [
      "products/electronics/iphone-12-blue/images/thumb.jpg",
      "products/electronics/iphone-12-blue/images/back.jpg",
      "products/electronics/iphone-12-blue/images/side.jpg",
    ],
    tags: ["iphone", "apple", "phone", "smartphone", "blue", "12"],
    sold: false,
    featured: true,
    date: "2026-10-01",
  },
  {
    id: "elec-002",
    slug: "airpods-pro-gen2",
    name: "AirPods Pro 2nd Gen",
    category: "electronics",
    price: 150,
    currency: "$",
    condition: "Like New",
    thumb: "products/electronics/airpods-pro-gen2/images/thumb.jpg",
    images: [
      "products/electronics/airpods-pro-gen2/images/thumb.jpg",
      "products/electronics/airpods-pro-gen2/images/open.jpg",
    ],
    tags: ["airpods", "apple", "earbuds", "wireless", "audio"],
    sold: false,
    featured: false,
    date: "2026-10-03",
  },

  // ── FASHION ──────────────────────────────
  {
    id: "fash-001",
    slug: "vintage-denim-jacket",
    name: "Vintage Denim Jacket – Size M",
    category: "fashion",
    price: 35,
    currency: "$",
    condition: "Good",
    thumb: "products/fashion/vintage-denim-jacket/images/thumb.jpg",
    images: [
      "products/fashion/vintage-denim-jacket/images/thumb.jpg",
      "products/fashion/vintage-denim-jacket/images/back.jpg",
    ],
    tags: ["denim", "jacket", "vintage", "clothing", "men", "women"],
    sold: false,
    featured: true,
    date: "2026-09-28",
  },

  // ── BOOKS ────────────────────────────────
  {
    id: "book-001",
    slug: "atomic-habits",
    name: "Atomic Habits – James Clear",
    category: "books",
    price: 8,
    currency: "$",
    condition: "Like New",
    thumb: "products/books/atomic-habits/images/thumb.jpg",
    images: [
      "products/books/atomic-habits/images/thumb.jpg",
    ],
    tags: ["atomic habits", "james clear", "self help", "book", "habits"],
    sold: false,
    featured: false,
    date: "2026-09-20",
  },

  // ── HOME & LIVING ─────────────────────────
  {
    id: "home-001",
    slug: "philips-air-fryer",
    name: "Philips Air Fryer 4.1L",
    category: "home",
    price: 55,
    currency: "$",
    condition: "Good",
    thumb: "products/home/philips-air-fryer/images/thumb.jpg",
    images: [
      "products/home/philips-air-fryer/images/thumb.jpg",
      "products/home/philips-air-fryer/images/top.jpg",
    ],
    tags: ["air fryer", "philips", "kitchen", "cooking", "appliance"],
    sold: false,
    featured: false,
    date: "2026-10-02",
  },

];

/* ── Helpers used by other pages ──────────────── */

/** Format price with currency symbol */
function formatPrice(product) {
  return `${product.currency}${product.price.toLocaleString()}`;
}

/** Condition → badge CSS class */
function conditionClass(condition) {
  const map = { "Like New": "badge-new", "Good": "badge-good", "Fair": "badge-fair" };
  return map[condition] || "badge-fair";
}

/** Get products by category slug (or all) */
function getProducts(catSlug = "all", { onlyActive = true } = {}) {
  let list = onlyActive ? PRODUCTS.filter(p => !p.sold) : PRODUCTS;
  if (catSlug !== "all") list = list.filter(p => p.category === catSlug);
  return list;
}

/** Get a single product by its slug */
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

/** Search products by query string */
function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(p => {
    if (p.sold) return false;
    const hay = [p.name, p.category, p.condition, ...(p.tags || [])].join(" ").toLowerCase();
    return hay.includes(q);
  });
}
