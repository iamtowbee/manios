/**
 * Text - Typography component with pixel-perfect rendering
 * Optimized for pixel fonts and game UI
 */

import type { TextStyleProps, Component, ComponentChildren } from './types';
import { propsToStyle } from './styleEngine';
import { resolveToken } from '../themes/tokens';

export interface TextProps extends TextStyleProps {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div';
  children?: ComponentChildren;
  htmlFor?: string; // For label elements
  truncate?: boolean; // Enable text ellipsis
  selectable?: boolean; // Enable/disable text selection
}

export class Text implements Component<TextProps> {
  private element: HTMLElement;
  private props: TextProps;
  private eventListeners: Map<string, EventListener> = new Map();

  constructor(props: TextProps = {}) {
    this.props = props;
    const tagName = props.as || 'span';
    this.element = document.createElement(tagName);
    this.applyProps(props);
  }

  private applyProps(props: TextProps): void {
    // Apply base styles
    const styleObj = propsToStyle(props);

    // Add text-specific defaults
    if (!props.fontSize) {
      styleObj.fontSize = resolveToken('fontSizes', 'md');
    }
    if (!props.fontFamily) {
      styleObj.fontFamily = resolveToken('fonts', 'body');
    }
    if (!props.color) {
      styleObj.color = resolveToken('colors', 'text');
    }

    // Handle truncate
    if (props.truncate) {
      styleObj.overflow = 'hidden';
      styleObj.textOverflow = 'ellipsis';
      styleObj.whiteSpace = 'nowrap';
    }

    // Handle selectable
    if (props.selectable === false) {
      styleObj.userSelect = 'none';
    }

    // Pixel-perfect text rendering
    styleObj.textRendering = 'optimizeSpeed';
    styleObj.fontSmooth = 'never';
    styleObj.webkitFontSmoothing = 'none';

    Object.assign(this.element.style, styleObj);

    // Apply className
    if (props.className) {
      this.element.className = props.className;
    }

    // Apply ID
    if (props.id) {
      this.element.id = props.id;
    }

    // Apply data attributes
    if (props.dataAttributes) {
      Object.entries(props.dataAttributes).forEach(([key, value]) => {
        this.element.setAttribute(`data-${key}`, value);
      });
    }

    // Apply htmlFor for labels
    if (props.as === 'label' && props.htmlFor) {
      this.element.setAttribute('for', props.htmlFor);
    }

    // Apply children
    if (props.children !== undefined) {
      this.setChildren(props.children);
    }

    // Apply event handlers
    this.applyEventHandlers(props);

    // Apply disabled state
    if (props.disabled) {
      this.element.setAttribute('aria-disabled', 'true');
      this.element.style.opacity = '0.5';
      this.element.style.cursor = 'not-allowed';
    } else {
      this.element.removeAttribute('aria-disabled');
    }

    // Apply tab index
    if (props.tabIndex !== undefined) {
      this.element.tabIndex = props.tabIndex;
    }

    // Apply custom inline styles
    if (props.style) {
      Object.assign(this.element.style, props.style);
    }
  }

  private applyEventHandlers(props: TextProps): void {
    // Remove old listeners
    this.eventListeners.forEach((listener, event) => {
      this.element.removeEventListener(event, listener);
    });
    this.eventListeners.clear();

    // Add new listeners
    const events = [
      { prop: 'onClick', event: 'click' },
      { prop: 'onMouseEnter', event: 'mouseenter' },
      { prop: 'onMouseLeave', event: 'mouseleave' },
      { prop: 'onMouseDown', event: 'mousedown' },
      { prop: 'onMouseUp', event: 'mouseup' },
      { prop: 'onMouseMove', event: 'mousemove' },
      { prop: 'onFocus', event: 'focus' },
      { prop: 'onBlur', event: 'blur' },
      { prop: 'onKeyDown', event: 'keydown' },
      { prop: 'onKeyUp', event: 'keyup' },
      { prop: 'onKeyPress', event: 'keypress' },
    ] as const;

    events.forEach(({ prop, event }) => {
      const handler = props[prop];
      if (handler) {
        const listener = handler as EventListener;
        this.element.addEventListener(event, listener);
        this.eventListeners.set(event, listener);
      }
    });
  }

  private setChildren(children: ComponentChildren): void {
    // Clear existing children
    this.element.innerHTML = '';

    if (children === null || children === undefined) {
      return;
    }

    // Handle different types of children
    if (typeof children === 'string' || typeof children === 'number') {
      this.element.textContent = String(children);
    } else if (children instanceof HTMLElement) {
      this.element.appendChild(children);
    } else if ('getElement' in children && typeof children.getElement === 'function') {
      this.element.appendChild(children.getElement());
    } else if (Array.isArray(children)) {
      children.forEach(child => {
        if (child === null || child === undefined) {
          return;
        }

        if (typeof child === 'string' || typeof child === 'number') {
          this.element.appendChild(document.createTextNode(String(child)));
        } else if (child instanceof HTMLElement) {
          this.element.appendChild(child);
        } else if ('getElement' in child && typeof child.getElement === 'function') {
          this.element.appendChild(child.getElement());
        }
      });
    }
  }

  /**
   * Update component props
   */
  public update(newProps: Partial<TextProps>): void {
    this.props = { ...this.props, ...newProps };
    this.applyProps(this.props);
  }

  /**
   * Get the underlying DOM element
   */
  public getElement(): HTMLElement {
    return this.element;
  }

  /**
   * Append this component to a parent
   */
  public appendTo(parent: HTMLElement | Component): void {
    if ('getElement' in parent && typeof parent.getElement === 'function') {
      parent.getElement().appendChild(this.element);
    } else {
      (parent as HTMLElement).appendChild(this.element);
    }
  }

  /**
   * Remove from DOM
   */
  public remove(): void {
    this.eventListeners.forEach((listener, event) => {
      this.element.removeEventListener(event, listener);
    });
    this.eventListeners.clear();
    this.element.remove();
  }

  /**
   * Get text content
   */
  public getText(): string {
    return this.element.textContent || '';
  }

  /**
   * Set text content
   */
  public setText(text: string): void {
    this.element.textContent = text;
  }

  /**
   * Append text
   */
  public appendText(text: string): void {
    this.element.textContent += text;
  }

  /**
   * Add CSS class
   */
  public addClass(...classNames: string[]): void {
    this.element.classList.add(...classNames);
  }

  /**
   * Remove CSS class
   */
  public removeClass(...classNames: string[]): void {
    this.element.classList.remove(...classNames);
  }

  /**
   * Toggle CSS class
   */
  public toggleClass(className: string, force?: boolean): void {
    this.element.classList.toggle(className, force);
  }

  /**
   * Check if has CSS class
   */
  public hasClass(className: string): boolean {
    return this.element.classList.contains(className);
  }

  /**
   * Get computed styles
   */
  public getComputedStyle(): CSSStyleDeclaration {
    return window.getComputedStyle(this.element);
  }

  /**
   * Focus the element
   */
  public focus(): void {
    this.element.focus();
  }

  /**
   * Blur the element
   */
  public blur(): void {
    this.element.blur();
  }
}

/**
 * Factory function for creating Text components
 */
export function createText(props?: TextProps): Text {
  return new Text(props);
}

/**
 * Heading component (convenience wrapper)
 */
export function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6, props?: Omit<TextProps, 'as'>): Text {
  return new Text({
    ...props,
    as: `h${level}` as TextProps['as'],
    fontWeight: 'bold',
    fontSize: level === 1 ? '3xl' : level === 2 ? '2xl' : level === 3 ? 'xl' : level === 4 ? 'lg' : 'md',
    lineHeight: 'tight',
  });
}

/**
 * Paragraph component (convenience wrapper)
 */
export function createParagraph(props?: Omit<TextProps, 'as'>): Text {
  return new Text({
    ...props,
    as: 'p',
    lineHeight: 'normal',
  });
}
