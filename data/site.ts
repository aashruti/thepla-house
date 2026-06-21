/**
 * Thepla House — central site data: real brand facts, contacts, ordering
 * channels, navigation and footer. No prices, no invented reviews/awards.
 */

export const SITE = {
  name: "Thepla House by Tejal's Kitchen",
  shortName: "Thepla House",
  tagline: "Junk the Junk Food.",
  founder: "Tejal Shah",
  since: 2018,
  city: "Mumbai",
  url: "https://theplahouse.com",
  description:
    "100% vegetarian, whole-wheat Gujarati food made fresh in Mumbai since 2018. Order theplas, thalis & snacks on Swiggy, Zomato or WhatsApp. Jain & vegan options.",
  logo: "/logo/theplahouse-logo.png",
} as const;

// ---- Maps -----------------------------------------------------------------
// Google "My Maps" embed URL for the /locations hub map — shows ONLY our own
// outlets (no competitors, no stale Google listings). Create a My Map with a
// pin per outlet, then Share → Embed on my site and paste the iframe `src` here.
// Leave empty ("") to fall back to the stylised placeholder map.
export const LOCATIONS_MAP_EMBED = "";

// ---- Contacts -------------------------------------------------------------
export const ORDER_PHONE = "+91 98195 55065";
export const ORDER_PHONE_TEL = "tel:+919819555065";
export const WHATSAPP_LINK = "https://wa.me/919819555065";
export const INSTAGRAM_HANDLE = "@tejals_kitchen";
export const INSTAGRAM_LINK = "https://instagram.com/tejals_kitchen";

export const FRANCHISE_CONTACT = {
  name: "Mr. Dhaval Shah",
  phone: "+91 98 33 44 3014",
  phoneTel: "tel:+919833443014",
  email: "Dhaval@theplahouse.com",
} as const;

// External ordering aggregators (placeholders for the brand's real listings).
export const SWIGGY_LINK = "https://www.swiggy.com";
export const ZOMATO_LINK = "https://www.zomato.com";

// ---- Ordering channels ----------------------------------------------------
export interface OrderChannel {
  label: string;
  href: string;
  dot: string; // brand-colour dot
  external?: boolean;
}

export const ORDER_CHANNELS: OrderChannel[] = [
  { label: "Swiggy", href: SWIGGY_LINK, dot: "var(--gold-500)", external: true },
  { label: "Zomato", href: ZOMATO_LINK, dot: "var(--maroon-600)", external: true },
  { label: "WhatsApp", href: WHATSAPP_LINK, dot: "var(--leaf-500)", external: true },
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
      { label: "Order now", href: "/menu" },
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
      { label: "Thane", href: "/locations/thane" },
      { label: "Kandivali (dine-in)", href: "/locations/kandivali" },
    ],
  },
];

export const FOOTER_SOCIALS = [
  { label: "Instagram", href: INSTAGRAM_LINK },
  { label: "WhatsApp", href: WHATSAPP_LINK },
];

export const FOOTER_NOTE = `© ${new Date().getFullYear()} Thepla House by Tejal's Kitchen · Mumbai · Instagram ${INSTAGRAM_HANDLE}`;
