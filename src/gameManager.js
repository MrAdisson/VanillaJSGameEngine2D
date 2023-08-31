import { BattleManager } from './battle/battleManager.js';
import { Camera } from './camera/camera.js';
import { AssetManager } from './class/assetManager.js';
import { Entity } from './entities/entities.js';
import { mapManager } from './map/mapManager.js';
import { Player } from './player/player.js';
import { preloadAssets } from './preload.js';
import { UIManager } from './ui/UIManager.js';
import { mergeDeep } from './util.js';

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
      this.isPaused = false;
      this.currentScene = 'world';
      this.battleManager = new BattleManager();
      this.camera = null;
    }
    return GameManager.instance;
  }

  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = this;
    }
    return GameManager.instance;
  }

  init(ctx) {
    this.player.init();
    this.camera = new Camera({ followsPlayer: true, ctx: ctx });
  }

  setCurrentScene(scene) {
    this.currentScene = scene;
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

  instantiateBattle(player, enemy, terrain) {
    player.movement.stopMovement();
    this.battleManager.instantiateBattle(player, enemy, terrain);
    this.currentScene = 'battle';
  }

  getBattleManager() {
    return this.battleManager;
  }

  update(delta) {
    if (this.isLoading) {
      this.uiManager.updateLoadingScreen(delta);
      return;
    }

    this.mapManager.update(delta);
    this.player.update(delta);
    Entity.instances.forEach((instance) => {
      instance.update(delta);
    });
    this.uiManager.update(delta);
    this.camera.update(delta);
  }

  save() {
    // FUNCTION THAT SERIALIZE THIS OBJECT AND DOWNLOADS IT AS A JSON FILE
    const serialized = JSON.stringify({
      player: this.player,
      mapManager: this.mapManager,
      currentScene: this.currentScene,
    });
    const blob = new Blob([serialized], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'save.json';
    link.click();
  }

  clearData() {
    this.currentScene = 'world';
    this.uiManager.dialogBox = null;
    this.battleManager.currentBattle = null;
  }

  load() {
    const files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
      return false;
    }
    const mapInstanceData = async (e) => {
      const result = JSON.parse(e.target.result);
      this.clearData();
      this.player = mergeDeep(this.player, result.player);
      this.mapManager.currentMap = this.mapManager.maps[result.mapManager.currentMap.name];
      this.mapManager.currentMapName = result.mapManager.currentMap.name;
      console.log(this.instance);
      await preloadAssets();
    };
    const fr = new FileReader();

    fr.onload = mapInstanceData.bind(this);

    fr.readAsText(files.item(0));
  }

  draw(ctx) {
    if (this.isLoading) {
      this.uiManager.drawLoadingScreen(ctx);
      return;
    }
    if (this.currentScene === 'world') {
      this.camera.render(ctx);
      this.uiManager.draw(ctx, this.camera);
    }

    if (this.currentScene === 'battle') {
      this.uiManager.draw(ctx, this.camera);
      this.battleManager.draw(ctx);
    }
  }
}
