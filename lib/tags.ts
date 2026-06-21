/**
 * Dish tag chips as authored in the page designs: { label, bg, fg } pairs that
 * map onto the design-system diet/claim colours.
 */
export interface DishTag {
  label: string;
  bg: string;
  fg: string;
}

export const TAGS = {
  ww: { label: "100% whole wheat", bg: "var(--gold-100)", fg: "var(--gold-700)" },
  best: { label: "Best-seller", bg: "var(--color-bestseller-bg)", fg: "var(--color-bestseller)" },
  jain: { label: "Jain", bg: "var(--color-jain-bg)", fg: "var(--color-jain)" },
  vegan: { label: "🌿 Vegan", bg: "var(--color-vegan-bg)", fg: "var(--color-vegan)" },
  nopalm: { label: "No palm oil", bg: "var(--green-100)", fg: "var(--green-700)" },
} satisfies Record<string, DishTag>;
