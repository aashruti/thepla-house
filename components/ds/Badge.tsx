import type { CSSProperties, ReactNode } from "react";

/**
 * Thepla House — Badge
 * Small status/label pill. Tones map to semantic tokens.
 */
export type BadgeTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "gold"
  | "green";

export interface BadgeProps {
  children?: ReactNode;
  tone?: BadgeTone;
  variant?: "soft" | "solid" | "outline";
  size?: "sm" | "md";
  iconLeft?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const TONES: Record<
  BadgeTone,
  { solid: string; soft: string; softText: string; on: string }
> = {
  neutral: { solid: "var(--ink-700)", soft: "var(--cream-200)", softText: "var(--ink-700)", on: "var(--white)" },
  primary: { solid: "var(--color-primary)", soft: "var(--maroon-100)", softText: "var(--maroon-700)", on: "var(--color-on-primary)" },
  green: { solid: "var(--green-600)", soft: "var(--green-100)", softText: "var(--green-700)", on: "var(--white)" },
  gold: { solid: "var(--gold-400)", soft: "var(--gold-100)", softText: "var(--gold-800)", on: "var(--ink-900)" },
  success: { solid: "var(--color-success)", soft: "var(--color-success-container)", softText: "var(--color-on-success-container)", on: "var(--color-on-success)" },
  warning: { solid: "var(--color-warning)", soft: "var(--color-warning-container)", softText: "var(--color-on-warning-container)", on: "var(--color-on-warning)" },
  error: { solid: "var(--color-error)", soft: "var(--color-error-container)", softText: "var(--color-on-error-container)", on: "var(--color-on-error)" },
};

export function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  size = "md",
  iconLeft = null,
  style,
  ...rest
}: BadgeProps) {
  const t = TONES[tone] || TONES.neutral;
  const sizes = {
    sm: { padding: "2px 8px", fontSize: "0.6875rem", gap: 4 },
    md: { padding: "4px 11px", fontSize: "0.75rem", gap: 5 },
  };
  const s = sizes[size] || sizes.md;
  let bg: string, color: string, border: string;
  if (variant === "solid") {
    bg = t.solid;
    color = t.on;
    border = "transparent";
  } else if (variant === "outline") {
    bg = "transparent";
    color = t.softText;
    border = "currentColor";
  } else {
    bg = t.soft;
    color = t.softText;
    border = "transparent";
  }
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
        letterSpacing: "0.03em",
        lineHeight: 1.3,
        color,
        background: bg,
        border: `1.25px solid ${border}`,
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...style,
      }}
      {...rest}
    >
      {iconLeft && (
        <span aria-hidden="true" style={{ display: "inline-flex" }}>
          {iconLeft}
        </span>
      )}
      {children}
    </span>
  );
}

export default Badge;
