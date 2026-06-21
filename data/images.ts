/**
 * Real photography map (Adobe Firefly exports → public/images/...).
 *
 * HOW THIS WORKS
 * - Cards/pages resolve their image through the helpers below.
 * - While a key is ABSENT here, the slot renders the labelled PhotoSlot
 *   placeholder (so the build/dev stay green with no broken images).
 * - To "turn on" an image: drop the .jpg into public/images/... with the exact
 *   filename, then UNCOMMENT its line below. That's the only change needed.
 *
 * See public/images/BRIEF.md for the Firefly prompt + filename for every key.
 */

/** Dish photos, keyed by the EXACT dish title used across the menu/data. */
export const DISH_IMAGES: Record<string, string> = {
  "Methi Thepla": "/images/dishes/methi-thepla.jpg",
  "Plain Thepla": "/images/dishes/plain-thepla.jpg",
  "Methi-Garlic Thepla": "/images/dishes/methi-garlic-thepla.jpg",
  "Bajra Rotla": "/images/dishes/bajra-rotla.jpg",
  "Palak Thepla": "/images/dishes/palak-thepla.jpg",
  "Gujarati Thali": "/images/dishes/gujarati-thali.jpg",
  "Mini Thali": "/images/dishes/mini-thali.jpg",
  "Jain Thali": "/images/dishes/jain-thali.jpg",
  "Vegan Thali": "/images/dishes/vegan-thali.jpg",
  "Khaman Dhokla": "/images/dishes/khaman-dhokla.jpg",
  "Khandvi": "/images/dishes/khandvi.jpg",
  "Patra": "/images/dishes/patra.jpg",
  "Handvo": "/images/dishes/handvo.jpg",
  "Sabudana Khichdi": "/images/dishes/sabudana-khichdi.jpg",
  "Mohanthal": "/images/dishes/mohanthal.jpg",
  "Sukhdi (Gol Papdi)": "/images/dishes/sukhdi.jpg",
  "Basundi": "/images/dishes/basundi.jpg",
  "Shrikhand": "/images/dishes/shrikhand.jpg",
  "Undhiyu": "/images/dishes/undhiyu.jpg",
  "Aamras": "/images/dishes/aamras.jpg",
  "Ponkh Vada": "/images/dishes/ponkh-vada.jpg",
};

/** Named one-off images (marketing, blog covers, gallery), keyed by id. */
export const IMG: Record<string, string> = {
  // Team portraits (drop real portraits into public/images/team/ and uncomment)
  "team:tejal": "/images/team/tejal-shah.jpg",
  "team:shravan": "/images/team/shravan-mali.jpg",
  "team:dhaval": "/images/team/dhaval-shah.jpg",
  // Marketing / page heroes
  "home-hero": "/images/marketing/home-hero.jpg",
  "founder-tejal": "/images/marketing/founder-tejal.jpg",
  "travel-pack": "/images/marketing/travel-pack.jpg",
  "catering": "/images/marketing/catering.jpg",
  "franchise": "/images/marketing/franchise.jpg",
  "kitchen-interior": "/images/marketing/kitchen-interior.jpg",
  "rolling-hands": "/images/marketing/rolling-hands.jpg",
  // Travel pack options
  "travelpack:classic": "/images/marketing/travelpack-classic.jpg",
  "travelpack:family": "/images/marketing/travelpack-family.jpg",
  "travelpack:combo": "/images/marketing/travelpack-combo.jpg",
  // Catering occasions
  "catering:pooja": "/images/marketing/catering-pooja.jpg",
  "catering:wedding": "/images/marketing/catering-wedding.jpg",
  "catering:corporate": "/images/marketing/catering-corporate.jpg",
  "catering:houseparty": "/images/marketing/catering-houseparty.jpg",
  // Blog covers (keyed by post slug)
  "blog:why-we-never-use-maida": "/images/blog/maida-atta.jpg",
  "blog:methi-thepla-7-day-freshness": "/images/blog/freshness-pack.jpg",
  "blog:sunflower-vs-palm-oil": "/images/blog/sunflower-oil.jpg",
  "blog:5-ways-leftover-theplas": "/images/blog/leftovers.jpg",
  "blog:beginners-guide-gujarati-thali": "/images/dishes/gujarati-thali.jpg",
  "blog:jain-cooking-explained": "/images/dishes/jain-thali.jpg",
  "blog:undhiyu-winter-on-a-plate": "/images/dishes/undhiyu.jpg",
  "blog:best-thepla-kandivali-west": "/images/dishes/methi-thepla.jpg",
};

/** Resolve a dish photo by its title (undefined → placeholder). */
export function dishImage(title: string): string | undefined {
  return DISH_IMAGES[title];
}

/** Resolve a named image by id (undefined → placeholder). */
export function img(id: string): string | undefined {
  return IMG[id];
}
