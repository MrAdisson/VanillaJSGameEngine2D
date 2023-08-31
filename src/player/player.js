import { Movement } from '../class/movement.js';
import { GameManager } from '../gameManager.js';
import { managePlayerAnimation } from './playerAnimation.js';
import playerActions from './playerActions.js';

export class Player {
  constructor() {
    this.color = 'purple';
    this.collides = true;
    this.location = null;
    this.width = 1;
    this.height = 1;
    this.movement = null;
    this.coordinates = null;
    this.actions = playerActions;
    this.isSurfing = false;
  }
  draw(ctx, camera) {
    const game = GameManager.getInstance();
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.location.x - camera.getOffset(ctx).x,
      this.location.y - camera.getOffset(ctx).y,
      this.width * game.getGrid().CELL_SIZE,
      this.height * game.getGrid().CELL_SIZE
    );
  }

  init() {
    const game = GameManager.getInstance();
    const grid = game.getGrid();
    const map = game.getMap();
    this.coordinates = {
      x: map.playerStart.x,
      y: map.playerStart.y,
    };
    this.location = {
      x: map.playerStart.x * grid.CELL_SIZE,
      y: map.playerStart.y * grid.CELL_SIZE,
    };
    this.movement = new Movement(3, 'bottom');
  }
  update(delta) {
    const game = GameManager.getInstance();
    // update coordinates:
    managePlayerAnimation(this);
    if (!this.movement.isMoving) return;
    this.move(delta);
  }
  move(delta) {
    const game = new GameManager();
    if (game.battleManager.isBattling() || game.uiManager.isDialogOpen()) return;
    const hasReached = this.movement.move(delta);
    if (hasReached) {
      Movement.setNextTarget(this);
    }
  }
}
