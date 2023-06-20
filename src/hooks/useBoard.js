// Will return initial board setup
import { useState, useEffect } from "react";

import { buildBoard, nextBoard } from "/src/business/Board";

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    // Updates the board using the previous board as the starting point
    setBoard((previousBoard) =>
      // Then create new board based on the previous board state
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared
      })
    );
    // Anytime player, resetPlayer, or addLinesCleared changes
    // update board using useEffect
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};
