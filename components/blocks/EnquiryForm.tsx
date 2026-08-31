"use client";

import { useState, useEffect, useRef, useMemo, type FormEvent } from "react";
import { Input } from "@/components/ds/Input";
import { Select } from "@/components/ds/Select";
import { Textarea } from "@/components/ds/Textarea";
import { ChoiceGroup, type ChoiceOption } from "@/components/ds/ChoiceGroup";
import { Button } from "@/components/ds/Button";

export interface EnquiryField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "number" | "textarea" | "select" | "radio" | "checkbox";
  required?: boolean;
  /** Options for select / radio / checkbox. */
  options?: ChoiceOption[];
  placeholder?: string;
  helper?: string;
  /** span the full width of the 2-column grid */
  full?: boolean;
  /** Minimum characters for text/textarea — used to ask for a real answer. */
  minLength?: number;
  /** Bounds for number fields. */
  min?: number;
  max?: number;
  /** Lay radio/checkbox options out in two columns. */
  columns?: 1 | 2;
  /** Only show this field when another field holds one of these values. */
  showWhen?: { field: string; equals: string[] };
}

export interface EnquiryStep {
  /** Short step name, shown in the progress rail. */
  title: string;
  /** Optional sentence explaining why we ask for this. */
  description?: string;
  fields: EnquiryField[];
}

export interface EnquiryFormProps {
  kind: string;
  /** Single-page form. Provide this OR `steps`. */
  fields?: EnquiryField[];
  /** Multi-step form — one screen per step, validated as you go. */
  steps?: EnquiryStep[];
  submitLabel?: string;
  /** Message shown on the success screen, below the thank-you heading. */
  successNote?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/i;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove?: (id: string) => void;
    };
  }
}

/** Digits only, then require a plausible Indian mobile (10 digits, or 11–13 with a country code). */
function validPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function EnquiryForm({ kind, fields, steps, submitLabel = "Send enquiry", successNote }: EnquiryFormProps) {
  // A single-page form is just a one-step form — one code path from here on.
  const resolvedSteps = useMemo<EnquiryStep[]>(
    () => steps ?? [{ title: "Enquiry", fields: fields ?? [] }],
    [steps, fields],
  );
  const multiStep = Boolean(steps && steps.length > 1);
  const allFields = useMemo(() => resolvedSteps.flatMap((s) => s.fields), [resolvedSteps]);

  const [stepIndex, setStepIndex] = useState(0);
  const isLast = stepIndex === resolvedSteps.length - 1;
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Render the Cloudflare Turnstile widget (only when a site key is configured).
  // It lives on the last step, so it mounts/unmounts as the person steps through.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !isLast) return;
    let poll: ReturnType<typeof setInterval> | undefined;
    const renderWidget = () => {
      if (!turnstileRef.current || widgetId.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (t: string) => {
          setCaptchaToken(t);
          setCaptchaError(false);
        },
        "error-callback": () => setCaptchaToken(""),
        "expired-callback": () => setCaptchaToken(""),
        theme: "light",
      });
    };
    if (window.turnstile) {
      renderWidget();
    } else if (!document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)) {
      const s = document.createElement("script");
      s.src = TURNSTILE_SCRIPT;
      s.async = true;
      s.defer = true;
      s.onload = renderWidget;
      document.head.appendChild(s);
    } else {
      poll = setInterval(() => {
        if (window.turnstile) {
          clearInterval(poll);
          renderWidget();
        }
      }, 200);
    }
    return () => {
      if (poll) clearInterval(poll);
      // Stepping back unmounts the container — drop the widget so it re-renders on return.
      if (widgetId.current) {
        window.turnstile?.remove?.(widgetId.current);
        widgetId.current = null;
        setCaptchaToken("");
      }
    };
  }, [isLast]);

  /** Drop the used/failed Turnstile token and re-arm the widget for another attempt. */
  const resetCaptcha = () => {
    if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
    setCaptchaToken("");
    setCaptchaError(false);
  };

  const setField = (name: string, value: string | string[]) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const asString = (v: string | string[] | undefined): string =>
    Array.isArray(v) ? v.join(", ") : String(v ?? "");

  /** A conditional field is only asked (and only validated) when its trigger matches. */
  const isVisible = (f: EnquiryField): boolean => {
    if (!f.showWhen) return true;
    return f.showWhen.equals.includes(asString(values[f.showWhen.field]).trim());
  };

  const validateFields = (list: EnquiryField[]) => {
    const next: Record<string, string> = {};
    for (const f of list) {
      if (!isVisible(f)) continue;
      const raw = values[f.name];
      const val = asString(raw).trim();
      if (f.required && !val) {
        next[f.name] = f.type === "checkbox" || f.type === "radio" ? "Please choose an option" : `${f.label} is required`;
      } else if (!val) {
        continue;
      } else if (f.type === "email" && !EMAIL_RE.test(val)) {
        next[f.name] = "Enter a valid email address";
      } else if (f.type === "tel" && !validPhone(val)) {
        next[f.name] = "Enter a valid phone number with country/STD code";
      } else if (f.type === "url" && !URL_RE.test(val)) {
        next[f.name] = "Enter a valid link (e.g. linkedin.com/in/you)";
      } else if (f.type === "number") {
        const n = Number(val);
        if (!Number.isFinite(n)) next[f.name] = "Enter a number";
        else if (f.min != null && n < f.min) next[f.name] = `Enter ${f.min} or more`;
        else if (f.max != null && n > f.max) next[f.name] = `Enter ${f.max} or less`;
      } else if (f.minLength && val.length < f.minLength) {
        next[f.name] = `Please write at least ${f.minLength} characters — this helps us understand you`;
      }
    }
    return next;
  };

  const commitErrors = (next: Record<string, string>) => {
    setErrors(next);
    if (Object.keys(next).length === 0) return true;
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    return false;
  };

  const goNext = () => {
    if (!commitErrors(validateFields(resolvedSteps[stepIndex].fields))) return;
    setStepIndex((i) => Math.min(i + 1, resolvedSteps.length - 1));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goBack = () => {
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validate everything, not just the last step — a jump-back edit can break an earlier step.
    const allErrors = validateFields(allFields);
    if (!commitErrors(allErrors)) {
      const firstBad = allFields.findIndex((f) => allErrors[f.name]);
      if (firstBad >= 0) {
        const owning = resolvedSteps.findIndex((s) => s.fields.some((f) => f.name === allFields[firstBad].name));
        if (owning >= 0) setStepIndex(owning);
      }
      return;
    }
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setCaptchaError(true);
      return;
    }
    setStatus("submitting");

    // Send the answers in the order they were asked, so the notification email reads
    // top-to-bottom like the form rather than in the order the person happened to type.
    const ordered: Record<string, string> = {};
    for (const f of allFields) {
      if (!isVisible(f)) continue;
      const val = asString(values[f.name]).trim();
      if (val) ordered[f.name] = val;
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, data: { ...ordered, company: honeypot, turnstileToken: captchaToken } }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues({});
      resetCaptcha();
    } catch {
      // The server consumes the Turnstile token before it can fail (e.g. the mail send
      // dies), and tokens are single-use. Without a reset here the retry re-sends a spent
      // token, gets a 403 every time, and the applicant is stuck with no way back except
      // a reload that discards every answer.
      setStatus("error");
      resetCaptcha();
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        style={{
          background: "var(--color-success-container)",
          border: "1px solid var(--leaf-200)",
          borderRadius: "var(--radius-xl)",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-display)", color: "var(--green-700)", fontSize: "1.5rem", margin: "0 0 8px" }}>
          Thank you — we&apos;ve got it.
        </h3>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", margin: 0, lineHeight: 1.6 }}>
          {successNote ??
            "The Thepla House team will get back to you shortly. For anything urgent, call +91 98195 55065."}
        </p>
      </div>
    );
  }

  const step = resolvedSteps[stepIndex];
  const progress = ((stepIndex + 1) / resolvedSteps.length) * 100;

  const renderField = (f: EnquiryField) => {
    if (!isVisible(f)) return null;
    const common = {
      label: f.label,
      required: f.required,
      error: errors[f.name],
      helper: f.helper,
    };
    const span =
      f.full || f.type === "textarea" || f.type === "radio" || f.type === "checkbox"
        ? { gridColumn: "1 / -1" }
        : undefined;
    const strVal = asString(values[f.name]);

    return (
      <div key={f.name} style={span}>
        {f.type === "textarea" ? (
          <Textarea
            {...common}
            value={strVal}
            rows={4}
            placeholder={f.placeholder}
            onChange={(e) => setField(f.name, e.target.value)}
          />
        ) : f.type === "select" ? (
          <Select
            {...common}
            value={strVal}
            options={f.options}
            placeholder={f.placeholder || "Choose…"}
            onChange={(e) => setField(f.name, e.target.value)}
          />
        ) : f.type === "radio" || f.type === "checkbox" ? (
          <ChoiceGroup
            {...common}
            name={f.name}
            multiple={f.type === "checkbox"}
            options={f.options || []}
            columns={f.columns}
            value={f.type === "checkbox" ? (Array.isArray(values[f.name]) ? (values[f.name] as string[]) : []) : strVal}
            onChange={(v) => setField(f.name, v)}
          />
        ) : (
          <Input
            {...common}
            value={strVal}
            // `url` stays a text input so the browser's own URL rule doesn't fight ours,
            // but the phone keyboard and autocorrect still need the right hints.
            type={f.type === "url" ? "text" : f.type || "text"}
            inputMode={f.type === "number" ? "numeric" : f.type === "url" ? "url" : undefined}
            autoCapitalize={f.type === "email" || f.type === "url" ? "none" : undefined}
            autoCorrect={f.type === "email" || f.type === "url" ? "off" : undefined}
            spellCheck={f.type === "email" || f.type === "url" ? false : undefined}
            min={f.min}
            max={f.max}
            placeholder={f.placeholder}
            onChange={(e) => setField(f.name, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      // A step whose only implicit-submission-blocking input is the hidden honeypot (e.g. a
      // step of just radios and selects) would otherwise submit the whole form on Enter,
      // throwing the person forward onto errors for questions they have not been shown.
      onKeyDown={(e) => {
        if (e.key === "Enter" && !isLast && !(e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
        }
      }}
      noValidate
      style={{ display: "grid", gap: 18 }}
      className="enquiry-form"
    >
      <div ref={topRef} style={{ scrollMarginTop: 90 }} />

      {multiStep && (
        <div style={{ gridColumn: "1 / -1" }}>
          <span
            style={{
              display: "block",
              marginBottom: 8,
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
            }}
          >
            Step {stepIndex + 1} of {resolvedSteps.length}
          </span>
          <div
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={1}
            aria-valuemax={resolvedSteps.length}
            aria-label={`Step ${stepIndex + 1} of ${resolvedSteps.length}: ${step.title}`}
            style={{ height: 6, background: "var(--color-surface-container-high)", borderRadius: 999, overflow: "hidden" }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "var(--color-primary)",
                borderRadius: 999,
                transition: "width var(--duration-base) var(--ease-standard)",
              }}
            />
          </div>
        </div>
      )}

      {multiStep && (
        <div style={{ gridColumn: "1 / -1" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-headline)",
              fontSize: "1.375rem",
              margin: 0,
            }}
          >
            {step.title}
          </h3>
          {step.description && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--ink-600)",
                fontSize: "0.9375rem",
                lineHeight: 1.55,
                margin: "6px 0 0",
              }}
            >
              {step.description}
            </p>
          )}
        </div>
      )}

      {step.fields.map(renderField)}

      {/* Honeypot — hidden from people, tempting to bots. Leave it empty. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {TURNSTILE_SITE_KEY && isLast && (
        <div style={{ gridColumn: "1 / -1" }}>
          <div ref={turnstileRef} />
          {captchaError && (
            <span role="alert" style={{ fontFamily: "var(--font-body)", color: "var(--color-error)", fontSize: "0.875rem" }}>
              Please complete the verification above.
            </span>
          )}
        </div>
      )}

      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {multiStep && stepIndex > 0 && (
          <Button as="button" type="button" variant="ghost" size="lg" onClick={goBack}>
            Back
          </Button>
        )}
        {isLast ? (
          <Button as="button" type="submit" variant="primary" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : submitLabel}
          </Button>
        ) : (
          <Button as="button" type="button" variant="primary" size="lg" onClick={goNext}>
            Continue
          </Button>
        )}
        {status === "error" && (
          <span role="alert" style={{ fontFamily: "var(--font-body)", color: "var(--color-error)", fontSize: "0.875rem" }}>
            Something went wrong. Please try again or email us.
          </span>
        )}
      </div>
    </form>
  );
}

export default EnquiryForm;
