import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Thepla House by Tejal's Kitchen — home-style Gujarati food & healthy vegetarian tiffin, Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded default social/preview card used across the site.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo/theplahouse-logo.png"));
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
          justifyContent: "center",
          background: "#FFFDF9",
          padding: 60,
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={300} alt="" />
        <div style={{ fontSize: 52, fontWeight: 800, color: "#205340", marginTop: 4 }}>
          Home-style Gujarati food, Mumbai
        </div>
        <div style={{ fontSize: 30, color: "#983830", marginTop: 14, textAlign: "center" }}>
          100% vegetarian · Healthy whole-wheat · Tiffin-style meal delivery
        </div>
        <div style={{ fontSize: 26, color: "#9a8f86", marginTop: 18, fontStyle: "italic" }}>
          Junk the Junk Food.
        </div>
      </div>
    ),
    { ...size },
  );
}
