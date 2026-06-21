"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/data/site";

/**
 * SiteHeader — the production responsive navbar (sticky). Inline links + CTA on
 * desktop; logo + Order-now + hamburger sheet on mobile, matching the design's
 * navbar across breakpoints. Built on the design-system tokens.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--color-surface) 97%, transparent)",
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderBottom: "1px solid var(--color-outline-variant)",
      }}
    >
      <div
        className="th-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, paddingTop: 10, paddingBottom: 10 }}
      >
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }} aria-label={`${SITE.shortName} — home`}>
          <Image src={SITE.logo} alt={SITE.name} width={88} height={48} priority style={{ height: 48, width: "auto", display: "block" }} />
        </Link>

        {/* Desktop links */}
        <nav className="nav-desktop" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: isActive(l.href) ? "var(--color-primary)" : "var(--color-on-surface)",
                textDecoration: "none",
                padding: "8px 4px",
                transition: "var(--transition-colors)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link
            href="/menu"
            className="nav-cta"
            style={{
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
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-sm)",
              textDecoration: "none",
            }}
          >
            Order now
          </Link>
          <button
            className="nav-hamburger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
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
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className="nav-sheet"
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows var(--duration-slow) var(--ease-standard)",
          borderTop: open ? "1px solid var(--color-outline-variant)" : "none",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <nav className="th-container" style={{ display: "flex", flexDirection: "column", paddingTop: 8, paddingBottom: 16, gap: 2 }} aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  padding: "14px 8px",
                  minHeight: 48,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid var(--color-outline-variant)",
                  textDecoration: "none",
                  color: isActive(l.href) ? "var(--color-primary)" : "var(--color-on-surface)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
