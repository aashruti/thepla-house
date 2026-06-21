"use client";

import { useState, type CSSProperties } from "react";

/**
 * Thepla House — Navbar (faithful DS port)
 * Desktop: logo + inline links + CTA. Compact: collapses links into a
 * hamburger sheet. The production header (SiteHeader) composes this responsively.
 */
export interface NavLink {
  label: string;
  href?: string;
  active?: boolean;
}

export interface NavbarProps {
  logoSrc?: string;
  brand?: string;
  links?: NavLink[];
  ctaLabel?: string;
  onCta?: () => void;
  ctaHref?: string;
  compact?: boolean;
}

function ctaStyle(): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    padding: "10px 20px",
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--color-on-primary)",
    background: "var(--color-primary)",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "var(--shadow-sm)",
    transition: "background-color var(--duration-fast) var(--ease-standard)",
  };
}

export function Navbar({
  logoSrc,
  brand = "Thepla House",
  links = [],
  ctaLabel = "Order now",
  onCta,
  ctaHref,
  compact = false,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const linkStyle: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "var(--color-on-surface)",
    textDecoration: "none",
    padding: "8px 4px",
    transition: "var(--transition-colors)",
  };
  const Cta = ctaHref ? "a" : "button";
  return (
    <nav
      style={{
        position: "relative",
        background: "color-mix(in srgb, var(--color-surface) 88%, transparent)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderBottom: "1px solid var(--color-outline-variant)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "10px 20px",
          maxWidth: "var(--container-xl)",
          margin: "0 auto",
        }}
      >
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt={brand} style={{ height: 44, width: "auto", display: "block" }} />
          ) : (
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "var(--color-headline)" }}>
              {brand}
            </span>
          )}
        </a>
        {!compact && (
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {links.map((l) => (
              <a key={l.label} href={l.href || "#"} style={{ ...linkStyle, color: l.active ? "var(--color-primary)" : linkStyle.color }}>
                {l.label}
              </a>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!compact && (
            <Cta onClick={onCta} href={ctaHref} style={ctaStyle()}>
              {ctaLabel}
            </Cta>
          )}
          {compact && (
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: 4,
                justifyContent: "center",
                width: 44,
                height: 44,
                padding: 10,
                background: "transparent",
                border: "1.5px solid var(--color-outline)",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    height: 2,
                    borderRadius: 2,
                    background: "var(--color-primary)",
                    transition: "transform var(--duration-base) var(--ease-soft), opacity var(--duration-fast)",
                    transform: open
                      ? i === 0
                        ? "translateY(6px) rotate(45deg)"
                        : i === 2
                          ? "translateY(-6px) rotate(-45deg)"
                          : "none"
                      : "none",
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          )}
        </div>
      </div>
      {compact && (
        <div
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows var(--duration-slow) var(--ease-standard)",
            borderTop: open ? "1px solid var(--color-outline-variant)" : "none",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", padding: "8px 20px 20px", gap: 2 }}>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href || "#"}
                  style={{
                    ...linkStyle,
                    padding: "14px 8px",
                    minHeight: 48,
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid var(--color-outline-variant)",
                    color: l.active ? "var(--color-primary)" : "var(--color-on-surface)",
                  }}
                >
                  {l.label}
                </a>
              ))}
              <Cta onClick={onCta} href={ctaHref} style={{ ...ctaStyle(), marginTop: 12, width: "100%" }}>
                {ctaLabel}
              </Cta>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
