import React, { useState } from "react";
import "./Character.css";

export const character = {
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
  marvelRivals: [
    "Thor",
    "Iron Man",
    "Black Widow",
    "Hulk",
    "Captain America",
    "Spider Man",
    "Doctor Strange",
    "Black Panther",
    "Scarlet Witch",
  ],
};

export const getRandomCharacter = (selectedGame) => {
  if (!selectedGame || !character[selectedGame]) return null;
  const chars = character[selectedGame];
  const randomIndex = Math.floor(Math.random() * chars.length);
  return chars[randomIndex];
};

export function Character({ onGameChange }) {
  const [selectedGame, setSelectedGame] = useState("");

  const handleGameChange = (e) => {
    const game = e.target.value;
    setSelectedGame(game);
    if (onGameChange) {
      onGameChange(game);
    }
  };

  return (
    <form className="character-form">
      <select value={selectedGame} onChange={handleGameChange}>
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
