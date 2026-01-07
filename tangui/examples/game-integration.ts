/**
 * Example: Integrating TanGui with Curds Engine
 * This demonstrates how to use TanGui components in a real game
 */

import { init as initTanGui, VStack, HStack, Text } from '../src';
import { Button, Card, CardBody, CardHeader } from '../src/components';
import { DialogueBox, HUD, Menu, createPauseMenu } from '../src/game';

// Initialize TanGui
initTanGui();

/**
 * Main Game Class
 */
class CurdsGame {
  private container: HTMLElement;
  private gameRunning: boolean = false;
  private hud?: HUD;
  private pauseMenu?: Menu;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container ${containerId} not found`);
    }
    this.container = container;
    this.init();
  }

  private init(): void {
    // Create main menu
    this.showMainMenu();
  }

  private showMainMenu(): void {
    const mainMenu = new Menu({
      title: '🧀 CURDS.IO',
      items: [
        {
          label: 'New Game',
          icon: '▶',
          action: () => {
            mainMenu.hide();
            setTimeout(() => {
              mainMenu.remove();
              this.startGame();
            }, 300);
          },
        },
        {
          label: 'Continue',
          icon: '💾',
          action: () => console.log('Continue game'),
          disabled: true, // No saved game
        },
        {
          label: 'Settings',
          icon: '⚙',
          action: () => this.showSettings(),
        },
        {
          label: 'About',
          icon: 'ℹ',
          action: () => this.showAbout(),
        },
      ],
    });

    mainMenu.appendTo(this.container);
    mainMenu.show();
  }

  private showSettings(): void {
    // Settings menu would go here
    console.log('Settings menu');
  }

  private showAbout(): void {
    const aboutCard = new Card({
      variant: 'elevated',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      zIndex: 'modal',
    });

    const header = new CardHeader({});
    const headerText = new Text({
      children: 'About Curds.io',
      fontSize: 'xl',
      fontWeight: 'bold',
      color: 'primary',
    });
    header.appendChild(headerText);

    const body = new CardBody({});
    const bodyText = new Text({
      children: 'A pixel toon adventure game powered by Curds Engine and TanGui.',
      fontSize: 'md',
      color: 'textSecondary',
      lineHeight: 'relaxed',
    });
    body.appendChild(bodyText);

    const closeButton = new Button({
      children: 'Close',
      variant: 'primary',
      fullWidth: true,
      marginTop: 4,
      onClick: () => aboutCard.remove(),
    });
    body.appendChild(closeButton);

    aboutCard.appendChild(header);
    aboutCard.appendChild(body);
    aboutCard.appendTo(this.container);
  }

  private startGame(): void {
    this.gameRunning = true;

    // Create HUD
    this.hud = new HUD({
      playerName: 'Hero',
      health: 100,
      maxHealth: 100,
      mana: 50,
      maxMana: 100,
      level: 1,
      score: 0,
      gold: 0,
    });
    this.hud.appendTo(this.container);

    // Show intro dialogue
    this.showIntroDialogue();

    // Set up pause menu
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.gameRunning) {
        this.togglePause();
      }
    });
  }

  private showIntroDialogue(): void {
    const dialogue = new DialogueBox({
      typewriterSpeed: 30,
      showContinueIndicator: true,
      lines: [
        {
          speaker: 'Cheese Master',
          text: 'Welcome to the village, traveler!',
        },
        {
          speaker: 'Cheese Master',
          text: 'I am the Cheese Master, keeper of ancient cheese wisdom.',
        },
        {
          speaker: 'Cheese Master',
          text: 'What brings you to our humble cheese village?',
          choices: [
            {
              text: "I'm looking for adventure!",
              action: () => {
                console.log('Player chose adventure');
                // Continue with adventure dialogue
              },
            },
            {
              text: 'Just exploring...',
              action: () => {
                console.log('Player is exploring');
                // Continue with exploration dialogue
              },
            },
            {
              text: 'Tell me about cheese.',
              action: () => {
                console.log('Player wants to learn about cheese');
                // Show cheese lore
              },
            },
          ],
        },
      ],
      onComplete: () => {
        dialogue.remove();
        this.startGameLoop();
      },
    });

    dialogue.appendTo(this.container);
    dialogue.show();
  }

  private startGameLoop(): void {
    // This would integrate with the Curds Engine game loop
    console.log('Game loop started');

    // Simulate some gameplay events
    setTimeout(() => {
      // Take damage
      if (this.hud) {
        this.hud.animateHealthChange(100, 75, 500);
      }
    }, 3000);

    setTimeout(() => {
      // Gain experience
      if (this.hud) {
        this.hud.updateStats({ score: 100, gold: 25 });
      }
    }, 5000);
  }

  private togglePause(): void {
    if (!this.pauseMenu) {
      this.pauseMenu = createPauseMenu({
        onResume: () => {
          this.pauseMenu?.hide();
          setTimeout(() => {
            this.pauseMenu?.remove();
            this.pauseMenu = undefined;
          }, 300);
        },
        onSettings: () => {
          console.log('Settings from pause menu');
        },
        onQuit: () => {
          // Clean up and return to main menu
          this.cleanup();
          this.showMainMenu();
        },
      });

      this.pauseMenu.appendTo(this.container);
      this.pauseMenu.show();
    } else {
      this.pauseMenu.hide();
      setTimeout(() => {
        this.pauseMenu?.remove();
        this.pauseMenu = undefined;
      }, 300);
    }
  }

  private cleanup(): void {
    if (this.hud) {
      this.hud.remove();
      this.hud = undefined;
    }
    if (this.pauseMenu) {
      this.pauseMenu.remove();
      this.pauseMenu = undefined;
    }
    this.gameRunning = false;
  }
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CurdsGame('game-container');
  });
} else {
  new CurdsGame('game-container');
}

export { CurdsGame };
