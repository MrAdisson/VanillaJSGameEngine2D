import { GameManager } from './gameManager.js';

export const logClickedCell = (event, ctx) => {
  const game = new GameManager();

  const camera = game.camera;
  const grid = game.getGrid();
  const canvas = ctx.canvas;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  //CALCULATE CELL COORDINATES:
  const clickedCell = {
    x: Math.floor((x + camera.x * camera.zoom - canvas.width / 2) / grid.CELL_SIZE / camera.zoom),
    y: Math.floor((y + camera.y * camera.zoom - canvas.height / 2) / grid.CELL_SIZE / camera.zoom),
  };

  console.log(clickedCell);
};
