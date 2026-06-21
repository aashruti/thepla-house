"use client";

import { useState } from "react";
import { Tabs } from "@/components/ds/Tabs";
import { MenuItemCard } from "./MenuItemCard";
import { MenuRow } from "./MenuRow";
import { MENU_CATEGORIES, DIET_FILTERS, tagsFor, type TagKey } from "@/data/menu";

/**
 * MenuExplorer — category tabs + diet filters. Compact MenuRow list on mobile,
 * MenuItemCard grid on tablet/desktop. Client-side filtering.
 */
export function MenuExplorer() {
  const [cat, setCat] = useState(MENU_CATEGORIES[0].id);
  const [diet, setDiet] = useState("all");

  const activeCategory = MENU_CATEGORIES.find((c) => c.id === cat) || MENU_CATEGORIES[0];
  const filtered = activeCategory.dishes.filter(
    (d) => diet === "all" || d.keys.includes(diet as TagKey),
  );

  return (
    <>
      <div style={{ borderBottom: "1px solid var(--color-outline-variant)" }}>
        <Tabs
          tabs={MENU_CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: c.dishes.length }))}
          value={cat}
          onChange={setCat}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 0 4px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
          {DIET_FILTERS.map((f) => {
            const active = f.key === diet;
            return (
              <button
                key={f.key}
                onClick={() => setDiet(f.key)}
                aria-pressed={active}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                  minHeight: 40,
                  padding: "9px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "var(--transition-colors)",
                  background: active ? "var(--color-primary)" : "var(--white)",
                  color: active ? "var(--color-on-primary)" : "var(--ink-700)",
                  border: `1.5px solid ${active ? "var(--color-primary)" : "var(--color-outline)"}`,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--ink-500)" }}>
          {activeCategory.label} · showing {filtered.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 10px", color: "var(--ink-500)", fontFamily: "var(--font-body)", fontSize: "1.0625rem" }}>
          No dishes match that filter in this category — try another.
        </div>
      ) : (
        <>
          {/* Mobile: compact rows */}
          <div className="md:hidden" style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 20 }}>
            {filtered.map((d) => (
              <MenuRow key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} />
            ))}
          </div>
          {/* Tablet/desktop: card grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6" style={{ paddingTop: 28 }}>
            {filtered.map((d) => (
              <MenuItemCard key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} />
            ))}
          </div>
        </>
      )}

      <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9375rem", margin: "28px 0 0" }}>
        This is a representative selection — the full kitchen runs to 250+ dishes across theplas, thalis, farsan, sweets and seasonal specials.
      </p>
    </>
  );
}

export default MenuExplorer;
