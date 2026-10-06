# XteInk Lover — Used Goods Marketplace

> A fast, beautiful, static website to sell pre-loved items — hosted free on **GitHub Pages**.

**No database. No backend. Pure HTML + CSS + JavaScript.**

---

## 🚀 Live Demo

🌐 [https://YOUR-USERNAME.github.io/xteink-lover/](https://YOUR-USERNAME.github.io/xteink-lover/)

---

## 📁 Project Structure

```
xteink-lover/
│
├── index.html                    ← Homepage (all listings + filters)
│
├── assets/
│   ├── css/style.css             ← All styles (design system)
│   ├── js/
│   │   ├── products.js           ← 🔑 PRODUCT DATA — edit this!
│   │   └── app.js                ← Shared logic (header, footer, search, popup)
│   └── img/
│       ├── logo.jpg
│       └── placeholder.svg
│
├── categories/
│   ├── electronics/index.html    ← Category pages
│   ├── fashion/index.html
│   ├── books/index.html
│   ├── home/index.html
│   └── hobbies/index.html
│
├── products/
│   └── electronics/
│       └── iphone-12-blue/
│           ├── index.html        ← Product detail page
│           └── images/
│               ├── thumb.jpg     ← Main/thumbnail image
│               ├── back.jpg
│               └── side.jpg
│
└── _TEMPLATE_product/
    └── index.html                ← Copy this for every new product
```

---

## ➕ How to Add a New Product

### Step 1 — Add product data to `assets/js/products.js`

Open `products.js` and add a new entry to the `PRODUCTS` array:

```js
{
  id: "elec-003",                // unique ID
  slug: "samsung-galaxy-s22",   // URL-safe, matches your folder name
  name: "Samsung Galaxy S22",
  category: "electronics",      // must match a CATEGORIES slug
  price: 320,
  currency: "$",
  condition: "Like New",        // "Like New" | "Good" | "Fair"
  thumb: "products/electronics/samsung-galaxy-s22/images/thumb.jpg",
  images: [
    "products/electronics/samsung-galaxy-s22/images/thumb.jpg",
    "products/electronics/samsung-galaxy-s22/images/back.jpg",
  ],
  tags: ["samsung", "galaxy", "s22", "android", "phone"],
  sold: false,
  featured: true,
  date: "2026-10-06",
},
```

### Step 2 — Create the product folder and page

```
products/electronics/samsung-galaxy-s22/
├── index.html    ← Copy from _TEMPLATE_product/index.html
└── images/
    ├── thumb.jpg  ← Used as card thumbnail (rename exactly)
    └── back.jpg
```

### Step 3 — Edit the product page

Open the new `index.html` and:
- Update `PRODUCT_SLUG` and `PRODUCT_CATEGORY` in the `<script>` tag
- Fill in the breadcrumb, title, description, and contact links
- The price updates automatically from `products.js`

### Step 4 — Mark as Sold

When an item sells, just open `products.js` and set `sold: true`. It disappears from all listings automatically.

---

## 🌐 Publishing to GitHub Pages

1. Create a GitHub repo named `xteink-lover` (or any name)
2. Push this folder to the `main` branch
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your site is live at `https://YOUR-USERNAME.github.io/xteink-lover/`

---

## ⚙️ Site Configuration

Everything is in `assets/js/products.js` → `SITE_CONFIG`:

```js
const SITE_CONFIG = {
  name: "XteInk Lover",           // ← Your shop name
  tagline: "Curated Pre-loved Finds",
  contact: {
    whatsapp: "+1234567890",      // ← Your WhatsApp number
    email: "hello@example.com",   // ← Your email
  },
  popup: {
    enabled: true,
    title: "Welcome!",            // ← Popup title
    body: `Your message here`,    // ← Popup body text
    ...
  }
};
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔍 Live Search | Real-time dropdown as you type |
| 🗂️ Categories | Sidebar filter + dedicated category pages |
| 💰 Price Filter | Min/max price range |
| ✅ Condition Filter | Like New / Good / Fair |
| 🔃 Sort | Featured / Price / Newest |
| 🖼️ Image Gallery | Main photo + clickable thumbnails |
| 💬 Contact | WhatsApp + Email links per product |
| 🎉 Popup | One-time welcome popup (session-based) |
| 📱 Responsive | Mobile, tablet, desktop |
| ♿ Accessible | ARIA labels, semantic HTML, keyboard nav |
| 🚀 GitHub Pages | Zero cost, zero backend |

---

*Made with ♥ by XteInk Lover*
