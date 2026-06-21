import type { CSSProperties } from "react";

/**
 * Thepla House — TrimBorder
 * A culturally-rich decorative border band (toran / bandhani / block-print /
 * scallop / kantha). Purely decorative — aria-hidden. Use at seams only.
 */
export type TrimPattern = "toran" | "bandhani" | "blockprint" | "scallop" | "kantha";

export interface TrimBorderProps {
  pattern?: TrimPattern;
  /** any CSS colour or var(); defaults to maroon */
  color?: string;
  /** tile size in px (controls scale) */
  size?: number | string;
  flip?: boolean;
  style?: CSSProperties;
  className?: string;
}

const DEFAULT_SIZE: Record<TrimPattern, number> = {
  toran: 16,
  bandhani: 14,
  blockprint: 18,
  scallop: 16,
  kantha: 10,
};

export function TrimBorder({
  pattern = "toran",
  color,
  size,
  flip = false,
  style,
  className,
  ...rest
}: TrimBorderProps) {
  const trimSize = size != null ? size : DEFAULT_SIZE[pattern];
  const vars: Record<string, string> = {};
  if (color) vars["--trim-color"] = color;
  if (trimSize != null)
    vars["--trim-size"] = typeof trimSize === "number" ? `${trimSize}px` : trimSize;
  return (
    <div
      aria-hidden="true"
      className={`th-trim th-trim--${pattern}${flip ? " th-trim--flip" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={{ ...(vars as CSSProperties), ...style }}
      {...rest}
    />
  );
}

export default TrimBorder;
