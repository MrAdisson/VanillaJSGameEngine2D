import { Entity } from './entities/entities.js';
import { GameManager } from './gameManager.js';

//Key manager is used to store the state of the input keys
export const keyManager = {};

//Manage input and initiate player movement. If others actions are related to keyevents, they can be added here
export const manageInput = (e) => {
  const { key } = e;
  e.preventDefault();
  const gameManager = new GameManager();
  const uiManager = gameManager.getUIManager();

  if (gameManager.isLoading) return;
  const player = gameManager.getPlayer();
  keyManager[key] = true;

  if (gameManager.currentScene === 'world' && gameManager.uiManager.isDialogOpen() === false) {
    switch (key) {
      case 'z':
      case 'ArrowUp':
        if (gameManager.getUIManager().isDialogOpen()) break;
        player.movement.initiateMovement('top');
        break;
      case 's':
      case 'ArrowDown':
        if (gameManager.getUIManager().isDialogOpen()) break;
        player.movement.initiateMovement('bottom');
        break;
      case 'q':
      case 'ArrowLeft':
        if (gameManager.getUIManager().isDialogOpen()) break;
        player.movement.initiateMovement('left');
        break;
      case 'd':
      case 'ArrowRight':
        if (gameManager.getUIManager().isDialogOpen()) break;
        player.movement.initiateMovement('right');
        break;
      case 'e':
        player.actions.interact();
        break;
      case 'f':
        gameManager.changeMap(gameManager.mapManager.currentMapName === 'map1' ? 'map2' : 'map1');
        break;
      case 'b':
        //TOGGLE BYCICLE : (TODO: make it a player function)
        player.actions.toggleBycicle();
        break;
      case '+':
        gameManager.getGrid().changeCellSize(gameManager.getGrid().CELL_SIZE + 1);
        break;
      case '-':
        gameManager.getGrid().changeCellSize(gameManager.getGrid().CELL_SIZE - 1);
        break;
      case '*':
        // DEBUG LOG BUTTON
        console.log(gameManager);
        console.log({ instanciatedEntities: Entity.instances });
      default:
        break;
    }
  } else if (uiManager.isDialogOpen()) {
    switch (key) {
      case 'e':
        uiManager.closeDialog();
        break;
      default:
        break;
    }
  }

  if (gameManager.currentScene === 'battle') {
    switch (key) {
      case 'z':
      case 'd':
      case 'ArrowRight':
      case 'ArrowUp':
        gameManager.battleManager.selectNextAction();
        break;
      case 's':
      case 'q':
      case 'ArrowDown':
      case 'ArrowLeft':
        gameManager.battleManager.selectPreviousAction();
        break;
      case 'e':
        gameManager.battleManager.executeAction();
        break;
      case 'r':
        gameManager.battleManager.endBattle('runAway');
        break;
      default:
        break;
    }
  }
};
