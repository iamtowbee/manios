/**
 * Button - Interactive button component with variants
 * Game-optimized with pixel-art styling
 */

import { Box, type BoxProps } from '../core/Box';
import { tokens } from '../themes/tokens';
import type { Component } from '../core/types';

export interface ButtonProps extends Omit<BoxProps, 'as'> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: Component | HTMLElement;
  rightIcon?: Component | HTMLElement;
}

export class Button extends Box implements Component<ButtonProps> {
  private innerContent: Box;
  private loadingIndicator?: Box;

  constructor(props: ButtonProps = {}) {
    const {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      ...restProps
    } = props;

    // Create button with defaults
    super({
      ...restProps,
      as: 'button',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      transition: 'fast',
      width: fullWidth ? 'full' : restProps.width,
      disabled: disabled || loading,
      onClick: disabled || loading ? undefined : onClick,
      ...getVariantStyles(variant),
      ...getSizeStyles(size),
    });

    // Create inner content container
    this.innerContent = new Box({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      opacity: loading ? 0 : 1,
      transition: 'fast',
    });

    // Add left icon
    if (leftIcon) {
      this.innerContent.appendChild(leftIcon);
    }

    // Add children
    if (children) {
      if (typeof children === 'string' || typeof children === 'number') {
        const text = document.createTextNode(String(children));
        this.innerContent.appendChild(text as any);
      } else {
        this.innerContent.appendChild(children as any);
      }
    }

    // Add right icon
    if (rightIcon) {
      this.innerContent.appendChild(rightIcon);
    }

    super.appendChild(this.innerContent);

    // Add loading indicator if needed
    if (loading) {
      this.showLoading();
    }

    // Add hover effects
    this.addHoverEffects(variant);
  }

  private addHoverEffects(variant: ButtonProps['variant']): void {
    const element = this.getElement();

    element.addEventListener('mouseenter', () => {
      if (!element.hasAttribute('disabled')) {
        const hoverStyles = getHoverStyles(variant || 'primary');
        Object.assign(element.style, hoverStyles);
      }
    });

    element.addEventListener('mouseleave', () => {
      if (!element.hasAttribute('disabled')) {
        const variantStyles = getVariantStyles(variant || 'primary');
        Object.assign(element.style, variantStyles);
      }
    });

    element.addEventListener('mousedown', () => {
      if (!element.hasAttribute('disabled')) {
        element.style.transform = 'translateY(2px)';
      }
    });

    element.addEventListener('mouseup', () => {
      if (!element.hasAttribute('disabled')) {
        element.style.transform = 'translateY(0)';
      }
    });
  }

  private showLoading(): void {
    if (this.loadingIndicator) return;

    this.loadingIndicator = new Box({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 16,
      height: 16,
      border: `2px solid ${tokens.colors.white}`,
      borderTopColor: 'transparent',
      borderRadius: 'full',
      animation: 'spin 0.6s linear infinite',
    });

    // Add spin animation if not exists
    if (!document.getElementById('tangui-spin-animation')) {
      const style = document.createElement('style');
      style.id = 'tangui-spin-animation';
      style.textContent = `
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    super.appendChild(this.loadingIndicator);
  }

  private hideLoading(): void {
    if (this.loadingIndicator) {
      this.loadingIndicator.remove();
      this.loadingIndicator = undefined;
    }
  }

  /**
   * Update button props
   */
  public override update(newProps: Partial<ButtonProps>): void {
    if (newProps.loading !== undefined) {
      if (newProps.loading) {
        this.showLoading();
        this.innerContent.update({ opacity: 0 });
      } else {
        this.hideLoading();
        this.innerContent.update({ opacity: 1 });
      }
    }

    super.update(newProps);
  }

  /**
   * Trigger click programmatically
   */
  public click(): void {
    this.getElement().click();
  }
}

/**
 * Get variant styles
 */
function getVariantStyles(variant: ButtonProps['variant']): Partial<BoxProps> {
  const variants = {
    primary: {
      backgroundColor: 'primary',
      color: 'textInverse',
      borderWidth: 2,
      borderStyle: 'solid' as const,
      borderColor: 'primaryDark',
      boxShadow: 'md',
    },
    secondary: {
      backgroundColor: 'secondary',
      color: 'white',
      borderWidth: 2,
      borderStyle: 'solid' as const,
      borderColor: 'secondaryDark',
      boxShadow: 'md',
    },
    success: {
      backgroundColor: 'success',
      color: 'white',
      borderWidth: 2,
      borderStyle: 'solid' as const,
      borderColor: 'successDark',
      boxShadow: 'md',
    },
    warning: {
      backgroundColor: 'warning',
      color: 'textInverse',
      borderWidth: 2,
      borderStyle: 'solid' as const,
      borderColor: 'warningDark',
      boxShadow: 'md',
    },
    error: {
      backgroundColor: 'error',
      color: 'white',
      borderWidth: 2,
      borderStyle: 'solid' as const,
      borderColor: 'errorDark',
      boxShadow: 'md',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'text',
      borderWidth: 0,
      boxShadow: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'text',
      borderWidth: 2,
      borderStyle: 'solid' as const,
      borderColor: 'text',
      boxShadow: 'none',
    },
  };

  return variants[variant || 'primary'];
}

/**
 * Get hover styles
 */
function getHoverStyles(variant: ButtonProps['variant']): Record<string, string> {
  const hoverVariants = {
    primary: {
      backgroundColor: tokens.colors.primaryLight,
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadows.lg,
    },
    secondary: {
      backgroundColor: tokens.colors.secondaryLight,
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadows.lg,
    },
    success: {
      backgroundColor: tokens.colors.successLight,
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadows.lg,
    },
    warning: {
      backgroundColor: tokens.colors.warningLight,
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadows.lg,
    },
    error: {
      backgroundColor: tokens.colors.errorLight,
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadows.lg,
    },
    ghost: {
      backgroundColor: tokens.colors.surfaceLight,
    },
    outline: {
      backgroundColor: tokens.colors.surface,
    },
  };

  return hoverVariants[variant || 'primary'];
}

/**
 * Get size styles
 */
function getSizeStyles(size: ButtonProps['size']): Partial<BoxProps> {
  const sizes = {
    xs: {
      paddingX: 2,
      paddingY: 1,
      fontSize: 'xs',
      borderRadius: 'sm',
    },
    sm: {
      paddingX: 3,
      paddingY: 1.5,
      fontSize: 'sm',
      borderRadius: 'sm',
    },
    md: {
      paddingX: 4,
      paddingY: 2,
      fontSize: 'md',
      borderRadius: 'md',
    },
    lg: {
      paddingX: 6,
      paddingY: 3,
      fontSize: 'lg',
      borderRadius: 'md',
    },
    xl: {
      paddingX: 8,
      paddingY: 4,
      fontSize: 'xl',
      borderRadius: 'lg',
    },
  };

  return sizes[size || 'md'];
}

/**
 * Factory function
 */
export function createButton(props?: ButtonProps): Button {
  return new Button(props);
}
