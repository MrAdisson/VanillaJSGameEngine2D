import { ENTITIES } from '../entities/entities.js';
import { GameManager } from '../gameManager.js';
import { keyManager } from '../inputManager.js';
import { getSign } from '../util.js';

export class Movement {
  constructor(parent, speed = 3, direction = 'bottom') {
    this.parent = parent;
    this.isMoving = false;
    this.speed = speed;
    this.direction = direction;
    this.speedBoost = 1;
    this.target = null;
    this.path = [];
  }

  initiateMovement(direction) {
    if (this.isMoving) return;
    this.isMoving = true;
    this.direction = direction;
    this.setTarget(direction);
  }

  setTarget(direction) {
    const grid = GameManager.getInstance().getGrid();
    switch (direction) {
      case 'top':
        this.target = {
          x: this.parent.location.x,
          y: this.parent.location.y - grid.CELL_SIZE,
        };
        break;
      case 'bottom':
        this.target = {
          x: this.parent.location.x,
          y: this.parent.location.y + grid.CELL_SIZE,
        };
        break;
      case 'left':
        this.target = {
          x: this.parent.location.x - grid.CELL_SIZE,
          y: this.parent.location.y,
        };
        break;
      case 'right':
        this.target = {
          x: this.parent.location.x + grid.CELL_SIZE,
          y: this.parent.location.y,
        };
        break;
      default:
        break;
    }
  }

  checkIfTargetReached = () => {
    if (this.direction === 'top') {
      if (this.parent.location.y <= this.target.y) {
        this.parent.location.y = this.target.y;
        return true;
      }
    }
    if (this.direction === 'bottom') {
      if (this.parent.location.y >= this.target.y) {
        this.parent.location.y = this.target.y;
        return true;
      }
    }
    if (this.direction === 'left') {
      if (this.parent.location.x <= this.target.x) {
        this.parent.location.x = this.target.x;
        return true;
      }
    }
    if (this.direction === 'right') {
      if (this.parent.location.x >= this.target.x) {
        this.parent.location.x = this.target.x;
        return true;
      }
    }
    return false;
  };

  move = (delta) => {
    const map = GameManager.getInstance().mapManager.currentMap;
    const grid = GameManager.getInstance().getGrid();
    const uiManager = GameManager.getInstance().getUIManager();

    if (uiManager.isDialogOpen()) return;
    if (this.parent.collides) {
      if (this.target) {
        const targetCell = {
          x: Math.floor(this.target.x / grid.CELL_SIZE),
          y: Math.floor(this.target.y / grid.CELL_SIZE),
        };
        const collidingObject = Object.keys(map.objectsLocation).find((object) => {
          return map.objectsLocation[object].some((location) => {
            return location.x === targetCell.x && location.y === targetCell.y && ENTITIES[object].collides();
          });
        });
        if (collidingObject) {
          console.log('COLLIDING WITH :', collidingObject);
          this.target = {
            x: this.parent.location.x,
            y: this.parent.location.y,
          };
          return;
        }
      }
    }
    if (this.isMoving) {
      this.parent.location.x =
        getSign(this.target.x - this.parent.location.x) * this.speed * grid.CELL_SIZE * this.speedBoost * delta +
        this.parent.location.x;
      this.parent.location.y =
        getSign(this.target.y - this.parent.location.y) * this.speed * grid.CELL_SIZE * this.speedBoost * delta +
        this.parent.location.y;
      const hasReached = this.checkIfTargetReached();
      if (hasReached) {
        // update parent coordinates:
        this.parent.coordinates = {
          x: Math.floor(this.parent.location.x / grid.CELL_SIZE),
          y: Math.floor(this.parent.location.y / grid.CELL_SIZE),
        };
      }
      return hasReached;
    }
    return false;
  };

  static setNextTarget(player) {
    if (GameManager.getInstance().getUIManager().isDialogOpen()) return;
    if (GameManager.getInstance().getBattleManager().isBattling()) return;
    const grid = GameManager.getInstance().getGrid();
    if (keyManager['ArrowUp'] || keyManager['z']) {
      player.movement.direction = 'top';
      player.movement.target = {
        ...player.movement.target,
        y: player.movement.target.y - grid.CELL_SIZE,
      };
    } else if (keyManager['ArrowDown'] || keyManager['s']) {
      player.movement.direction = 'bottom';
      player.movement.target = {
        ...player.movement.target,
        y: player.movement.target.y + grid.CELL_SIZE,
      };
    } else if (keyManager['ArrowLeft'] || keyManager['q']) {
      player.movement.direction = 'left';
      player.movement.target = {
        ...player.movement.target,
        x: player.movement.target.x - grid.CELL_SIZE,
      };
    } else if (keyManager['ArrowRight'] || keyManager['d']) {
      player.movement.direction = 'right';
      player.movement.target = {
        ...player.movement.target,
        x: player.movement.target.x + grid.CELL_SIZE,
      };
    } else {
      player.movement.target = undefined;
    }
  }
}
