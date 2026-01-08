/**
 * RadioGroup - Radio button group component
 * Accessible, exclusive selection, keyboard navigation
 */

import { Box, type BoxProps } from '../core/Box';
import { tokens } from '../themes/tokens';
import type { Component } from '../core/types';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<BoxProps, 'as' | 'onChange'> {
  name: string;
  value?: string;
  defaultValue?: string;
  options: RadioOption[];
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  onChange?: (value: string) => void;
  required?: boolean;
}

export class RadioGroup extends Box implements Component<RadioGroupProps> {
  private radioItems: Radio[] = [];
  private isControlled: boolean;
  private internalValue: string;
  private changeCallback?: (value: string) => void;
  private groupName: string;

  constructor(props: RadioGroupProps) {
    const {
      name,
      value,
      defaultValue = '',
      options,
      disabled = false,
      size = 'md',
      orientation = 'vertical',
      onChange,
      required = false,
      ...restProps
    } = props;

    // Determine if controlled
    const isControlled = value !== undefined;
    const initialValue = isControlled ? value : defaultValue;

    // Create container
    super({
      ...restProps,
      as: 'div',
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: orientation === 'vertical' ? 2 : 3,
      role: 'radiogroup',
    });

    this.isControlled = isControlled;
    this.internalValue = initialValue;
    this.changeCallback = onChange;
    this.groupName = name;

    // Create radio buttons
    options.forEach((option) => {
      const radio = new Radio({
        name,
        value: option.value,
        label: option.label,
        checked: option.value === initialValue,
        disabled: disabled || option.disabled,
        size,
        required,
        onChange: (checked) => {
          if (checked) {
            this.handleSelectionChange(option.value);
          }
        },
      });

      this.radioItems.push(radio);
      this.appendChild(radio);
    });

    // Keyboard navigation
    this.getElement().addEventListener('keydown', this.handleKeyDown);
  }

  private handleSelectionChange = (selectedValue: string): void => {
    // Update all radio buttons
    this.radioItems.forEach((radio) => {
      const shouldBeChecked = radio.getValue() === selectedValue;
      radio.setChecked(shouldBeChecked);
    });

    if (!this.isControlled) {
      this.internalValue = selectedValue;
    }

    if (this.changeCallback) {
      this.changeCallback(selectedValue);
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    const currentIndex = this.radioItems.findIndex((radio) => radio.getChecked());
    let nextIndex = currentIndex;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % this.radioItems.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = currentIndex - 1 < 0 ? this.radioItems.length - 1 : currentIndex - 1;
    }

    if (nextIndex !== currentIndex) {
      const nextRadio = this.radioItems[nextIndex];
      if (!nextRadio.getDisabled()) {
        nextRadio.focus();
        nextRadio.setChecked(true);
        this.handleSelectionChange(nextRadio.getValue());
      }
    }
  };

  public setValue(value: string): void {
    this.internalValue = value;
    this.handleSelectionChange(value);
  }

  public getValue(): string {
    return this.isControlled ?
      this.radioItems.find(r => r.getChecked())?.getValue() || '' :
      this.internalValue;
  }

  public update(props: Partial<RadioGroupProps>): void {
    if (props.value !== undefined && this.isControlled) {
      this.setValue(props.value);
    }
    if (props.onChange !== undefined) {
      this.changeCallback = props.onChange;
    }
    if (props.disabled !== undefined) {
      this.radioItems.forEach(radio => radio.setDisabled(props.disabled!));
    }
  }

  public remove(): void {
    this.getElement().removeEventListener('keydown', this.handleKeyDown);
    this.radioItems.forEach(radio => radio.remove());
    super.remove();
  }
}

export interface RadioProps extends Omit<BoxProps, 'as' | 'onChange'> {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean) => void;
  required?: boolean;
}

export class Radio extends Box implements Component<RadioProps> {
  private input: HTMLInputElement;
  private radioCircle: Box;
  private radioDot: Box;
  private labelText: Box;
  private isControlled: boolean;
  private internalChecked: boolean;
  private changeCallback?: (checked: boolean) => void;

  constructor(props: RadioProps) {
    const {
      name,
      value,
      label,
      checked,
      defaultChecked = false,
      disabled = false,
      size = 'md',
      onChange,
      required = false,
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
    this.changeCallback = onChange;

    // Hidden native input for accessibility
    this.input = document.createElement('input');
    this.input.type = 'radio';
    this.input.name = name;
    this.input.value = value;
    this.input.checked = initialChecked;
    this.input.disabled = disabled;
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
    const circleSize = getSizeValue(size);
    const dotSize = Math.floor(circleSize * 0.5);

    // Create radio circle
    this.radioCircle = new Box({
      position: 'relative',
      width: circleSize,
      height: circleSize,
      backgroundColor: 'background',
      border: '2px solid',
      borderColor: initialChecked ? 'primary' : 'border',
      borderRadius: 'full',
      transition: 'fast',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });

    // Create radio dot (inner circle)
    this.radioDot = new Box({
      width: dotSize,
      height: dotSize,
      backgroundColor: 'primary',
      borderRadius: 'full',
      transition: 'fast',
      transform: initialChecked ? 'scale(1)' : 'scale(0)',
    });

    this.radioCircle.appendChild(this.radioDot);
    this.appendChild(this.radioCircle);

    // Add label
    this.labelText = new Box({
      as: 'span',
      fontSize: size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base',
      color: 'text',
    });
    this.labelText.getElement().textContent = label;
    this.appendChild(this.labelText);

    // Event handling
    this.input.addEventListener('change', this.handleChange);
    this.input.addEventListener('focus', this.handleFocus);
    this.input.addEventListener('blur', this.handleBlur);
  }

  private handleChange = (): void => {
    const newChecked = this.input.checked;

    if (!this.isControlled) {
      this.internalChecked = newChecked;
      this.updateVisuals(newChecked);
    }

    if (this.changeCallback) {
      this.changeCallback(newChecked);
    }
  };

  private handleFocus = (): void => {
    const circleEl = this.radioCircle.getElement();
    circleEl.style.outline = `3px solid ${tokens.colors.primary}`;
    circleEl.style.outlineOffset = '2px';
  };

  private handleBlur = (): void => {
    const circleEl = this.radioCircle.getElement();
    circleEl.style.outline = 'none';
  };

  private updateVisuals(checked: boolean): void {
    const circleEl = this.radioCircle.getElement();
    const dotEl = this.radioDot.getElement();

    // Update circle border
    circleEl.style.borderColor = checked ? tokens.colors.primary : tokens.colors.border;

    // Update dot scale
    dotEl.style.transform = checked ? 'scale(1)' : 'scale(0)';
  }

  public setChecked(checked: boolean): void {
    this.input.checked = checked;
    this.internalChecked = checked;
    this.updateVisuals(checked);
  }

  public getChecked(): boolean {
    return this.isControlled ? this.input.checked : this.internalChecked;
  }

  public getValue(): string {
    return this.input.value;
  }

  public getDisabled(): boolean {
    return this.input.disabled;
  }

  public setDisabled(disabled: boolean): void {
    this.input.disabled = disabled;
    this.getElement().style.opacity = disabled ? '0.5' : '1';
    this.getElement().style.cursor = disabled ? 'not-allowed' : 'pointer';
  }

  public focus(): void {
    this.input.focus();
  }

  public update(props: Partial<RadioProps>): void {
    if (props.checked !== undefined && this.isControlled) {
      this.setChecked(props.checked);
    }
    if (props.disabled !== undefined) {
      this.setDisabled(props.disabled);
    }
    if (props.onChange !== undefined) {
      this.changeCallback = props.onChange;
    }
    if (props.label !== undefined) {
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
