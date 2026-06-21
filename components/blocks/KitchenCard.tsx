import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * KitchenCard — location card: area, name, note, hours, directions + order.
 */
export interface KitchenCardProps {
  title: string;
  area: string;
  note: string;
  hours: string;
  directionsHref?: string;
  orderHref?: string;
  detailHref?: string;
  style?: CSSProperties;
  className?: string;
}

export function KitchenCard({
  title,
  area,
  note,
  hours,
  directionsHref = "#",
  orderHref = "#",
  detailHref,
  style,
  className,
}: KitchenCardProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "var(--color-surface-container)",
        border: "1px solid var(--color-outline-variant)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sm)",
        padding: "18px 18px 16px",
        height: "100%",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--green-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50% 50% 50% 0", background: "var(--green-600)", transform: "rotate(45deg)" }} />
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-primary)" }}>
          {area}
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.25rem", lineHeight: 1.2, margin: 0 }}>
        {detailHref ? (
          <Link href={detailHref} style={{ color: "inherit", textDecoration: "none" }}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--color-on-surface-variant)", fontSize: "0.875rem", lineHeight: 1.5, margin: 0, flex: 1 }}>
        {note}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--ink-600)", fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}>
        <span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid var(--ink-400)", position: "relative", display: "inline-block" }} />
        {hours}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <Link
          href={directionsHref}
          target={directionsHref.startsWith("http") ? "_blank" : undefined}
          rel={directionsHref.startsWith("http") ? "noopener noreferrer" : undefined}
          style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-outline)", borderRadius: "var(--radius-md)", padding: "9px 10px", textDecoration: "none" }}
        >
          Directions
        </Link>
        <Link
          href={orderHref}
          style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", padding: "9px 10px", textDecoration: "none" }}
        >
          Order
        </Link>
      </div>
    </div>
  );
}

export default KitchenCard;
