"use client";

import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

/**
 * Thepla House — Input
 * Labelled text field with warm cream fill, gold focus ring, and an error state.
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helper?: string;
  error?: string;
  iconLeft?: ReactNode;
}

export function Input({
  label,
  id,
  type = "text",
  placeholder,
  helper,
  error,
  disabled = false,
  required = false,
  iconLeft = null,
  value,
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const reactId = useId();
  const fieldId = id || reactId;
  const invalid = Boolean(error);
  const borderColor = invalid
    ? "var(--color-error)"
    : focus
      ? "var(--color-secondary-active)"
      : "var(--color-outline)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontFamily: "var(--font-body)",
        width: "100%",
      }}
    >
      {label && (
        <label
          htmlFor={fieldId}
          style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-on-surface)" }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--color-error)", marginLeft: 2 }} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {iconLeft && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 14,
              display: "inline-flex",
              color: "var(--color-on-surface-variant)",
              pointerEvents: "none",
            }}
          >
            {iconLeft}
          </span>
        )}
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          aria-invalid={invalid || undefined}
          aria-describedby={helper || error ? `${fieldId}-desc` : undefined}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            minHeight: 46,
            padding: iconLeft ? "12px 14px 12px 40px" : "12px 14px",
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-on-surface)",
            background: disabled ? "var(--color-surface-container-high)" : "var(--color-surface)",
            border: `1.5px solid ${borderColor}`,
            borderRadius: "var(--radius-md)",
            outline: "none",
            boxShadow:
              focus && !invalid
                ? "var(--shadow-focus)"
                : invalid && focus
                  ? "0 0 0 3px color-mix(in srgb, var(--color-error) 30%, transparent)"
                  : "none",
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? "not-allowed" : "text",
            transition:
              "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)",
          }}
          {...rest}
        />
      </div>
      {(helper || error) && (
        <span
          id={`${fieldId}-desc`}
          style={{
            fontSize: "0.8125rem",
            color: invalid ? "var(--color-error)" : "var(--color-on-surface-variant)",
          }}
        >
          {error || helper}
        </span>
      )}
    </div>
  );
}

export default Input;
