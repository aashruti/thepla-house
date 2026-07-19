import type { TagKey } from "./menu";

export interface KitchenDish {
  title: string;
  desc: string;
  subject: string;
  alt: string;
  keys: TagKey[];
}

export interface Kitchen {
  slug: string;
  title: string;
  /** locality shown as the card eyebrow */
  area: string;
  /** short blurb for the locations hub card */
  note: string;
  hours: string;
  address: string;
  mapQuery: string;
  flagship?: boolean;
  areasServed: string[];
  popular: KitchenDish[];
  localCopy: string;
  faqs: { q: string; a: string }[];
  /** exact geo for LocalBusiness/Restaurant JSON-LD + map */
  lat?: number;
  lng?: number;
  /** dine-in outlet (adds eat-in / reservation signals) */
  dineIn?: boolean;
  /**
   * Canonical Google Business Profile / Maps listing URL for this outlet.
   * PASTE THE REAL VERIFIED LISTING URL HERE (Maps → your listing → Share → Copy link,
   * e.g. https://maps.app.goo.gl/xxxx or a .../maps/place/...!.../data=... URL).
   * When set it powers the "Get directions" button AND the `hasMap`/`sameAs`
   * schema that ties this page to the exact GBP listing (keeps competitors out
   * of Google's entity understanding for this branch).
   */
  mapsUrl?: string;
  /** Outlet-specific phone shown on the page; must match the GBP phone exactly (NAP consistency). */
  phone?: string;
  /** Real per-outlet aggregator listing URLs (NOT the generic swiggy.com/zomato.com homepages). Emitted in this outlet's `sameAs`. */
  zomatoUrl?: string;
  swiggyUrl?: string;
  /** Other real profiles for this outlet (Justdial, Facebook, …) → added to `sameAs`. */
  profiles?: string[];
  /** per-kitchen SEO overrides */
  seoTitle?: string;
  seoDescription?: string;
  /** extra keyword-rich local paragraphs rendered on the kitchen page */
  seoParagraphs?: string[];
}

const DEFAULT_POPULAR: KitchenDish[] = [
  { title: "Methi Thepla", desc: "Soft whole-wheat flatbread with fresh fenugreek — the local favourite.", subject: "Methi theplas on a brass plate", alt: "Methi theplas", keys: ["ww", "best"] },
  { title: "Gujarati Thali", desc: "A full home-style spread, cooked fresh through the day.", subject: "Gujarati thali, top-down", alt: "Gujarati thali", keys: ["best", "jain"] },
  { title: "Khaman Dhokla", desc: "Steamed and tempered — a teatime regular.", subject: "Khaman dhokla squares", alt: "Khaman dhokla", keys: ["vegan"] },
  { title: "Sabudana Khichdi", desc: "Light sago with peanuts — a popular fasting-day order.", subject: "Bowl of sabudana khichdi", alt: "Sabudana khichdi", keys: ["jain", "vegan"] },
];

function defaultFaqs(name: string, area: string, served: string, hours: string): { q: string; a: string }[] {
  return [
    { q: `Which areas does the ${name} kitchen deliver to?`, a: `We deliver across ${served} via Swiggy, Zomato and WhatsApp.` },
    { q: `What are the ${name} timings?`, a: `${hours}. Order before 11am for same-day lunch.` },
    { q: "Do you have Jain and vegan options here?", a: "Yes — a wide range of Jain (no onion, garlic or root vegetables) and vegan dishes, all clearly tagged on the menu." },
    { q: "Is everything vegetarian and made without maida?", a: "Always. We're a 100% vegetarian kitchen, cooking with whole-wheat atta and sunflower oil — never maida or palm oil — with no preservatives." },
  ];
}

export const KITCHENS: Kitchen[] = [
  {
    slug: "chandivali",
    title: "Chandivali",
    area: "Andheri East",
    note: "Our flagship kitchen — full menu, catering and travel packs. Serves Powai, Saki Naka and Marol.",
    hours: "Mon–Sun · 9am–10pm",
    address: "Gala No 6, Haria Shree Guppy Industrial Estate, Saki Vihar Rd, Ganesh Nagar, Chandivali, Andheri East, Mumbai, Maharashtra 400072",
    mapQuery: "Chandivali Industrial Estate, Andheri East, Mumbai",
    lat: 19.1145,
    lng: 72.8889,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-chandivali",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-powai-andheri-east-rest59034",
    flagship: true,
    areasServed: ["Powai", "Saki Naka", "Marol", "JB Nagar", "Chakala", "Andheri East", "Sakinaka Metro", "Kurla West"],
    popular: [
      { title: "Methi Thepla", desc: "Soft whole-wheat flatbread with fresh fenugreek — the Chandivali favourite.", subject: "Methi theplas on a brass plate", alt: "Methi theplas", keys: ["ww", "best"] },
      { title: "Gujarati Thali", desc: "A full home-style spread, cooked fresh through the day.", subject: "Gujarati thali, top-down", alt: "Gujarati thali", keys: ["best", "jain"] },
      { title: "Khaman Dhokla", desc: "Steamed and tempered — a teatime regular for the Powai crowd.", subject: "Khaman dhokla squares", alt: "Khaman dhokla", keys: ["vegan"] },
      { title: "Sabudana Khichdi", desc: "Light sago with peanuts — a popular fasting-day order here.", subject: "Bowl of sabudana khichdi", alt: "Sabudana khichdi", keys: ["jain", "vegan"] },
    ],
    localCopy:
      "Looking for Gujarati food delivery in Chandivali or Andheri East? Thepla House Chandivali is a 100% vegetarian kitchen serving home-style theplas, thalis, farsan and sweets — whole wheat, sunflower oil and no preservatives — with Jain and vegan options, open daily 9am–10pm.",
    faqs: [
      { q: "Which areas does the Chandivali kitchen deliver to?", a: "We deliver across Andheri East — Powai, Saki Naka, Marol, JB Nagar, Chakala and Kurla West — via Swiggy, Zomato and WhatsApp." },
      { q: "What are the Chandivali timings?", a: "Open Monday to Sunday, 9:00am to 10:00pm. Order before 11am for same-day lunch." },
      { q: "Do you have Jain and vegan options here?", a: "Yes — a wide range of Jain (no onion, garlic or root vegetables) and vegan dishes, all clearly tagged on the menu." },
      { q: "Can I order catering or travel packs from Chandivali?", a: "Absolutely. Chandivali is our flagship kitchen — it handles event and pooja catering with full Jain menus, and our vacuum-packed methi-thepla travel packs." },
    ],
  },
  {
    slug: "kalina",
    title: "Kalina",
    area: "Santacruz East",
    note: "Quick lunches and full thalis for the Kalina–Vakola–Santacruz belt.",
    hours: "Mon–Sun · 9am–10pm",
    address: "Shop No 3/4, Garib Nawaz Manjil, Pandit Jawaharlal Nehru Rd, Patel Park, Vakola, Santacruz East, Mumbai, Maharashtra 400055",
    mapQuery: "19.0815338,72.8565508",
    lat: 19.0815338,
    lng: 72.8565508,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-santacruz-east",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-next-to-raj-auto-garage-yashwant-nagar-kalina-santacruz-east-rest324194",
    areasServed: ["Kalina", "Vakola", "Santacruz East", "Vidyanagari", "Kurla West", "BKC"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House Kalina serves the Santacruz East and Vakola belt with fresh, home-style Gujarati food — whole-wheat theplas, full thalis and farsan, all 100% vegetarian with Jain and vegan options. Open daily 9am–10pm.",
    faqs: defaultFaqs("Kalina", "Santacruz East", "Kalina, Vakola, Santacruz East, Vidyanagari and BKC", "Open Monday to Sunday, 9am to 10pm"),
  },
  {
    slug: "lower-parel",
    title: "Lower Parel",
    area: "Senapati Bapat Marg",
    note: "Weekday lunches and farsan for the Lower Parel and Worli office crowd.",
    hours: "Mon–Sat · 9am–9pm",
    address: "9/D, Cotton Press Compound (PCPF), Unit 4/C, Elphinstone Bridge, near St. Mary's Church, Parel East, Parel, Mumbai, Maharashtra 400012",
    mapQuery: "19.0054158,72.8364362",
    lat: 19.0054158,
    lng: 72.8364362,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-parel",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-elphinstone-bridge-road-parel-rest427766",
    areasServed: ["Lower Parel", "Worli", "Prabhadevi", "Elphinstone", "Mahalaxmi", "Parel"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House Lower Parel keeps the Senapati Bapat Marg and Worli office crowd fed with quick, home-style weekday lunches — whole-wheat theplas, thalis and farsan, 100% vegetarian with Jain and vegan options. Open Monday to Saturday, 9am–9pm.",
    faqs: defaultFaqs("Lower Parel", "Senapati Bapat Marg", "Lower Parel, Worli, Prabhadevi, Elphinstone and Mahalaxmi", "Open Monday to Saturday, 9am to 9pm"),
  },
  {
    slug: "mulund",
    title: "Mulund",
    area: "Mulund West",
    note: "Home-style meals and theplas for the central suburbs.",
    hours: "Mon–Sun · 9am–10pm",
    address: "Gala No 77, Raja Industrial Estate, Mulund–Goregaon Link Rd, near D-Mart, Salpa Devi Pada, Mulund West, Mumbai, Maharashtra 400080",
    mapQuery: "19.1651303,72.9417104",
    lat: 19.1651303,
    lng: 72.9417104,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-mulund-west",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-mulund-raja-industrial-estate-rest605792",
    areasServed: ["Mulund West", "Mulund East", "Bhandup", "Nahur", "Airoli", "Vikhroli"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House Mulund brings home-style Gujarati food to the central suburbs — whole-wheat theplas, thalis, farsan and sweets, all 100% vegetarian with Jain and vegan options. Open daily 9am–10pm.",
    faqs: defaultFaqs("Mulund", "Mulund West", "Mulund West, Mulund East, Bhandup, Nahur and Vikhroli", "Open Monday to Sunday, 9am to 10pm"),
  },
  {
    slug: "thane",
    title: "Thane",
    area: "Manpada",
    note: "Fresh theplas and thalis delivered right across Thane, from our Manpada kitchen.",
    hours: "Mon–Sun · 9am–10pm",
    address: "Gala No 1, Omkar Compound, Bhavani Nagar, opp. Dosti Imperia, Manpada, Thane, Mumbai, Maharashtra 400610",
    mapQuery: "19.2333642,72.9748825",
    lat: 19.2333642,
    lng: 72.9748825,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-manpada-thane-west-thane",
    // ⚠️ Swiggy labels this "Thane Panchpakhadi" while the outlet address is Manpada — same brand & city; confirm it's this kitchen.
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-thane-panchpakhadi-rest1316580",
    areasServed: ["Thane West", "Manpada", "Kasarvadavali", "Majiwada", "Vartak Nagar", "Hiranandani Estate"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House Thane delivers fresh, home-style Gujarati food across Thane from our Manpada kitchen — whole-wheat theplas, thalis and farsan, 100% vegetarian with Jain and vegan options. Open daily 9am–10pm.",
    faqs: defaultFaqs("Thane", "Manpada", "Thane West, Manpada, Kasarvadavali, Majiwada and Hiranandani Estate", "Open Monday to Sunday, 9am to 10pm"),
  },
  {
    slug: "navi-mumbai",
    title: "Navi Mumbai",
    area: "Airport · Ulwe",
    note: "At the new Navi Mumbai International Airport — serving Ulwe and the airport belt.",
    hours: "Mon–Sun · 9am–10pm",
    address: "Navi Mumbai International Airport, Ulwe, Pargaon Dungi, Navi Mumbai, Maharashtra 410206",
    mapQuery: "Navi Mumbai International Airport, Ulwe",
    lat: 18.999,
    lng: 73.074,
    areasServed: ["Ulwe", "Dronagiri", "Panvel", "Kharghar", "Nerul", "Vashi"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House Navi Mumbai is at the new Navi Mumbai International Airport in Ulwe, serving the airport belt with fresh, home-style Gujarati food — whole-wheat theplas, thalis and farsan, 100% vegetarian with Jain and vegan options. Open daily 9am–10pm.",
    faqs: defaultFaqs("Navi Mumbai", "Ulwe", "Ulwe, Dronagiri, Panvel, Kharghar and Nerul", "Open Monday to Sunday, 9am to 10pm"),
  },
  {
    slug: "kandivali",
    title: "Kandivali",
    area: "Kandivali West · Dine-in",
    note: "Our dine-in outlet — eat it fresh, hot off the tawa, or take away.",
    hours: "Mon–Sun · 8am–10:30pm",
    address: "Shop No 1 & 2, Shreenath Enclave, Hemukalani Cross Rd No. 3, Sambhav Darshan, Hemu Colony, Irani Wadi, Kandivali West, Mumbai, Maharashtra 400067",
    mapQuery: "19.2018106,72.8397144",
    lat: 19.2018106,
    lng: 72.8397144,
    dineIn: true,
    // Verified GBP listing → "Thepla House by Tejal's Kitchen - Kandivali"
    // (19.2018106, 72.8397144). Powers hasMap/sameAs schema + the directions link.
    mapsUrl: "https://maps.app.goo.gl/4s6gDkKQ3mV9uvLfA",
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-kandivali-west",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-west-kandivali-rest1193204",
    seoTitle: "Thepla House Kandivali — Gujarati Thepla Dine-In in Kandivali West",
    seoDescription:
      "Fresh home-style Gujarati theplas, thalis & farsan — dine in, take away or order in Kandivali West (near Mahavir Nagar). 100% vegetarian, whole wheat, Jain & vegan. Open daily 8am–10:30pm.",
    seoParagraphs: [
      "Looking for fresh thepla in Kandivali West? Thepla House by Tejal's Kitchen is a 100% vegetarian, home-style Gujarati dine-in outlet in Kandivali West, a short walk from Mahavir Nagar and the MHADA Colony. Eat in hot off the tawa, take away, or order delivery — we serve methi theplas, full Gujarati thalis, farsan and sweets, all made with whole-wheat atta and sunflower oil, never maida or palm oil.",
      "Our Kandivali outlet keeps the longest hours of any Thepla House — daily from 8am to 10:30pm — so you can grab a thepla-and-chai breakfast, a wholesome thali for lunch, or farsan and sweets through the evening. We're a neighbourhood favourite for ghar ka khana across Kandivali West, Kandivali East, Charkop, Borivali and Malad, with Jain and vegan options clearly tagged on every dish.",
      "Whether you want to sit down with family, pick up a stack of theplas on the way home, or order a Gujarati thali to your door, Thepla House Kandivali serves honest, home-style Gujarati food made fresh every day. Junk the junk food — eat real ghar ka khana instead.",
    ],
    areasServed: ["Kandivali West", "Kandivali East", "Borivali", "Malad", "Charkop", "Poisar"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House Kandivali is our dine-in outlet in Kandivali West — eat home-style Gujarati food fresh off the tawa, take away, or order delivery. 100% vegetarian, whole wheat, with Jain and vegan options. Open daily 8am–10:30pm.",
    faqs: [
      { q: "Where is Thepla House in Kandivali?", a: "We're at Shop No 1 & 2, Shreenath Enclave, Hemukalani Cross Road No. 3, Hemu Colony, Irani Wadi, Kandivali West — close to Mahavir Nagar and the MHADA Colony, easy to reach from Kandivali East, Charkop, Borivali and Malad." },
      { q: "Where can I get the best thepla in Kandivali West?", a: "Thepla House by Tejal's Kitchen serves fresh, home-style methi theplas, thalis and farsan in Kandivali West — 100% vegetarian, 100% whole wheat, no maida and no palm oil. Dine in hot off the tawa, take away, or order delivery." },
      { q: "Is Kandivali a dine-in outlet?", a: "Yes — Kandivali West is our dine-in and takeaway outlet. Eat fresh off the tawa, take away, or order delivery on Swiggy, Zomato and WhatsApp." },
      { q: "What are the Kandivali timings?", a: "Open Monday to Sunday, 8:00am to 10:30pm — the longest hours of any Thepla House kitchen." },
      { q: "Do you have Jain and vegan options here?", a: "Yes — Jain (no onion, garlic or root vegetables) and vegan dishes are clearly tagged across the menu." },
      { q: "Is everything vegetarian and made without maida?", a: "Always. 100% vegetarian, whole-wheat atta and sunflower oil — never maida or palm oil — with no preservatives." },
    ],
  },
];

export function getKitchen(slug: string): Kitchen | undefined {
  return KITCHENS.find((k) => k.slug === slug);
}
