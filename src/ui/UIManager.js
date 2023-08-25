import { DialogBox } from './dialogBox.js';

export class UIManager {
  //A CLASS THAT MANAGE UI ELEMENTS LIKE DIALOG BOXES, MENUS, ETC
  constructor() {
    this.dialogBox = null;
    this.menu = null;
  }

  openDialog(type, text) {
    this.dialogBox = new DialogBox(type, text);
  }
  closeDialog() {
    this.dialogBox = null;
  }
  isDialogOpen() {
    return !!this.dialogBox;
  }
  update(delta) {}

  draw(ctx) {
    if (this.dialogBox) {
      this.dialogBox.draw(ctx);
    }
  }
}
