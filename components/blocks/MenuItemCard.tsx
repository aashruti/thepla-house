import type { CSSProperties } from "react";
import { PhotoSlot } from "./PhotoSlot";
import { dishImage } from "@/data/images";
import type { DishTag } from "@/lib/tags";

/**
 * MenuItemCard — product card: photo, name, description, diet tags.
 */
export interface MenuItemCardProps {
  title: string;
  desc: string;
  subject: string;
  alt: string;
  tags?: DishTag[];
  src?: string;
  style?: CSSProperties;
  className?: string;
}

export function MenuItemCard({ title, desc, subject, alt, tags = [], src, style, className }: MenuItemCardProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--color-surface-container)",
        border: "1px solid var(--color-outline-variant)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        height: "100%",
        ...style,
      }}
    >
      <PhotoSlot subject={subject} alt={alt} src={src ?? dishImage(title)} style={{ height: 166, width: "100%" }} />
      <div style={{ padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.1875rem", lineHeight: 1.2, margin: 0 }}>
          {title}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-on-surface-variant)", fontSize: "0.875rem", lineHeight: 1.5, margin: 0, flex: 1 }}>
          {desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
          {tags.map((tag) => (
            <span
              key={tag.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "999px",
                background: tag.bg,
                color: tag.fg,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
