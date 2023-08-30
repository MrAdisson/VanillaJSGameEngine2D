import { GameManager } from '../gameManager.js';
import { DialogBox } from './dialogBox.js';

export class UIManager {
  //A CLASS THAT MANAGE UI ELEMENTS LIKE DIALOG BOXES, MENUS, ETC
  constructor() {
    this.stopMovement = false;
    this.dialogBox = null;
    this.menu = null;
    this.loadingTime = 0;
    this.delta = 0;
  }

  openDialog(type, text) {
    this.dialogBox = new DialogBox(type, text);
    this.stopMovement = true;
  }
  closeDialog() {
    this.dialogBox = null;
    this.stopMovement = false;
  }
  isDialogOpen() {
    return this.dialogBox !== null && this.dialogBox !== undefined;
  }

  drawLoadingScreen(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    const pointString = '.'.repeat(Math.floor((this.loadingTime * 2) % 4));
    ctx.fillText(`Loading${pointString}`, 20, 20);
  }

  updateLoadingScreen(delta) {
    this.loadingTime += delta;
  }

  update(delta) {
    this.delta = delta;
    const game = GameManager.getInstance();
    if (!game.isGameLoading()) {
      this.loadingTime = 0;
    }
  }

  drawBattle(ctx) {}

  draw(ctx) {
    // this.showFPS(ctx);
    if (this.dialogBox) {
      this.dialogBox.draw(ctx);
    }
  }
}
