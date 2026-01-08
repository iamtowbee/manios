/**
 * Label - Form label component with accessibility
 * Supports nested controls and custom controls with htmlFor
 */

import { Box, type BoxProps } from '../core/Box';
import type { Component } from '../core/types';

export interface LabelProps extends Omit<BoxProps, 'as'> {
  htmlFor?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export class Label extends Box implements Component<LabelProps> {
  private requiredIndicator?: Box;

  constructor(props: LabelProps = {}) {
    const {
      htmlFor,
      required = false,
      size = 'md',
      children,
      ...restProps
    } = props;

    // Create label element
    super({
      ...restProps,
      as: 'label',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      fontSize: getSizeFontSize(size),
      fontWeight: 'medium',
      color: 'text',
      cursor: 'pointer',
      userSelect: 'none',
    });

    // Set htmlFor if provided
    if (htmlFor) {
      this.getElement().setAttribute('for', htmlFor);
    }

    // Add children
    if (children) {
      if (typeof children === 'string' || typeof children === 'number') {
        const text = document.createTextNode(String(children));
        this.appendChild(text as any);
      } else {
        this.appendChild(children as any);
      }
    }

    // Add required indicator
    if (required) {
      this.requiredIndicator = new Box({
        as: 'span',
        color: 'error',
        marginLeft: 1,
        fontSize: getSizeFontSize(size),
      });
      this.requiredIndicator.getElement().textContent = '*';
      this.requiredIndicator.getElement().setAttribute('aria-label', 'required');
      this.appendChild(this.requiredIndicator);
    }
  }

  public setHtmlFor(htmlFor: string): void {
    this.getElement().setAttribute('for', htmlFor);
  }

  public update(props: Partial<LabelProps>): void {
    if (props.htmlFor !== undefined) {
      this.setHtmlFor(props.htmlFor);
    }
    if (props.required !== undefined) {
      if (props.required && !this.requiredIndicator) {
        this.requiredIndicator = new Box({
          as: 'span',
          color: 'error',
          marginLeft: 1,
        });
        this.requiredIndicator.getElement().textContent = '*';
        this.requiredIndicator.getElement().setAttribute('aria-label', 'required');
        this.appendChild(this.requiredIndicator);
      } else if (!props.required && this.requiredIndicator) {
        this.requiredIndicator.remove();
        this.requiredIndicator = undefined;
      }
    }
  }
}

function getSizeFontSize(size: 'sm' | 'md' | 'lg'): string {
  const sizes = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
  };
  return sizes[size];
}
