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
    ctx.fillRect(0, 0, 600, 200);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(this.text, 20, 20);
  }
}
