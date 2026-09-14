/**
 * Props for a link that may leave the site. External URLs open in a new tab
 * with noopener, so an aggregator page never gets a handle back on ours;
 * internal paths get nothing extra.
 */
export function externalLinkProps(href: string): { target?: "_blank"; rel?: string } {
  return /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
