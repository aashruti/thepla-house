import { POPULAR_DISHES, type Dish } from "./menu";

/** Same shape as a menu dish, so outlet pages can show the real photos. */
export type KitchenDish = Dish;

export interface Kitchen {
  slug: string;
  title: string;
  /** locality shown as the card eyebrow */
  area: string;
  /** short blurb for the locations hub card */
  note: string;
  /** Human-readable hours for the page. Omitted when we publish none. */
  hours?: string;
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
   * Franchise counter inside the airport departures terminal: no delivery, and
   * reachable only by departing passengers past security. Suppresses delivery
   * copy, delivery areas and the delivery OrderAction.
   */
  airside?: boolean;
  /**
   * Trading hours, one entry per distinct pattern. An outlet that shuts early on
   * one weekday, or splits its day into two shifts, needs more than one entry —
   * so this is a list rather than a single opens/closes pair.
   * Omit entirely when we don't publish hours for the outlet.
   */
  openingHours?: OpeningHours[];
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

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHours {
  days: Weekday[];
  /** 24h "HH:MM" */
  opens: string;
  closes: string;
}

const ALL_DAYS: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Open 7:30am–10:30pm every day — the common pattern. */
const FULL_WEEK: OpeningHours[] = [{ days: ALL_DAYS, opens: "07:30", closes: "22:30" }];

/** Full days, except one weekday when the kitchen closes at 3pm. */
const shortDayOn = (day: Weekday): OpeningHours[] => [
  { days: ALL_DAYS.filter((d) => d !== day), opens: "07:30", closes: "22:30" },
  { days: [day], opens: "07:30", closes: "15:00" },
];

// The sales data is chain-wide, not per outlet, so every outlet shows the same
// top sellers rather than claiming a local favourite nothing measured.
const DEFAULT_POPULAR: KitchenDish[] = POPULAR_DISHES.slice(0, 4);

function defaultFaqs(name: string, area: string, served: string, hours: string): { q: string; a: string }[] {
  return [
    { q: `Which areas does the ${name} kitchen deliver to?`, a: `We deliver across ${served} via Swiggy, Zomato and WhatsApp.` },
    { q: `What are the ${name} timings?`, a: `${hours}. Order before 11am for same-day lunch.` },
    { q: "Do you have Jain and vegan options here?", a: "Yes — a wide range of Jain (no onion, garlic or root vegetables) and vegan dishes are available — just ask when you order." },
    { q: "Is everything vegetarian and made without maida?", a: "Always. We're a 100% vegetarian kitchen, cooking with whole-wheat atta and sunflower oil — never maida or palm oil — with no preservatives." },
  ];
}

export const KITCHENS: Kitchen[] = [
  {
    slug: "chandivali",
    title: "Chandivali",
    area: "Andheri East",
    note: "Our flagship kitchen — full menu, catering and travel packs. Serves Powai, Saki Naka and Marol.",
    hours: "Mon–Sun · 7:30am–10:30pm",
    openingHours: FULL_WEEK,
    address: "Gala No 6, Haria Shree Guppy Industrial Estate, Saki Vihar Rd, Ganesh Nagar, Chandivali, Andheri East, Mumbai, Maharashtra 400072",
    mapQuery: "Chandivali Industrial Estate, Andheri East, Mumbai",
    lat: 19.1145,
    lng: 72.8889,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-chandivali",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-powai-andheri-east-rest59034",
    flagship: true,
    areasServed: ["Powai", "Saki Naka", "Marol", "JB Nagar", "Chakala", "Andheri East", "Sakinaka Metro", "Kurla West"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Looking for Gujarati food delivery in Chandivali or Andheri East? Thepla House by Tejal's Kitchen Chandivali is a 100% vegetarian kitchen serving home-style theplas, thalis, farsan and sweets — whole wheat, sunflower oil and no preservatives — with Jain and vegan options, open daily 7:30am to 10:30pm.",
    faqs: [
      { q: "Which areas does the Chandivali kitchen deliver to?", a: "We deliver across Andheri East — Powai, Saki Naka, Marol, JB Nagar, Chakala and Kurla West — via Swiggy, Zomato and WhatsApp." },
      { q: "What are the Chandivali timings?", a: "Open every day, 7:30am to 10:30pm. Order before 11am for same-day lunch." },
      { q: "Do you have Jain and vegan options here?", a: "Yes — a wide range of Jain (no onion, garlic or root vegetables) and vegan dishes are available — just ask when you order." },
      { q: "Can I order catering or travel packs from Chandivali?", a: "Absolutely. Chandivali is our flagship kitchen — it handles event and pooja catering with full Jain menus, and our vacuum-packed methi-thepla travel packs." },
    ],
  },
  {
    slug: "kalina",
    title: "Kalina",
    area: "Santacruz East",
    note: "Quick lunches and full thalis for the Kalina–Vakola–Santacruz belt.",
    hours: "Mon–Sun · 7:30am–10:30pm · Wed till 3pm",
    openingHours: shortDayOn("Wednesday"),
    address: "Shop No 3/4, Garib Nawaz Manjil, Pandit Jawaharlal Nehru Rd, Patel Park, Vakola, Santacruz East, Mumbai, Maharashtra 400055",
    mapQuery: "19.0815338,72.8565508",
    lat: 19.0815338,
    lng: 72.8565508,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-santacruz-east",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-next-to-raj-auto-garage-yashwant-nagar-kalina-santacruz-east-rest324194",
    areasServed: ["Kalina", "Vakola", "Santacruz East", "Vidyanagari", "Kurla West", "BKC"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House by Tejal's Kitchen Kalina serves the Santacruz East and Vakola belt with fresh, home-style Gujarati food — whole-wheat theplas, full thalis and farsan, all 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm, and until 3pm on Wednesdays.",
    faqs: defaultFaqs("Kalina", "Santacruz East", "Kalina, Vakola, Santacruz East, Vidyanagari and BKC", "Open every day 7:30am to 10:30pm, and 7:30am to 3pm on Wednesdays"),
  },
  {
    slug: "lower-parel",
    title: "Lower Parel",
    area: "Senapati Bapat Marg",
    note: "Weekday lunches and farsan for the Lower Parel and Worli office crowd.",
    hours: "Mon–Sun · 7:30am–10:30pm · Fri till 3pm",
    openingHours: shortDayOn("Friday"),
    address: "9/D, Cotton Press Compound (PCPF), Unit 4/C, Elphinstone Bridge, near St. Mary's Church, Parel East, Parel, Mumbai, Maharashtra 400012",
    mapQuery: "19.0054158,72.8364362",
    lat: 19.0054158,
    lng: 72.8364362,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-parel",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-elphinstone-bridge-road-parel-rest427766",
    areasServed: ["Lower Parel", "Worli", "Prabhadevi", "Elphinstone", "Mahalaxmi", "Parel"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House by Tejal's Kitchen Lower Parel keeps the Senapati Bapat Marg and Worli office crowd fed with quick, home-style weekday lunches — whole-wheat theplas, thalis and farsan, 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm, and until 3pm on Fridays.",
    faqs: defaultFaqs("Lower Parel", "Senapati Bapat Marg", "Lower Parel, Worli, Prabhadevi, Elphinstone and Mahalaxmi", "Open every day 7:30am to 10:30pm, and 7:30am to 3pm on Fridays"),
  },
  {
    slug: "mulund",
    title: "Mulund",
    area: "Mulund West",
    note: "Home-style meals and theplas for the central suburbs.",
    hours: "Mon–Sun · 7:30am–10:30pm · Wed till 3pm",
    openingHours: shortDayOn("Wednesday"),
    address: "Gala No 77, Raja Industrial Estate, Mulund–Goregaon Link Rd, near D-Mart, Salpa Devi Pada, Mulund West, Mumbai, Maharashtra 400080",
    mapQuery: "19.1651303,72.9417104",
    lat: 19.1651303,
    lng: 72.9417104,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-mulund-west",
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-mulund-raja-industrial-estate-rest605792",
    areasServed: ["Mulund West", "Mulund East", "Bhandup", "Nahur", "Airoli", "Vikhroli"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House by Tejal's Kitchen Mulund brings home-style Gujarati food to the central suburbs — whole-wheat theplas, thalis, farsan and sweets, all 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm, and until 3pm on Wednesdays.",
    faqs: defaultFaqs("Mulund", "Mulund West", "Mulund West, Mulund East, Bhandup, Nahur and Vikhroli", "Open every day 7:30am to 10:30pm, and 7:30am to 3pm on Wednesdays"),
  },
  {
    slug: "thane",
    title: "Thane",
    area: "Manpada",
    note: "Fresh theplas and thalis delivered right across Thane, from our Manpada kitchen.",
    hours: "Mon–Sun · 7:30am–10:30pm · Fri till 3pm",
    openingHours: shortDayOn("Friday"),
    address: "Gala No 1, Omkar Compound, Bhavani Nagar, opp. Dosti Imperia, Manpada, Thane, Mumbai, Maharashtra 400610",
    mapQuery: "19.2333642,72.9748825",
    lat: 19.2333642,
    lng: 72.9748825,
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-manpada-thane-west-thane",
    // Verified via Swiggy's own outlet switcher: this Manpada kitchen is listed as
    // "Bhavani Nagar, Thane" (4.5, 3.8K+ ratings), matching the address below.
    // The "Thane Panchpakhadi" listing that used to sit here is a DIFFERENT outlet
    // — it belongs to the Dadoji Konddev Stadium kitchen further down.
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-bhavani-nagar-thane-rest915463",
    areasServed: ["Thane West", "Manpada", "Kasarvadavali", "Majiwada", "Vartak Nagar", "Hiranandani Estate"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House by Tejal's Kitchen Thane delivers fresh, home-style Gujarati food across Thane from our Manpada kitchen — whole-wheat theplas, thalis and farsan, 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm, and until 3pm on Fridays.",
    faqs: defaultFaqs("Thane", "Manpada", "Thane West, Manpada, Kasarvadavali, Majiwada and Hiranandani Estate", "Open every day 7:30am to 10:30pm, and 7:30am to 3pm on Fridays"),
  },
  {
    slug: "thane-stadium",
    title: "Thane Stadium",
    area: "Dadoji Konddev Stadium · Naupada",
    // Dine-in + banquet per the brand's own deck and website brief. Note the
    // Zomato listing still says "Delivery only, no seating" — worth correcting
    // there, since that is what most customers will check first.
    dineIn: true,
    note: "Dine-in, takeaway and delivery at Dadoji Konddev Stadium, Naupada — with a banquet hall seating up to 250.",
    // Split shift: the aggregator listings only ever show the evening one.
    hours: "Mon–Sun · 8am–3pm & 5pm–10pm",
    openingHours: [
      { days: ALL_DAYS, opens: "08:00", closes: "15:00" },
      { days: ALL_DAYS, opens: "17:00", closes: "22:00" },
    ],
    address: "Canteen Dadoji, Kondev Stadium, Jambil Naka, Zone 1, Old Muncipal Road, Naupada, Thane West, Thane, Maharashtra 400601",
    mapQuery: "19.191686,72.979006",
    lat: 19.191686,
    lng: 72.979006,
    phone: "+91 90044 06296",
    zomatoUrl: "https://www.zomato.com/mumbai/thepla-house-by-tejals-kitchen-naupada-thane-west-thane",
    // Swiggy lists this outlet as "Thane Panchpakhadi" (the locality next to Naupada).
    // Confirmed the same outlet as the Zomato listing above: both open at 5pm, and
    // Swiggy's outlet switcher puts it 1.4 km from Naupada with Manpada listed
    // separately as "Bhavani Nagar, Thane".
    swiggyUrl: "https://www.swiggy.com/city/mumbai/thepla-house-by-tejals-kitchen-thane-panchpakhadi-rest1316580",
    areasServed: ["Naupada", "Panchpakhadi", "Tembhi Naka", "Khopat", "Jambli Naka", "Thane Station"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House by Tejal's Kitchen at Dadoji Konddev Stadium, Jambli Naka, Naupada is our Thane dine-in outlet — eat in, take away, or get whole-wheat theplas, thalis and farsan delivered across Thane West. It also has a banquet hall seating up to 250 guests for family functions, celebrations and corporate events. 100% vegetarian, with Jain and vegan options. Open daily 8am to 3pm and 5pm to 10pm.",
    faqs: [
      {
        q: "Can I dine in at Thepla House by Tejal's Kitchen Dadoji Konddev Stadium?",
        a: "Yes. This is a dine-in outlet at the stadium in Naupada, Thane West, near Thane railway station — eat in, take away, or order delivery across Thane West.",
      },
      {
        q: "Do you have a banquet hall in Thane?",
        a: "Yes — the Dadoji Konddev Stadium outlet has a banquet hall seating up to 250 guests, suitable for family functions, celebrations, corporate gatherings and community events. Call us to check dates and plan the menu.",
      },
      {
        q: "What are the Thane Stadium timings?",
        a: "Open every day, 8am to 3pm and again 5pm to 10pm.",
      },
      {
        q: "Is everything vegetarian, with Jain and vegan options?",
        a: "Always. We're a 100% vegetarian kitchen, cooking with whole-wheat atta and sunflower oil — never maida or palm oil — with no preservatives. Jain and vegan dishes are available.",
      },
    ],
  },
  {
    slug: "navi-mumbai",
    title: "Navi Mumbai Airport",
    area: "Departures · NMIA",
    airside: true,
    note: "Our franchise counter inside Navi Mumbai International Airport departures — takeaway for passengers, no delivery.",
    // No hours published: a terminal counter runs to the flight schedule, and a
    // wrong time here is worse than none. `hours`/`openingHours` are both omitted,
    // so the badge, the Hours column and openingHoursSpecification all drop out.
    address: "Departures terminal, Navi Mumbai International Airport, Ulwe, Pargaon Dungi, Navi Mumbai, Maharashtra 410206",
    // Coordinates, not a text search — a brand/place text query pulls competitors
    // into the embed and into Google's entity understanding for this outlet.
    mapQuery: "18.999,73.074",
    lat: 18.999,
    lng: 73.074,
    // No areasServed: this counter is airside and delivers nowhere.
    areasServed: [],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House by Tejal's Kitchen at Navi Mumbai International Airport is a franchise counter inside the departures terminal — fresh, home-style Gujarati food to take on board, whole-wheat theplas, thalis and farsan, 100% vegetarian with Jain and vegan options. Takeaway for departing passengers only; this outlet does not deliver.",
    faqs: [
      {
        q: "Where exactly is Thepla House by Tejal's Kitchen at Navi Mumbai airport?",
        a: "Inside the departures terminal at Navi Mumbai International Airport, Ulwe. It is past security, so it is reachable only by passengers departing from NMIA — not from the landside pick-up area.",
      },
      {
        q: "Does the airport outlet deliver?",
        a: "No. This is a takeaway counter for departing passengers and does not deliver, so it is not on Swiggy or Zomato. For delivery across Navi Mumbai, order from your nearest Thepla House by Tejal's Kitchen kitchen on our locations page.",
      },
      {
        q: "Can I order ahead or collect from the airport counter?",
        a: "Orders are taken at the counter itself. Because it sits past security, collection is only possible if you are already flying out of the departures terminal.",
      },
      {
        q: "Is everything vegetarian, with Jain and vegan options?",
        a: "Always. It is a 100% vegetarian counter cooking with whole-wheat atta and sunflower oil — never maida or palm oil — with Jain and vegan choices available.",
      },
    ],
  },
  {
    slug: "kandivali",
    title: "Kandivali",
    area: "Kandivali West · Dine-in",
    note: "Our dine-in outlet — eat it fresh, hot off the tawa, or take away.",
    hours: "Mon–Sun · 7:30am–10:30pm",
    openingHours: FULL_WEEK,
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
    seoTitle: "Thepla House by Tejal's Kitchen, Kandivali — Dine-in",
    seoDescription:
      "Fresh home-style Gujarati theplas, thalis & farsan — dine in, take away or order in Kandivali West (near Mahavir Nagar). 100% vegetarian, whole wheat, Jain & vegan. Open daily 7:30am to 10:30pm.",
    seoParagraphs: [
      "Looking for fresh thepla in Kandivali West? Thepla House by Tejal's Kitchen is a 100% vegetarian, home-style Gujarati dine-in outlet in Kandivali West, a short walk from Mahavir Nagar and the MHADA Colony. Eat in hot off the tawa, take away, or order delivery — we serve methi theplas, full Gujarati thalis, farsan and sweets, all made with whole-wheat atta and sunflower oil, never maida or palm oil.",
      "Our Kandivali outlet is open daily from 7:30am to 10:30pm, so you can grab a thepla-and-chai breakfast, a wholesome thali for lunch, or farsan and sweets through the evening. We're a neighbourhood favourite for ghar ka khana across Kandivali West, Kandivali East, Charkop, Borivali and Malad, with Jain and vegan options available.",
      "Whether you want to sit down with family, pick up a stack of theplas on the way home, or order a Gujarati thali to your door, Thepla House by Tejal's Kitchen Kandivali serves honest, home-style Gujarati food made fresh every day. Junk the junk food — eat real ghar ka khana instead.",
    ],
    areasServed: ["Kandivali West", "Kandivali East", "Borivali", "Malad", "Charkop", "Poisar"],
    popular: DEFAULT_POPULAR,
    localCopy:
      "Thepla House by Tejal's Kitchen Kandivali is our dine-in outlet in Kandivali West — eat home-style Gujarati food fresh off the tawa, take away, or order delivery. 100% vegetarian, whole wheat, with Jain and vegan options. Open daily 7:30am to 10:30pm.",
    faqs: [
      { q: "Where is Thepla House by Tejal's Kitchen in Kandivali?", a: "We're at Shop No 1 & 2, Shreenath Enclave, Hemukalani Cross Road No. 3, Hemu Colony, Irani Wadi, Kandivali West — close to Mahavir Nagar and the MHADA Colony, easy to reach from Kandivali East, Charkop, Borivali and Malad." },
      { q: "Where can I get the best thepla in Kandivali West?", a: "Thepla House by Tejal's Kitchen serves fresh, home-style methi theplas, thalis and farsan in Kandivali West — 100% vegetarian, 100% whole wheat, no maida and no palm oil. Dine in hot off the tawa, take away, or order delivery." },
      { q: "Is Kandivali a dine-in outlet?", a: "Yes — Kandivali West is our dine-in and takeaway outlet. Eat fresh off the tawa, take away, or order delivery on Swiggy, Zomato and WhatsApp." },
      { q: "What are the Kandivali timings?", a: "Open every day, 7:30am to 10:30pm." },
      { q: "Do you have Jain and vegan options here?", a: "Yes — Jain (no onion, garlic or root vegetables) and vegan dishes are available — just ask when you order." },
      { q: "Is everything vegetarian and made without maida?", a: "Always. 100% vegetarian, whole-wheat atta and sunflower oil — never maida or palm oil — with no preservatives." },
    ],
  },
];

export function getKitchen(slug: string): Kitchen | undefined {
  return KITCHENS.find((k) => k.slug === slug);
}
