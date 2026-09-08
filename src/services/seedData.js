// Seed Data for Muganiyaa-Mobiles
// Version: 1.0.0
// Seed contains authentic product definitions, categories, brands, offers, and settings.

// SVG Placeholder generator for crisp, self-contained product graphics
export function generateProductSvg(title, brand, color = '#B72E35') {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <rect width="100%" height="100%" fill="%23FAF7F7" rx="16"/>
    <rect x="20" y="20" width="360" height="360" fill="%23FFFFFF" rx="12" stroke="%23EADFE1" stroke-width="1.5"/>
    <circle cx="200" cy="170" r="85" fill="${encodeURIComponent(color)}" opacity="0.08"/>
    <rect x="135" y="80" width="130" height="210" rx="20" fill="%23FFFFFF" stroke="${encodeURIComponent(color)}" stroke-width="4"/>
    <rect x="145" y="95" width="110" height="170" rx="8" fill="${encodeURIComponent(color)}" opacity="0.12"/>
    <circle cx="200" cy="275" r="7" fill="${encodeURIComponent(color)}" opacity="0.5"/>
    <rect x="180" y="87" width="40" height="4" rx="2" fill="${encodeURIComponent(color)}" opacity="0.5"/>
    <text x="200" y="325" font-family="sans-serif" font-size="14" font-weight="700" fill="%23B72E35" text-anchor="middle" letter-spacing="1">${encodeURIComponent(brand.toUpperCase())}</text>
    <text x="200" y="350" font-family="sans-serif" font-size="13" font-weight="500" fill="%2329252A" text-anchor="middle">${encodeURIComponent(title.length > 30 ? title.substring(0, 27) + '...' : title)}</text>
  </svg>`;
}

export const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Mobile Phones', slug: 'mobiles', icon: 'Smartphone', count: 16 },
  { id: 'cat-2', name: 'Tablets', slug: 'tablets', icon: 'Tablet', count: 2 },
  { id: 'cat-3', name: 'Watches', slug: 'watches', icon: 'Watch', count: 2 },
  { id: 'cat-4', name: 'Audio', slug: 'audio', icon: 'Headphones', count: 6 },
  { id: 'cat-5', name: 'Charging & Power', slug: 'charging-power', icon: 'Zap', count: 3 },
  { id: 'cat-6', name: 'Storage', slug: 'storage', icon: 'HardDrive', count: 2 },
  { id: 'cat-7', name: 'Phone Protection', slug: 'phone-protection', icon: 'Shield', count: 2 },
  { id: 'cat-8', name: 'TVs', slug: 'tvs', icon: 'Tv', count: 2 },
  { id: 'cat-9', name: 'Cooling Appliances', slug: 'cooling-appliances', icon: 'Wind', count: 3 },
  { id: 'cat-10', name: 'Kitchen Appliances', slug: 'kitchen-appliances', icon: 'Flame', count: 5 },
  { id: 'cat-11', name: 'Home & Personal Care', slug: 'home-personal-care', icon: 'Sparkles', count: 3 },
  { id: 'cat-12', name: 'SIM Cards', slug: 'sim-cards', icon: 'Radio', count: 3 }
];

export const MOBILE_BRANDS = [
  'All Brands',
  'Samsung',
  'vivo',
  'OPPO',
  'OnePlus',
  'realme',
  'Redmi',
  'POCO',
  'Apple',
  'Motorola',
  'Nothing',
  'TECNO',
  'Lava',
  'itel',
  'Nokia',
  'HMD',
  'Saregama Carvaan'
];

export const INITIAL_PRODUCTS = [
  // 1. Samsung Galaxy S24 5G
  {
    id: 'prod-s24',
    slug: 'samsung-galaxy-s24-5g',
    name: 'Samsung Galaxy S24 5G',
    model: 'SM-S921B',
    brand: 'Samsung',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Galaxy AI is here - Flagship Compact Performance',
    description: 'Experience the next era of mobile intelligence with Galaxy AI. Features a 6.2" Dynamic AMOLED 2X 120Hz display, armor aluminum frame, flagship 50MP triple camera system, and all-day intelligent battery.',
    coverImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#1C1C1E' },
      { name: 'Marble Gray', hex: '#E5E5EA' },
      { name: 'Amber Yellow', hex: '#F6D268' },
      { name: 'Cobalt Violet', hex: '#4B3F72' }
    ],
    ramOptions: ['8GB'],
    storageOptions: ['128GB', '256GB', '512GB'],
    variants: [
      { color: 'Onyx Black', ram: '8GB', storage: '128GB', originalPrice: 79999, sellingPrice: 74999, stockStatus: 'In Stock', sku: 'S24-BLK-128' },
      { color: 'Onyx Black', ram: '8GB', storage: '256GB', originalPrice: 89999, sellingPrice: 79999, stockStatus: 'In Stock', sku: 'S24-BLK-256' },
      { color: 'Marble Gray', ram: '8GB', storage: '256GB', originalPrice: 89999, sellingPrice: 79999, stockStatus: 'In Stock', sku: 'S24-GRY-256' },
      { color: 'Amber Yellow', ram: '8GB', storage: '512GB', originalPrice: 99999, sellingPrice: 89999, stockStatus: 'Out of Stock', sku: 'S24-YLW-512' }
    ],
    originalPrice: 79999,
    sellingPrice: 74999,
    stockStatus: 'In Stock',
    badges: ['Latest Launch', 'Best Seller', 'EMI Available'],
    offers: ['off-hdfc-2000', 'off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: true,
    isBestSeller: true,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '12MP Dual Pixel AF (f/2.2)',
      rearCamera: '50MP Main (OIS) + 12MP Ultra-Wide + 10MP Telephoto 3x (OIS)',
      cameraModes: 'Nightography, 8K Video, Astrophoto, AI Photo Assist',
      videoFeatures: '8K @ 30fps, 4K @ 60fps Super Steady, Audio Zoom',
      phoneAi: 'Circle to Search with Google, Live Call Translate, Note Assist',
      cpu: 'Exynos 2400 Deca-Core / Snapdragon 8 Gen 3',
      ramAndStorage: '8GB LPDDR5X + up to 512GB UFS 4.0',
      display: '6.2" Dynamic AMOLED 2X, FHD+ (2340 x 1080), 1-120Hz LTPO, 2600 nits',
      operatingSystem: 'One UI 6.1 based on Android 14 (7 Years OS Updates)',
      batteryCapacity: '4000 mAh',
      chargingSpeed: '25W Fast Wired Charging, Fast Wireless Charging 2.0',
      connectivity: 'Dual 5G SIM, Wi-Fi 6E, Bluetooth 5.3, NFC, Type-C 3.2',
      dimensionsWeight: '147.0 x 70.6 x 7.6 mm, 167g',
      otherFeatures: 'IP68 Water/Dust Resistance, Stereo Speakers by AKG',
      warranty: '1 Year Manufacturer Warranty for Device, 6 Months for In-Box Accessories',
      boxContents: 'Handset, USB-C to USB-C Cable, SIM Ejector Pin, Quick Start Guide'
    },
    highlights: [
      'Built-in Galaxy AI features with Circle to Search',
      'Compact 6.2-inch form factor with 2600 nits peak brightness',
      'Triple camera system with optical 3x zoom and OIS',
      '7 years of guaranteed Android OS & security updates'
    ]
  },

  // 2. vivo V30 Pro 5G
  {
    id: 'prod-v30pro',
    slug: 'vivo-v30-pro-5g',
    name: 'vivo V30 Pro 5G',
    model: 'V2319',
    brand: 'vivo',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'ZEISS Professional Portrait Camera with Studio Aura Light',
    description: 'Co-engineered with ZEISS. Features 50MP Sony IMX920 VCS true color camera, Smart Aura Light Portrait, ultra-slim 3D curved 120Hz AMOLED display, and 80W FlashCharge.',
    coverImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Andaman Blue', hex: '#2A7B9B' },
      { name: 'Classic Black', hex: '#212121' }
    ],
    ramOptions: ['8GB', '12GB'],
    storageOptions: ['256GB', '512GB'],
    variants: [
      { color: 'Andaman Blue', ram: '8GB', storage: '256GB', originalPrice: 46999, sellingPrice: 41999, stockStatus: 'In Stock', sku: 'V30P-BLU-256' },
      { color: 'Classic Black', ram: '12GB', storage: '512GB', originalPrice: 51999, sellingPrice: 46999, stockStatus: 'In Stock', sku: 'V30P-BLK-512' }
    ],
    originalPrice: 46999,
    sellingPrice: 41999,
    stockStatus: 'In Stock',
    badges: ['Partner Pick', 'Best Seller', 'EMI Available'],
    offers: ['off-hdfc-2000', 'off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '50MP Eye AF Group Selfie Camera (f/2.0)',
      rearCamera: '50MP Sony IMX920 (OIS) + 50MP ZEISS Telephoto Portrait (2x) + 50MP Ultra Wide',
      cameraModes: 'ZEISS Style Portrait, Cine-flare Portrait, Studio Aura Light',
      videoFeatures: '4K @ 60fps, Hybrid OIS+EIS Video Stabilization',
      phoneAi: 'AI Studio Portrait Light, AI Object Eraser',
      cpu: 'MediaTek Dimensity 8200 (4nm Octa-Core up to 3.1GHz)',
      ramAndStorage: 'Up to 12GB LPDDR5X + 512GB UFS 3.1 (+12GB Extended RAM)',
      display: '6.78" 1.5K 3D Curved AMOLED, 120Hz, 2800 nits peak',
      operatingSystem: 'Funtouch OS 14 based on Android 14',
      batteryCapacity: '5000 mAh',
      chargingSpeed: '80W FlashCharge (0 to 100% in 48 mins)',
      connectivity: 'Dual 5G, Wi-Fi 6, Bluetooth 5.3, NavIC',
      dimensionsWeight: '164.36 x 75.1 x 7.45 mm, 188g',
      otherFeatures: 'IP54 Splash Resistant, In-display Optical Fingerprint',
      warranty: '1 Year Brand Warranty',
      boxContents: 'Phone, 80W Charger, Type-C Cable, Transparent Case, Ejector Tool'
    },
    highlights: [
      'Triple 50MP ZEISS Professional camera setup',
      'Studio Quality Smart Aura Light with auto color temperature',
      'Ultra slim 7.45mm curved aesthetic design',
      '5000mAh battery with 80W FlashCharge in the box'
    ]
  },

  // 3. OPPO Reno11 5G
  {
    id: 'prod-reno11',
    slug: 'oppo-reno11-5g',
    name: 'OPPO Reno11 5G',
    model: 'CPH2599',
    brand: 'OPPO',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'The Portrait Expert - 32MP Telephoto Lens',
    description: 'Designed for stunning portraits with a 32MP 2x optical portrait camera with Sony sensor, 67W SUPERVOOC charging, and a natural flowing texture design.',
    coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Wave Green', hex: '#639A88' },
      { name: 'Rock Grey', hex: '#4B4D50' }
    ],
    ramOptions: ['8GB'],
    storageOptions: ['128GB', '256GB'],
    variants: [
      { color: 'Wave Green', ram: '8GB', storage: '128GB', originalPrice: 38999, sellingPrice: 27999, stockStatus: 'In Stock', sku: 'R11-GRN-128' },
      { color: 'Rock Grey', ram: '8GB', storage: '256GB', originalPrice: 41999, sellingPrice: 31999, stockStatus: 'In Stock', sku: 'R11-GRY-256' }
    ],
    originalPrice: 38999,
    sellingPrice: 27999,
    stockStatus: 'In Stock',
    badges: ['Partner Pick', 'Shop Offer'],
    offers: ['off-hdfc-2000', 'off-fest-1500'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '32MP Sony IMX709 Selfie Camera with AF',
      rearCamera: '50MP Sony LYT-600 (OIS) + 32MP Sony IMX709 Telephoto + 8MP Ultra-wide',
      cameraModes: 'Portrait Expert Engine, Ultra-Clear Portrait Mode',
      videoFeatures: '4K @ 30fps Ultra-clear Video recording',
      phoneAi: 'AI Smart Image Matting, AI Clear Voice',
      cpu: 'MediaTek Dimensity 7050 (6nm Octa-core up to 2.6GHz)',
      ramAndStorage: '8GB RAM + 128GB / 256GB Storage',
      display: '6.7" 120Hz 3D Curved AMOLED, 1.07 Billion Colors, HDR10+',
      operatingSystem: 'ColorOS 14 based on Android 14',
      batteryCapacity: '5000 mAh High-Durability Battery',
      chargingSpeed: '67W SUPERVOOC Flash Charge',
      connectivity: 'Dual 5G, Wi-Fi 6, Bluetooth 5.3, IR Remote Control',
      dimensionsWeight: '162.4 x 74.3 x 7.99 mm, 182g',
      otherFeatures: '300% Ultra Volume Mode, LinkBoost Antenna',
      warranty: '1 Year Official Warranty',
      boxContents: 'Handset, 67W Charger, USB Cable, Protective Case, Quick Guide'
    },
    highlights: [
      '32MP 2x Optical Sony Telephoto Portrait Camera',
      '67W SUPERVOOC charge - 100% in 45 minutes',
      'Ultra-thin 3D dual-curved body with satin finish',
      'LinkBoost signal enhancement technology'
    ]
  },

  // 4. Apple iPhone 15
  {
    id: 'prod-ip15',
    slug: 'apple-iphone-15',
    name: 'Apple iPhone 15',
    model: 'A3090',
    brand: 'Apple',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Dynamic Island, 48MP Main Camera and USB-C',
    description: 'Featuring Dynamic Island, an innovative 48MP Main camera with 2x Telephoto, durable color-infused glass and aluminum design, and USB-C connectivity.',
    coverImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Black', hex: '#2E3033' },
      { name: 'Blue', hex: '#D2DBE1' },
      { name: 'Pink', hex: '#F6D9DC' },
      { name: 'Green', hex: '#D6E5D8' }
    ],
    ramOptions: ['6GB'],
    storageOptions: ['128GB', '256GB'],
    variants: [
      { color: 'Black', ram: '6GB', storage: '128GB', originalPrice: 79900, sellingPrice: 70999, stockStatus: 'In Stock', sku: 'IP15-BLK-128' },
      { color: 'Blue', ram: '6GB', storage: '128GB', originalPrice: 79900, sellingPrice: 70999, stockStatus: 'In Stock', sku: 'IP15-BLU-128' },
      { color: 'Pink', ram: '6GB', storage: '256GB', originalPrice: 89900, sellingPrice: 80999, stockStatus: 'In Stock', sku: 'IP15-PNK-256' }
    ],
    originalPrice: 79900,
    sellingPrice: 70999,
    stockStatus: 'In Stock',
    badges: ['Best Seller', 'EMI Available'],
    offers: ['off-hdfc-2000', 'off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '12MP TrueDepth front camera with Autofocus and Photonic Engine',
      rearCamera: '48MP Main (Sensor-shift OIS) + 12MP Ultra Wide with 2x optical quality telephoto',
      cameraModes: 'Next-generation portraits with Focus and Depth Control, Night mode, Smart HDR 5',
      videoFeatures: '4K Cinematic mode @ 30 fps, Action mode 2.8K, HDR video recording with Dolby Vision',
      phoneAi: 'Apple Neural Engine (16-core)',
      cpu: 'A16 Bionic chip with 6-core CPU and 5-core GPU',
      ramAndStorage: '6GB RAM + 128GB / 256GB',
      display: '6.1" Super Retina XDR OLED, Dynamic Island, 2000 nits peak outdoor',
      operatingSystem: 'iOS 17 (Upgradable to latest iOS)',
      batteryCapacity: 'Up to 20 hours video playback',
      chargingSpeed: 'Up to 50% charge in 30 minutes with 20W adapter, MagSafe wireless',
      connectivity: '5G, Wi-Fi 6, Bluetooth 5.3, Ultra Wideband 2, USB-C 2.0',
      dimensionsWeight: '147.6 x 71.6 x 7.80 mm, 171g',
      otherFeatures: 'IP68 water resistant, Ceramic Shield front, Emergency SOS via satellite',
      warranty: '1 Year Apple International Warranty',
      boxContents: 'iPhone with iOS 17, USB-C Charge Cable (1m), Documentation'
    },
    highlights: [
      'Dynamic Island brings alerts and Live Activities front and center',
      '48MP Main camera with 2x Telephoto optical zoom',
      'All-day battery life and universal USB-C convenience',
      'Color-infused glass and aerospace-grade aluminum'
    ]
  },

  // 5. OnePlus Nord CE4 5G
  {
    id: 'prod-nordce4',
    slug: 'oneplus-nord-ce4-5g',
    name: 'OnePlus Nord CE4 5G',
    model: 'CPH2613',
    brand: 'OnePlus',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Fast and Smooth - 100W SUPERVOOC Power',
    description: 'Packed with Snapdragon 7 Gen 3, a massive 5500mAh battery with 100W SUPERVOOC charging, Sony LYT-600 OIS camera, and 120Hz Fluid AMOLED display.',
    coverImage: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Celadon Marble', hex: '#B2D8D8' },
      { name: 'Dark Chrome', hex: '#3B3B3B' }
    ],
    ramOptions: ['8GB'],
    storageOptions: ['128GB', '256GB'],
    variants: [
      { color: 'Celadon Marble', ram: '8GB', storage: '128GB', originalPrice: 24999, sellingPrice: 22999, stockStatus: 'In Stock', sku: 'NCE4-MAR-128' },
      { color: 'Dark Chrome', ram: '8GB', storage: '256GB', originalPrice: 26999, sellingPrice: 24999, stockStatus: 'In Stock', sku: 'NCE4-CHR-256' }
    ],
    originalPrice: 24999,
    sellingPrice: 22999,
    stockStatus: 'In Stock',
    badges: ['Latest Launch', 'EMI Available'],
    offers: ['off-bajaj-nocost', 'off-fest-1500'],
    isFeatured: true,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '16MP f/2.4 Selfie Camera',
      rearCamera: '50MP Sony LYT-600 (OIS) + 8MP Ultra Wide 112°',
      cameraModes: 'RAW HDR, Nightscape, Portrait Mode, Slow Motion',
      videoFeatures: '4K @ 30fps with Electronic Image Stabilization',
      phoneAi: 'Aqua Touch display algorithm for wet fingers',
      cpu: 'Snapdragon 7 Gen 3 (4nm Octa-core up to 2.63GHz)',
      ramAndStorage: '8GB LPDDR4X + Up to 256GB UFS 3.1 (expandable up to 1TB via microSD)',
      display: '6.7" 120Hz FHD+ AMOLED, 2160Hz PWM Dimming, HDR10+',
      operatingSystem: 'OxygenOS 14 based on Android 14',
      batteryCapacity: '5500 mAh (Largest battery in Nord history)',
      chargingSpeed: '100W SUPERVOOC (1 to 100% in 29 mins)',
      connectivity: 'Dual 5G, Wi-Fi 6, Bluetooth 5.4, microSD slot',
      dimensionsWeight: '162.5 x 75.3 x 8.4 mm, 186g',
      otherFeatures: 'Dual Stereo Speakers with Hi-Res Audio, IP54 rating',
      warranty: '1 Year Brand Warranty',
      boxContents: 'Phone, 100W Adapter, Red Cable USB-A to C, Case, SIM Tray Ejector'
    },
    highlights: [
      'Monster 5500mAh battery with 100W flash charging',
      'Snapdragon 7 Gen 3 high efficiency chipset',
      'Sony LYT-600 50MP sensor with optical image stabilization',
      'Aqua Touch technology allows smooth operation with wet hands'
    ]
  },

  // 6. realme 12 Pro+ 5G
  {
    id: 'prod-realme12p',
    slug: 'realme-12-pro-plus-5g',
    name: 'realme 12 Pro+ 5G',
    model: 'RMX3840',
    brand: 'realme',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Periscope Portrait Flagship with Luxury Watch Design',
    description: 'Co-created with luxury watch designer Ollivier Savéo. Highlights a flagship 64MP Periscope Telephoto camera with 3x optical zoom, Snapdragon 7s Gen 2, and vegan leather back.',
    coverImage: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Submarine Blue', hex: '#1C3144' },
      { name: 'Navigator Beige', hex: '#E2D4C0' }
    ],
    ramOptions: ['8GB', '12GB'],
    storageOptions: ['256GB'],
    variants: [
      { color: 'Submarine Blue', ram: '8GB', storage: '256GB', originalPrice: 34999, sellingPrice: 29999, stockStatus: 'In Stock', sku: 'R12P-BLU-256' },
      { color: 'Navigator Beige', ram: '12GB', storage: '256GB', originalPrice: 36999, sellingPrice: 31999, stockStatus: 'In Stock', sku: 'R12P-BGE-256' }
    ],
    originalPrice: 34999,
    sellingPrice: 29999,
    stockStatus: 'In Stock',
    badges: ['Best Seller', 'EMI Available'],
    offers: ['off-bajaj-nocost', 'off-hdfc-2000'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '32MP Sony Selfie Camera',
      rearCamera: '64MP Periscope Portrait (3x Optical, OIS) + 50MP Sony IMX890 (OIS) + 8MP Ultra Wide',
      cameraModes: 'Cinematic Portrait, 120x SuperZoom, Starry Night, Moon Mode',
      videoFeatures: '4K @ 30fps, Cinematic 2.39:1 Movie Mode',
      phoneAi: 'Master Camera Filters inspired by Oscar-winning cinematographers',
      cpu: 'Qualcomm Snapdragon 7s Gen 2 (4nm)',
      ramAndStorage: '8GB / 12GB RAM + 256GB Storage',
      display: '6.7" 120Hz Curved AMOLED, 2160Hz PWM Dimming, Pro-XDR',
      operatingSystem: 'realme UI 5.0 based on Android 14',
      batteryCapacity: '5000 mAh',
      chargingSpeed: '67W SUPERVOOC Charge',
      connectivity: '5G, Wi-Fi 6, Bluetooth 5.2, Dual SIM',
      dimensionsWeight: '161.47 x 74.02 x 8.75 mm, 196g',
      otherFeatures: 'Dolby Atmos Dual Speakers, Premium Vegan Leather finish',
      warranty: '1 Year Manufacturer Warranty',
      boxContents: 'Device, 67W Adapter, USB-C Cable, Transparent Case, SIM Tool'
    },
    highlights: [
      '64MP Periscope Telephoto with 3X optical and 120X SuperZoom',
      'Sony IMX890 flagship primary sensor with OIS',
      'Luxury watch fluted bezel and vegan leather design',
      'Curved 120Hz Pro-XDR display'
    ]
  },

  // 7. Redmi Note 13 Pro 5G
  {
    id: 'prod-note13p',
    slug: 'redmi-note-13-pro-5g',
    name: 'Redmi Note 13 Pro 5G',
    model: '2312DRA50G',
    brand: 'Redmi',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'SuperNote - 200MP Ultra-Clear Camera with OIS',
    description: 'Groundbreaking 200MP camera with Samsung ISOCELL HP3 sensor and OIS, 1.5K 120Hz AMOLED display with Corning Gorilla Glass Victus, and 67W Turbo Charge.',
    coverImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Arctic White', hex: '#F5F5F7' },
      { name: 'Midnight Black', hex: '#1E1E1E' },
      { name: 'Coral Purple', hex: '#B8A9C9' }
    ],
    ramOptions: ['8GB'],
    storageOptions: ['128GB', '256GB'],
    variants: [
      { color: 'Arctic White', ram: '8GB', storage: '128GB', originalPrice: 28999, sellingPrice: 24999, stockStatus: 'In Stock', sku: 'RN13P-WHT-128' },
      { color: 'Midnight Black', ram: '8GB', storage: '256GB', originalPrice: 30999, sellingPrice: 26999, stockStatus: 'In Stock', sku: 'RN13P-BLK-256' }
    ],
    originalPrice: 28999,
    sellingPrice: 24999,
    stockStatus: 'In Stock',
    badges: ['Best Seller', 'EMI Available'],
    offers: ['off-hdfc-2000', 'off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '16MP Selfie Camera with HDR',
      rearCamera: '200MP Samsung HP3 (OIS + EIS) + 8MP Ultra-Wide + 2MP Macro',
      cameraModes: '200MP Mode, In-sensor 2x/4x Lossless Zoom, FilmCamera',
      videoFeatures: '4K @ 30fps, Slow motion 1080p @ 120fps',
      phoneAi: 'Xiaomi Imaging Engine with AI Bokeh and AI Erase',
      cpu: 'Snapdragon 7s Gen 2 (4nm Octa-core up to 2.4GHz)',
      ramAndStorage: '8GB LPDDR4X + 128GB/256GB UFS 2.2',
      display: '6.67" 1.5K (2712 x 1220) 120Hz CrystalRes AMOLED, 1800 nits, Dolby Vision',
      operatingSystem: 'MIUI 14 (HyperOS ready) based on Android 13/14',
      batteryCapacity: '5100 mAh',
      chargingSpeed: '67W Turbo Charge (In-box charger)',
      connectivity: 'Dual 5G, Wi-Fi 5, Bluetooth 5.2, IR Blaster, 3.5mm Headphone Jack',
      dimensionsWeight: '161.15 x 74.24 x 7.98 mm, 187g',
      otherFeatures: 'In-screen Fingerprint with Heart Rate detection, IP54 rating',
      warranty: '1 Year Manufacturer Warranty',
      boxContents: 'Redmi Note 13 Pro 5G, 67W Charger, USB Type-C Cable, SIM Eject Tool, Case'
    },
    highlights: [
      '200MP Camera with 4x Lossless In-Sensor Optical Zoom and OIS',
      'Corning Gorilla Glass Victus with IP54 water protection',
      '1.5K 120Hz Super AMOLED with ultra-thin bezels',
      '67W Turbo Charge with 5100mAh all-day battery'
    ]
  },

  // 8. POCO X6 Pro 5G
  {
    id: 'prod-pocox6p',
    slug: 'poco-x6-pro-5g',
    name: 'POCO X6 Pro 5G',
    model: '2311DRK48G',
    brand: 'POCO',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Speed-CIES: Dimensity 8300-Ultra Beast Performance',
    description: 'Flagship MediaTek Dimensity 8300-Ultra processor with over 1.4 million AnTuTu score, 120Hz 1.5K Flow AMOLED, and 64MP OIS triple camera.',
    coverImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'POCO Yellow', hex: '#FFC72C' },
      { name: 'Racing Grey', hex: '#414141' }
    ],
    ramOptions: ['8GB', '12GB'],
    storageOptions: ['256GB', '512GB'],
    variants: [
      { color: 'POCO Yellow', ram: '8GB', storage: '256GB', originalPrice: 30999, sellingPrice: 25999, stockStatus: 'In Stock', sku: 'PX6P-YLW-256' },
      { color: 'Racing Grey', ram: '12GB', storage: '512GB', originalPrice: 34999, sellingPrice: 28999, stockStatus: 'In Stock', sku: 'PX6P-GRY-512' }
    ],
    originalPrice: 30999,
    sellingPrice: 25999,
    stockStatus: 'In Stock',
    badges: ['Latest Launch', 'EMI Available'],
    offers: ['off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '16MP front camera',
      rearCamera: '64MP Main (OIS) + 8MP Ultra-wide + 2MP Macro',
      cameraModes: 'Motion tracking focus, Night mode, Document mode',
      videoFeatures: '4K @ 30fps with dual OIS+EIS stabilization',
      phoneAi: 'WildBoost Optimization 2.0 for uninterrupted high FPS gaming',
      cpu: 'MediaTek Dimensity 8300-Ultra (4nm up to 3.35GHz)',
      ramAndStorage: 'Up to 12GB LPDDR5X + 512GB UFS 4.0 storage',
      display: '6.67" 1.5K 120Hz Flow AMOLED, 1800 nits peak, HDR10+',
      operatingSystem: 'Xiaomi HyperOS based on Android 14',
      batteryCapacity: '5000 mAh',
      chargingSpeed: '67W Turbo Charge',
      connectivity: 'Dual 5G, Wi-Fi 6, Bluetooth 5.4, IR Blaster',
      dimensionsWeight: '160.45 x 74.34 x 8.25 mm, 186g',
      otherFeatures: 'LiquidCool Technology 2.0 with 5000mm² vapor chamber',
      warranty: '1 Year Brand Warranty',
      boxContents: 'POCO X6 Pro, 67W Adapter, USB-C Cable, Protective Case, SIM Pin'
    },
    highlights: [
      'AnTuTu score exceeding 1.4 Million with Dimensity 8300-Ultra',
      'UFS 4.0 ultra-fast storage and LPDDR5X memory',
      'Flow AMOLED bezel-less screen with 1800 nits brightness',
      'Vegan leather back with signature POCO camera deco'
    ]
  },

  // 9. Motorola Edge 50 Fusion
  {
    id: 'prod-edge50f',
    slug: 'motorola-edge-50-fusion',
    name: 'Motorola Edge 50 Fusion',
    model: 'XT2429-1',
    brand: 'Motorola',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Pantone Curated Colors with 144Hz 3D Curved Screen',
    description: 'True segment-first with Sony LYTIA 700C sensor, IP68 underwater protection, 144Hz 3D curved pOLED display, and 68W TurboPower charging.',
    coverImage: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Marshmallow Blue', hex: '#6EA4BF' },
      { name: 'Hot Pink', hex: '#E0115F' }
    ],
    ramOptions: ['8GB', '12GB'],
    storageOptions: ['128GB', '256GB'],
    variants: [
      { color: 'Marshmallow Blue', ram: '8GB', storage: '128GB', originalPrice: 25999, sellingPrice: 22999, stockStatus: 'In Stock', sku: 'E50F-BLU-128' },
      { color: 'Hot Pink', ram: '12GB', storage: '256GB', originalPrice: 27999, sellingPrice: 24999, stockStatus: 'In Stock', sku: 'E50F-PNK-256' }
    ],
    originalPrice: 25999,
    sellingPrice: 22999,
    stockStatus: 'In Stock',
    badges: ['Latest Launch', 'EMI Available'],
    offers: ['off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '32MP Quad Pixel Selfie Camera with 4K video',
      rearCamera: '50MP Sony LYTIA 700C (OIS, Ultra Pixel) + 13MP Ultra-wide with Macro Vision',
      cameraModes: 'Auto Smile Capture, Portrait Mode, Night Vision, Slow Motion',
      videoFeatures: '4K UHD @ 30fps, EIS Video stabilization',
      phoneAi: 'Moto AI enhancement engine for photos and colors',
      cpu: 'Snapdragon 7s Gen 2 (4nm Octa-core)',
      ramAndStorage: '8GB / 12GB LPDDR4X + 128GB / 256GB UFS 2.2',
      display: '6.7" Endless Edge 144Hz FHD+ pOLED, 1600 nits, 10-bit Color',
      operatingSystem: 'Hello UI based on Android 14 (Clean no-bloat experience)',
      batteryCapacity: '5000 mAh',
      chargingSpeed: '68W TurboPower charging',
      connectivity: 'Dual 5G (15 5G Bands), Wi-Fi 6, Bluetooth 5.2, NFC',
      dimensionsWeight: '161.9 x 73.1 x 7.9 mm, 175g',
      otherFeatures: 'IP68 Underwater protection, Stereo speakers with Dolby Atmos',
      warranty: '1 Year Manufacturer Warranty',
      boxContents: 'Handset, 68W Charger, USB Type-C Cable, Guides, SIM Tool'
    },
    highlights: [
      'Segment first IP68 underwater and dust protection',
      'Sony LYT-700C flagship primary camera with all-pixel focus',
      'Fluid 144Hz 3D curved pOLED display with Gorilla Glass 5',
      'Clean Hello UI with zero ads or unwanted bloatware'
    ]
  },

  // 10. Nothing Phone (2a)
  {
    id: 'prod-nothing2a',
    slug: 'nothing-phone-2a',
    name: 'Nothing Phone (2a)',
    model: 'A142',
    brand: 'Nothing',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Iconic Glyph Interface with Dimensity 7200 Pro',
    description: 'Redefining mid-range design with Nothing iconic transparent back, interactive Glyph lights, dual 50MP cameras, custom Dimensity 7200 Pro chipset, and Nothing OS.',
    coverImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'White', hex: '#F0F0F0' },
      { name: 'Black', hex: '#222222' },
      { name: 'Milk', hex: '#EBE7DF' }
    ],
    ramOptions: ['8GB', '12GB'],
    storageOptions: ['128GB', '256GB'],
    variants: [
      { color: 'Black', ram: '8GB', storage: '128GB', originalPrice: 25999, sellingPrice: 23999, stockStatus: 'In Stock', sku: 'NP2A-BLK-128' },
      { color: 'White', ram: '8GB', storage: '256GB', originalPrice: 27999, sellingPrice: 25999, stockStatus: 'In Stock', sku: 'NP2A-WHT-256' },
      { color: 'Milk', ram: '12GB', storage: '256GB', originalPrice: 29999, sellingPrice: 27999, stockStatus: 'In Stock', sku: 'NP2A-MLK-256' }
    ],
    originalPrice: 25999,
    sellingPrice: 23999,
    stockStatus: 'In Stock',
    badges: ['Latest Launch', 'EMI Available'],
    offers: ['off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '32MP Sony Selfie camera',
      rearCamera: '50MP Main with OIS + 50MP Ultra-wide 114°',
      cameraModes: 'TrueLens Engine with Ultra XDR, Motion Capture, Night Mode',
      videoFeatures: '4K @ 30fps, Live HDR, Action Mode',
      phoneAi: 'Nothing OS Smart Widgets and AI wallpaper generator',
      cpu: 'MediaTek Dimensity 7200 Pro (4nm co-engineered with Nothing)',
      ramAndStorage: '8GB / 12GB RAM + Up to 256GB Storage',
      display: '6.7" Flexible 120Hz AMOLED, 1300 nits peak, 2160Hz PWM, symmetrical bezels',
      operatingSystem: 'Nothing OS 2.5 powered by Android 14',
      batteryCapacity: '5000 mAh (Nothing largest phone battery)',
      chargingSpeed: '45W Fast Charging (50% in 23 mins)',
      connectivity: 'Dual 5G, Wi-Fi 6, Bluetooth 5.3, NFC with Google Pay',
      dimensionsWeight: '161.74 x 76.32 x 8.55 mm, 190g',
      otherFeatures: '3-part Glyph Interface with custom ringtones and timer light',
      warranty: '1 Year Brand Warranty',
      boxContents: 'Nothing Phone (2a), Nothing Type-C Cable, SIM Tool, Screen Protector (Pre-applied)'
    },
    highlights: [
      'Signature Glyph Interface for visual ringtones, timers, and volume',
      'Dual 50MP rear cameras with TrueLens Engine and Ultra XDR',
      'MediaTek Dimensity 7200 Pro delivers exceptional battery efficiency',
      'Clean Nothing OS with zero bloatware and bespoke typography'
    ]
  },

  // 11. TECNO Pova 6 Pro 5G
  {
    id: 'prod-pova6p',
    slug: 'tecno-pova-6-pro-5g',
    name: 'TECNO Pova 6 Pro 5G',
    model: 'LI9',
    brand: 'TECNO',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Futuristic Mecha Design with 6000mAh Battery',
    description: 'Dynamic-Light mini LED design with 6000mAh massive battery, 70W Ultra Charge with 1% bypass charging, 108MP camera, and 120Hz AMOLED display.',
    coverImage: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Meteorite Grey', hex: '#3E3E3E' },
      { name: 'Comet Green', hex: '#2E7D32' }
    ],
    ramOptions: ['8GB', '12GB'],
    storageOptions: ['256GB'],
    variants: [
      { color: 'Meteorite Grey', ram: '8GB', storage: '256GB', originalPrice: 22999, sellingPrice: 19999, stockStatus: 'In Stock', sku: 'P6P-GRY-256' },
      { color: 'Comet Green', ram: '12GB', storage: '256GB', originalPrice: 24999, sellingPrice: 21999, stockStatus: 'In Stock', sku: 'P6P-GRN-256' }
    ],
    originalPrice: 22999,
    sellingPrice: 19999,
    stockStatus: 'In Stock',
    badges: ['Shop Offer'],
    offers: ['off-fest-1500'],
    isFeatured: false,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '32MP Ultra-clear Front Camera with Dual-color LED Flash',
      rearCamera: '108MP Ultra-sensing Main Camera with 10x In-sensor Zoom + 2MP Light Sensor',
      cameraModes: 'Super Night Mode, Dual Video, Sky Shop, Portrait Mode',
      videoFeatures: '2K Video Recording @ 30fps with EIS',
      phoneAi: 'Ella Assistant 2.0 with AI cutout and translation',
      cpu: 'MediaTek Dimensity 6080 5G (6nm)',
      ramAndStorage: '8GB / 12GB RAM (+Up to 12GB Extended) + 256GB ROM',
      display: '6.78" FHD+ 120Hz AMOLED, 1300 nits peak, 2160Hz PWM Dimming',
      operatingSystem: 'HiOS 14 based on Android 14',
      batteryCapacity: '6000 mAh Mega Battery with -20°C extreme temperature charge',
      chargingSpeed: '70W Ultra Charge (50% in 19 mins, 100% in 50 mins)',
      connectivity: 'Dual 5G, Wi-Fi 5, Bluetooth 5.3, NFC, IR Blaster',
      dimensionsWeight: '165.5 x 76.1 x 7.88 mm, 195g',
      otherFeatures: 'Dynamic-Eye mini-LED light effect, Dolby Atmos Dual Speakers',
      warranty: '1 Year Brand Warranty',
      boxContents: 'Phone, 70W Charger, Type-C Cable, Mecha Protective Case, SIM Tool'
    },
    highlights: [
      'Huge 6000mAh battery packed into a super thin 7.88mm body',
      'Dynamic-Light Mecha back with 210 customizable mini-LEDs',
      '70W Ultra Charge with smart bypass charging for cooler gaming',
      '108MP camera with 10x in-sensor zoom capability'
    ]
  },

  // 12. Lava Agni 2 5G
  {
    id: 'prod-lava-agni2',
    slug: 'lava-agni-2-5g',
    name: 'Lava Agni 2 5G',
    model: 'LXZ504',
    brand: 'Lava',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Proudly Indian - 3D Curved AMOLED & Free Home Replacement',
    description: 'Curved 120Hz AMOLED display with MediaTek Dimensity 7050 5G, 50MP quad camera, bloatware-free clean Android with zero ads, and Lava promise of Agni Mitra home service.',
    coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Glass Viridian', hex: '#1C493E' }
    ],
    ramOptions: ['8GB'],
    storageOptions: ['256GB'],
    variants: [
      { color: 'Glass Viridian', ram: '8GB', storage: '256GB', originalPrice: 25999, sellingPrice: 19999, stockStatus: 'In Stock', sku: 'LA2-VRD-256' }
    ],
    originalPrice: 25999,
    sellingPrice: 19999,
    stockStatus: 'In Stock',
    badges: ['Shop Offer'],
    offers: ['off-fest-1500'],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '16MP Screen Flash Selfie',
      rearCamera: '50MP 1.0um Sensor + 8MP Wide + 2MP Macro + 2MP Depth',
      cameraModes: 'Pro Mode, HDR, Night Mode, Portrait, Beauty',
      videoFeatures: '4K @ 30fps Video Recording',
      phoneAi: 'AI Scene Detection',
      cpu: 'MediaTek Dimensity 7050 (6nm Octa-core up to 2.6GHz)',
      ramAndStorage: '8GB LPDDR4X (+8GB Virtual RAM) + 256GB UFS 2.2',
      display: '6.78" FHD+ 120Hz 3D Double Curved AMOLED, 1.07 Billion Colors, HDR10+',
      operatingSystem: 'Clean Android 13 (Upgradable to Android 14), Zero Bloatware, Zero Ads',
      batteryCapacity: '4700 mAh',
      chargingSpeed: '66W Super Fast Charger (50% in 16 mins)',
      connectivity: 'Dual 5G (Supports 13 5G Bands), Wi-Fi 6, Bluetooth 5.2',
      dimensionsWeight: '164.15 x 74.7 x 8.75 mm, 210g (Premium matte glass back)',
      otherFeatures: 'In-display Fingerprint sensor, Agni Mitra Home Service guarantee',
      warranty: '1 Year Handset Replacement at Home during warranty period',
      boxContents: 'Handset, 66W Power Adapter, USB-C Cable, Type-C to 3.5mm adapter, Case'
    },
    highlights: [
      'Double curved 120Hz AMOLED display with Schott Xensation glass',
      'Free at-home replacement service under Agni Mitra scheme',
      'Clean Android OS with no preinstalled bloatware and no ads',
      'Fast 66W charging with 50% charge in just 16 minutes'
    ]
  },

  // 13. itel ColorPro 5G
  {
    id: 'prod-itel-cp5g',
    slug: 'itel-colorpro-5g',
    name: 'itel ColorPro 5G',
    model: 'IT5002',
    brand: 'itel',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'IVCO Technology - Sunlight Color Changing Back',
    description: 'India first budget 5G phone with IVCO color changing photochromic glass, MediaTek Dimensity 6080 5G chipset, 50MP AI rear camera, and free one-time screen replacement.',
    coverImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'River Blue', hex: '#3498DB' },
      { name: 'Lavender Fantasy', hex: '#9B59B6' }
    ],
    ramOptions: ['6GB'],
    storageOptions: ['128GB'],
    variants: [
      { color: 'River Blue', ram: '6GB', storage: '128GB', originalPrice: 12999, sellingPrice: 9999, stockStatus: 'In Stock', sku: 'ICP-BLU-128' },
      { color: 'Lavender Fantasy', ram: '6GB', storage: '128GB', originalPrice: 12999, sellingPrice: 9999, stockStatus: 'In Stock', sku: 'ICP-LAV-128' }
    ],
    originalPrice: 12999,
    sellingPrice: 9999,
    stockStatus: 'In Stock',
    badges: ['Shop Offer'],
    offers: ['off-fest-1500'],
    isFeatured: false,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '8MP Front AI Camera with screen flash',
      rearCamera: '50MP AI Dual Camera with LED Flash',
      cameraModes: 'AI Portrait, HDR, Panorama, Short Video',
      videoFeatures: '1080p @ 30fps video recording',
      phoneAi: 'Aivana Voice Assistant',
      cpu: 'MediaTek Dimensity 6080 5G (6nm Octa-core up to 2.4GHz)',
      ramAndStorage: '6GB RAM (+6GB Memory Fusion) + 128GB UFS Storage',
      display: '6.6" HD+ IPS 90Hz Display with Drop Notch',
      operatingSystem: 'itel OS 13 based on Android 13',
      batteryCapacity: '5000 mAh Long Lasting Battery',
      chargingSpeed: '18W Type-C Fast Charging',
      connectivity: 'Dual 5G (Supports 10 5G Bands), Wi-Fi, Bluetooth 5.1',
      dimensionsWeight: '164.0 x 75.5 x 8.4 mm, 190g',
      otherFeatures: 'Side fingerprint sensor, Face unlock, Free 1-time Screen Replacement within 100 days',
      warranty: '1 Year Device Warranty with 100 Days Free Screen Replacement',
      boxContents: 'Handset, 18W Adapter, Type-C Cable, TPU Case, SIM Tool'
    },
    highlights: [
      'Unbelievable value: True 5G speed under ₹10,000',
      'IVCO color-changing back reacts to outdoor sunlight',
      'Free one-time screen replacement within 100 days of purchase',
      'Dimensity 6080 processor with fast 5G connectivity'
    ]
  },

  // 14. Nokia G42 5G
  {
    id: 'prod-nokia-g42',
    slug: 'nokia-g42-5g',
    name: 'Nokia G42 5G',
    model: 'TA-1581',
    brand: 'Nokia',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'QuickFix Repairability - 3 Days Battery Life',
    description: 'Built to last with QuickFix repairable design, 50MP triple AI camera, pure Android experience, Snapdragon 480+ 5G, and up to 3 days of battery life on a single charge.',
    coverImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'So Purple', hex: '#6C4F87' },
      { name: 'So Grey', hex: '#4A4A4A' }
    ],
    ramOptions: ['6GB'],
    storageOptions: ['128GB'],
    variants: [
      { color: 'So Purple', ram: '6GB', storage: '128GB', originalPrice: 15999, sellingPrice: 12499, stockStatus: 'In Stock', sku: 'NG42-PUR-128' },
      { color: 'So Grey', ram: '6GB', storage: '128GB', originalPrice: 15999, sellingPrice: 12499, stockStatus: 'In Stock', sku: 'NG42-GRY-128' }
    ],
    originalPrice: 15999,
    sellingPrice: 12499,
    stockStatus: 'In Stock',
    badges: ['Shop Offer'],
    offers: ['off-fest-1500'],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '8MP Front Camera',
      rearCamera: '50MP AF Main + 2MP Depth + 2MP Macro with LED Flash',
      cameraModes: 'Night Mode 2.0, Tripod Mode, OZO 3D Audio recording',
      videoFeatures: '1080p @ 30/60fps with OZO Audio Capture',
      phoneAi: 'AI portrait algorithm',
      cpu: 'Snapdragon 480+ 5G (8nm Octa-core up to 2.2GHz)',
      ramAndStorage: '6GB RAM (+5GB Virtual) + 128GB (MicroSD up to 1TB)',
      display: '6.56" HD+ 90Hz V-notch display, 560 nits brightness, Gorilla Glass 3',
      operatingSystem: 'Clean Android 13 (2 OS upgrades & 3 years monthly security patches)',
      batteryCapacity: '5000 mAh (Holds up to 80% capacity after 800 charge cycles)',
      chargingSpeed: '20W Fast Charging support (USB-PD 3.0)',
      connectivity: 'Dual 5G, Wi-Fi 6, Bluetooth 5.1, 3.5mm Headphone jack',
      dimensionsWeight: '165.0 x 75.8 x 8.55 mm, 193.8g (65% recycled back cover)',
      otherFeatures: 'IP52 splash protection, Side fingerprint, OZO Playback speakers',
      warranty: '1 Year Manufacturer Warranty',
      boxContents: 'Nokia G42 5G, Quick Start Guide, USB-C Cable, SIM Pin'
    },
    highlights: [
      'QuickFix design allows easy screen and battery repairs',
      'Up to 3-day battery lifespan on one charge',
      'OZO Audio 3D capture with active background noise reduction',
      'Clean bloatware-free Android with guaranteed updates'
    ]
  },

  // 15. HMD Crest 5G
  {
    id: 'prod-hmd-crest',
    slug: 'hmd-crest-5g',
    name: 'HMD Crest 5G',
    model: 'TA-1638',
    brand: 'HMD',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Selfie Master with 50MP Front Camera & Gen 1 Repairability',
    description: 'Express your true self with an industry-leading 50MP selfie camera with hands-free capture, Unisoc T760 5G processor, 90Hz OLED display, and easy repairability.',
    coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Midnight Blue', hex: '#182C4A' },
      { name: 'Royal Pink', hex: '#D87093' }
    ],
    ramOptions: ['6GB'],
    storageOptions: ['128GB'],
    variants: [
      { color: 'Midnight Blue', ram: '6GB', storage: '128GB', originalPrice: 18999, sellingPrice: 14499, stockStatus: 'In Stock', sku: 'HMDC-BLU-128' },
      { color: 'Royal Pink', ram: '6GB', storage: '128GB', originalPrice: 18999, sellingPrice: 14499, stockStatus: 'In Stock', sku: 'HMDC-PNK-128' }
    ],
    originalPrice: 18999,
    sellingPrice: 14499,
    stockStatus: 'In Stock',
    badges: ['Latest Launch'],
    offers: ['off-fest-1500'],
    isFeatured: false,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: '50MP High-Res Selfie Camera with Hands-free Gestures',
      rearCamera: '50MP AI Dual Rear Camera with Flash',
      cameraModes: 'Selfie Gestures, Tone Control, Flash Shot, Night Mode',
      videoFeatures: '1080p @ 30fps Recording',
      phoneAi: 'AI portrait algorithms',
      cpu: 'Unisoc T760 6nm 5G Octa-Core (up to 2.2GHz)',
      ramAndStorage: '6GB RAM (+6GB Virtual) + 128GB Storage (MicroSD up to 256GB)',
      display: '6.67" FHD+ 90Hz OLED Display, vibrant colors',
      operatingSystem: 'Pure Android 14 (No bloatware, 2 years of OS upgrades)',
      batteryCapacity: '5000 mAh (Supports 800 charge cycles)',
      chargingSpeed: '33W Fast Charging',
      connectivity: 'Dual 5G, Wi-Fi 5, Bluetooth 5.0, 3.5mm jack',
      dimensionsWeight: '163.8 x 76.3 x 8.4 mm, 185g',
      otherFeatures: 'Gen 1 Repairability (Fix it yourself screen replacement)',
      warranty: '1 Year Warranty',
      boxContents: 'HMD Crest, 33W Charger, USB Cable, Clear Jelly Case, SIM Pin'
    },
    highlights: [
      'Huge 50MP selfie shooter with sign-language and wave triggers',
      'Vivid 90Hz FHD+ OLED panel in mid-range segment',
      'Gen 1 Repairability engineered for simple component fixes',
      'Pure Android 14 user interface without unwanted apps'
    ]
  },

  // 16. Saregama Carvaan Mobile Don
  {
    id: 'prod-carvaan-don',
    slug: 'saregama-carvaan-mobile-don',
    name: 'Saregama Carvaan Mobile Don',
    model: 'M11',
    brand: 'Saregama Carvaan',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Feature Phone with 1500 Pre-loaded Evergreen Hindi & Tamil Songs',
    description: 'The iconic feature phone with 1500 handpicked evergreen retro songs pre-loaded (Hindi/Tamil classics by Lata, Kishore, Rafi, SPB, Ilaiyaraaja), 2.4" display, FM radio with recording, and 2500mAh long battery.',
    coverImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Classic Blue', hex: '#1E3F66' },
      { name: 'Emerald Green', hex: '#2E5A44' }
    ],
    ramOptions: ['32MB'],
    storageOptions: ['2GB'],
    variants: [
      { color: 'Classic Blue', ram: '32MB', storage: '2GB', originalPrice: 2490, sellingPrice: 2199, stockStatus: 'In Stock', sku: 'SCM-BLU-01' }
    ],
    originalPrice: 2490,
    sellingPrice: 2199,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'phone',
    specifications: {
      frontCamera: 'Not Applicable',
      rearCamera: '1.3MP Camera with Flash',
      cameraModes: 'Standard Photo, Flashlight mode',
      videoFeatures: 'Basic 3GP Video playback',
      phoneAi: 'Not Applicable',
      cpu: 'Mediatek Feature Chipset',
      ramAndStorage: '32MB RAM + Internal memory preloaded with 1500 songs (microSD up to 8GB)',
      display: '2.4" QVGA Color Screen with large readable keypad fonts',
      operatingSystem: 'Saregama Feature OS with Song Categorization',
      batteryCapacity: '2500 mAh (Up to 3 days standby and continuous music)',
      chargingSpeed: 'Standard Micro-USB Charging',
      connectivity: 'Dual SIM (2G GSM), Bluetooth, 3.5mm Headphone Jack',
      dimensionsWeight: '124 x 52 x 14.5 mm, 110g',
      otherFeatures: '1500 Preloaded Tracks, Super loud 2W Speaker, Wireless FM, Torch',
      warranty: '1 Year Brand Warranty by Saregama',
      boxContents: 'Phone, Battery, Charger, Earphones, User Manual'
    },
    highlights: [
      '1500 timeless retro classic songs built directly into phone memory',
      'No internet required to enjoy high-quality music playback',
      'Loud, clear 2W speaker ideal for elders and music lovers',
      'Long battery life with up to 3 days between charges'
    ]
  },

  // 17. Draft Phone Example: Nothing Phone (3) Concept
  {
    id: 'prod-nothing-p3-draft',
    slug: 'nothing-phone-3-concept',
    name: 'Nothing Phone (3) [Upcoming Demo Preview]',
    model: 'A150-PROTO',
    brand: 'Nothing',
    category: 'Mobile Phones',
    categorySlug: 'mobiles',
    tagline: 'Next-Gen AI Companion Smartphone Preview',
    description: 'Upcoming flagship prototype with revolutionary interactive transparent matrix and Snapdragon 8s Gen 3. In draft status for shop testing.',
    coverImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Smoky Grey', hex: '#333333' }],
    ramOptions: ['12GB'],
    storageOptions: ['256GB'],
    variants: [{ color: 'Smoky Grey', ram: '12GB', storage: '256GB', originalPrice: 59999, sellingPrice: 54999, stockStatus: 'Out of Stock', sku: 'NP3-DRAFT' }],
    originalPrice: 59999,
    sellingPrice: 54999,
    stockStatus: 'Out of Stock',
    badges: ['Upcoming'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'draft', // DRAFT product for testing admin publish/unpublish
    specsType: 'phone',
    specifications: {
      frontCamera: '50MP',
      rearCamera: '50MP + 50MP + 50MP',
      cpu: 'Snapdragon 8s Gen 3',
      display: '6.78" 1.5K LTPO AMOLED 144Hz',
      batteryCapacity: '5200 mAh',
      chargingSpeed: '65W Fast Charging'
    },
    highlights: ['Upcoming prototype preview in shop catalog (Unpublished draft)']
  },

  // ==========================================
  // TABLETS (Samsung, Lenovo)
  // ==========================================
  {
    id: 'prod-tab-s9fe',
    slug: 'samsung-galaxy-tab-s9-fe',
    name: 'Samsung Galaxy Tab S9 FE',
    model: 'SM-X510',
    brand: 'Samsung',
    category: 'Tablets',
    categorySlug: 'tablets',
    tagline: 'Vibrant 10.9" Display with In-box Water-resistant S Pen',
    description: 'The perfect tablet for study, entertainment, and productivity. Includes in-box IP68 water-resistant S Pen, 90Hz high refresh screen, Exynos 1380, and massive 8000mAh battery.',
    coverImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Gray', hex: '#505050' },
      { name: 'Lavender', hex: '#C8B6DB' }
    ],
    ramOptions: ['6GB'],
    storageOptions: ['128GB'],
    variants: [
      { color: 'Gray', ram: '6GB', storage: '128GB', originalPrice: 44999, sellingPrice: 34999, stockStatus: 'In Stock', sku: 'TS9FE-GRY-128' }
    ],
    originalPrice: 44999,
    sellingPrice: 34999,
    stockStatus: 'In Stock',
    badges: ['Best Seller', 'EMI Available'],
    offers: ['off-hdfc-2000', 'off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'tablet',
    specifications: {
      screenSize: '10.9-inch WQXGA (2304 x 1440) 90Hz',
      processor: 'Samsung Exynos 1380 Octa-Core',
      ramAndStorage: '6GB RAM + 128GB Storage (MicroSD up to 1TB)',
      penSupport: 'S Pen included in box (IP68 water resistant)',
      batteryCapacity: '8000 mAh with 45W Fast Charging support',
      speakers: 'Dual AKG Tuned Speakers with Dolby Atmos',
      cameras: '8MP Rear Camera + 12MP Ultra-wide Front Camera',
      os: 'Android 13 with Samsung One UI & Samsung DeX support',
      warranty: '1 Year Brand Warranty'
    },
    highlights: [
      'Includes authentic IP68 water & dust resistant S Pen in the box',
      'Large 10.9" 90Hz display with Vision Booster outdoor visibility',
      '8000mAh battery with up to 18 hours of video playback',
      'Samsung DeX mode provides PC-like productivity'
    ]
  },
  {
    id: 'prod-tab-lenovom11',
    slug: 'lenovo-tab-m11',
    name: 'Lenovo Tab M11',
    model: 'TB330FU',
    brand: 'Lenovo',
    category: 'Tablets',
    categorySlug: 'tablets',
    tagline: '11" 90Hz Entertainment Tablet with Quad Dolby Atmos Speakers',
    description: 'Crisp 11-inch WUXGA display certified with TUV Rheinland low blue light, quad stereo speakers tuned by Dolby Atmos, MediaTek Helio G88, and all-day learning mode.',
    coverImage: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Seafoam Green', hex: '#9CB4A7' }, { name: 'Luna Grey', hex: '#63666A' }],
    ramOptions: ['4GB'],
    storageOptions: ['64GB', '128GB'],
    variants: [
      { color: 'Luna Grey', ram: '4GB', storage: '128GB', originalPrice: 21000, sellingPrice: 14999, stockStatus: 'In Stock', sku: 'LM11-GRY-128' }
    ],
    originalPrice: 21000,
    sellingPrice: 14999,
    stockStatus: 'In Stock',
    badges: ['Shop Offer'],
    offers: ['off-fest-1500'],
    isFeatured: false,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'tablet',
    specifications: {
      screenSize: '11-inch WUXGA (1920 x 1200) IPS 90Hz',
      processor: 'MediaTek Helio G88 Octa-Core',
      ramAndStorage: '4GB RAM + 128GB Storage (microSD expandable up to 1TB)',
      penSupport: 'Lenovo Tab Pen support (Available separately)',
      batteryCapacity: '7040 mAh with 15W charging',
      speakers: 'Quad Speakers with Dolby Atmos',
      cameras: '8MP Rear Camera + 8MP Front Camera',
      os: 'Android 13 with planned upgrade to Android 14 & 15',
      warranty: '1 Year Manufacturer Warranty'
    },
    highlights: [
      '11-inch 90Hz screen perfect for students, reading, and OTT streaming',
      'Quad speakers with Dolby Atmos for loud, clear classroom audio',
      'Google Kids Space and Lenovo Freestyle integration'
    ]
  },

  // ==========================================
  // AUDIO (AirPods, boAt, OnePlus, Sony, JBL)
  // ==========================================
  {
    id: 'prod-apple-airpods-pro2',
    slug: 'apple-airpods-pro-2nd-gen',
    name: 'Apple AirPods Pro (2nd Gen, USB-C)',
    model: 'MTJV3HN/A',
    brand: 'Apple',
    category: 'Audio',
    categorySlug: 'audio',
    tagline: 'Up to 2x more Active Noise Cancellation with H2 Chip',
    description: 'Upgraded with the Apple H2 chip, Pro-level Active Noise Cancellation, Adaptive Audio, Transparency mode, Personalized Spatial Audio, and MagSafe Charging Case (USB-C).',
    coverImage: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'White', hex: '#FFFFFF' }],
    originalPrice: 24900,
    sellingPrice: 21999,
    stockStatus: 'In Stock',
    badges: ['Best Seller', 'EMI Available'],
    offers: ['off-hdfc-2000'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'audio',
    specifications: {
      type: 'True Wireless In-Ear Earbuds',
      driverSize: 'Apple custom high-excursion driver',
      noiseCancellation: 'Active Noise Cancellation (up to 2x more powerful)',
      batteryLife: 'Up to 6 hours listening time (up to 30 hours with case)',
      connectivity: 'Bluetooth 5.3, Apple H2 headphone chip, Apple U1 chip in case',
      waterResistance: 'IP54 dust, sweat, and water resistant for AirPods and Case',
      charging: 'USB-C, MagSafe, Apple Watch charger, or Qi-certified chargers',
      warranty: '1 Year Apple Warranty'
    },
    highlights: [
      'Genuine Apple AirPods Pro with next-gen H2 processor',
      'Adaptive Audio dynamically blends Transparency and Active Noise Cancellation',
      'Personalized Spatial Audio with dynamic head tracking',
      'USB-C case with Precision Finding speaker and lanyard loop'
    ]
  },
  {
    id: 'prod-boat-airdopes141',
    slug: 'boat-airdopes-141-anc',
    name: 'boAt Airdopes 141 ANC Wireless Earbuds',
    model: 'Airdopes 141 ANC',
    brand: 'boAt',
    category: 'Audio',
    categorySlug: 'audio',
    tagline: 'Up to 32dB Active Noise Cancellation with 42H Playback',
    description: 'Crystal-clear calls with Quad Mics and ENx Technology, up to 32dB Active Noise Cancellation, BEAST Mode with 50ms low latency for gaming, and signature boAt bass.',
    coverImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Gunmetal Black', hex: '#262626' }, { name: 'Cider White', hex: '#F5F5F0' }],
    originalPrice: 5990,
    sellingPrice: 1799,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'audio',
    specifications: {
      type: 'Wireless Earbuds',
      driverSize: '10mm Dynamic Bass Drivers',
      noiseCancellation: 'Up to 32dB Active Noise Cancellation (ANC)',
      batteryLife: 'Up to 42 Hours Total Playback (6 Hours single charge)',
      connectivity: 'Bluetooth 5.3, IWP Instant Connect technology',
      waterResistance: 'IPX5 Sweat & Splash Resistant',
      charging: 'ASAP Charge (10 mins charge = 150 mins playtime), Type-C',
      warranty: '1 Year boAt Brand Warranty'
    },
    highlights: [
      'Up to 32dB ANC blocks out everyday traffic and office hum',
      'Quad Mics with ENx noise cancellation for clear voice calls',
      'BEAST mode with 50ms ultra-low latency for mobile gaming',
      'Huge 42-hour total playback with ASAP rapid charging'
    ]
  },
  {
    id: 'prod-oneplus-bullets-z2',
    slug: 'oneplus-bullets-wireless-z2-anc',
    name: 'OnePlus Bullets Wireless Z2 ANC Neckband',
    model: 'E306A',
    brand: 'OnePlus',
    category: 'Audio',
    categorySlug: 'audio',
    tagline: '45dB Hybrid Active Noise Cancellation with 12.4mm Drivers',
    description: 'Flagship-level 45dB Hybrid Active Noise Cancellation neckband with 12.4mm deep bass dynamic drivers, up to 28 hours battery life, and magnetic instant connect.',
    coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Booming Black', hex: '#1C1C1C' }, { name: 'Grand Green', hex: '#234433' }],
    originalPrice: 2999,
    sellingPrice: 1999,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'audio',
    specifications: {
      type: 'Wireless In-Ear Neckband',
      driverSize: '12.4mm Dynamic Bass Drivers with Titanium Coating',
      noiseCancellation: '45dB Hybrid Active Noise Cancellation + 3 Mic AI Call Noise Reduction',
      batteryLife: 'Up to 28 Hours (ANC Off) / 20 Hours (ANC On)',
      connectivity: 'Bluetooth 5.2, Quick Device Switch',
      waterResistance: 'IP55 Water and Sweat Resistance',
      charging: '10 minutes charge gives 20 hours battery life (Type-C)',
      warranty: '1 Year OnePlus Warranty'
    },
    highlights: [
      'Huge 45dB Hybrid ANC with ultra-wide 3500Hz cancellation',
      '12.4mm large titanium-coated dynamic driver delivers pounding bass',
      '10-minute ultra-fast charge yields 20 hours of continuous music',
      'Magnetic pause and resume earbuds with soft silicone neckband'
    ]
  },
  {
    id: 'prod-sony-ht-s20r',
    slug: 'sony-ht-s20r-5-1ch-soundbar',
    name: 'Sony HT-S20R 5.1ch Home Cinema Soundbar',
    model: 'HT-S20R',
    brand: 'Sony',
    category: 'Audio',
    categorySlug: 'audio',
    tagline: '400W Real 5.1ch Surround Sound with Wired Rear Speakers',
    description: 'Give movies the soundtrack they deserve with 5.1 channels of real surround sound. Rear speakers and an external subwoofer work with a 3ch soundbar to deliver dynamic, cinematic audio.',
    coverImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Matte Black', hex: '#111111' }],
    originalPrice: 19990,
    sellingPrice: 15990,
    stockStatus: 'In Stock',
    badges: ['EMI Available', 'Shop Offer'],
    offers: ['off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'audio',
    specifications: {
      type: '5.1 Channel Home Theatre Soundbar with Subwoofer',
      totalPowerOutput: '400W RMS',
      audioFormat: 'Dolby Audio, Dolby Digital 5.1',
      channels: '5.1 Ch (3ch Soundbar + 2 Rear Speakers + 1 Subwoofer)',
      connectivity: 'HDMI ARC, Optical Input, USB audio, Bluetooth 5.0, Analogue Audio In',
      modes: 'Cinema, Music, Voice Mode, Night Mode',
      warranty: '1 Year Sony Comprehensive Brand Warranty'
    },
    highlights: [
      'Authentic 5.1 channel surround sound with dedicated rear satellite speakers',
      'Powerful 400W total power fills living rooms with rich theatre bass',
      'Simple one-cable connection via HDMI ARC to any modern Smart TV'
    ]
  },
  {
    id: 'prod-jbl-flip6',
    slug: 'jbl-flip-6-portable-speaker',
    name: 'JBL Flip 6 Portable Bluetooth Speaker',
    model: 'JBLFLIP6BLU',
    brand: 'JBL',
    category: 'Audio',
    categorySlug: 'audio',
    tagline: 'Bold JBL Original Pro Sound - IP67 Waterproof & Dustproof',
    description: 'Engineered with a 2-way speaker system delivering crystal-clear highs and deep bass. Up to 12 hours of playtime, IP67 waterproof/dustproof design, and PartyBoost pairing.',
    coverImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Ocean Blue', hex: '#1E3D59' }, { name: 'Midnight Black', hex: '#181818' }],
    originalPrice: 13999,
    sellingPrice: 9999,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'audio',
    specifications: {
      type: 'Portable Bluetooth Speaker',
      driverSize: 'Racetrack-shaped woofer + separate tweeter + dual passive radiators',
      powerOutput: '30W RMS (20W woofer + 10W tweeter)',
      batteryLife: 'Up to 12 Hours continuous playback',
      connectivity: 'Bluetooth 5.1, JBL PartyBoost multi-speaker pairing',
      waterResistance: 'IP67 Waterproof and Dustproof',
      chargingTime: '2.5 hours via USB-C with charging protection',
      warranty: '1 Year JBL Harman Official Warranty'
    },
    highlights: [
      '2-way speaker design with dedicated tweeter for crisp outdoor acoustics',
      'IP67 waterproof and dustproof can be taken to pools, beaches, and rains',
      'JBL PartyBoost allows syncing with multiple compatible JBL speakers'
    ]
  },
  {
    id: 'prod-boat-bassheads242',
    slug: 'boat-bassheads-242-wired-earphones',
    name: 'boAt Bassheads 242 Wired Earphones',
    model: 'Bassheads 242',
    brand: 'boAt',
    category: 'Audio',
    categorySlug: 'audio',
    tagline: 'Secure Ear Hooks with 10mm Dynamic Drivers & Mic',
    description: 'Built for sports with soft silicone ear-hooks, HD microphone with in-line volume controls, durable tangle-resistant cable, and punchy bass tuned for workout motivation.',
    coverImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Active Black', hex: '#1A1A1A' }, { name: 'Neon Red', hex: '#C0392B' }],
    originalPrice: 1490,
    sellingPrice: 499,
    stockStatus: 'In Stock',
    badges: [],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'audio',
    specifications: {
      type: 'Wired In-Ear Earphones',
      driverSize: '10mm Dynamic Drivers',
      connector: '3.5mm Gold-plated Angled Jack',
      cableLength: '1.2 Meter Tangle-resistant PVC Cable',
      microphone: 'In-line HD Mic with Volume + Track Controls',
      waterResistance: 'IPX4 Water and Sweat Resistant',
      warranty: '1 Year Replacement Warranty'
    },
    highlights: [
      'Comfortable ergonomic ear-hooks stay securely in place during running',
      'In-line control buttons for calls and volume adjustment',
      'Zero latency direct 3.5mm connection for gaming and music'
    ]
  },

  // ==========================================
  // ACCESSORIES: CHARGING, POWER & STORAGE
  // ==========================================
  {
    id: 'prod-mi-powerbank-20k',
    slug: 'mi-20000mah-18w-power-bank',
    name: 'Mi 20000mAh 18W Fast Charging Power Bank 3i',
    model: 'PB200LZM',
    brand: 'Xiaomi',
    category: 'Charging & Power',
    categorySlug: 'charging-power',
    tagline: 'Triple Port Output with 18W Two-Way Fast Charging',
    description: 'High capacity 20,000mAh lithium-polymer battery with triple USB output ports, dual input (Type-C and Micro-USB), 18W fast charging, and advanced 12-layer circuit protection.',
    coverImage: 'https://images.unsplash.com/photo-1609592807908-592f2545d947?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1609592807908-592f2545d947?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Classic Black', hex: '#222222' }],
    originalPrice: 2199,
    sellingPrice: 1899,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'accessory',
    specifications: {
      capacity: '20,000 mAh (3.7V, 74Wh)',
      outputPorts: '2x USB-A (18W Max) + 1x Type-C (18W Max)',
      inputPorts: 'Micro-USB (18W) and USB Type-C (18W)',
      safetyProtection: '12 Layer Advanced Circuit Chip Protection',
      dimensionsWeight: '150.6 x 72.2 x 26.3 mm, 434g',
      warranty: '6 Months Brand Warranty'
    },
    highlights: [
      'Charge 3 devices simultaneously with triple output ports',
      '18W two-way fast charge rapidly recharges the power bank itself',
      'Smart power management mode safely charges fitness bands and earbuds'
    ]
  },
  {
    id: 'prod-samsung-25w-charger',
    slug: 'samsung-25w-usb-c-fast-charger',
    name: 'Samsung 25W Type-C Super Fast Wall Charger',
    model: 'EP-TA800N',
    brand: 'Samsung',
    category: 'Charging & Power',
    categorySlug: 'charging-power',
    tagline: 'Original Power Delivery 3.0 Adapter for Galaxy Devices',
    description: 'Original Samsung Super Fast Charging adapter utilizing Power Delivery 3.0 PPS to provide up to 25W high-efficiency charging for smartphones, tablets, and accessories.',
    coverImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#111111' }],
    originalPrice: 1699,
    sellingPrice: 1299,
    stockStatus: 'In Stock',
    badges: ['Original Accessory'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'accessory',
    specifications: {
      outputPower: 'Up to 25W (PDO: 9V, PPS: 3.3-5.9V/3A or 3.3-11V/2.25A)',
      interface: 'USB Type-C Female Port',
      compatibility: 'Galaxy S Series, A Series, Note Series, iPhones, iPads and Android phones',
      warranty: '6 Months Official Samsung Warranty'
    },
    highlights: [
      'Genuine Samsung Super Fast Charging adapter',
      'Supports Power Delivery 3.0 with programmable power supply (PPS)',
      'Compact travel-ready pin architecture'
    ]
  },
  {
    id: 'prod-anker-datacable',
    slug: 'anker-powerline-type-c-data-cable',
    name: 'Anker PowerLine III USB-C to USB-C 60W Fast Data Cable (1.8m)',
    model: 'A8853',
    brand: 'Anker',
    category: 'Charging & Power',
    categorySlug: 'charging-power',
    tagline: 'Ultra-durable 25,000 Bend Lifespan with 480Mbps Transfer',
    description: 'Built with bulletproof quad-fiber core to withstand up to 25,000 bends. Supports up to 60W Power Delivery high-speed charging and 480Mbps fast data sync.',
    coverImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'White', hex: '#FFFFFF' }],
    originalPrice: 1299,
    sellingPrice: 899,
    stockStatus: 'In Stock',
    badges: [],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'accessory',
    specifications: {
      length: '1.8 Meters (6 Feet)',
      powerRating: 'Up to 60W (20V/3A) Power Delivery',
      dataSpeed: 'USB 2.0 480 Mbps transfer rate',
      connectorType: 'Type-C Male to Type-C Male',
      warranty: '18 Months Hassle-Free Replacement Warranty'
    },
    highlights: [
      'Proven 25,000 bend lifespan resists fraying and wire breakage',
      'Fast charges laptops, tablets, and phones up to 60W',
      'Extra-long 1.8m length provides flexibility at home and desk'
    ]
  },
  {
    id: 'prod-sandisk-sd-64gb',
    slug: 'sandisk-ultra-64gb-microsdxc-card',
    name: 'SanDisk Ultra 64GB MicroSDXC UHS-I Memory Card',
    model: 'SDSQUNR-064G-GN3MN',
    brand: 'SanDisk',
    category: 'Storage',
    categorySlug: 'storage',
    tagline: 'Up to 140MB/s Read Speed with A1 App Performance',
    description: 'Expand your phone and camera storage with class 10 UHS-I speed. Delivers up to 140MB/s read speeds, A1 rated for faster smartphone app loading, and waterproof/temperature proof.',
    coverImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Red/White', hex: '#D72638' }],
    originalPrice: 999,
    sellingPrice: 549,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'storage',
    specifications: {
      capacity: '64 GB',
      readSpeed: 'Up to 140 MB/s',
      speedClass: 'Class 10, UHS Speed Class 1 (U1), A1 App Performance',
      durability: 'Waterproof, temperature proof, X-ray proof, shockproof',
      warranty: '10 Years Limited Manufacturer Warranty'
    },
    highlights: [
      'A1 performance class allows apps to launch directly from the memory card',
      'Ideal for recording Full HD videos and storing thousands of photos',
      'Backed by SanDisk 10-year manufacturer warranty'
    ]
  },
  {
    id: 'prod-kingston-pendrive-128gb',
    slug: 'kingston-datatraveler-128gb-pendrive',
    name: 'Kingston DataTraveler Exodia 128GB USB 3.2 Pen Drive',
    model: 'DTX/128GB',
    brand: 'Kingston',
    category: 'Storage',
    categorySlug: 'storage',
    tagline: 'USB 3.2 Gen 1 High-Speed Flash Drive with Protective Cap',
    description: 'Compliant with USB 3.2 Gen 1 for quick file transfers to laptops, desktop PCs, monitors, and smart TVs. Features a large colorful key ring loop and handy protective cap.',
    coverImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Black/Yellow', hex: '#F4B41A' }],
    originalPrice: 1400,
    sellingPrice: 799,
    stockStatus: 'In Stock',
    badges: [],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'storage',
    specifications: {
      capacity: '128 GB',
      interface: 'USB 3.2 Gen 1 (Backwards compatible with USB 2.0)',
      compatibility: 'Windows 11/10, macOS, Linux, Chrome OS, Smart TVs',
      dimensions: '67.3 x 21.04 x 10.14 mm',
      warranty: '5 Years Warranty with Free Technical Support'
    },
    highlights: [
      'Generous 128GB capacity stores documents, movies, and family albums',
      'USB 3.2 Gen 1 ensures rapid plug-and-play transferring',
      'Protective cap protects the USB connector when attached to keychains'
    ]
  },
  {
    id: 'prod-spigen-case-ip15',
    slug: 'spigen-rugged-armor-case-iphone-15',
    name: 'Spigen Rugged Armor Matte Protective Case for iPhone 15',
    model: 'ACS06509',
    brand: 'Spigen',
    category: 'Phone Protection',
    categorySlug: 'phone-protection',
    tagline: 'Air Cushion Technology with Carbon Fiber Accents',
    description: 'Signature carbon fiber styling with flexible TPU shock-absorbing layer. Mil-grade certified with Air Cushion Technology on all corners and raised lips around screen and camera.',
    coverImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Matte Black', hex: '#1C1C1C' }],
    originalPrice: 1999,
    sellingPrice: 1199,
    stockStatus: 'In Stock',
    badges: ['Top Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'protection',
    specifications: {
      material: 'Thermoplastic Polyurethane (TPU)',
      protectionRating: 'MIL-STD 810G-516.6 Drop Tested',
      wirelessCharging: 'Fully compatible with wireless and MagSafe pads',
      raisedEdges: '1.2mm screen bezel lip and 1.5mm camera ring bumper',
      warranty: '100% Genuine Guaranteed'
    },
    highlights: [
      'Mil-grade drop protection with air cushions inside every corner',
      'Matte spider-web internal pattern disperses shock upon impact',
      'Tactile button covers maintain crisp original click response'
    ]
  },
  {
    id: 'prod-tempered-glass-9d',
    slug: '9d-edge-to-edge-tempered-glass',
    name: '9D Edge-to-Edge Full Glue Curved Tempered Glass',
    model: 'TG-9D-UNIV',
    brand: 'Muganiyaa Shield',
    category: 'Phone Protection',
    categorySlug: 'phone-protection',
    tagline: '9H Hardness with Oleophobic Anti-Fingerprint Coating',
    description: 'Premium aluminosilicate tempered glass featuring 9H hardness, 2.5D curved smooth edges, high-definition 99.9% transparency, and oil-repellent oleophobic coating.',
    coverImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Clear Black Border', hex: '#000000' }],
    originalPrice: 499,
    sellingPrice: 199,
    stockStatus: 'In Stock',
    badges: ['Shop Service Available'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'protection',
    specifications: {
      hardness: '9H Military-grade Tempered Glass',
      coverage: 'Edge-to-edge full screen adhesive',
      coating: 'Electrolytic Oleophobic Anti-fingerprint layer',
      touchSensitivity: 'Zero touch delay with 0.33mm ultra-slim profile',
      serviceNote: 'Free bubble-free professional shop installation available in-store'
    },
    highlights: [
      '9H surface scratch resistance against keys, coins, and pocket dust',
      'Hydrophobic and oleophobic coating prevents oily smudges',
      'Free application assistance by shop technicians on visit'
    ]
  },

  // ==========================================
  // TELEVISIONS
  // ==========================================
  {
    id: 'prod-samsung-tv-43',
    slug: 'samsung-43-inch-crystal-4k-uhd-smart-tv',
    name: 'Samsung 43-inch Crystal 4K Vivid Pro Ultra HD Smart TV',
    model: 'UA43DUE70BKLXL',
    brand: 'Samsung',
    category: 'TVs',
    categorySlug: 'tvs',
    tagline: 'PurColor & 4K Upscaling with SolarCell Remote',
    description: 'Immerse in one billion shades of color with Crystal Processor 4K, HDR10+, Object Tracking Sound Lite (OTS Lite), Q-Symphony, and Tizen Smart OS with SmartThings hub.',
    coverImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Titan Black', hex: '#1C1C1C' }],
    originalPrice: 44900,
    sellingPrice: 28990,
    stockStatus: 'In Stock',
    badges: ['Best Seller', 'EMI Available', 'Shop Offer'],
    offers: ['off-hdfc-2000', 'off-bajaj-nocost'],
    isFeatured: true,
    isLatestLaunch: true,
    isBestSeller: true,
    status: 'published',
    specsType: 'tv',
    specifications: {
      screenSize: '43 Inch (108 cm) Diagonal',
      resolution: '4K Ultra HD (3840 x 2160 pixels)',
      refreshRate: '50 Hz with Motion Xcelerator',
      displayTechnology: 'LED with PurColor & Mega Contrast',
      smartTvOs: 'Tizen OS with Bixby and SmartThings',
      audioOutput: '20W 2CH with Q-Symphony and OTS Lite',
      connectivityPorts: '3x HDMI, 1x USB-A, Optical Out, RF In, Wi-Fi 5, Bluetooth 5.2',
      powerConsumption: '115W Max',
      warranty: '1 Year Comprehensive + 1 Year Additional on Panel'
    },
    highlights: [
      'Crystal Processor 4K delivers true-to-life 4K upscaling for TV channels',
      'Tizen Smart TV platform with Netflix, Prime, Disney+ Hotstar & YouTube',
      'Q-Symphony enables TV and soundbar speakers to play simultaneously',
      'Slim 3-side bezel-less minimalist design'
    ]
  },
  {
    id: 'prod-oneplus-tv-55',
    slug: 'oneplus-55-inch-y1s-pro-4k-smart-tv',
    name: 'OnePlus 55-inch Y1S Pro 4K Ultra HD Smart Android LED TV',
    model: '55Y1S Pro',
    brand: 'OnePlus',
    category: 'TVs',
    categorySlug: 'tvs',
    tagline: '10-Bit Color Depth with Gamma Engine & 24W Dolby Audio',
    description: 'Stunning 4K resolution featuring HDR10+ and HLG support, OxygenPlay 2.0 with Android TV 11, Google Assistant built-in, and auto-low latency mode for gaming.',
    coverImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Bezel-less Black', hex: '#141414' }],
    originalPrice: 49999,
    sellingPrice: 37999,
    stockStatus: 'In Stock',
    badges: ['EMI Available'],
    offers: ['off-bajaj-nocost', 'off-hdfc-2000'],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'tv',
    specifications: {
      screenSize: '55 Inch (138.8 cm)',
      resolution: '4K Ultra HD (3840 x 2160)',
      refreshRate: '60 Hz with MEMC Motion Smoothing',
      displayTechnology: '10-Bit DCI-P3 90% wide color gamut',
      smartTvOs: 'Android TV 11 with OxygenPlay 2.0',
      audioOutput: '24W Stereo Speakers with Dolby Audio',
      connectivityPorts: '3x HDMI (1 with ALLM/eARC), 2x USB, Ethernet, Dual-band Wi-Fi',
      powerConsumption: '140W Max',
      warranty: '1 Year Comprehensive Brand Warranty'
    },
    highlights: [
      'Gamma Engine optimizes display quality with dynamic noise reduction',
      'OnePlus Connect allows controlling the TV with your smartphone',
      '24W cinematic sound tuned with Dolby Audio clarity'
    ]
  },

  // ==========================================
  // COOLING APPLIANCES (AC, Air Cooler, Fan)
  // ==========================================
  {
    id: 'prod-daikin-15ton-ac',
    slug: 'daikin-1-5-ton-5-star-inverter-split-ac',
    name: 'Daikin 1.5 Ton 5 Star Inverter Split AC',
    model: 'MTKM50U',
    brand: 'Daikin',
    category: 'Cooling Appliances',
    categorySlug: 'cooling-appliances',
    tagline: 'Copper Condenser with PM 2.5 Filter & Triple Display',
    description: 'High efficiency 5-star inverter air conditioner featuring patented Swing Compressor technology, Dew Clean automatic coil cleaning, PM 2.5 air filter, and stabilizer-free operation.',
    coverImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Pure White', hex: '#FFFFFF' }],
    originalPrice: 67200,
    sellingPrice: 45490,
    stockStatus: 'In Stock',
    badges: ['Best Seller', 'EMI Available', 'Shop Offer'],
    offers: ['off-bajaj-nocost', 'off-hdfc-2000'],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'cooling',
    specifications: {
      capacity: '1.5 Ton (Ideal for rooms up to 150 sq.ft)',
      energyRating: '5 Star BEE Rating (ISEER: 5.2)',
      condenserCoil: '100% Grooved Copper with Anti-corrosion coating',
      coolingCapacity: '5000 W (rated)',
      airFiltration: 'PM 2.5 Micro Clean Filter + Ag+ Titanium Apatite filter',
      powerSupply: '230V / 50Hz, Stabilizer-free operation (130V - 285V)',
      warranty: '1 Year on Product, 5 Years on PCB, 10 Years on Compressor'
    },
    highlights: [
      'Dew Clean technology washes evaporator coil at the press of a button',
      'Cools effectively even under extreme ambient temperatures up to 54°C',
      'Triple Display shows temperature, error code, and power consumption %'
    ]
  },
  {
    id: 'prod-symphony-diet-cooler',
    slug: 'symphony-diet-35t-personal-tower-air-cooler',
    name: 'Symphony Diet 35T Personal Tower Air Cooler',
    model: 'Diet 35T',
    brand: 'Symphony',
    category: 'Cooling Appliances',
    categorySlug: 'cooling-appliances',
    tagline: '35L Tank with Honeycomb Pads & i-Pure Air Purification',
    description: 'Compact personal tower cooler designed for bedrooms and living rooms. Features a 35-liter water tank with water level indicator, multidirectional castor wheels, and high-efficiency honeycomb pads.',
    coverImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'White', hex: '#F9F9F9' }],
    originalPrice: 10499,
    sellingPrice: 7999,
    stockStatus: 'In Stock',
    badges: ['Shop Offer'],
    offers: ['off-fest-1500'],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'cooling',
    specifications: {
      capacity: '35 Liters Water Tank',
      coverageArea: 'Up to 150 sq.ft / 45 m³',
      powerWattage: '170 Watts (Low power inverter compatible)',
      coolingMedia: 'High-efficiency 3-sided Honeycomb pads',
      airThrow: 'Blower with 30 feet powerful air throw',
      dimensions: '430 x 360 x 1155 mm, 9.5 kg',
      warranty: '1 Year Symphony Brand Warranty'
    },
    highlights: [
      'Tower design takes minimum floor space while delivering high airflow',
      'i-Pure technology filters out PM 2.5 dust particles and bacteria',
      'Operates on standard home inverter power during outages'
    ]
  },
  {
    id: 'prod-crompton-bldc-fan',
    slug: 'crompton-energion-hyperjet-bldc-ceiling-fan',
    name: 'Crompton Energion Hyperjet 1200mm BLDC Ceiling Fan',
    model: 'ENERGION-HJ-1200',
    brand: 'Crompton',
    category: 'Cooling Appliances',
    categorySlug: 'cooling-appliances',
    tagline: 'Saves up to 65% Electricity with Smart RF Remote',
    description: 'Powered by ActivBLDC motor consuming only 35W at full speed. Delivers high speed of 370 RPM and 220 CMM air delivery with smart RF point-anywhere remote.',
    coverImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Opal White', hex: '#F0F0F0' }, { name: 'Brown', hex: '#5A3825' }],
    originalPrice: 4800,
    sellingPrice: 3199,
    stockStatus: 'In Stock',
    badges: ['5-Star Energy Saver'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: true,
    isBestSeller: true,
    status: 'published',
    specsType: 'cooling',
    specifications: {
      sweepSize: '1200 mm (48 Inches)',
      motorType: 'Energy Efficient ActivBLDC Motor',
      powerWattage: '35 Watts (Saves ₹1,500+ every year on bills)',
      speedRpm: '370 RPM with 220 CMM high air delivery',
      controls: 'Point Anywhere RF Remote with Timer & Sleep Mode',
      warranty: '3 Years Warranty on BLDC Motor'
    },
    highlights: [
      'Runs up to 3 times longer on home inverter compared to standard induction fans',
      'RF remote control works without needing to point directly at the fan',
      'Silent operation with 100% copper wound motor'
    ]
  },

  // ==========================================
  // KITCHEN APPLIANCES (Induction: Fabiano, Prestige; Grinders, Kettles)
  // ==========================================
  {
    id: 'prod-prestige-pic20',
    slug: 'prestige-pic-20-induction-cooktop',
    name: 'Prestige PIC 20.0 1600W Induction Cooktop',
    model: 'PIC 20.0',
    brand: 'Prestige',
    category: 'Kitchen Appliances',
    categorySlug: 'kitchen-appliances',
    tagline: 'Indian Menu Presets with Automatic Voltage Regulator',
    description: 'Equipped with Indian menu presets (Dosa, Chapati, Curry, Idli, Milk), aerodynamic cooling fan, flame-free safe cooking, and Dual Heat Sensor protection.',
    coverImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Black Ceramic', hex: '#1C1C1C' }],
    originalPrice: 3595,
    sellingPrice: 2199,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'appliance',
    specifications: {
      powerWattage: '1600 Watts',
      cooktopSurface: 'Full Glass Micro-Crystal Plate',
      controlPanel: 'Push Button Controls with Digital LED Display',
      presetMenus: 'Indian Menu Options: Chapati/Dosa, Gravy, Pressure Cook, Deep Fry, Milk',
      safetyFeatures: 'Automatic Voltage Regulator (AVR), Anti-Magnetic Wall',
      warranty: '1 Year Prestige Brand Warranty'
    },
    highlights: [
      'Pre-programmed Indian cooking presets save electricity and prevent burning',
      'Built-in voltage regulator safeguards against sudden power fluctuations',
      'Flame-free and smoke-free cooking ensures kitchen comfort'
    ]
  },
  {
    id: 'prod-fabiano-induction',
    slug: 'fabiano-powercook-2000w-induction-cooktop',
    name: 'Fabiano PowerCook 2000W Induction Cooktop',
    model: 'PowerCook-2000',
    brand: 'Fabiano',
    category: 'Kitchen Appliances',
    categorySlug: 'kitchen-appliances',
    tagline: 'Heavy-Duty 2000W Rapid Heating with Feather Touch Controls',
    description: 'High power 2000W induction cooktop featuring crystal glass surface, feather touch control panel, child lock, timer function, and instant boil capability.',
    coverImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Glossy Black', hex: '#111111' }],
    originalPrice: 3890,
    sellingPrice: 2499,
    stockStatus: 'In Stock',
    badges: ['High Power'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: true,
    isBestSeller: false,
    status: 'published',
    specsType: 'appliance',
    specifications: {
      powerWattage: '2000 Watts Fast Heating',
      cooktopSurface: 'A-Grade Toughened Crystal Glass',
      controlPanel: 'Feather Touch Sensor Buttons',
      timer: 'Up to 3-hour programmable auto shut-off timer',
      safetyFeatures: 'Overheat protection, Child Lock, Pan Sensor Auto-off',
      warranty: '1 Year Fabiano Home Appliances Warranty'
    },
    highlights: [
      'Powerful 2000W rapid heating boils milk and water in half the time',
      'Sleek feather touch sensors wipe clean effortlessly',
      'Safety auto-off triggers when induction vessel is removed'
    ]
  },
  {
    id: 'prod-prestige-iris-mixer',
    slug: 'prestige-iris-plus-750w-mixer-grinder',
    name: 'Prestige Iris Plus 750W Mixer Grinder with 4 Jars',
    model: 'Iris Plus',
    brand: 'Prestige',
    category: 'Kitchen Appliances',
    categorySlug: 'kitchen-appliances',
    tagline: 'Heavy Duty 750W Motor with 3 Stainless Steel Jars & Juicer',
    description: 'Engineered for tough Indian wet and dry grinding. Features a 750-watt 100% copper motor, 3 heavy gauge stainless steel jars, transparent juicer jar with extractor, and multi-function blades.',
    coverImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'White & Blue', hex: '#2A6F97' }],
    originalPrice: 6295,
    sellingPrice: 3299,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'appliance',
    specifications: {
      powerWattage: '750 Watts Pure Copper Motor',
      numberOfJars: '4 Jars (1.5L Wet, 1.0L Dry, 0.3L Chutney + 1.5L Juicer Jar)',
      bladeMaterial: 'Super Sharp 304 Stainless Steel Blades',
      speedSettings: '3 Speed with Incher / Pulse function',
      safety: 'Overload Protection switch on base',
      warranty: '2 Years Manufacturer Warranty'
    },
    highlights: [
      'Grinds stubborn spices, idli batter, and dry turmeric with ease',
      'Includes dedicated transparent juicer jar with pulp filter',
      'Ergonomically designed sturdy handles with locking lid clips'
    ]
  },
  {
    id: 'prod-pigeon-kettle',
    slug: 'pigeon-1-5l-electric-kettle',
    name: 'Pigeon by Stovekraft 1.5L Stainless Steel Electric Kettle',
    model: 'Amaze Plus',
    brand: 'Pigeon',
    category: 'Kitchen Appliances',
    categorySlug: 'kitchen-appliances',
    tagline: '1500W Fast Boil with 360° Cordless Swivel Base',
    description: 'Boil water, brew tea, coffee, and prepare instant noodles in minutes. Features hygienic food-grade stainless steel body, automatic cut-off, and cool-touch handle.',
    coverImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Silver Steel', hex: '#DCDCDC' }],
    originalPrice: 1295,
    sellingPrice: 599,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'appliance',
    specifications: {
      capacity: '1.5 Liters',
      powerWattage: '1500 Watts',
      material: 'Food Grade Stainless Steel interior and body',
      safetyFeatures: 'Auto Shut-off, Boil Dry Protection, Single-touch lid lock',
      base: '360 Degree Cordless Swivel Base',
      warranty: '1 Year Warranty by Pigeon'
    },
    highlights: [
      'Boils 1.5L water in under 5 minutes with 1500W heating element',
      'Automatic shut-off when boiling is complete prevents dry-run accidents',
      'Wide mouth opening makes cleaning and pouring effortless'
    ]
  },
  {
    id: 'prod-ultra-wet-grinder',
    slug: 'elgi-ultra-dura-plus-1-25l-wet-grinder',
    name: 'Elgi Ultra Dura+ 1.25L Table Top Wet Grinder',
    model: 'Dura+',
    brand: 'Ultra',
    category: 'Kitchen Appliances',
    categorySlug: 'kitchen-appliances',
    tagline: 'Patented Conical Stones for Fluffy Idlis & Crispy Dosas',
    description: 'The authentic South Indian wet grinder with patented conical grinding stones that generate less heat, ensuring lighter, fluffier batter and longer shelf life.',
    coverImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Fortune White', hex: '#FFFFFF' }],
    originalPrice: 9490,
    sellingPrice: 7799,
    stockStatus: 'In Stock',
    badges: ['Shop Offer'],
    offers: ['off-fest-1500'],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'appliance',
    specifications: {
      capacity: '1.25 Liters Batter Volume',
      motorPower: '85 Watts Heavy Duty Motor',
      grindingStones: 'Patented Conical Grinding Stones',
      drumMaterial: 'AISI 304 Food Grade Stainless Steel Drum (Rust-resistant)',
      bodyMaterial: 'Shock-proof Virgin ABS Plastic',
      warranty: '5 Years Manufacturer Warranty'
    },
    highlights: [
      'Conical stones grind batter with minimal temperature increase for fermenting perfection',
      'Compact table-top design fits smoothly on standard kitchen counters',
      '5-year comprehensive manufacturer warranty'
    ]
  },

  // ==========================================
  // HOME & PERSONAL CARE (Trimmer, Iron, Immersion Heater)
  // ==========================================
  {
    id: 'prod-philips-trimmer',
    slug: 'philips-bt3102-cordless-beard-trimmer',
    name: 'Philips BT3102/15 Cordless Beard Trimmer Series 3000',
    model: 'BT3102/15',
    brand: 'Philips',
    category: 'Home & Personal Care',
    categorySlug: 'home-personal-care',
    tagline: 'Lift & Trim System with Self-Sharpening Stainless Blades',
    description: 'Cut 30% faster with the innovative Lift & Trim comb that guides low-lying hairs into the blades. Offers 10 lock-in length settings (0.5 to 10mm) and 60 minutes of cordless runtime.',
    coverImage: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Deep Blue', hex: '#1B263B' }],
    originalPrice: 1695,
    sellingPrice: 1299,
    stockStatus: 'In Stock',
    badges: ['Best Seller'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'personal_care',
    specifications: {
      trimmingRange: '0.5 - 10 mm (10 precision length settings)',
      bladeType: 'Skin-friendly rounded tips, Self-sharpening Stainless Steel',
      batteryRuntime: 'Up to 60 minutes cordless use after 10 hours charge',
      cleaning: 'Detachable head, fully washable under running tap',
      warranty: '2 + 1 Year Extended Brand Warranty'
    },
    highlights: [
      'Lift & Trim comb catches flat hairs for an even, effortless trim',
      'Rounded blade edges prevent scratches and skin irritation',
      'DuraPower technology reduces friction and optimizes battery longevity'
    ]
  },
  {
    id: 'prod-havells-iron',
    slug: 'havells-1000w-heavyweight-dry-iron',
    name: "Havells D'zire 1000W Heavyweight Dry Iron",
    model: 'GHGDZDSW100',
    brand: 'Havells',
    category: 'Home & Personal Care',
    categorySlug: 'home-personal-care',
    tagline: 'Non-stick DuPont Coated Soleplate with Heavy Sole',
    description: 'Traditional heavyweight dry iron that flattens stiff cottons and silks with natural pressing weight. Features 1000W quick heating, adjustable temperature dial, and 360-degree swivel cord.',
    coverImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Black & Gold', hex: '#B3924C' }],
    originalPrice: 1495,
    sellingPrice: 999,
    stockStatus: 'In Stock',
    badges: [],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'personal_care',
    specifications: {
      powerWattage: '1000 Watts Fast Heating',
      soleplate: 'DuPont American Heritage Golden Non-Stick Coating',
      temperatureControl: 'Fabric selector dial for Cotton, Wool, Silk, Rayon, Linen',
      cord: '360 Degree Swivel Cord with braided heat shield',
      safety: 'Thermal fuse protection against overheating',
      warranty: '2 Years Comprehensive Havells Warranty'
    },
    highlights: [
      'Heavyweight base removes stubborn wrinkles without extra hand pressure',
      'DuPont non-stick soleplate glides smoothly over delicate fabrics',
      'Thermal fuse automatically cuts off power if temperature exceeds limit'
    ]
  },
  {
    id: 'prod-crompton-immersion-rod',
    slug: 'crompton-1500w-shockproof-immersion-heater-rod',
    name: 'Crompton I-Halt 1500W Shockproof Immersion Water Heater Rod',
    model: 'ACGI-IHALT1500',
    brand: 'Crompton',
    category: 'Home & Personal Care',
    categorySlug: 'home-personal-care',
    tagline: 'Waterproof Sealed Body with Advanced Nickel Plating',
    description: 'Safe and instant winter water heating. Features a completely sealed shockproof IPX7 body, advanced anti-corrosive nickel-plated copper tube, and bucket hook.',
    coverImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Blue & White', hex: '#1E6091' }],
    originalPrice: 1050,
    sellingPrice: 699,
    stockStatus: 'In Stock',
    badges: ['Shockproof'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'personal_care',
    specifications: {
      powerWattage: '1500 Watts Instant Heating',
      elementMaterial: 'Heavy duty copper tube with nickel coating',
      protection: 'IPX7 certified waterproof and shock-resistant handle',
      bucketClip: 'Built-in sturdy bucket holding clip with safe water level indicators',
      warranty: '2 Years Manufacturer Warranty'
    },
    highlights: [
      'IPX7 shockproof sealed handle ensures complete electrical safety',
      'Nickel-plated copper element resists hard water scaling and corrosion',
      'Heats a full bucket of bath water in under 10 minutes'
    ]
  },

  // ==========================================
  // SIM CARDS (Jio, Airtel, Vi)
  // ==========================================
  {
    id: 'prod-sim-jio',
    slug: 'jio-5g-prime-prepaid-sim',
    name: 'Jio 5G Prime Prepaid SIM Card (Instant In-Shop Activation)',
    model: 'JIO-5G-SIM',
    brand: 'Jio',
    category: 'SIM Cards',
    categorySlug: 'sim-cards',
    tagline: 'True 5G Unlimited Data with Unlimited Calls',
    description: 'Instant paperless KYC activation at Muganiyaa-Mobiles in under 10 minutes. Get unlimited True 5G data on supported devices, nationwide free roaming, and free subscription to Jio apps.',
    coverImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Jio Blue', hex: '#0F52BA' }],
    originalPrice: 299,
    sellingPrice: 99,
    stockStatus: 'In Stock',
    badges: ['Instant Activation', 'Best Seller'],
    offers: [],
    isFeatured: true,
    isLatestLaunch: false,
    isBestSeller: true,
    status: 'published',
    specsType: 'sim',
    specifications: {
      operator: 'Reliance Jio Infocomm',
      simType: 'Triple Cut SIM (Standard, Micro, Nano compatible)',
      kycRequirements: 'Aadhaar Card + Biometric / Digital Photo KYC',
      networkSupport: 'Standalone 5G (SA), 4G VoLTE',
      serviceNote: 'Available for both New SIM activations and MNP (Porting from other operators)'
    },
    highlights: [
      'Activated in-store within 10 to 15 minutes with digital biometric KYC',
      'Eligible for Jio Welcome Offer Unlimited True 5G data speeds',
      'Easy MNP porting support with your existing mobile number'
    ]
  },
  {
    id: 'prod-sim-airtel',
    slug: 'airtel-5g-plus-prepaid-sim',
    name: 'Airtel 5G Plus Prepaid SIM Card',
    model: 'AIR-5G-SIM',
    brand: 'Airtel',
    category: 'SIM Cards',
    categorySlug: 'sim-cards',
    tagline: 'High-Speed 5G Plus Network with Ultra-fast Connectivity',
    description: 'Switch to Airtel 5G Plus with seamless paperless activation. Works across India with ultra-fast coverage on existing SIM architectures with crystal clear VoLTE voice calling.',
    coverImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Airtel Red', hex: '#ED1B24' }],
    originalPrice: 299,
    sellingPrice: 99,
    stockStatus: 'In Stock',
    badges: ['Instant Activation'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'sim',
    specifications: {
      operator: 'Bharti Airtel',
      simType: 'All-in-one Trio SIM (Nano, Micro, Standard)',
      kycRequirements: 'Biometric / Aadhaar OTP paperless verification',
      networkSupport: '5G Plus, 4G, 2G, VoLTE & VoWiFi',
      serviceNote: 'Free doorstep / in-shop MNP porting assistance'
    },
    highlights: [
      'Airtel 5G Plus offers up to 30x faster speeds than 4G',
      'Crystal-clear HD voice calls over VoLTE and Wi-Fi calling',
      'Instant activation through authorized store retailer portal'
    ]
  },
  {
    id: 'prod-sim-vi',
    slug: 'vi-hero-unlimited-prepaid-sim',
    name: 'Vi Hero Unlimited Prepaid SIM Card',
    model: 'VI-HERO-SIM',
    brand: 'Vi',
    category: 'SIM Cards',
    categorySlug: 'sim-cards',
    tagline: 'Binge All Night (12AM to 6AM) with Weekend Data Rollover',
    description: 'Get the exclusive Vi Hero Unlimited advantage: free night data from 12 AM to 6 AM without deduction from daily pack, weekend data rollover, and Data Delights backup data.',
    coverImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Vi Orange & Red', hex: '#E60000' }],
    originalPrice: 299,
    sellingPrice: 99,
    stockStatus: 'In Stock',
    badges: ['Hero Benefits'],
    offers: [],
    isFeatured: false,
    isLatestLaunch: false,
    isBestSeller: false,
    status: 'published',
    specsType: 'sim',
    specifications: {
      operator: 'Vodafone Idea (Vi)',
      simType: 'Multi-cut 4G/5G Ready SIM',
      kycRequirements: 'Aadhaar / Voter ID Biometric verification',
      networkSupport: 'GIGAnet 4G, VoLTE, VoWiFi',
      serviceNote: 'MNP porting takes 3 to 5 business days as per TRAI guidelines'
    },
    highlights: [
      'Binge All Night: Truly unlimited high-speed data from 12:00 AM to 6:00 AM',
      'Weekend Rollover accumulates unused weekday data to use on Saturday & Sunday',
      'In-shop biometric activation with choice of special numbers'
    ]
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'off-hdfc-2000',
    title: 'Flat ₹2,000 Instant Discount with HDFC Bank Credit Cards',
    badgeText: '₹2,000 Off on HDFC',
    type: 'Card Offer',
    provider: 'HDFC Bank',
    discountAmount: 2000,
    minPurchase: 25000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
    terms: 'Valid on HDFC Bank Credit Card EMI and Non-EMI transactions. Minimum transaction value ₹25,000. Maximum 1 offer redemption per card per month. Valid only on store-assisted billing.'
  },
  {
    id: 'off-bajaj-nocost',
    title: 'No-Cost EMI up to 6 Months with Bajaj Finserv & Leading Banks',
    badgeText: 'No-Cost EMI Available',
    type: 'EMI Option',
    provider: 'Bajaj Finserv & Credit Cards',
    tenureOptions: '3 Months / 6 Months',
    downPayment: '₹0 Down Payment',
    processingFee: '₹199 nominal file charge',
    minPurchase: 15000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
    terms: 'Applicable on select smartphones, televisions, and electronics above ₹15,000. Interest component is provided as an upfront shop discount, resulting in net zero interest. Subject to finance provider credit approval.'
  },
  {
    id: 'off-fest-1500',
    title: 'Festival Exchange Cashback Bonus of ₹1,500 Extra',
    badgeText: '₹1,500 Exchange Bonus',
    type: 'Cashback & Exchange',
    provider: 'Muganiyaa Store Offer',
    discountAmount: 1500,
    minPurchase: 10000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
    terms: 'Bring any working 4G or 5G smartphone in clean condition. The ₹1,500 exchange bonus is added on top of the calculated device residual evaluation value when buying an eligible phone.'
  },
  {
    id: 'off-monsoon-expired',
    title: 'Monsoon Kickoff Special 10% Off [Expired Sample Demo]',
    badgeText: 'Expired Special',
    type: 'Shop Discount',
    provider: 'Muganiyaa Store',
    discountPercentage: 10,
    minPurchase: 5000,
    startDate: '2026-05-01',
    endDate: '2026-06-30',
    status: 'expired',
    terms: 'Demo illustrative expired promotion to test automatic hiding and admin archive handling.'
  }
];

export const INITIAL_BANNERS = [
  {
    id: 'banner-1',
    title: 'Mega 5G Smartphone Festival',
    subtitle: 'Upgrade to lightning 5G with up to ₹2,000 bank discount and ₹0 Down Payment EMI on Samsung, vivo, OPPO & OnePlus.',
    badge: 'Limited Period Deals',
    ctaText: 'Explore 5G Phones',
    link: '/mobiles',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1400&auto=format&fit=crop&q=85',
    active: true,
    order: 1
  },
  {
    id: 'banner-2',
    title: 'Complete Cooling & Home Electronics',
    subtitle: 'Beat the heat with 5-Star Inverter ACs, tower coolers, energy-saving fans & smart LED TVs at unbeatable local prices.',
    badge: 'Summer & Home Appliances',
    ctaText: 'Browse Appliances',
    link: '/categories?category=cooling-appliances',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1400&auto=format&fit=crop&q=85',
    active: true,
    order: 2
  },
  {
    id: 'banner-3',
    title: 'Authorized Partnerships & Express Services',
    subtitle: 'Official Partner of JioMart Digital, vivo & OPPO. Genuine smartphone repairs, display replacements & 15-minute SIM activation.',
    badge: 'Trusted Local Retailer',
    ctaText: 'About Muganiyaa-Mobiles',
    link: '/about',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1400&auto=format&fit=crop&q=85',
    active: true,
    order: 3
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'srv-repair',
    title: 'Smartphone Repair & Display',
    subtitle: 'Broken screen, battery drain or charging issue? Get rapid on-site diagnosis and genuine replacement parts.',
    icon: 'Wrench',
    features: [
      'Original OLED / AMOLED & LCD display replacements',
      'Battery replacement with 6-month warranty',
      'Charging port, speaker & mic hardware repairs',
      'Water damage recovery & board diagnostics'
    ],
    enquiryService: 'Smartphone Repair & Display'
  },
  {
    id: 'srv-sim',
    title: 'SIM Activation & MNP Porting',
    subtitle: 'Retain your existing number with hassle-free Mobile Number Portability (MNP) or get a brand-new 5G SIM in 15 mins.',
    icon: 'Radio',
    features: [
      'Instant paperless digital e-KYC activation',
      'Port effortlessly between Jio, Airtel & Vi',
      'Choose VIP, fancy and memorable mobile numbers',
      'Free 5G readiness check on your handset'
    ],
    enquiryService: 'SIM Activation & MNP Porting'
  },
  {
    id: 'srv-recharge',
    title: 'Instant Recharge & DTH Bills',
    subtitle: 'Never run out of validity or entertainment. One-stop express top-up point for all major telecom and satellite providers.',
    icon: 'Zap',
    features: [
      'Prepaid & Postpaid mobile recharge for Jio, Airtel, Vi, BSNL',
      'Instant DTH recharge for Sun Direct, Tata Play, Airtel DTH, Dish TV',
      'Electricity, water & broadband bill settlement assistance',
      'Exclusive retailer pack offers & validity extensions'
    ],
    enquiryService: 'Instant Recharge & DTH Bills'
  }
];

export const INITIAL_WEBSITE_CONTENT = {
  aboutUs: {
    title: 'Welcome to Muganiyaa-Mobiles',
    subtitle: 'Your Trusted Neighborhood Destination for Mobile Technology, Home Electronics & Express Device Services',
    description: `Muganiyaa-Mobiles was founded with a straightforward mission: to provide our local community with genuine mobile phones, tablets, smart accessories, and reliable home appliances backed by warm, personal guidance.

Unlike impersonal online websites where warranties and repairs become endless customer-care calls, we welcome you face-to-face. Whether you need help setting up your new phone, transferring family photos from an old handset, upgrading your home with an energy-saving inverter AC, or finding the perfect gift within your budget, our team is right here to guide you.`,
    stats: [
      { label: 'Authorized Partnerships', value: 'JioMart, vivo, OPPO' },
      { label: 'SIM Activation Turnaround', value: 'Under 15 Mins' },
      { label: 'Genuine Products Only', value: '100% Guaranteed' },
      { label: 'Same-Day Diagnostics', value: 'Express Available' }
    ]
  },
  partners: [
    {
      name: 'JioMart Digital',
      badge: 'Official Partner of JioMart Digital',
      description: 'Owner-provided retail partnership providing access to a broad electronic catalogue and brand warranties.'
    },
    {
      name: 'vivo',
      badge: 'Partner of vivo',
      description: 'Authorized retailer for vivo V-Series and Y-Series smartphones and accessories.'
    },
    {
      name: 'OPPO',
      badge: 'Partner of OPPO',
      description: 'Authorized store partner for OPPO Reno and A-Series devices with genuine accessories.'
    }
  ],
  whyChooseUs: [
    {
      title: 'Personal Product Guidance',
      description: 'We listen to your specific daily usage, battery needs, and budget before recommending a phone or appliance.'
    },
    {
      title: 'Local Service & Immediate Support',
      description: 'If you face any issue or need data transferred, walk straight into our shop for immediate human assistance.'
    },
    {
      title: 'Diverse Product Choices',
      description: 'From affordable feature phones starting at ₹2,199 to flagship smartphones, home cooling, and kitchen appliances.'
    },
    {
      title: 'Hassle-Free Enquiries',
      description: 'Direct call and WhatsApp enquiry options let you check exact variant availability in seconds without waiting.'
    }
  ],
  footer: {
    tagline: 'Muganiyaa-Mobiles - Genuine electronics, authentic advice, and trusted local service.',
    disclaimer: 'This website is a client demonstration prototype. Catalogue prices, specifications, and financing illustrations are shown for demo purposes only. Please contact or visit the store to confirm live stock availability.'
  }
};

export const INITIAL_CONTACT_SETTINGS = {
  shopName: 'Muganiyaa-Mobiles',
  tagline: 'Your Trusted Destination for Mobiles, Electronics & Repairs',
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  email: 'contact@muganiyaamobiles.demo',
  address: 'Main Bazaar Road, Near Town Clock Tower, Demo City, Tamil Nadu - 600001',
  hours: 'Monday to Saturday: 9:30 AM – 9:30 PM | Sunday: 10:00 AM – 8:00 PM',
  mapQuery: 'Muganiyaa Mobiles',
  mapPlaceholderNote: 'Interactive Google Maps location will be linked upon store verification.'
};

export const INITIAL_CHATBOT_SETTINGS = {
  enabled: true,
  assistantName: 'Muganiyaa Assistant',
  welcomeMessage: 'Namaste! Welcome to Muganiyaa-Mobiles. How can I help you today? You can ask about our latest phones, screen repairs, EMI offers, or shop timings.',
  fallbackMessage: 'I could not find exact matching details for your query in our local demo catalog. Please feel free to give us a direct call or drop a message on WhatsApp for personalized help!',
  starterQuestions: [
    'Show phones under ₹20,000',
    'Do you repair displays?',
    'What EMI options are available?',
    'How can I contact the shop?'
  ]
};

export const INITIAL_ENQUIRIES = [
  {
    id: 'enq-101',
    customerName: 'Ramesh Kumar',
    phone: '+91 98410 11223',
    email: 'ramesh.k@example.com',
    enquiryType: 'Smartphone Repair',
    selectedProductOrService: 'Smartphone Repair & Display',
    message: 'My Samsung Galaxy S21 has a cracked outer screen. Display touch works fine. Please share quote and repair duration.',
    createdAt: '2026-09-06T11:20:00Z',
    status: 'In Progress',
    notes: 'Informed customer that genuine AMOLED assembly is available; customer visiting tomorrow.',
    repairProgress: 'Part Allocated'
  },
  {
    id: 'enq-102',
    customerName: 'Priya Sundaram',
    phone: '+91 98840 55443',
    email: 'priya.s@example.com',
    enquiryType: 'SIM & MNP Porting',
    selectedProductOrService: 'SIM Activation & MNP Porting',
    message: 'Want to port 2 family Vi numbers to Jio 5G without losing existing balance. What documents are needed?',
    createdAt: '2026-09-07T14:45:00Z',
    status: 'New',
    notes: 'Aadhaar digital OTP verification needed. Reminded via WhatsApp.',
    repairProgress: 'Not Applicable'
  },
  {
    id: 'enq-103',
    customerName: 'Karthik V',
    phone: '+91 97100 88990',
    email: 'karthik.v@example.com',
    enquiryType: 'Product Availability',
    selectedProductOrService: 'Samsung Galaxy S24 5G',
    message: 'Is the Amber Yellow 256GB variant available in stock today? Also wanted to check if HDFC ₹2,000 instant discount is applicable.',
    createdAt: '2026-09-08T09:15:00Z',
    status: 'Handled',
    notes: 'Confirmed stock and card discount over phone call. Customer reserved one unit for evening pickup.',
    repairProgress: 'Not Applicable'
  }
];
