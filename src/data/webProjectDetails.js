// Case studies for additional live websites. Figures are the ones published on
// each site itself (airports, resorts, cities), not usage statistics.

export const webProjectDetails = {
  "irouda-booking": {
    title: "Irouda Évasion — Airport Transfer Booking",
    subtitle: "Fixed-Price Private Transfers from Alpine Airports to French Ski Resorts",
    liveUrl: "https://booking.irouda-evasion.com/",
    githubUrl: null,
    techStack: ["Laravel", "PHP", "Vite", "Booking Engine", "EN / FR", "Google Analytics"],
    badge: "Live Booking Platform",
    metrics: [
      { label: "Airports", value: "3", unit: "served" },
      { label: "Destinations", value: "17", unit: "resorts" },
      { label: "Languages", value: "2", unit: "EN + FR" },
      { label: "Pricing", value: "Fixed", unit: "upfront" },
    ],
    overview:
      "A dedicated booking platform for private airport transfers to the French Alps. Travellers pick a pickup airport, resort, date and group size, see which vehicles are free for that slot, and confirm a fixed price before they travel. It covers Geneva, Lyon and Grenoble airports and 17 resorts, including Chamonix, Morzine and Courchevel, in English and French.",
    architecture: {
      description:
        "A server-rendered Laravel application built with Vite, separated from the marketing site on its own booking subdomain. Routes, resorts, vehicles and pricing drive the booking journey, and every page is available in English and French.",
      flow: [
        "Airport & Resort",
        "Date & Passengers",
        "Vehicle Availability",
        "Fixed Price",
        "Booking Confirmed",
        "Driver Meets Flight",
      ],
      highlights: [
        "Route-based pricing shown per vehicle for each destination",
        "Vehicle availability checked for the requested date and time",
        "Destination pages for all 17 resorts, with journey times from each airport",
        "Localised English and French pages, plus consent-based analytics",
      ],
    },
    challenges: [
      {
        title: "Clear Prices for Many Routes",
        problem:
          "Each airport and resort combination has its own journey time and price, which is hard to communicate through a quote-by-email process.",
        solution:
          "Structured the journey around airport, resort and vehicle, so travellers see a fixed price before they commit.",
        result: "One clear price, agreed before travel, across the destinations the service covers.",
      },
      {
        title: "Serving International Travellers",
        problem:
          "Skiers arrive from many countries, while the operator works in France.",
        solution:
          "Built the booking journey and destination pages in both English and French, with a language switch on every page.",
        result: "Visitors can complete the journey in the language they are most comfortable with.",
      },
    ],
    features: [
      { title: "Guided Booking", description: "Choose airport, resort, date and passengers, then see which vehicles are free." },
      { title: "Fixed Pricing", description: "Prices per vehicle, confirmed before the trip rather than on arrival." },
      { title: "Destination Guides", description: "A page for each of the 17 resorts, with prices and journey times." },
      { title: "English & French", description: "The site is available in both languages, switchable from the header." },
    ],
    codeSnippet: null,
  },

  "irouda-evasion": {
    title: "Irouda Évasion — Ski Transfer Company Website",
    subtitle: "Marketing Website for an Airport Transfer and Chauffeur Service in the French Alps",
    liveUrl: "https://irouda-evasion.com/",
    githubUrl: null,
    techStack: ["WordPress", "PHP 8", "Custom Theme", "Multilingual", "SEO", "WhatsApp Contact"],
    badge: "Live Website",
    metrics: [
      { label: "Service", value: "24/7", unit: "advertised" },
      { label: "Service lines", value: "4", unit: "listed" },
      { label: "Vehicle types", value: "3", unit: "in fleet" },
      { label: "Platform", value: "WordPress", unit: "" },
    ],
    overview:
      "The company website for Irouda Évasion Mont-Blanc, a transfer operator serving ski resorts from Geneva, Lyon and Grenoble. It presents destinations with starting prices, the vehicle fleet and service lines including airport transfers, corporate travel, events and private chauffeur work, and sends visitors to booking, a quote request or WhatsApp.",
    architecture: {
      description:
        "A WordPress site running on PHP 8, with content that can be edited without a developer. Destination, fleet and service sections lead visitors toward a booking, a quote request or a direct conversation.",
      flow: [
        "Search / Direct Visit",
        "Destination or Service Page",
        "Prices & Fleet",
        "Book or Request Quote",
        "WhatsApp / Phone",
      ],
      highlights: [
        "Destination cards with starting prices for key resorts",
        "Dedicated sections for airport, corporate, event and chauffeur services",
        "Fleet presentation covering van, minibus and sedan options",
        "Booking, quote, phone and WhatsApp actions available throughout",
      ],
    },
    challenges: [
      {
        title: "Turning Visitors into Enquiries",
        problem:
          "Travellers planning a ski trip want a price and a fast way to reach someone, not just a company description.",
        solution:
          "Put destinations and starting prices directly on the home page, with booking, quote and WhatsApp actions always in reach.",
        result: "Visitors can move from a resort to a booking or conversation straight from the first screen.",
      },
    ],
    features: [
      { title: "Destinations", description: "Resort cards with photos and starting prices." },
      { title: "Services", description: "Airport transfers, corporate transport, events and weddings, and private chauffeur." },
      { title: "Fleet", description: "Vehicle options for different group sizes." },
      { title: "Direct Contact", description: "Booking, quote request, phone and WhatsApp." },
    ],
    codeSnippet: null,
  },

  bilalmotors: {
    title: "Bilal Motors — Car Marketplace & Auctions",
    subtitle: "Buy, Sell, Auction and Inspect Cars Across Pakistan",
    liveUrl: "https://bilalmotors.com/",
    githubUrl: null,
    techStack: ["Laravel", "PHP 8", "MySQL", "Marketplace", "Live Auctions", "Dealer Portal"],
    badge: "Live Marketplace",
    metrics: [
      { label: "Cities", value: "11", unit: "in search" },
      { label: "Makes", value: "16", unit: "in search" },
      { label: "Ways to sell", value: "3", unit: "routes" },
      { label: "Accounts", value: "Dealer", unit: "+ buyer" },
    ],
    overview:
      "An automotive marketplace based in Karachi. Buyers search used cars by make, city and keyword, and browse by brand or body type. Sellers can post a free ad, use a Sell It For Me service or sell through a live auction, and the site also offers professional inspection, dealer accounts, new car information, videos and a blog.",
    architecture: {
      description:
        "A server-rendered PHP 8 and Laravel application that brings listings, auctions, inspections and dealer accounts together in one marketplace, so each buyer and seller action starts from the same car search and account system.",
      flow: [
        "Search by Make & City",
        "Car Listing",
        "Inspection",
        "Live Auction or Direct Sale",
        "Dealer / Seller Account",
      ],
      highlights: [
        "Search by make, city and keyword, with browsing by brand and body type",
        "Live auction section alongside regular used car listings",
        "Dealer registration and login separate from public browsing",
        "Inspection booking and supervised car listings for buyer confidence",
      ],
    },
    challenges: [
      {
        title: "One Marketplace, Many Ways to Sell",
        problem:
          "Sellers have different needs: some want to post an ad, others want help or a faster auction sale.",
        solution:
          "Offered free ads, Sell It For Me and live auctions as clear options from the same marketplace.",
        result: "Sellers can choose the route that suits them without leaving the site.",
      },
      {
        title: "Building Buyer Confidence",
        problem:
          "Buying a used car online carries real uncertainty about its condition.",
        solution:
          "Added professional inspection booking and supervised car listings alongside the regular catalogue.",
        result: "Buyers have a way to check a car's condition before committing.",
      },
    ],
    features: [
      { title: "Car Search", description: "Filter by make, city and keyword, or browse by brand and body type." },
      { title: "Live Auctions", description: "A dedicated auction section for buying and selling vehicles." },
      { title: "Sell Your Car", description: "Post a free ad, use Sell It For Me or sell through auction." },
      { title: "Car Inspection", description: "Book a professional inspection before you buy." },
      { title: "Dealer Accounts", description: "Registration and login for dealers." },
    ],
    codeSnippet: null,
  },

  pyrobytes: {
    title: "PyroBytes — Software Company Website",
    subtitle: "Corporate Website for a US Software Development and Digital Services Company",
    liveUrl: "https://pyrobytes.com/",
    githubUrl: null,
    techStack: ["Corporate Website", "Responsive UI", "Scroll Animations", "SEO", "Lead Generation"],
    badge: "Live Website",
    metrics: [
      { label: "Offices", value: "2", unit: "in Texas" },
      { label: "Process", value: "5", unit: "steps shown" },
      { label: "Style", value: "Animated", unit: "UI" },
      { label: "Goal", value: "Leads", unit: "" },
    ],
    overview:
      "The corporate website for PyroBytes, a digital solutions company with offices in Austin and Houston, Texas. It presents web and mobile development, cloud, IoT, DevOps and AI services, explains how the company works with clients from first consultation to deployment, and leads visitors toward starting a project.",
    architecture: {
      description:
        "A marketing website with animated, scroll-driven sections. Pages for services and past work support a single journey: understand what the company does, trust how it works, and get in touch.",
      flow: [
        "Home",
        "Services",
        "Our Work",
        "How We Work",
        "Contact",
      ],
      highlights: [
        "Dedicated navigation for mobile app and website development services",
        "Bold dark visual identity with animated sections",
        "Step-by-step client process from consultation to deployment",
        "Calls to action and contact details throughout the site",
      ],
    },
    challenges: [
      {
        title: "Explaining a Broad Service Range",
        problem:
          "The company covers many services, from mobile apps to AI, which can overwhelm first-time visitors.",
        solution:
          "Organised the site around clear service pages and a simple five-step client process.",
        result: "Visitors can quickly find the relevant service and understand what working together looks like.",
      },
    ],
    features: [
      { title: "Service Pages", description: "Mobile app development, website development and other digital services." },
      { title: "Client Process", description: "Consultation, proposal, developer selection, onboarding, and QA and deployment." },
      { title: "Our Work", description: "A section dedicated to the company's projects." },
      { title: "Lead Capture", description: "Contact details and project calls to action." },
    ],
    codeSnippet: null,
  },
};
