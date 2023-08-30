import { GameManager } from '../gameManager.js';
import { BattleUI } from '../ui/battleUI.js';

export class Battle {
  constructor({ player, enemy, terrain }) {
    this.player = player;
    this.enemy = enemy;
    this.terrain = terrain;
    this.battleUI = new BattleUI();
  }
}
