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
game.init();

const uiManager = game.getUIManager();
preloadAssets();

const FPS = 60;
let lastTime;

const requiredElapsed = 1000 / FPS;
let delta;
const FPSarray = [];

const gameLoop = (now) => {
  if (!lastTime) {
    lastTime = now;
  }
  delta = (now - lastTime) / 1000;
  game.draw(ctx);
  game.update(delta);
  lastTime = now;
  if (delta !== 0) {
    const trueFPS = 1 / delta;
    FPSarray.push(trueFPS);
  }
  if (FPSarray.length === 1000) {
    // console.log(la moyenne des FPS);
    const avg = FPSarray.reduce((a, b) => a + b) / FPSarray.length;
    console.log('FPS : ', avg);
    FPSarray.length = 0;
  }
  requestAnimationFrame(gameLoop);

  //DRAW TRUE FPS
};

requestAnimationFrame(gameLoop);
