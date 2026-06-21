export interface GalleryItem {
  subject: string;
  alt: string;
  cat: string;
  h: number; // masonry tile height
  src?: string;
  /** reuse an existing dish photo by title */
  dish?: string;
  /** reuse a named marketing image by id */
  img?: string;
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "theplas", label: "Theplas" },
  { id: "thalis", label: "Thalis" },
  { id: "farsan", label: "Farsan" },
  { id: "sweets", label: "Sweets" },
  { id: "kitchen", label: "Kitchen" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { subject: "Stack of methi theplas on a brass plate with achar", alt: "Methi theplas", cat: "theplas", h: 220, dish: "Methi Thepla" },
  { subject: "Gujarati thali, top-down on brass", alt: "Gujarati thali", cat: "thalis", h: 260, dish: "Gujarati Thali" },
  { subject: "Khaman dhokla squares garnished with coriander", alt: "Khaman dhokla", cat: "farsan", h: 180, dish: "Khaman Dhokla" },
  { subject: "Hands rolling a thepla on a wooden board", alt: "Rolling theplas", cat: "kitchen", h: 240, img: "rolling-hands" },
  { subject: "Mohanthal diamonds dusted with pistachio", alt: "Mohanthal", cat: "sweets", h: 200, dish: "Mohanthal" },
  { subject: "Earthen pot of undhiyu with winter vegetables", alt: "Undhiyu", cat: "thalis", h: 230, dish: "Undhiyu" },
  { subject: "Khandvi rolls with coconut and coriander", alt: "Khandvi", cat: "farsan", h: 210, dish: "Khandvi" },
  { subject: "A busy cloud kitchen with tavas and fresh dough", alt: "Inside the kitchen", cat: "kitchen", h: 270, img: "kitchen-interior" },
  { subject: "Palak and methi theplas folded on a cloth", alt: "Palak theplas", cat: "theplas", h: 190, dish: "Palak Thepla" },
  { subject: "Bowl of shrikhand with saffron strands", alt: "Shrikhand", cat: "sweets", h: 220, dish: "Shrikhand" },
  { subject: "Catering platters laid out for an event", alt: "Catering spread", cat: "kitchen", h: 240, img: "catering" },
  { subject: "Sabudana khichdi with peanuts and lemon", alt: "Sabudana khichdi", cat: "farsan", h: 200, dish: "Sabudana Khichdi" },
  { subject: "Mini thali with rotli, dal and two sabzi", alt: "Mini thali", cat: "thalis", h: 250, dish: "Mini Thali" },
  { subject: "Sukhdi squares stacked on parchment", alt: "Sukhdi", cat: "sweets", h: 180, dish: "Sukhdi (Gol Papdi)" },
  { subject: "Folded plain theplas beside a cup of chai", alt: "Theplas with chai", cat: "theplas", h: 230, dish: "Plain Thepla" },
];
