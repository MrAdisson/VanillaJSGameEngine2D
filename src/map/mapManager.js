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

  changeMap(mapname) {
    this.currentMap = maps[mapname];
    this.currentMapName = mapname;
    preloadAssets();
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
    for (const entitie in this.currentMap.objectsLocation) {
      this.currentMap.objectsLocation[entitie].forEach((location) => {
        if (ENTITIES[entitie].asset) {
          const game = new GameManager();
          const assetManager = game.getAssetManager();
          const asset = assetManager.getAsset(entitie);
          ctx.drawImage(
            asset,
            location.x * this.grid.CELL_SIZE -
              camera.getOffset(ctx).x,
            location.y * this.grid.CELL_SIZE -
              camera.getOffset(ctx).y,
            ENTITIES[entitie].width * this.grid.CELL_SIZE,
            ENTITIES[entitie].height * this.grid.CELL_SIZE
          );
          return;
        }
        ctx.fillStyle = ENTITIES[entitie].color;
        ctx.fillRect(
          location.x * this.grid.CELL_SIZE - camera.getOffset(ctx).x,
          location.y * this.grid.CELL_SIZE - camera.getOffset(ctx).y,
          ENTITIES[entitie].width * this.grid.CELL_SIZE,
          ENTITIES[entitie].height * this.grid.CELL_SIZE
        );
      });
    }
  }

  updateMap(delta) {
    //TO IMPLEMENT WHEN NEEDED
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
