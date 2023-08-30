import { GameManager } from '../gameManager.js';

const ACTIONS = ['attack', 'team', 'bag', 'runAway'];

export class BattleUI {
  constructor(battle) {
    this.battle = battle;
    this.selectedAction = 'attack';
  }

  setSelectedAction(action) {
    this.selectedAction = action;
  }

  selectNextAction() {
    const index = ACTIONS.indexOf(this.selectedAction);
    if (index === ACTIONS.length - 1) {
      this.selectedAction = ACTIONS[0];
    } else {
      this.selectedAction = ACTIONS[index + 1];
    }
  }

  selectPreviousAction() {
    const index = ACTIONS.indexOf(this.selectedAction);
    if (index === 0) {
      this.selectedAction = ACTIONS[ACTIONS.length - 1];
    } else {
      this.selectedAction = ACTIONS[index - 1];
    }
  }

  executeAction() {
    switch (this.selectedAction) {
      case 'attack':
        console.log('NOT IMPLEMENTED');
        break;
      case 'team':
        console.log('NOT IMPLEMENTED');
        break;
      case 'bag':
        console.log('NOT IMPLEMENTED');
        break;
      case 'runAway':
        const game = new GameManager();
        game.getBattleManager().endBattle('runAway');
        break;
      default:
        break;
    }
  }

  //   WE HAVE 4 BUTTONS IN THE BOTTOM OF THE SCREEN (2 / 2), ONE FOR ATTAK, ONE FOR TEAM, ONE FOR BAG, ONE FOR RUN AWAY. THE SELECTED BUTTON HAS A DIFFERENT COLOR.
  drawBattleUI(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, ctx.canvas.height - 100, ctx.canvas.width, 100);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Attack', 20, ctx.canvas.height - 70);
    ctx.fillText('Team', 120, ctx.canvas.height - 70);
    ctx.fillText('Bag', 220, ctx.canvas.height - 70);
    ctx.fillText('Run', 320, ctx.canvas.height - 70);

    // TRANSPARENCY COLOR WHEN SELECTED:
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    switch (this.selectedAction) {
      case 'attack':
        ctx.fillRect(0, ctx.canvas.height - 100, 100, 100);
        break;
      case 'team':
        ctx.fillRect(100, ctx.canvas.height - 100, 100, 100);
        break;
      case 'bag':
        ctx.fillRect(200, ctx.canvas.height - 100, 100, 100);
        break;
      case 'runAway':
        ctx.fillRect(300, ctx.canvas.height - 100, 100, 100);
        break;
    }
  }
}
