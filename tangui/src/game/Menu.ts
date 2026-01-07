/**
 * Menu - Game menu component with navigation
 * Perfect for main menus, pause menus, settings, etc.
 */

import { Box, type BoxProps } from '../core/Box';
import { Text } from '../core/Text';
import { VStack, Center } from '../core/Stack';
import { Button } from '../components/Button';
import type { Component } from '../core/types';

export interface MenuItem {
  label: string;
  action: () => void;
  disabled?: boolean;
  icon?: string;
}

export interface MenuProps extends Omit<BoxProps, 'children'> {
  title?: string;
  items: MenuItem[];
  selectedIndex?: number;
  keyboardNavigation?: boolean;
  overlay?: boolean;
  onClose?: () => void;
}

export class Menu extends Box implements Component<MenuProps> {
  private items: MenuItem[];
  private selectedIndex: number;
  private keyboardNavigation: boolean;
  private onClose?: () => void;

  private titleText?: Text;
  private menuContainer: VStack;
  private buttonElements: Button[] = [];

  constructor(props: MenuProps) {
    const {
      title,
      items,
      selectedIndex = 0,
      keyboardNavigation = true,
      overlay = true,
      onClose,
      ...restProps
    } = props;

    super({
      ...restProps,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: overlay ? 'overlay' : 'transparent',
      zIndex: 'modal',
      opacity: 0,
      transition: 'normal',
    });

    this.items = items;
    this.selectedIndex = selectedIndex;
    this.keyboardNavigation = keyboardNavigation;
    this.onClose = onClose;

    // Create menu panel
    const menuPanel = new VStack({
      gap: 4,
      padding: 6,
      backgroundColor: 'background',
      borderRadius: 'xl',
      borderWidth: 4,
      borderStyle: 'solid',
      borderColor: 'primary',
      boxShadow: '2xl',
      minWidth: 400,
      maxWidth: 600,
      transform: 'scale(0.8)',
      transition: 'normal',
    });

    // Add title
    if (title) {
      this.titleText = new Text({
        children: title,
        fontSize: '3xl',
        fontWeight: 'bold',
        color: 'primary',
        textAlign: 'center',
        textShadow: `4px 4px 0px rgba(0,0,0,0.5)`,
      });
      menuPanel.appendChild(this.titleText);
    }

    // Create menu items container
    this.menuContainer = new VStack({
      gap: 2,
      width: 'full',
    });

    // Add menu items
    this.items.forEach((item, index) => {
      const button = new Button({
        children: item.icon ? `${item.icon} ${item.label}` : item.label,
        variant: index === this.selectedIndex ? 'primary' : 'outline',
        size: 'lg',
        fullWidth: true,
        disabled: item.disabled,
        onClick: () => this.selectItem(index),
      });

      this.buttonElements.push(button);
      this.menuContainer.appendChild(button);
    });

    menuPanel.appendChild(this.menuContainer);

    // Add close hint
    if (onClose) {
      const closeHint = new Text({
        children: 'Press ESC to close',
        fontSize: 'xs',
        color: 'textMuted',
        textAlign: 'center',
        marginTop: 2,
      });
      menuPanel.appendChild(closeHint);
    }

    super.appendChild(menuPanel);

    // Set up keyboard navigation
    if (this.keyboardNavigation) {
      this.setupKeyboardNavigation();
    }

    // Store panel for animation
    (this as any)._menuPanel = menuPanel;
  }

  private setupKeyboardNavigation(): void {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          e.preventDefault();
          this.navigateUp();
          break;
        case 'ArrowDown':
        case 'KeyS':
          e.preventDefault();
          this.navigateDown();
          break;
        case 'Enter':
        case 'Space':
          e.preventDefault();
          this.activateSelected();
          break;
        case 'Escape':
          e.preventDefault();
          if (this.onClose) {
            this.onClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    (this as any)._keyboardHandler = handleKeyDown;
  }

  private navigateUp(): void {
    // Find previous non-disabled item
    let newIndex = this.selectedIndex - 1;
    while (newIndex >= 0 && this.items[newIndex].disabled) {
      newIndex--;
    }

    if (newIndex >= 0) {
      this.setSelectedIndex(newIndex);
    }
  }

  private navigateDown(): void {
    // Find next non-disabled item
    let newIndex = this.selectedIndex + 1;
    while (newIndex < this.items.length && this.items[newIndex].disabled) {
      newIndex++;
    }

    if (newIndex < this.items.length) {
      this.setSelectedIndex(newIndex);
    }
  }

  private setSelectedIndex(index: number): void {
    // Update old button
    if (this.buttonElements[this.selectedIndex]) {
      this.buttonElements[this.selectedIndex].update({ variant: 'outline' });
    }

    // Update new button
    this.selectedIndex = index;
    if (this.buttonElements[this.selectedIndex]) {
      this.buttonElements[this.selectedIndex].update({ variant: 'primary' });
    }
  }

  private selectItem(index: number): void {
    if (this.items[index].disabled) return;

    this.setSelectedIndex(index);
    this.activateSelected();
  }

  private activateSelected(): void {
    const item = this.items[this.selectedIndex];
    if (!item.disabled) {
      item.action();
    }
  }

  /**
   * Show menu with animation
   */
  public show(): void {
    this.update({ opacity: 1 });
    if ((this as any)._menuPanel) {
      (this as any)._menuPanel.update({ transform: 'scale(1)' });
    }
  }

  /**
   * Hide menu with animation
   */
  public hide(): void {
    this.update({ opacity: 0 });
    if ((this as any)._menuPanel) {
      (this as any)._menuPanel.update({ transform: 'scale(0.8)' });
    }
  }

  /**
   * Update menu items
   */
  public updateItems(items: MenuItem[]): void {
    this.items = items;
    this.menuContainer.clearChildren();
    this.buttonElements = [];

    this.items.forEach((item, index) => {
      const button = new Button({
        children: item.icon ? `${item.icon} ${item.label}` : item.label,
        variant: index === this.selectedIndex ? 'primary' : 'outline',
        size: 'lg',
        fullWidth: true,
        disabled: item.disabled,
        onClick: () => this.selectItem(index),
      });

      this.buttonElements.push(button);
      this.menuContainer.appendChild(button);
    });
  }

  /**
   * Clean up
   */
  public override remove(): void {
    if ((this as any)._keyboardHandler) {
      document.removeEventListener('keydown', (this as any)._keyboardHandler);
    }
    super.remove();
  }
}

/**
 * Factory function
 */
export function createMenu(props: MenuProps): Menu {
  return new Menu(props);
}

/**
 * PauseMenu - Pre-configured pause menu
 */
export function createPauseMenu(props: {
  onResume: () => void;
  onSettings?: () => void;
  onQuit?: () => void;
}): Menu {
  const items: MenuItem[] = [
    {
      label: 'Resume',
      icon: '▶',
      action: props.onResume,
    },
  ];

  if (props.onSettings) {
    items.push({
      label: 'Settings',
      icon: '⚙',
      action: props.onSettings,
    });
  }

  if (props.onQuit) {
    items.push({
      label: 'Quit',
      icon: '✕',
      action: props.onQuit,
    });
  }

  return new Menu({
    title: 'PAUSED',
    items,
    overlay: true,
  });
}
