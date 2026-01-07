/**
 * Card - Container component with elevation and styling
 * Perfect for game panels and info displays
 */

import { Box, type BoxProps } from '../core/Box';
import type { Component } from '../core/types';

export interface CardProps extends Omit<BoxProps, 'as'> {
  variant?: 'elevated' | 'outlined' | 'filled';
  hover?: boolean;
  clickable?: boolean;
}

export class Card extends Box implements Component<CardProps> {
  constructor(props: CardProps = {}) {
    const {
      variant = 'elevated',
      hover = false,
      clickable = false,
      ...restProps
    } = props;

    super({
      ...restProps,
      borderRadius: 'lg',
      overflow: 'hidden',
      transition: 'normal',
      cursor: clickable ? 'pointer' : restProps.cursor,
      ...getVariantStyles(variant),
    });

    if (hover || clickable) {
      this.addHoverEffect(variant);
    }
  }

  private addHoverEffect(variant: CardProps['variant']): void {
    const element = this.getElement();

    element.addEventListener('mouseenter', () => {
      const hoverStyles = getHoverStyles(variant || 'elevated');
      Object.assign(element.style, hoverStyles);
    });

    element.addEventListener('mouseleave', () => {
      const variantStyles = getVariantStyles(variant || 'elevated');
      Object.assign(element.style, variantStyles);
    });
  }
}

/**
 * Get variant styles
 */
function getVariantStyles(variant: CardProps['variant']): Partial<BoxProps> {
  const variants = {
    elevated: {
      backgroundColor: 'surface',
      boxShadow: 'md',
      borderWidth: 0,
    },
    outlined: {
      backgroundColor: 'surface',
      borderWidth: 2,
      borderStyle: 'solid' as const,
      borderColor: 'surfaceLight',
      boxShadow: 'none',
    },
    filled: {
      backgroundColor: 'surfaceLight',
      borderWidth: 0,
      boxShadow: 'none',
    },
  };

  return variants[variant || 'elevated'];
}

/**
 * Get hover styles
 */
function getHoverStyles(variant: CardProps['variant']): Record<string, string> {
  const { tokens } = require('../themes/tokens');

  const hoverVariants = {
    elevated: {
      transform: 'translateY(-4px)',
      boxShadow: tokens.shadows.lg,
    },
    outlined: {
      borderColor: tokens.colors.primary,
      boxShadow: tokens.shadows.outline,
    },
    filled: {
      backgroundColor: tokens.colors.surfaceDark,
    },
  };

  return hoverVariants[variant || 'elevated'];
}

/**
 * CardHeader - Header section of a card
 */
export class CardHeader extends Box {
  constructor(props: Omit<BoxProps, 'as'> = {}) {
    super({
      ...props,
      padding: 4,
      borderBottom: `2px solid`,
      borderColor: 'surfaceLight',
    });
  }
}

/**
 * CardBody - Body section of a card
 */
export class CardBody extends Box {
  constructor(props: Omit<BoxProps, 'as'> = {}) {
    super({
      ...props,
      padding: 4,
    });
  }
}

/**
 * CardFooter - Footer section of a card
 */
export class CardFooter extends Box {
  constructor(props: Omit<BoxProps, 'as'> = {}) {
    super({
      ...props,
      padding: 4,
      borderTop: `2px solid`,
      borderColor: 'surfaceLight',
    });
  }
}

// Factory functions
export function createCard(props?: CardProps): Card {
  return new Card(props);
}

export function createCardHeader(props?: Omit<BoxProps, 'as'>): CardHeader {
  return new CardHeader(props);
}

export function createCardBody(props?: Omit<BoxProps, 'as'>): CardBody {
  return new CardBody(props);
}

export function createCardFooter(props?: Omit<BoxProps, 'as'>): CardFooter {
  return new CardFooter(props);
}
