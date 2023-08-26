export class AssetManager {
  //A CLASS THAT LOAD NEEDED ASSETS AND STORES THEM
  constructor() {
    this.images = {};
  }

  addAsset(name, asset) {
    this.images[name] = asset;
  }
  getAsset(name) {
    if (this.images[name]) {
      return this.images[name];
    }
  }
  getAssets() {
    return this.images;
  }
}
