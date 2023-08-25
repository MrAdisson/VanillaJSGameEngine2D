export const managePlayerAnimation = (player) => {
  player.movement.isMoving
    ? (player.color = 'red')
    : (player.color = 'purple');
};
