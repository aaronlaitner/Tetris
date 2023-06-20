import "./styles.css";

import Game from "/src/components/Game";

// Used to return the Game.js
export default function App() {
  return (
    <div className="App">
      {/*Uses Game.js for rendering the game*/}
      <Game rows={20} columns={10} />
    </div>
  );
}
