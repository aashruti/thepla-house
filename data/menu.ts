import { TAGS, type DishTag } from "@/lib/tags";

export type TagKey = keyof typeof TAGS;

export interface Dish {
  title: string;
  desc: string;
  subject: string;
  alt: string;
  keys: TagKey[];
  /** Real photo from the brand's shoot, under public/images/menu. */
  image?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  dishes: Dish[];
}

const photo = (slug: string) => `/images/menu/${slug}.webp`;

/**
 * The menu page's dishes: the brand's top 50 items by sales, grouped for
 * browsing and listed in sales order within each group.
 *
 * Deliberately carries no quantities, revenue or prices — sales figures are
 * internal, and prices live on Swiggy / Zomato and the PDF menu. "Best-seller"
 * marks the overall top ten. Tags are limited to what the source data states:
 * "upvas" comes from the sales sheet's Fasting category, "ww" is only on the
 * wheat breads. No Jain or vegan tags, since nothing here says which dishes
 * qualify.
 */
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "theplas",
    label: "Theplas & rotis",
    dishes: [
      { title: "Methi Thepla", desc: "Soft whole-wheat thepla rolled with fresh fenugreek. Our most-ordered dish.", subject: "Methi theplas on a black plate", alt: "Methi thepla", keys: ["best", "ww"], image: photo("methi-thepla") },
      { title: "Wheat Roti", desc: "Plain whole-wheat rotis, made fresh.", subject: "Wheat rotis on a plate", alt: "Wheat roti", keys: ["best", "ww"], image: photo("wheat-roti") },
      { title: "Garlic Thepla", desc: "Whole-wheat thepla with garlic.", subject: "Garlic theplas on a plate", alt: "Garlic thepla", keys: ["ww"], image: photo("garlic-thepla") },
      { title: "Methi Thepla — Vacuum Pack of 5", desc: "Five methi theplas, vacuum-packed to carry on a journey.", subject: "Vacuum-packed methi theplas", alt: "Vacuum pack of methi theplas", keys: ["ww"], image: photo("methi-thepla-vacuum-pack") },
      { title: "Jowar Roti", desc: "Roti made from jowar (sorghum) flour.", subject: "Jowar roti on a plate", alt: "Jowar roti", keys: [], image: photo("jowar-roti") },
      { title: "Lauki Thepla", desc: "Whole-wheat thepla made with grated bottle gourd.", subject: "Lauki theplas on a plate", alt: "Lauki thepla", keys: ["ww"], image: photo("lauki-thepla") },
      { title: "Plain Thepla", desc: "Everyday whole-wheat thepla — good with chai or pickle.", subject: "Plain theplas on a plate", alt: "Plain thepla", keys: ["ww"], image: photo("plain-thepla") },
      { title: "Plain Puri", desc: "Puffed, deep-fried puris.", subject: "Plain puris on a plate", alt: "Plain puri", keys: [], image: photo("plain-puri") },
      { title: "Wheat Phulka Roti (1 pc)", desc: "A single soft whole-wheat phulka.", subject: "Wheat phulka roti", alt: "Wheat phulka roti", keys: ["ww"] },
    ],
  },
  {
    id: "parathas",
    label: "Parathas",
    dishes: [
      { title: "Aloo Paratha", desc: "Paratha stuffed with spiced potato.", subject: "Aloo paratha on a plate", alt: "Aloo paratha", keys: ["best"], image: photo("aloo-paratha") },
      { title: "Koki Paratha with Curd", desc: "Sindhi-style koki paratha, served with curd.", subject: "Koki paratha with a bowl of curd", alt: "Koki paratha with curd", keys: [], image: photo("koki-paratha-curd") },
      { title: "Punjabi Aloo Paratha", desc: "Punjabi-style aloo paratha.", subject: "Punjabi aloo paratha with sides", alt: "Punjabi aloo paratha", keys: [], image: photo("punjabi-aloo-paratha") },
      { title: "Plain Paratha", desc: "Layered plain paratha.", subject: "Plain paratha on a plate", alt: "Plain paratha", keys: [], image: photo("plain-paratha") },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast & snacks",
    dishes: [
      { title: "Batata Kanda Poha", desc: "Flattened rice with potato and onion.", subject: "Bowl of batata kanda poha", alt: "Batata kanda poha", keys: ["best"], image: photo("batata-kanda-poha") },
      { title: "Steam Muthia with Green Chutney", desc: "Steamed Gujarati muthia with green chutney.", subject: "Steamed muthia with green chutney", alt: "Steam muthia with green chutney", keys: ["best"], image: photo("steam-muthia") },
      { title: "Kanda Poha", desc: "Flattened rice tempered with onion.", subject: "Bowl of kanda poha", alt: "Kanda poha", keys: [], image: photo("kanda-poha") },
      { title: "White Dhokla", desc: "Soft steamed white dhokla.", subject: "White dhokla pieces", alt: "White dhokla", keys: [], image: photo("white-dhokla") },
      { title: "Moong Dal Bhajiya", desc: "Crisp moong dal pakoda.", subject: "Moong dal bhajiya", alt: "Moong dal bhajiya", keys: [] },
      { title: "Methi Thepla Combo", desc: "Three methi theplas and two koki parathas.", subject: "Methi theplas and koki parathas", alt: "Methi thepla combo", keys: [], image: photo("methi-thepla-combo") },
      { title: "Dabeli", desc: "Kutchi dabeli — spiced potato in a pav.", subject: "Dabeli on a plate", alt: "Dabeli", keys: [], image: photo("dabeli") },
      { title: "Mumbai Vada Pav", desc: "Batata vada in a pav, with chutney.", subject: "Vada pav with chutney", alt: "Mumbai vada pav", keys: [], image: photo("mumbai-vada-pav") },
      { title: "Upma", desc: "Savoury semolina upma.", subject: "Bowl of upma", alt: "Upma", keys: [], image: photo("upma") },
      { title: "Puri Bhaji", desc: "Puris with potato bhaji.", subject: "Puris with bhaji", alt: "Puri bhaji", keys: [], image: photo("puri-bhaji") },
      { title: "Khaman Dhokla", desc: "Spongy steamed khaman, tempered and topped with chutney.", subject: "Khaman dhokla pieces", alt: "Khaman dhokla", keys: [], image: photo("khaman-dhokla") },
      { title: "Methi Gota", desc: "Fenugreek fritters — a Gujarati teatime snack.", subject: "Methi gota fritters", alt: "Methi gota", keys: [], image: photo("methi-gota") },
      { title: "Batata Bhajiya", desc: "Crisp potato-slice pakoda.", subject: "Batata bhajiya", alt: "Batata bhajiya", keys: [] },
      { title: "Idlis with Chutney & Sambar", desc: "Steamed idlis with coconut chutney and sambar.", subject: "Idlis with chutney and sambar", alt: "Idlis with chutney and sambar", keys: [], image: photo("idli-sambar") },
      { title: "Dabeli (single)", desc: "One dabeli.", subject: "Single dabeli", alt: "Single dabeli", keys: [], image: photo("dabeli-single") },
      { title: "Vada Pav (single)", desc: "One vada pav.", subject: "Single vada pav", alt: "Single vada pav", keys: [], image: photo("vada-pav-single") },
    ],
  },
  {
    id: "meals",
    label: "Thalis, dal & khichdi",
    dishes: [
      { title: "Gujarati Mini Thali", desc: "A compact Gujarati thali.", subject: "Gujarati mini thali in a tray", alt: "Gujarati mini thali", keys: ["best"], image: photo("gujarati-mini-thali") },
      { title: "Punjabi Mini Thali", desc: "A compact Punjabi thali.", subject: "Punjabi mini thali in a tray", alt: "Punjabi mini thali", keys: ["best"], image: photo("punjabi-mini-thali") },
      { title: "Rajasthani Dal Bati Churma", desc: "Dal, baked bati and sweet churma.", subject: "Dal bati churma in bowls", alt: "Rajasthani dal bati churma", keys: [], image: photo("dal-bati-churma") },
      { title: "Dal Dhokli", desc: "Gujarati dal with wheat dhokli simmered in it.", subject: "Bowl of dal dhokli", alt: "Dal dhokli", keys: [], image: photo("dal-dhokli") },
      { title: "Matki ki Sabji", desc: "Sprouted moth-bean sabji.", subject: "Bowl of matki sabji", alt: "Matki ki sabji", keys: [], image: photo("matki-sabji") },
      { title: "Khichdi (Moong Dal)", desc: "Moong dal khichdi.", subject: "Bowl of moong dal khichdi", alt: "Moong dal khichdi", keys: [], image: photo("moong-dal-khichdi") },
      { title: "Chilka Wali Moong Dal Khichdi", desc: "Khichdi made with split green moong, skins on.", subject: "Bowl of chilka moong dal khichdi", alt: "Chilka wali moong dal khichdi", keys: [], image: photo("chilka-moong-dal-khichdi") },
    ],
  },
  {
    id: "upvas",
    label: "Upvas / fasting",
    dishes: [
      { title: "Tejal's Kitchen Special Upwas Thali", desc: "A full thali for fasting days.", subject: "Upwas thali in a tray", alt: "Tejal's Kitchen special upwas thali", keys: ["best", "upvas"], image: photo("upwas-thali") },
      { title: "Sabudana Khichdi", desc: "Sago khichdi — a fasting-day staple.", subject: "Bowl of sabudana khichdi", alt: "Sabudana khichdi", keys: ["best", "upvas"], image: photo("sabudana-khichdi") },
      { title: "Sabudana Vada", desc: "Crisp sago and potato vadas.", subject: "Sabudana vadas with chutney", alt: "Sabudana vada", keys: ["upvas"], image: photo("sabudana-vada") },
      { title: "Aloo Sabji with Rajgira Puri", desc: "Fasting-day aloo sabji with rajgira puris.", subject: "Aloo sabji with rajgira puris", alt: "Aloo sabji with rajgira puri", keys: ["upvas"], image: photo("aloo-sabji-rajgira-puri") },
      { title: "Sabudana Khichdi & Sabudana Vada", desc: "Sabudana khichdi with two sabudana vadas.", subject: "Sabudana khichdi and vadas", alt: "Sabudana khichdi and sabudana vada", keys: ["upvas"] },
    ],
  },
  {
    id: "drinks",
    label: "Chai, chaas & sweets",
    dishes: [
      { title: "Masala Chai", desc: "Spiced tea.", subject: "Cup of masala chai", alt: "Masala chai", keys: [], image: photo("masala-chai") },
      { title: "Vedhami (Puran Poli)", desc: "Sweet flatbread filled with lentil and jaggery.", subject: "Vedhami on a plate", alt: "Vedhami puran poli", keys: [], image: photo("vedhami") },
      { title: "Masala Chaas", desc: "Spiced buttermilk.", subject: "Glass of masala chaas", alt: "Masala chaas", keys: [], image: photo("masala-chaas") },
    ],
  },
];

/**
 * Homely & Healthy — a separate line from the same kitchens, shown in its own
 * labelled section rather than mixed into the Thepla House categories.
 */
export const HOMELY_HEALTHY: Dish[] = [
  { title: "Special Pulao Thali", desc: "Thali built around pulao.", subject: "Special pulao thali in a tray", alt: "Special pulao thali", keys: ["best"], image: photo("special-pulao-thali") },
  { title: "Rajasthani Dal Bati Meal", desc: "Dal bati as a complete meal.", subject: "Rajasthani dal bati meal", alt: "Rajasthani dal bati meal", keys: [], image: photo("rajasthani-dal-bati-meal") },
  { title: "Fasting Thali", desc: "A thali for fasting days.", subject: "Fasting thali in a tray", alt: "Fasting thali", keys: ["upvas"], image: photo("fasting-thali") },
  { title: "Regular Thali", desc: "The everyday thali.", subject: "Regular thali in a tray", alt: "Regular thali", keys: [], image: photo("regular-thali") },
  { title: "Regular Paneer Thali", desc: "The everyday thali, with paneer.", subject: "Regular paneer thali in a tray", alt: "Regular paneer thali", keys: [], image: photo("regular-paneer-thali") },
  { title: "Phulka Roti (1 pc)", desc: "A single phulka roti.", subject: "Phulka roti", alt: "Phulka roti", keys: [] },
];

/** Resolve a dish's tag keys to chip objects. */
export function tagsFor(keys: TagKey[]): DishTag[] {
  return keys.map((k) => TAGS[k]);
}

const byTitle = (title: string): Dish => {
  const dish = MENU_CATEGORIES.flatMap((c) => c.dishes).find((d) => d.title === title);
  if (!dish) throw new Error(`POPULAR_DISHES: no menu dish titled "${title}"`);
  return dish;
};

/**
 * Home-page "most-loved" selection — the top six Thepla House sellers, looked
 * up by title so a renamed dish fails the build instead of silently vanishing.
 */
export const POPULAR_DISHES: Dish[] = [
  "Methi Thepla",
  "Tejal's Kitchen Special Upwas Thali",
  "Gujarati Mini Thali",
  "Aloo Paratha",
  "Batata Kanda Poha",
  "Sabudana Khichdi",
].map(byTitle);
