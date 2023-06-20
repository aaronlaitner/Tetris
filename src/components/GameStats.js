import React from "react";
import "./GameStats.css";

const GameStats = ({ gameStats }) => {
  // destructures the gameStats
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <ul className="GameStats GameStats__right">
      <li>Level</li>
      <li className="value">{level}</li>
      <li>Lines to level</li>
      <li className="value">{linesToLevel}</li>
      <li>Points</li>
      <li className="value">{points}</li>
    </ul>
  );
};

// Memoize so it doesnt render repeatedly
// (Only need to update when the GameStats have changed)
export default React.memo(GameStats);
