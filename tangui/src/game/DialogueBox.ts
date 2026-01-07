/**
 * DialogueBox - Interactive dialogue system for games
 * Features typewriter effect, character portraits, and choice system
 */

import { Box, type BoxProps } from '../core/Box';
import { Text } from '../core/Text';
import { VStack, HStack } from '../core/Stack';
import { Button } from '../components/Button';
import type { Component } from '../core/types';

export interface DialogueChoice {
  text: string;
  action: () => void;
  disabled?: boolean;
}

export interface DialogueLine {
  speaker?: string;
  text: string;
  portrait?: string | HTMLImageElement;
  choices?: DialogueChoice[];
}

export interface DialogueBoxProps extends Omit<BoxProps, 'children'> {
  lines?: DialogueLine[];
  typewriterSpeed?: number; // milliseconds per character
  autoAdvanceDelay?: number; // milliseconds before auto-advancing
  onComplete?: () => void;
  showContinueIndicator?: boolean;
  position?: 'top' | 'bottom' | 'center';
}

export class DialogueBox extends Box implements Component<DialogueBoxProps> {
  private lines: DialogueLine[] = [];
  private currentLineIndex: number = 0;
  private typewriterSpeed: number;
  private autoAdvanceDelay?: number;
  private onComplete?: () => void;
  private showContinueIndicator: boolean;

  private contentContainer: VStack;
  private speakerContainer?: HStack;
  private speakerNameText?: Text;
  private portraitImage?: Box;
  private dialogueText: Text;
  private continueIndicator?: Text;
  private choicesContainer?: VStack;

  private typewriterTimer?: number;
  private currentCharIndex: number = 0;
  private fullText: string = '';

  constructor(props: DialogueBoxProps = {}) {
    const {
      lines = [],
      typewriterSpeed = 50,
      autoAdvanceDelay,
      onComplete,
      showContinueIndicator = true,
      position = 'bottom',
      ...restProps
    } = props;

    // Position presets
    const positionStyles = getPositionStyles(position);

    super({
      ...restProps,
      ...positionStyles,
      width: restProps.width || '80%',
      maxWidth: restProps.maxWidth || 800,
      backgroundColor: 'background',
      borderRadius: 'lg',
      borderWidth: 4,
      borderStyle: 'solid',
      borderColor: 'primary',
      boxShadow: 'xl',
      padding: 0,
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'normal',
      zIndex: 'modal',
    });

    this.lines = lines;
    this.typewriterSpeed = typewriterSpeed;
    this.autoAdvanceDelay = autoAdvanceDelay;
    this.onComplete = onComplete;
    this.showContinueIndicator = showContinueIndicator;

    // Create content container
    this.contentContainer = new VStack({
      padding: 4,
      gap: 3,
      width: 'full',
    });

    // Create dialogue text
    this.dialogueText = new Text({
      fontSize: 'md',
      lineHeight: 'relaxed',
      color: 'text',
      minHeight: 60,
    });

    this.contentContainer.appendChild(this.dialogueText);

    // Create continue indicator
    if (this.showContinueIndicator) {
      this.continueIndicator = new Text({
        children: '▼ Press SPACE to continue',
        fontSize: 'xs',
        color: 'textMuted',
        textAlign: 'right',
        animation: 'blink 1.5s ease-in-out infinite',
        marginTop: 2,
      });

      // Add blink animation
      if (!document.getElementById('tangui-blink-animation')) {
        const style = document.createElement('style');
        style.id = 'tangui-blink-animation';
        style.textContent = `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `;
        document.head.appendChild(style);
      }

      this.contentContainer.appendChild(this.continueIndicator);
      this.continueIndicator.update({ opacity: 0 });
    }

    super.appendChild(this.contentContainer);

    // Set up keyboard controls
    this.setupKeyboardControls();

    // Start first line if available
    if (lines.length > 0) {
      this.showLine(0);
    }
  }

  private setupKeyboardControls(): void {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        this.advance();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    // Store for cleanup
    (this as any)._keyboardHandler = handleKeyPress;
  }

  private showLine(index: number): void {
    if (index >= this.lines.length) {
      this.complete();
      return;
    }

    const line = this.lines[index];
    this.currentLineIndex = index;
    this.currentCharIndex = 0;
    this.fullText = line.text;

    // Clear previous choices
    if (this.choicesContainer) {
      this.choicesContainer.remove();
      this.choicesContainer = undefined;
    }

    // Update speaker
    if (line.speaker) {
      this.showSpeaker(line.speaker, line.portrait);
    } else if (this.speakerContainer) {
      this.speakerContainer.remove();
      this.speakerContainer = undefined;
    }

    // Hide continue indicator during typing
    if (this.continueIndicator) {
      this.continueIndicator.update({ opacity: 0 });
    }

    // Start typewriter effect
    this.startTypewriter();
  }

  private showSpeaker(name: string, portrait?: string | HTMLImageElement): void {
    if (!this.speakerContainer) {
      this.speakerContainer = new HStack({
        gap: 3,
        alignItems: 'center',
      });
      this.contentContainer.prependChild(this.speakerContainer);
    }

    // Clear previous content
    this.speakerContainer.clearChildren();

    // Add portrait if provided
    if (portrait) {
      this.portraitImage = new Box({
        width: 48,
        height: 48,
        borderRadius: 'md',
        overflow: 'hidden',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'primary',
      });

      if (typeof portrait === 'string') {
        const img = document.createElement('img');
        img.src = portrait;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        this.portraitImage.getElement().appendChild(img);
      } else {
        this.portraitImage.getElement().appendChild(portrait);
      }

      this.speakerContainer.appendChild(this.portraitImage);
    }

    // Add speaker name
    this.speakerNameText = new Text({
      children: name,
      fontSize: 'lg',
      fontWeight: 'bold',
      color: 'primary',
      textTransform: 'uppercase',
    });

    this.speakerContainer.appendChild(this.speakerNameText);
  }

  private startTypewriter(): void {
    this.dialogueText.setText('');

    this.typewriterTimer = window.setInterval(() => {
      if (this.currentCharIndex < this.fullText.length) {
        const char = this.fullText[this.currentCharIndex];
        this.dialogueText.appendText(char);
        this.currentCharIndex++;
      } else {
        this.finishTypewriter();
      }
    }, this.typewriterSpeed);
  }

  private finishTypewriter(): void {
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = undefined;
    }

    // Show full text
    this.dialogueText.setText(this.fullText);

    // Show continue indicator
    if (this.continueIndicator && !this.lines[this.currentLineIndex].choices) {
      this.continueIndicator.update({ opacity: 1 });
    }

    // Show choices if available
    const currentLine = this.lines[this.currentLineIndex];
    if (currentLine.choices) {
      this.showChoices(currentLine.choices);
    } else if (this.autoAdvanceDelay) {
      // Auto-advance
      setTimeout(() => this.advance(), this.autoAdvanceDelay);
    }
  }

  private showChoices(choices: DialogueChoice[]): void {
    this.choicesContainer = new VStack({
      gap: 2,
      marginTop: 3,
      width: 'full',
    });

    choices.forEach((choice, index) => {
      const button = new Button({
        children: choice.text,
        variant: 'outline',
        size: 'md',
        fullWidth: true,
        disabled: choice.disabled,
        onClick: () => {
          choice.action();
          this.advance();
        },
      });

      this.choicesContainer!.appendChild(button);
    });

    this.contentContainer.appendChild(this.choicesContainer);
  }

  /**
   * Advance to next line or skip typewriter
   */
  public advance(): void {
    // If typewriter is running, finish it immediately
    if (this.typewriterTimer) {
      this.finishTypewriter();
      return;
    }

    // If choices are shown, do nothing (user must click choice)
    if (this.choicesContainer) {
      return;
    }

    // Move to next line
    this.showLine(this.currentLineIndex + 1);
  }

  /**
   * Complete dialogue
   */
  private complete(): void {
    this.hide();
    if (this.onComplete) {
      this.onComplete();
    }
  }

  /**
   * Show dialogue box with animation
   */
  public show(): void {
    this.update({
      opacity: 1,
      transform: 'translateY(0)',
    });
  }

  /**
   * Hide dialogue box with animation
   */
  public hide(): void {
    this.update({
      opacity: 0,
      transform: 'translateY(20px)',
    });
  }

  /**
   * Set new dialogue lines
   */
  public setLines(lines: DialogueLine[]): void {
    this.lines = lines;
    this.currentLineIndex = 0;
    if (lines.length > 0) {
      this.showLine(0);
    }
  }

  /**
   * Clean up
   */
  public override remove(): void {
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
    }
    if ((this as any)._keyboardHandler) {
      document.removeEventListener('keydown', (this as any)._keyboardHandler);
    }
    super.remove();
  }
}

/**
 * Get position styles
 */
function getPositionStyles(position: DialogueBoxProps['position']): Partial<BoxProps> {
  const positions = {
    top: {
      position: 'fixed' as const,
      top: 20,
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
    },
    bottom: {
      position: 'fixed' as const,
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
    },
    center: {
      position: 'fixed' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) translateY(20px)',
    },
  };

  return positions[position || 'bottom'];
}

/**
 * Factory function
 */
export function createDialogueBox(props?: DialogueBoxProps): DialogueBox {
  return new DialogueBox(props);
}
