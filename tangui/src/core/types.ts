/**
 * Core type definitions for TanGui
 * Inspired by Tamagui's type system
 */

export type SpaceValue = number | string | keyof typeof import('../themes/tokens').tokens.space;
export type SizeValue = number | string | 'auto' | 'full' | keyof typeof import('../themes/tokens').tokens.sizes;
export type ColorValue = string | keyof typeof import('../themes/tokens').tokens.colors;
export type RadiusValue = number | string | keyof typeof import('../themes/tokens').tokens.radii;

/**
 * Base style props available to all components
 */
export interface BaseStyleProps {
  // Layout
  display?: 'flex' | 'block' | 'inline' | 'inline-flex' | 'none' | 'grid';
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static';
  top?: SpaceValue;
  right?: SpaceValue;
  bottom?: SpaceValue;
  left?: SpaceValue;
  zIndex?: number | keyof typeof import('../themes/tokens').tokens.zIndices;

  // Flexbox
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flex?: number | string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: SizeValue;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: SpaceValue;
  rowGap?: SpaceValue;
  columnGap?: SpaceValue;

  // Grid
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumn?: string;
  gridRow?: string;
  gridArea?: string;
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';

  // Dimensions
  width?: SizeValue;
  height?: SizeValue;
  minWidth?: SizeValue;
  maxWidth?: SizeValue;
  minHeight?: SizeValue;
  maxHeight?: SizeValue;

  // Spacing (supports shorthand)
  padding?: SpaceValue;
  paddingTop?: SpaceValue;
  paddingRight?: SpaceValue;
  paddingBottom?: SpaceValue;
  paddingLeft?: SpaceValue;
  paddingX?: SpaceValue; // Shorthand for left + right
  paddingY?: SpaceValue; // Shorthand for top + bottom

  margin?: SpaceValue;
  marginTop?: SpaceValue;
  marginRight?: SpaceValue;
  marginBottom?: SpaceValue;
  marginLeft?: SpaceValue;
  marginX?: SpaceValue; // Shorthand for left + right
  marginY?: SpaceValue; // Shorthand for top + bottom

  // Background
  backgroundColor?: ColorValue;
  backgroundImage?: string;
  backgroundSize?: 'auto' | 'cover' | 'contain' | string;
  backgroundPosition?: string;
  backgroundRepeat?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
  backgroundAttachment?: 'scroll' | 'fixed' | 'local';

  // Border
  border?: string;
  borderWidth?: number | string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  borderColor?: ColorValue;
  borderRadius?: RadiusValue;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderTopWidth?: number | string;
  borderRightWidth?: number | string;
  borderBottomWidth?: number | string;
  borderLeftWidth?: number | string;

  // Effects
  opacity?: number;
  boxShadow?: string | keyof typeof import('../themes/tokens').tokens.shadows;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
  cursor?: 'auto' | 'pointer' | 'default' | 'move' | 'text' | 'wait' | 'not-allowed' | string;
  pointerEvents?: 'auto' | 'none';
  userSelect?: 'auto' | 'none' | 'text' | 'all';
  visibility?: 'visible' | 'hidden' | 'collapse';

  // Transform
  transform?: string;
  transformOrigin?: string;
  scale?: number;
  rotate?: string;
  translateX?: string;
  translateY?: string;

  // Transition & Animation
  transition?: string | keyof typeof import('../themes/tokens').tokens.transitions;
  transitionProperty?: string;
  transitionDuration?: string;
  transitionTimingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  transitionDelay?: string;

  animation?: string;
  animationName?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
  animationDelay?: string;
  animationIterationCount?: number | 'infinite';
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  animationPlayState?: 'running' | 'paused';
}

/**
 * Typography-specific style props
 */
export interface TextStyleProps extends BaseStyleProps {
  color?: ColorValue;
  fontSize?: number | string | keyof typeof import('../themes/tokens').tokens.fontSizes;
  fontFamily?: string | keyof typeof import('../themes/tokens').tokens.fonts;
  fontWeight?: number | 'normal' | 'bold' | 'bolder' | 'lighter' | keyof typeof import('../themes/tokens').tokens.fontWeights;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  lineHeight?: number | string | keyof typeof import('../themes/tokens').tokens.lineHeights;
  letterSpacing?: number | string | keyof typeof import('../themes/tokens').tokens.letterSpacings;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through';
  textShadow?: string;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  textOverflow?: 'clip' | 'ellipsis';
  verticalAlign?: 'baseline' | 'top' | 'middle' | 'bottom' | 'text-top' | 'text-bottom';
}

/**
 * Interactive event handlers
 */
export interface InteractiveProps {
  onClick?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  disabled?: boolean;
  tabIndex?: number;
}

/**
 * Variant system props
 */
export interface VariantProps {
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Component children types
 */
export type ComponentChildren =
  | string
  | number
  | HTMLElement
  | Component<any>
  | Array<string | number | HTMLElement | Component<any>>;

/**
 * Base component props combining all prop types
 */
export interface ComponentProps extends BaseStyleProps, InteractiveProps, VariantProps {
  children?: ComponentChildren;
  className?: string;
  id?: string;
  style?: Partial<CSSStyleDeclaration>;
  dataAttributes?: Record<string, string>;
}

/**
 * Generic component interface
 */
export interface Component<T = {}> {
  getElement(): HTMLElement;
  update(props: Partial<T>): void;
  appendTo(parent: HTMLElement | Component): void;
  remove(): void;
}

/**
 * Styled component props helper
 */
export type StyledProps<T = {}> = ComponentProps & T;

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  delay?: number;
  iterations?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

/**
 * Keyframe definition
 */
export interface Keyframe {
  [property: string]: string | number;
}

export type KeyframeDefinition = Record<string | number, Keyframe>;

/**
 * Theme configuration
 */
export interface ThemeConfig {
  colors: Record<string, string>;
  space: Record<string | number, string>;
  sizes: Record<string | number, string>;
  fonts: Record<string, string>;
  fontSizes: Record<string, string | number>;
  fontWeights: Record<string, number>;
  lineHeights: Record<string, number | string>;
  letterSpacings: Record<string, string>;
  radii: Record<string, string | number>;
  shadows: Record<string, string>;
  zIndices: Record<string, number>;
  transitions: Record<string, string>;
}
