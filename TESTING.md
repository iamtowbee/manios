# 🧪 Testing Guide for Curds.io

Quick guide to test TanGui and the game engine!

## 🎮 Option 1: Test TanGui Immediately (No Setup Required!)

**Easiest way to see TanGui in action:**

```bash
# Open the interactive test file in your browser
open tangui/test.html
# or on Linux: xdg-open tangui/test.html
# or just drag tangui/test.html into your browser
```

**What you'll see:**
- ✅ Interactive buttons with all variants
- ✅ Hoverable cards
- ✅ Input fields with focus effects
- ✅ Full dialogue system with typewriter effect and choices
- ✅ Animated HUD with health bars
- ✅ Event logging for all interactions
- ✅ Keyboard controls (SPACE to advance dialogue)

**No build required!** This HTML file demonstrates all TanGui components with pure CSS/JS styling that matches the actual library design.

---

## 🏗️ Option 2: Build and Use TanGui Properly

If you want to use TanGui in a real TypeScript project:

### 1. Install Dependencies

```bash
cd tangui
npm install
```

### 2. Build the Library

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Generate type declarations
- Output to `dist/` directory

### 3. Use in Your Project

```typescript
import { init, Box, Text, Button } from './tangui/dist/index.js';

// Initialize TanGui
init();

// Create components
const button = new Button({
  children: 'Click me!',
  variant: 'primary',
  onClick: () => console.log('Clicked!')
});

button.appendTo(document.body);
```

---

## 🦀 Option 3: Test Rust/WASM Engine

### 1. Build the Engine

```bash
cd engine
wasm-pack build --target web
```

This creates `engine/pkg/` with:
- `curds_engine_bg.wasm` - The compiled engine
- `curds_engine.js` - JavaScript bindings
- `curds_engine.d.ts` - TypeScript definitions

### 2. Use the Engine

```html
<!DOCTYPE html>
<html>
<head>
    <title>Curds Engine Test</title>
</head>
<body>
    <canvas id="game-canvas" width="800" height="600"></canvas>

    <script type="module">
        import init, { Engine } from './engine/pkg/curds_engine.js';

        async function run() {
            await init(); // Initialize WASM

            // Create engine
            const engine = new Engine('game-canvas');

            // Your game code here
            console.log('Engine ready!');
        }

        run();
    </script>
</body>
</html>
```

---

## 🎯 Option 4: Test Original JavaScript Game

The original Curds.io pixel game is ready to play:

```bash
# Open the game in your browser
open index.html
# or: xdg-open index.html
```

**Features:**
- ✅ Pixel art player character
- ✅ WASD/Arrow key movement
- ✅ 4 NPCs with dialogue
- ✅ Open world exploration
- ✅ Typewriter dialogue effect
- ✅ Choice system

---

## 📦 What's in This Repo

```
manios/
├── engine/              # Rust/WASM game engine
│   ├── src/            # Rust source code
│   └── pkg/            # Built WASM (after build)
├── tangui/             # UI library
│   ├── src/            # TypeScript source
│   ├── examples/       # Example code
│   ├── test.html       # 👈 TEST THIS FIRST!
│   └── dist/           # Built library (after build)
├── index.html          # Original JS game
├── game.js
└── style.css
```

---

## 🚀 Quick Start Summary

**Want to see TanGui right now?**
```bash
open tangui/test.html
```

**Want to play the game?**
```bash
open index.html
```

**Want to build everything?**
```bash
# Build Rust engine
cd engine && wasm-pack build --target web && cd ..

# Build TanGui
cd tangui && npm install && npm run build && cd ..
```

---

## 🐛 Troubleshooting

### "wasm-pack: command not found"
```bash
cargo install wasm-pack
```

### "npm: command not found"
Install Node.js from https://nodejs.org/

### Browser CORS errors
Use a local server:
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve

# Then open: http://localhost:8000
```

---

## 💡 Next Steps

1. **Try the test file first**: `tangui/test.html` - no setup needed!
2. **Play the original game**: `index.html`
3. **Build the libraries** if you want to use them in a project
4. **Check the examples**: `tangui/examples/` for integration code

---

**Happy testing! 🧀🎮**
