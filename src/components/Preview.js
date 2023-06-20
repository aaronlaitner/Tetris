import "./Preview.css";
import React from "react";

import { buildBoard } from "/src/business/Board";
import { transferToBoard } from "/src/business/Tetrominoes";

import BoardCell from "/src/components/BoardCell";

const Preview = ({ tetromino, index }) => {
  /* every time we render, the piece should be expected to have a shape and className */
  const { shape, className } = tetromino;

  /* Creates the grid preview on the side that will display upcoming tetrominoes */
  const board = buildBoard({ rows: 4, columns: 4 });

  /* positions the top of them so that each of the 3 previews doesn't overlap */
  const style = { top: `${index * 15}vw` };

  /* transfers the current tetromino to the board */
  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape
  });

  /* Renders the preview */
  return (
    /* Container for the preview */
    /*Container for the board, and below is the board being rendered */
    <div className="Preview" style={style}>
      <div className="Preview-board">
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};
export default React.memo(Preview);
