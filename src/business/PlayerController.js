import { hasCollision, isWithinBoard } from "/src/business/Board";
import { rotate } from "/src/business/Tetrominoes";
import { Action } from "/src/business/Input";

// If we can't do the rotation, update the player through setPlayer
const attemptRotation = ({ board, player, setPlayer }, direction) => {
  // shape is the rotated version of the current shape
  const shape = rotate({
    piece: player.tetromino.shape,
    direction // clockwise/counterclockwise depending on 1/-1 input, double if 2
  });

  const position = player.position;
  // Check for a valid rotation (boolean)
  const isValidRotation =
    // Dont want to rotate oUt of the board lol
    isWithinBoard({ board, position, shape }) &&
    // No collisions with other pieces
    !hasCollision({ board, position, shape });

  // If it's a valid rotation, update the player with the new tetromino
  if (isValidRotation) {
    setPlayer({
      // Set the new player to previous player stats
      ...player,
      tetromino: {
        // update the previous tetromino with the newly rotated shape
        ...player.tetromino,
        shape
      }
    });
  } else {
    return false;
  }
};

export const movePlayer = ({ delta, position, shape, board }) => {
  // Check where player wishes to move
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column
  };
  // Checks for collision
  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape
  });
  // Checks whether we are still in the board
  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape
  });

  // Prevent movement under given circumstances
  const preventMove = !isOnBoard || (isOnBoard && collided);
  // if able to move, get the next position for the player
  const nextPosition = preventMove ? position : desiredNextPosition;
  // Check if player is moving down
  const isMovingDown = delta.row > 0;
  // If player is moving down and you've collided or are no longer on the boare
  // A hit means the player has hit a valid position and now can lock into place
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

const attemptMovement = ({ board, player, setPlayer, action, setGameOver }) => {
  // delta represents how much the player is attempting to move
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  // Do different movement based on the given action
  if (action === Action.FastDrop) {
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.column -= 1;
  } else if (action === Action.Right) {
    delta.column += 1;
  }

  // Asks whether it's collided and its next move
  const { collided, nextPosition } = movePlayer({
    // How much the player wants to move
    delta,
    // Current position
    position: player.position,
    // Shape for collision
    shape: player.tetromino.shape,
    // To compare against board for collisions
    board
  });

  // Did we collide immediately? If so, game over!
  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver(isGameOver);
  }

  setPlayer({
    // Get previous stats from player
    ...player,
    // Add new collided
    collided,
    // Add new fastdrop value
    isFastDropping,
    // New position for player
    position: nextPosition
  });
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver
}) => {
  // If no action is present
  if (!action) return;

  if (action === Action.Rotate) {
    // Will be an "attempt" to rotate as it may or may not work
    attemptRotation({ board, player, setPlayer }, 1);
  } else if (action === Action.counterRotate) {
    attemptRotation({ board, player, setPlayer }, -1);
  } else if (action === Action.doubleRotate) {
    attemptRotation({ board, player, setPlayer }, 2);
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver });
  }
};
