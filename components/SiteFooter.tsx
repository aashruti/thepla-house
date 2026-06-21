import { Footer } from "@/components/ds";
import { TrimBorder } from "@/components/ds/TrimBorder";
import {
  SITE,
  FOOTER_COLUMNS,
  FOOTER_SOCIALS,
  FOOTER_NOTE,
} from "@/data/site";

/**
 * SiteFooter — shared footer composed from the DS Footer + a cultural toran
 * seam, wired to the central site data.
 */
export function SiteFooter() {
  return (
    <>
      <TrimBorder pattern="toran" color="var(--gold-400)" size={16} flip />
      <Footer
        logoSrc={SITE.logo}
        brand={SITE.name}
        tagline={SITE.tagline}
        columns={FOOTER_COLUMNS}
        socials={FOOTER_SOCIALS}
        note={FOOTER_NOTE}
      />
    </>
  );
}

export default SiteFooter;
