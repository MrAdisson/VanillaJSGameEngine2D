import { keyManager, manageInput } from './inputManager.js';
import { GameManager } from './gameManager.js';
import { preloadAssets } from './preload.js';
import { logClickedCell } from './debug.js';

//INITIALIZE CANVAS AND CONTEXT
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//ADD EVENT LISTENERS FOR KEYBOARD INPUT
document.addEventListener('keydown', manageInput);
document.addEventListener('keyup', (event) => {
  keyManager[event.key] = false;
});

// PRE LOAD STATIC IMAGES:

//ON CLICK ON A CELL, LOG CELL COORDINATES
canvas.addEventListener('click', (event) => {
  logClickedCell(event, ctx);
});

// INITIALIZE GAME MANAGER, PLAYER, MAP MANAGER AND GRID
const game = new GameManager();
game.init(canvas);

preloadAssets();

const FPS = 60;
let lastTime;

const requiredElapsed = 1000 / FPS;
let delta;

const gameLoop = (now) => {
  requestAnimationFrame(gameLoop);
  if (!lastTime) {
    lastTime = now;
  }
  const elapsed = now - lastTime;
  if (elapsed > requiredElapsed) {
    delta = (now - lastTime) / 1000;
    lastTime = now;
    game.update(delta);
    game.draw(ctx);
  }
};

requestAnimationFrame(gameLoop);
