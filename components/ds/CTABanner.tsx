import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * Thepla House — CTABanner
 * Full-width call-to-action band. `tone` picks the warmth (maroon/gold/green).
 * Renders accessible links when href props are supplied (server-safe).
 */
export interface CTABannerProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tone?: "maroon" | "gold" | "green";
  align?: "center" | "split";
}

const TONES = {
  maroon: { bg: "var(--maroon-600)", edge: "var(--maroon-800)", fg: "var(--cream-50)", eyebrow: "var(--gold-300)", btnBg: "var(--color-secondary)", btnFg: "var(--ink-900)", btn2Border: "var(--cream-100)", btn2Fg: "var(--cream-50)" },
  gold: { bg: "var(--gold-400)", edge: "var(--gold-600)", fg: "var(--ink-900)", eyebrow: "var(--maroon-700)", btnBg: "var(--color-primary)", btnFg: "var(--cream-50)", btn2Border: "var(--maroon-700)", btn2Fg: "var(--maroon-800)" },
  green: { bg: "var(--green-700)", edge: "var(--green-900)", fg: "var(--cream-50)", eyebrow: "var(--gold-300)", btnBg: "var(--color-secondary)", btnFg: "var(--ink-900)", btn2Border: "var(--cream-100)", btn2Fg: "var(--cream-50)" },
};

export function CTABanner({
  eyebrow,
  title,
  body,
  primaryLabel = "Order now",
  primaryHref = "#",
  secondaryLabel,
  secondaryHref = "#",
  tone = "maroon",
  align = "center",
}: CTABannerProps) {
  const t = TONES[tone] || TONES.maroon;
  const split = align === "split";
  const primaryStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 50,
    padding: "14px 26px",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 700,
    color: t.btnFg,
    background: t.btnBg,
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "var(--shadow-md)",
  };
  const secondaryStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    padding: "14px 24px",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: t.btn2Fg,
    background: "transparent",
    border: `1.5px solid ${t.btn2Border}`,
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    textDecoration: "none",
  };
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${t.bg}, ${t.edge})`,
        borderRadius: "var(--radius-2xl)",
        padding: "clamp(28px, 5vw, 56px)",
        color: t.fg,
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -60,
          top: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,.18), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: split ? "row" : "column",
          alignItems: "center",
          justifyContent: split ? "space-between" : "center",
          textAlign: split ? "left" : "center",
          gap: 24,
          flexWrap: "wrap",
          maxWidth: split ? "none" : "40ch",
          margin: split ? 0 : "0 auto",
        }}
      >
        <div>
          {eyebrow && (
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: t.eyebrow,
                marginBottom: 10,
              }}
            >
              {eyebrow}
            </div>
          )}
          {title && (
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: t.fg,
                margin: "0 0 10px",
                fontSize: "clamp(1.6rem, 1rem + 2.4vw, 2.4rem)",
                lineHeight: 1.12,
                fontWeight: 600,
              }}
            >
              {title}
            </h2>
          )}
          {body && (
            <p style={{ margin: 0, color: t.fg, opacity: 0.92, fontSize: "1.0625rem", lineHeight: "var(--lh-body)", maxWidth: "46ch" }}>
              {body}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", flexShrink: 0 }}>
          <Link href={primaryHref} style={primaryStyle}>
            {primaryLabel}
          </Link>
          {secondaryLabel && (
            <Link href={secondaryHref} style={secondaryStyle}>
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTABanner;
