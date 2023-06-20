import { useCallback, useState } from "react";

// Custom hook used to track the states of the game
export const useGameOver = () => {
  // game starts in the gameOver state (set as true)
  const [gameOver, setGameOver] = useState(true);

  // Will only get executed when we need it to
  const resetGameOver = useCallback(() => {
    // Stops it from getting repeatedly called
    setGameOver(false);
  }, []); // empty list of dependencies

  // When resetGameOver is called, only the state of it will be modified-
  // -from within the functions of the hook itself

  return [gameOver, setGameOver, resetGameOver];
};
