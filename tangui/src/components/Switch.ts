/**
 * Switch - Toggle switch component
 * Accessible, controllable, with smooth animations
 */

import { Box, type BoxProps } from '../core/Box';
import { tokens } from '../themes/tokens';
import type { Component } from '../core/types';

export interface SwitchProps extends Omit<BoxProps, 'as' | 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  required?: boolean;
}

export class Switch extends Box implements Component<SwitchProps> {
  private input: HTMLInputElement;
  private track: Box;
  private thumb: Box;
  private isControlled: boolean;
  private internalChecked: boolean;
  private changeCallback?: (checked: boolean) => void;

  constructor(props: SwitchProps = {}) {
    const {
      checked,
      defaultChecked = false,
      disabled = false,
      size = 'md',
      onChange,
      name,
      value,
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
      position: 'relative',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none',
    });

    this.isControlled = isControlled;
    this.internalChecked = initialChecked;
    this.changeCallback = onChange;

    // Hidden native input for accessibility
    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.checked = initialChecked;
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

    // Get size dimensions
    const dimensions = getSizeDimensions(size);

    // Create track
    this.track = new Box({
      position: 'relative',
      width: dimensions.trackWidth,
      height: dimensions.trackHeight,
      backgroundColor: initialChecked ? 'primary' : 'surfaceSecondary',
      borderRadius: 'full',
      transition: 'base',
      border: '2px solid',
      borderColor: initialChecked ? 'primary' : 'border',
    });

    // Create thumb
    this.thumb = new Box({
      position: 'absolute',
      top: '50%',
      left: initialChecked ? `calc(100% - ${dimensions.thumbSize}px - 2px)` : '2px',
      transform: 'translateY(-50%)',
      width: dimensions.thumbSize,
      height: dimensions.thumbSize,
      backgroundColor: 'white',
      borderRadius: 'full',
      transition: 'base',
      boxShadow: 'sm',
    });

    this.track.appendChild(this.thumb);
    this.appendChild(this.track);

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
    const trackEl = this.track.getElement();
    trackEl.style.outline = `3px solid ${tokens.colors.primary}`;
    trackEl.style.outlineOffset = '2px';
  };

  private handleBlur = (): void => {
    const trackEl = this.track.getElement();
    trackEl.style.outline = 'none';
  };

  private updateVisuals(checked: boolean): void {
    const trackEl = this.track.getElement();
    const thumbEl = this.thumb.getElement();

    // Update track color
    trackEl.style.backgroundColor = checked ? tokens.colors.primary : tokens.colors.surfaceSecondary;
    trackEl.style.borderColor = checked ? tokens.colors.primary : tokens.colors.border;

    // Update thumb position
    const dimensions = getSizeDimensions(
      this.getElement().classList.contains('switch--sm') ? 'sm' :
      this.getElement().classList.contains('switch--lg') ? 'lg' : 'md'
    );
    thumbEl.style.left = checked ? `calc(100% - ${dimensions.thumbSize}px - 2px)` : '2px';
  }

  public setChecked(checked: boolean): void {
    this.input.checked = checked;
    this.internalChecked = checked;
    this.updateVisuals(checked);
  }

  public getChecked(): boolean {
    return this.isControlled ? this.input.checked : this.internalChecked;
  }

  public update(props: Partial<SwitchProps>): void {
    if (props.checked !== undefined && this.isControlled) {
      this.setChecked(props.checked);
    }
    if (props.disabled !== undefined) {
      this.input.disabled = props.disabled;
      this.getElement().style.opacity = props.disabled ? '0.5' : '1';
      this.getElement().style.cursor = props.disabled ? 'not-allowed' : 'pointer';
    }
    if (props.onChange !== undefined) {
      this.changeCallback = props.onChange;
    }
  }

  public remove(): void {
    this.input.removeEventListener('change', this.handleChange);
    this.input.removeEventListener('focus', this.handleFocus);
    this.input.removeEventListener('blur', this.handleBlur);
    super.remove();
  }
}

function getSizeDimensions(size: 'sm' | 'md' | 'lg'): {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
} {
  const sizes = {
    sm: { trackWidth: 32, trackHeight: 18, thumbSize: 14 },
    md: { trackWidth: 44, trackHeight: 24, thumbSize: 20 },
    lg: { trackWidth: 56, trackHeight: 30, thumbSize: 26 },
  };
  return sizes[size];
}
