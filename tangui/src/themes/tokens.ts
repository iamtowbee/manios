/**
 * Design Tokens for TanGui
 * Comprehensive token system inspired by Tamagui
 * Optimized for pixel art games and retro aesthetics
 */

import type { ThemeConfig } from '../core/types';

export const tokens: ThemeConfig = {
  /**
   * Color palette - pixel art game optimized
   */
  colors: {
    // Brand colors
    primary: '#FFD700',
    primaryDark: '#CC9900',
    primaryLight: '#FFED4E',

    secondary: '#667EEA',
    secondaryDark: '#4C63D2',
    secondaryLight: '#8094F0',

    accent: '#E91E63',
    accentDark: '#C2185B',
    accentLight: '#F06292',

    // Backgrounds
    background: '#1A1A2E',
    backgroundLight: '#2D3561',
    backgroundDark: '#0F0F1E',

    surface: '#16213E',
    surfaceLight: '#1F2F4E',
    surfaceDark: '#0D1628',

    // Text
    text: '#FFFFFF',
    textSecondary: '#B8C1EC',
    textMuted: '#6B7CB8',
    textDisabled: '#4A5578',
    textInverse: '#1A1A2E',

    // Semantic colors
    success: '#2ECC71',
    successDark: '#27AE60',
    successLight: '#58D68D',

    warning: '#F39C12',
    warningDark: '#E67E22',
    warningLight: '#F8C471',

    error: '#E74C3C',
    errorDark: '#C0392B',
    errorLight: '#EC7063',

    info: '#3498DB',
    infoDark: '#2980B9',
    infoLight: '#5DADE2',

    // Grayscale
    black: '#000000',
    white: '#FFFFFF',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray300: '#D4D4D4',
    gray400: '#A3A3A3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',

    // Special
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
    overlayDark: 'rgba(0, 0, 0, 0.85)',

    // Game-specific
    healthGreen: '#2ECC71',
    healthYellow: '#F39C12',
    healthRed: '#E74C3C',
    manaBlue: '#3498DB',
    expPurple: '#9B59B6',
    goldYellow: '#FFD700',
  },

  /**
   * Spacing scale - 4px base unit
   */
  space: {
    0: '0px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
  },

  /**
   * Size scale
   */
  sizes: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
    full: '100%',
    screen: '100vh',
    screenW: '100vw',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },

  /**
   * Font families
   */
  fonts: {
    body: '"Press Start 2P", "Courier New", monospace',
    heading: '"Press Start 2P", "Courier New", monospace',
    mono: '"Courier New", "Consolas", monospace',
    pixel: '"Press Start 2P", monospace',
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  /**
   * Font sizes - pixel font optimized
   */
  fontSizes: {
    xs: '8px',
    sm: '10px',
    md: '12px',
    base: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '30px',
    '5xl': '36px',
    '6xl': '48px',
    '7xl': '60px',
    '8xl': '72px',
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
    black: 900,
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
    '3': 0.75,
    '4': 1,
    '5': 1.25,
    '6': 1.5,
    '7': 1.75,
    '8': 2,
    '9': 2.25,
    '10': 2.5,
  },

  /**
   * Letter spacings
   */
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  /**
   * Border radii - pixel art style
   */
  radii: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
    square: '0px',
  },

  /**
   * Shadows - pixel art optimized
   */
  shadows: {
    none: 'none',
    sm: '2px 2px 0px rgba(0, 0, 0, 0.5)',
    md: '4px 4px 0px rgba(0, 0, 0, 0.5)',
    lg: '6px 6px 0px rgba(0, 0, 0, 0.6)',
    xl: '8px 8px 0px rgba(0, 0, 0, 0.7)',
    '2xl': '12px 12px 0px rgba(0, 0, 0, 0.7)',
    inner: 'inset 2px 2px 4px rgba(0, 0, 0, 0.4)',
    outline: '0 0 0 3px rgba(255, 215, 0, 0.5)',
    glow: '0 0 10px currentColor',
    glowLg: '0 0 20px currentColor',
    glowXl: '0 0 30px currentColor',

    // Colored glows for game effects
    glowPrimary: '0 0 15px rgba(255, 215, 0, 0.8)',
    glowSuccess: '0 0 15px rgba(46, 204, 113, 0.8)',
    glowError: '0 0 15px rgba(231, 76, 60, 0.8)',
    glowInfo: '0 0 15px rgba(52, 152, 219, 0.8)',
  },

  /**
   * Z-index scale
   */
  zIndices: {
    hide: -1,
    auto: 0,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  /**
   * Transitions - game-optimized timing
   */
  transitions: {
    fast: 'all 0.1s ease',
    base: 'all 0.15s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease',
    slower: 'all 0.5s ease',

    // Specific transitions
    fadeIn: 'opacity 0.2s ease-in',
    fadeOut: 'opacity 0.2s ease-out',
    slideIn: 'transform 0.3s ease-out',
    slideOut: 'transform 0.3s ease-in',
    scaleIn: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    scaleOut: 'transform 0.2s ease-in',
  },
};

/**
 * Helper function to get token value
 */
export function getToken<
  Category extends keyof ThemeConfig,
  Key extends keyof ThemeConfig[Category]
>(category: Category, key: Key): ThemeConfig[Category][Key] {
  return tokens[category][key];
}

/**
 * Helper to resolve token or return value
 */
export function resolveToken<Category extends keyof ThemeConfig>(
  category: Category,
  value: string | number
): any {
  if (typeof value === 'string' && value in tokens[category]) {
    return tokens[category][value as keyof ThemeConfig[Category]];
  }
  return value;
}

/**
 * Generate CSS custom properties from tokens
 */
export function generateCSSVariables(): string {
  const vars: string[] = [];

  // Colors
  Object.entries(tokens.colors).forEach(([key, value]) => {
    vars.push(`--tangui-color-${key}: ${value};`);
  });

  // Spacing
  Object.entries(tokens.space).forEach(([key, value]) => {
    vars.push(`--tangui-space-${key}: ${value};`);
  });

  // Font sizes
  Object.entries(tokens.fontSizes).forEach(([key, value]) => {
    vars.push(`--tangui-fontSize-${key}: ${value};`);
  });

  // Radii
  Object.entries(tokens.radii).forEach(([key, value]) => {
    vars.push(`--tangui-radius-${key}: ${value};`);
  });

  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    vars.push(`--tangui-shadow-${key}: ${value};`);
  });

  return `:root {\n  ${vars.join('\n  ')}\n}`;
}

/**
 * Inject CSS variables into document
 */
export function injectTokens(): void {
  const style = document.createElement('style');
  style.textContent = generateCSSVariables();
  document.head.appendChild(style);
}
