# Muganiyaa-Mobiles — Frontend Demo Web Application

A modern, responsive, high-performance **catalogue and service enquiry web platform** built for **Muganiyaa-Mobiles**, an electronics and telecom retail shop offering smartphones, accessories, home appliances, device repairs, and SIM/recharge services.

This project is a **100% frontend-only client presentation demo**. It runs entirely in the browser without requiring a live backend, database server, or external API keys, while providing realistic interactions, full persistence, and an interactive CMS admin panel.

---

## 🌟 Key Highlights & Architectural Features

- **Catalogue & Enquiry Focused:** Designed specifically as an enquiry-driven platform — **No shopping cart**, **no online payments**, and **no customer registration**.
- **Slide-Out Wishlist Drawer:** Customer wishlist opens gracefully from the right edge with a live counter badge, persists selections across page refreshes via `localStorage`, and provides direct WhatsApp prefilled enquiry links.
- **Multi-Variant Product Details:** Real-time RAM/Storage selection, color swatches, dynamic price and stock status calculation, photo gallery with interactive zoom preview, category-specific tech specs, and matching promotional offers.
- **Local Persistence Architecture:**
  - `localStorage` for products catalogue, banners, active offers, contact settings, enquiries, and wishlist IDs.
  - `IndexedDB` (`muganiyaa_db` / `product_images`) for uploaded product images to bypass browser 5MB `localStorage` limits.
  - Reset to Default Seed Data anytime with a single click in the Admin settings.
- **Simulated "Muganiyaa Assistant" Chatbot:**
  - Offline NLP search engine that matches customer queries against live catalogue inventory, active discounts, repair estimates, and contact details.
  - Renders rich, interactive, clickable product cards directly inside the chat window.
- **Comprehensive Shop Owner CMS Admin Panel (`/admin`):**
  - Protected route with 1-click demo login (`admin` / `admin123`).
  - **8-Tab Product Editor:** Basic info, Media/Image uploader, Multi-color & RAM/Storage variants with custom pricing, Category specs, Key highlights, Linked offers, and Visibility toggle (Active/Draft/Featured).
  - **Enquiry Manager:** View contact messages, repair service requests, change repair stages (`Received` ➔ `Diagnosing` ➔ `In Repair` ➔ `Ready for Pickup` ➔ `Delivered`), and save internal staff notes.
  - **Offer & Hero Banner Manager:** Schedule discounts, bank offers, and homepage carousel slides.
  - **Services & Content Manager:** Edit repair service cards, telecom perks, and store policies.
- **Brand System:**
  - Primary Crimson Red: `#B72E35`
  - Deep Hover Red: `#96232A`
  - Soft Blush Tint: `#FBECE9`
  - Charcoal Text: `#29252A`
  - Warm White / Off-white: `#FAF7F7` & `#FFFFFF`
  - Google Font: **Manrope**

---

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/) with Rolldown manual chunk splitting
- **Routing:** [React Router DOM v7](https://reactrouter.com/) (configured with `HashRouter` for zero-config GitHub Pages compatibility)
- **UI & Layout:** [Bootstrap 5](https://getbootstrap.com/) Grid & Utilities + Handcrafted CSS Custom Properties
- **Icons:** [Lucide React](https://lucide.dev/)
- **Storage:** Browser `localStorage` + HTML5 `IndexedDB` API

---

## 📁 Project Structure

```text
Muganiyaa-Demo/
├── public/
│   ├── favicon.svg             # Custom crimson brand favicon
│   └── 404.html                # SPA redirect handler for static hosts
├── src/
│   ├── components/
│   │   ├── BrandLogo.jsx       # Reusable SVG brand icon & wordmark
│   │   ├── FloatingActions.jsx # Floating quick-actions & simulated AI Chatbot
│   │   ├── Footer.jsx          # Rich store footer with links & operating hours
│   │   ├── Header.jsx          # Top announcement bar with live phone/WhatsApp
│   │   ├── Navbar.jsx          # Main navigation bar with sticky wishlist badge
│   │   ├── ProductCard.jsx     # Reusable card with stock status & wishlist toggle
│   │   └── WishlistDrawer.jsx  # Slide-over right drawer with direct enquiry links
│   ├── context/
│   │   ├── AuthContext.jsx     # Admin session authentication state
│   │   ├── DataContext.jsx     # Centralized reactive catalogue, offers, & enquiries
│   │   └── WishlistContext.jsx # Customer wishlist ID store with localStorage sync
│   ├── pages/
│   │   ├── AboutPage.jsx       # Store background, customer promise, & team
│   │   ├── CategoriesPage.jsx  # Multi-category catalogue with price filter
│   │   ├── ContactPage.jsx     # Store location, interactive enquiry form, & map
│   │   ├── HomePage.jsx        # Hero carousel, launches, services, & reviews
│   │   ├── MobilesPage.jsx     # Dedicated mobile phone catalogue with filters
│   │   ├── PrivacyPage.jsx     # Customer privacy and store policy
│   │   ├── ProductDetailsPage.jsx # Multi-variant gallery & specifications
│   │   └── admin/
│   │       ├── AdminBanners.jsx      # Hero banner management
│   │       ├── AdminCategories.jsx   # Category listing & icon editor
│   │       ├── AdminChatbot.jsx      # Chatbot FAQ and preset management
│   │       ├── AdminContact.jsx      # Store address, phone, WhatsApp settings
│   │       ├── AdminContent.jsx      # About and policy text editor
│   │       ├── AdminDashboard.jsx    # Overview metrics & recent activity
│   │       ├── AdminDemoSettings.jsx # 1-click restore default demo catalogue
│   │       ├── AdminEnquiries.jsx    # Customer enquiries & repair stage tracker
│   │       ├── AdminLayout.jsx       # Admin sidebar & header layout
│   │       ├── AdminLoginPage.jsx    # Owner authentication screen
│   │       ├── AdminOffers.jsx       # Festive and bank discount editor
│   │       ├── AdminProductEditor.jsx# 8-tab comprehensive product CMS editor
│   │       ├── AdminProducts.jsx     # Inventory table with search & bulk actions
│   │       └── AdminServices.jsx     # Repair and telecom service cards
│   ├── services/
│   │   ├── chatbotService.js   # Offline keyword & intent matcher engine
│   │   ├── indexedDbService.js # High-capacity image blob storage
│   │   ├── seedData.js         # Comprehensive retail catalog (phones, appliances, etc.)
│   │   └── storageService.js   # Versioned localStorage abstraction layer
│   ├── App.jsx                 # Routes configuration (public & protected admin)
│   ├── index.css               # Brand variables, modern UI components, animations
│   └── main.jsx                # Application root mounting
├── index.html                  # HTML entry point with Manrope font links
├── package.json                # Dependencies and scripts
└── vite.config.js              # Vite configuration with chunk optimization
```

---

## 💻 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes bundled with Node.js)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Karuppasamy-Arumugam/muganiya-mobiles-demo.git
cd muganiya-mobiles-demo
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The app will launch at `http://localhost:5173/`. Open it in any modern browser.

### 4. Build for Production
```bash
npm run build
```
This produces an optimized, minified production build in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🔐 Admin Panel Access

The administrative dashboard allows the shop owner to manage inventory, change banners, review enquiries, and update business contact details.

- **URL:** `http://localhost:5173/#/admin/login` (or click **Owner Portal** in the website footer).
- **Demo Username:** `admin`
- **Demo Password:** `admin123`
- **Quick Access:** Click the **"Fill Demo Credentials"** button on the login screen for instant 1-click access.

---

## 💬 Testing Customer Enquiries & WhatsApp Flow

1. Browse to any product (e.g. *Samsung Galaxy S24 Ultra* or *Prestige Induction Cooktop*).
2. Click **"Enquire on WhatsApp"**: A WhatsApp link opens with the exact item name, variant, and store contact pre-populated.
3. Open the **Contact** or **Services** page and submit an enquiry form.
4. Log into the **Admin Panel** ➔ Navigate to **Customer Enquiries** to see your submitted message instantly.
5. Update the repair stage or add internal staff notes.

---

## 🔮 Future Production Architecture & Backend Migration

When transforming this demo into a production backend-backed system, follow this recommended roadmap:

### 1. Recommended Backend Stack
- **API Framework:** Django REST Framework (Python) or Express / Nest.js (Node.js/TypeScript)
- **Database:** PostgreSQL (for relational data: products, variants, orders, customer logs)
- **Cache & Message Broker:** Redis (for session management and rate limiting)
- **Media Storage:** Cloudinary or AWS S3 (for product photos and banner assets)

### 2. Live AI Chatbot Integration (Groq / Gemini)
To replace the offline simulated chatbot with a production LLM agent:
1. Create a backend proxy endpoint `/api/chat/` to keep API keys secure.
2. Initialize Groq (`llama-3.3-70b-versatile`) or Google Gemini (`gemini-2.5-flash`).
3. Inject shop catalogue context and operating policies into the system prompt.
4. Stream responses back via Server-Sent Events (SSE).

### 3. Real-Time Customer Notifications
- Use **Twilio WhatsApp Business API** or **Gupshup** to trigger automated WhatsApp receipts when a customer registers a repair enquiry.
- Webhook updates to notify customers when repair status moves to `Ready for Pickup`.

---

## 📄 License

This project is proprietary and created for presentation and demonstration purposes for **Muganiyaa-Mobiles**.
