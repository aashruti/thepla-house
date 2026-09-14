import type { CSSProperties } from "react";
import { ORDER_CHANNELS, ORDER_PHONE } from "@/data/site";
import { AggregatorLink } from "./AggregatorLink";

/**
 * OrderChannels — Swiggy / Zomato / WhatsApp chips, each with the service's
 * official mark, plus an optional "or call" affordance.
 */
export interface OrderChannelsProps {
  label?: string;
  showCall?: boolean;
  size?: "sm" | "md";
  style?: CSSProperties;
  className?: string;
}

export function OrderChannels({ label = "Order on", showCall = false, size = "md", style, className }: OrderChannelsProps) {
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
          <AggregatorLink key={c.aggregator} service={c.aggregator} href={c.href} size={size} />
        ))}
      </div>
      {showCall && (
        <span style={{ fontFamily: "var(--font-body)", fontSize, color: "var(--ink-500)" }}>or call {ORDER_PHONE}</span>
      )}
    </div>
  );
}

export default OrderChannels;
