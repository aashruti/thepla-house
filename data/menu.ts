import { TAGS, type DishTag } from "@/lib/tags";

export type TagKey = keyof typeof TAGS;

export interface Dish {
  title: string;
  desc: string;
  subject: string;
  alt: string;
  keys: TagKey[];
}

export interface MenuCategory {
  id: string;
  label: string;
  count: number;
  dishes: Dish[];
}

/** Diet filters used on the Menu page. */
export const DIET_FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "best", label: "Best-sellers" },
  { key: "jain", label: "Jain" },
  { key: "vegan", label: "Vegan" },
  { key: "ww", label: "100% whole wheat" },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "theplas",
    label: "Theplas & Rotis",
    count: 24,
    dishes: [
      { title: "Methi Thepla", desc: "Soft whole-wheat flatbread rolled with fresh fenugreek and warm spices.", subject: "Stack of methi theplas on a brass plate", alt: "Methi theplas on a brass plate", keys: ["ww", "best"] },
      { title: "Plain Thepla", desc: "Everyday whole-wheat thepla, lightly spiced — perfect with chai.", subject: "Plain theplas folded on a plate", alt: "Plain theplas", keys: ["ww"] },
      { title: "Methi-Garlic Thepla", desc: "Fenugreek thepla with a punch of roasted garlic.", subject: "Garlic methi theplas close-up", alt: "Methi garlic theplas", keys: ["ww"] },
      { title: "Bajra Rotla", desc: "Rustic pearl-millet flatbread, naturally gluten-light and hearty.", subject: "Bajra rotla with white butter", alt: "Bajra rotla", keys: ["vegan"] },
      { title: "Palak Thepla", desc: "Whole-wheat thepla folded with fresh spinach.", subject: "Green palak theplas stacked", alt: "Palak theplas", keys: ["ww", "vegan"] },
    ],
  },
  {
    id: "thalis",
    label: "Thalis",
    count: 12,
    dishes: [
      { title: "Gujarati Thali", desc: "A full home-style spread — dal, kadhi, sabzi, rotli, rice and a sweet.", subject: "Brass Gujarati thali, top-down", alt: "Gujarati thali", keys: ["best", "jain"] },
      { title: "Mini Thali", desc: "A lighter plate — two sabzi, dal, rotli and rice.", subject: "Mini thali on brass plate", alt: "Mini thali", keys: ["jain"] },
      { title: "Jain Thali", desc: "Complete Jain spread — no onion, garlic or root vegetables.", subject: "Jain thali with labelled bowls", alt: "Jain thali", keys: ["jain"] },
      { title: "Vegan Thali", desc: "Dairy-free home-style thali, ghee swapped for oil.", subject: "Vegan thali on brass plate", alt: "Vegan thali", keys: ["vegan"] },
    ],
  },
  {
    id: "farsan",
    label: "Farsan & Snacks",
    count: 62,
    dishes: [
      { title: "Khaman Dhokla", desc: "Steamed, fluffy and tempered with mustard seeds and curry leaves.", subject: "Yellow khaman dhokla squares", alt: "Khaman dhokla", keys: ["vegan", "best"] },
      { title: "Khandvi", desc: "Silky gram-flour rolls with a coconut-coriander finish.", subject: "Rolled khandvi on a plate", alt: "Khandvi rolls", keys: ["jain"] },
      { title: "Patra", desc: "Colocasia leaves rolled with spiced gram flour, steamed and tempered.", subject: "Sliced patra spirals", alt: "Patra slices", keys: ["vegan"] },
      { title: "Handvo", desc: "Savoury baked lentil-and-rice cake with a crisp seeded crust.", subject: "Sliced handvo on a wooden board", alt: "Handvo slices", keys: ["ww"] },
      { title: "Sabudana Khichdi", desc: "Light sago with roasted peanuts and potato — a fasting favourite.", subject: "Bowl of sabudana khichdi", alt: "Sabudana khichdi", keys: ["jain", "vegan"] },
    ],
  },
  {
    id: "sweets",
    label: "Sweets",
    count: 40,
    dishes: [
      { title: "Mohanthal", desc: "Rich gram-flour fudge with cardamom and slivered nuts.", subject: "Mohanthal diamonds on a plate", alt: "Mohanthal", keys: ["best"] },
      { title: "Sukhdi (Gol Papdi)", desc: "Whole-wheat and jaggery squares — a homely winter sweet.", subject: "Sukhdi squares stacked", alt: "Sukhdi", keys: ["ww"] },
      { title: "Basundi", desc: "Slow-reduced sweetened milk, scented with cardamom.", subject: "Bowl of basundi with nuts", alt: "Basundi", keys: ["jain"] },
      { title: "Shrikhand", desc: "Thick strained-yoghurt dessert with saffron and cardamom.", subject: "Bowl of saffron shrikhand", alt: "Shrikhand", keys: ["jain"] },
    ],
  },
  {
    id: "seasonal",
    label: "Seasonal",
    count: 18,
    dishes: [
      { title: "Undhiyu", desc: "Winter mixed-vegetable casserole, slow-cooked Surti style.", subject: "Earthen pot of undhiyu", alt: "Undhiyu", keys: ["vegan", "jain"] },
      { title: "Aamras", desc: "Summer Alphonso mango pulp, served chilled with puri.", subject: "Bowl of aamras with puris", alt: "Aamras", keys: ["vegan", "jain"] },
      { title: "Ponkh Vada", desc: "Winter fresh-jowar fritters, crisp and green.", subject: "Plate of ponkh vada", alt: "Ponkh vada", keys: ["vegan"] },
    ],
  },
];

/** Resolve a dish's tag keys to chip objects. */
export function tagsFor(keys: TagKey[]): DishTag[] {
  return keys.map((k) => TAGS[k]);
}

/** Home-page "most-loved" selection. */
export const POPULAR_DISHES: Dish[] = [
  MENU_CATEGORIES[0].dishes[0], // Methi Thepla
  MENU_CATEGORIES[1].dishes[0], // Gujarati Thali
  MENU_CATEGORIES[2].dishes[0], // Khaman Dhokla
  MENU_CATEGORIES[2].dishes[4], // Sabudana Khichdi
  MENU_CATEGORIES[2].dishes[3], // Handvo
  MENU_CATEGORIES[4].dishes[0], // Undhiyu
];
