import { GameManager } from '../gameManager.js';

export class Camera {
  // CAMERA TO FOLLOW PLAYER (the instance will be passed to the draw functions):
  constructor({ followsPlayer = false }) {
    const game = GameManager.getInstance();
    this.x = game.getPlayer().location.x;
    this.y = game.getPlayer().location.y;
    this.followsPlayer = followsPlayer;
    this.movingDirection = game.getPlayer().movement.direction;
    this.dynamicOffsetIncrement = { x: 0, y: 0 };
    this.dynamicOffsetIncrementSpeed = 0.1;
    this.maxDynamicOffsetIncrement = 13;
    this.complementaryOffset = {
      x: 0,
      y: 0,
    };
  }

  getOffset(ctx) {
    if (this.followsPlayer) {
      const game = GameManager.getInstance();
      const player = game.getPlayer();
      const offset = {
        x: this.x - ctx.canvas.width / 2 + (player.width * game.getGrid().CELL_SIZE) / 2 + this.complementaryOffset.x,
        y: this.y - ctx.canvas.height / 2 + (player.height * game.getGrid().CELL_SIZE) / 2 + this.complementaryOffset.y,
      };
      return offset;
    }
    return { x: 0, y: 0 };
  }

  update(delta) {
    const game = GameManager.getInstance();
    const player = game.getPlayer();
    this.x = player.location.x;
    this.y = player.location.y;
  }
}
