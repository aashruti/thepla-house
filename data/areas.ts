import type { TagKey } from "./menu";

export interface AreaDish {
  title: string;
  desc: string;
  subject: string;
  alt: string;
  keys: TagKey[];
}

export interface Area {
  slug: string; // -> /gujarati-food-delivery-[slug]
  name: string;
  /** Existing location page to consolidate into when both URLs target the same intent. */
  redirectTo?: string;
  servingKitchenSlug: string;
  servingKitchenName: string;
  areasServed: string[];
  localCopy: string;
  popular: AreaDish[];
  faqs: { q: string; a: string }[];
}

function popularFor(area: string): AreaDish[] {
  return [
    { title: "Methi Thepla", desc: `Whole-wheat thepla with fresh fenugreek — ${area}'s favourite.`, subject: "Methi theplas on a brass plate", alt: "Methi theplas", keys: ["ww", "best"] },
    { title: "Gujarati Thali", desc: "A full home-style spread, delivered hot.", subject: "Gujarati thali, top-down", alt: "Gujarati thali", keys: ["best", "jain"] },
    { title: "Khaman Dhokla", desc: "Steamed and tempered — a teatime regular.", subject: "Khaman dhokla squares", alt: "Khaman dhokla", keys: ["vegan"] },
    { title: "Sabudana Khichdi", desc: "Light sago with peanuts — popular on fasting days.", subject: "Bowl of sabudana khichdi", alt: "Sabudana khichdi", keys: ["jain", "vegan"] },
  ];
}

function geoFaqs(area: string, kitchen: string, served: string, hours = "every day, 7:30am to 10:30pm"): { q: string; a: string }[] {
  return [
    { q: `Do you deliver Gujarati food across ${area}?`, a: `Yes — we deliver across ${served} from our ${kitchen} kitchen via Swiggy, Zomato and WhatsApp.` },
    { q: `What are your ${area} delivery timings?`, a: `We're open ${hours}. Order before 11am for same-day lunch delivery.` },
    { q: `Is this healthy, home-style food in ${area}?`, a: `It's real ghar ka khana — cooked with whole-wheat atta, sunflower oil and no preservatives or maida. A healthy, home-style alternative to a regular tiffin, made fresh to order.` },
    { q: "Is the food Jain and vegan friendly?", a: "Absolutely — Jain (no onion, garlic or root vegetables) and vegan options are available — just ask when you order." },
    { q: "Is everything vegetarian and made without maida?", a: "Yes. We're a 100% vegetarian kitchen, cooking with whole-wheat atta and sunflower oil — never maida or palm oil — with no preservatives." },
  ];
}

export const AREAS: Area[] = [
  {
    slug: "andheri",
    name: "Andheri",
    servingKitchenSlug: "chandivali",
    servingKitchenName: "Thepla House by Tejal's Kitchen Chandivali",
    areasServed: ["Andheri East", "Andheri West", "Chakala", "Marol", "MIDC", "JB Nagar", "Lokhandwala", "Sakinaka"],
    localCopy:
      "Thepla House by Tejal's Kitchen delivers fresh, home-style Gujarati food across Andheri from our Chandivali kitchen — methi theplas, full thalis, farsan and sweets, all 100% vegetarian and made with whole-wheat atta and no palm oil. Open daily 7:30am to 10:30pm, with Jain and vegan options throughout.",
    popular: popularFor("Andheri"),
    faqs: geoFaqs("Andheri", "Chandivali", "Andheri East and West, including Chakala, Marol, MIDC, JB Nagar, Lokhandwala and Sakinaka"),
  },
  {
    slug: "powai",
    name: "Powai",
    servingKitchenSlug: "chandivali",
    servingKitchenName: "Thepla House by Tejal's Kitchen Chandivali",
    areasServed: ["Powai", "Hiranandani", "Chandivali", "Saki Vihar", "IIT Powai", "Kanjurmarg"],
    localCopy:
      "Thepla House by Tejal's Kitchen delivers home-style Gujarati food across Powai from our nearby Chandivali kitchen — whole-wheat methi theplas, thalis, farsan and sweets, 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm.",
    popular: popularFor("Powai"),
    faqs: geoFaqs("Powai", "Chandivali", "Powai, Hiranandani, Chandivali, Saki Vihar and Kanjurmarg"),
  },
  {
    slug: "mulund",
    name: "Mulund",
    redirectTo: "/locations/mulund",
    servingKitchenSlug: "mulund",
    servingKitchenName: "Thepla House by Tejal's Kitchen Mulund",
    areasServed: ["Mulund West", "Mulund East", "Bhandup", "Nahur", "Vikhroli", "Airoli"],
    localCopy:
      "Thepla House by Tejal's Kitchen delivers fresh, home-style Gujarati food across Mulund from our Mulund West kitchen — whole-wheat theplas, thalis, farsan and sweets, 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm, and until 3pm on Wednesdays.",
    popular: popularFor("Mulund"),
    faqs: geoFaqs("Mulund", "Mulund", "Mulund West, Mulund East, Bhandup, Nahur and Vikhroli", "every day 7:30am to 10:30pm, and until 3pm on Wednesdays"),
  },
  {
    slug: "thane",
    name: "Thane",
    redirectTo: "/locations/thane",
    servingKitchenSlug: "thane",
    servingKitchenName: "Thepla House by Tejal's Kitchen Thane",
    areasServed: ["Thane West", "Manpada", "Kasarvadavali", "Majiwada", "Vartak Nagar", "Hiranandani Estate"],
    localCopy:
      "Thepla House by Tejal's Kitchen delivers fresh, home-style Gujarati food across Thane from our Manpada kitchen — whole-wheat theplas, thalis, farsan and sweets, 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm, and until 3pm on Fridays.",
    popular: popularFor("Thane"),
    faqs: geoFaqs("Thane", "Thane", "Thane West, Manpada, Kasarvadavali, Majiwada and Hiranandani Estate", "every day 7:30am to 10:30pm, and until 3pm on Fridays"),
  },
  {
    slug: "lower-parel",
    name: "Lower Parel",
    redirectTo: "/locations/lower-parel",
    servingKitchenSlug: "lower-parel",
    servingKitchenName: "Thepla House by Tejal's Kitchen Lower Parel",
    areasServed: ["Lower Parel", "Worli", "Prabhadevi", "Elphinstone", "Mahalaxmi", "Parel"],
    localCopy:
      "Thepla House by Tejal's Kitchen delivers fresh, home-style Gujarati food across Lower Parel and Worli from our Senapati Bapat Marg kitchen — whole-wheat theplas, thalis and farsan, 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm, and until 3pm on Fridays.",
    popular: popularFor("Lower Parel"),
    faqs: geoFaqs("Lower Parel", "Lower Parel", "Lower Parel, Worli, Prabhadevi, Elphinstone and Mahalaxmi", "every day 7:30am to 10:30pm, and until 3pm on Fridays"),
  },
  {
    slug: "kandivali",
    name: "Kandivali",
    redirectTo: "/locations/kandivali",
    servingKitchenSlug: "kandivali",
    servingKitchenName: "Thepla House by Tejal's Kitchen Kandivali",
    areasServed: ["Kandivali West", "Kandivali East", "Borivali", "Malad", "Charkop", "Poisar"],
    localCopy:
      "Thepla House by Tejal's Kitchen delivers fresh, home-style Gujarati food across Kandivali from our Kandivali West dine-in outlet — whole-wheat theplas, thalis, farsan and sweets, 100% vegetarian with Jain and vegan options. Open daily 7:30am to 10:30pm.",
    popular: popularFor("Kandivali"),
    faqs: geoFaqs("Kandivali", "Kandivali", "Kandivali West, Kandivali East, Borivali, Malad and Charkop", "every day 7:30am to 10:30pm"),
  },
];

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
