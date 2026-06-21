"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * Thepla House — Button
 * Primary (maroon), Secondary (gold), Ghost. Warm, tactile, accessible.
 * Visuals come from CSS custom properties + React state for hover/active/focus.
 * `as` lets it render as an <a> (or Next <Link>) while keeping the look.
 */
export interface ButtonProps {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: any;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  as = "button",
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [focus, setFocus] = useState(false);
  const sizes = {
    sm: { padding: "8px 14px", fontSize: "0.875rem", minHeight: 36, gap: 6, radius: "var(--radius-sm)" },
    md: { padding: "11px 20px", fontSize: "1rem", minHeight: 44, gap: 8, radius: "var(--radius-md)" },
    lg: { padding: "15px 28px", fontSize: "1.0625rem", minHeight: 52, gap: 10, radius: "var(--radius-md)" },
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    primary: { bg: "var(--color-primary)", bgHover: "var(--color-primary-hover)", bgActive: "var(--color-primary-active)", color: "var(--color-on-primary)", border: "transparent", shadow: "var(--shadow-sm)", shadowHover: "var(--shadow-md)" },
    secondary: { bg: "var(--color-secondary)", bgHover: "var(--color-secondary-hover)", bgActive: "var(--color-secondary-active)", color: "var(--color-on-secondary)", border: "transparent", shadow: "var(--shadow-sm)", shadowHover: "var(--shadow-md)" },
    ghost: { bg: "transparent", bgHover: "color-mix(in srgb, var(--color-primary) 8%, transparent)", bgActive: "color-mix(in srgb, var(--color-primary) 16%, transparent)", color: "var(--color-primary)", border: "var(--color-primary)", shadow: "none", shadowHover: "none" },
  };
  const p = palettes[variant] || palettes.primary;
  const computed: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    width: fullWidth ? "100%" : "auto",
    minHeight: s.minHeight,
    padding: s.padding,
    fontFamily: "var(--font-body)",
    fontSize: s.fontSize,
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: "0.01em",
    color: disabled ? "var(--color-on-surface-variant)" : p.color,
    background: disabled
      ? "var(--color-surface-container-high)"
      : active
        ? p.bgActive
        : hover
          ? p.bgHover
          : p.bg,
    border: `1.5px solid ${disabled ? "transparent" : variant === "ghost" ? p.border : "transparent"}`,
    borderRadius: s.radius,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: focus
      ? `${variant === "ghost" ? "none" : p.shadow}, var(--shadow-focus)`
      : disabled || variant === "ghost"
        ? p.shadow
        : hover
          ? p.shadowHover
          : p.shadow,
    transform: !disabled && active ? "translateY(1px)" : !disabled && hover ? "translateY(-1px)" : "none",
    opacity: disabled ? 0.6 : 1,
    transition:
      "background-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-soft), color var(--duration-fast) var(--ease-standard)",
    textDecoration: "none",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    ...style,
  };
  const Tag = as;
  return (
    <Tag
      style={computed}
      disabled={as === "button" ? disabled : undefined}
      aria-disabled={disabled || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...rest}
    >
      {iconLeft && (
        <span style={{ display: "inline-flex", fontSize: "1.15em" }} aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span style={{ display: "inline-flex", fontSize: "1.15em" }} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Tag>
  );
}

export default Button;
