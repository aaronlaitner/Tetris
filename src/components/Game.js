import Menu from "/src/components/Menu";
import Tetris from "/src/components/Tetris";

import { useGameOver } from "/src/hooks/useGameOver";

// curly braces are used to destructure so the programmer
// can directly reference the props through the curly braces
// We will use Game.js for rendering the game
const Game = ({ rows, columns }) => {
  // Create a custom hook to track the states of the game (playing/game over)
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  // For button
  const start = () => resetGameOver();

  return (
    // class name will be used for css
    <div className="Game">
      {/* If game is over, display menu.*/}
      {/* If game is not over, display Tetris (returns Tetris.js).*/}
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
      {/*Passes the function for the menu*/}
    </div>
  );
};
export default Game;
