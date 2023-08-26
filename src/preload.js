import { GameManager } from './gameManager.js';

//USE TO PRELOAD ASSETS TO DISPLAY THEM IN CANVAS
export const preloadAssets = async () => {
  console.log('%c[INFO] PRELOADING ASSETS', 'color: cyan');
  console.time('Assets loaded in');
  const game = new GameManager();
  const assetManager = game.getAssetManager();
  const neededAssets = game.getMapManager().getNeededAssets();
  let loadedAssets = 0;
  const missingAssets = {};

  for (const assetName in neededAssets) {
    if (!assetManager.getAsset(assetName)) {
      missingAssets[assetName] = neededAssets[assetName];
      continue;
    }
    console.log(`%c-> Asset ${assetName} already loaded`, 'color: yellow');
  }

  if (Object.keys(missingAssets).length === 0) {
    console.log('%c[INFO] ALL ASSETS ALREADY LOADED', 'color: cyan');
    console.timeEnd('Assets loaded in');
    return;
  }

  for (const assetName in missingAssets) {
    game.setIsLoading(true);
    console.log(`%c-> Loading ${assetName}`, 'color: yellow');
    const asset = new Image();
    asset.src = missingAssets[assetName].src;
    assetManager.addAsset(assetName, asset);
    asset.onload = () => {
      console.log(`%cLoaded ${assetName}`, 'color: lime');
      loadedAssets++;
      if (loadedAssets === Object.keys(missingAssets).length) {
        console.log('ASSETS:', assetManager.getAssets());
        loadedAssets = 0;
        console.timeEnd('Assets loaded in');
        console.log('%c[INFO] ALL NEEDED ASSETS LOADED', 'color: cyan');
        game.setIsLoading(false);
      }
    };
  }
};
