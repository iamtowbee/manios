/**
 * Input - Text input component with pixel-art styling
 * Supports various input types and validation states
 */

import { Box, type BoxProps } from '../core/Box';
import type { Component } from '../core/types';
import { tokens } from '../themes/tokens';

export interface InputProps extends Omit<BoxProps, 'as' | 'children'> {
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string, event: Event) => void;
  onInput?: (value: string, event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  leftAddon?: Component | HTMLElement;
  rightAddon?: Component | HTMLElement;
}

export class Input extends Box implements Component<InputProps> {
  private inputElement: HTMLInputElement;
  private container: Box;

  constructor(props: InputProps = {}) {
    const {
      type = 'text',
      placeholder,
      value,
      defaultValue,
      size = 'md',
      variant = 'outline',
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

    // Create wrapper
    super({
      ...restProps,
      display: 'inline-flex',
      position: 'relative',
      width: restProps.width || 'full',
    });

    // Create input container
    this.container = new Box({
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      transition: 'fast',
      ...getVariantStyles(variant, error, success),
      ...getSizeStyles(size),
    });

    // Add left addon
    if (leftAddon) {
      this.container.appendChild(leftAddon);
    }

    // Create input element
    this.inputElement = document.createElement('input');
    this.inputElement.type = type;
    if (placeholder) this.inputElement.placeholder = placeholder;
    if (value !== undefined) this.inputElement.value = value;
    if (defaultValue) this.inputElement.defaultValue = defaultValue;
    if (maxLength) this.inputElement.maxLength = maxLength;
    if (required) this.inputElement.required = true;
    if (autoFocus) this.inputElement.autofocus = true;
    this.inputElement.disabled = disabled;
    this.inputElement.readOnly = readOnly;

    // Style input element
    Object.assign(this.inputElement.style, {
      flex: '1',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: tokens.colors.text,
      fontSize: 'inherit',
      fontFamily: tokens.fonts.body,
      padding: '0',
      margin: '0',
    });

    // Add event listeners
    if (onChange) {
      this.inputElement.addEventListener('change', (e) => {
        onChange(this.inputElement.value, e);
      });
    }

    if (onInput) {
      this.inputElement.addEventListener('input', (e) => {
        onInput(this.inputElement.value, e);
      });
    }

    if (onFocus) {
      this.inputElement.addEventListener('focus', onFocus);
    }

    if (onBlur) {
      this.inputElement.addEventListener('blur', onBlur);
    }

    if (onKeyDown) {
      this.inputElement.addEventListener('keydown', onKeyDown);
    }

    if (onKeyUp) {
      this.inputElement.addEventListener('keyup', onKeyUp);
    }

    // Add focus effects
    this.addFocusEffect(variant, error, success);

    // Add input to container
    this.container.getElement().appendChild(this.inputElement);

    // Add right addon
    if (rightAddon) {
      this.container.appendChild(rightAddon);
    }

    // Add container to wrapper
    super.appendChild(this.container);
  }

  private addFocusEffect(
    variant: InputProps['variant'],
    error: boolean,
    success: boolean
  ): void {
    this.inputElement.addEventListener('focus', () => {
      const focusStyles = getFocusStyles(variant || 'outline', error, success);
      Object.assign(this.container.getElement().style, focusStyles);
    });

    this.inputElement.addEventListener('blur', () => {
      const variantStyles = getVariantStyles(variant || 'outline', error, success);
      Object.assign(this.container.getElement().style, variantStyles);
    });
  }

  /**
   * Get input value
   */
  public getValue(): string {
    return this.inputElement.value;
  }

  /**
   * Set input value
   */
  public setValue(value: string): void {
    this.inputElement.value = value;
  }

  /**
   * Clear input
   */
  public clear(): void {
    this.inputElement.value = '';
  }

  /**
   * Focus input
   */
  public override focus(): void {
    this.inputElement.focus();
  }

  /**
   * Blur input
   */
  public override blur(): void {
    this.inputElement.blur();
  }

  /**
   * Select input text
   */
  public select(): void {
    this.inputElement.select();
  }

  /**
   * Get native input element
   */
  public getInputElement(): HTMLInputElement {
    return this.inputElement;
  }
}

/**
 * Get variant styles
 */
function getVariantStyles(
  variant: InputProps['variant'],
  error: boolean,
  success: boolean
): Partial<BoxProps> {
  let borderColor = 'surfaceLight';

  if (error) {
    borderColor = 'error';
  } else if (success) {
    borderColor = 'success';
  }

  if (variant === 'filled') {
    return {
      backgroundColor: 'surface',
      borderWidth: 2,
      borderStyle: 'solid' as const,
      borderColor: error ? 'error' : success ? 'success' : 'transparent',
      borderRadius: 'md',
    };
  }

  // outline variant (default)
  return {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'solid' as const,
    borderColor,
    borderRadius: 'md',
  };
}

/**
 * Get focus styles
 */
function getFocusStyles(
  variant: InputProps['variant'],
  error: boolean,
  success: boolean
): Record<string, string> {
  let borderColor = tokens.colors.primary;

  if (error) {
    borderColor = tokens.colors.error;
  } else if (success) {
    borderColor = tokens.colors.success;
  }

  return {
    borderColor,
    boxShadow: `0 0 0 3px ${borderColor}33`,
  };
}

/**
 * Get size styles
 */
function getSizeStyles(size: InputProps['size']): Partial<BoxProps> {
  const sizes = {
    sm: {
      paddingX: 2,
      paddingY: 1,
      fontSize: 'sm',
    },
    md: {
      paddingX: 3,
      paddingY: 2,
      fontSize: 'md',
    },
    lg: {
      paddingX: 4,
      paddingY: 3,
      fontSize: 'lg',
    },
  };

  return sizes[size || 'md'];
}

/**
 * Factory function
 */
export function createInput(props?: InputProps): Input {
  return new Input(props);
}
