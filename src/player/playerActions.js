import { GRID } from '../statics.js';
import { ENTITIES } from '../entities/entities.js';
import { GameManager } from '../gameManager.js';

export const interact = () => {
  const game = new GameManager();
  if (game.getUIManager().isDialogOpen()) {
    game.getUIManager().closeDialog();
    return;
  }
  const map = game.getMap();
  const player = game.getPlayer();
  if (player.movement.isMoving) return;
  const targetCell = {
    x: Math.floor(player.location.x / GRID.CELL_SIZE),
    y: Math.floor(player.location.y / GRID.CELL_SIZE),
  };
  switch (player.movement.direction) {
    case 'top':
      targetCell.y--;
      break;
    case 'bottom':
      targetCell.y++;
      break;
    case 'left':
      targetCell.x--;
      break;
    case 'right':
      targetCell.x++;
      break;
    default:
      break;
  }
  const interactingObject =
    ENTITIES[
      Object.keys(map.objectsLocation).find((object) => {
        return map.objectsLocation[object].some((location) => {
          return (
            location.x === targetCell.x && location.y === targetCell.y
          );
        });
      })
    ];
  if (interactingObject) {
    game
      .getUIManager()
      .openDialog('greetings', interactingObject.greetings);
    // alert(interactingObject.greetings);
  }
};
