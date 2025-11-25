import { useState } from "react";
import { Character } from "../Characters/Character";
import { getRandomCharacter } from "../Characters/Character";
import "./Main.css";

export function Main() {
  const [selectedGame, setSelectedGame] = useState("");
  const [randomChar, setRandomChar] = useState(null);

  const handleRandomCharacter = () => {
    const random = getRandomCharacter(selectedGame);
    if (random) {
      setRandomChar(random);
    } else {
      alert("Please select a game first");
    }
  };

  return (
    <div className="main-page organized-container">
      <h2 className="main-title">Game Changer</h2>

      <div className="main-layout">
        <div className="main-left">
          <div className="main-section">
            <Character onGameChange={setSelectedGame} />
          </div>
        </div>

        <aside className="main-right">
          <div className="actions-panel">
            <button className="primary" onClick={handleRandomCharacter}>
              Random Character
            </button>
            <button className="secondary">Assign Mission</button>
          </div>

          <div className="history-panel">
            <h4>Random Pick</h4>
            <div className="history-list">
              {randomChar
                ? `Selected: ${randomChar}`
                : "No character picked yet"}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
