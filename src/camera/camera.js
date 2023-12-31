import { Entity } from '../entities/entities.js';
import { GameManager } from '../gameManager.js';

export class Camera {
  // CAMERA TO FOLLOW PLAYER (the instance will be passed to the draw functions):
  constructor({ followsPlayer = false, ctx }) {
    const game = GameManager.getInstance();
    this.x = 0;
    this.y = 0;
    this.horizontalFieldOfView = ctx.canvas.width;
    this.verticalFieldOfView = ctx.canvas.height;
    this.followsPlayer = followsPlayer;
    this.movingDirection = game.getPlayer().movement.direction;
    this.showGrid = false;
    this.zoom = 1;
    this.entityRenderDistance = 5; // number of cells out of the camera view to keep entities instantiated
  }

  getOffset(ctx) {
    if (this.followsPlayer) {
      const game = GameManager.getInstance();
      const player = game.getPlayer();
      const offset = {
        x: this.x - ctx.canvas.width / 2 + (player.width * game.getGrid().CELL_SIZE) / 2,
        y: this.y - ctx.canvas.height / 2 + (player.height * game.getGrid().CELL_SIZE) / 2,
      };
      return offset;
    }
    return { x: 0, y: 0 };
  }

  getBorderCoordinates() {
    const grid = GameManager.getInstance().getGrid();
    const topLeftCellCoordinates = {
      x: Math.round((this.x - this.horizontalFieldOfView / 2 / this.zoom) / grid.CELL_SIZE),
      y: Math.round((this.y - this.verticalFieldOfView / 2 / this.zoom) / grid.CELL_SIZE),
    };
    const bottomRightCellCoordinates = {
      x: Math.round((this.x + this.horizontalFieldOfView / 2 / this.zoom) / grid.CELL_SIZE),
      y: Math.round((this.y + this.verticalFieldOfView / 2 / this.zoom) / grid.CELL_SIZE),
    };
    const topRightCellCoordinates = {
      x: bottomRightCellCoordinates.x,
      y: topLeftCellCoordinates.y,
    };
    const bottomLeftCellCoordinates = {
      x: topLeftCellCoordinates.x,
      y: bottomRightCellCoordinates.y,
    };
    return {
      topLeftCellCoordinates,
      bottomRightCellCoordinates,
      topRightCellCoordinates,
      bottomLeftCellCoordinates,
    };
  }

  drawGrid(ctx, grid) {
    ctx.beginPath();
    ctx.strokeStyle = grid.BORDER_COLOR;
    ctx.lineWidth = grid.BORDER_WIDTH;
    for (
      let y = (-this.y * this.zoom + ctx.canvas.height / 2) % (grid.CELL_SIZE * this.zoom);
      y < ctx.canvas.height;
      y += grid.CELL_SIZE * this.zoom
    ) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }
    ctx.stroke();
    ctx.beginPath();
    for (
      let x = (-this.x * this.zoom + ctx.canvas.width / 2) % (grid.CELL_SIZE * this.zoom);
      x < ctx.canvas.width;
      x += grid.CELL_SIZE * this.zoom
    ) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }
    ctx.stroke();
    for (let y = (-this.y + ctx.canvas.height / 2) % grid.CELL_SIZE; y < ctx.canvas.height; y += grid.CELL_SIZE) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }
  }

  update(delta) {
    if (this.followsPlayer) {
      const game = GameManager.getInstance();
      const player = game.getPlayer();
      this.x = player.location.x;
      this.y = player.location.y;
    }
    //UNINSTANTIATE ENTITIES OUT OF CAMERA VIEW:

    const { topLeftCellCoordinates, bottomRightCellCoordinates } = this.getBorderCoordinates();
    const entitiesToUninstantiate = Entity.instances.filter((entity) => {
      return (
        entity.coordinates.x < topLeftCellCoordinates.x - this.entityRenderDistance ||
        entity.coordinates.x > bottomRightCellCoordinates.x + this.entityRenderDistance ||
        entity.coordinates.y < topLeftCellCoordinates.y - this.entityRenderDistance ||
        entity.coordinates.y > bottomRightCellCoordinates.y + this.entityRenderDistance
      );
    });
    entitiesToUninstantiate.forEach((entity) => {
      // console.log('UNINSTANTIATING TO FAR ENTITY :', entity, '\nRender distance :', this.entityRenderDistance);
      Entity.instances.splice(Entity.instances.indexOf(entity), 1);
    });
  }

  render(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const game = new GameManager();
    const map = game.mapManager.currentMap;
    const player = game.getPlayer();
    const grid = game.getGrid();

    let drawnCellsCount = 0;
    //MAP DRAWING:
    const { topLeftCellCoordinates, bottomRightCellCoordinates } = this.getBorderCoordinates();

    for (let x = topLeftCellCoordinates.x; x <= bottomRightCellCoordinates.x; x++) {
      for (let y = topLeftCellCoordinates.y; y <= bottomRightCellCoordinates.y; y++) {
        const entityName = map.getEntityAtCoordinates({ x, y });
        if (entityName) {
          let entity = Entity.instances.find(
            (entity) => entity.coordinates.x === x && entity.coordinates.y === y && entity.type === entityName
          );
          if (!entity) {
            entity = new Entity({ type: entityName, coordinates: { x, y } });
            // console.log('NEW ENTITY INSTANCIATED :', entity);
          }
          if (entity.data.asset) {
            const asset = game.getAssetManager().getAsset(entity.type);
            ctx.drawImage(
              asset,
              Math.round(x * grid.CELL_SIZE * this.zoom - this.x * this.zoom + ctx.canvas.width / 2),
              Math.round(y * grid.CELL_SIZE * this.zoom - this.y * this.zoom + ctx.canvas.height / 2),
              Math.round(entity.data.width * grid.CELL_SIZE * this.zoom),
              Math.round(entity.data.height * grid.CELL_SIZE * this.zoom)
            );
            drawnCellsCount++;
            continue;
          }
          ctx.fillStyle = entity.data.color;
          ctx.fillRect(
            Math.round(x * grid.CELL_SIZE * this.zoom - this.x * this.zoom + ctx.canvas.width / 2),
            Math.round(y * grid.CELL_SIZE * this.zoom - this.y * this.zoom + ctx.canvas.height / 2),
            Math.round(entity.data.width * grid.CELL_SIZE * this.zoom),
            Math.round(entity.data.height * grid.CELL_SIZE * this.zoom)
          );
          drawnCellsCount++;
        }
      }
    }
    //GRID DRAWING:
    if (this.showGrid) {
      this.drawGrid(ctx, grid);
    }

    //PLAYER DRAWING:
    ctx.fillStyle = player.color;
    ctx.fillRect(
      Math.round(player.location.x * this.zoom - this.x * this.zoom + ctx.canvas.width / 2),
      Math.round(player.location.y * this.zoom - this.y * this.zoom + ctx.canvas.height / 2),
      player.width * grid.CELL_SIZE * this.zoom,
      player.height * grid.CELL_SIZE * this.zoom
    );
    drawnCellsCount++;
  }
}
