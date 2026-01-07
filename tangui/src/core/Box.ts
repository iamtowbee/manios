/**
 * Box - The fundamental layout primitive
 * Similar to Tamagui's Stack but more flexible
 * Can be used for any layout pattern
 */

import type { ComponentProps, Component, ComponentChildren } from './types';
import { propsToStyle } from './styleEngine';

export interface BoxProps extends ComponentProps {
  as?: keyof HTMLElementTagNameMap;
}

export class Box implements Component<BoxProps> {
  private element: HTMLElement;
  private props: BoxProps;
  private eventListeners: Map<string, EventListener> = new Map();

  constructor(props: BoxProps = {}) {
    this.props = props;
    const tagName = props.as || 'div';
    this.element = document.createElement(tagName);
    this.applyProps(props);
  }

  private applyProps(props: BoxProps): void {
    // Apply styles
    const styleObj = propsToStyle(props);
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

    // Apply children
    if (props.children !== undefined) {
      this.setChildren(props.children);
    }

    // Apply event handlers
    this.applyEventHandlers(props);

    // Apply disabled state
    if (props.disabled && 'disabled' in this.element) {
      (this.element as any).disabled = true;
      this.element.setAttribute('aria-disabled', 'true');
    } else if ('disabled' in this.element) {
      (this.element as any).disabled = false;
      this.element.removeAttribute('aria-disabled');
    }

    // Apply tab index
    if (props.tabIndex !== undefined) {
      this.element.tabIndex = props.tabIndex;
    }

    // Apply custom inline styles (merged with props styles)
    if (props.style) {
      Object.assign(this.element.style, props.style);
    }
  }

  private applyEventHandlers(props: BoxProps): void {
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
      // It's a TanGui component
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
  public update(newProps: Partial<BoxProps>): void {
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
    // Clean up event listeners
    this.eventListeners.forEach((listener, event) => {
      this.element.removeEventListener(event, listener);
    });
    this.eventListeners.clear();

    // Remove element
    this.element.remove();
  }

  /**
   * Append child to this component
   */
  public appendChild(child: Component | HTMLElement): void {
    if ('getElement' in child && typeof child.getElement === 'function') {
      this.element.appendChild(child.getElement());
    } else {
      this.element.appendChild(child as HTMLElement);
    }
  }

  /**
   * Prepend child to this component
   */
  public prependChild(child: Component | HTMLElement): void {
    const childElement = 'getElement' in child && typeof child.getElement === 'function'
      ? child.getElement()
      : child as HTMLElement;

    if (this.element.firstChild) {
      this.element.insertBefore(childElement, this.element.firstChild);
    } else {
      this.element.appendChild(childElement);
    }
  }

  /**
   * Insert child before a reference node
   */
  public insertBefore(child: Component | HTMLElement, reference: Component | HTMLElement): void {
    const childElement = 'getElement' in child && typeof child.getElement === 'function'
      ? child.getElement()
      : child as HTMLElement;

    const refElement = 'getElement' in reference && typeof reference.getElement === 'function'
      ? reference.getElement()
      : reference as HTMLElement;

    this.element.insertBefore(childElement, refElement);
  }

  /**
   * Clear all children
   */
  public clearChildren(): void {
    this.element.innerHTML = '';
  }

  /**
   * Set HTML content (use with caution)
   */
  public setHTML(html: string): void {
    this.element.innerHTML = html;
  }

  /**
   * Get computed styles
   */
  public getComputedStyle(): CSSStyleDeclaration {
    return window.getComputedStyle(this.element);
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
   * Get attribute
   */
  public getAttribute(name: string): string | null {
    return this.element.getAttribute(name);
  }

  /**
   * Set attribute
   */
  public setAttribute(name: string, value: string): void {
    this.element.setAttribute(name, value);
  }

  /**
   * Remove attribute
   */
  public removeAttribute(name: string): void {
    this.element.removeAttribute(name);
  }

  /**
   * Get bounding client rect
   */
  public getBoundingClientRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  /**
   * Scroll into view
   */
  public scrollIntoView(options?: ScrollIntoViewOptions): void {
    this.element.scrollIntoView(options);
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

  /**
   * Check if element is visible in viewport
   */
  public isInViewport(): boolean {
    const rect = this.element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

/**
 * Factory function for creating Box components
 */
export function createBox(props?: BoxProps): Box {
  return new Box(props);
}
