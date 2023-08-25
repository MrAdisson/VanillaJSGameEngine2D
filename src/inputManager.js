import { GameManager } from './gameManager.js';
import { interact } from './player/playerActions.js';

//Key manager is used to store the state of the input keys
export const keyManager = {};

//Manage input and initiate player movement. If others actions are related to keyevents, they can be added here
export const manageInput = ({ key }) => {
  const gameManager = new GameManager();
  const player = gameManager.getPlayer();
  keyManager[key] = true;
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
      interact();
      break;
    case 'f':
      gameManager.changeMap(gameManager.mapManager.currentMapName === 'map1' ? 'map2' : 'map1');
      break;
    case 'b':
      //TOGGLE BYCICLE : (TODO: make it a player function)
      if (gameManager.getPlayer().movement.isMoving) return;
      gameManager.getPlayer().movement.speedBoost = gameManager.getPlayer().movement.speedBoost === 1 ? 2 : 1;
      break;
    case '+':
      gameManager.getGrid().changeCellSize(gameManager.getGrid().CELL_SIZE + 1);
      break;
    case '-':
      gameManager.getGrid().changeCellSize(gameManager.getGrid().CELL_SIZE - 1);
      break;
    default:
      break;
  }
};
