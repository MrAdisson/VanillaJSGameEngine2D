import { ENTITIES } from '../entities/entities.js';
import { GameManager } from '../gameManager.js';
import { GRID } from '../statics.js';
import { keyManager } from '../inputManager.js';
import { getSign } from '../util.js';

export class Movement {
  constructor(parent, speed = 3, direction = 'bottom') {
    this.parent = parent;
    this.isMoving = false;
    this.speed = speed * GRID.CELL_SIZE;
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
    switch (direction) {
      case 'top':
        this.target = {
          x: this.parent.location.x,
          y: this.parent.location.y - GRID.CELL_SIZE,
        };
        break;
      case 'bottom':
        this.target = {
          x: this.parent.location.x,
          y: this.parent.location.y + GRID.CELL_SIZE,
        };
        break;
      case 'left':
        this.target = {
          x: this.parent.location.x - GRID.CELL_SIZE,
          y: this.parent.location.y,
        };
        break;
      case 'right':
        this.target = {
          x: this.parent.location.x + GRID.CELL_SIZE,
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
    if (this.parent.collides) {
      if (this.target) {
        const targetCell = {
          x: Math.floor(this.target.x / GRID.CELL_SIZE),
          y: Math.floor(this.target.y / GRID.CELL_SIZE),
        };
        const collidingObject = Object.keys(map.objectsLocation).find(
          (object) => {
            return map.objectsLocation[object].some((location) => {
              return (
                location.x === targetCell.x &&
                location.y === targetCell.y &&
                ENTITIES[object].collides
              );
            });
          }
        );
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
        getSign(this.target.x - this.parent.location.x) *
          this.speed *
          this.speedBoost *
          delta +
        this.parent.location.x;
      this.parent.location.y =
        getSign(this.target.y - this.parent.location.y) *
          this.speed *
          this.speedBoost *
          delta +
        this.parent.location.y;
      const hasReached = this.checkIfTargetReached();
      return hasReached;
    }
    return false;
  };

  static setNextTarget(player) {
    if (keyManager['ArrowUp']) {
      player.movement.direction = 'top';
      player.movement.target = {
        ...player.movement.target,
        y: player.movement.target.y - GRID.CELL_SIZE,
      };
    } else if (keyManager['ArrowDown']) {
      player.movement.direction = 'bottom';
      player.movement.target = {
        ...player.movement.target,
        y: player.movement.target.y + GRID.CELL_SIZE,
      };
    } else if (keyManager['ArrowLeft']) {
      player.movement.direction = 'left';
      player.movement.target = {
        ...player.movement.target,
        x: player.movement.target.x - GRID.CELL_SIZE,
      };
    } else if (keyManager['ArrowRight']) {
      player.movement.direction = 'right';
      player.movement.target = {
        ...player.movement.target,
        x: player.movement.target.x + GRID.CELL_SIZE,
      };
    } else {
      player.movement.target = undefined;
    }
  }
}
