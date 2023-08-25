import { Movement } from '../class/movement.js';
import { GameManager } from '../gameManager.js';
import { GRID } from '../statics.js';
import { managePlayerAnimation } from './playerAnimation.js';

export class Player {
  constructor() {
    this.location = {
      x: 15 * GRID.CELL_SIZE,
      y: 5 * GRID.CELL_SIZE,
    };
    this.width = GRID.CELL_SIZE;
    this.height = GRID.CELL_SIZE;
    this.color = 'purple';
    this.movement = new Movement(this, 3, 'bottom');
    this.collides = true;
  }
  draw(ctx) {
    const game = new GameManager();
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.location.x,
      this.location.y,
      game.getMapManager().grid.CELL_SIZE,
      game.getMapManager().grid.CELL_SIZE
    );
  }
  update(delta) {
    managePlayerAnimation(this);
    if (!this.movement.isMoving) return;
    this.move(delta);
  }
  move(delta) {
    const hasReached = this.movement.move(delta);
    if (hasReached) {
      Movement.setNextTarget(this);
      if (this.movement.target) {
        this.movement.move(delta);
      } else {
        this.movement.isMoving = false;
      }
    }
  }
}
