"use client";

import { useState, type ReactNode } from "react";

/**
 * Thepla House — Accordion (FAQ)
 * `items` = [{ q, a }]. Single-open by default; pass `allowMultiple`.
 * Smooth height/opacity reveal that respects reduced-motion.
 */
export interface AccordionItem {
  q: string;
  a: ReactNode;
}

export interface AccordionProps {
  items?: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
}

export function Accordion({ items = [], allowMultiple = false, defaultOpen = [] }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen));
  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-outline-variant)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-surface-container)",
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-outline-variant)" }}>
            <h3 style={{ margin: 0 }}>
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "18px 20px",
                  minHeight: 56,
                  background: isOpen ? "var(--color-surface-container-high)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "var(--color-headline)",
                  transition: "background-color var(--duration-fast) var(--ease-standard)",
                }}
              >
                {item.q}
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 26,
                    height: 26,
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                    fontSize: 16,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform var(--duration-base) var(--ease-soft)",
                  }}
                >
                  ＋
                </span>
              </button>
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows var(--duration-slow) var(--ease-standard)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    padding: "0 20px 20px",
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    lineHeight: "var(--lh-body)",
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
