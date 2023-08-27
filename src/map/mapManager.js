import { ENTITIES } from '../entities/entities.js';
import { GameManager } from '../gameManager.js';
import { Grid } from '../grid.js';
import { preloadAssets } from '../preload.js';
import maps from './index.js';

export class mapManager {
  constructor(initMapName) {
    this.currentMapName = initMapName;
    this.currentMap = maps[initMapName];
    this.maps = maps;
    this.grid = new Grid();
  }

  getNeededAssets = () => {
    //FOR EACH ENTITY IN THIS MAP GET ./assets/{entityName}.asset and store it in a [{ entityName: assetSrcStr }] object:
    const neededAssets = {};
    for (const entitie in this.currentMap.objectsLocation) {
      if (ENTITIES[entitie].asset) {
        neededAssets[entitie] = ENTITIES[entitie].asset;
      }
    }
    return neededAssets;
  };

  async changeMap(mapname, initLocation = { x: 1, y: 1 }) {
    console.log(`Changing from ${this.currentMap.name} map to ${mapname}`);
    this.currentMap = maps[mapname];
    this.currentMapName = mapname;
    await preloadAssets();
    const player = GameManager.getInstance().getPlayer();
    //STOP PLAYER MOVEMENT
    player.movement.isMoving = false;
    player.location.x = initLocation.x * this.grid.CELL_SIZE;
    player.location.y = initLocation.y * this.grid.CELL_SIZE;
    player.coordinates.x = initLocation.x;
    player.coordinates.y = initLocation.y;
  }

  getCurrentMap() {
    return this.currentMap;
  }

  changeGrid(grid) {
    this.grid = grid;
  }

  getGrid() {
    return this.grid;
  }

  drawMap(ctx, camera) {
    // let drawnCount = 0;
    // for (const entitie in this.currentMap.objectsLocation) {
    //   this.currentMap.objectsLocation[entitie].forEach((location) => {
    //     if (ENTITIES[entitie].asset) {
    //       const game = new GameManager();
    //       const assetManager = game.getAssetManager();
    //       const asset = assetManager.getAsset(entitie);
    //       ctx.drawImage(
    //         asset,
    //         location.x * this.grid.CELL_SIZE - camera.getOffset(ctx).x,
    //         location.y * this.grid.CELL_SIZE - camera.getOffset(ctx).y,
    //         ENTITIES[entitie].width * this.grid.CELL_SIZE,
    //         ENTITIES[entitie].height * this.grid.CELL_SIZE
    //       );
    //       drawnCount++;
    //       return;
    //     }
    //     ctx.fillStyle = ENTITIES[entitie].color;
    //     ctx.fillRect(
    //       location.x * this.grid.CELL_SIZE - camera.getOffset(ctx).x,
    //       location.y * this.grid.CELL_SIZE - camera.getOffset(ctx).y,
    //       ENTITIES[entitie].width * this.grid.CELL_SIZE,
    //       ENTITIES[entitie].height * this.grid.CELL_SIZE
    //     );
    //     drawnCount++;
    //   });
    // }
    // console.log(`Drew ${drawnCount} cells`);
  }

  checkIfPlayerIsOnWayPoint(player, map) {
    if (map.wayPoints) {
      const isOnWaypoint = map.wayPoints.some((wayPoint) => {
        return wayPoint.locations.from.x === player.coordinates.x && wayPoint.locations.from.y === player.coordinates.y;
      });
      if (isOnWaypoint) {
        const currentWayPoint = map.wayPoints.find((wayPoint) => {
          return (
            wayPoint.locations.from.x === player.coordinates.x && wayPoint.locations.from.y === player.coordinates.y
          );
        });
        return currentWayPoint;
      }
      return false;
    }
  }

  updateMap(delta) {
    //CHECK IF PLAYER IS IN A CHANGING MAP POINT :
    const game = GameManager.getInstance();
    const player = game.getPlayer();
    const map = game.getMap();
    const grid = game.getGrid();
    const wayPoint = this.checkIfPlayerIsOnWayPoint(player, map);
    if (wayPoint) {
      this.changeMap(wayPoint.destination, wayPoint.locations.to);
      return;
    }
  }

  update(delta) {
    this.grid.update(delta);
    this.updateMap(delta);
  }
  draw(ctx, camera) {
    this.drawMap(ctx, camera);
    this.grid.draw(ctx, camera);
  }
}
