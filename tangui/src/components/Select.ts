/**
 * Select - Dropdown select component
 * Accessible, customizable, with search support
 */

import { Box, type BoxProps } from '../core/Box';
import { tokens } from '../themes/tokens';
import type { Component } from '../core/types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<BoxProps, 'as' | 'onChange'> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  searchable?: boolean;
}

export class Select extends Box implements Component<SelectProps> {
  private trigger: Box;
  private dropdown: Box;
  private optionElements: Box[] = [];
  private hiddenSelect: HTMLSelectElement;
  private isOpen: boolean = false;
  private isControlled: boolean;
  private internalValue: string;
  private changeCallback?: (value: string) => void;
  private options: SelectOption[];
  private searchInput?: HTMLInputElement;
  private searchable: boolean;

  constructor(props: SelectProps) {
    const {
      options,
      value,
      defaultValue = '',
      placeholder = 'Select...',
      disabled = false,
      size = 'md',
      onChange,
      name,
      required = false,
      searchable = false,
      ...restProps
    } = props;

    // Determine if controlled
    const isControlled = value !== undefined;
    const initialValue = isControlled ? value : defaultValue;

    // Create container
    super({
      ...restProps,
      as: 'div',
      position: 'relative',
      display: 'inline-block',
      minWidth: 200,
    });

    this.isControlled = isControlled;
    this.internalValue = initialValue;
    this.changeCallback = onChange;
    this.options = options;
    this.searchable = searchable;

    // Hidden native select for form submission
    this.hiddenSelect = document.createElement('select');
    this.hiddenSelect.disabled = disabled;
    if (name) this.hiddenSelect.name = name;
    if (required) this.hiddenSelect.required = required;
    this.hiddenSelect.style.display = 'none';

    options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      optionEl.selected = option.value === initialValue;
      if (option.disabled) optionEl.disabled = true;
      this.hiddenSelect.appendChild(optionEl);
    });

    this.getElement().appendChild(this.hiddenSelect);

    // Create trigger button
    const selectedOption = options.find(opt => opt.value === initialValue);
    this.trigger = new Box({
      as: 'button',
      type: 'button',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: getSizePadding(size),
      backgroundColor: 'background',
      border: '2px solid',
      borderColor: 'border',
      borderRadius: 'sm',
      fontSize: size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base',
      color: selectedOption ? 'text' : 'textSecondary',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'fast',
      userSelect: 'none',
    });

    const triggerText = new Box({ as: 'span', flex: 1, textAlign: 'left' });
    triggerText.getElement().textContent = selectedOption?.label || placeholder;
    this.trigger.appendChild(triggerText);

    const arrow = new Box({
      as: 'span',
      marginLeft: 2,
      transition: 'fast',
      transform: 'rotate(0deg)',
    });
    arrow.getElement().textContent = '▼';
    this.trigger.appendChild(arrow);

    this.appendChild(this.trigger);

    // Create dropdown
    this.dropdown = new Box({
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 1,
      backgroundColor: 'surface',
      border: '2px solid',
      borderColor: 'primary',
      borderRadius: 'sm',
      boxShadow: 'md',
      maxHeight: 200,
      overflowY: 'auto',
      zIndex: 'dropdown',
      display: 'none',
    });

    // Add search if searchable
    if (searchable) {
      const searchBox = new Box({
        padding: 2,
        borderBottom: '1px solid',
        borderColor: 'border',
      });

      this.searchInput = document.createElement('input');
      this.searchInput.type = 'text';
      this.searchInput.placeholder = 'Search...';
      Object.assign(this.searchInput.style, {
        width: '100%',
        padding: tokens.space[1],
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radii.sm,
        fontSize: tokens.fontSizes.sm,
        fontFamily: 'inherit',
        backgroundColor: tokens.colors.background,
        color: tokens.colors.text,
      });

      this.searchInput.addEventListener('input', this.handleSearch);
      this.searchInput.addEventListener('keydown', (e) => e.stopPropagation());

      searchBox.getElement().appendChild(this.searchInput);
      this.dropdown.appendChild(searchBox);
    }

    // Create options
    this.renderOptions(options);

    this.appendChild(this.dropdown);

    // Event handling
    if (!disabled) {
      this.trigger.getElement().addEventListener('click', this.toggleDropdown);
      document.addEventListener('click', this.handleOutsideClick);
      this.trigger.getElement().addEventListener('keydown', this.handleKeyDown);
    }
  }

  private renderOptions(options: SelectOption[]): void {
    // Clear existing options (except search box if present)
    const children = Array.from(this.dropdown.getElement().children);
    children.forEach(child => {
      if (!child.querySelector('input[type="text"]')) {
        child.remove();
      }
    });
    this.optionElements = [];

    options.forEach((option) => {
      const optionBox = new Box({
        as: 'div',
        padding: getSizePadding('md'),
        cursor: option.disabled ? 'not-allowed' : 'pointer',
        backgroundColor: option.value === this.internalValue ? 'primary' : 'transparent',
        color: option.value === this.internalValue ? 'background' : 'text',
        opacity: option.disabled ? 0.5 : 1,
        transition: 'fast',
        fontSize: 'sm',
      });

      optionBox.getElement().textContent = option.label;
      optionBox.getElement().setAttribute('data-value', option.value);

      if (!option.disabled) {
        optionBox.getElement().addEventListener('mouseenter', () => {
          if (option.value !== this.internalValue) {
            optionBox.getElement().style.backgroundColor = tokens.colors.surfaceSecondary;
          }
        });

        optionBox.getElement().addEventListener('mouseleave', () => {
          if (option.value !== this.internalValue) {
            optionBox.getElement().style.backgroundColor = 'transparent';
          }
        });

        optionBox.getElement().addEventListener('click', () => {
          this.selectOption(option.value);
        });
      }

      this.dropdown.appendChild(optionBox);
      this.optionElements.push(optionBox);
    });
  }

  private handleSearch = (): void => {
    if (!this.searchInput) return;

    const searchTerm = this.searchInput.value.toLowerCase();
    const filteredOptions = this.options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm)
    );

    this.renderOptions(filteredOptions);
  };

  private toggleDropdown = (): void => {
    this.isOpen = !this.isOpen;
    this.updateDropdownVisibility();
  };

  private updateDropdownVisibility(): void {
    const dropdownEl = this.dropdown.getElement();
    const arrow = this.trigger.getElement().querySelector('span:last-child') as HTMLElement;

    dropdownEl.style.display = this.isOpen ? 'block' : 'none';
    if (arrow) {
      arrow.style.transform = this.isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    if (this.isOpen && this.searchInput) {
      setTimeout(() => this.searchInput!.focus(), 50);
    }
  }

  private handleOutsideClick = (e: MouseEvent): void => {
    if (!this.getElement().contains(e.target as Node)) {
      this.isOpen = false;
      this.updateDropdownVisibility();
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggleDropdown();
    } else if (e.key === 'Escape' && this.isOpen) {
      this.isOpen = false;
      this.updateDropdownVisibility();
    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && this.isOpen) {
      e.preventDefault();
      const currentIndex = this.options.findIndex(opt => opt.value === this.internalValue);
      let nextIndex = currentIndex;

      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % this.options.length;
      } else {
        nextIndex = currentIndex - 1 < 0 ? this.options.length - 1 : currentIndex - 1;
      }

      const nextOption = this.options[nextIndex];
      if (!nextOption.disabled) {
        this.selectOption(nextOption.value);
      }
    }
  };

  private selectOption(value: string): void {
    const option = this.options.find(opt => opt.value === value);
    if (!option || option.disabled) return;

    // Update hidden select
    const selectOption = Array.from(this.hiddenSelect.options).find(
      opt => opt.value === value
    );
    if (selectOption) {
      selectOption.selected = true;
    }

    // Update trigger text
    const triggerText = this.trigger.getElement().querySelector('span:first-child');
    if (triggerText) {
      triggerText.textContent = option.label;
      (triggerText as HTMLElement).style.color = tokens.colors.text;
    }

    // Update internal value
    if (!this.isControlled) {
      this.internalValue = value;
    }

    // Update option highlighting
    this.optionElements.forEach((optBox) => {
      const optValue = optBox.getElement().getAttribute('data-value');
      const optEl = optBox.getElement();

      if (optValue === value) {
        optEl.style.backgroundColor = tokens.colors.primary;
        optEl.style.color = tokens.colors.background;
      } else {
        optEl.style.backgroundColor = 'transparent';
        optEl.style.color = tokens.colors.text;
      }
    });

    // Close dropdown
    this.isOpen = false;
    this.updateDropdownVisibility();

    // Trigger callback
    if (this.changeCallback) {
      this.changeCallback(value);
    }
  }

  public setValue(value: string): void {
    this.internalValue = value;
    this.selectOption(value);
  }

  public getValue(): string {
    return this.isControlled ? this.hiddenSelect.value : this.internalValue;
  }

  public update(props: Partial<SelectProps>): void {
    if (props.value !== undefined && this.isControlled) {
      this.setValue(props.value);
    }
    if (props.onChange !== undefined) {
      this.changeCallback = props.onChange;
    }
    if (props.disabled !== undefined) {
      this.hiddenSelect.disabled = props.disabled;
      this.trigger.getElement().style.opacity = props.disabled ? '0.5' : '1';
      this.trigger.getElement().style.cursor = props.disabled ? 'not-allowed' : 'pointer';
    }
    if (props.options !== undefined) {
      this.options = props.options;
      this.renderOptions(props.options);
    }
  }

  public remove(): void {
    this.trigger.getElement().removeEventListener('click', this.toggleDropdown);
    document.removeEventListener('click', this.handleOutsideClick);
    this.trigger.getElement().removeEventListener('keydown', this.handleKeyDown);
    if (this.searchInput) {
      this.searchInput.removeEventListener('input', this.handleSearch);
    }
    super.remove();
  }
}

function getSizePadding(size: 'sm' | 'md' | 'lg'): number {
  const sizes = {
    sm: 1,
    md: 2,
    lg: 3,
  };
  return sizes[size];
}
