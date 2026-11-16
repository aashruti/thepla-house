"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { PhotoSlot } from "./PhotoSlot";
import { prefillEnquiry } from "./EnquiryForm";

/**
 * OccasionCard — a catering occasion that links to the enquiry form
 * and preselects that occasion in it.
 */
export interface OccasionCardProps {
  title: string;
  desc: string;
  subject: string;
  alt: string;
  src?: string;
  /** Value to set on the form's `occasion` field. */
  occasion: string;
}

export function OccasionCard({ title, desc, subject, alt, src, occasion }: OccasionCardProps) {
  return (
    <Link
      href="#cater-form"
      onClick={() => {
        prefillEnquiry("catering", { occasion });
        if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
          posthog.capture("catering_occasion_selected", { occasion });
        }
      }}
      style={{
        display: "block",
        background: "var(--color-surface-container)",
        border: "1px solid var(--color-outline-variant)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <div style={{ height: 150 }}>
        <PhotoSlot subject={subject} alt={alt} src={src} style={{ height: "100%", width: "100%" }} />
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.25rem" }}>{title}</div>
        <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.5, marginTop: 4 }}>{desc}</div>
      </div>
    </Link>
  );
}

export default OccasionCard;
