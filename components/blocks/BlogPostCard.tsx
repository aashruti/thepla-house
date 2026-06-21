import Link from "next/link";
import type { CSSProperties } from "react";
import { PhotoSlot } from "./PhotoSlot";

/**
 * BlogPostCard — article card: cover photo, category, title, excerpt, meta.
 */
export interface BlogPostCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  subject: string;
  alt: string;
  href?: string;
  src?: string;
  style?: CSSProperties;
  className?: string;
}

export function BlogPostCard({
  title,
  excerpt,
  category,
  date,
  read,
  subject,
  alt,
  href = "#",
  src,
  style,
  className,
}: BlogPostCardProps) {
  return (
    <Link
      href={href}
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
        textDecoration: "none",
        color: "inherit",
        ...style,
      }}
    >
      <div style={{ position: "relative", height: 170 }}>
        <PhotoSlot subject={subject} alt={alt} src={src} style={{ height: 170, width: "100%" }} />
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            padding: "5px 11px",
            borderRadius: "999px",
            background: "var(--green-700)",
            color: "var(--cream-50)",
          }}
        >
          {category}
        </span>
      </div>
      <div style={{ padding: "16px 17px 18px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.25rem", lineHeight: 1.22, margin: 0 }}>
          {title}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-on-surface-variant)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0, flex: 1 }}>
          {excerpt}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.8125rem", marginTop: 2 }}>
          <span>{date}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-300)" }} />
          <span>{read}</span>
        </div>
      </div>
    </Link>
  );
}

export default BlogPostCard;
