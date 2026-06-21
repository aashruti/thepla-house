import type { CSSProperties } from "react";
import { ORDER_CHANNELS, ORDER_PHONE } from "@/data/site";

/**
 * OrderChannels — Swiggy / Zomato / WhatsApp chips (neutral pills with
 * brand-coloured dots), with an optional "or call" affordance.
 */
export interface OrderChannelsProps {
  label?: string;
  showCall?: boolean;
  size?: "sm" | "md";
  style?: CSSProperties;
  className?: string;
}

export function OrderChannels({ label = "Order on", showCall = false, size = "md", style, className }: OrderChannelsProps) {
  const pad = size === "sm" ? "8px 13px" : "9px 15px";
  const fontSize = size === "sm" ? "0.8125rem" : "0.875rem";
  return (
    <div className={className} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", ...style }}>
      {label && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-500)" }}>
          {label}
        </span>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {ORDER_CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: pad,
              background: "var(--white)",
              border: "1.5px solid var(--color-outline)",
              borderRadius: "999px",
              fontFamily: "var(--font-body)",
              fontSize,
              fontWeight: 600,
              color: "var(--ink-800)",
              textDecoration: "none",
            }}
          >
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot }} />
            {c.label}
          </a>
        ))}
      </div>
      {showCall && (
        <span style={{ fontFamily: "var(--font-body)", fontSize, color: "var(--ink-500)" }}>or call {ORDER_PHONE}</span>
      )}
    </div>
  );
}

export default OrderChannels;
