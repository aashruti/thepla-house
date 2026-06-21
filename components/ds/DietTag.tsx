import type { CSSProperties, ReactNode } from "react";

/**
 * Thepla House — DietTag
 * Dietary / merchandising labels: Jain, Vegan, Best-seller, plus whole-wheat /
 * no-palm-oil claims. Each carries a tiny glyph so meaning survives without
 * colour. The 🌿 glyph (vegan) is the only emoji permitted in the UI.
 */
export type DietType =
  | "jain"
  | "vegan"
  | "bestseller"
  | "wholewheat"
  | "nopalm"
  | "spicy";

export interface DietTagProps {
  type?: DietType;
  label?: string;
  icon?: ReactNode;
  size?: "sm" | "md";
  style?: CSSProperties;
  className?: string;
}

const PRESETS: Record<DietType, { label: string; dot: string; fg: string; bg: string }> = {
  jain: { label: "Jain", dot: "◇", fg: "var(--color-jain)", bg: "var(--color-jain-bg)" },
  vegan: { label: "Vegan", dot: "🌿", fg: "var(--color-vegan)", bg: "var(--color-vegan-bg)" },
  bestseller: { label: "Best-seller", dot: "★", fg: "var(--color-bestseller)", bg: "var(--color-bestseller-bg)" },
  wholewheat: { label: "100% Whole Wheat", dot: "✓", fg: "var(--green-700)", bg: "var(--green-100)" },
  nopalm: { label: "No Palm Oil", dot: "✓", fg: "var(--green-700)", bg: "var(--green-100)" },
  spicy: { label: "Spicy", dot: "🔥", fg: "var(--maroon-700)", bg: "var(--maroon-100)" },
};

export function DietTag({
  type = "vegan",
  label,
  icon,
  size = "md",
  style,
  ...rest
}: DietTagProps) {
  const p = PRESETS[type] || PRESETS.vegan;
  const text = label || p.label;
  const glyph = icon || p.dot;
  const sizes = {
    sm: { padding: "3px 9px", fontSize: "0.6875rem", gap: 5 },
    md: { padding: "5px 12px", fontSize: "0.75rem", gap: 6 },
  };
  const s = sizes[size] || sizes.md;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        padding: s.padding,
        fontFamily: "var(--font-body)",
        fontSize: s.fontSize,
        fontWeight: 700,
        letterSpacing: "0.02em",
        lineHeight: 1.25,
        color: p.fg,
        background: p.bg,
        border: "1.25px solid color-mix(in srgb, currentColor 22%, transparent)",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ fontSize: "0.95em", lineHeight: 1 }}>
        {glyph}
      </span>
      {text}
    </span>
  );
}

export default DietTag;
