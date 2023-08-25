//MAKE THIS A CLASS

import { GameManager } from './gameManager.js';
import { GRID } from './statics.js';

export class Grid {
  constructor(CELL_SIZE = GRID.CELL_SIZE, BORDER_COLOR = 'grey', BORDER_WIDTH = 1) {
    this.CELL_SIZE = CELL_SIZE;
    this.BORDER_COLOR = BORDER_COLOR;
    this.BORDER_WIDTH = BORDER_WIDTH;
  }

  changeCellSize(size) {
    const game = GameManager.getInstance();
    const player = game.getPlayer();
    if (player.movement.isMoving) return;
    this.CELL_SIZE = size;
    if (player.location.x !== player.coordinates.x * this.CELL_SIZE) {
      player.location.x = player.coordinates.x * this.CELL_SIZE;
    }
    if (player.location.y !== player.coordinates.y * this.CELL_SIZE) {
      player.location.y = player.coordinates.y * this.CELL_SIZE;
    }
  }
  update(delta) {}
  draw(ctx, camera) {
    ctx.beginPath();
    ctx.strokeStyle = this.BORDER_COLOR;
    ctx.lineWidth = this.BORDER_WIDTH;
    for (let y = -camera.getOffset(ctx).y % this.CELL_SIZE; y < ctx.canvas.height; y += this.CELL_SIZE) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }
    ctx.stroke();
    ctx.beginPath();
    for (let x = -camera.getOffset(ctx).x % this.CELL_SIZE; x < ctx.canvas.width; x += this.CELL_SIZE) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }
    ctx.stroke();
  }
}
