import "./GameController.css";

import { Action, actionForKey, actionIsDrop } from "/src/business/Input";
import { playerController } from "/src/business/PlayerController";

// Hook written by Dan Abramov
// Safe way to use timeouts
import { useInterval } from "/src/hooks/useInterval";
import { useDropTime } from "/src/hooks/useDropTime";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats
  });

  // Automated slowdrop using custom hook
  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime); // dropTime in milliseconds

  // TODO add a store button (shift)

  // Functions work by grabbing the key code,
  // Then it executes the code
  // Utilizes the Input.js to make more semantically meaningful code
  const onKeyUp = ({ code }) => {
    // Grabs the relevant action based on the given keystroke
    const action = actionForKey(code);
    // If the player was dropping, then resume the drop time (see below)
    if (actionIsDrop(action)) resumeDropTime();
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      } // A quit button "q"
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      // If the player is dropping, then pause the drop time
      if (actionIsDrop(action)) pauseDropTime();
      handleInput({ action });
    }
  };

  // Takes an action
  // passes the action to a player controller
  // This will be used
  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    });
  };

  // For user input
  return (
    <input
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

export default GameController;
