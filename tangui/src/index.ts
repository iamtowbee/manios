/**
 * TanGui - Game-focused UI library
 * Inspired by Tamagui
 *
 * @module @curds/tangui
 */

// Core primitives and utilities
export * from './core';

// Theme system
export * from './themes';

// Version
export const VERSION = '0.1.0';

/**
 * Initialize TanGui
 * Call this once at the start of your application
 */
export function init(): void {
  // Inject design tokens as CSS variables
  const { injectTokens } = require('./themes');
  injectTokens();

  // Add pixel-perfect rendering styles
  const style = document.createElement('style');
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
