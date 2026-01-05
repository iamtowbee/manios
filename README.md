# 🧀 Curds.io

A charming pixel art toon adventure game with interactive dialogue, built with vanilla JavaScript and HTML5 Canvas.

## 🎮 Features

- **Pixel Art Aesthetic**: Retro-style graphics with smooth animations
- **Interactive Dialogue System**: Engage in conversations with NPCs and make choices that affect the dialogue
- **Open World Exploration**: Explore a colorful world with varied terrain
- **Multiple NPCs**: Meet unique characters each with their own stories:
  - **Cheese Master**: The friendly vendor who welcomes you to the village
  - **Elder Brie**: A wise elder with knowledge of ancient legends
  - **Trader Tom**: A merchant struggling with tough times
  - **Shadow**: A mysterious figure with cryptic hints

## 🎯 Story

Welcome to the cheese village! Long ago, this land was united under the legendary Golden Curd, a cheese of immense power. But it was stolen by the evil Mold King and hidden in the Great Cheese Cave.

As a brave adventurer, you must explore the land, talk to villagers, and uncover the mystery of the three cheese fragments: the Cheddar of Courage, Gouda of Wisdom, and Mozzarella of Heart.

## 🕹️ Controls

- **Arrow Keys** or **WASD**: Move your character
- **SPACE** or **ENTER**: Interact with NPCs / Continue dialogue
- Walk near NPCs to see the 💬 icon, then press SPACE to talk

## 🚀 How to Play

1. Open `index.html` in a modern web browser
2. Click "Start Game" on the title screen
3. Use arrow keys or WASD to move around the world
4. Approach NPCs (you'll see a 💬 icon when you're close enough)
5. Press SPACE or ENTER to start conversations
6. Read the dialogue and make choices when presented
7. Explore the world and discover the story!

## 🛠️ Technical Details

- **No dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **Canvas-based rendering**: Smooth 60fps gameplay
- **Responsive dialogue system**: Typewriter effect and branching conversations
- **Camera system**: Follows the player with world bounds
- **Tile-based world**: Procedurally varied terrain

## 📁 Project Structure

```
curds.io/
├── index.html      # Main HTML structure
├── style.css       # Game styling and animations
├── game.js         # Game engine and logic
└── README.md       # This file
```

## 🎨 Game Architecture

### Core Systems

1. **Game Loop**: Handles updates and rendering at 60fps
2. **Player System**: Movement, animation, and collision
3. **Camera System**: Follows player with smooth boundaries
4. **World Generation**: Procedural tile-based terrain
5. **NPC System**: Character positioning, interaction ranges, and dialogue triggers
6. **Dialogue System**:
   - Typewriter text effect
   - Branching dialogue with choices
   - Multiple dialogue sequences per NPC

### Code Structure

- `Game` object: Central game state management
- `DialogueSystem` class: Handles all dialogue interactions
- `NPC` class: Individual NPC behavior and rendering
- Modular functions: `init()`, `update()`, `draw()`, `gameLoop()`

## 🎭 NPCs and Their Stories

| NPC | Color | Location | Role |
|-----|-------|----------|------|
| Cheese Master | Yellow | Northwest | Introduces the world and quest |
| Elder Brie | Orange | Central | Reveals the legend of the Golden Curd |
| Trader Tom | Pink | Southeast | Provides context about the Mold King's impact |
| Shadow | Purple | East | Mysterious guide with cryptic clues |

## 🔮 Future Enhancements

- Quest system with objectives
- Inventory and items
- Combat mechanics
- Multiple areas and zones
- Save/load functionality
- More NPCs and dialogue branches
- Sound effects and music
- Mobile touch controls

## 📝 License

Open source - feel free to use and modify!

## 🙏 Credits

Created with ❤️ for lovers of pixel art, cheese, and adventure!

---

**Enjoy your adventure in Curds.io!** 🧀✨
