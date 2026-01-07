/**
 * HUD - Heads-up display overlay for game information
 * Displays player stats, health bars, score, and other game info
 */

import { Box, type BoxProps } from '../core/Box';
import { Text } from '../core/Text';
import { HStack, VStack } from '../core/Stack';
import type { Component } from '../core/types';

export interface HUDProps extends Omit<BoxProps, 'children'> {
  playerName?: string;
  health?: number;
  maxHealth?: number;
  mana?: number;
  maxMana?: number;
  score?: number;
  level?: number;
  gold?: number;
  customStats?: Array<{ label: string; value: string | number }>;
}

export class HUD extends Box implements Component<HUDProps> {
  private playerNameText?: Text;
  private healthBar?: ProgressBar;
  private manaBar?: ProgressBar;
  private scoreText?: Text;
  private levelText?: Text;
  private goldText?: Text;
  private customStatsContainer?: VStack;

  private stats: HUDProps;

  constructor(props: HUDProps = {}) {
    const {
      playerName,
      health = 100,
      maxHealth = 100,
      mana,
      maxMana,
      score,
      level,
      gold,
      customStats,
      ...restProps
    } = props;

    super({
      ...restProps,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: 3,
      pointerEvents: 'none',
      zIndex: 'docked',
    });

    this.stats = props;

    // Create HUD layout
    const hudContainer = new HStack({
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 4,
      width: 'full',
    });

    // Left section - Player info
    const leftSection = new VStack({
      gap: 2,
      alignItems: 'flex-start',
      backgroundColor: 'overlay',
      padding: 3,
      borderRadius: 'md',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'surfaceLight',
      pointerEvents: 'auto',
    });

    if (playerName) {
      this.playerNameText = new Text({
        children: playerName,
        fontSize: 'lg',
        fontWeight: 'bold',
        color: 'primary',
      });
      leftSection.appendChild(this.playerNameText);
    }

    // Health bar
    this.healthBar = new ProgressBar({
      label: 'HP',
      value: health,
      maxValue: maxHealth,
      color: 'healthGreen',
      width: 200,
    });
    leftSection.appendChild(this.healthBar);

    // Mana bar (optional)
    if (mana !== undefined && maxMana !== undefined) {
      this.manaBar = new ProgressBar({
        label: 'MP',
        value: mana,
        maxValue: maxMana,
        color: 'manaBlue',
        width: 200,
      });
      leftSection.appendChild(this.manaBar);
    }

    hudContainer.appendChild(leftSection);

    // Right section - Game stats
    const rightSection = new VStack({
      gap: 2,
      alignItems: 'flex-end',
      backgroundColor: 'overlay',
      padding: 3,
      borderRadius: 'md',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'surfaceLight',
      pointerEvents: 'auto',
    });

    if (level !== undefined) {
      this.levelText = new Text({
        children: `LVL ${level}`,
        fontSize: 'md',
        fontWeight: 'bold',
        color: 'expPurple',
      });
      rightSection.appendChild(this.levelText);
    }

    if (score !== undefined) {
      this.scoreText = new Text({
        children: `SCORE: ${score}`,
        fontSize: 'md',
        color: 'text',
      });
      rightSection.appendChild(this.scoreText);
    }

    if (gold !== undefined) {
      this.goldText = new Text({
        children: `💰 ${gold}`,
        fontSize: 'md',
        color: 'goldYellow',
      });
      rightSection.appendChild(this.goldText);
    }

    // Custom stats
    if (customStats && customStats.length > 0) {
      this.customStatsContainer = new VStack({
        gap: 1,
        alignItems: 'flex-end',
      });

      customStats.forEach(stat => {
        const statText = new Text({
          children: `${stat.label}: ${stat.value}`,
          fontSize: 'sm',
          color: 'textSecondary',
        });
        this.customStatsContainer!.appendChild(statText);
      });

      rightSection.appendChild(this.customStatsContainer);
    }

    hudContainer.appendChild(rightSection);
    super.appendChild(hudContainer);
  }

  /**
   * Update HUD stats
   */
  public updateStats(newStats: Partial<HUDProps>): void {
    this.stats = { ...this.stats, ...newStats };

    if (newStats.playerName && this.playerNameText) {
      this.playerNameText.setText(newStats.playerName);
    }

    if (newStats.health !== undefined && this.healthBar) {
      this.healthBar.setValue(newStats.health);
    }

    if (newStats.mana !== undefined && this.manaBar) {
      this.manaBar.setValue(newStats.mana);
    }

    if (newStats.score !== undefined && this.scoreText) {
      this.scoreText.setText(`SCORE: ${newStats.score}`);
    }

    if (newStats.level !== undefined && this.levelText) {
      this.levelText.setText(`LVL ${newStats.level}`);
    }

    if (newStats.gold !== undefined && this.goldText) {
      this.goldText.setText(`💰 ${newStats.gold}`);
    }
  }

  /**
   * Animate health change
   */
  public animateHealthChange(from: number, to: number, duration: number = 500): void {
    if (!this.healthBar) return;

    const startTime = Date.now();
    const diff = to - from;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = from + diff * progress;

      this.healthBar!.setValue(Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }
}

/**
 * ProgressBar - Animated progress bar for health/mana/etc
 */
class ProgressBar extends Box {
  private label: Text;
  private valueText: Text;
  private bar: Box;
  private fill: Box;
  private maxValue: number;
  private currentValue: number;
  private color: string;

  constructor(props: {
    label: string;
    value: number;
    maxValue: number;
    color: string;
    width?: number;
  }) {
    const { label, value, maxValue, color, width = 150 } = props;

    super({
      width,
    });

    this.maxValue = maxValue;
    this.currentValue = value;
    this.color = color;

    // Create container
    const container = new VStack({
      gap: 1,
      width: 'full',
    });

    // Label and value row
    const labelRow = new HStack({
      justifyContent: 'space-between',
      alignItems: 'center',
    });

    this.label = new Text({
      children: label,
      fontSize: 'xs',
      fontWeight: 'bold',
      color: 'textSecondary',
    });

    this.valueText = new Text({
      children: `${value}/${maxValue}`,
      fontSize: 'xs',
      color: 'textMuted',
    });

    labelRow.appendChild(this.label);
    labelRow.appendChild(this.valueText);
    container.appendChild(labelRow);

    // Progress bar
    this.bar = new Box({
      width: 'full',
      height: 16,
      backgroundColor: 'backgroundDark',
      borderRadius: 'sm',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'surfaceLight',
      overflow: 'hidden',
      position: 'relative',
    });

    this.fill = new Box({
      position: 'absolute',
      top: 0,
      left: 0,
      height: 'full',
      width: `${this.getPercentage()}%`,
      backgroundColor: color,
      transition: 'normal',
    });

    this.bar.appendChild(this.fill);
    container.appendChild(this.bar);

    super.appendChild(container);
  }

  private getPercentage(): number {
    return (this.currentValue / this.maxValue) * 100;
  }

  private getBarColor(): string {
    const percentage = this.getPercentage();
    if (percentage > 50) return this.color;
    if (percentage > 25) return 'healthYellow';
    return 'healthRed';
  }

  public setValue(value: number): void {
    this.currentValue = Math.max(0, Math.min(value, this.maxValue));
    const percentage = this.getPercentage();

    this.fill.update({
      width: `${percentage}%`,
      backgroundColor: this.getBarColor(),
    });

    this.valueText.setText(`${Math.round(this.currentValue)}/${this.maxValue}`);
  }

  public setMaxValue(maxValue: number): void {
    this.maxValue = maxValue;
    this.setValue(this.currentValue);
  }
}

/**
 * Factory function
 */
export function createHUD(props?: HUDProps): HUD {
  return new HUD(props);
}
