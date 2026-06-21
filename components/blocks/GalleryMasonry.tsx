"use client";

import { useState } from "react";
import { Tabs } from "@/components/ds/Tabs";
import { PhotoSlot } from "./PhotoSlot";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/data/gallery";
import { dishImage, img } from "@/data/images";

/**
 * GalleryMasonry — category tabs + a CSS-columns masonry. 2 columns on mobile,
 * 3 on tablet, 4 on desktop (see .gallery-masonry in globals.css).
 */
export function GalleryMasonry() {
  const [cat, setCat] = useState("all");
  const visible = GALLERY_ITEMS.filter((g) => cat === "all" || g.cat === cat);

  return (
    <>
      <div style={{ borderBottom: "1px solid var(--color-outline-variant)", display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <Tabs tabs={GALLERY_CATEGORIES} value={cat} onChange={setCat} />
      </div>
      <div className="gallery-masonry">
        {visible.map((g, i) => {
          const resolved = g.src ?? (g.dish ? dishImage(g.dish) : g.img ? img(g.img) : undefined);
          return (
            <div key={`${g.alt}-${i}`} style={{ breakInside: "avoid", marginBottom: 20, borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
              <PhotoSlot subject={g.subject} alt={g.alt} src={resolved} style={{ height: g.h, width: "100%", display: "block" }} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default GalleryMasonry;
