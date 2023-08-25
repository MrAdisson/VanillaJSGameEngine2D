import { keyManager, manageInput } from './inputManager.js';
import { GameManager } from './gameManager.js';
import { preloadAssets } from './preload.js';

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
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const clickedCell = {
    x: Math.floor(x / grid.CELL_SIZE),
    y: Math.floor(y / grid.CELL_SIZE),
  };
  console.log(clickedCell);
});

// INITIALIZE GAME MANAGER, PLAYER, MAP MANAGER AND GRID
const game = new GameManager();
const grid = game.getGrid();

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
