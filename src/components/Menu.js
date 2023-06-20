// Relative path as css files are "siblings" to the components
// In other words, the Menu directory is in the same directory as this file
import "./Menu.css";

// For the game audio
let audio = new Audio("/Tetris.mp3");
const start = () => {
  audio.loop = true;
  audio.play();
};

// TODO: Add a tutorial for what buttons do which!
const Menu = ({ onClick }) => (
  <>
    <div className="Menu">
      {/* Passes the function created in Game.js */}
      <button
        className="Button"
        onClick={() => {
          onClick();
          start();
        }}
      >
        Play Tetris
      </button>
    </div>
    <h2>Instructions</h2>
    <p>ArrowUp: Clockwise Rotate Piece</p>
    <p>ArrowDown: Slow Drop Piece</p>
    <p>ArrowLeft: Move Left</p>
    <p>ArrowRight: Move Right</p>
    <p>KeyQ: Quit game</p>
    <p>KeyP: Pause game</p>
    <p>KeyZ: Counterclockwise Rotate</p>
    <p>KeyD: Double Rotate</p>
    <p>Space: Fast Drop Piece</p>
  </>
);

export default Menu;
