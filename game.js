// Curds.io - Now powered by TanGui!

// Game State
const Game = {
    canvas: null,
    ctx: null,
    width: 800,
    height: 600,
    tileSize: 32,
    running: false,
    lastTime: 0,
    keys: {},

    player: {
        x: 400,
        y: 300,
        width: 24,
        height: 24,
        speed: 2,
        direction: 'down',
        animFrame: 0,
        animTimer: 0,
        color: '#ffd700'
    },

    camera: {
        x: 0,
        y: 0
    },

    world: {
        width: 1600,
        height: 1200,
        tiles: []
    },

    npcs: [],
    dialogue: null,
    dialogueBox: null,
    hud: null
};

// Initialize TanGui on window load
function initTanGui() {
    // Initialize TanGui library
    if (window.TanGui && window.TanGui.init) {
        window.TanGui.init();
    }
}

// NPC Class
class NPC {
    constructor(x, y, name, color, dialogue) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.name = name;
        this.color = color;
        this.dialogue = dialogue;
        this.interactRange = 40;
    }

    draw(ctx, camera) {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;

        // Body
        ctx.fillStyle = this.color;
        ctx.fillRect(screenX, screenY, this.width, this.height);

        // Eyes
        ctx.fillStyle = '#fff';
        ctx.fillRect(screenX + 6, screenY + 8, 4, 4);
        ctx.fillRect(screenX + 14, screenY + 8, 4, 4);

        ctx.fillStyle = '#000';
        ctx.fillRect(screenX + 8, screenY + 10, 2, 2);
        ctx.fillRect(screenX + 16, screenY + 10, 2, 2);

        // Name tag
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(screenX - 10, screenY - 20, this.name.length * 8 + 10, 16);
        ctx.fillStyle = '#ffd700';
        ctx.font = '12px "Courier New"';
        ctx.fillText(this.name, screenX - 5, screenY - 8);
    }

    isPlayerNearby(player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.interactRange;
    }
}

// Initialize Game
function init() {
    // Initialize TanGui
    initTanGui();

    Game.canvas = document.getElementById('game-canvas');
    Game.ctx = Game.canvas.getContext('2d');
    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;

    // Create world tiles
    createWorld();

    // Create NPCs
    createNPCs();

    // Create TanGui DialogueBox (reusable instance)
    if (window.TanGui) {
        Game.dialogueBox = new window.TanGui.DialogueBox({
            position: 'bottom',
            typewriterSpeed: 30,
            onComplete: () => {
                Game.dialogue.active = false;
            }
        });
        Game.dialogueBox.appendTo(document.body);

        // Create TanGui HUD
        Game.hud = new window.TanGui.HUD({
            playerName: 'Explorer',
            health: 100,
            maxHealth: 100
        });
        Game.hud.appendTo(document.getElementById('ui-overlay'));
    }

    // Dialogue state tracker
    Game.dialogue = {
        active: false
    };

    // Start button
    document.getElementById('start-btn').addEventListener('click', startGame);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        Game.keys[e.key.toLowerCase()] = true;

        if ((e.key === ' ' || e.key === 'Enter') && Game.dialogue.active) {
            e.preventDefault();
            // TanGui DialogueBox handles its own advancement via built-in keyboard controls
            return;
        }

        if ((e.key === ' ' || e.key === 'Enter') && !Game.dialogue.active) {
            e.preventDefault();
            checkNPCInteraction();
        }
    });

    document.addEventListener('keyup', (e) => {
        Game.keys[e.key.toLowerCase()] = false;
    });
}

function createWorld() {
    const cols = Math.ceil(Game.world.width / Game.tileSize);
    const rows = Math.ceil(Game.world.height / Game.tileSize);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const random = Math.random();
            let color;

            // Create varied terrain
            if (random < 0.7) {
                color = '#2ecc71'; // Grass
            } else if (random < 0.85) {
                color = '#27ae60'; // Dark grass
            } else if (random < 0.95) {
                color = '#95a5a6'; // Stone
            } else {
                color = '#3498db'; // Water
            }

            Game.world.tiles.push({
                x: x * Game.tileSize,
                y: y * Game.tileSize,
                color: color
            });
        }
    }
}

function createNPCs() {
    // Cheese vendor
    Game.npcs.push(new NPC(300, 200, 'Cheese Master', '#ffeb3b', {
        lines: [
            {
                speaker: 'Cheese Master',
                text: 'Welcome to Curds.io! The finest cheese in all the land!'
            },
            {
                speaker: 'Cheese Master',
                text: 'What brings you to our humble cheese village?',
                choices: [
                    {
                        text: 'I\'m looking for adventure!',
                        action: () => {
                            showDialogueResponse('Cheese Master', 'Ah, a brave soul! The Great Cheese Cave lies to the east. Many have entered, few have returned with the legendary Golden Curd!');
                        }
                    },
                    {
                        text: 'Just exploring...',
                        action: () => {
                            showDialogueResponse('Cheese Master', 'Take your time! Talk to the other villagers, they might have quests for you.');
                        }
                    },
                    {
                        text: 'Tell me about cheese.',
                        action: () => {
                            showDialogueResponse('Cheese Master', 'Cheese is life! From mild cheddar to sharp gouda, we craft them all here. Each cheese has its own story and magic!');
                        }
                    }
                ]
            }
        ]
    }));

    // Wise elder
    Game.npcs.push(new NPC(600, 400, 'Elder Brie', '#ff9800', {
        lines: [
            {
                speaker: 'Elder Brie',
                text: 'Greetings, young traveler. I sense great potential in you.'
            },
            {
                speaker: 'Elder Brie',
                text: 'Long ago, this land was united under the Golden Curd, a cheese of immense power.',
                choices: [
                    {
                        text: 'What happened to it?',
                        action: () => {
                            showDialogueResponse('Elder Brie', 'It was stolen by the Mold King and hidden in the Great Cheese Cave. Only the pure of heart can retrieve it.');
                        }
                    },
                    {
                        text: 'That sounds like a legend.',
                        action: () => {
                            showDialogueResponse('Elder Brie', 'Perhaps... or perhaps it\'s waiting for someone brave enough to find out the truth!');
                        }
                    }
                ]
            }
        ]
    }));

    // Friendly merchant
    Game.npcs.push(new NPC(900, 600, 'Trader Tom', '#e91e63', {
        lines: [
            {
                speaker: 'Trader Tom',
                text: 'Hey there! Looking to trade? I\'ve got the best deals in town!'
            },
            {
                speaker: 'Trader Tom',
                text: 'Well, I would have deals if I had any inventory. Business has been slow...',
                choices: [
                    {
                        text: 'Why is that?',
                        action: () => {
                            showDialogueResponse('Trader Tom', 'Ever since the Mold King appeared, nobody wants to venture out anymore. It\'s killing my business!');
                        }
                    },
                    {
                        text: 'Cheer up!',
                        action: () => {
                            showDialogueResponse('Trader Tom', 'Thanks, friend! Your optimism is refreshing. Come back when you\'ve found some treasures!');
                        }
                    }
                ]
            }
        ]
    }));

    // Mysterious stranger
    Game.npcs.push(new NPC(1200, 300, 'Shadow', '#9c27b0', {
        lines: [
            {
                speaker: '???',
                text: '...'
            },
            {
                speaker: 'Shadow',
                text: 'You seem different from the others. Perhaps you\'re the one...',
                choices: [
                    {
                        text: 'The one what?',
                        action: () => {
                            showDialogueResponse('Shadow', 'The one who can end this curse. Find the three cheese fragments: Cheddar of Courage, Gouda of Wisdom, and Mozzarella of Heart.');
                        }
                    },
                    {
                        text: 'Who are you?',
                        action: () => {
                            showDialogueResponse('Shadow', 'I am but a shadow of what once was. Help this land, and you\'ll understand everything.');
                        }
                    }
                ]
            }
        ]
    }));
}

// Helper function to show dialogue response
function showDialogueResponse(speaker, text) {
    if (Game.dialogueBox) {
        Game.dialogueBox.setLines([{
            speaker: speaker,
            text: text
        }]);
        Game.dialogueBox.show();
    }
}

function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    Game.running = true;
    gameLoop(0);
}

function checkNPCInteraction() {
    for (const npc of Game.npcs) {
        if (npc.isPlayerNearby(Game.player)) {
            if (Game.dialogueBox) {
                Game.dialogue.active = true;
                Game.dialogueBox.setLines(npc.dialogue.lines);
                Game.dialogueBox.show();
            }
            break;
        }
    }
}

function update(deltaTime) {
    if (Game.dialogue.active) return;

    // Player movement
    let dx = 0;
    let dy = 0;

    if (Game.keys['arrowup'] || Game.keys['w']) {
        dy = -Game.player.speed;
        Game.player.direction = 'up';
    }
    if (Game.keys['arrowdown'] || Game.keys['s']) {
        dy = Game.player.speed;
        Game.player.direction = 'down';
    }
    if (Game.keys['arrowleft'] || Game.keys['a']) {
        dx = -Game.player.speed;
        Game.player.direction = 'left';
    }
    if (Game.keys['arrowright'] || Game.keys['d']) {
        dx = Game.player.speed;
        Game.player.direction = 'right';
    }

    // Update player position
    const newX = Game.player.x + dx;
    const newY = Game.player.y + dy;

    // World bounds
    if (newX >= 0 && newX <= Game.world.width - Game.player.width) {
        Game.player.x = newX;
    }
    if (newY >= 0 && newY <= Game.world.height - Game.player.height) {
        Game.player.y = newY;
    }

    // Update animation
    if (dx !== 0 || dy !== 0) {
        Game.player.animTimer += deltaTime;
        if (Game.player.animTimer > 200) {
            Game.player.animFrame = (Game.player.animFrame + 1) % 4;
            Game.player.animTimer = 0;
        }
    } else {
        Game.player.animFrame = 0;
    }

    // Camera follows player
    Game.camera.x = Game.player.x - Game.width / 2 + Game.player.width / 2;
    Game.camera.y = Game.player.y - Game.height / 2 + Game.player.height / 2;

    // Camera bounds
    Game.camera.x = Math.max(0, Math.min(Game.camera.x, Game.world.width - Game.width));
    Game.camera.y = Math.max(0, Math.min(Game.camera.y, Game.world.height - Game.height));

    // Update location info
    document.getElementById('location-info').textContent =
        `Position: ${Math.floor(Game.player.x)}, ${Math.floor(Game.player.y)}`;
}

function draw() {
    Game.ctx.clearRect(0, 0, Game.width, Game.height);

    // Draw world tiles
    for (const tile of Game.world.tiles) {
        const screenX = tile.x - Game.camera.x;
        const screenY = tile.y - Game.camera.y;

        if (screenX < -Game.tileSize || screenX > Game.width ||
            screenY < -Game.tileSize || screenY > Game.height) {
            continue;
        }

        Game.ctx.fillStyle = tile.color;
        Game.ctx.fillRect(screenX, screenY, Game.tileSize, Game.tileSize);

        // Tile border
        Game.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        Game.ctx.strokeRect(screenX, screenY, Game.tileSize, Game.tileSize);
    }

    // Draw NPCs
    for (const npc of Game.npcs) {
        npc.draw(Game.ctx, Game.camera);

        // Interaction indicator
        if (npc.isPlayerNearby(Game.player) && !Game.dialogue.active) {
            const screenX = npc.x - Game.camera.x;
            const screenY = npc.y - Game.camera.y;

            Game.ctx.fillStyle = '#fff';
            Game.ctx.font = '16px "Courier New"';
            Game.ctx.fillText('💬', screenX + 5, screenY - 25);
        }
    }

    // Draw player
    const playerScreenX = Game.player.x - Game.camera.x;
    const playerScreenY = Game.player.y - Game.camera.y;

    // Player body
    Game.ctx.fillStyle = Game.player.color;
    Game.ctx.fillRect(playerScreenX, playerScreenY, Game.player.width, Game.player.height);

    // Player face
    Game.ctx.fillStyle = '#fff';
    Game.ctx.fillRect(playerScreenX + 5, playerScreenY + 6, 5, 5);
    Game.ctx.fillRect(playerScreenX + 14, playerScreenY + 6, 5, 5);

    Game.ctx.fillStyle = '#000';
    Game.ctx.fillRect(playerScreenX + 7, playerScreenY + 8, 2, 2);
    Game.ctx.fillRect(playerScreenX + 16, playerScreenY + 8, 2, 2);

    // Player smile
    Game.ctx.fillStyle = '#000';
    Game.ctx.fillRect(playerScreenX + 8, playerScreenY + 16, 8, 2);

    // Animation bobbing
    if (Game.player.animFrame % 2 === 1) {
        Game.ctx.fillRect(playerScreenX, playerScreenY, Game.player.width, Game.player.height);
    }
}

function gameLoop(currentTime) {
    if (!Game.running) return;

    const deltaTime = currentTime - Game.lastTime;
    Game.lastTime = currentTime;

    update(deltaTime);
    draw();

    requestAnimationFrame(gameLoop);
}

// Start on load
window.addEventListener('load', init);
