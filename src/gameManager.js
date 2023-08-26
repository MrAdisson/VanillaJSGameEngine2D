import { Camera } from './camera/camera.js';
import { AssetManager } from './class/assetManager.js';
import { mapManager } from './map/mapManager.js';
import { Player } from './player/player.js';
import { UIManager } from './ui/UIManager.js';

// GAME MANAGER SINGLETON

export class GameManager {
  //WILL ONLY BE ONE INSTANCE OF THIS CLASS
  constructor() {
    if (!GameManager.instance) {
      GameManager.instance = this;
      this.mapManager = new mapManager('map1');
      this.player = new Player();
      this.assetManager = new AssetManager();
      this.uiManager = new UIManager();
    }
    return GameManager.instance;
  }

  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = this;
      this.player = new Player();
      this.mapManager = new mapManager('map1');
    }
    return GameManager.instance;
  }

  init() {
    this.player.init();
    this.camera = new Camera({ followsPlayer: false });
  }

  getMapManager() {
    return this.mapManager;
  }

  getAssetManager() {
    return this.assetManager;
  }

  getMap() {
    return this.mapManager.getCurrentMap();
  }

  getPlayer() {
    return this.player;
  }

  getGrid() {
    return this.mapManager.getGrid();
  }

  getUIManager() {
    return this.uiManager;
  }

  changeMap(mapname) {
    this.mapManager.changeMap(mapname);
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  isGameLoading() {
    return this.isLoading;
  }

  update(delta) {
    if (this.isLoading) {
      this.uiManager.updateLoadingScreen(delta);
      return;
    }
    this.mapManager.update(delta);
    this.player.update(delta);
    this.uiManager.update(delta);
    this.camera.update(delta);
  }

  draw(ctx) {
    if (this.isLoading) {
      this.uiManager.drawLoadingScreen(ctx);
      return;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.mapManager.draw(ctx, this.camera);
    this.player.draw(ctx, this.camera);
    this.uiManager.draw(ctx, this.camera);
  }
}
