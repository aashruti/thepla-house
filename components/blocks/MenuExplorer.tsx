"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { Tabs } from "@/components/ds/Tabs";
import { MenuItemCard } from "./MenuItemCard";
import { MenuRow } from "./MenuRow";
import { MENU_CATEGORIES, tagsFor } from "@/data/menu";

/**
 * MenuExplorer — category tabs, led by an "All" tab that shows every dish.
 * Compact MenuRow list on mobile, MenuItemCard grid on tablet/desktop.
 */
const ALL_TAB = "all";
const totalDishes = MENU_CATEGORIES.reduce((n, c) => n + c.dishes.length, 0);

export function MenuExplorer() {
  const [cat, setCat] = useState(ALL_TAB);

  const dishes =
    cat === ALL_TAB
      ? MENU_CATEGORIES.flatMap((c) => c.dishes)
      : (MENU_CATEGORIES.find((c) => c.id === cat) ?? MENU_CATEGORIES[0]).dishes;

  return (
    <>
      <div style={{ borderBottom: "1px solid var(--color-outline-variant)" }}>
        <Tabs
          tabs={[
            { id: ALL_TAB, label: "All", count: totalDishes },
            ...MENU_CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: c.dishes.length })),
          ]}
          value={cat}
          onChange={(categoryId) => {
            setCat(categoryId);
            if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
              const category = MENU_CATEGORIES.find((item) => item.id === categoryId);
              posthog.capture("menu_category_selected", {
                category_id: categoryId,
                dish_count: category?.dishes.length ?? totalDishes,
              });
            }
          }}
        />
      </div>

      {/* Mobile: compact rows */}
      {/* flex lives in the class list, not an inline style: an inline display
          always beats md:hidden, which had this list rendering on desktop
          underneath the card grid. */}
      <div className="flex flex-col gap-3 md:hidden" style={{ paddingTop: 20 }}>
        {dishes.map((d) => (
          <MenuRow key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} src={d.image} />
        ))}
      </div>
      {/* Tablet/desktop: card grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6" style={{ paddingTop: 28 }}>
        {dishes.map((d) => (
          <MenuItemCard key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} src={d.image} />
        ))}
      </div>

      <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9375rem", margin: "28px 0 0" }}>
        These are our {totalDishes} most-ordered dishes. The full menu runs to 250+ — see it in full in the menu above, or on Swiggy and Zomato.
      </p>
    </>
  );
}

export default MenuExplorer;
