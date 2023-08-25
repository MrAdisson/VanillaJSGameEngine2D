//MAKE THIS A CLASS

import { GRID } from './statics.js';

export class Grid {
  constructor(
    CELL_SIZE = GRID.CELL_SIZE,
    BORDER_COLOR = 'grey',
    BORDER_WIDTH = 1
  ) {
    this.CELL_SIZE = CELL_SIZE;
    this.BORDER_COLOR = BORDER_COLOR;
    this.BORDER_WIDTH = BORDER_WIDTH;
  }
  update(delta) {
    //update grid if needed
  }
  draw(ctx) {
    for (let x = 0; x < ctx.canvas.width; x += this.CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.strokeStyle = this.BORDER_COLOR;
      ctx.lineWidth = this.BORDER_WIDTH;
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < ctx.canvas.height; y += this.CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }
  }
}
