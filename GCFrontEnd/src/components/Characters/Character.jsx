import React, { useState } from "react";
import "./Character.css";

const character = {
  valorant: [
    "Jett",
    "Phoenix",
    "Sage",
    "Raze",
    "Yoru",
    "Astra",
    "Sova",
    "Viper",
    "Brimstone",
    "Omen",
    "Killjoy",
    "Cypher",
    "Reyna",
    "Breach",
    "Skye",
    "KAY/O",
    "Chamber",
    "Neon",
    "Fade",
    "Harbor",
    "Gekko",
    "Deadlock",
    "Veto",
    "Vyse",
    "Waylay",
    "Tejo",
    "Iso",
    "Clove",
  ],
  marvelRivals: ["Thor", "Iron Man", "Black Widow"],
};

export function Character() {
  const [selectedGame, setSelectedGame] = useState("");

  return (
    <form className="character-form">
      <select
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="">Select a game</option>
        {Object.keys(character).map((game) => (
          <option key={game} value={game}>
            {game}
          </option>
        ))}
      </select>

      {selectedGame && character[selectedGame] && (
        <div className="character-box">
          {character[selectedGame].map((char) => (
            <label key={char}>
              <span>{char}</span>
              <input type="checkbox" name={char} />
            </label>
          ))}
        </div>
      )}
    </form>
  );
}
