import "./BoardCell.css";

const BoardCell = ({ cell }) => (
  // Used for differing between the different tetromino's
  <div className={`BoardCell ${cell.className}`}>
    <div className="Sparkle"></div>
    {/* Will add a "shine" to the pieces */}
  </div>
);

export default BoardCell;
