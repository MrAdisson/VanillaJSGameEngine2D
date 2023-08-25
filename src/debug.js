import { GameManager } from './gameManager.js';

export const logClickedCell = (event, ctx) => {
  const camera = GameManager.getInstance().camera;
  const grid = GameManager.getInstance().getGrid();
  const rect = ctx.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const clickedCell = {
    x: Math.floor(
      x / grid.CELL_SIZE + camera.getOffset(ctx).x / grid.CELL_SIZE
    ),
    y: Math.floor(
      y / grid.CELL_SIZE + camera.getOffset(ctx).y / grid.CELL_SIZE
    ),
  };
  console.log(clickedCell);
};
