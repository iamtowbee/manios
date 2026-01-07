# 🎮 TanGui

> A game-focused UI library for web, inspired by [Tamagui](https://tamagui.dev)

**TanGui** is a TypeScript UI component library designed specifically for game interfaces, pixel art aesthetics, and interactive experiences. Built with performance and developer experience in mind.

## ✨ Features

- 🎨 **Design Token System** - Comprehensive theming with semantic tokens
- 🧩 **Composable Components** - Build complex UIs from simple primitives
- 🎯 **Type-Safe** - Full TypeScript support with intelligent autocomplete
- 🎮 **Game-First** - Built for dialogue boxes, HUDs, menus, and game UIs
- 🖼️ **Pixel-Perfect** - Optimized for pixel art and retro aesthetics
- ⚡ **Performant** - Lightweight with zero dependencies
- 🎭 **Animation System** - Built-in transitions and keyframe animations
- 🎨 **Variant Support** - Easy component variations with type safety

## 🚀 Quick Start

```typescript
import { init, Box, Text, Button, DialogueBox } from '@curds/tangui';

// Initialize TanGui (call once at app start)
init();

// Create a simple UI
const container = new Box({
  padding: 4,
  backgroundColor: 'background',
  borderRadius: 'md'
});

const text = new Text({
  children: 'Hello, TanGui!',
  fontSize: 'lg',
  color: 'primary'
});

const button = new Button({
  children: 'Click Me!',
  variant: 'primary',
  onClick: () => console.log('Button clicked!')
});

container.appendChild(text);
container.appendChild(button);
container.appendTo(document.body);
```

## 📦 Installation

```bash
npm install @curds/tangui
```

## 🎯 Core Concepts

### Design Tokens

TanGui uses a comprehensive token system for consistent theming:

```typescript
import { tokens } from '@curds/tangui/themes';

// Access tokens
const primaryColor = tokens.colors.primary; // '#FFD700'
const spacing = tokens.space[4]; // '16px'
const radius = tokens.radii.md; // '4px'
```

### Component Composition

Build UIs by composing primitives:

```typescript
const card = new Box({
  padding: 4,
  backgroundColor: 'surface',
  borderRadius: 'lg',
  boxShadow: 'md'
});

const title = new Text({
  children: 'Card Title',
  fontSize: 'xl',
  fontWeight: 'bold'
});

const body = new Text({
  children: 'Card content goes here',
  color: 'textSecondary'
});

card.appendChild(title);
card.appendChild(body);
```

### Game Components

Pre-built components for common game UI patterns:

```typescript
import { DialogueBox, HUD, Menu } from '@curds/tangui/game';

// Dialogue system
const dialogue = new DialogueBox({
  speaker: 'Cheese Master',
  text: 'Welcome to the village!',
  choices: [
    { text: 'Hello!', action: () => console.log('Greeted') },
    { text: 'Goodbye', action: () => console.log('Left') }
  ]
});

dialogue.show();
```

## 🎨 Theming

TanGui includes a pixel-art optimized theme out of the box:

- **Colors**: Brand, semantic, and grayscale palettes
- **Typography**: Pixel-perfect font sizing and line heights
- **Spacing**: Consistent 4px-based spacing scale
- **Shadows**: Pixel-art style shadows
- **Radii**: Border radius tokens
- **Animations**: Pre-defined transitions

## 📚 Components

### Primitives
- `Box` - Flexible layout primitive
- `Text` - Typography component
- `Stack` - Flex layout container
- `Grid` - Grid layout container

### Base Components
- `Button` - Interactive button with variants
- `Card` - Container with elevation
- `Input` - Form input field
- `Image` - Image with loading states

### Game Components
- `DialogueBox` - Conversation UI with typewriter effect
- `HUD` - Heads-up display overlay
- `Menu` - Game menu with navigation
- `HealthBar` - Animated progress bar
- `Inventory` - Grid-based item display

## 🔧 Integration with Curds Engine

TanGui is designed to work seamlessly with the Curds WASM game engine:

```typescript
import { Engine } from '@curds/engine';
import { DialogueBox, HUD } from '@curds/tangui/game';

const engine = new Engine('game-canvas');
const hud = new HUD({
  playerName: 'Hero',
  health: 100,
  score: 0
});

// Update HUD based on game state
engine.on('update', (time) => {
  hud.update({
    health: player.health,
    score: player.score
  });
});
```

## 🎭 Animation

Built-in animation utilities:

```typescript
import { animate } from '@curds/tangui/animations';

animate(element, {
  from: { opacity: 0, transform: 'translateY(-10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
  duration: 300,
  easing: 'ease-out'
});
```

## 📖 Examples

### Creating a Dialogue System

```typescript
import { DialogueBox } from '@curds/tangui/game';

const dialogue = new DialogueBox({
  lines: [
    {
      speaker: 'Cheese Master',
      text: 'Welcome to the village!',
    },
    {
      speaker: 'Cheese Master',
      text: 'What brings you here?',
      choices: [
        {
          text: 'I seek adventure!',
          action: () => console.log('Adventure chosen')
        },
        {
          text: 'Just exploring.',
          action: () => console.log('Exploring')
        }
      ]
    }
  ],
  typewriterSpeed: 30,
  onComplete: () => console.log('Dialogue finished')
});

dialogue.appendTo(document.body);
dialogue.show();
```

### Creating a HUD

```typescript
import { HUD } from '@curds/tangui/game';

const hud = new HUD({
  playerName: 'Hero',
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 100,
  level: 5,
  score: 1234,
  gold: 567
});

hud.appendTo(document.body);

// Update stats
hud.updateStats({
  health: 75,
  score: 1500
});

// Animate health change
hud.animateHealthChange(75, 100, 1000);
```

### Creating a Menu

```typescript
import { Menu } from '@curds/tangui/game';

const menu = new Menu({
  title: 'Main Menu',
  items: [
    {
      label: 'Start Game',
      icon: '▶',
      action: () => startGame()
    },
    {
      label: 'Settings',
      icon: '⚙',
      action: () => showSettings()
    },
    {
      label: 'Quit',
      icon: '✕',
      action: () => quitGame()
    }
  ],
  keyboardNavigation: true
});

menu.appendTo(document.body);
menu.show();
```

### Using Layout Components

```typescript
import { VStack, HStack, Box, Text, Spacer } from '@curds/tangui';

const container = new VStack({
  padding: 4,
  gap: 3,
  backgroundColor: 'background'
});

const header = new HStack({
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingX: 4,
  paddingY: 2,
  backgroundColor: 'surface'
});

const title = new Text({
  children: 'My Game',
  fontSize: 'xl',
  fontWeight: 'bold'
});

const score = new Text({
  children: 'Score: 1000',
  color: 'primary'
});

header.appendChild(title);
header.appendChild(new Spacer());
header.appendChild(score);
container.appendChild(header);
```

## 📖 Documentation

See the `/examples` directory for complete working examples including game integration.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines.

## 📄 License

MIT © Curds.io Contributors

---

**Built with ❤️ for game developers**
