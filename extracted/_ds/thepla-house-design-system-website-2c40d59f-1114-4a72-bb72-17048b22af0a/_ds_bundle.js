/* @ds-bundle: {"format":3,"namespace":"TheplaHouseDesignSystem_2c40d5","components":[{"name":"Badge","sourcePath":"components/badges/Badge.jsx"},{"name":"DietTag","sourcePath":"components/badges/DietTag.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"TextLink","sourcePath":"components/buttons/TextLink.jsx"},{"name":"TrimBorder","sourcePath":"components/decoration/TrimBorder.jsx"},{"name":"Accordion","sourcePath":"components/disclosure/Accordion.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"CTABanner","sourcePath":"components/marketing/CTABanner.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Navbar","sourcePath":"components/navigation/Navbar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardMedia","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/badges/Badge.jsx":"a364ff4b9bd1","components/badges/DietTag.jsx":"0b80c1af8f8f","components/buttons/Button.jsx":"fed2c67a16f6","components/buttons/TextLink.jsx":"adbf5b569f02","components/decoration/TrimBorder.jsx":"054593f34612","components/disclosure/Accordion.jsx":"8ebbb27a31c4","components/forms/Input.jsx":"ed8fabf817cf","components/forms/Select.jsx":"258261d3dfbc","components/forms/Textarea.jsx":"fd5edab8c416","components/marketing/CTABanner.jsx":"250cbb87c1e9","components/navigation/Footer.jsx":"635c74f50d71","components/navigation/Navbar.jsx":"d660b1620d71","components/navigation/Tabs.jsx":"c743ca9f8a48","components/surfaces/Card.jsx":"f90ddcaf7597","style-guide-components.jsx":"5d55bc2d4305"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TheplaHouseDesignSystem_2c40d5 = window.TheplaHouseDesignSystem_2c40d5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/badges/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thepla House — Badge
 * Small status/label pill. Tones map to semantic tokens.
 */
function Badge({
  children,
  tone = 'neutral',
  // neutral | primary | success | warning | error | gold | green
  variant = 'soft',
  // 'soft' | 'solid' | 'outline'
  size = 'md',
  // 'sm' | 'md'
  iconLeft = null,
  ...rest
}) {
  const tones = {
    neutral: {
      solid: 'var(--ink-700)',
      soft: 'var(--cream-200)',
      softText: 'var(--ink-700)',
      on: 'var(--white)'
    },
    primary: {
      solid: 'var(--color-primary)',
      soft: 'var(--maroon-100)',
      softText: 'var(--maroon-700)',
      on: 'var(--color-on-primary)'
    },
    green: {
      solid: 'var(--green-600)',
      soft: 'var(--green-100)',
      softText: 'var(--green-700)',
      on: 'var(--white)'
    },
    gold: {
      solid: 'var(--gold-400)',
      soft: 'var(--gold-100)',
      softText: 'var(--gold-800)',
      on: 'var(--ink-900)'
    },
    success: {
      solid: 'var(--color-success)',
      soft: 'var(--color-success-container)',
      softText: 'var(--color-on-success-container)',
      on: 'var(--color-on-success)'
    },
    warning: {
      solid: 'var(--color-warning)',
      soft: 'var(--color-warning-container)',
      softText: 'var(--color-on-warning-container)',
      on: 'var(--color-on-warning)'
    },
    error: {
      solid: 'var(--color-error)',
      soft: 'var(--color-error-container)',
      softText: 'var(--color-on-error-container)',
      on: 'var(--color-on-error)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: {
      padding: '2px 8px',
      fontSize: '0.6875rem',
      gap: 4
    },
    md: {
      padding: '4px 11px',
      fontSize: '0.75rem',
      gap: 5
    }
  };
  const s = sizes[size] || sizes.md;
  let bg, color, border;
  if (variant === 'solid') {
    bg = t.solid;
    color = t.on;
    border = 'transparent';
  } else if (variant === 'outline') {
    bg = 'transparent';
    color = t.softText;
    border = 'currentColor';
  } else {
    bg = t.soft;
    color = t.softText;
    border = 'transparent';
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      fontFamily: 'var(--font-body)',
      fontSize: s.fontSize,
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.03em',
      lineHeight: 1.3,
      color,
      background: bg,
      border: `1.25px solid ${border}`,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle'
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex'
    }
  }, iconLeft), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/Badge.jsx", error: String((e && e.message) || e) }); }

// components/badges/DietTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thepla House — DietTag
 * Purpose-built dietary / merchandising labels: Jain, Vegan, Best-seller,
 * plus generic Whole-wheat / No-palm-oil style claims. Each carries a tiny
 * dot glyph so meaning survives even without colour (accessibility).
 */
const PRESETS = {
  jain: {
    label: 'Jain',
    dot: '◇',
    fg: 'var(--color-jain)',
    bg: 'var(--color-jain-bg)'
  },
  vegan: {
    label: 'Vegan',
    dot: '🌿',
    fg: 'var(--color-vegan)',
    bg: 'var(--color-vegan-bg)'
  },
  bestseller: {
    label: 'Best-seller',
    dot: '★',
    fg: 'var(--color-bestseller)',
    bg: 'var(--color-bestseller-bg)'
  },
  wholewheat: {
    label: '100% Whole Wheat',
    dot: '✓',
    fg: 'var(--green-700)',
    bg: 'var(--green-100)'
  },
  nopalm: {
    label: 'No Palm Oil',
    dot: '✓',
    fg: 'var(--green-700)',
    bg: 'var(--green-100)'
  },
  spicy: {
    label: 'Spicy',
    dot: '🔥',
    fg: 'var(--maroon-700)',
    bg: 'var(--maroon-100)'
  }
};
function DietTag({
  type = 'vegan',
  label,
  icon,
  size = 'md',
  ...rest
}) {
  const p = PRESETS[type] || PRESETS.vegan;
  const text = label || p.label;
  const glyph = icon || p.dot;
  const sizes = {
    sm: {
      padding: '3px 9px',
      fontSize: '0.6875rem',
      gap: 5
    },
    md: {
      padding: '5px 12px',
      fontSize: '0.75rem',
      gap: 6
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      fontFamily: 'var(--font-body)',
      fontSize: s.fontSize,
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.02em',
      lineHeight: 1.25,
      color: p.fg,
      background: p.bg,
      border: '1.25px solid color-mix(in srgb, currentColor 22%, transparent)',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: '0.95em',
      lineHeight: 1
    }
  }, glyph), text);
}
Object.assign(__ds_scope, { DietTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/DietTag.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Thepla House — Button
 * Primary (maroon), Secondary (gold), Ghost. Warm, tactile, accessible.
 * Self-contained: all visuals come from CSS custom properties + React state
 * for hover/active/focus (no global CSS needed).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [focus, setFocus] = useState(false);
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: '0.875rem',
      minHeight: 36,
      gap: 6,
      radius: 'var(--radius-sm)'
    },
    md: {
      padding: '11px 20px',
      fontSize: '1rem',
      minHeight: 44,
      gap: 8,
      radius: 'var(--radius-md)'
    },
    lg: {
      padding: '15px 28px',
      fontSize: '1.0625rem',
      minHeight: 52,
      gap: 10,
      radius: 'var(--radius-md)'
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      bg: 'var(--color-primary)',
      bgHover: 'var(--color-primary-hover)',
      bgActive: 'var(--color-primary-active)',
      color: 'var(--color-on-primary)',
      border: 'transparent',
      shadow: 'var(--shadow-sm)',
      shadowHover: 'var(--shadow-md)'
    },
    secondary: {
      bg: 'var(--color-secondary)',
      bgHover: 'var(--color-secondary-hover)',
      bgActive: 'var(--color-secondary-active)',
      color: 'var(--color-on-secondary)',
      border: 'transparent',
      shadow: 'var(--shadow-sm)',
      shadowHover: 'var(--shadow-md)'
    },
    ghost: {
      bg: 'transparent',
      bgHover: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
      bgActive: 'color-mix(in srgb, var(--color-primary) 16%, transparent)',
      color: 'var(--color-primary)',
      border: 'var(--color-primary)',
      shadow: 'none',
      shadowHover: 'none'
    }
  };
  const p = palettes[variant] || palettes.primary;
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    width: fullWidth ? '100%' : 'auto',
    minHeight: s.minHeight,
    padding: s.padding,
    fontFamily: 'var(--font-body)',
    fontSize: s.fontSize,
    fontWeight: 'var(--fw-semibold)',
    lineHeight: 1.1,
    letterSpacing: '0.01em',
    color: p.color,
    background: disabled ? 'var(--color-surface-container-high)' : active ? p.bgActive : hover ? p.bgHover : p.bg,
    border: `1.5px solid ${disabled ? 'transparent' : variant === 'ghost' ? p.border : 'transparent'}`,
    borderRadius: s.radius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: focus ? `${variant === 'ghost' ? 'none' : p.shadow}, var(--shadow-focus)` : disabled || variant === 'ghost' ? p.shadow : hover ? p.shadowHover : p.shadow,
    transform: !disabled && active ? 'translateY(1px)' : !disabled && hover ? 'translateY(-1px)' : 'none',
    opacity: disabled ? 0.6 : 1,
    transition: 'background-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-soft), color var(--duration-fast) var(--ease-standard)',
    textDecoration: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent'
  };
  if (disabled) style.color = 'var(--color-on-surface-variant)';
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: style,
    disabled: as === 'button' ? disabled : undefined,
    "aria-disabled": disabled || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.15em'
    },
    "aria-hidden": "true"
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.15em'
    },
    "aria-hidden": "true"
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Thepla House — TextLink
 * Inline maroon link with warm underline. Use inside body copy or as a
 * standalone navigational link. Optional `arrow` for "learn more" affordances.
 */
function TextLink({
  children,
  href = '#',
  arrow = false,
  variant = 'default',
  // 'default' | 'quiet'
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const color = variant === 'quiet' ? 'var(--color-on-surface)' : 'var(--color-primary)';
  const hoverColor = 'var(--color-primary-hover)';
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-semibold)',
    color: hover ? hoverColor : color,
    textDecorationLine: 'underline',
    textDecorationThickness: '1.5px',
    textUnderlineOffset: '0.18em',
    textDecorationColor: hover ? 'currentColor' : 'color-mix(in srgb, currentColor 35%, transparent)',
    cursor: 'pointer',
    transition: 'var(--transition-colors)',
    borderRadius: 'var(--radius-xs)'
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: style,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children, arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      transition: 'transform var(--duration-base) var(--ease-soft)',
      transform: hover ? 'translateX(3px)' : 'none'
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/decoration/TrimBorder.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thepla House — TrimBorder
 * A culturally-rich decorative border band (Indian toran / bandhani /
 * block-print / scallop / kantha). Purely decorative — aria-hidden.
 * Recolour with `color`, resize with `size`, flip with `flip`.
 *
 * Use at seams: section dividers, CTA & footer edges, occasional card tops.
 * Keep it deliberate — not on every element.
 */
function TrimBorder({
  pattern = 'toran',
  // toran | bandhani | blockprint | scallop | kantha
  color,
  // any CSS colour or var(); defaults to maroon
  size,
  // tile size in px (controls scale)
  flip = false,
  style,
  ...rest
}) {
  // Sensible default scale per pattern when `size` isn't given.
  const DEFAULT_SIZE = {
    toran: 16,
    bandhani: 14,
    blockprint: 18,
    scallop: 16,
    kantha: 10
  };
  const trimSize = size != null ? size : DEFAULT_SIZE[pattern];
  const vars = {};
  if (color) vars['--trim-color'] = color;
  if (trimSize != null) vars['--trim-size'] = typeof trimSize === 'number' ? `${trimSize}px` : trimSize;
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    className: `th-trim th-trim--${pattern}${flip ? ' th-trim--flip' : ''}`,
    style: {
      ...vars,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { TrimBorder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/decoration/TrimBorder.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/Accordion.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Thepla House — Accordion (FAQ)
 * `items` = [{ q, a }]. Single-open by default; pass `allowMultiple`.
 * Smooth height/opacity reveal that respects reduced-motion.
 */
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = []
}) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const toggle = i => {
    setOpen(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);else next.add(i);
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid var(--color-outline-variant)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--color-surface-container)',
      overflow: 'hidden'
    }
  }, items.map((item, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: i === 0 ? 'none' : '1px solid var(--color-outline-variant)'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      "aria-expanded": isOpen,
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '18px 20px',
        minHeight: 56,
        background: isOpen ? 'var(--color-surface-container-high)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-display)',
        fontSize: '1.0625rem',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--color-headline)',
        transition: 'background-color var(--duration-fast) var(--ease-standard)'
      }
    }, item.q, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-primary)',
        color: 'var(--color-on-primary)',
        fontSize: 16,
        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform var(--duration-base) var(--ease-soft)'
      }
    }, "\uFF0B"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows var(--duration-slow) var(--ease-standard)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 20px 20px',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        lineHeight: 'var(--lh-body)',
        color: 'var(--color-on-surface-variant)'
      }
    }, item.a))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Thepla House — Input
 * Labelled text field with warm cream fill, gold focus ring, and an
 * error state. Wraps label + control + helper/error text.
 */
function Input({
  label,
  id,
  type = 'text',
  placeholder,
  helper,
  error,
  disabled = false,
  required = false,
  iconLeft = null,
  value,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const reactId = React.useId();
  const fieldId = id || reactId;
  const invalid = Boolean(error);
  const borderColor = invalid ? 'var(--color-error)' : focus ? 'var(--color-secondary-active)' : 'var(--color-outline)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: '0.875rem',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--color-on-surface)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-error)',
      marginLeft: 2
    },
    "aria-hidden": "true"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 14,
      display: 'inline-flex',
      color: 'var(--color-on-surface-variant)',
      pointerEvents: 'none'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    placeholder: placeholder,
    disabled: disabled,
    required: required,
    value: value,
    "aria-invalid": invalid || undefined,
    "aria-describedby": helper || error ? `${fieldId}-desc` : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      minHeight: 46,
      padding: iconLeft ? '12px 14px 12px 40px' : '12px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: '1rem',
      color: 'var(--color-on-surface)',
      background: disabled ? 'var(--color-surface-container-high)' : 'var(--color-surface)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      boxShadow: focus && !invalid ? 'var(--shadow-focus)' : invalid && focus ? '0 0 0 3px color-mix(in srgb, var(--color-error) 30%, transparent)' : 'none',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)'
    }
  }, rest))), (helper || error) && /*#__PURE__*/React.createElement("span", {
    id: `${fieldId}-desc`,
    style: {
      fontSize: '0.8125rem',
      color: invalid ? 'var(--color-error)' : 'var(--color-on-surface-variant)'
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Thepla House — Select
 * Native <select> styled to match Input, with a custom maroon chevron.
 */
function Select({
  label,
  id,
  options = [],
  placeholder = 'Choose…',
  helper,
  error,
  disabled = false,
  required = false,
  value,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const reactId = React.useId();
  const fieldId = id || reactId;
  const invalid = Boolean(error);
  const borderColor = invalid ? 'var(--color-error)' : focus ? 'var(--color-secondary-active)' : 'var(--color-outline)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: '0.875rem',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--color-on-surface)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-error)',
      marginLeft: 2
    },
    "aria-hidden": "true"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    disabled: disabled,
    required: required,
    value: value,
    "aria-invalid": invalid || undefined,
    "aria-describedby": helper || error ? `${fieldId}-desc` : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      minHeight: 46,
      padding: '12px 40px 12px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: '1rem',
      color: value ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
      background: disabled ? 'var(--color-surface-container-high)' : 'var(--color-surface)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      appearance: 'none',
      WebkitAppearance: 'none',
      boxShadow: focus && !invalid ? 'var(--shadow-focus)' : 'none',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)'
    }
  }, rest), /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 14,
      pointerEvents: 'none',
      color: 'var(--color-primary)',
      fontSize: 12
    }
  }, "\u25BE")), (helper || error) && /*#__PURE__*/React.createElement("span", {
    id: `${fieldId}-desc`,
    style: {
      fontSize: '0.8125rem',
      color: invalid ? 'var(--color-error)' : 'var(--color-on-surface-variant)'
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Thepla House — Textarea
 * Multiline field sharing the Input visual language.
 */
function Textarea({
  label,
  id,
  placeholder,
  helper,
  error,
  rows = 4,
  disabled = false,
  required = false,
  value,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const reactId = React.useId();
  const fieldId = id || reactId;
  const invalid = Boolean(error);
  const borderColor = invalid ? 'var(--color-error)' : focus ? 'var(--color-secondary-active)' : 'var(--color-outline)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: '0.875rem',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--color-on-surface)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-error)',
      marginLeft: 2
    },
    "aria-hidden": "true"
  }, "*")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    placeholder: placeholder,
    disabled: disabled,
    required: required,
    value: value,
    "aria-invalid": invalid || undefined,
    "aria-describedby": helper || error ? `${fieldId}-desc` : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: '12px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: '1rem',
      lineHeight: 'var(--lh-body)',
      color: 'var(--color-on-surface)',
      background: disabled ? 'var(--color-surface-container-high)' : 'var(--color-surface)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      resize: 'vertical',
      minHeight: 96,
      boxShadow: focus && !invalid ? 'var(--shadow-focus)' : invalid && focus ? '0 0 0 3px color-mix(in srgb, var(--color-error) 30%, transparent)' : 'none',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)'
    }
  }, rest)), (helper || error) && /*#__PURE__*/React.createElement("span", {
    id: `${fieldId}-desc`,
    style: {
      fontSize: '0.8125rem',
      color: invalid ? 'var(--color-error)' : 'var(--color-on-surface-variant)'
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CTABanner.jsx
try { (() => {
/**
 * Thepla House — CTABanner
 * Full-width call-to-action band. `tone` picks the warmth:
 *  - 'maroon'  : brick-maroon, gold CTA
 *  - 'gold'    : golden thepla, maroon CTA
 *  - 'green'   : deep-green, gold CTA
 * Pass `eyebrow`, `title`, `body`, primary/secondary actions.
 */
function CTABanner({
  eyebrow,
  title,
  body,
  primaryLabel = 'Order now',
  onPrimary,
  secondaryLabel,
  onSecondary,
  tone = 'maroon',
  align = 'center' // 'center' | 'split'
}) {
  const tones = {
    maroon: {
      bg: 'var(--maroon-600)',
      edge: 'var(--maroon-800)',
      fg: 'var(--cream-50)',
      eyebrow: 'var(--gold-300)',
      btnBg: 'var(--color-secondary)',
      btnFg: 'var(--ink-900)',
      btn2Border: 'var(--cream-100)',
      btn2Fg: 'var(--cream-50)'
    },
    gold: {
      bg: 'var(--gold-400)',
      edge: 'var(--gold-600)',
      fg: 'var(--ink-900)',
      eyebrow: 'var(--maroon-700)',
      btnBg: 'var(--color-primary)',
      btnFg: 'var(--cream-50)',
      btn2Border: 'var(--maroon-700)',
      btn2Fg: 'var(--maroon-800)'
    },
    green: {
      bg: 'var(--green-700)',
      edge: 'var(--green-900)',
      fg: 'var(--cream-50)',
      eyebrow: 'var(--gold-300)',
      btnBg: 'var(--color-secondary)',
      btnFg: 'var(--ink-900)',
      btn2Border: 'var(--cream-100)',
      btn2Fg: 'var(--cream-50)'
    }
  };
  const t = tones[tone] || tones.maroon;
  const split = align === 'split';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${t.bg}, ${t.edge})`,
      borderRadius: 'var(--radius-2xl)',
      padding: 'clamp(28px, 5vw, 56px)',
      color: t.fg,
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -60,
      top: -60,
      width: 220,
      height: 220,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.18), transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: split ? 'row' : 'column',
      alignItems: split ? 'center' : 'center',
      justifyContent: split ? 'space-between' : 'center',
      textAlign: split ? 'left' : 'center',
      gap: 24,
      flexWrap: 'wrap',
      maxWidth: split ? 'none' : '40ch',
      margin: split ? 0 : '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: t.eyebrow,
      marginBottom: 10
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      color: t.fg,
      margin: '0 0 10px',
      fontSize: 'clamp(1.6rem, 1rem + 2.4vw, 2.4rem)',
      lineHeight: 1.12,
      fontWeight: 'var(--fw-semibold)'
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: t.fg,
      opacity: 0.92,
      fontSize: '1.0625rem',
      lineHeight: 'var(--lh-body)',
      maxWidth: '46ch'
    }
  }, body)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onPrimary,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minHeight: 50,
      padding: '14px 26px',
      fontFamily: 'var(--font-body)',
      fontSize: '1rem',
      fontWeight: 'var(--fw-bold)',
      color: t.btnFg,
      background: t.btnBg,
      border: 'none',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-md)'
    }
  }, primaryLabel), secondaryLabel && /*#__PURE__*/React.createElement("button", {
    onClick: onSecondary,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 50,
      padding: '14px 24px',
      fontFamily: 'var(--font-body)',
      fontSize: '1rem',
      fontWeight: 'var(--fw-semibold)',
      color: t.btn2Fg,
      background: 'transparent',
      border: `1.5px solid ${t.btn2Border}`,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer'
    }
  }, secondaryLabel))));
}
Object.assign(__ds_scope, { CTABanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CTABanner.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/**
 * Thepla House — Footer
 * Deep-green footer with brand lockup, link columns, and a warm baseline.
 * Pass `logoSrc`, `columns` ([{ title, links:[{label,href}] }]) and `socials`.
 */
function Footer({
  logoSrc,
  brand = 'Thepla House',
  tagline = 'Junk the Junk Food.',
  columns = [],
  socials = [],
  note = '© 2026 Thepla House by Tejal’s Kitchen. Made in Mumbai since 2018.'
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--green-800)',
      color: 'var(--cream-100)',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '56px 20px 28px',
      display: 'grid',
      gridTemplateColumns: 'minmax(220px, 1.4fr) repeat(auto-fit, minmax(140px, 1fr))',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: brand,
    style: {
      height: 64,
      width: 'auto',
      filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.25))'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.4rem',
      fontWeight: 700,
      color: 'var(--gold-300)'
    }
  }, brand)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-script)',
      fontSize: '1.6rem',
      lineHeight: 1.1,
      color: 'var(--gold-300)',
      margin: '0 0 10px'
    }
  }, tagline), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--green-200)',
      maxWidth: '34ch',
      fontSize: '0.9rem'
    }
  }, "100% whole wheat. No maida, no palm oil, no preservatives. Jain & vegan options.")), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.75rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--gold-300)',
      margin: '0 0 14px',
      fontWeight: 700
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, col.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.label
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href || '#',
    style: {
      color: 'var(--cream-200)',
      textDecoration: 'none',
      fontSize: '0.9rem'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--white)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--cream-200)'
  }, l.label))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--green-700)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '18px 20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green-200)',
      fontSize: '0.8125rem'
    }
  }, note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, socials.map(sname => /*#__PURE__*/React.createElement("span", {
    key: sname,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-full)',
      background: 'var(--green-700)',
      color: 'var(--gold-300)',
      fontSize: 13,
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  }, String(sname).slice(0, 2)))))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Thepla House — Navbar
 * Responsive top navigation. Desktop: logo + inline links + CTA.
 * Mobile (<768px via the `compact` prop or container query fallback):
 * collapses links into a hamburger sheet.
 *
 * Pass `logoSrc` (relative path to the logo PNG) and `links`.
 */
function Navbar({
  logoSrc,
  brand = "Thepla House",
  links = [],
  ctaLabel = 'Order now',
  onCta,
  compact = false
}) {
  const [open, setOpen] = useState(false);
  const linkStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    fontWeight: 'var(--fw-semibold)',
    color: 'var(--color-on-surface)',
    textDecoration: 'none',
    padding: '8px 4px',
    transition: 'var(--transition-colors)'
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'relative',
      background: 'color-mix(in srgb, var(--color-surface) 88%, transparent)',
      backdropFilter: 'saturate(140%) blur(8px)',
      WebkitBackdropFilter: 'saturate(140%) blur(8px)',
      borderBottom: '1px solid var(--color-outline-variant)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '10px 20px',
      maxWidth: 'var(--container-xl)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: brand,
    style: {
      height: 44,
      width: 'auto',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.25rem',
      color: 'var(--color-headline)'
    }
  }, brand)), !compact && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || '#',
    style: {
      ...linkStyle,
      color: l.active ? 'var(--color-primary)' : linkStyle.color
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--color-primary)',
    onMouseLeave: e => e.currentTarget.style.color = l.active ? 'var(--color-primary)' : 'var(--color-on-surface)'
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, !compact && /*#__PURE__*/React.createElement("button", {
    onClick: onCta,
    style: ctaStyle()
  }, ctaLabel), compact && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Menu",
    "aria-expanded": open,
    onClick: () => setOpen(o => !o),
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 4,
      justifyContent: 'center',
      width: 44,
      height: 44,
      padding: 10,
      background: 'transparent',
      border: '1.5px solid var(--color-outline)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      height: 2,
      borderRadius: 2,
      background: 'var(--color-primary)',
      transition: 'transform var(--duration-base) var(--ease-soft), opacity var(--duration-fast)',
      transform: open ? i === 0 ? 'translateY(6px) rotate(45deg)' : i === 2 ? 'translateY(-6px) rotate(-45deg)' : 'none' : 'none',
      opacity: open && i === 1 ? 0 : 1
    }
  }))))), compact && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      transition: 'grid-template-rows var(--duration-slow) var(--ease-standard)',
      borderTop: open ? '1px solid var(--color-outline-variant)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 20px 20px',
      gap: 2
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || '#',
    style: {
      ...linkStyle,
      padding: '14px 8px',
      minHeight: 48,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid var(--color-outline-variant)',
      color: l.active ? 'var(--color-primary)' : 'var(--color-on-surface)'
    }
  }, l.label)), /*#__PURE__*/React.createElement("button", {
    onClick: onCta,
    style: {
      ...ctaStyle(),
      marginTop: 12,
      width: '100%'
    }
  }, ctaLabel)))));
}
function ctaStyle() {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    padding: '10px 20px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    fontWeight: 'var(--fw-semibold)',
    color: 'var(--color-on-primary)',
    background: 'var(--color-primary)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-sm)',
    transition: 'background-color var(--duration-fast) var(--ease-standard)'
  };
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Thepla House — Tabs
 * Underline tab bar. Controlled or uncontrolled. The active tab shows a
 * gold underline that slides; tabs are keyboard-navigable buttons.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  fitted = false
}) {
  const [internal, setInternal] = useState(defaultValue ?? (tabs[0] && tabs[0].id));
  const active = value !== undefined ? value : internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: fitted ? 0 : 4,
      borderBottom: '1.5px solid var(--color-outline-variant)',
      overflowX: 'auto'
    }
  }, tabs.map(t => {
    const isActive = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      role: "tab",
      "aria-selected": isActive,
      onClick: () => select(t.id),
      style: {
        flex: fitted ? 1 : 'initial',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        padding: '12px 16px',
        minHeight: 48,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: '0.9375rem',
        fontWeight: isActive ? 'var(--fw-bold)' : 'var(--fw-medium)',
        color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
        whiteSpace: 'nowrap',
        transition: 'color var(--duration-fast) var(--ease-standard)'
      }
    }, t.icon && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, t.icon), t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.6875rem',
        fontWeight: 700,
        padding: '1px 7px',
        borderRadius: 'var(--radius-pill)',
        background: isActive ? 'var(--maroon-100)' : 'var(--cream-200)',
        color: isActive ? 'var(--maroon-700)' : 'var(--color-on-surface-variant)'
      }
    }, t.count), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: -1.5,
        height: 3,
        borderRadius: '3px 3px 0 0',
        background: 'var(--color-secondary)',
        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'center',
        transition: 'transform var(--duration-base) var(--ease-soft)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Thepla House — Card
 * Warm content container. `interactive` adds a hover lift; compose freely
 * with CardMedia / CardBody or pass children. Includes a ready-made
 * `product` layout for menu items.
 */
function Card({
  children,
  interactive = false,
  padding = 'md',
  // 'none' | 'sm' | 'md' | 'lg'
  elevation = 'sm',
  // 'none' | 'xs' | 'sm' | 'md'
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const shadows = {
    none: 'none',
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: 'var(--color-surface-container)',
      border: '1px solid var(--color-outline-variant)',
      borderRadius: 'var(--radius-xl)',
      padding: pads[padding],
      boxShadow: hover ? 'var(--shadow-lg)' : shadows[elevation],
      overflow: 'hidden',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--duration-base) var(--ease-soft), box-shadow var(--duration-base) var(--ease-standard)',
      cursor: interactive ? 'pointer' : 'default'
    }
  }, rest), children);
}

/** Image area for a Card. Pass `src`, or children for a placeholder. */
function CardMedia({
  src,
  alt = '',
  height = 180,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      margin: 'calc(-1 * var(--space-6)) calc(-1 * var(--space-6)) var(--space-5)',
      height,
      background: src ? `center/cover no-repeat url(${src})` : 'linear-gradient(135deg, var(--gold-200), var(--gold-100))',
      display: 'flex',
      alignItems: 'flex-end',
      ...rest.style
    }
  }, rest), !src && children, src && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0
    }
  }));
}
Object.assign(__ds_scope, { Card, CardMedia });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// style-guide-components.jsx
try { (() => {
/* Style-guide component showcases — mounts real DS components in all states.
   Loaded as text/babel after React + _ds_bundle.js. */
(function () {
  const NS = window.TheplaHouseDesignSystem_2c40d5 || {};
  const {
    Button,
    TextLink,
    Input,
    Select,
    Textarea,
    Badge,
    DietTag,
    Card,
    CardMedia,
    Accordion,
    Navbar,
    Tabs,
    Footer,
    CTABanner
  } = NS;
  const LOGO = "assets/logo/theplahouse-logo.png";
  const Label = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--color-on-surface-variant)',
      margin: '0 0 12px'
    }
  }, children);
  const Block = ({
    title,
    children,
    full
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 40,
      gridColumn: full ? '1 / -1' : 'auto'
    }
  }, /*#__PURE__*/React.createElement(Label, null, title), children);
  const Row = ({
    children,
    style
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      alignItems: 'center',
      ...style
    }
  }, children);
  const Frame = ({
    children,
    max,
    pad = true,
    label
  }) => /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--color-on-surface-variant)',
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: max,
      border: '1px solid var(--color-outline-variant)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'var(--color-surface)',
      boxShadow: 'var(--shadow-sm)',
      padding: pad ? 0 : 0
    }
  }, children));
  function Components() {
    if (!Button) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 24,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-error)'
        }
      }, "Components bundle not loaded yet \u2014 reload after the system compiles.");
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Block, {
      title: "Buttons \u2014 variants \xD7 states"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 22
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: subLbl
    }, "Primary \xB7 default / hover / active / focus / disabled"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Button, {
      variant: "primary"
    }, "Order now"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      style: {
        background: 'var(--color-primary-hover)',
        transform: 'translateY(-1px)',
        boxShadow: 'var(--shadow-md)'
      }
    }, "Hover"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      style: {
        background: 'var(--color-primary-active)',
        transform: 'translateY(1px)'
      }
    }, "Active"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      style: {
        boxShadow: 'var(--shadow-sm), var(--shadow-focus)'
      }
    }, "Focus"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      disabled: true
    }, "Sold out"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: subLbl
    }, "Secondary (gold) \xB7 Ghost"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary"
    }, "Vegan menu"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      disabled: true
    }, "Disabled"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost"
    }, "View all"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      disabled: true
    }, "Disabled"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: subLbl
    }, "Sizes \xB7 with icons \xB7 full width"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm"
    }, "Small 36px"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "md",
      iconLeft: "\uFF0B"
    }, "Medium 44px"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      iconRight: "\u2192"
    }, "Large 52px")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 320,
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      fullWidth: true
    }, "Add to cart \xB7 \u20B9180"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: subLbl
    }, "Links"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(TextLink, {
      href: "#",
      arrow: true
    }, "See the full menu"), /*#__PURE__*/React.createElement(TextLink, {
      href: "#"
    }, "Our story"), /*#__PURE__*/React.createElement(TextLink, {
      href: "#",
      variant: "quiet"
    }, "Quiet link"))))), /*#__PURE__*/React.createElement(Block, {
      title: "Form fields \u2014 default / focus / error / disabled"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 20,
        maxWidth: 760
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Your name",
      placeholder: "Tejal Shah"
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Pickup location",
      options: ['Bandra', 'Andheri', 'Powai'],
      placeholder: "Choose a kitchen"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Email",
      type: "email",
      defaultValue: "not-an-email",
      error: "Enter a valid email address"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Phone (disabled)",
      placeholder: "+91",
      disabled: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Textarea, {
      label: "Special requests",
      helper: "Jain? Less oil? Extra theplas? Tell us.",
      rows: 3
    })))), /*#__PURE__*/React.createElement(Block, {
      title: "Badges & diet tags"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: subLbl
    }, "Diet & menu tags"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(DietTag, {
      type: "jain"
    }), /*#__PURE__*/React.createElement(DietTag, {
      type: "vegan"
    }), /*#__PURE__*/React.createElement(DietTag, {
      type: "bestseller"
    }), /*#__PURE__*/React.createElement(DietTag, {
      type: "wholewheat"
    }), /*#__PURE__*/React.createElement(DietTag, {
      type: "nopalm"
    }), /*#__PURE__*/React.createElement(DietTag, {
      type: "spicy"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: subLbl
    }, "Status badges \u2014 soft / solid / outline"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "primary"
    }, "Limited"), /*#__PURE__*/React.createElement(Badge, {
      tone: "green"
    }, "Fresh"), /*#__PURE__*/React.createElement(Badge, {
      tone: "gold"
    }, "New"), /*#__PURE__*/React.createElement(Badge, {
      tone: "success"
    }, "In stock"), /*#__PURE__*/React.createElement(Badge, {
      tone: "warning"
    }, "Low"), /*#__PURE__*/React.createElement(Badge, {
      tone: "error"
    }, "Sold out"), /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      variant: "solid"
    }, "Chef's pick"), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      variant: "outline"
    }, "Veg"))))), /*#__PURE__*/React.createElement(Block, {
      title: "Cards"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 280px))',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement(Card, {
      interactive: true
    }, /*#__PURE__*/React.createElement(CardMedia, {
      height: 140
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 12px'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      variant: "solid"
    }, "Chef's pick"))), /*#__PURE__*/React.createElement(Row, {
      style: {
        gap: 6,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement(DietTag, {
      type: "vegan",
      size: "sm"
    }), /*#__PURE__*/React.createElement(DietTag, {
      type: "bestseller",
      size: "sm"
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: '0 0 4px'
      }
    }, "Methi Thepla \xB7 6 pcs"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '0 0 14px',
        color: 'var(--color-on-surface-variant)',
        fontSize: '.9rem'
      }
    }, "Whole-wheat, fenugreek-spiced, no palm oil."), /*#__PURE__*/React.createElement(Row, {
      style: {
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '1.4rem',
        color: 'var(--color-headline)',
        fontWeight: 600
      }
    }, "\u20B9180"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      iconLeft: "\uFF0B"
    }, "Add"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: '0 0 6px'
      }
    }, "Why whole wheat?"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        color: 'var(--color-on-surface-variant)'
      }
    }, "No maida, ever. More fibre, slower energy, and the nutty taste of real atta.")))), /*#__PURE__*/React.createElement(Block, {
      title: "Navbar \u2014 desktop & mobile (hamburger)",
      full: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Frame, {
      label: "Desktop \u2265768px"
    }, /*#__PURE__*/React.createElement(Navbar, {
      logoSrc: LOGO,
      links: navLinks,
      ctaLabel: "Order now"
    })), /*#__PURE__*/React.createElement(Frame, {
      label: "Mobile <768px \u2014 tap \u2630",
      max: 380
    }, /*#__PURE__*/React.createElement(Navbar, {
      logoSrc: LOGO,
      links: navLinks,
      ctaLabel: "Order",
      compact: true
    })))), /*#__PURE__*/React.createElement(Block, {
      title: "Tabs"
    }, /*#__PURE__*/React.createElement(Frame, {
      pad: false
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 16px'
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      tabs: [{
        id: 'all',
        label: 'All'
      }, {
        id: 'jain',
        label: 'Jain',
        count: 12
      }, {
        id: 'vegan',
        label: 'Vegan',
        count: 8
      }, {
        id: 'best',
        label: 'Best-sellers'
      }],
      defaultValue: "all"
    })))), /*#__PURE__*/React.createElement(Block, {
      title: "Accordion (FAQ)"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 720
      }
    }, /*#__PURE__*/React.createElement(Accordion, {
      defaultOpen: [0],
      items: [{
        q: 'Is everything really 100% whole wheat?',
        a: 'Yes. Whole-wheat atta only — never maida. More fibre, slower energy, real nutty flavour.'
      }, {
        q: 'Do you have Jain and vegan options?',
        a: 'Plenty of both. Look for the Jain and Vegan tags on every menu item.'
      }, {
        q: 'How fresh is the food?',
        a: 'Rolled and cooked the same morning in Tejal\u2019s kitchen. No preservatives, no palm oil.'
      }]
    }))), /*#__PURE__*/React.createElement(Block, {
      title: "CTA banner \u2014 colourways & layout",
      full: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(CTABanner, {
      tone: "maroon",
      align: "split",
      eyebrow: "Junk the Junk Food",
      title: "Real ghar ka khana, delivered hot.",
      body: "Whole-wheat, no palm oil, no preservatives. Order before 11am.",
      primaryLabel: "Order now",
      secondaryLabel: "See the menu"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(CTABanner, {
      tone: "gold",
      title: "Catering for 10 to 500",
      body: "Office lunches, pujas, weddings.",
      primaryLabel: "Plan an order"
    }), /*#__PURE__*/React.createElement(CTABanner, {
      tone: "green",
      title: "New: vegan thali",
      body: "Three sabzis, dal, rice, two theplas.",
      primaryLabel: "Try it"
    })))), /*#__PURE__*/React.createElement(Block, {
      title: "Footer",
      full: true
    }, /*#__PURE__*/React.createElement(Frame, null, /*#__PURE__*/React.createElement(Footer, {
      logoSrc: LOGO,
      columns: [{
        title: 'Menu',
        links: [{
          label: 'Theplas'
        }, {
          label: 'Thalis'
        }, {
          label: 'Snacks'
        }, {
          label: 'Sweets'
        }]
      }, {
        title: 'Company',
        links: [{
          label: 'Our Story'
        }, {
          label: 'Outlets'
        }, {
          label: 'Careers'
        }]
      }, {
        title: 'Help',
        links: [{
          label: 'FAQ'
        }, {
          label: 'Contact'
        }, {
          label: 'Track order'
        }]
      }],
      socials: ['Instagram', 'WhatsApp', 'Zomato']
    }))));
  }
  const subLbl = {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--color-on-surface-variant)',
    marginBottom: 10
  };
  const navLinks = [{
    label: 'Menu',
    active: true
  }, {
    label: 'Our Story'
  }, {
    label: 'Outlets'
  }, {
    label: 'Catering'
  }];
  const root = document.getElementById('components-root');
  if (root) ReactDOM.createRoot(root).render(/*#__PURE__*/React.createElement(Components, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "style-guide-components.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.DietTag = __ds_scope.DietTag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.TrimBorder = __ds_scope.TrimBorder;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.CTABanner = __ds_scope.CTABanner;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardMedia = __ds_scope.CardMedia;

})();
