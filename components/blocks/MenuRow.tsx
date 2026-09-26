"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { PhotoSlot } from "./PhotoSlot";
import { dishImage } from "@/data/images";
import { externalLinkProps } from "@/lib/links";
import type { DishTag } from "@/lib/tags";

/**
 * MenuRow — compact list row: thumbnail, name, description, diet tags.
 * With `href` the whole row is a link and shows the › chevron; without it the
 * row is plain content, so it has no chevron to invite a tap that does nothing.
 */
export interface MenuRowProps {
  title: string;
  desc: string;
  subject: string;
  alt: string;
  tags?: DishTag[];
  src?: string;
  href?: string;
  style?: CSSProperties;
  className?: string;
}

export function MenuRow({ title, desc, subject, alt, tags = [], src, href, style, className }: MenuRowProps) {
  const rowStyle: CSSProperties = {
    display: "flex",
    gap: 13,
    alignItems: "center",
    background: "var(--color-surface-container)",
    border: "1px solid var(--color-outline-variant)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-xs)",
    padding: "11px 13px",
    ...style,
  };

  const content = (
    <>
      <div style={{ flexShrink: 0, width: 74, height: 74, borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <PhotoSlot subject={subject} alt={alt} src={src ?? dishImage(title)} sizes="74px" style={{ height: 74, width: 74 }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.0625rem", lineHeight: 1.2, margin: "0 0 3px" }}>
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-on-surface-variant)",
            fontSize: "0.8125rem",
            lineHeight: 1.4,
            margin: "0 0 6px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {tags.map((tag) => (
            <span
              key={tag.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                padding: "3px 8px",
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
      {href && (
        <span aria-hidden="true" style={{ flexShrink: 0, alignSelf: "center", color: "var(--color-primary)", fontSize: "1.3rem", fontWeight: 700 }}>
          ›
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <div className={className} style={rowStyle}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      {...externalLinkProps(href)}
      className={className}
      style={{ ...rowStyle, color: "inherit", textDecoration: "none" }}
      onClick={() => {
        if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
          posthog.capture("menu_dish_clicked", { dish: title, href });
        }
      }}
    >
      {content}
    </Link>
  );
}

export default MenuRow;
