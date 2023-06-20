import "./Board.css";

import BoardCell from "/src/components/BoardCell";

const Board = ({ board }) => {
  // styles for board
  const boardStyles = {
    // Will take columns and rows and set up a css grid that
    // represents evenly sized cells. This is done dynammically as
    // we don't know how many rows and columns
    // until we get the board and its size
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
  };

  // output cells by looping through the board
  return (
    // Returns the div with the classname board including the styles above
    <div className="Board" style={boardStyles}>
      {/* For each row on the board*/}
      {/* For each cell within the board*/}
      {board.rows.map((row, y) =>
        row.map((cell, x) => (
          <BoardCell key={x * board.size.columns + x} cell={cell} />
        ))
      )}
    </div>
  );
};

export default Board;
