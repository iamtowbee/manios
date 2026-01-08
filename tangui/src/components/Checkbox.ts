/**
 * Checkbox - Checkbox input component
 * Accessible, supports indeterminate state, fully customizable
 */

import { Box, type BoxProps } from '../core/Box';
import { tokens } from '../themes/tokens';
import type { Component } from '../core/types';

export interface CheckboxProps extends Omit<BoxProps, 'as' | 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  required?: boolean;
  label?: string;
}

export class Checkbox extends Box implements Component<CheckboxProps> {
  private input: HTMLInputElement;
  private checkboxBox: Box;
  private checkmark: Box;
  private isControlled: boolean;
  private internalChecked: boolean;
  private internalIndeterminate: boolean;
  private changeCallback?: (checked: boolean) => void;
  private labelText?: Box;

  constructor(props: CheckboxProps = {}) {
    const {
      checked,
      defaultChecked = false,
      indeterminate = false,
      disabled = false,
      size = 'md',
      onChange,
      name,
      value,
      required = false,
      label,
      ...restProps
    } = props;

    // Determine if controlled
    const isControlled = checked !== undefined;
    const initialChecked = isControlled ? checked : defaultChecked;

    // Create container
    super({
      ...restProps,
      as: 'label',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none',
    });

    this.isControlled = isControlled;
    this.internalChecked = initialChecked;
    this.internalIndeterminate = indeterminate;
    this.changeCallback = onChange;

    // Hidden native input for accessibility
    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.checked = initialChecked;
    this.input.indeterminate = indeterminate;
    this.input.disabled = disabled;
    if (name) this.input.name = name;
    if (value) this.input.value = value;
    if (required) this.input.required = required;

    // Visually hide input
    Object.assign(this.input.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: '0',
    });

    this.getElement().appendChild(this.input);

    // Get size
    const boxSize = getSizeValue(size);

    // Create checkbox box
    this.checkboxBox = new Box({
      position: 'relative',
      width: boxSize,
      height: boxSize,
      backgroundColor: initialChecked || indeterminate ? 'primary' : 'background',
      border: '2px solid',
      borderColor: initialChecked || indeterminate ? 'primary' : 'border',
      borderRadius: 'sm',
      transition: 'fast',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });

    // Create checkmark or indeterminate indicator
    this.checkmark = new Box({
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: size === 'sm' ? '10px' : size === 'lg' ? '16px' : '12px',
      fontWeight: 'bold',
      opacity: initialChecked || indeterminate ? 1 : 0,
      transition: 'fast',
    });

    this.updateCheckmark(initialChecked, indeterminate);

    this.checkboxBox.appendChild(this.checkmark);
    this.appendChild(this.checkboxBox);

    // Add label if provided
    if (label) {
      this.labelText = new Box({
        as: 'span',
        fontSize: size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base',
        color: 'text',
      });
      this.labelText.getElement().textContent = label;
      this.appendChild(this.labelText);
    }

    // Event handling
    this.input.addEventListener('change', this.handleChange);
    this.input.addEventListener('focus', this.handleFocus);
    this.input.addEventListener('blur', this.handleBlur);
  }

  private handleChange = (): void => {
    const newChecked = this.input.checked;

    // Clear indeterminate state on user interaction
    this.internalIndeterminate = false;
    this.input.indeterminate = false;

    if (!this.isControlled) {
      this.internalChecked = newChecked;
      this.updateVisuals(newChecked, false);
    }

    if (this.changeCallback) {
      this.changeCallback(newChecked);
    }
  };

  private handleFocus = (): void => {
    const boxEl = this.checkboxBox.getElement();
    boxEl.style.outline = `3px solid ${tokens.colors.primary}`;
    boxEl.style.outlineOffset = '2px';
  };

  private handleBlur = (): void => {
    const boxEl = this.checkboxBox.getElement();
    boxEl.style.outline = 'none';
  };

  private updateCheckmark(checked: boolean, indeterminate: boolean): void {
    const checkmarkEl = this.checkmark.getElement();
    if (indeterminate) {
      checkmarkEl.textContent = '−'; // Minus sign for indeterminate
    } else if (checked) {
      checkmarkEl.textContent = '✓'; // Checkmark
    } else {
      checkmarkEl.textContent = '';
    }
  }

  private updateVisuals(checked: boolean, indeterminate: boolean): void {
    const boxEl = this.checkboxBox.getElement();
    const checkmarkEl = this.checkmark.getElement();

    // Update box color
    boxEl.style.backgroundColor = checked || indeterminate ? tokens.colors.primary : tokens.colors.background;
    boxEl.style.borderColor = checked || indeterminate ? tokens.colors.primary : tokens.colors.border;

    // Update checkmark
    checkmarkEl.style.opacity = checked || indeterminate ? '1' : '0';
    this.updateCheckmark(checked, indeterminate);
  }

  public setChecked(checked: boolean): void {
    this.input.checked = checked;
    this.internalChecked = checked;
    this.internalIndeterminate = false;
    this.input.indeterminate = false;
    this.updateVisuals(checked, false);
  }

  public setIndeterminate(indeterminate: boolean): void {
    this.input.indeterminate = indeterminate;
    this.internalIndeterminate = indeterminate;
    this.updateVisuals(this.input.checked, indeterminate);
  }

  public getChecked(): boolean {
    return this.isControlled ? this.input.checked : this.internalChecked;
  }

  public getIndeterminate(): boolean {
    return this.internalIndeterminate;
  }

  public update(props: Partial<CheckboxProps>): void {
    if (props.checked !== undefined && this.isControlled) {
      this.setChecked(props.checked);
    }
    if (props.indeterminate !== undefined) {
      this.setIndeterminate(props.indeterminate);
    }
    if (props.disabled !== undefined) {
      this.input.disabled = props.disabled;
      this.getElement().style.opacity = props.disabled ? '0.5' : '1';
      this.getElement().style.cursor = props.disabled ? 'not-allowed' : 'pointer';
    }
    if (props.onChange !== undefined) {
      this.changeCallback = props.onChange;
    }
    if (props.label !== undefined && this.labelText) {
      this.labelText.getElement().textContent = props.label;
    }
  }

  public remove(): void {
    this.input.removeEventListener('change', this.handleChange);
    this.input.removeEventListener('focus', this.handleFocus);
    this.input.removeEventListener('blur', this.handleBlur);
    super.remove();
  }
}

function getSizeValue(size: 'sm' | 'md' | 'lg'): number {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  return sizes[size];
}
