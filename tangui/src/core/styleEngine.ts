/**
 * Style Engine - Processes and applies styles to DOM elements
 * Inspired by Tamagui's style system
 */

import type { BaseStyleProps, SpaceValue, SizeValue, ColorValue, RadiusValue } from './types';
import { resolveToken, tokens } from '../themes/tokens';

type StyleObject = Record<string, string | number>;

/**
 * Expand shorthand spacing props (paddingX, marginY, etc.)
 */
export function expandSpacingProps(props: BaseStyleProps): BaseStyleProps {
  const expanded = { ...props };

  // Padding shorthands
  if (props.paddingX !== undefined) {
    expanded.paddingLeft = props.paddingX;
    expanded.paddingRight = props.paddingX;
    delete expanded.paddingX;
  }

  if (props.paddingY !== undefined) {
    expanded.paddingTop = props.paddingY;
    expanded.paddingBottom = props.paddingY;
    delete expanded.paddingY;
  }

  // Margin shorthands
  if (props.marginX !== undefined) {
    expanded.marginLeft = props.marginX;
    expanded.marginRight = props.marginX;
    delete expanded.marginX;
  }

  if (props.marginY !== undefined) {
    expanded.marginTop = props.marginY;
    expanded.marginBottom = props.marginY;
    delete expanded.marginY;
  }

  return expanded;
}

/**
 * Resolve spacing value to CSS string
 */
export function resolveSpacing(value: SpaceValue): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  // Check if it's a token key
  const resolved = resolveToken('space', value);
  if (resolved !== value) {
    return resolved as string;
  }

  return value;
}

/**
 * Resolve size value to CSS string
 */
export function resolveSize(value: SizeValue): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  // Handle special keywords
  if (value === 'auto') return 'auto';
  if (value === 'full') return '100%';

  // Check if it's a token key
  const resolved = resolveToken('sizes', value);
  if (resolved !== value) {
    return resolved as string;
  }

  return value;
}

/**
 * Resolve color value to CSS string
 */
export function resolveColor(value: ColorValue): string {
  // Check if it's a token key
  const resolved = resolveToken('colors', value);
  if (resolved !== value) {
    return resolved as string;
  }

  return value;
}

/**
 * Resolve radius value to CSS string
 */
export function resolveRadius(value: RadiusValue): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  // Check if it's a token key
  const resolved = resolveToken('radii', value);
  if (resolved !== value) {
    return resolved as string;
  }

  return value;
}

/**
 * Resolve z-index value
 */
export function resolveZIndex(value: number | string): number | string {
  if (typeof value === 'number') {
    return value;
  }

  // Check if it's a token key
  const resolved = resolveToken('zIndices', value);
  if (resolved !== value) {
    return resolved as number;
  }

  return value;
}

/**
 * Resolve shadow value
 */
export function resolveShadow(value: string): string {
  // Check if it's a token key
  const resolved = resolveToken('shadows', value);
  if (resolved !== value) {
    return resolved as string;
  }

  return value;
}

/**
 * Resolve transition value
 */
export function resolveTransition(value: string): string {
  // Check if it's a token key
  const resolved = resolveToken('transitions', value);
  if (resolved !== value) {
    return resolved as string;
  }

  return value;
}

/**
 * Convert style props to CSS style object
 */
export function propsToStyle(props: BaseStyleProps): StyleObject {
  const expanded = expandSpacingProps(props);
  const style: StyleObject = {};

  // Layout
  if (expanded.display) style.display = expanded.display;
  if (expanded.position) style.position = expanded.position;
  if (expanded.top !== undefined) style.top = resolveSpacing(expanded.top);
  if (expanded.right !== undefined) style.right = resolveSpacing(expanded.right);
  if (expanded.bottom !== undefined) style.bottom = resolveSpacing(expanded.bottom);
  if (expanded.left !== undefined) style.left = resolveSpacing(expanded.left);
  if (expanded.zIndex !== undefined) style.zIndex = resolveZIndex(expanded.zIndex);

  // Flexbox
  if (expanded.flexDirection) style.flexDirection = expanded.flexDirection;
  if (expanded.justifyContent) style.justifyContent = expanded.justifyContent;
  if (expanded.alignItems) style.alignItems = expanded.alignItems;
  if (expanded.alignSelf) style.alignSelf = expanded.alignSelf;
  if (expanded.flex !== undefined) style.flex = expanded.flex;
  if (expanded.flexGrow !== undefined) style.flexGrow = expanded.flexGrow;
  if (expanded.flexShrink !== undefined) style.flexShrink = expanded.flexShrink;
  if (expanded.flexBasis !== undefined) style.flexBasis = resolveSize(expanded.flexBasis);
  if (expanded.flexWrap) style.flexWrap = expanded.flexWrap;
  if (expanded.gap !== undefined) style.gap = resolveSpacing(expanded.gap);
  if (expanded.rowGap !== undefined) style.rowGap = resolveSpacing(expanded.rowGap);
  if (expanded.columnGap !== undefined) style.columnGap = resolveSpacing(expanded.columnGap);

  // Grid
  if (expanded.gridTemplateColumns) style.gridTemplateColumns = expanded.gridTemplateColumns;
  if (expanded.gridTemplateRows) style.gridTemplateRows = expanded.gridTemplateRows;
  if (expanded.gridColumn) style.gridColumn = expanded.gridColumn;
  if (expanded.gridRow) style.gridRow = expanded.gridRow;
  if (expanded.gridArea) style.gridArea = expanded.gridArea;
  if (expanded.gridAutoFlow) style.gridAutoFlow = expanded.gridAutoFlow;

  // Dimensions
  if (expanded.width !== undefined) style.width = resolveSize(expanded.width);
  if (expanded.height !== undefined) style.height = resolveSize(expanded.height);
  if (expanded.minWidth !== undefined) style.minWidth = resolveSize(expanded.minWidth);
  if (expanded.maxWidth !== undefined) style.maxWidth = resolveSize(expanded.maxWidth);
  if (expanded.minHeight !== undefined) style.minHeight = resolveSize(expanded.minHeight);
  if (expanded.maxHeight !== undefined) style.maxHeight = resolveSize(expanded.maxHeight);

  // Spacing - Padding
  if (expanded.padding !== undefined) style.padding = resolveSpacing(expanded.padding);
  if (expanded.paddingTop !== undefined) style.paddingTop = resolveSpacing(expanded.paddingTop);
  if (expanded.paddingRight !== undefined) style.paddingRight = resolveSpacing(expanded.paddingRight);
  if (expanded.paddingBottom !== undefined) style.paddingBottom = resolveSpacing(expanded.paddingBottom);
  if (expanded.paddingLeft !== undefined) style.paddingLeft = resolveSpacing(expanded.paddingLeft);

  // Spacing - Margin
  if (expanded.margin !== undefined) style.margin = resolveSpacing(expanded.margin);
  if (expanded.marginTop !== undefined) style.marginTop = resolveSpacing(expanded.marginTop);
  if (expanded.marginRight !== undefined) style.marginRight = resolveSpacing(expanded.marginRight);
  if (expanded.marginBottom !== undefined) style.marginBottom = resolveSpacing(expanded.marginBottom);
  if (expanded.marginLeft !== undefined) style.marginLeft = resolveSpacing(expanded.marginLeft);

  // Background
  if (expanded.backgroundColor) style.backgroundColor = resolveColor(expanded.backgroundColor);
  if (expanded.backgroundImage) style.backgroundImage = expanded.backgroundImage;
  if (expanded.backgroundSize) style.backgroundSize = expanded.backgroundSize;
  if (expanded.backgroundPosition) style.backgroundPosition = expanded.backgroundPosition;
  if (expanded.backgroundRepeat) style.backgroundRepeat = expanded.backgroundRepeat;
  if (expanded.backgroundAttachment) style.backgroundAttachment = expanded.backgroundAttachment;

  // Border
  if (expanded.border) style.border = expanded.border;
  if (expanded.borderWidth !== undefined) {
    style.borderWidth = typeof expanded.borderWidth === 'number'
      ? `${expanded.borderWidth}px`
      : expanded.borderWidth;
  }
  if (expanded.borderStyle) style.borderStyle = expanded.borderStyle;
  if (expanded.borderColor) style.borderColor = resolveColor(expanded.borderColor);
  if (expanded.borderRadius !== undefined) style.borderRadius = resolveRadius(expanded.borderRadius);
  if (expanded.borderTop) style.borderTop = expanded.borderTop;
  if (expanded.borderRight) style.borderRight = expanded.borderRight;
  if (expanded.borderBottom) style.borderBottom = expanded.borderBottom;
  if (expanded.borderLeft) style.borderLeft = expanded.borderLeft;

  if (expanded.borderTopWidth !== undefined) {
    style.borderTopWidth = typeof expanded.borderTopWidth === 'number'
      ? `${expanded.borderTopWidth}px`
      : expanded.borderTopWidth;
  }
  if (expanded.borderRightWidth !== undefined) {
    style.borderRightWidth = typeof expanded.borderRightWidth === 'number'
      ? `${expanded.borderRightWidth}px`
      : expanded.borderRightWidth;
  }
  if (expanded.borderBottomWidth !== undefined) {
    style.borderBottomWidth = typeof expanded.borderBottomWidth === 'number'
      ? `${expanded.borderBottomWidth}px`
      : expanded.borderBottomWidth;
  }
  if (expanded.borderLeftWidth !== undefined) {
    style.borderLeftWidth = typeof expanded.borderLeftWidth === 'number'
      ? `${expanded.borderLeftWidth}px`
      : expanded.borderLeftWidth;
  }

  // Effects
  if (expanded.opacity !== undefined) style.opacity = expanded.opacity;
  if (expanded.boxShadow) style.boxShadow = resolveShadow(expanded.boxShadow);
  if (expanded.overflow) style.overflow = expanded.overflow;
  if (expanded.overflowX) style.overflowX = expanded.overflowX;
  if (expanded.overflowY) style.overflowY = expanded.overflowY;
  if (expanded.cursor) style.cursor = expanded.cursor;
  if (expanded.pointerEvents) style.pointerEvents = expanded.pointerEvents;
  if (expanded.userSelect) style.userSelect = expanded.userSelect;
  if (expanded.visibility) style.visibility = expanded.visibility;

  // Transform
  if (expanded.transform) style.transform = expanded.transform;
  if (expanded.transformOrigin) style.transformOrigin = expanded.transformOrigin;
  if (expanded.scale !== undefined) style.transform = `scale(${expanded.scale})`;
  if (expanded.rotate) style.transform = `rotate(${expanded.rotate})`;
  if (expanded.translateX) {
    const current = style.transform as string || '';
    style.transform = `${current} translateX(${expanded.translateX})`.trim();
  }
  if (expanded.translateY) {
    const current = style.transform as string || '';
    style.transform = `${current} translateY(${expanded.translateY})`.trim();
  }

  // Transition
  if (expanded.transition) style.transition = resolveTransition(expanded.transition);
  if (expanded.transitionProperty) style.transitionProperty = expanded.transitionProperty;
  if (expanded.transitionDuration) style.transitionDuration = expanded.transitionDuration;
  if (expanded.transitionTimingFunction) style.transitionTimingFunction = expanded.transitionTimingFunction;
  if (expanded.transitionDelay) style.transitionDelay = expanded.transitionDelay;

  // Animation
  if (expanded.animation) style.animation = expanded.animation;
  if (expanded.animationName) style.animationName = expanded.animationName;
  if (expanded.animationDuration) style.animationDuration = expanded.animationDuration;
  if (expanded.animationTimingFunction) style.animationTimingFunction = expanded.animationTimingFunction;
  if (expanded.animationDelay) style.animationDelay = expanded.animationDelay;
  if (expanded.animationIterationCount !== undefined) {
    style.animationIterationCount = expanded.animationIterationCount;
  }
  if (expanded.animationDirection) style.animationDirection = expanded.animationDirection;
  if (expanded.animationFillMode) style.animationFillMode = expanded.animationFillMode;
  if (expanded.animationPlayState) style.animationPlayState = expanded.animationPlayState;

  return style;
}

/**
 * Merge multiple style objects (later styles override earlier ones)
 */
export function mergeStyles(...styles: StyleObject[]): StyleObject {
  return Object.assign({}, ...styles);
}

/**
 * Convert style object to inline CSS string
 */
export function styleObjectToString(style: StyleObject): string {
  return Object.entries(style)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
}

/**
 * Apply styles directly to a DOM element
 */
export function applyStylesToElement(element: HTMLElement, props: BaseStyleProps): void {
  const styles = propsToStyle(props);
  Object.assign(element.style, styles);
}
