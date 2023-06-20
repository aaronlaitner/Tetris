const className = "tetromino";

export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    className: `${className} ${className}__i` // Maps back to the board cells in css
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    className: `${className} ${className}__j`
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    className: `${className} ${className}__l`
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    className: `${className} ${className}__o`
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    className: `${className} ${className}__s`
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    className: `${className} ${className}__t`
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    className: `${className} ${className}__z`
  }
};
// TODO: Auto randoms too often.
// Need to fill with an array of DISTINCT keys...
// Need to fill with 5 different shapes into the bag

/* Picks a random Tetromino's using the keys */
export const randomTetromino = (tetrisPieces) => {
  const keys = Object.keys(TETROMINOES);
  /* Create a random number up to the last index for the keys */
  const index = Math.floor(Math.random() * keys.length);
  /* Out of the keys, pick the actual key from the randomly picked index position */
  const key = keys[index];
  // Check whether the index has been used before! (iterate through array)
  for (let i = 0; i < 5; i++) {
    // If it has been used, call randomTetromino to roll another random
    if (key === tetrisPieces[i]) {
      randomTetromino(tetrisPieces);
    }
  }
  // Otherwise
  // remove the last from the array by
  // shifting the elements to the left
  tetrisPieces.shift();
  // and add the new index to it at the first location
  tetrisPieces.push(key);
  console.log(tetrisPieces);
  return TETROMINOES[key];
};

export const rotate = ({ piece, direction }) => {
  // Transpose rows and columns
  const newPiece = piece.map((_, index) =>
    piece.map((column) => column[index])
  );

  // Reverse rows to get a rotated matrix
  if (direction === 1) return newPiece.map((row) => row.reverse());
  else if (direction === 2) {
    // TODO: still needs to be fixed... sigh
  }
  // If the player is counterclockwise Rotating
  return newPiece.reverse();
};

// Puts the piece onto the board!
// Given a board, shape, and starting position. Transfer all of the components of the shape to the board
export const transferToBoard = ({
  className,
  isOccupied, // Whether or not the space on the board is occupied
  position, // What is the position on the board
  rows, // Data for the board
  shape // Tetromino's shape
}) => {
  // Go through each cell and row
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      // if there is a cell there
      if (cell) {
        const occupied = isOccupied;
        // Takes the position of the starting position, and adding the position of the shapes cell
        // Based on that we know where to put the shape on the board :)
        const _y = y + position.row;
        const _x = x + position.column;
        // Tracks whether the cell being created is occuped (collision in past)
        // As well as the className to know what the cell should look like
        rows[_y][_x] = { occupied, className };
      }
    });
  });

  return rows;
};
