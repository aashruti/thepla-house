/**
 * Thepla House — central site data: real brand facts, contacts, ordering
 * channels, navigation and footer. No prices, no invented reviews/awards.
 */

export const SITE = {
  name: "Thepla House by Tejal's Kitchen",
  // Short form, used ONLY as the title-tag suffix the root layout appends and as
  // the home-screen app label. Not a leftover: the suffix sits at the end of every
  // title, and the full name there costs 34 characters — enough to push most
  // titles past what Google shows, cutting the brand off entirely. Everything a
  // reader actually sees uses `name`.
  shortName: "Thepla House",
  tagline: "Junk the Junk Food.",
  founder: "Tejal Shah",
  since: 2018,
  city: "Mumbai",
  // Canonical host MUST match where the site actually serves. The domain
  // 308-redirects non-www → www, so www is canonical; using non-www here made
  // every canonical/sitemap/OG/JSON-LD URL point at a redirect, which left pages
  // stuck "Discovered – currently not indexed" in Google.
  url: "https://www.theplahouse.com",
  description:
    "Home-style Gujarati food in Mumbai since 2018 — 100% vegetarian, whole-wheat and healthy, made fresh to order. Theplas, thalis, farsan & sweets delivered like a home tiffin via Swiggy, Zomato or WhatsApp. Jain & vegan options.",
  logo: "/logo/theplahouse-logo.png",
} as const;

// ---- Maps -----------------------------------------------------------------
// Google "My Maps" embed URL for the /locations hub map — the only way to show
// every outlet on one map: a keyless Google embed renders a single place, and a
// text query (?q=Thepla House Mumbai) renders Google's SEARCH RESULTS, i.e. our
// competitors, on our own locations page.
//
// To fill this in:
//   1. google.com/mymaps → Create a new map, name it "Thepla House — Outlets"
//   2. Add one pin per outlet (paste each address, then correct the pin to the
//      exact coordinates in data/kitchens.ts if Google drops it loosely)
//   3. Share → "Anyone with the link" (the embed is blank if it stays private)
//   4. ⋮ → Embed on my site → copy ONLY the src="..." value from the iframe
//
// Expect a URL of the form https://www.google.com/maps/d/embed?mid=...
// While this is empty, the hub map falls back to a single pin on the flagship.
export const LOCATIONS_MAP_EMBED = "https://www.google.com/maps/d/embed?mid=1XkN7dyYIq2WMmKX4iFrpdGtp-p0RzI4";

// ---- Contacts -------------------------------------------------------------
export const ORDER_PHONE = "+91 98195 55065";
export const ORDER_PHONE_TEL = "tel:+919819555065";
export const WHATSAPP_LINK = "https://wa.me/919819555065";
export const INSTAGRAM_HANDLE = "@tejals_kitchen";
export const INSTAGRAM_LINK = "https://instagram.com/tejals_kitchen";
export const CONTACT_EMAIL = "tejal@theplahouse.com";

// ---- Legal / app-store compliance -----------------------------------------
export const LEGAL_ENTITY_NAME = "Thepla House By Tejal's Kitchen Pvt Ltd";
export const LEGAL_REGISTERED_ADDRESS =
  "Gala No 6, Haria Shree Guppy Industrial Estate, Saki Vihar Rd, Ganesh Nagar, Chandivali, Andheri East, Mumbai, Maharashtra 400072";
export const SUPPORT_EMAIL = "reports@theplahouse.com";
export const PRIVACY_CONTACT_EMAIL = SUPPORT_EMAIL;

// Franchise lead. Deliberately email-only: the direct number was published on the
// franchise, contact and home pages and drew far more unqualified calls than it was
// worth. Franchise enquiries now come through the application form on /franchise,
// and we call the applicant back.
export const FRANCHISE_CONTACT = {
  name: "Mr. Dhaval Shah",
  email: "Dhaval@theplahouse.com",
} as const;

// External ordering aggregators — brand-level listings, NOT the bare homepages.
// These are what every "Order on Swiggy / Zomato" chip points at, so they must
// land on Thepla House, not on the aggregator's front page.
//
// Zomato: the chain page Zomato itself links to from each outlet ("See all N
// Thepla House By Tejal's Kitchen outlets in Mumbai") and declares as canonical.
export const ZOMATO_LINK = "https://www.zomato.com/mumbai/restaurants/thepla-house-by-tejals-kitchen";
// Swiggy has no chain page, so this is its brand search — location-aware, and it
// surfaces the customer's nearest outlet rather than a fixed one.
export const SWIGGY_LINK = "https://www.swiggy.com/search?query=Thepla%20House%20by%20Tejal%27s%20Kitchen";

// Where every "Order now" button goes. Swiggy, because it takes orders from a
// link off our site; Zomato does not, so its chips stay as listing links only.
// When the brand's own ordering launches, change this one line.
export const ORDER_NOW_LINK = SWIGGY_LINK;

// ---- Ordering channels ----------------------------------------------------
export interface OrderChannel {
  href: string;
  /** Rendered by AggregatorLink with the service's official mark and colour. */
  aggregator: "swiggy" | "zomato" | "whatsapp";
}

export const ORDER_CHANNELS: OrderChannel[] = [
  { href: SWIGGY_LINK, aggregator: "swiggy" },
  { href: ZOMATO_LINK, aggregator: "zomato" },
  { href: WHATSAPP_LINK, aggregator: "whatsapp" },
];

// ---- Navigation -----------------------------------------------------------
export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "Catering", href: "/catering" },
  { label: "Travel Packs", href: "/travel-packs" },
  { label: "Franchise", href: "/franchise" },
  { label: "About", href: "/about" },
];

// ---- Footer ---------------------------------------------------------------
export const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "Locations", href: "/locations" },
      { label: "Our story", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Order & services",
    links: [
      { label: "Order now", href: ORDER_NOW_LINK },
      { label: "Home-style food & tiffin", href: "/tiffin-service-mumbai" },
      { label: "Catering", href: "/catering" },
      { label: "Travel packs", href: "/travel-packs" },
      { label: "Franchise", href: "/franchise" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Chandivali · Andheri East", href: "/locations/chandivali" },
      { label: "Lower Parel", href: "/locations/lower-parel" },
      { label: "Mulund", href: "/locations/mulund" },
      { label: "Thane · Manpada", href: "/locations/thane" },
      { label: "Thane · Stadium", href: "/locations/thane-stadium" },
      { label: "Kandivali (dine-in)", href: "/locations/kandivali" },
      { label: "Navi Mumbai Airport", href: "/locations/navi-mumbai" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Delete your account", href: "/delete-account" },
    ],
  },
];

export const FOOTER_SOCIALS = [
  { label: "Instagram", href: INSTAGRAM_LINK },
  { label: "WhatsApp", href: WHATSAPP_LINK },
];

export const FOOTER_NOTE = `© ${new Date().getFullYear()} Thepla House by Tejal's Kitchen · Mumbai · Instagram ${INSTAGRAM_HANDLE}`;
