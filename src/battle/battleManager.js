import { GameManager } from '../gameManager.js';
import { Battle } from './battle.js';

export class BattleManager {
  constructor() {
    this.currentBattle = null;
  }

  instantiateBattle(player, enemy, terrain) {
    this.currentBattle = new Battle({ player, enemy, terrain });
    console.log('NEW BATTLE VS ' + enemy + ' ON ' + terrain);
  }

  endBattle(reason) {
    this.currentBattle = null;
    const game = new GameManager();
    game.setCurrentScene('world');
    if (reason === 'runAway') {
      game.getUIManager().openDialog('greetings', 'You ran away from the battle!');
    }
  }

  selectNextAction() {
    this.currentBattle.battleUI.selectNextAction();
  }
  selectPreviousAction() {
    this.currentBattle.battleUI.selectPreviousAction();
  }
  executeAction() {
    this.currentBattle.battleUI.executeAction();
  }

  isBattling() {
    return this.currentBattle ? true : false;
  }

  draw(ctx) {
    if (this.currentBattle) {
      // draw terrain png on whole screen
      const game = GameManager.getInstance();
      const terrainAsset = game.getAssetManager().getAsset(this.currentBattle.terrain + 'Battle');
      ctx.drawImage(terrainAsset, 0, 0, ctx.canvas.width, ctx.canvas.height);
      game.getUIManager().drawBattle(ctx);
      this.currentBattle.battleUI.drawBattleUI(ctx);
    }
  }
}
