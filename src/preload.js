import { GameManager } from './gameManager.js';

//USE TO PRELOAD ASSETS TO DISPLAY THEM IN CANVAS
export const preloadAssets = () => {
  const game = new GameManager();
  const assetManager = game.getAssetManager();
  const neededAssets = game.getMapManager().getNeededAssets();
  const assets = {};
  for (const asset in neededAssets) {
    // CHECK IF ASSET IS ALREADY LOADED
    if (assetManager.getAsset(asset)) {
      continue;
    }
    assets[asset] = new Image();
    assets[asset].src = neededAssets[asset].src;
    assetManager.addAsset(asset, assets[asset]);
  }
};
