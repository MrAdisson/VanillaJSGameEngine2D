export class DialogBox {
  constructor(type, text) {
    this.type = type;
    this.text = text;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }

  draw(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    // draw at the bottom of the screen:
    ctx.fillRect(0, ctx.canvas.height - 100, ctx.canvas.width, 100);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(this.text, 20, ctx.canvas.height - 70);
    // DRAW (PRESS E TO CLOSE) IN THE BOTTOM RIGHT CORNER:
    const closeText = '(Press E to close)';
    const closeTextWidth = ctx.measureText(closeText).width;
    ctx.fillText(closeText, ctx.canvas.width - closeTextWidth - 20, ctx.canvas.height - 20);
  }
}
