/** Dish photos, keyed by the EXACT dish title used across the menu/data. */
export const DISH_IMAGES: Record<string, string> = {
  "Methi Thepla": "/images/menu/editorial/methi-thepla.webp",
  "Plain Thepla": "/images/menu/editorial/plain-thepla.webp",
  "Methi-Garlic Thepla": "/images/dishes/methi-garlic-thepla.webp",
  "Bajra Rotla": "/images/dishes/bajra-rotla.webp",
  "Palak Thepla": "/images/dishes/palak-thepla.webp",
  "Gujarati Thali": "/images/dishes/gujarati-thali.webp",
  "Mini Thali": "/images/dishes/mini-thali.webp",
  "Jain Thali": "/images/dishes/jain-thali.webp",
  "Vegan Thali": "/images/dishes/vegan-thali.webp",
  "Khaman Dhokla": "/images/menu/editorial/khaman-dhokla.webp",
  "Khandvi": "/images/dishes/khandvi.webp",
  "Patra": "/images/dishes/patra.webp",
  "Handvo": "/images/dishes/handvo.webp",
  "Sabudana Khichdi": "/images/menu/editorial/sabudana-khichdi.webp",
  "Mohanthal": "/images/dishes/mohanthal.webp",
  "Sukhdi (Gol Papdi)": "/images/dishes/sukhdi.webp",
  "Basundi": "/images/dishes/basundi.webp",
  "Shrikhand": "/images/dishes/shrikhand.webp",
  "Undhiyu": "/images/marketing/undhiyu-thali.webp",
  "Aamras": "/images/dishes/aamras.webp",
  "Ponkh Vada": "/images/dishes/ponkh-vada.webp",
};

/** Named one-off images (marketing, blog covers, gallery), keyed by id. */
export const IMG: Record<string, string> = {
  // Team portraits
  "team:tejal": "/images/team/tejal-shah.webp",
  "team:shravan": "/images/team/shravan-mali.webp",
  "team:dhaval": "/images/team/dhaval-shah.webp",
  // Marketing / page heroes
  "home-hero": "/images/marketing/home-hero.webp",
  "gujarati-mini-thali-hero": "/images/marketing/gujarati-mini-thali-hero.webp",
  "upvas-thali-hero": "/images/marketing/upvas-thali-hero.webp",
  "founder-tejal": "/images/marketing/founder-tejal.webp",
  "travel-pack": "/images/marketing/travel-pack.webp",
  "catering": "/images/marketing/catering.webp",
  "franchise": "/images/marketing/franchise.webp",
  "kitchen-interior": "/images/marketing/kitchen-interior.webp",
  "rolling-hands": "/images/marketing/rolling-hands.webp",
  // Travel pack options
  "travelpack:classic": "/images/marketing/travelpack-classic.webp",
  "travelpack:family": "/images/marketing/travelpack-family.webp",
  "travelpack:combo": "/images/marketing/travelpack-combo.webp",
  // Catering occasions
  "catering:pooja": "/images/marketing/catering-pooja.webp",
  "catering:wedding": "/images/marketing/catering-wedding.webp",
  "catering:corporate": "/images/marketing/catering-corporate.webp",
  "catering:houseparty": "/images/marketing/catering-houseparty.webp",
  // Blog covers (keyed by post slug)
  "blog:why-we-never-use-maida": "/images/blog/maida-atta.webp",
  "blog:methi-thepla-7-day-freshness": "/images/blog/freshness-pack.webp",
  "blog:sunflower-vs-palm-oil": "/images/blog/sunflower-oil.webp",
  "blog:5-ways-leftover-theplas": "/images/blog/leftovers.webp",
  "blog:beginners-guide-gujarati-thali": "/images/dishes/gujarati-thali.webp",
  "blog:jain-cooking-explained": "/images/dishes/jain-thali.webp",
  "blog:undhiyu-winter-on-a-plate": "/images/marketing/undhiyu-thali.webp",
  "blog:best-thepla-kandivali-west": "/images/menu/editorial/methi-thepla.webp",
};

/** Resolve a dish photo by its title (undefined → placeholder). */
export function dishImage(title: string): string | undefined {
  return DISH_IMAGES[title];
}

/** Resolve a named image by id (undefined → placeholder). */
export function img(id: string): string | undefined {
  return IMG[id];
}
