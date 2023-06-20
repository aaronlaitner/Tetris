// Function for building an empty board
import { movePlayer } from "./PlayerController";
import { defaultCell } from "/src/business/Cell";
import { transferToBoard } from "/src/business/Tetrominoes";

export const buildBoard = ({ rows, columns }) => {
  // Creates an arrays using the rows
  const builtRows = Array.from(
    { length: rows },
    () =>
      // For each row create a column
      Array.from({ length: columns }, () => ({ ...defaultCell }))
    // Default cell represents the cell on the board
  );

  return {
    rows: builtRows,
    size: { rows, columns }
  };
};

// Find the drop position for ghost/fast drop
const findDropPosition = ({ board, position, shape }) => {
  let max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    // delta represents how many rows ahead it's looking
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
};

// Exports the function nextBoard for useBoard.js
export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  // gives access to the tetromino and position from player
  const { tetromino, position } = player;

  // "rows" serves two purposes as disclosed below

  // For each cell in each row
  let rows = board.rows.map((row) =>
    // If the cell in the row is occupied, then keep the value for the cell
    // Basically if it's occupied it means a piece is already there, so we don't do anything to the piece
    // If there isnt a piece there, then clear the cell. (as the piece drops, leave no trace behind)
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  // Get the required elements for the drop position for ghost/fast drop
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape
  });

  // Place ghost
  // If player is fast dropping, add ghost, else don't add ghost
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "ghost"
  }`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: tetromino.shape
  });

  // When not fast dropping, place the piece
  // if the piece collided, mark the board cells as collided
  if (!player.isFastDropping) {
    // Update the rows to include the piece
    rows = transferToBoard({
      // inherit classname from the tetromino
      className: tetromino.className,
      // Whether it's occupied or not depends on the current state of player
      isOccupied: player.collided,
      // player's position
      position,
      // cleared out rows from above
      rows,
      // Tetromino's shape
      shape: tetromino.shape
    });
  }

  // Check for cleared lines

  // For any given row, use default cells to create a blank row
  const blankRow = rows[0].map((_) => ({ ...defaultCell }));
  // keep track of cleared lines
  let linesCleared = 0;
  rows = rows.reduce((acc, row) => {
    // If every space is occupied in a row, then it should be cleared
    if (row.every((column) => column.occupied)) {
      linesCleared++;
      acc.unshift([...blankRow]);
    } else {
      acc.push(row);
    }

    return acc;
  }, []); // starts with empty array

  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }

  // If the player has collided, reset the player!
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  // Return the next board
  return {
    rows,
    size: { ...board.size }
  };
};

export const hasCollision = ({ board, position, shape }) => {
  // iterate through each row
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    // iterate through each column searching for a 1 (actual piece)
    for (let x = 0; x < shape[y].length; x++) {
      // If a 1 is found (marking it as true)
      if (shape[y][x]) {
        const column = x + position.column;

        if (
          // If we have a row and a column that is occupied
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true; // As you can't have two pieces occupying the same space
        }
      }
    }
  }

  return false;
};

export const isWithinBoard = ({ board, position, shape }) => {
  // iterate through each row
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    // iterate through each column searching for a 1 (marking an actual piece)
    for (let x = 0; x < shape[y].length; x++) {
      // If a 1 is found (marking it as true)
      if (shape[y][x]) {
        // Making sure there is room and it's not going to go outside of the board
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) return false;
      }
    }
  }
  return true;
};
