import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Thepla House by Tejal's Kitchen — home-style Gujarati food & healthy vegetarian tiffin, Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Clean, centered brand card: emblem, tagline and a dot-separated offering row
// between two accent bars. Used as the default Open Graph + Twitter image.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/icon-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "34px 48px",
          background: "radial-gradient(120% 120% at 50% 30%, #1a3a2b 0%, #0e2117 62%, #0a1a12 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* top accent bar */}
        <div style={{ width: "100%", height: 10, display: "flex", background: "#F3B53C", borderRadius: 2 }} />

        {/* centre block */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={236} height={236} />
          <div style={{ fontSize: 50, fontWeight: 800, color: "#FFF8EC", marginTop: 22, letterSpacing: 0.5 }}>
            Home-style Gujarati Food, Made in Mumbai
          </div>
          <div style={{ fontSize: 27, color: "#E2C98C", marginTop: 20, letterSpacing: 1 }}>
            Theplas · Thalis · Farsan · Catering · Travel Packs
          </div>
          <div style={{ fontSize: 22, color: "#9FB6A6", marginTop: 14, letterSpacing: 1 }}>
            100% Vegetarian · Whole Wheat · Jain &amp; Vegan · Fresh to Order
          </div>
        </div>

        {/* bottom accent bar */}
        <div style={{ width: "100%", height: 10, display: "flex", background: "#F3B53C", borderRadius: 2 }} />
      </div>
    ),
    { ...size },
  );
}
