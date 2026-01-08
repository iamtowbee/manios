(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.TanGui = {}));
})(this, function(exports2) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  const tokens = {
    /**
     * Color palette - pixel art game optimized
     */
    colors: {
      // Brand colors
      primary: "#FFD700",
      primaryDark: "#CC9900",
      primaryLight: "#FFED4E",
      secondary: "#667EEA",
      secondaryDark: "#4C63D2",
      secondaryLight: "#8094F0",
      accent: "#E91E63",
      accentDark: "#C2185B",
      accentLight: "#F06292",
      // Backgrounds
      background: "#1A1A2E",
      backgroundLight: "#2D3561",
      backgroundDark: "#0F0F1E",
      surface: "#16213E",
      surfaceLight: "#1F2F4E",
      surfaceDark: "#0D1628",
      // Text
      text: "#FFFFFF",
      textSecondary: "#B8C1EC",
      textMuted: "#6B7CB8",
      textDisabled: "#4A5578",
      textInverse: "#1A1A2E",
      // Semantic colors
      success: "#2ECC71",
      successDark: "#27AE60",
      successLight: "#58D68D",
      warning: "#F39C12",
      warningDark: "#E67E22",
      warningLight: "#F8C471",
      error: "#E74C3C",
      errorDark: "#C0392B",
      errorLight: "#EC7063",
      info: "#3498DB",
      infoDark: "#2980B9",
      infoLight: "#5DADE2",
      // Grayscale
      black: "#000000",
      white: "#FFFFFF",
      gray100: "#F5F5F5",
      gray200: "#E5E5E5",
      gray300: "#D4D4D4",
      gray400: "#A3A3A3",
      gray500: "#737373",
      gray600: "#525252",
      gray700: "#404040",
      gray800: "#262626",
      gray900: "#171717",
      // Special
      transparent: "transparent",
      overlay: "rgba(0, 0, 0, 0.7)",
      overlayLight: "rgba(0, 0, 0, 0.5)",
      overlayDark: "rgba(0, 0, 0, 0.85)",
      // Game-specific
      healthGreen: "#2ECC71",
      healthYellow: "#F39C12",
      healthRed: "#E74C3C",
      manaBlue: "#3498DB",
      expPurple: "#9B59B6",
      goldYellow: "#FFD700"
    },
    /**
     * Spacing scale - 4px base unit
     */
    space: {
      0: "0px",
      0.5: "2px",
      1: "4px",
      1.5: "6px",
      2: "8px",
      2.5: "10px",
      3: "12px",
      3.5: "14px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      14: "56px",
      16: "64px",
      20: "80px",
      24: "96px",
      28: "112px",
      32: "128px",
      36: "144px",
      40: "160px",
      44: "176px",
      48: "192px",
      52: "208px",
      56: "224px",
      60: "240px",
      64: "256px"
    },
    /**
     * Size scale
     */
    sizes: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      10: "40px",
      12: "48px",
      14: "56px",
      16: "64px",
      20: "80px",
      24: "96px",
      28: "112px",
      32: "128px",
      36: "144px",
      40: "160px",
      44: "176px",
      48: "192px",
      52: "208px",
      56: "224px",
      60: "240px",
      64: "256px",
      72: "288px",
      80: "320px",
      96: "384px",
      full: "100%",
      screen: "100vh",
      screenW: "100vw",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    },
    /**
     * Font families
     */
    fonts: {
      body: '"Press Start 2P", "Courier New", monospace',
      heading: '"Press Start 2P", "Courier New", monospace',
      mono: '"Courier New", "Consolas", monospace',
      pixel: '"Press Start 2P", monospace',
      system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    /**
     * Font sizes - pixel font optimized
     */
    fontSizes: {
      xs: "8px",
      sm: "10px",
      md: "12px",
      base: "14px",
      lg: "16px",
      xl: "18px",
      "2xl": "20px",
      "3xl": "24px",
      "4xl": "30px",
      "5xl": "36px",
      "6xl": "48px",
      "7xl": "60px",
      "8xl": "72px"
    },
    /**
     * Font weights
     */
    fontWeights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    /**
     * Line heights
     */
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
      "3": 0.75,
      "4": 1,
      "5": 1.25,
      "6": 1.5,
      "7": 1.75,
      "8": 2,
      "9": 2.25,
      "10": 2.5
    },
    /**
     * Letter spacings
     */
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em"
    },
    /**
     * Border radii - pixel art style
     */
    radii: {
      none: "0px",
      sm: "2px",
      md: "4px",
      lg: "8px",
      xl: "12px",
      "2xl": "16px",
      "3xl": "24px",
      full: "9999px",
      square: "0px"
    },
    /**
     * Shadows - pixel art optimized
     */
    shadows: {
      none: "none",
      sm: "2px 2px 0px rgba(0, 0, 0, 0.5)",
      md: "4px 4px 0px rgba(0, 0, 0, 0.5)",
      lg: "6px 6px 0px rgba(0, 0, 0, 0.6)",
      xl: "8px 8px 0px rgba(0, 0, 0, 0.7)",
      "2xl": "12px 12px 0px rgba(0, 0, 0, 0.7)",
      inner: "inset 2px 2px 4px rgba(0, 0, 0, 0.4)",
      outline: "0 0 0 3px rgba(255, 215, 0, 0.5)",
      glow: "0 0 10px currentColor",
      glowLg: "0 0 20px currentColor",
      glowXl: "0 0 30px currentColor",
      // Colored glows for game effects
      glowPrimary: "0 0 15px rgba(255, 215, 0, 0.8)",
      glowSuccess: "0 0 15px rgba(46, 204, 113, 0.8)",
      glowError: "0 0 15px rgba(231, 76, 60, 0.8)",
      glowInfo: "0 0 15px rgba(52, 152, 219, 0.8)"
    },
    /**
     * Z-index scale
     */
    zIndices: {
      hide: -1,
      auto: 0,
      base: 0,
      docked: 10,
      dropdown: 1e3,
      sticky: 1100,
      banner: 1200,
      overlay: 1300,
      modal: 1400,
      popover: 1500,
      skipLink: 1600,
      toast: 1700,
      tooltip: 1800
    },
    /**
     * Transitions - game-optimized timing
     */
    transitions: {
      fast: "all 0.1s ease",
      base: "all 0.15s ease",
      normal: "all 0.2s ease",
      slow: "all 0.3s ease",
      slower: "all 0.5s ease",
      // Specific transitions
      fadeIn: "opacity 0.2s ease-in",
      fadeOut: "opacity 0.2s ease-out",
      slideIn: "transform 0.3s ease-out",
      slideOut: "transform 0.3s ease-in",
      scaleIn: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      scaleOut: "transform 0.2s ease-in"
    }
  };
  function getToken(category, key) {
    return tokens[category][key];
  }
  function resolveToken(category, value) {
    if (typeof value === "string" && value in tokens[category]) {
      return tokens[category][value];
    }
    return value;
  }
  function generateCSSVariables() {
    const vars = [];
    Object.entries(tokens.colors).forEach(([key, value]) => {
      vars.push(`--tangui-color-${key}: ${value};`);
    });
    Object.entries(tokens.space).forEach(([key, value]) => {
      vars.push(`--tangui-space-${key}: ${value};`);
    });
    Object.entries(tokens.fontSizes).forEach(([key, value]) => {
      vars.push(`--tangui-fontSize-${key}: ${value};`);
    });
    Object.entries(tokens.radii).forEach(([key, value]) => {
      vars.push(`--tangui-radius-${key}: ${value};`);
    });
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      vars.push(`--tangui-shadow-${key}: ${value};`);
    });
    return `:root {
  ${vars.join("\n  ")}
}`;
  }
  function injectTokens() {
    const style = document.createElement("style");
    style.textContent = generateCSSVariables();
    document.head.appendChild(style);
  }
  function expandSpacingProps(props) {
    const expanded = { ...props };
    if (props.paddingX !== void 0) {
      expanded.paddingLeft = props.paddingX;
      expanded.paddingRight = props.paddingX;
      delete expanded.paddingX;
    }
    if (props.paddingY !== void 0) {
      expanded.paddingTop = props.paddingY;
      expanded.paddingBottom = props.paddingY;
      delete expanded.paddingY;
    }
    if (props.marginX !== void 0) {
      expanded.marginLeft = props.marginX;
      expanded.marginRight = props.marginX;
      delete expanded.marginX;
    }
    if (props.marginY !== void 0) {
      expanded.marginTop = props.marginY;
      expanded.marginBottom = props.marginY;
      delete expanded.marginY;
    }
    return expanded;
  }
  function resolveSpacing(value) {
    if (typeof value === "number") {
      return `${value}px`;
    }
    const resolved = resolveToken("space", value);
    if (resolved !== value) {
      return resolved;
    }
    return value;
  }
  function resolveSize(value) {
    if (typeof value === "number") {
      return `${value}px`;
    }
    if (value === "auto") return "auto";
    if (value === "full") return "100%";
    const resolved = resolveToken("sizes", value);
    if (resolved !== value) {
      return resolved;
    }
    return value;
  }
  function resolveColor(value) {
    const resolved = resolveToken("colors", value);
    if (resolved !== value) {
      return resolved;
    }
    return value;
  }
  function resolveRadius(value) {
    if (typeof value === "number") {
      return `${value}px`;
    }
    const resolved = resolveToken("radii", value);
    if (resolved !== value) {
      return resolved;
    }
    return value;
  }
  function resolveZIndex(value) {
    if (typeof value === "number") {
      return value;
    }
    const resolved = resolveToken("zIndices", value);
    if (resolved !== value) {
      return resolved;
    }
    return value;
  }
  function resolveShadow(value) {
    const resolved = resolveToken("shadows", value);
    if (resolved !== value) {
      return resolved;
    }
    return value;
  }
  function resolveTransition(value) {
    const resolved = resolveToken("transitions", value);
    if (resolved !== value) {
      return resolved;
    }
    return value;
  }
  function propsToStyle(props) {
    const expanded = expandSpacingProps(props);
    const style = {};
    if (expanded.display) style.display = expanded.display;
    if (expanded.position) style.position = expanded.position;
    if (expanded.top !== void 0) style.top = resolveSpacing(expanded.top);
    if (expanded.right !== void 0) style.right = resolveSpacing(expanded.right);
    if (expanded.bottom !== void 0) style.bottom = resolveSpacing(expanded.bottom);
    if (expanded.left !== void 0) style.left = resolveSpacing(expanded.left);
    if (expanded.zIndex !== void 0) style.zIndex = resolveZIndex(expanded.zIndex);
    if (expanded.flexDirection) style.flexDirection = expanded.flexDirection;
    if (expanded.justifyContent) style.justifyContent = expanded.justifyContent;
    if (expanded.alignItems) style.alignItems = expanded.alignItems;
    if (expanded.alignSelf) style.alignSelf = expanded.alignSelf;
    if (expanded.flex !== void 0) style.flex = expanded.flex;
    if (expanded.flexGrow !== void 0) style.flexGrow = expanded.flexGrow;
    if (expanded.flexShrink !== void 0) style.flexShrink = expanded.flexShrink;
    if (expanded.flexBasis !== void 0) style.flexBasis = resolveSize(expanded.flexBasis);
    if (expanded.flexWrap) style.flexWrap = expanded.flexWrap;
    if (expanded.gap !== void 0) style.gap = resolveSpacing(expanded.gap);
    if (expanded.rowGap !== void 0) style.rowGap = resolveSpacing(expanded.rowGap);
    if (expanded.columnGap !== void 0) style.columnGap = resolveSpacing(expanded.columnGap);
    if (expanded.gridTemplateColumns) style.gridTemplateColumns = expanded.gridTemplateColumns;
    if (expanded.gridTemplateRows) style.gridTemplateRows = expanded.gridTemplateRows;
    if (expanded.gridColumn) style.gridColumn = expanded.gridColumn;
    if (expanded.gridRow) style.gridRow = expanded.gridRow;
    if (expanded.gridArea) style.gridArea = expanded.gridArea;
    if (expanded.gridAutoFlow) style.gridAutoFlow = expanded.gridAutoFlow;
    if (expanded.width !== void 0) style.width = resolveSize(expanded.width);
    if (expanded.height !== void 0) style.height = resolveSize(expanded.height);
    if (expanded.minWidth !== void 0) style.minWidth = resolveSize(expanded.minWidth);
    if (expanded.maxWidth !== void 0) style.maxWidth = resolveSize(expanded.maxWidth);
    if (expanded.minHeight !== void 0) style.minHeight = resolveSize(expanded.minHeight);
    if (expanded.maxHeight !== void 0) style.maxHeight = resolveSize(expanded.maxHeight);
    if (expanded.padding !== void 0) style.padding = resolveSpacing(expanded.padding);
    if (expanded.paddingTop !== void 0) style.paddingTop = resolveSpacing(expanded.paddingTop);
    if (expanded.paddingRight !== void 0) style.paddingRight = resolveSpacing(expanded.paddingRight);
    if (expanded.paddingBottom !== void 0) style.paddingBottom = resolveSpacing(expanded.paddingBottom);
    if (expanded.paddingLeft !== void 0) style.paddingLeft = resolveSpacing(expanded.paddingLeft);
    if (expanded.margin !== void 0) style.margin = resolveSpacing(expanded.margin);
    if (expanded.marginTop !== void 0) style.marginTop = resolveSpacing(expanded.marginTop);
    if (expanded.marginRight !== void 0) style.marginRight = resolveSpacing(expanded.marginRight);
    if (expanded.marginBottom !== void 0) style.marginBottom = resolveSpacing(expanded.marginBottom);
    if (expanded.marginLeft !== void 0) style.marginLeft = resolveSpacing(expanded.marginLeft);
    if (expanded.backgroundColor) style.backgroundColor = resolveColor(expanded.backgroundColor);
    if (expanded.backgroundImage) style.backgroundImage = expanded.backgroundImage;
    if (expanded.backgroundSize) style.backgroundSize = expanded.backgroundSize;
    if (expanded.backgroundPosition) style.backgroundPosition = expanded.backgroundPosition;
    if (expanded.backgroundRepeat) style.backgroundRepeat = expanded.backgroundRepeat;
    if (expanded.backgroundAttachment) style.backgroundAttachment = expanded.backgroundAttachment;
    if (expanded.border) style.border = expanded.border;
    if (expanded.borderWidth !== void 0) {
      style.borderWidth = typeof expanded.borderWidth === "number" ? `${expanded.borderWidth}px` : expanded.borderWidth;
    }
    if (expanded.borderStyle) style.borderStyle = expanded.borderStyle;
    if (expanded.borderColor) style.borderColor = resolveColor(expanded.borderColor);
    if (expanded.borderRadius !== void 0) style.borderRadius = resolveRadius(expanded.borderRadius);
    if (expanded.borderTop) style.borderTop = expanded.borderTop;
    if (expanded.borderRight) style.borderRight = expanded.borderRight;
    if (expanded.borderBottom) style.borderBottom = expanded.borderBottom;
    if (expanded.borderLeft) style.borderLeft = expanded.borderLeft;
    if (expanded.borderTopWidth !== void 0) {
      style.borderTopWidth = typeof expanded.borderTopWidth === "number" ? `${expanded.borderTopWidth}px` : expanded.borderTopWidth;
    }
    if (expanded.borderRightWidth !== void 0) {
      style.borderRightWidth = typeof expanded.borderRightWidth === "number" ? `${expanded.borderRightWidth}px` : expanded.borderRightWidth;
    }
    if (expanded.borderBottomWidth !== void 0) {
      style.borderBottomWidth = typeof expanded.borderBottomWidth === "number" ? `${expanded.borderBottomWidth}px` : expanded.borderBottomWidth;
    }
    if (expanded.borderLeftWidth !== void 0) {
      style.borderLeftWidth = typeof expanded.borderLeftWidth === "number" ? `${expanded.borderLeftWidth}px` : expanded.borderLeftWidth;
    }
    if (expanded.opacity !== void 0) style.opacity = expanded.opacity;
    if (expanded.boxShadow) style.boxShadow = resolveShadow(expanded.boxShadow);
    if (expanded.overflow) style.overflow = expanded.overflow;
    if (expanded.overflowX) style.overflowX = expanded.overflowX;
    if (expanded.overflowY) style.overflowY = expanded.overflowY;
    if (expanded.cursor) style.cursor = expanded.cursor;
    if (expanded.pointerEvents) style.pointerEvents = expanded.pointerEvents;
    if (expanded.userSelect) style.userSelect = expanded.userSelect;
    if (expanded.visibility) style.visibility = expanded.visibility;
    if (expanded.transform) style.transform = expanded.transform;
    if (expanded.transformOrigin) style.transformOrigin = expanded.transformOrigin;
    if (expanded.scale !== void 0) style.transform = `scale(${expanded.scale})`;
    if (expanded.rotate) style.transform = `rotate(${expanded.rotate})`;
    if (expanded.translateX) {
      const current = style.transform || "";
      style.transform = `${current} translateX(${expanded.translateX})`.trim();
    }
    if (expanded.translateY) {
      const current = style.transform || "";
      style.transform = `${current} translateY(${expanded.translateY})`.trim();
    }
    if (expanded.transition) style.transition = resolveTransition(expanded.transition);
    if (expanded.transitionProperty) style.transitionProperty = expanded.transitionProperty;
    if (expanded.transitionDuration) style.transitionDuration = expanded.transitionDuration;
    if (expanded.transitionTimingFunction) style.transitionTimingFunction = expanded.transitionTimingFunction;
    if (expanded.transitionDelay) style.transitionDelay = expanded.transitionDelay;
    if (expanded.animation) style.animation = expanded.animation;
    if (expanded.animationName) style.animationName = expanded.animationName;
    if (expanded.animationDuration) style.animationDuration = expanded.animationDuration;
    if (expanded.animationTimingFunction) style.animationTimingFunction = expanded.animationTimingFunction;
    if (expanded.animationDelay) style.animationDelay = expanded.animationDelay;
    if (expanded.animationIterationCount !== void 0) {
      style.animationIterationCount = expanded.animationIterationCount;
    }
    if (expanded.animationDirection) style.animationDirection = expanded.animationDirection;
    if (expanded.animationFillMode) style.animationFillMode = expanded.animationFillMode;
    if (expanded.animationPlayState) style.animationPlayState = expanded.animationPlayState;
    return style;
  }
  function mergeStyles(...styles) {
    return Object.assign({}, ...styles);
  }
  function styleObjectToString(style) {
    return Object.entries(style).map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value}`;
    }).join("; ");
  }
  function applyStylesToElement(element, props) {
    const styles = propsToStyle(props);
    Object.assign(element.style, styles);
  }
  class Box {
    constructor(props = {}) {
      __publicField(this, "element");
      __publicField(this, "props");
      __publicField(this, "eventListeners", /* @__PURE__ */ new Map());
      this.props = props;
      const tagName = props.as || "div";
      this.element = document.createElement(tagName);
      this.applyProps(props);
    }
    applyProps(props) {
      const styleObj = propsToStyle(props);
      Object.assign(this.element.style, styleObj);
      if (props.className) {
        this.element.className = props.className;
      }
      if (props.id) {
        this.element.id = props.id;
      }
      if (props.dataAttributes) {
        Object.entries(props.dataAttributes).forEach(([key, value]) => {
          this.element.setAttribute(`data-${key}`, value);
        });
      }
      if (props.role) {
        this.element.setAttribute("role", props.role);
      }
      if (props.type && "type" in this.element) {
        this.element.type = props.type;
      }
      if (props.children !== void 0) {
        this.setChildren(props.children);
      }
      this.applyEventHandlers(props);
      if (props.disabled && "disabled" in this.element) {
        this.element.disabled = true;
        this.element.setAttribute("aria-disabled", "true");
      } else if ("disabled" in this.element) {
        this.element.disabled = false;
        this.element.removeAttribute("aria-disabled");
      }
      if (props.tabIndex !== void 0) {
        this.element.tabIndex = props.tabIndex;
      }
      if (props.style) {
        Object.assign(this.element.style, props.style);
      }
    }
    applyEventHandlers(props) {
      this.eventListeners.forEach((listener, event) => {
        this.element.removeEventListener(event, listener);
      });
      this.eventListeners.clear();
      const events = [
        { prop: "onClick", event: "click" },
        { prop: "onMouseEnter", event: "mouseenter" },
        { prop: "onMouseLeave", event: "mouseleave" },
        { prop: "onMouseDown", event: "mousedown" },
        { prop: "onMouseUp", event: "mouseup" },
        { prop: "onMouseMove", event: "mousemove" },
        { prop: "onFocus", event: "focus" },
        { prop: "onBlur", event: "blur" },
        { prop: "onKeyDown", event: "keydown" },
        { prop: "onKeyUp", event: "keyup" },
        { prop: "onKeyPress", event: "keypress" }
      ];
      events.forEach(({ prop, event }) => {
        const handler = props[prop];
        if (handler) {
          const listener = handler;
          this.element.addEventListener(event, listener);
          this.eventListeners.set(event, listener);
        }
      });
    }
    setChildren(children) {
      this.element.innerHTML = "";
      if (children === null || children === void 0) {
        return;
      }
      if (typeof children === "string" || typeof children === "number") {
        this.element.textContent = String(children);
      } else if (children instanceof HTMLElement) {
        this.element.appendChild(children);
      } else if ("getElement" in children && typeof children.getElement === "function") {
        this.element.appendChild(children.getElement());
      } else if (Array.isArray(children)) {
        children.forEach((child) => {
          if (child === null || child === void 0) {
            return;
          }
          if (typeof child === "string" || typeof child === "number") {
            this.element.appendChild(document.createTextNode(String(child)));
          } else if (child instanceof HTMLElement) {
            this.element.appendChild(child);
          } else if ("getElement" in child && typeof child.getElement === "function") {
            this.element.appendChild(child.getElement());
          }
        });
      }
    }
    /**
     * Update component props
     */
    update(newProps) {
      this.props = { ...this.props, ...newProps };
      this.applyProps(this.props);
    }
    /**
     * Get the underlying DOM element
     */
    getElement() {
      return this.element;
    }
    /**
     * Append this component to a parent
     */
    appendTo(parent) {
      if ("getElement" in parent && typeof parent.getElement === "function") {
        parent.getElement().appendChild(this.element);
      } else {
        parent.appendChild(this.element);
      }
    }
    /**
     * Remove from DOM
     */
    remove() {
      this.eventListeners.forEach((listener, event) => {
        this.element.removeEventListener(event, listener);
      });
      this.eventListeners.clear();
      this.element.remove();
    }
    /**
     * Append child to this component
     */
    appendChild(child) {
      if ("getElement" in child && typeof child.getElement === "function") {
        this.element.appendChild(child.getElement());
      } else {
        this.element.appendChild(child);
      }
    }
    /**
     * Prepend child to this component
     */
    prependChild(child) {
      const childElement = "getElement" in child && typeof child.getElement === "function" ? child.getElement() : child;
      if (this.element.firstChild) {
        this.element.insertBefore(childElement, this.element.firstChild);
      } else {
        this.element.appendChild(childElement);
      }
    }
    /**
     * Insert child before a reference node
     */
    insertBefore(child, reference) {
      const childElement = "getElement" in child && typeof child.getElement === "function" ? child.getElement() : child;
      const refElement = "getElement" in reference && typeof reference.getElement === "function" ? reference.getElement() : reference;
      this.element.insertBefore(childElement, refElement);
    }
    /**
     * Clear all children
     */
    clearChildren() {
      this.element.innerHTML = "";
    }
    /**
     * Set HTML content (use with caution)
     */
    setHTML(html) {
      this.element.innerHTML = html;
    }
    /**
     * Get computed styles
     */
    getComputedStyle() {
      return window.getComputedStyle(this.element);
    }
    /**
     * Add CSS class
     */
    addClass(...classNames) {
      this.element.classList.add(...classNames);
    }
    /**
     * Remove CSS class
     */
    removeClass(...classNames) {
      this.element.classList.remove(...classNames);
    }
    /**
     * Toggle CSS class
     */
    toggleClass(className, force) {
      this.element.classList.toggle(className, force);
    }
    /**
     * Check if has CSS class
     */
    hasClass(className) {
      return this.element.classList.contains(className);
    }
    /**
     * Get attribute
     */
    getAttribute(name) {
      return this.element.getAttribute(name);
    }
    /**
     * Set attribute
     */
    setAttribute(name, value) {
      this.element.setAttribute(name, value);
    }
    /**
     * Remove attribute
     */
    removeAttribute(name) {
      this.element.removeAttribute(name);
    }
    /**
     * Get bounding client rect
     */
    getBoundingClientRect() {
      return this.element.getBoundingClientRect();
    }
    /**
     * Scroll into view
     */
    scrollIntoView(options) {
      this.element.scrollIntoView(options);
    }
    /**
     * Focus the element
     */
    focus() {
      this.element.focus();
    }
    /**
     * Blur the element
     */
    blur() {
      this.element.blur();
    }
    /**
     * Check if element is visible in viewport
     */
    isInViewport() {
      const rect = this.element.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
  }
  function createBox(props) {
    return new Box(props);
  }
  class Text {
    constructor(props = {}) {
      __publicField(this, "element");
      __publicField(this, "props");
      __publicField(this, "eventListeners", /* @__PURE__ */ new Map());
      this.props = props;
      const tagName = props.as || "span";
      this.element = document.createElement(tagName);
      this.applyProps(props);
    }
    applyProps(props) {
      const styleObj = propsToStyle(props);
      if (!props.fontSize) {
        styleObj.fontSize = resolveToken("fontSizes", "md");
      }
      if (!props.fontFamily) {
        styleObj.fontFamily = resolveToken("fonts", "body");
      }
      if (!props.color) {
        styleObj.color = resolveToken("colors", "text");
      }
      if (props.truncate) {
        styleObj.overflow = "hidden";
        styleObj.textOverflow = "ellipsis";
        styleObj.whiteSpace = "nowrap";
      }
      if (props.selectable === false) {
        styleObj.userSelect = "none";
      }
      styleObj.textRendering = "optimizeSpeed";
      styleObj.fontSmooth = "never";
      styleObj.webkitFontSmoothing = "none";
      Object.assign(this.element.style, styleObj);
      if (props.className) {
        this.element.className = props.className;
      }
      if (props.id) {
        this.element.id = props.id;
      }
      if (props.dataAttributes) {
        Object.entries(props.dataAttributes).forEach(([key, value]) => {
          this.element.setAttribute(`data-${key}`, value);
        });
      }
      if (props.as === "label" && props.htmlFor) {
        this.element.setAttribute("for", props.htmlFor);
      }
      if (props.children !== void 0) {
        this.setChildren(props.children);
      }
      this.applyEventHandlers(props);
      if (props.disabled) {
        this.element.setAttribute("aria-disabled", "true");
        this.element.style.opacity = "0.5";
        this.element.style.cursor = "not-allowed";
      } else {
        this.element.removeAttribute("aria-disabled");
      }
      if (props.tabIndex !== void 0) {
        this.element.tabIndex = props.tabIndex;
      }
      if (props.style) {
        Object.assign(this.element.style, props.style);
      }
    }
    applyEventHandlers(props) {
      this.eventListeners.forEach((listener, event) => {
        this.element.removeEventListener(event, listener);
      });
      this.eventListeners.clear();
      const events = [
        { prop: "onClick", event: "click" },
        { prop: "onMouseEnter", event: "mouseenter" },
        { prop: "onMouseLeave", event: "mouseleave" },
        { prop: "onMouseDown", event: "mousedown" },
        { prop: "onMouseUp", event: "mouseup" },
        { prop: "onMouseMove", event: "mousemove" },
        { prop: "onFocus", event: "focus" },
        { prop: "onBlur", event: "blur" },
        { prop: "onKeyDown", event: "keydown" },
        { prop: "onKeyUp", event: "keyup" },
        { prop: "onKeyPress", event: "keypress" }
      ];
      events.forEach(({ prop, event }) => {
        const handler = props[prop];
        if (handler) {
          const listener = handler;
          this.element.addEventListener(event, listener);
          this.eventListeners.set(event, listener);
        }
      });
    }
    setChildren(children) {
      this.element.innerHTML = "";
      if (children === null || children === void 0) {
        return;
      }
      if (typeof children === "string" || typeof children === "number") {
        this.element.textContent = String(children);
      } else if (children instanceof HTMLElement) {
        this.element.appendChild(children);
      } else if ("getElement" in children && typeof children.getElement === "function") {
        this.element.appendChild(children.getElement());
      } else if (Array.isArray(children)) {
        children.forEach((child) => {
          if (child === null || child === void 0) {
            return;
          }
          if (typeof child === "string" || typeof child === "number") {
            this.element.appendChild(document.createTextNode(String(child)));
          } else if (child instanceof HTMLElement) {
            this.element.appendChild(child);
          } else if ("getElement" in child && typeof child.getElement === "function") {
            this.element.appendChild(child.getElement());
          }
        });
      }
    }
    /**
     * Update component props
     */
    update(newProps) {
      this.props = { ...this.props, ...newProps };
      this.applyProps(this.props);
    }
    /**
     * Get the underlying DOM element
     */
    getElement() {
      return this.element;
    }
    /**
     * Append this component to a parent
     */
    appendTo(parent) {
      if ("getElement" in parent && typeof parent.getElement === "function") {
        parent.getElement().appendChild(this.element);
      } else {
        parent.appendChild(this.element);
      }
    }
    /**
     * Remove from DOM
     */
    remove() {
      this.eventListeners.forEach((listener, event) => {
        this.element.removeEventListener(event, listener);
      });
      this.eventListeners.clear();
      this.element.remove();
    }
    /**
     * Get text content
     */
    getText() {
      return this.element.textContent || "";
    }
    /**
     * Set text content
     */
    setText(text) {
      this.element.textContent = text;
    }
    /**
     * Append text
     */
    appendText(text) {
      this.element.textContent += text;
    }
    /**
     * Add CSS class
     */
    addClass(...classNames) {
      this.element.classList.add(...classNames);
    }
    /**
     * Remove CSS class
     */
    removeClass(...classNames) {
      this.element.classList.remove(...classNames);
    }
    /**
     * Toggle CSS class
     */
    toggleClass(className, force) {
      this.element.classList.toggle(className, force);
    }
    /**
     * Check if has CSS class
     */
    hasClass(className) {
      return this.element.classList.contains(className);
    }
    /**
     * Get computed styles
     */
    getComputedStyle() {
      return window.getComputedStyle(this.element);
    }
    /**
     * Focus the element
     */
    focus() {
      this.element.focus();
    }
    /**
     * Blur the element
     */
    blur() {
      this.element.blur();
    }
  }
  function createText(props) {
    return new Text(props);
  }
  function createHeading(level, props) {
    return new Text({
      ...props,
      as: `h${level}`,
      fontWeight: "bold",
      fontSize: level === 1 ? "3xl" : level === 2 ? "2xl" : level === 3 ? "xl" : level === 4 ? "lg" : "md",
      lineHeight: "tight"
    });
  }
  function createParagraph(props) {
    return new Text({
      ...props,
      as: "p",
      lineHeight: "normal"
    });
  }
  class Stack extends Box {
    constructor(props = {}) {
      const {
        direction = "vertical",
        spacing,
        align,
        justify,
        wrap,
        reverse = false,
        ...restProps
      } = props;
      let flexDirection;
      if (direction === "horizontal" || direction === "row") {
        flexDirection = reverse ? "row-reverse" : "row";
      } else {
        flexDirection = reverse ? "column-reverse" : "column";
      }
      const boxProps = {
        ...restProps,
        display: "flex",
        flexDirection,
        gap: spacing,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap
      };
      super(boxProps);
    }
  }
  class VStack extends Stack {
    constructor(props = {}) {
      super({ ...props, direction: "vertical" });
    }
  }
  class HStack extends Stack {
    constructor(props = {}) {
      super({ ...props, direction: "horizontal" });
    }
  }
  class ZStack extends Box {
    constructor(props = {}) {
      super({
        ...props,
        position: "relative"
      });
    }
    /**
     * Override appendChild to automatically position children absolutely
     */
    appendChild(child) {
      const childElement = "getElement" in child && typeof child.getElement === "function" ? child.getElement() : child;
      childElement.style.position = "absolute";
      childElement.style.top = "0";
      childElement.style.left = "0";
      super.appendChild(child);
    }
  }
  class Center extends Stack {
    constructor(props = {}) {
      super({
        ...props,
        align: "center",
        justify: "center"
      });
    }
  }
  class Spacer extends Box {
    constructor(props = {}) {
      super({
        ...props,
        flex: 1
      });
    }
  }
  function createStack(props) {
    return new Stack(props);
  }
  function createVStack(props) {
    return new VStack(props);
  }
  function createHStack(props) {
    return new HStack(props);
  }
  function createZStack(props) {
    return new ZStack(props);
  }
  function createCenter(props) {
    return new Center(props);
  }
  function createSpacer(props) {
    return new Spacer(props);
  }
  class Button extends Box {
    constructor(props = {}) {
      const {
        variant = "primary",
        size = "md",
        loading = false,
        fullWidth = false,
        leftIcon,
        rightIcon,
        children,
        disabled,
        onClick,
        ...restProps
      } = props;
      super({
        ...restProps,
        as: "button",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        userSelect: "none",
        transition: "fast",
        width: fullWidth ? "full" : restProps.width,
        disabled: disabled || loading,
        onClick: disabled || loading ? void 0 : onClick,
        ...getVariantStyles$2(variant),
        ...getSizeStyles$1(size)
      });
      __publicField(this, "innerContent");
      __publicField(this, "loadingIndicator");
      this.innerContent = new Box({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        opacity: loading ? 0 : 1,
        transition: "fast"
      });
      if (leftIcon) {
        this.innerContent.appendChild(leftIcon);
      }
      if (children) {
        if (typeof children === "string" || typeof children === "number") {
          const text = document.createTextNode(String(children));
          this.innerContent.appendChild(text);
        } else {
          this.innerContent.appendChild(children);
        }
      }
      if (rightIcon) {
        this.innerContent.appendChild(rightIcon);
      }
      super.appendChild(this.innerContent);
      if (loading) {
        this.showLoading();
      }
      this.addHoverEffects(variant);
    }
    addHoverEffects(variant) {
      const element = this.getElement();
      element.addEventListener("mouseenter", () => {
        if (!element.hasAttribute("disabled")) {
          const hoverStyles = getHoverStyles$1(variant || "primary");
          Object.assign(element.style, hoverStyles);
        }
      });
      element.addEventListener("mouseleave", () => {
        if (!element.hasAttribute("disabled")) {
          const variantStyles = getVariantStyles$2(variant || "primary");
          Object.assign(element.style, variantStyles);
        }
      });
      element.addEventListener("mousedown", () => {
        if (!element.hasAttribute("disabled")) {
          element.style.transform = "translateY(2px)";
        }
      });
      element.addEventListener("mouseup", () => {
        if (!element.hasAttribute("disabled")) {
          element.style.transform = "translateY(0)";
        }
      });
    }
    showLoading() {
      if (this.loadingIndicator) return;
      this.loadingIndicator = new Box({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 16,
        height: 16,
        border: `2px solid ${tokens.colors.white}`,
        borderTopColor: "transparent",
        borderRadius: "full",
        animation: "spin 0.6s linear infinite"
      });
      if (!document.getElementById("tangui-spin-animation")) {
        const style = document.createElement("style");
        style.id = "tangui-spin-animation";
        style.textContent = `
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `;
        document.head.appendChild(style);
      }
      super.appendChild(this.loadingIndicator);
    }
    hideLoading() {
      if (this.loadingIndicator) {
        this.loadingIndicator.remove();
        this.loadingIndicator = void 0;
      }
    }
    /**
     * Update button props
     */
    update(newProps) {
      if (newProps.loading !== void 0) {
        if (newProps.loading) {
          this.showLoading();
          this.innerContent.update({ opacity: 0 });
        } else {
          this.hideLoading();
          this.innerContent.update({ opacity: 1 });
        }
      }
      super.update(newProps);
    }
    /**
     * Trigger click programmatically
     */
    click() {
      this.getElement().click();
    }
  }
  function getVariantStyles$2(variant) {
    const variants = {
      primary: {
        backgroundColor: "primary",
        color: "textInverse",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "primaryDark",
        boxShadow: "md"
      },
      secondary: {
        backgroundColor: "secondary",
        color: "white",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "secondaryDark",
        boxShadow: "md"
      },
      success: {
        backgroundColor: "success",
        color: "white",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "successDark",
        boxShadow: "md"
      },
      warning: {
        backgroundColor: "warning",
        color: "textInverse",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "warningDark",
        boxShadow: "md"
      },
      error: {
        backgroundColor: "error",
        color: "white",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "errorDark",
        boxShadow: "md"
      },
      ghost: {
        backgroundColor: "transparent",
        color: "text",
        borderWidth: 0,
        boxShadow: "none"
      },
      outline: {
        backgroundColor: "transparent",
        color: "text",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "text",
        boxShadow: "none"
      }
    };
    return variants[variant || "primary"];
  }
  function getHoverStyles$1(variant) {
    const hoverVariants = {
      primary: {
        backgroundColor: tokens.colors.primaryLight,
        transform: "translateY(-2px)",
        boxShadow: tokens.shadows.lg
      },
      secondary: {
        backgroundColor: tokens.colors.secondaryLight,
        transform: "translateY(-2px)",
        boxShadow: tokens.shadows.lg
      },
      success: {
        backgroundColor: tokens.colors.successLight,
        transform: "translateY(-2px)",
        boxShadow: tokens.shadows.lg
      },
      warning: {
        backgroundColor: tokens.colors.warningLight,
        transform: "translateY(-2px)",
        boxShadow: tokens.shadows.lg
      },
      error: {
        backgroundColor: tokens.colors.errorLight,
        transform: "translateY(-2px)",
        boxShadow: tokens.shadows.lg
      },
      ghost: {
        backgroundColor: tokens.colors.surfaceLight
      },
      outline: {
        backgroundColor: tokens.colors.surface
      }
    };
    return hoverVariants[variant];
  }
  function getSizeStyles$1(size) {
    const sizes = {
      xs: {
        paddingX: 2,
        paddingY: 1,
        fontSize: "xs",
        borderRadius: "sm"
      },
      sm: {
        paddingX: 3,
        paddingY: 1.5,
        fontSize: "sm",
        borderRadius: "sm"
      },
      md: {
        paddingX: 4,
        paddingY: 2,
        fontSize: "md",
        borderRadius: "md"
      },
      lg: {
        paddingX: 6,
        paddingY: 3,
        fontSize: "lg",
        borderRadius: "md"
      },
      xl: {
        paddingX: 8,
        paddingY: 4,
        fontSize: "xl",
        borderRadius: "lg"
      }
    };
    return sizes[size || "md"];
  }
  function createButton(props) {
    return new Button(props);
  }
  class Card extends Box {
    constructor(props = {}) {
      const {
        variant = "elevated",
        hover = false,
        clickable = false,
        ...restProps
      } = props;
      super({
        ...restProps,
        borderRadius: "lg",
        overflow: "hidden",
        transition: "normal",
        cursor: clickable ? "pointer" : restProps.cursor,
        ...getVariantStyles$1(variant)
      });
      if (hover || clickable) {
        this.addHoverEffect(variant);
      }
    }
    addHoverEffect(variant) {
      const element = this.getElement();
      element.addEventListener("mouseenter", () => {
        const hoverStyles = getHoverStyles(variant || "elevated");
        Object.assign(element.style, hoverStyles);
      });
      element.addEventListener("mouseleave", () => {
        const variantStyles = getVariantStyles$1(variant || "elevated");
        Object.assign(element.style, variantStyles);
      });
    }
  }
  function getVariantStyles$1(variant) {
    const variants = {
      elevated: {
        backgroundColor: "surface",
        boxShadow: "md",
        borderWidth: 0
      },
      outlined: {
        backgroundColor: "surface",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "surfaceLight",
        boxShadow: "none"
      },
      filled: {
        backgroundColor: "surfaceLight",
        borderWidth: 0,
        boxShadow: "none"
      }
    };
    return variants[variant || "elevated"];
  }
  function getHoverStyles(variant) {
    const { tokens: tokens2 } = require("../themes/tokens");
    const hoverVariants = {
      elevated: {
        transform: "translateY(-4px)",
        boxShadow: tokens2.shadows.lg
      },
      outlined: {
        borderColor: tokens2.colors.primary,
        boxShadow: tokens2.shadows.outline
      },
      filled: {
        backgroundColor: tokens2.colors.surfaceDark
      }
    };
    return hoverVariants[variant];
  }
  class CardHeader extends Box {
    constructor(props = {}) {
      super({
        ...props,
        padding: 4,
        borderBottom: `2px solid`,
        borderColor: "surfaceLight"
      });
    }
  }
  class CardBody extends Box {
    constructor(props = {}) {
      super({
        ...props,
        padding: 4
      });
    }
  }
  class CardFooter extends Box {
    constructor(props = {}) {
      super({
        ...props,
        padding: 4,
        borderTop: `2px solid`,
        borderColor: "surfaceLight"
      });
    }
  }
  function createCard(props) {
    return new Card(props);
  }
  function createCardHeader(props) {
    return new CardHeader(props);
  }
  function createCardBody(props) {
    return new CardBody(props);
  }
  function createCardFooter(props) {
    return new CardFooter(props);
  }
  class Input extends Box {
    constructor(props = {}) {
      const {
        type = "text",
        placeholder,
        value,
        defaultValue,
        size = "md",
        variant = "outline",
        error = false,
        success = false,
        disabled = false,
        readOnly = false,
        maxLength,
        required = false,
        autoFocus = false,
        onChange,
        onInput,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        leftAddon,
        rightAddon,
        ...restProps
      } = props;
      super({
        ...restProps,
        display: "inline-flex",
        position: "relative",
        width: restProps.width || "full"
      });
      __publicField(this, "inputElement");
      __publicField(this, "container");
      this.container = new Box({
        display: "flex",
        alignItems: "center",
        gap: 2,
        transition: "fast",
        ...getVariantStyles(variant, error, success),
        ...getSizeStyles(size)
      });
      if (leftAddon) {
        this.container.appendChild(leftAddon);
      }
      this.inputElement = document.createElement("input");
      this.inputElement.type = type;
      if (placeholder) this.inputElement.placeholder = placeholder;
      if (value !== void 0) this.inputElement.value = value;
      if (defaultValue) this.inputElement.defaultValue = defaultValue;
      if (maxLength) this.inputElement.maxLength = maxLength;
      if (required) this.inputElement.required = true;
      if (autoFocus) this.inputElement.autofocus = true;
      this.inputElement.disabled = disabled;
      this.inputElement.readOnly = readOnly;
      Object.assign(this.inputElement.style, {
        flex: "1",
        background: "transparent",
        border: "none",
        outline: "none",
        color: tokens.colors.text,
        fontSize: "inherit",
        fontFamily: tokens.fonts.body,
        padding: "0",
        margin: "0"
      });
      if (onChange) {
        this.inputElement.addEventListener("change", (e) => {
          onChange(this.inputElement.value, e);
        });
      }
      if (onInput) {
        this.inputElement.addEventListener("input", (e) => {
          onInput(this.inputElement.value, e);
        });
      }
      if (onFocus) {
        this.inputElement.addEventListener("focus", onFocus);
      }
      if (onBlur) {
        this.inputElement.addEventListener("blur", onBlur);
      }
      if (onKeyDown) {
        this.inputElement.addEventListener("keydown", onKeyDown);
      }
      if (onKeyUp) {
        this.inputElement.addEventListener("keyup", onKeyUp);
      }
      this.addFocusEffect(variant, error, success);
      this.container.getElement().appendChild(this.inputElement);
      if (rightAddon) {
        this.container.appendChild(rightAddon);
      }
      super.appendChild(this.container);
    }
    addFocusEffect(variant, error, success) {
      this.inputElement.addEventListener("focus", () => {
        const focusStyles = getFocusStyles(variant || "outline", error, success);
        Object.assign(this.container.getElement().style, focusStyles);
      });
      this.inputElement.addEventListener("blur", () => {
        const variantStyles = getVariantStyles(variant || "outline", error, success);
        Object.assign(this.container.getElement().style, variantStyles);
      });
    }
    /**
     * Get input value
     */
    getValue() {
      return this.inputElement.value;
    }
    /**
     * Set input value
     */
    setValue(value) {
      this.inputElement.value = value;
    }
    /**
     * Clear input
     */
    clear() {
      this.inputElement.value = "";
    }
    /**
     * Focus input
     */
    focus() {
      this.inputElement.focus();
    }
    /**
     * Blur input
     */
    blur() {
      this.inputElement.blur();
    }
    /**
     * Select input text
     */
    select() {
      this.inputElement.select();
    }
    /**
     * Get native input element
     */
    getInputElement() {
      return this.inputElement;
    }
  }
  function getVariantStyles(variant, error, success) {
    let borderColor = "surfaceLight";
    if (error) {
      borderColor = "error";
    } else if (success) {
      borderColor = "success";
    }
    if (variant === "filled") {
      return {
        backgroundColor: "surface",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: error ? "error" : success ? "success" : "transparent",
        borderRadius: "md"
      };
    }
    return {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor,
      borderRadius: "md"
    };
  }
  function getFocusStyles(_variant, error, success) {
    let borderColor = tokens.colors.primary;
    if (error) {
      borderColor = tokens.colors.error;
    } else if (success) {
      borderColor = tokens.colors.success;
    }
    return {
      borderColor,
      boxShadow: `0 0 0 3px ${borderColor}33`
    };
  }
  function getSizeStyles(size) {
    const sizes = {
      sm: {
        paddingX: 2,
        paddingY: 1,
        fontSize: "sm"
      },
      md: {
        paddingX: 3,
        paddingY: 2,
        fontSize: "md"
      },
      lg: {
        paddingX: 4,
        paddingY: 3,
        fontSize: "lg"
      }
    };
    return sizes[size || "md"];
  }
  function createInput(props) {
    return new Input(props);
  }
  class Checkbox extends Box {
    constructor(props = {}) {
      const {
        checked,
        defaultChecked = false,
        indeterminate = false,
        disabled = false,
        size = "md",
        onChange,
        name,
        value,
        required = false,
        label,
        ...restProps
      } = props;
      const isControlled = checked !== void 0;
      const initialChecked = isControlled ? checked : defaultChecked;
      super({
        ...restProps,
        as: "label",
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none"
      });
      __publicField(this, "input");
      __publicField(this, "checkboxBox");
      __publicField(this, "checkmark");
      __publicField(this, "isControlled");
      __publicField(this, "internalChecked");
      __publicField(this, "internalIndeterminate");
      __publicField(this, "changeCallback");
      __publicField(this, "labelText");
      __publicField(this, "handleChange", () => {
        const newChecked = this.input.checked;
        this.internalIndeterminate = false;
        this.input.indeterminate = false;
        if (!this.isControlled) {
          this.internalChecked = newChecked;
          this.updateVisuals(newChecked, false);
        }
        if (this.changeCallback) {
          this.changeCallback(newChecked);
        }
      });
      __publicField(this, "handleFocus", () => {
        const boxEl = this.checkboxBox.getElement();
        boxEl.style.outline = `3px solid ${tokens.colors.primary}`;
        boxEl.style.outlineOffset = "2px";
      });
      __publicField(this, "handleBlur", () => {
        const boxEl = this.checkboxBox.getElement();
        boxEl.style.outline = "none";
      });
      this.isControlled = isControlled;
      this.internalChecked = initialChecked;
      this.internalIndeterminate = indeterminate;
      this.changeCallback = onChange;
      this.input = document.createElement("input");
      this.input.type = "checkbox";
      this.input.checked = initialChecked;
      this.input.indeterminate = indeterminate;
      this.input.disabled = disabled;
      if (name) this.input.name = name;
      if (value) this.input.value = value;
      if (required) this.input.required = required;
      Object.assign(this.input.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0"
      });
      this.getElement().appendChild(this.input);
      const boxSize = getSizeValue$1(size);
      this.checkboxBox = new Box({
        position: "relative",
        width: boxSize,
        height: boxSize,
        backgroundColor: initialChecked || indeterminate ? "primary" : "background",
        border: "2px solid",
        borderColor: initialChecked || indeterminate ? "primary" : "border",
        borderRadius: "sm",
        transition: "fast",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      });
      this.checkmark = new Box({
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: size === "sm" ? "10px" : size === "lg" ? "16px" : "12px",
        fontWeight: "bold",
        opacity: initialChecked || indeterminate ? 1 : 0,
        transition: "fast"
      });
      this.updateCheckmark(initialChecked, indeterminate);
      this.checkboxBox.appendChild(this.checkmark);
      this.appendChild(this.checkboxBox);
      if (label) {
        this.labelText = new Box({
          as: "span",
          fontSize: size === "sm" ? "sm" : size === "lg" ? "lg" : "base",
          color: "text"
        });
        this.labelText.getElement().textContent = label;
        this.appendChild(this.labelText);
      }
      this.input.addEventListener("change", this.handleChange);
      this.input.addEventListener("focus", this.handleFocus);
      this.input.addEventListener("blur", this.handleBlur);
    }
    updateCheckmark(checked, indeterminate) {
      const checkmarkEl = this.checkmark.getElement();
      if (indeterminate) {
        checkmarkEl.textContent = "−";
      } else if (checked) {
        checkmarkEl.textContent = "✓";
      } else {
        checkmarkEl.textContent = "";
      }
    }
    updateVisuals(checked, indeterminate) {
      const boxEl = this.checkboxBox.getElement();
      const checkmarkEl = this.checkmark.getElement();
      boxEl.style.backgroundColor = checked || indeterminate ? tokens.colors.primary : tokens.colors.background;
      boxEl.style.borderColor = checked || indeterminate ? tokens.colors.primary : tokens.colors.border;
      checkmarkEl.style.opacity = checked || indeterminate ? "1" : "0";
      this.updateCheckmark(checked, indeterminate);
    }
    setChecked(checked) {
      this.input.checked = checked;
      this.internalChecked = checked;
      this.internalIndeterminate = false;
      this.input.indeterminate = false;
      this.updateVisuals(checked, false);
    }
    setIndeterminate(indeterminate) {
      this.input.indeterminate = indeterminate;
      this.internalIndeterminate = indeterminate;
      this.updateVisuals(this.input.checked, indeterminate);
    }
    getChecked() {
      return this.isControlled ? this.input.checked : this.internalChecked;
    }
    getIndeterminate() {
      return this.internalIndeterminate;
    }
    update(props) {
      if (props.checked !== void 0 && this.isControlled) {
        this.setChecked(props.checked);
      }
      if (props.indeterminate !== void 0) {
        this.setIndeterminate(props.indeterminate);
      }
      if (props.disabled !== void 0) {
        this.input.disabled = props.disabled;
        this.getElement().style.opacity = props.disabled ? "0.5" : "1";
        this.getElement().style.cursor = props.disabled ? "not-allowed" : "pointer";
      }
      if (props.onChange !== void 0) {
        this.changeCallback = props.onChange;
      }
      if (props.label !== void 0 && this.labelText) {
        this.labelText.getElement().textContent = props.label;
      }
    }
    remove() {
      this.input.removeEventListener("change", this.handleChange);
      this.input.removeEventListener("focus", this.handleFocus);
      this.input.removeEventListener("blur", this.handleBlur);
      super.remove();
    }
  }
  function getSizeValue$1(size) {
    const sizes = {
      sm: 16,
      md: 20,
      lg: 24
    };
    return sizes[size];
  }
  class Label extends Box {
    constructor(props = {}) {
      const {
        htmlFor,
        required = false,
        size = "md",
        children,
        ...restProps
      } = props;
      super({
        ...restProps,
        as: "label",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        fontSize: getSizeFontSize(size),
        fontWeight: "medium",
        color: "text",
        cursor: "pointer",
        userSelect: "none"
      });
      __publicField(this, "requiredIndicator");
      if (htmlFor) {
        this.getElement().setAttribute("for", htmlFor);
      }
      if (children) {
        if (typeof children === "string" || typeof children === "number") {
          const text = document.createTextNode(String(children));
          this.appendChild(text);
        } else {
          this.appendChild(children);
        }
      }
      if (required) {
        this.requiredIndicator = new Box({
          as: "span",
          color: "error",
          marginLeft: 1,
          fontSize: getSizeFontSize(size)
        });
        this.requiredIndicator.getElement().textContent = "*";
        this.requiredIndicator.getElement().setAttribute("aria-label", "required");
        this.appendChild(this.requiredIndicator);
      }
    }
    setHtmlFor(htmlFor) {
      this.getElement().setAttribute("for", htmlFor);
    }
    update(props) {
      if (props.htmlFor !== void 0) {
        this.setHtmlFor(props.htmlFor);
      }
      if (props.required !== void 0) {
        if (props.required && !this.requiredIndicator) {
          this.requiredIndicator = new Box({
            as: "span",
            color: "error",
            marginLeft: 1
          });
          this.requiredIndicator.getElement().textContent = "*";
          this.requiredIndicator.getElement().setAttribute("aria-label", "required");
          this.appendChild(this.requiredIndicator);
        } else if (!props.required && this.requiredIndicator) {
          this.requiredIndicator.remove();
          this.requiredIndicator = void 0;
        }
      }
    }
  }
  function getSizeFontSize(size) {
    const sizes = {
      sm: "sm",
      md: "base",
      lg: "lg"
    };
    return sizes[size];
  }
  class RadioGroup extends Box {
    constructor(props) {
      const {
        name,
        value,
        defaultValue = "",
        options,
        disabled = false,
        size = "md",
        orientation = "vertical",
        onChange,
        required = false,
        ...restProps
      } = props;
      const isControlled = value !== void 0;
      const initialValue = isControlled ? value : defaultValue;
      super({
        ...restProps,
        as: "div",
        display: "flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
        gap: orientation === "vertical" ? 2 : 3,
        role: "radiogroup"
      });
      __publicField(this, "radioItems", []);
      __publicField(this, "isControlled");
      __publicField(this, "internalValue");
      __publicField(this, "changeCallback");
      __publicField(this, "_groupName");
      __publicField(this, "handleSelectionChange", (selectedValue) => {
        this.radioItems.forEach((radio) => {
          const shouldBeChecked = radio.getValue() === selectedValue;
          radio.setChecked(shouldBeChecked);
        });
        if (!this.isControlled) {
          this.internalValue = selectedValue;
        }
        if (this.changeCallback) {
          this.changeCallback(selectedValue);
        }
      });
      __publicField(this, "handleKeyDown", (e) => {
        const currentIndex = this.radioItems.findIndex((radio) => radio.getChecked());
        let nextIndex = currentIndex;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          nextIndex = (currentIndex + 1) % this.radioItems.length;
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          nextIndex = currentIndex - 1 < 0 ? this.radioItems.length - 1 : currentIndex - 1;
        }
        if (nextIndex !== currentIndex) {
          const nextRadio = this.radioItems[nextIndex];
          if (!nextRadio.getDisabled()) {
            nextRadio.focus();
            nextRadio.setChecked(true);
            this.handleSelectionChange(nextRadio.getValue());
          }
        }
      });
      this.isControlled = isControlled;
      this.internalValue = initialValue;
      this.changeCallback = onChange;
      this.groupName = name;
      options.forEach((option) => {
        const radio = new Radio({
          name,
          value: option.value,
          label: option.label,
          checked: option.value === initialValue,
          disabled: disabled || option.disabled,
          size,
          required,
          onChange: (checked) => {
            if (checked) {
              this.handleSelectionChange(option.value);
            }
          }
        });
        this.radioItems.push(radio);
        this.appendChild(radio);
      });
      this.getElement().addEventListener("keydown", this.handleKeyDown);
    }
    setValue(value) {
      this.internalValue = value;
      this.handleSelectionChange(value);
    }
    getValue() {
      var _a;
      return this.isControlled ? ((_a = this.radioItems.find((r) => r.getChecked())) == null ? void 0 : _a.getValue()) || "" : this.internalValue;
    }
    update(props) {
      if (props.value !== void 0 && this.isControlled) {
        this.setValue(props.value);
      }
      if (props.onChange !== void 0) {
        this.changeCallback = props.onChange;
      }
      if (props.disabled !== void 0) {
        this.radioItems.forEach((radio) => radio.setDisabled(props.disabled));
      }
    }
    remove() {
      this.getElement().removeEventListener("keydown", this.handleKeyDown);
      this.radioItems.forEach((radio) => radio.remove());
      super.remove();
    }
  }
  class Radio extends Box {
    constructor(props) {
      const {
        name,
        value,
        label,
        checked,
        defaultChecked = false,
        disabled = false,
        size = "md",
        onChange,
        required = false,
        ...restProps
      } = props;
      const isControlled = checked !== void 0;
      const initialChecked = isControlled ? checked : defaultChecked;
      super({
        ...restProps,
        as: "label",
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none"
      });
      __publicField(this, "input");
      __publicField(this, "radioCircle");
      __publicField(this, "radioDot");
      __publicField(this, "labelText");
      __publicField(this, "isControlled");
      __publicField(this, "internalChecked");
      __publicField(this, "changeCallback");
      __publicField(this, "handleChange", () => {
        const newChecked = this.input.checked;
        if (!this.isControlled) {
          this.internalChecked = newChecked;
          this.updateVisuals(newChecked);
        }
        if (this.changeCallback) {
          this.changeCallback(newChecked);
        }
      });
      __publicField(this, "handleFocus", () => {
        const circleEl = this.radioCircle.getElement();
        circleEl.style.outline = `3px solid ${tokens.colors.primary}`;
        circleEl.style.outlineOffset = "2px";
      });
      __publicField(this, "handleBlur", () => {
        const circleEl = this.radioCircle.getElement();
        circleEl.style.outline = "none";
      });
      this.isControlled = isControlled;
      this.internalChecked = initialChecked;
      this.changeCallback = onChange;
      this.input = document.createElement("input");
      this.input.type = "radio";
      this.input.name = name;
      this.input.value = value;
      this.input.checked = initialChecked;
      this.input.disabled = disabled;
      if (required) this.input.required = required;
      Object.assign(this.input.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0"
      });
      this.getElement().appendChild(this.input);
      const circleSize = getSizeValue(size);
      const dotSize = Math.floor(circleSize * 0.5);
      this.radioCircle = new Box({
        position: "relative",
        width: circleSize,
        height: circleSize,
        backgroundColor: "background",
        border: "2px solid",
        borderColor: initialChecked ? "primary" : "border",
        borderRadius: "full",
        transition: "fast",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      });
      this.radioDot = new Box({
        width: dotSize,
        height: dotSize,
        backgroundColor: "primary",
        borderRadius: "full",
        transition: "fast",
        transform: initialChecked ? "scale(1)" : "scale(0)"
      });
      this.radioCircle.appendChild(this.radioDot);
      this.appendChild(this.radioCircle);
      this.labelText = new Box({
        as: "span",
        fontSize: size === "sm" ? "sm" : size === "lg" ? "lg" : "base",
        color: "text"
      });
      this.labelText.getElement().textContent = label;
      this.appendChild(this.labelText);
      this.input.addEventListener("change", this.handleChange);
      this.input.addEventListener("focus", this.handleFocus);
      this.input.addEventListener("blur", this.handleBlur);
    }
    updateVisuals(checked) {
      const circleEl = this.radioCircle.getElement();
      const dotEl = this.radioDot.getElement();
      circleEl.style.borderColor = checked ? tokens.colors.primary : tokens.colors.border;
      dotEl.style.transform = checked ? "scale(1)" : "scale(0)";
    }
    setChecked(checked) {
      this.input.checked = checked;
      this.internalChecked = checked;
      this.updateVisuals(checked);
    }
    getChecked() {
      return this.isControlled ? this.input.checked : this.internalChecked;
    }
    getValue() {
      return this.input.value;
    }
    getDisabled() {
      return this.input.disabled;
    }
    setDisabled(disabled) {
      this.input.disabled = disabled;
      this.getElement().style.opacity = disabled ? "0.5" : "1";
      this.getElement().style.cursor = disabled ? "not-allowed" : "pointer";
    }
    focus() {
      this.input.focus();
    }
    update(props) {
      if (props.checked !== void 0 && this.isControlled) {
        this.setChecked(props.checked);
      }
      if (props.disabled !== void 0) {
        this.setDisabled(props.disabled);
      }
      if (props.onChange !== void 0) {
        this.changeCallback = props.onChange;
      }
      if (props.label !== void 0) {
        this.labelText.getElement().textContent = props.label;
      }
    }
    remove() {
      this.input.removeEventListener("change", this.handleChange);
      this.input.removeEventListener("focus", this.handleFocus);
      this.input.removeEventListener("blur", this.handleBlur);
      super.remove();
    }
  }
  function getSizeValue(size) {
    const sizes = {
      sm: 16,
      md: 20,
      lg: 24
    };
    return sizes[size];
  }
  class Select extends Box {
    constructor(props) {
      const {
        options,
        value,
        defaultValue = "",
        placeholder = "Select...",
        disabled = false,
        size = "md",
        onChange,
        name,
        required = false,
        searchable = false,
        ...restProps
      } = props;
      const isControlled = value !== void 0;
      const initialValue = isControlled ? value : defaultValue;
      super({
        ...restProps,
        as: "div",
        position: "relative",
        display: "inline-block",
        minWidth: 200
      });
      __publicField(this, "trigger");
      __publicField(this, "dropdown");
      __publicField(this, "optionElements", []);
      __publicField(this, "hiddenSelect");
      __publicField(this, "isOpen", false);
      __publicField(this, "isControlled");
      __publicField(this, "internalValue");
      __publicField(this, "changeCallback");
      __publicField(this, "options");
      __publicField(this, "searchInput");
      __publicField(this, "searchable");
      __publicField(this, "handleSearch", () => {
        if (!this.searchInput) return;
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredOptions = this.options.filter(
          (opt) => opt.label.toLowerCase().includes(searchTerm)
        );
        this.renderOptions(filteredOptions);
      });
      __publicField(this, "toggleDropdown", () => {
        this.isOpen = !this.isOpen;
        this.updateDropdownVisibility();
      });
      __publicField(this, "handleOutsideClick", (e) => {
        if (!this.getElement().contains(e.target)) {
          this.isOpen = false;
          this.updateDropdownVisibility();
        }
      });
      __publicField(this, "handleKeyDown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleDropdown();
        } else if (e.key === "Escape" && this.isOpen) {
          this.isOpen = false;
          this.updateDropdownVisibility();
        } else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && this.isOpen) {
          e.preventDefault();
          const currentIndex = this.options.findIndex((opt) => opt.value === this.internalValue);
          let nextIndex = currentIndex;
          if (e.key === "ArrowDown") {
            nextIndex = (currentIndex + 1) % this.options.length;
          } else {
            nextIndex = currentIndex - 1 < 0 ? this.options.length - 1 : currentIndex - 1;
          }
          const nextOption = this.options[nextIndex];
          if (!nextOption.disabled) {
            this.selectOption(nextOption.value);
          }
        }
      });
      this.isControlled = isControlled;
      this.internalValue = initialValue;
      this.changeCallback = onChange;
      this.options = options;
      this.searchable = searchable;
      this.hiddenSelect = document.createElement("select");
      this.hiddenSelect.disabled = disabled;
      if (name) this.hiddenSelect.name = name;
      if (required) this.hiddenSelect.required = required;
      this.hiddenSelect.style.display = "none";
      options.forEach((option) => {
        const optionEl = document.createElement("option");
        optionEl.value = option.value;
        optionEl.textContent = option.label;
        optionEl.selected = option.value === initialValue;
        if (option.disabled) optionEl.disabled = true;
        this.hiddenSelect.appendChild(optionEl);
      });
      this.getElement().appendChild(this.hiddenSelect);
      const selectedOption = options.find((opt) => opt.value === initialValue);
      this.trigger = new Box({
        as: "button",
        type: "button",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: getSizePadding(size),
        backgroundColor: "background",
        border: "2px solid",
        borderColor: "border",
        borderRadius: "sm",
        fontSize: size === "sm" ? "sm" : size === "lg" ? "lg" : "base",
        color: selectedOption ? "text" : "textSecondary",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "fast",
        userSelect: "none"
      });
      const triggerText = new Box({ as: "span", flex: 1, textAlign: "left" });
      triggerText.getElement().textContent = (selectedOption == null ? void 0 : selectedOption.label) || placeholder;
      this.trigger.appendChild(triggerText);
      const arrow = new Box({
        as: "span",
        marginLeft: 2,
        transition: "fast",
        transform: "rotate(0deg)"
      });
      arrow.getElement().textContent = "▼";
      this.trigger.appendChild(arrow);
      this.appendChild(this.trigger);
      this.dropdown = new Box({
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        marginTop: 1,
        backgroundColor: "surface",
        border: "2px solid",
        borderColor: "primary",
        borderRadius: "sm",
        boxShadow: "md",
        maxHeight: 200,
        overflowY: "auto",
        zIndex: "dropdown",
        display: "none"
      });
      if (searchable) {
        const searchBox = new Box({
          padding: 2,
          borderBottom: "1px solid",
          borderColor: "border"
        });
        this.searchInput = document.createElement("input");
        this.searchInput.type = "text";
        this.searchInput.placeholder = "Search...";
        Object.assign(this.searchInput.style, {
          width: "100%",
          padding: tokens.space[1],
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: tokens.radii.sm,
          fontSize: tokens.fontSizes.sm,
          fontFamily: "inherit",
          backgroundColor: tokens.colors.background,
          color: tokens.colors.text
        });
        this.searchInput.addEventListener("input", this.handleSearch);
        this.searchInput.addEventListener("keydown", (e) => e.stopPropagation());
        searchBox.getElement().appendChild(this.searchInput);
        this.dropdown.appendChild(searchBox);
      }
      this.renderOptions(options);
      this.appendChild(this.dropdown);
      if (!disabled) {
        this.trigger.getElement().addEventListener("click", this.toggleDropdown);
        document.addEventListener("click", this.handleOutsideClick);
        this.trigger.getElement().addEventListener("keydown", this.handleKeyDown);
      }
    }
    renderOptions(options) {
      const children = Array.from(this.dropdown.getElement().children);
      children.forEach((child) => {
        if (!child.querySelector('input[type="text"]')) {
          child.remove();
        }
      });
      this.optionElements = [];
      options.forEach((option) => {
        const optionBox = new Box({
          as: "div",
          padding: getSizePadding("md"),
          cursor: option.disabled ? "not-allowed" : "pointer",
          backgroundColor: option.value === this.internalValue ? "primary" : "transparent",
          color: option.value === this.internalValue ? "background" : "text",
          opacity: option.disabled ? 0.5 : 1,
          transition: "fast",
          fontSize: "sm"
        });
        optionBox.getElement().textContent = option.label;
        optionBox.getElement().setAttribute("data-value", option.value);
        if (!option.disabled) {
          optionBox.getElement().addEventListener("mouseenter", () => {
            if (option.value !== this.internalValue) {
              optionBox.getElement().style.backgroundColor = tokens.colors.surfaceSecondary;
            }
          });
          optionBox.getElement().addEventListener("mouseleave", () => {
            if (option.value !== this.internalValue) {
              optionBox.getElement().style.backgroundColor = "transparent";
            }
          });
          optionBox.getElement().addEventListener("click", () => {
            this.selectOption(option.value);
          });
        }
        this.dropdown.appendChild(optionBox);
        this.optionElements.push(optionBox);
      });
    }
    updateDropdownVisibility() {
      const dropdownEl = this.dropdown.getElement();
      const arrow = this.trigger.getElement().querySelector("span:last-child");
      dropdownEl.style.display = this.isOpen ? "block" : "none";
      if (arrow) {
        arrow.style.transform = this.isOpen ? "rotate(180deg)" : "rotate(0deg)";
      }
      if (this.isOpen && this.searchInput) {
        setTimeout(() => this.searchInput.focus(), 50);
      }
    }
    selectOption(value) {
      const option = this.options.find((opt) => opt.value === value);
      if (!option || option.disabled) return;
      const selectOption = Array.from(this.hiddenSelect.options).find(
        (opt) => opt.value === value
      );
      if (selectOption) {
        selectOption.selected = true;
      }
      const triggerText = this.trigger.getElement().querySelector("span:first-child");
      if (triggerText) {
        triggerText.textContent = option.label;
        triggerText.style.color = tokens.colors.text;
      }
      if (!this.isControlled) {
        this.internalValue = value;
      }
      this.optionElements.forEach((optBox) => {
        const optValue = optBox.getElement().getAttribute("data-value");
        const optEl = optBox.getElement();
        if (optValue === value) {
          optEl.style.backgroundColor = tokens.colors.primary;
          optEl.style.color = tokens.colors.background;
        } else {
          optEl.style.backgroundColor = "transparent";
          optEl.style.color = tokens.colors.text;
        }
      });
      this.isOpen = false;
      this.updateDropdownVisibility();
      if (this.changeCallback) {
        this.changeCallback(value);
      }
    }
    setValue(value) {
      this.internalValue = value;
      this.selectOption(value);
    }
    getValue() {
      return this.isControlled ? this.hiddenSelect.value : this.internalValue;
    }
    update(props) {
      if (props.value !== void 0 && this.isControlled) {
        this.setValue(props.value);
      }
      if (props.onChange !== void 0) {
        this.changeCallback = props.onChange;
      }
      if (props.disabled !== void 0) {
        this.hiddenSelect.disabled = props.disabled;
        this.trigger.getElement().style.opacity = props.disabled ? "0.5" : "1";
        this.trigger.getElement().style.cursor = props.disabled ? "not-allowed" : "pointer";
      }
      if (props.options !== void 0) {
        this.options = props.options;
        this.renderOptions(props.options);
      }
    }
    remove() {
      this.trigger.getElement().removeEventListener("click", this.toggleDropdown);
      document.removeEventListener("click", this.handleOutsideClick);
      this.trigger.getElement().removeEventListener("keydown", this.handleKeyDown);
      if (this.searchInput) {
        this.searchInput.removeEventListener("input", this.handleSearch);
      }
      super.remove();
    }
  }
  function getSizePadding(size) {
    const sizes = {
      sm: 1,
      md: 2,
      lg: 3
    };
    return sizes[size];
  }
  class Slider extends Box {
    constructor(props = {}) {
      const {
        value,
        defaultValue = 50,
        min = 0,
        max = 100,
        step = 1,
        disabled = false,
        size = "md",
        onChange,
        onChangeEnd,
        name,
        showValue = false,
        orientation = "horizontal",
        ...restProps
      } = props;
      const isControlled = value !== void 0;
      const initialValue = isControlled ? value : defaultValue;
      super({
        ...restProps,
        as: "div",
        display: "flex",
        flexDirection: orientation === "horizontal" ? "column" : "row",
        gap: 2,
        alignItems: orientation === "horizontal" ? "stretch" : "center",
        opacity: disabled ? 0.5 : 1,
        width: orientation === "horizontal" ? restProps.width || 200 : "auto",
        height: orientation === "vertical" ? restProps.height || 200 : "auto"
      });
      __publicField(this, "input");
      __publicField(this, "track");
      __publicField(this, "fill");
      __publicField(this, "thumb");
      __publicField(this, "valueDisplay");
      __publicField(this, "isControlled");
      __publicField(this, "internalValue");
      __publicField(this, "changeCallback");
      __publicField(this, "changeEndCallback");
      __publicField(this, "min");
      __publicField(this, "max");
      __publicField(this, "step");
      __publicField(this, "orientation");
      __publicField(this, "handleMouseDown", (e) => {
        e.preventDefault();
        this.updateFromMouseEvent(e);
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
        this.thumb.getElement().style.cursor = "grabbing";
      });
      __publicField(this, "handleMouseMove", (e) => {
        this.updateFromMouseEvent(e);
      });
      __publicField(this, "handleMouseUp", () => {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
        this.thumb.getElement().style.cursor = "grab";
        if (this.changeEndCallback) {
          this.changeEndCallback(this.internalValue);
        }
      });
      __publicField(this, "handleTouchStart", (e) => {
        e.preventDefault();
        this.updateFromTouchEvent(e);
        document.addEventListener("touchmove", this.handleTouchMove);
        document.addEventListener("touchend", this.handleTouchEnd);
      });
      __publicField(this, "handleTouchMove", (e) => {
        this.updateFromTouchEvent(e);
      });
      __publicField(this, "handleTouchEnd", () => {
        document.removeEventListener("touchmove", this.handleTouchMove);
        document.removeEventListener("touchend", this.handleTouchEnd);
        if (this.changeEndCallback) {
          this.changeEndCallback(this.internalValue);
        }
      });
      __publicField(this, "handleInputChange", () => {
        const newValue = Number(this.input.value);
        this.updateValue((newValue - this.min) / (this.max - this.min));
      });
      __publicField(this, "handleFocus", () => {
        const thumbEl = this.thumb.getElement();
        thumbEl.style.outline = `3px solid ${tokens.colors.primary}`;
        thumbEl.style.outlineOffset = "2px";
      });
      __publicField(this, "handleBlur", () => {
        const thumbEl = this.thumb.getElement();
        thumbEl.style.outline = "none";
      });
      this.isControlled = isControlled;
      this.internalValue = initialValue;
      this.changeCallback = onChange;
      this.changeEndCallback = onChangeEnd;
      this.min = min;
      this.max = max;
      this.step = step;
      this.orientation = orientation;
      this.input = document.createElement("input");
      this.input.type = "range";
      this.input.min = String(min);
      this.input.max = String(max);
      this.input.step = String(step);
      this.input.value = String(initialValue);
      this.input.disabled = disabled;
      if (name) this.input.name = name;
      Object.assign(this.input.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0"
      });
      this.getElement().appendChild(this.input);
      const trackContainer = new Box({
        position: "relative",
        display: "flex",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        flex: 1
      });
      const trackThickness = getTrackThickness(size);
      const thumbSize = getThumbSize(size);
      this.track = new Box({
        position: "relative",
        width: orientation === "horizontal" ? "100%" : trackThickness,
        height: orientation === "horizontal" ? trackThickness : "100%",
        backgroundColor: "surfaceSecondary",
        borderRadius: "full",
        overflow: "visible"
      });
      const fillPercentage = (initialValue - min) / (max - min) * 100;
      this.fill = new Box({
        position: "absolute",
        top: 0,
        left: 0,
        width: orientation === "horizontal" ? `${fillPercentage}%` : "100%",
        height: orientation === "horizontal" ? "100%" : `${fillPercentage}%`,
        backgroundColor: "primary",
        borderRadius: "full",
        transition: "fast"
      });
      const thumbPosition = orientation === "horizontal" ? `calc(${fillPercentage}% - ${thumbSize / 2}px)` : `calc(${fillPercentage}% - ${thumbSize / 2}px)`;
      this.thumb = new Box({
        position: "absolute",
        top: orientation === "horizontal" ? "50%" : thumbPosition,
        left: orientation === "horizontal" ? thumbPosition : "50%",
        transform: "translate(-50%, -50%)",
        width: thumbSize,
        height: thumbSize,
        backgroundColor: "white",
        border: "2px solid",
        borderColor: "primary",
        borderRadius: "full",
        boxShadow: "sm",
        cursor: disabled ? "not-allowed" : "grab",
        transition: "fast"
      });
      this.track.appendChild(this.fill);
      this.track.appendChild(this.thumb);
      trackContainer.appendChild(this.track);
      this.appendChild(trackContainer);
      if (showValue) {
        this.valueDisplay = new Box({
          as: "span",
          fontSize: size === "sm" ? "sm" : size === "lg" ? "lg" : "base",
          fontWeight: "bold",
          color: "text",
          minWidth: 40,
          textAlign: "center"
        });
        this.valueDisplay.getElement().textContent = String(initialValue);
        this.appendChild(this.valueDisplay);
      }
      if (!disabled) {
        this.track.getElement().addEventListener("mousedown", this.handleMouseDown);
        this.track.getElement().addEventListener("touchstart", this.handleTouchStart);
        this.input.addEventListener("change", this.handleInputChange);
        this.input.addEventListener("focus", this.handleFocus);
        this.input.addEventListener("blur", this.handleBlur);
      }
    }
    updateFromMouseEvent(e) {
      const rect = this.track.getElement().getBoundingClientRect();
      const position = this.orientation === "horizontal" ? (e.clientX - rect.left) / rect.width : (e.clientY - rect.top) / rect.height;
      this.updateValue(position);
    }
    updateFromTouchEvent(e) {
      const touch = e.touches[0];
      const rect = this.track.getElement().getBoundingClientRect();
      const position = this.orientation === "horizontal" ? (touch.clientX - rect.left) / rect.width : (touch.clientY - rect.top) / rect.height;
      this.updateValue(position);
    }
    updateValue(position) {
      position = Math.max(0, Math.min(1, position));
      let newValue = this.min + position * (this.max - this.min);
      newValue = Math.round(newValue / this.step) * this.step;
      newValue = Math.max(this.min, Math.min(this.max, newValue));
      if (!this.isControlled) {
        this.internalValue = newValue;
        this.input.value = String(newValue);
        this.updateVisuals(newValue);
      }
      if (this.changeCallback) {
        this.changeCallback(newValue);
      }
    }
    updateVisuals(value) {
      const percentage = (value - this.min) / (this.max - this.min) * 100;
      const thumbSize = getThumbSize(
        this.getElement().classList.contains("slider--sm") ? "sm" : this.getElement().classList.contains("slider--lg") ? "lg" : "md"
      );
      const fillEl = this.fill.getElement();
      const thumbEl = this.thumb.getElement();
      if (this.orientation === "horizontal") {
        fillEl.style.width = `${percentage}%`;
        thumbEl.style.left = `calc(${percentage}% - ${thumbSize / 2}px)`;
      } else {
        fillEl.style.height = `${percentage}%`;
        thumbEl.style.top = `calc(${percentage}% - ${thumbSize / 2}px)`;
      }
      if (this.valueDisplay) {
        this.valueDisplay.getElement().textContent = String(value);
      }
    }
    setValue(value) {
      this.input.value = String(value);
      this.internalValue = value;
      this.updateVisuals(value);
    }
    getValue() {
      return this.isControlled ? Number(this.input.value) : this.internalValue;
    }
    update(props) {
      if (props.value !== void 0 && this.isControlled) {
        this.setValue(props.value);
      }
      if (props.disabled !== void 0) {
        this.input.disabled = props.disabled;
        this.getElement().style.opacity = props.disabled ? "0.5" : "1";
        this.track.getElement().style.cursor = props.disabled ? "not-allowed" : "pointer";
        this.thumb.getElement().style.cursor = props.disabled ? "not-allowed" : "grab";
      }
      if (props.onChange !== void 0) {
        this.changeCallback = props.onChange;
      }
      if (props.onChangeEnd !== void 0) {
        this.changeEndCallback = props.onChangeEnd;
      }
    }
    remove() {
      this.track.getElement().removeEventListener("mousedown", this.handleMouseDown);
      this.track.getElement().removeEventListener("touchstart", this.handleTouchStart);
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
      document.removeEventListener("touchmove", this.handleTouchMove);
      document.removeEventListener("touchend", this.handleTouchEnd);
      this.input.removeEventListener("change", this.handleInputChange);
      this.input.removeEventListener("focus", this.handleFocus);
      this.input.removeEventListener("blur", this.handleBlur);
      super.remove();
    }
  }
  function getTrackThickness(size) {
    const sizes = {
      sm: 4,
      md: 6,
      lg: 8
    };
    return sizes[size];
  }
  function getThumbSize(size) {
    const sizes = {
      sm: 14,
      md: 18,
      lg: 22
    };
    return sizes[size];
  }
  class Switch extends Box {
    constructor(props = {}) {
      const {
        checked,
        defaultChecked = false,
        disabled = false,
        size = "md",
        onChange,
        name,
        value,
        required = false,
        ...restProps
      } = props;
      const isControlled = checked !== void 0;
      const initialChecked = isControlled ? checked : defaultChecked;
      super({
        ...restProps,
        as: "label",
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none"
      });
      __publicField(this, "input");
      __publicField(this, "track");
      __publicField(this, "thumb");
      __publicField(this, "isControlled");
      __publicField(this, "internalChecked");
      __publicField(this, "changeCallback");
      __publicField(this, "handleChange", () => {
        const newChecked = this.input.checked;
        if (!this.isControlled) {
          this.internalChecked = newChecked;
          this.updateVisuals(newChecked);
        }
        if (this.changeCallback) {
          this.changeCallback(newChecked);
        }
      });
      __publicField(this, "handleFocus", () => {
        const trackEl = this.track.getElement();
        trackEl.style.outline = `3px solid ${tokens.colors.primary}`;
        trackEl.style.outlineOffset = "2px";
      });
      __publicField(this, "handleBlur", () => {
        const trackEl = this.track.getElement();
        trackEl.style.outline = "none";
      });
      this.isControlled = isControlled;
      this.internalChecked = initialChecked;
      this.changeCallback = onChange;
      this.input = document.createElement("input");
      this.input.type = "checkbox";
      this.input.checked = initialChecked;
      this.input.disabled = disabled;
      if (name) this.input.name = name;
      if (value) this.input.value = value;
      if (required) this.input.required = required;
      Object.assign(this.input.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0"
      });
      this.getElement().appendChild(this.input);
      const dimensions = getSizeDimensions(size);
      this.track = new Box({
        position: "relative",
        width: dimensions.trackWidth,
        height: dimensions.trackHeight,
        backgroundColor: initialChecked ? "primary" : "surfaceSecondary",
        borderRadius: "full",
        transition: "base",
        border: "2px solid",
        borderColor: initialChecked ? "primary" : "border"
      });
      this.thumb = new Box({
        position: "absolute",
        top: "50%",
        left: initialChecked ? `calc(100% - ${dimensions.thumbSize}px - 2px)` : "2px",
        transform: "translateY(-50%)",
        width: dimensions.thumbSize,
        height: dimensions.thumbSize,
        backgroundColor: "white",
        borderRadius: "full",
        transition: "base",
        boxShadow: "sm"
      });
      this.track.appendChild(this.thumb);
      this.appendChild(this.track);
      this.input.addEventListener("change", this.handleChange);
      this.input.addEventListener("focus", this.handleFocus);
      this.input.addEventListener("blur", this.handleBlur);
    }
    updateVisuals(checked) {
      const trackEl = this.track.getElement();
      const thumbEl = this.thumb.getElement();
      trackEl.style.backgroundColor = checked ? tokens.colors.primary : tokens.colors.surfaceSecondary;
      trackEl.style.borderColor = checked ? tokens.colors.primary : tokens.colors.border;
      const dimensions = getSizeDimensions(
        this.getElement().classList.contains("switch--sm") ? "sm" : this.getElement().classList.contains("switch--lg") ? "lg" : "md"
      );
      thumbEl.style.left = checked ? `calc(100% - ${dimensions.thumbSize}px - 2px)` : "2px";
    }
    setChecked(checked) {
      this.input.checked = checked;
      this.internalChecked = checked;
      this.updateVisuals(checked);
    }
    getChecked() {
      return this.isControlled ? this.input.checked : this.internalChecked;
    }
    update(props) {
      if (props.checked !== void 0 && this.isControlled) {
        this.setChecked(props.checked);
      }
      if (props.disabled !== void 0) {
        this.input.disabled = props.disabled;
        this.getElement().style.opacity = props.disabled ? "0.5" : "1";
        this.getElement().style.cursor = props.disabled ? "not-allowed" : "pointer";
      }
      if (props.onChange !== void 0) {
        this.changeCallback = props.onChange;
      }
    }
    remove() {
      this.input.removeEventListener("change", this.handleChange);
      this.input.removeEventListener("focus", this.handleFocus);
      this.input.removeEventListener("blur", this.handleBlur);
      super.remove();
    }
  }
  function getSizeDimensions(size) {
    const sizes = {
      sm: { trackWidth: 32, trackHeight: 18, thumbSize: 14 },
      md: { trackWidth: 44, trackHeight: 24, thumbSize: 20 },
      lg: { trackWidth: 56, trackHeight: 30, thumbSize: 26 }
    };
    return sizes[size];
  }
  class DialogueBox extends Box {
    constructor(props = {}) {
      const {
        lines = [],
        typewriterSpeed = 50,
        autoAdvanceDelay,
        onComplete,
        showContinueIndicator = true,
        position = "bottom",
        ...restProps
      } = props;
      const positionStyles = getPositionStyles(position);
      super({
        ...restProps,
        ...positionStyles,
        width: restProps.width || "80%",
        maxWidth: restProps.maxWidth || 800,
        backgroundColor: "background",
        borderRadius: "lg",
        borderWidth: 4,
        borderStyle: "solid",
        borderColor: "primary",
        boxShadow: "xl",
        padding: 0,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "normal",
        zIndex: "modal"
      });
      __publicField(this, "lines", []);
      __publicField(this, "currentLineIndex", 0);
      __publicField(this, "typewriterSpeed");
      __publicField(this, "autoAdvanceDelay");
      __publicField(this, "onComplete");
      __publicField(this, "showContinueIndicator");
      __publicField(this, "contentContainer");
      __publicField(this, "speakerContainer");
      __publicField(this, "speakerNameText");
      __publicField(this, "portraitImage");
      __publicField(this, "dialogueText");
      __publicField(this, "continueIndicator");
      __publicField(this, "choicesContainer");
      __publicField(this, "typewriterTimer");
      __publicField(this, "currentCharIndex", 0);
      __publicField(this, "fullText", "");
      this.lines = lines;
      this.typewriterSpeed = typewriterSpeed;
      this.autoAdvanceDelay = autoAdvanceDelay;
      this.onComplete = onComplete;
      this.showContinueIndicator = showContinueIndicator;
      this.contentContainer = new VStack({
        padding: 4,
        gap: 3,
        width: "full"
      });
      this.dialogueText = new Text({
        fontSize: "md",
        lineHeight: "relaxed",
        color: "text",
        minHeight: 60
      });
      this.contentContainer.appendChild(this.dialogueText);
      if (this.showContinueIndicator) {
        this.continueIndicator = new Text({
          children: "▼ Press SPACE to continue",
          fontSize: "xs",
          color: "textMuted",
          textAlign: "right",
          animation: "blink 1.5s ease-in-out infinite",
          marginTop: 2
        });
        if (!document.getElementById("tangui-blink-animation")) {
          const style = document.createElement("style");
          style.id = "tangui-blink-animation";
          style.textContent = `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `;
          document.head.appendChild(style);
        }
        this.contentContainer.appendChild(this.continueIndicator);
        this.continueIndicator.update({ opacity: 0 });
      }
      super.appendChild(this.contentContainer);
      this.setupKeyboardControls();
      if (lines.length > 0) {
        this.showLine(0);
      }
    }
    setupKeyboardControls() {
      const handleKeyPress = (e) => {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          this.advance();
        }
      };
      document.addEventListener("keydown", handleKeyPress);
      this._keyboardHandler = handleKeyPress;
    }
    showLine(index) {
      if (index >= this.lines.length) {
        this.complete();
        return;
      }
      const line = this.lines[index];
      this.currentLineIndex = index;
      this.currentCharIndex = 0;
      this.fullText = line.text;
      if (this.choicesContainer) {
        this.choicesContainer.remove();
        this.choicesContainer = void 0;
      }
      if (line.speaker) {
        this.showSpeaker(line.speaker, line.portrait);
      } else if (this.speakerContainer) {
        this.speakerContainer.remove();
        this.speakerContainer = void 0;
      }
      if (this.continueIndicator) {
        this.continueIndicator.update({ opacity: 0 });
      }
      this.startTypewriter();
    }
    showSpeaker(name, portrait) {
      if (!this.speakerContainer) {
        this.speakerContainer = new HStack({
          gap: 3,
          alignItems: "center"
        });
        this.contentContainer.prependChild(this.speakerContainer);
      }
      this.speakerContainer.clearChildren();
      if (portrait) {
        this.portraitImage = new Box({
          width: 48,
          height: 48,
          borderRadius: "md",
          overflow: "hidden",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "primary"
        });
        if (typeof portrait === "string") {
          const img = document.createElement("img");
          img.src = portrait;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          this.portraitImage.getElement().appendChild(img);
        } else {
          this.portraitImage.getElement().appendChild(portrait);
        }
        this.speakerContainer.appendChild(this.portraitImage);
      }
      this.speakerNameText = new Text({
        children: name,
        fontSize: "lg",
        fontWeight: "bold",
        color: "primary",
        textTransform: "uppercase"
      });
      this.speakerContainer.appendChild(this.speakerNameText);
    }
    startTypewriter() {
      this.dialogueText.setText("");
      this.typewriterTimer = window.setInterval(() => {
        if (this.currentCharIndex < this.fullText.length) {
          const char = this.fullText[this.currentCharIndex];
          this.dialogueText.appendText(char);
          this.currentCharIndex++;
        } else {
          this.finishTypewriter();
        }
      }, this.typewriterSpeed);
    }
    finishTypewriter() {
      if (this.typewriterTimer) {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = void 0;
      }
      this.dialogueText.setText(this.fullText);
      if (this.continueIndicator && !this.lines[this.currentLineIndex].choices) {
        this.continueIndicator.update({ opacity: 1 });
      }
      const currentLine = this.lines[this.currentLineIndex];
      if (currentLine.choices) {
        this.showChoices(currentLine.choices);
      } else if (this.autoAdvanceDelay) {
        setTimeout(() => this.advance(), this.autoAdvanceDelay);
      }
    }
    showChoices(choices) {
      this.choicesContainer = new VStack({
        gap: 2,
        marginTop: 3,
        width: "full"
      });
      choices.forEach((choice, index) => {
        const button = new Button({
          children: choice.text,
          variant: "outline",
          size: "md",
          fullWidth: true,
          disabled: choice.disabled,
          onClick: () => {
            choice.action();
            this.advance();
          }
        });
        this.choicesContainer.appendChild(button);
      });
      this.contentContainer.appendChild(this.choicesContainer);
    }
    /**
     * Advance to next line or skip typewriter
     */
    advance() {
      if (this.typewriterTimer) {
        this.finishTypewriter();
        return;
      }
      if (this.choicesContainer) {
        return;
      }
      this.showLine(this.currentLineIndex + 1);
    }
    /**
     * Complete dialogue
     */
    complete() {
      this.hide();
      if (this.onComplete) {
        this.onComplete();
      }
    }
    /**
     * Show dialogue box with animation
     */
    show() {
      this.update({
        opacity: 1,
        transform: "translateY(0)"
      });
    }
    /**
     * Hide dialogue box with animation
     */
    hide() {
      this.update({
        opacity: 0,
        transform: "translateY(20px)"
      });
    }
    /**
     * Set new dialogue lines
     */
    setLines(lines) {
      this.lines = lines;
      this.currentLineIndex = 0;
      if (lines.length > 0) {
        this.showLine(0);
      }
    }
    /**
     * Clean up
     */
    remove() {
      if (this.typewriterTimer) {
        clearInterval(this.typewriterTimer);
      }
      if (this._keyboardHandler) {
        document.removeEventListener("keydown", this._keyboardHandler);
      }
      super.remove();
    }
  }
  function getPositionStyles(position) {
    const positions = {
      top: {
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%) translateY(20px)"
      },
      bottom: {
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%) translateY(20px)"
      },
      center: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) translateY(20px)"
      }
    };
    return positions[position || "bottom"];
  }
  function createDialogueBox(props) {
    return new DialogueBox(props);
  }
  class HUD extends Box {
    constructor(props = {}) {
      const {
        playerName,
        health = 100,
        maxHealth = 100,
        mana,
        maxMana,
        score,
        level,
        gold,
        customStats,
        ...restProps
      } = props;
      super({
        ...restProps,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: 3,
        pointerEvents: "none",
        zIndex: "docked"
      });
      __publicField(this, "playerNameText");
      __publicField(this, "healthBar");
      __publicField(this, "manaBar");
      __publicField(this, "scoreText");
      __publicField(this, "levelText");
      __publicField(this, "goldText");
      __publicField(this, "customStatsContainer");
      __publicField(this, "stats");
      this.stats = props;
      const hudContainer = new HStack({
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 4,
        width: "full"
      });
      const leftSection = new VStack({
        gap: 2,
        alignItems: "flex-start",
        backgroundColor: "overlay",
        padding: 3,
        borderRadius: "md",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "surfaceLight",
        pointerEvents: "auto"
      });
      if (playerName) {
        this.playerNameText = new Text({
          children: playerName,
          fontSize: "lg",
          fontWeight: "bold",
          color: "primary"
        });
        leftSection.appendChild(this.playerNameText);
      }
      this.healthBar = new ProgressBar({
        label: "HP",
        value: health,
        maxValue: maxHealth,
        color: "healthGreen",
        width: 200
      });
      leftSection.appendChild(this.healthBar);
      if (mana !== void 0 && maxMana !== void 0) {
        this.manaBar = new ProgressBar({
          label: "MP",
          value: mana,
          maxValue: maxMana,
          color: "manaBlue",
          width: 200
        });
        leftSection.appendChild(this.manaBar);
      }
      hudContainer.appendChild(leftSection);
      const rightSection = new VStack({
        gap: 2,
        alignItems: "flex-end",
        backgroundColor: "overlay",
        padding: 3,
        borderRadius: "md",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "surfaceLight",
        pointerEvents: "auto"
      });
      if (level !== void 0) {
        this.levelText = new Text({
          children: `LVL ${level}`,
          fontSize: "md",
          fontWeight: "bold",
          color: "expPurple"
        });
        rightSection.appendChild(this.levelText);
      }
      if (score !== void 0) {
        this.scoreText = new Text({
          children: `SCORE: ${score}`,
          fontSize: "md",
          color: "text"
        });
        rightSection.appendChild(this.scoreText);
      }
      if (gold !== void 0) {
        this.goldText = new Text({
          children: `💰 ${gold}`,
          fontSize: "md",
          color: "goldYellow"
        });
        rightSection.appendChild(this.goldText);
      }
      if (customStats && customStats.length > 0) {
        this.customStatsContainer = new VStack({
          gap: 1,
          alignItems: "flex-end"
        });
        customStats.forEach((stat) => {
          const statText = new Text({
            children: `${stat.label}: ${stat.value}`,
            fontSize: "sm",
            color: "textSecondary"
          });
          this.customStatsContainer.appendChild(statText);
        });
        rightSection.appendChild(this.customStatsContainer);
      }
      hudContainer.appendChild(rightSection);
      super.appendChild(hudContainer);
    }
    /**
     * Update HUD stats
     */
    updateStats(newStats) {
      this.stats = { ...this.stats, ...newStats };
      if (newStats.playerName && this.playerNameText) {
        this.playerNameText.setText(newStats.playerName);
      }
      if (newStats.health !== void 0 && this.healthBar) {
        this.healthBar.setValue(newStats.health);
      }
      if (newStats.mana !== void 0 && this.manaBar) {
        this.manaBar.setValue(newStats.mana);
      }
      if (newStats.score !== void 0 && this.scoreText) {
        this.scoreText.setText(`SCORE: ${newStats.score}`);
      }
      if (newStats.level !== void 0 && this.levelText) {
        this.levelText.setText(`LVL ${newStats.level}`);
      }
      if (newStats.gold !== void 0 && this.goldText) {
        this.goldText.setText(`💰 ${newStats.gold}`);
      }
    }
    /**
     * Animate health change
     */
    animateHealthChange(from, to, duration = 500) {
      if (!this.healthBar) return;
      const startTime = Date.now();
      const diff = to - from;
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = from + diff * progress;
        this.healthBar.setValue(Math.round(current));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }
  class ProgressBar extends Box {
    constructor(props) {
      const { label, value, maxValue, color, width = 150 } = props;
      super({
        width
      });
      __publicField(this, "label");
      __publicField(this, "valueText");
      __publicField(this, "bar");
      __publicField(this, "fill");
      __publicField(this, "maxValue");
      __publicField(this, "currentValue");
      __publicField(this, "color");
      this.maxValue = maxValue;
      this.currentValue = value;
      this.color = color;
      const container = new VStack({
        gap: 1,
        width: "full"
      });
      const labelRow = new HStack({
        justifyContent: "space-between",
        alignItems: "center"
      });
      this.label = new Text({
        children: label,
        fontSize: "xs",
        fontWeight: "bold",
        color: "textSecondary"
      });
      this.valueText = new Text({
        children: `${value}/${maxValue}`,
        fontSize: "xs",
        color: "textMuted"
      });
      labelRow.appendChild(this.label);
      labelRow.appendChild(this.valueText);
      container.appendChild(labelRow);
      this.bar = new Box({
        width: "full",
        height: 16,
        backgroundColor: "backgroundDark",
        borderRadius: "sm",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "surfaceLight",
        overflow: "hidden",
        position: "relative"
      });
      this.fill = new Box({
        position: "absolute",
        top: 0,
        left: 0,
        height: "full",
        width: `${this.getPercentage()}%`,
        backgroundColor: color,
        transition: "normal"
      });
      this.bar.appendChild(this.fill);
      container.appendChild(this.bar);
      super.appendChild(container);
    }
    getPercentage() {
      return this.currentValue / this.maxValue * 100;
    }
    getBarColor() {
      const percentage = this.getPercentage();
      if (percentage > 50) return this.color;
      if (percentage > 25) return "healthYellow";
      return "healthRed";
    }
    setValue(value) {
      this.currentValue = Math.max(0, Math.min(value, this.maxValue));
      const percentage = this.getPercentage();
      this.fill.update({
        width: `${percentage}%`,
        backgroundColor: this.getBarColor()
      });
      this.valueText.setText(`${Math.round(this.currentValue)}/${this.maxValue}`);
    }
    setMaxValue(maxValue) {
      this.maxValue = maxValue;
      this.setValue(this.currentValue);
    }
  }
  function createHUD(props) {
    return new HUD(props);
  }
  class Menu extends Box {
    constructor(props) {
      const {
        title,
        items,
        selectedIndex = 0,
        keyboardNavigation = true,
        overlay = true,
        onClose,
        ...restProps
      } = props;
      super({
        ...restProps,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: overlay ? "overlay" : "transparent",
        zIndex: "modal",
        opacity: 0,
        transition: "normal"
      });
      __publicField(this, "items");
      __publicField(this, "selectedIndex");
      __publicField(this, "keyboardNavigation");
      __publicField(this, "onClose");
      __publicField(this, "titleText");
      __publicField(this, "menuContainer");
      __publicField(this, "buttonElements", []);
      this.items = items;
      this.selectedIndex = selectedIndex;
      this.keyboardNavigation = keyboardNavigation;
      this.onClose = onClose;
      const menuPanel = new VStack({
        gap: 4,
        padding: 6,
        backgroundColor: "background",
        borderRadius: "xl",
        borderWidth: 4,
        borderStyle: "solid",
        borderColor: "primary",
        boxShadow: "2xl",
        minWidth: 400,
        maxWidth: 600,
        transform: "scale(0.8)",
        transition: "normal"
      });
      if (title) {
        this.titleText = new Text({
          children: title,
          fontSize: "3xl",
          fontWeight: "bold",
          color: "primary",
          textAlign: "center",
          textShadow: `4px 4px 0px rgba(0,0,0,0.5)`
        });
        menuPanel.appendChild(this.titleText);
      }
      this.menuContainer = new VStack({
        gap: 2,
        width: "full"
      });
      this.items.forEach((item, index) => {
        const button = new Button({
          children: item.icon ? `${item.icon} ${item.label}` : item.label,
          variant: index === this.selectedIndex ? "primary" : "outline",
          size: "lg",
          fullWidth: true,
          disabled: item.disabled,
          onClick: () => this.selectItem(index)
        });
        this.buttonElements.push(button);
        this.menuContainer.appendChild(button);
      });
      menuPanel.appendChild(this.menuContainer);
      if (onClose) {
        const closeHint = new Text({
          children: "Press ESC to close",
          fontSize: "xs",
          color: "textMuted",
          textAlign: "center",
          marginTop: 2
        });
        menuPanel.appendChild(closeHint);
      }
      super.appendChild(menuPanel);
      if (this.keyboardNavigation) {
        this.setupKeyboardNavigation();
      }
      this._menuPanel = menuPanel;
    }
    setupKeyboardNavigation() {
      const handleKeyDown = (e) => {
        switch (e.code) {
          case "ArrowUp":
          case "KeyW":
            e.preventDefault();
            this.navigateUp();
            break;
          case "ArrowDown":
          case "KeyS":
            e.preventDefault();
            this.navigateDown();
            break;
          case "Enter":
          case "Space":
            e.preventDefault();
            this.activateSelected();
            break;
          case "Escape":
            e.preventDefault();
            if (this.onClose) {
              this.onClose();
            }
            break;
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      this._keyboardHandler = handleKeyDown;
    }
    navigateUp() {
      let newIndex = this.selectedIndex - 1;
      while (newIndex >= 0 && this.items[newIndex].disabled) {
        newIndex--;
      }
      if (newIndex >= 0) {
        this.setSelectedIndex(newIndex);
      }
    }
    navigateDown() {
      let newIndex = this.selectedIndex + 1;
      while (newIndex < this.items.length && this.items[newIndex].disabled) {
        newIndex++;
      }
      if (newIndex < this.items.length) {
        this.setSelectedIndex(newIndex);
      }
    }
    setSelectedIndex(index) {
      if (this.buttonElements[this.selectedIndex]) {
        this.buttonElements[this.selectedIndex].update({ variant: "outline" });
      }
      this.selectedIndex = index;
      if (this.buttonElements[this.selectedIndex]) {
        this.buttonElements[this.selectedIndex].update({ variant: "primary" });
      }
    }
    selectItem(index) {
      if (this.items[index].disabled) return;
      this.setSelectedIndex(index);
      this.activateSelected();
    }
    activateSelected() {
      const item = this.items[this.selectedIndex];
      if (!item.disabled) {
        item.action();
      }
    }
    /**
     * Show menu with animation
     */
    show() {
      this.update({ opacity: 1 });
      if (this._menuPanel) {
        this._menuPanel.update({ transform: "scale(1)" });
      }
    }
    /**
     * Hide menu with animation
     */
    hide() {
      this.update({ opacity: 0 });
      if (this._menuPanel) {
        this._menuPanel.update({ transform: "scale(0.8)" });
      }
    }
    /**
     * Update menu items
     */
    updateItems(items) {
      this.items = items;
      this.menuContainer.clearChildren();
      this.buttonElements = [];
      this.items.forEach((item, index) => {
        const button = new Button({
          children: item.icon ? `${item.icon} ${item.label}` : item.label,
          variant: index === this.selectedIndex ? "primary" : "outline",
          size: "lg",
          fullWidth: true,
          disabled: item.disabled,
          onClick: () => this.selectItem(index)
        });
        this.buttonElements.push(button);
        this.menuContainer.appendChild(button);
      });
    }
    /**
     * Clean up
     */
    remove() {
      if (this._keyboardHandler) {
        document.removeEventListener("keydown", this._keyboardHandler);
      }
      super.remove();
    }
  }
  function createMenu(props) {
    return new Menu(props);
  }
  function createPauseMenu(props) {
    const items = [
      {
        label: "Resume",
        icon: "▶",
        action: props.onResume
      }
    ];
    if (props.onSettings) {
      items.push({
        label: "Settings",
        icon: "⚙",
        action: props.onSettings
      });
    }
    if (props.onQuit) {
      items.push({
        label: "Quit",
        icon: "✕",
        action: props.onQuit
      });
    }
    return new Menu({
      title: "PAUSED",
      items,
      overlay: true
    });
  }
  const VERSION = "0.1.0";
  function init() {
    const { injectTokens: injectTokens2 } = require("./themes");
    injectTokens2();
    const style = document.createElement("style");
    style.textContent = `
    * {
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: var(--tangui-font-body, 'Press Start 2P', monospace);
      -webkit-font-smoothing: none;
      -moz-osx-font-smoothing: grayscale;
    }
  `;
    document.head.appendChild(style);
    console.log(`🎮 TanGui v${VERSION} initialized`);
  }
  exports2.Box = Box;
  exports2.Button = Button;
  exports2.Card = Card;
  exports2.CardBody = CardBody;
  exports2.CardFooter = CardFooter;
  exports2.CardHeader = CardHeader;
  exports2.Center = Center;
  exports2.Checkbox = Checkbox;
  exports2.DialogueBox = DialogueBox;
  exports2.HStack = HStack;
  exports2.HUD = HUD;
  exports2.Input = Input;
  exports2.Label = Label;
  exports2.Menu = Menu;
  exports2.Radio = Radio;
  exports2.RadioGroup = RadioGroup;
  exports2.Select = Select;
  exports2.Slider = Slider;
  exports2.Spacer = Spacer;
  exports2.Stack = Stack;
  exports2.Switch = Switch;
  exports2.Text = Text;
  exports2.VERSION = VERSION;
  exports2.VStack = VStack;
  exports2.ZStack = ZStack;
  exports2.applyStylesToElement = applyStylesToElement;
  exports2.createBox = createBox;
  exports2.createButton = createButton;
  exports2.createCard = createCard;
  exports2.createCardBody = createCardBody;
  exports2.createCardFooter = createCardFooter;
  exports2.createCardHeader = createCardHeader;
  exports2.createCenter = createCenter;
  exports2.createDialogueBox = createDialogueBox;
  exports2.createHStack = createHStack;
  exports2.createHUD = createHUD;
  exports2.createHeading = createHeading;
  exports2.createInput = createInput;
  exports2.createMenu = createMenu;
  exports2.createParagraph = createParagraph;
  exports2.createPauseMenu = createPauseMenu;
  exports2.createSpacer = createSpacer;
  exports2.createStack = createStack;
  exports2.createText = createText;
  exports2.createVStack = createVStack;
  exports2.createZStack = createZStack;
  exports2.expandSpacingProps = expandSpacingProps;
  exports2.generateCSSVariables = generateCSSVariables;
  exports2.getToken = getToken;
  exports2.init = init;
  exports2.injectTokens = injectTokens;
  exports2.mergeStyles = mergeStyles;
  exports2.propsToStyle = propsToStyle;
  exports2.resolveColor = resolveColor;
  exports2.resolveRadius = resolveRadius;
  exports2.resolveShadow = resolveShadow;
  exports2.resolveSize = resolveSize;
  exports2.resolveSpacing = resolveSpacing;
  exports2.resolveToken = resolveToken;
  exports2.resolveTransition = resolveTransition;
  exports2.resolveZIndex = resolveZIndex;
  exports2.styleObjectToString = styleObjectToString;
  exports2.tokens = tokens;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=tangui.umd.js.map
