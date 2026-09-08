// Local Simulated Chatbot Service for Muganiyaa-Mobiles
// Responds intelligently to customer queries using the live in-browser catalogue and settings
// Designed to be swapped seamlessly with a Django + Groq API endpoint in production.

export function generateChatbotReply(userInput, { products = [], offers = [], contactSettings = {}, _services = [] }) {
  const query = (userInput || '').trim().toLowerCase();
  
  // 1. Check for Budget / Price Queries (e.g. "under 20000", "under 15k", "under 30,000", "below 25000")
  const underPriceMatch = query.match(/(?:under|below|less than|within)\s*(?:rs\.?|inr|₹)?\s*(\d+)(?:\s*(k|thousand))?/i);
  if (underPriceMatch) {
    let budget = parseInt(underPriceMatch[1], 10);
    if (underPriceMatch[2] && underPriceMatch[2].toLowerCase().startsWith('k')) {
      budget = budget * 1000;
    }

    const matchingProducts = products
      .filter((p) => p.status === 'published' && p.categorySlug === 'mobiles' && p.sellingPrice <= budget)
      .sort((a, b) => b.sellingPrice - a.sellingPrice)
      .slice(0, 4);

    if (matchingProducts.length > 0) {
      return {
        text: `Here are our top recommended smartphones under ₹${budget.toLocaleString('en-IN')}:`,
        products: matchingProducts,
        actionType: 'products'
      };
    } else {
      return {
        text: `We currently do not have smartphones under ₹${budget.toLocaleString('en-IN')} in our active catalogue. Our mobile phones start from ₹2,199 (Saregama Carvaan) and 5G smartphones from ₹9,999 (itel ColorPro 5G). Would you like to see those?`,
        products: products.filter((p) => p.status === 'published' && p.categorySlug === 'mobiles').slice(0, 2),
        actionType: 'products'
      };
    }
  }

  // 2. Repair / Display / Screen / Battery Queries
  if (query.includes('repair') || query.includes('display') || query.includes('screen') || query.includes('broken') || query.includes('battery issue') || query.includes('water')) {
    return {
      text: `Yes, we provide express on-site smartphone repairs at Muganiyaa-Mobiles! We service displays (AMOLED, OLED, LCD), battery replacements, speaker/mic issues, and charging ports for all major brands including Samsung, Apple, vivo, OPPO, Redmi, and OnePlus.

You can walk into our shop for instant diagnostic evaluation, or submit a repair enquiry on our Contact page.`,
      cta: { label: 'Submit Repair Enquiry', link: '/contact' },
      actionType: 'service'
    };
  }

  // 3. SIM / MNP / Porting / Jio / Airtel / Vi
  if (query.includes('sim') || query.includes('mnp') || query.includes('port') || query.includes('activate') || query.includes('new number')) {
    return {
      text: `We provide instant SIM activation and Mobile Number Portability (MNP) in under 15 minutes! We are authorized retailers for Jio, Airtel, and Vi. You can port your existing number without losing contacts or current validity with a simple biometric e-KYC.`,
      products: products.filter((p) => p.status === 'published' && p.categorySlug === 'sim-cards'),
      actionType: 'products'
    };
  }

  // 4. Recharge / DTH / Bill Payment
  if (query.includes('recharge') || query.includes('dth') || query.includes('bill') || query.includes('tata play') || query.includes('sun direct')) {
    return {
      text: `We offer instant online and in-store recharge services for all telecom providers (Jio, Airtel, Vi, BSNL) as well as DTH top-ups (Sun Direct, Tata Play, Airtel Digital TV, Dish TV). Walk into the shop for quick, zero-surcharge bill processing!`,
      cta: { label: 'Contact Store for Top-up', link: '/contact' },
      actionType: 'service'
    };
  }

  // 5. EMI / Offers / Discounts / HDFC / Bajaj / Cashback
  if (query.includes('emi') || query.includes('offer') || query.includes('discount') || query.includes('finance') || query.includes('cashback') || query.includes('card')) {
    const activeOffersList = offers.filter((o) => o.status === 'active');
    const offerSummary = activeOffersList.map((o) => `• ${o.title}`).join('\n');
    return {
      text: `Here are our current active store promotions and financing facilities:\n\n${offerSummary}\n\nWe offer 3 and 6-Month No-Cost EMI options with Bajaj Finserv and major bank credit cards, plus up to ₹2,000 instant bank discounts on eligible purchases.`,
      cta: { label: 'View Promotional Catalog', link: '/mobiles' },
      actionType: 'offer'
    };
  }

  // 6. Contact / Address / Location / Phone / Hours
  if (query.includes('contact') || query.includes('address') || query.includes('location') || query.includes('phone') || query.includes('timing') || query.includes('hours') || query.includes('where')) {
    return {
      text: `You can reach Muganiyaa-Mobiles at:\n• Address: ${contactSettings.address || 'Main Bazaar Road, Demo City'}\n• Phone: ${contactSettings.phone || '+91 98765 43210'}\n• WhatsApp: ${contactSettings.whatsapp || '+919876543210'}\n• Opening Hours: ${contactSettings.hours || 'Mon-Sat: 9:30 AM - 9:30 PM'}`,
      cta: { label: 'Visit Contact Page', link: '/contact' },
      actionType: 'contact'
    };
  }

  // 7. Brand specific queries (e.g. "Samsung", "vivo", "Apple", "Nothing", "OPPO", "OnePlus", "TECNO")
  const knownBrands = ['samsung', 'vivo', 'oppo', 'oneplus', 'apple', 'realme', 'redmi', 'poco', 'motorola', 'nothing', 'tecno', 'lava', 'itel', 'nokia', 'hmd'];
  const matchedBrand = knownBrands.find((b) => query.includes(b));
  if (matchedBrand) {
    const brandProducts = products
      .filter((p) => p.status === 'published' && p.brand?.toLowerCase() === matchedBrand)
      .slice(0, 4);

    if (brandProducts.length > 0) {
      return {
        text: `Here are available ${matchedBrand.toUpperCase()} models in our showroom:`,
        products: brandProducts,
        actionType: 'products'
      };
    }
  }

  // 8. General Category queries (TV, Cooler, Induction, Earbuds, Watches)
  if (query.includes('tv') || query.includes('television')) {
    return {
      text: `Check out our latest 4K Ultra HD Smart TVs from Samsung and OnePlus:`,
      products: products.filter((p) => p.status === 'published' && p.categorySlug === 'tvs'),
      actionType: 'products'
    };
  }

  if (query.includes('cooler') || query.includes('ac') || query.includes('fan') || query.includes('cooling')) {
    return {
      text: `Here are our best cooling solutions including 5-Star Inverter ACs, tower air coolers, and BLDC ceiling fans:`,
      products: products.filter((p) => p.status === 'published' && p.categorySlug === 'cooling-appliances'),
      actionType: 'products'
    };
  }

  if (query.includes('induction') || query.includes('cooktop') || query.includes('grinder') || query.includes('kettle') || query.includes('kitchen')) {
    return {
      text: `We carry genuine induction cooktops (Prestige, Fabiano), wet grinders (Ultra), and mixer grinders:`,
      products: products.filter((p) => p.status === 'published' && p.categorySlug === 'kitchen-appliances'),
      actionType: 'products'
    };
  }

  if (query.includes('earbuds') || query.includes('airpods') || query.includes('headphone') || query.includes('soundbar') || query.includes('speaker')) {
    return {
      text: `Here is our audio collection, including genuine Apple AirPods Pro, boAt wireless earbuds, neckbands, and Sony 5.1 home theater soundbars:`,
      products: products.filter((p) => p.status === 'published' && p.categorySlug === 'audio'),
      actionType: 'products'
    };
  }

  // 9. Default Fallback
  return {
    text: `I'm a local demo assistant for Muganiyaa-Mobiles. I can help you find smartphones, check screen repair details, look up EMI options, or share store timings. 

Could you please specify what product or service you are interested in? You can also contact our shop directly at ${contactSettings.phone || '+91 98765 43210'}.`,
    actionType: 'fallback'
  };
}
