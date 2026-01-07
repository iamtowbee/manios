/**
 * Stack - Flexbox layout primitive
 * Inspired by Tamagui's Stack component
 * Provides easy flex-based layouts with sensible defaults
 */

import { Box, type BoxProps } from './Box';
import type { Component } from './types';

export interface StackProps extends Omit<BoxProps, 'display' | 'flexDirection'> {
  direction?: 'horizontal' | 'vertical' | 'row' | 'column';
  spacing?: BoxProps['gap'];
  align?: BoxProps['alignItems'];
  justify?: BoxProps['justifyContent'];
  wrap?: BoxProps['flexWrap'];
  reverse?: boolean;
}

/**
 * Base Stack class
 */
export class Stack extends Box implements Component<StackProps> {
  constructor(props: StackProps = {}) {
    const {
      direction = 'vertical',
      spacing,
      align,
      justify,
      wrap,
      reverse = false,
      ...restProps
    } = props;

    // Map direction to flexDirection
    let flexDirection: BoxProps['flexDirection'];
    if (direction === 'horizontal' || direction === 'row') {
      flexDirection = reverse ? 'row-reverse' : 'row';
    } else {
      flexDirection = reverse ? 'column-reverse' : 'column';
    }

    // Construct Box props
    const boxProps: BoxProps = {
      ...restProps,
      display: 'flex',
      flexDirection,
      gap: spacing,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
    };

    super(boxProps);
  }
}

/**
 * VStack - Vertical stack (convenience wrapper)
 */
export class VStack extends Stack {
  constructor(props: Omit<StackProps, 'direction'> = {}) {
    super({ ...props, direction: 'vertical' });
  }
}

/**
 * HStack - Horizontal stack (convenience wrapper)
 */
export class HStack extends Stack {
  constructor(props: Omit<StackProps, 'direction'> = {}) {
    super({ ...props, direction: 'horizontal' });
  }
}

/**
 * ZStack - Stack items on top of each other (using position: relative/absolute)
 */
export class ZStack extends Box {
  constructor(props: Omit<BoxProps, 'position'> = {}) {
    super({
      ...props,
      position: 'relative',
    });
  }

  /**
   * Override appendChild to automatically position children absolutely
   */
  public override appendChild(child: Component | HTMLElement): void {
    const childElement = 'getElement' in child && typeof child.getElement === 'function'
      ? child.getElement()
      : child as HTMLElement;

    // Apply absolute positioning to children
    childElement.style.position = 'absolute';
    childElement.style.top = '0';
    childElement.style.left = '0';

    super.appendChild(child);
  }
}

/**
 * Center - Centers content both horizontally and vertically
 */
export class Center extends Stack {
  constructor(props: Omit<StackProps, 'align' | 'justify'> = {}) {
    super({
      ...props,
      align: 'center',
      justify: 'center',
    });
  }
}

/**
 * Spacer - Flexible space component
 */
export class Spacer extends Box {
  constructor(props: Omit<BoxProps, 'flex'> = {}) {
    super({
      ...props,
      flex: 1,
    });
  }
}

// Factory functions
export function createStack(props?: StackProps): Stack {
  return new Stack(props);
}

export function createVStack(props?: Omit<StackProps, 'direction'>): VStack {
  return new VStack(props);
}

export function createHStack(props?: Omit<StackProps, 'direction'>): HStack {
  return new HStack(props);
}

export function createZStack(props?: Omit<BoxProps, 'position'>): ZStack {
  return new ZStack(props);
}

export function createCenter(props?: Omit<StackProps, 'align' | 'justify'>): Center {
  return new Center(props);
}

export function createSpacer(props?: Omit<BoxProps, 'flex'>): Spacer {
  return new Spacer(props);
}
