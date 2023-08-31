import { ENTITIES } from '../entities/entities.js';
import { GameManager } from '../gameManager.js';
import { keyManager } from '../inputManager.js';
import { getSign } from '../util.js';

export class Movement {
  constructor(speed = 3, direction = 'bottom') {
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
    const game = new GameManager();
    const grid = game.getGrid();
    const player = game.getPlayer();
    switch (direction) {
      case 'top':
        this.target = {
          x: player.location.x,
          y: player.location.y - grid.CELL_SIZE,
        };
        break;
      case 'bottom':
        this.target = {
          x: player.location.x,
          y: player.location.y + grid.CELL_SIZE,
        };
        break;
      case 'left':
        this.target = {
          x: player.location.x - grid.CELL_SIZE,
          y: player.location.y,
        };
        break;
      case 'right':
        this.target = {
          x: player.location.x + grid.CELL_SIZE,
          y: player.location.y,
        };
        break;
      default:
        break;
    }
  }

  checkIfTargetReached = () => {
    const game = new GameManager();
    const player = game.getPlayer();
    if (this.direction === 'top') {
      if (player.location.y <= this.target.y) {
        player.location.y = this.target.y;
        return true;
      }
    }
    if (this.direction === 'bottom') {
      if (player.location.y >= this.target.y) {
        player.location.y = this.target.y;
        return true;
      }
    }
    if (this.direction === 'left') {
      if (player.location.x <= this.target.x) {
        player.location.x = this.target.x;
        return true;
      }
    }
    if (this.direction === 'right') {
      if (player.location.x >= this.target.x) {
        player.location.x = this.target.x;
        return true;
      }
    }
    return false;
  };

  move = (delta) => {
    const game = new GameManager();
    const map = game.mapManager.currentMap;
    const grid = game.getGrid();
    const uiManager = game.getUIManager();
    const player = game.getPlayer();

    if (uiManager.isDialogOpen()) return;
    if (player.collides) {
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
            x: player.location.x,
            y: player.location.y,
          };
          return;
        }
      }
    }
    if (this.isMoving) {
      player.location.x =
        getSign(this.target.x - player.location.x) * this.speed * grid.CELL_SIZE * this.speedBoost * delta +
        player.location.x;
      player.location.y =
        getSign(this.target.y - player.location.y) * this.speed * grid.CELL_SIZE * this.speedBoost * delta +
        player.location.y;
      const hasReached = this.checkIfTargetReached();
      if (hasReached) {
        player.coordinates = {
          x: Math.floor(player.location.x / grid.CELL_SIZE),
          y: Math.floor(player.location.y / grid.CELL_SIZE),
        };
      }
      return hasReached;
    }
    return false;
  };

  static setNextTarget(player) {
    // if (GameManager.getInstance().getUIManager().isDialogOpen()) return;
    // if (GameManager.getInstance().getBattleManager().isBattling()) return;
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
      player.movement.isMoving = false;
    }
  }

  stopMovement() {
    this.target = undefined;
    this.isMoving = false;
  }
}
