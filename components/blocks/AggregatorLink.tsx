import type { CSSProperties } from "react";

/**
 * AggregatorLink — the one way this site links out to Swiggy or Zomato.
 *
 * Every "order on Swiggy / Zomato" affordance renders through here — the
 * OrderChannels chips, the outlet cards and the outlet page — so the brands'
 * look is defined once.
 */
export type Aggregator = "swiggy" | "zomato";

export const AGGREGATORS: Record<Aggregator, { name: string; dot: string }> = {
  swiggy: { name: "Swiggy", dot: "var(--gold-500)" },
  zomato: { name: "Zomato", dot: "var(--maroon-600)" },
};

const SIZES = {
  sm: { padding: "8px 13px", fontSize: "0.8125rem", gap: 7, dot: 8, minHeight: 38 },
  md: { padding: "9px 15px", fontSize: "0.875rem", gap: 7, dot: 8, minHeight: 40 },
  lg: { padding: "11px 20px", fontSize: "0.9375rem", gap: 9, dot: 9, minHeight: 46 },
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
        border: "1.5px solid var(--color-outline)",
        borderRadius: "999px",
        fontFamily: "var(--font-body)",
        fontSize: s.fontSize,
        fontWeight: 600,
        color: "var(--ink-800)",
        textDecoration: "none",
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ width: s.dot, height: s.dot, borderRadius: "50%", background: brand.dot, flexShrink: 0 }} />
      {brand.name}
    </a>
  );
}

export default AggregatorLink;
