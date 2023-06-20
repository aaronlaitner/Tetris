import { useState, useCallback, useEffect } from "react";

const defaultDropTime = 1000;
// Lowest it should go (adjust for difficulty :)
const minimumDropTime = 100;
// Will make game faster
const speedIncrement = 50;

export const useDropTime = ({ gameStats }) => {
  // Current droptime
  const [dropTime, setDropTime] = useState(defaultDropTime);
  // Previous droptime
  const [previousDropTime, setPreviousDropTime] = useState();

  const resumeDropTime = useCallback(() => {
    if (!previousDropTime) {
      return;
    }
    setDropTime(previousDropTime);
    setPreviousDropTime(null);
  }, [previousDropTime]);

  const pauseDropTime = useCallback(() => {
    if (dropTime) {
      setPreviousDropTime(dropTime);
    }
    setDropTime(null);
  }, [dropTime, setPreviousDropTime]);

  useEffect(() => {
    // Updates the speed (For beyond the first level, hence the -1)
    const speed = speedIncrement * (gameStats.level - 1);
    const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime);

    setDropTime(newDropTime);
  }, [gameStats.level, setDropTime]); // if the level or droptime changes, then call the function

  return [dropTime, pauseDropTime, resumeDropTime];
};
