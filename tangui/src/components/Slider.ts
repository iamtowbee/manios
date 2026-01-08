/**
 * Slider - Range slider component
 * Accessible, sizable, themeable with smooth interactions
 */

import { Box, type BoxProps } from '../core/Box';
import { tokens } from '../themes/tokens';
import type { Component } from '../core/types';

export interface SliderProps extends Omit<BoxProps, 'as' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  name?: string;
  showValue?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export class Slider extends Box implements Component<SliderProps> {
  private input: HTMLInputElement;
  private track: Box;
  private fill: Box;
  private thumb: Box;
  private valueDisplay?: Box;
  private isControlled: boolean;
  private internalValue: number;
  private changeCallback?: (value: number) => void;
  private changeEndCallback?: (value: number) => void;
  private min: number;
  private max: number;
  private step: number;
  private orientation: 'horizontal' | 'vertical';

  constructor(props: SliderProps = {}) {
    const {
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      size = 'md',
      onChange,
      onChangeEnd,
      name,
      showValue = false,
      orientation = 'horizontal',
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
      flexDirection: orientation === 'horizontal' ? 'column' : 'row',
      gap: 2,
      alignItems: orientation === 'horizontal' ? 'stretch' : 'center',
      opacity: disabled ? 0.5 : 1,
      width: orientation === 'horizontal' ? restProps.width || 200 : 'auto',
      height: orientation === 'vertical' ? restProps.height || 200 : 'auto',
    });

    this.isControlled = isControlled;
    this.internalValue = initialValue;
    this.changeCallback = onChange;
    this.changeEndCallback = onChangeEnd;
    this.min = min;
    this.max = max;
    this.step = step;
    this.orientation = orientation;

    // Hidden native input for accessibility and form submission
    this.input = document.createElement('input');
    this.input.type = 'range';
    this.input.min = String(min);
    this.input.max = String(max);
    this.input.step = String(step);
    this.input.value = String(initialValue);
    this.input.disabled = disabled;
    if (name) this.input.name = name;

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

    // Create slider track container
    const trackContainer = new Box({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      flex: 1,
    });

    // Get track size
    const trackThickness = getTrackThickness(size);
    const thumbSize = getThumbSize(size);

    // Create track
    this.track = new Box({
      position: 'relative',
      width: orientation === 'horizontal' ? '100%' : trackThickness,
      height: orientation === 'horizontal' ? trackThickness : '100%',
      backgroundColor: 'surfaceSecondary',
      borderRadius: 'full',
      overflow: 'visible',
    });

    // Create fill
    const fillPercentage = ((initialValue - min) / (max - min)) * 100;
    this.fill = new Box({
      position: 'absolute',
      top: 0,
      left: 0,
      width: orientation === 'horizontal' ? `${fillPercentage}%` : '100%',
      height: orientation === 'horizontal' ? '100%' : `${fillPercentage}%`,
      backgroundColor: 'primary',
      borderRadius: 'full',
      transition: 'fast',
    });

    // Create thumb
    const thumbPosition = orientation === 'horizontal' ?
      `calc(${fillPercentage}% - ${thumbSize / 2}px)` :
      `calc(${fillPercentage}% - ${thumbSize / 2}px)`;

    this.thumb = new Box({
      position: 'absolute',
      top: orientation === 'horizontal' ? '50%' : thumbPosition,
      left: orientation === 'horizontal' ? thumbPosition : '50%',
      transform: 'translate(-50%, -50%)',
      width: thumbSize,
      height: thumbSize,
      backgroundColor: 'white',
      border: '2px solid',
      borderColor: 'primary',
      borderRadius: 'full',
      boxShadow: 'sm',
      cursor: disabled ? 'not-allowed' : 'grab',
      transition: 'fast',
    });

    this.track.appendChild(this.fill);
    this.track.appendChild(this.thumb);
    trackContainer.appendChild(this.track);
    this.appendChild(trackContainer);

    // Show value if enabled
    if (showValue) {
      this.valueDisplay = new Box({
        as: 'span',
        fontSize: size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base',
        fontWeight: 'bold',
        color: 'text',
        minWidth: 40,
        textAlign: 'center',
      });
      this.valueDisplay.getElement().textContent = String(initialValue);
      this.appendChild(this.valueDisplay);
    }

    // Event handling
    if (!disabled) {
      this.track.getElement().addEventListener('mousedown', this.handleMouseDown);
      this.track.getElement().addEventListener('touchstart', this.handleTouchStart);
      this.input.addEventListener('change', this.handleInputChange);
      this.input.addEventListener('focus', this.handleFocus);
      this.input.addEventListener('blur', this.handleBlur);
    }
  }

  private handleMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
    this.updateFromMouseEvent(e);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    this.thumb.getElement().style.cursor = 'grabbing';
  };

  private handleMouseMove = (e: MouseEvent): void => {
    this.updateFromMouseEvent(e);
  };

  private handleMouseUp = (): void => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.thumb.getElement().style.cursor = 'grab';

    if (this.changeEndCallback) {
      this.changeEndCallback(this.internalValue);
    }
  };

  private handleTouchStart = (e: TouchEvent): void => {
    e.preventDefault();
    this.updateFromTouchEvent(e);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
  };

  private handleTouchMove = (e: TouchEvent): void => {
    this.updateFromTouchEvent(e);
  };

  private handleTouchEnd = (): void => {
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);

    if (this.changeEndCallback) {
      this.changeEndCallback(this.internalValue);
    }
  };

  private updateFromMouseEvent(e: MouseEvent): void {
    const rect = this.track.getElement().getBoundingClientRect();
    const position = this.orientation === 'horizontal' ?
      (e.clientX - rect.left) / rect.width :
      (e.clientY - rect.top) / rect.height;

    this.updateValue(position);
  }

  private updateFromTouchEvent(e: TouchEvent): void {
    const touch = e.touches[0];
    const rect = this.track.getElement().getBoundingClientRect();
    const position = this.orientation === 'horizontal' ?
      (touch.clientX - rect.left) / rect.width :
      (touch.clientY - rect.top) / rect.height;

    this.updateValue(position);
  }

  private updateValue(position: number): void {
    // Clamp position between 0 and 1
    position = Math.max(0, Math.min(1, position));

    // Calculate value based on position
    let newValue = this.min + position * (this.max - this.min);

    // Round to step
    newValue = Math.round(newValue / this.step) * this.step;

    // Clamp to min/max
    newValue = Math.max(this.min, Math.min(this.max, newValue));

    if (!this.isControlled) {
      this.internalValue = newValue;
      this.input.value = String(newValue);
      this.updateVisuals(newValue);
    }

    if (this.changeCallback) {
      this.changeCallback(newValue);
    }
  }

  private handleInputChange = (): void => {
    const newValue = Number(this.input.value);
    this.updateValue((newValue - this.min) / (this.max - this.min));
  };

  private handleFocus = (): void => {
    const thumbEl = this.thumb.getElement();
    thumbEl.style.outline = `3px solid ${tokens.colors.primary}`;
    thumbEl.style.outlineOffset = '2px';
  };

  private handleBlur = (): void => {
    const thumbEl = this.thumb.getElement();
    thumbEl.style.outline = 'none';
  };

  private updateVisuals(value: number): void {
    const percentage = ((value - this.min) / (this.max - this.min)) * 100;
    const thumbSize = getThumbSize(
      this.getElement().classList.contains('slider--sm') ? 'sm' :
      this.getElement().classList.contains('slider--lg') ? 'lg' : 'md'
    );

    const fillEl = this.fill.getElement();
    const thumbEl = this.thumb.getElement();

    if (this.orientation === 'horizontal') {
      fillEl.style.width = `${percentage}%`;
      thumbEl.style.left = `calc(${percentage}% - ${thumbSize / 2}px)`;
    } else {
      fillEl.style.height = `${percentage}%`;
      thumbEl.style.top = `calc(${percentage}% - ${thumbSize / 2}px)`;
    }

    if (this.valueDisplay) {
      this.valueDisplay.getElement().textContent = String(value);
    }
  }

  public setValue(value: number): void {
    this.input.value = String(value);
    this.internalValue = value;
    this.updateVisuals(value);
  }

  public getValue(): number {
    return this.isControlled ? Number(this.input.value) : this.internalValue;
  }

  public update(props: Partial<SliderProps>): void {
    if (props.value !== undefined && this.isControlled) {
      this.setValue(props.value);
    }
    if (props.disabled !== undefined) {
      this.input.disabled = props.disabled;
      this.getElement().style.opacity = props.disabled ? '0.5' : '1';
      this.track.getElement().style.cursor = props.disabled ? 'not-allowed' : 'pointer';
      this.thumb.getElement().style.cursor = props.disabled ? 'not-allowed' : 'grab';
    }
    if (props.onChange !== undefined) {
      this.changeCallback = props.onChange;
    }
    if (props.onChangeEnd !== undefined) {
      this.changeEndCallback = props.onChangeEnd;
    }
  }

  public remove(): void {
    this.track.getElement().removeEventListener('mousedown', this.handleMouseDown);
    this.track.getElement().removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    this.input.removeEventListener('change', this.handleInputChange);
    this.input.removeEventListener('focus', this.handleFocus);
    this.input.removeEventListener('blur', this.handleBlur);
    super.remove();
  }
}

function getTrackThickness(size: 'sm' | 'md' | 'lg'): number {
  const sizes = {
    sm: 4,
    md: 6,
    lg: 8,
  };
  return sizes[size];
}

function getThumbSize(size: 'sm' | 'md' | 'lg'): number {
  const sizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };
  return sizes[size];
}
