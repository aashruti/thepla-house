import type { CSSProperties } from "react";

/**
 * AggregatorLink — the one way this site links out to Swiggy, Zomato or
 * WhatsApp.
 *
 * Every "order on …" affordance renders through here — the OrderChannels
 * chips, the outlet cards and the outlet page — so each brand's look is
 * defined once.
 *
 * The official mark carries the brand colour; the name beside it is set in
 * ink rather than in that colour. Swiggy's orange against white is 2.5:1, well
 * under readable contrast for text, whereas a logo is exempt — so the colour
 * lives in the logo and the words stay legible.
 */
export type Aggregator = "swiggy" | "zomato" | "whatsapp";

export const AGGREGATORS: Record<Aggregator, { name: string; logo: string; color: string }> = {
  swiggy: { name: "Swiggy", logo: "/brands/swiggy.svg", color: "#FF5200" },
  zomato: { name: "Zomato", logo: "/brands/zomato.svg", color: "#CC202E" },
  whatsapp: { name: "WhatsApp", logo: "/brands/whatsapp.svg", color: "#25D366" },
};

const SIZES = {
  sm: { padding: "6px 12px 6px 6px", fontSize: "0.8125rem", gap: 8, logo: 22, minHeight: 38 },
  md: { padding: "6px 14px 6px 6px", fontSize: "0.875rem", gap: 8, logo: 24, minHeight: 40 },
  lg: { padding: "8px 18px 8px 8px", fontSize: "0.9375rem", gap: 10, logo: 28, minHeight: 46 },
};

export interface AggregatorLinkProps {
  service: Aggregator;
  href: string;
  size?: keyof typeof SIZES;
  /** Stretch to share a row equally with siblings (outlet cards). */
  fill?: boolean;
  style?: CSSProperties;
}

export function AggregatorLink({ service, href, size = "md", fill = false, style }: AggregatorLinkProps) {
  const brand = AGGREGATORS[service];
  const s = SIZES[size];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...(fill ? { flex: 1, justifyContent: "center" } : {}),
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        minHeight: s.minHeight,
        padding: s.padding,
        background: "var(--white)",
        border: `1.5px solid ${brand.color}`,
        borderRadius: "999px",
        fontFamily: "var(--font-body)",
        fontSize: s.fontSize,
        fontWeight: 600,
        color: "var(--ink-800)",
        textDecoration: "none",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG; next/image adds nothing here */}
      <img
        src={brand.logo}
        alt=""
        aria-hidden="true"
        width={s.logo}
        height={s.logo}
        style={{ display: "block", width: s.logo, height: s.logo, borderRadius: Math.round(s.logo * 0.26), flexShrink: 0 }}
      />
      {brand.name}
    </a>
  );
}

export default AggregatorLink;
