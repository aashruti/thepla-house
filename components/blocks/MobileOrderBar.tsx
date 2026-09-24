"use client";

import posthog from "posthog-js";
import { WHATSAPP_LINK, ORDER_PHONE_TEL } from "@/data/site";
import { AGGREGATORS } from "./AggregatorLink";
import { externalLinkProps } from "@/lib/links";

/**
 * MobileOrderBar — persistent bottom order bar, mobile only. Replaced by the
 * inline navbar CTA at ≥768px (see the .mobile-order-bar rule in globals.css).
 */
export interface MobileOrderBarProps {
  orderHref?: string;
}

export function MobileOrderBar({ orderHref = "/menu" }: MobileOrderBarProps) {
  return (
    <div className="mobile-order-bar" role="region" aria-label="Order now">
      <a
        href={orderHref}
        {...externalLinkProps(orderHref)}
        onClick={() => {
          if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
            posthog.capture("mobile_order_action_clicked", { action: "order" });
          }
        }}
        style={{ flex: 1, textAlign: "center", padding: 13, fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 700, color: "var(--color-on-secondary)", background: "var(--color-secondary)", borderRadius: "var(--radius-md)", textDecoration: "none" }}
      >
        Order now
      </a>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
            posthog.capture("mobile_order_action_clicked", { action: "whatsapp" });
          }
        }}
        style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "13px 14px 13px 11px", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 600, color: "var(--cream-100)", background: "rgba(255,255,255,0.14)", borderRadius: "var(--radius-md)", textDecoration: "none" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG */}
        <img src={AGGREGATORS.whatsapp.logo} alt="" aria-hidden="true" width={20} height={20} style={{ display: "block", borderRadius: 5 }} />
        WhatsApp
      </a>
      <a
        href={ORDER_PHONE_TEL}
        onClick={() => {
          if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
            posthog.capture("mobile_order_action_clicked", { action: "call" });
          }
        }}
        style={{ padding: "13px 16px", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 600, color: "var(--cream-100)", background: "rgba(255,255,255,0.14)", borderRadius: "var(--radius-md)", textDecoration: "none" }}
      >
        Call
      </a>
    </div>
  );
}

export default MobileOrderBar;
