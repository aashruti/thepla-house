"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * Thepla House — Card
 * Warm content container. `interactive` adds a hover lift.
 */
export interface CardProps {
  children?: ReactNode;
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  elevation?: "none" | "xs" | "sm" | "md";
  style?: CSSProperties;
  className?: string;
}

export function Card({
  children,
  interactive = false,
  padding = "md",
  elevation = "sm",
  style,
  ...rest
}: CardProps) {
  const [hover, setHover] = useState(false);
  const pads: Record<string, number | string> = {
    none: 0,
    sm: "var(--space-4)",
    md: "var(--space-6)",
    lg: "var(--space-8)",
  };
  const shadows: Record<string, string> = {
    none: "none",
    xs: "var(--shadow-xs)",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
  };
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--color-surface-container)",
        border: "1px solid var(--color-outline-variant)",
        borderRadius: "var(--radius-xl)",
        padding: pads[padding],
        boxShadow: hover ? "var(--shadow-lg)" : shadows[elevation],
        overflow: "hidden",
        transform: hover ? "translateY(-4px)" : "none",
        transition:
          "transform var(--duration-base) var(--ease-soft), box-shadow var(--duration-base) var(--ease-standard)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardMediaProps {
  src?: string;
  alt?: string;
  height?: number | string;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/** Image area for a Card. Pass `src`, or children for a placeholder. */
export function CardMedia({
  src,
  alt = "",
  height = 180,
  children,
  style,
  ...rest
}: CardMediaProps) {
  return (
    <div
      style={{
        margin: "calc(-1 * var(--space-6)) calc(-1 * var(--space-6)) var(--space-5)",
        height,
        background: src
          ? `center/cover no-repeat url(${src})`
          : "linear-gradient(135deg, var(--gold-200), var(--gold-100))",
        display: "flex",
        alignItems: "flex-end",
        ...style,
      }}
      {...rest}
    >
      {!src && children}
      {src && (
        <img src={src} alt={alt} style={{ position: "absolute", width: 1, height: 1, opacity: 0 }} />
      )}
    </div>
  );
}

export default Card;
