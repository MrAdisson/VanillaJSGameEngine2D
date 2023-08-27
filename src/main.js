import { keyManager, manageInput } from './inputManager.js';
import { GameManager } from './gameManager.js';
import { preloadAssets } from './preload.js';
import { logClickedCell } from './debug.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm';

//INITIALIZE CANVAS AND CONTEXT
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gui = new GUI();

//ADD EVENT LISTENERS FOR KEYBOARD INPUT
document.addEventListener('keydown', manageInput);
document.addEventListener('keyup', (event) => {
  keyManager[event.key] = false;
});

// PRE LOAD STATIC IMAGES:

// ON CLICK ON A CELL, LOG CELL COORDINATES
canvas.addEventListener('click', (event) => {
  logClickedCell(event, ctx);
});

// INITIALIZE GAME MANAGER, PLAYER, MAP MANAGER AND GRID
const game = new GameManager();
game.init(ctx);

const uiManager = game.getUIManager();
preloadAssets();

let lastTime;
const FPSarray = [];

gui.add(game.camera, 'showGrid');
gui.add(game.camera, 'followsPlayer');
gui.add(game.camera, 'x');
gui.add(game.camera, 'y');
gui.add(game.camera, 'zoom', 0.1, 10, 0.1);
gui.add(game.camera, 'horizontalFieldOfView', 0, 2000, 1);
gui.add(game.camera, 'verticalFieldOfView', 0, 2000, 1);
gui.add(game, 'isPaused');
gui.add(game, 'isLoading');
const gameLoop = (now) => {
  if (!lastTime) {
    lastTime = now;
  }
  const delta = (now - lastTime) / 1000;
  if (!game.isPaused) {
    game.update(delta);
  }
  game.draw(ctx);
  lastTime = now;

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
