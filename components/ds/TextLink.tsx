"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * Thepla House — TextLink
 * Inline maroon link with warm underline. Optional `arrow` for "learn more".
 */
export interface TextLinkProps {
  children?: ReactNode;
  href?: string;
  arrow?: boolean;
  variant?: "default" | "quiet";
  style?: CSSProperties;
  className?: string;
  target?: string;
  rel?: string;
}

export function TextLink({
  children,
  href = "#",
  arrow = false,
  variant = "default",
  style,
  ...rest
}: TextLinkProps) {
  const [hover, setHover] = useState(false);
  const color = variant === "quiet" ? "var(--color-on-surface)" : "var(--color-primary)";
  const hoverColor = "var(--color-primary-hover)";
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        color: hover ? hoverColor : color,
        textDecorationLine: "underline",
        textDecorationThickness: "1.5px",
        textUnderlineOffset: "0.18em",
        textDecorationColor: hover
          ? "currentColor"
          : "color-mix(in srgb, currentColor 35%, transparent)",
        cursor: "pointer",
        transition: "var(--transition-colors)",
        borderRadius: "var(--radius-xs)",
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          style={{
            transition: "transform var(--duration-base) var(--ease-soft)",
            transform: hover ? "translateX(3px)" : "none",
          }}
        >
          →
        </span>
      )}
    </a>
  );
}

export default TextLink;
