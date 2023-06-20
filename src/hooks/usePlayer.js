// Used to store the player's data and modifying it
import { useState, useCallback } from "react";

import { randomTetromino } from "/src/business/Tetrominoes";

// Array for storing the pieces for checking for duplicates in
// Tetrominoes.js
const tetrisPieces = [0, 0, 0, 0, 0];
tetrisPieces.fill(" ");

// Responsible for creating the initial version of the player
// As well updates the player as the data changes
const buildPlayer = (previous) => {
  let tetrominoes;

  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino(tetrisPieces));
  } else {
    // First time coming through, fill the array
    tetrominoes = Array(5) // Total array (1 current, 3 preview, 1 waiting to be in preview)
      .fill(0)
      .map((_) => randomTetromino(tetrisPieces)); // Create a random tetromino
  }

  return {
    collided: false, // hasn't collided
    isFastDropping: false, // fastdrop mode is off
    position: { row: 0, column: 4 },
    tetrominoes, // Get the tetrominoes
    tetromino: tetrominoes.pop() // Will get the current tetromino by popping it off the stack
  };
};

// Exports the usePlayer hook
export const usePlayer = () => {
  // Gets the states through useState
  const [player, setPlayer] = useState(buildPlayer());

  // Will only be called when we intentionally call it (hence the useCallback)
  const resetPlayer = useCallback(() => {
    // Will take previous value for the player and pass it to the buildPlayer
    // Keeps the value from the previous value and update the things we want to update
    setPlayer((prev) => buildPlayer(prev));
  }, []);

  return [player, setPlayer, resetPlayer];
};
