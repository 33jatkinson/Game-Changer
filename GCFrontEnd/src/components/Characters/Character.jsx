import React, { useState } from "react";
import "./Character.css";

export const character = {
  valorant: [
    "Astra",
    "Breach",
    "Brimstone",
    "Chamber",
    "Clove",
    "Cypher",
    "Deadlock",
    "Fade",
    "Gekko",
    "Harbor",
    "Iso",
    "Jett",
    "KAY/O",
    "Killjoy",
    "Neon",
    "Omen",
    "Phoenix",
    "Raze",
    "Reyna",
    "Sage",
    "Skye",
    "Sova",
    "Tejo",
    "Veto",
    "Viper",
    "Vyse",
    "Waylay",
    "Yoru",
  ],
  MarvelRivals: [
    "Adam Warlock",
    "Angela",
    "Black Panther",
    "Black Widow",
    "Blade",
    "Captain America",
    "Cloak and Dagger",
    "Daredevil",
    "Doctor Strange",
    "Emma Frost",
    "Gambit",
    "Groot",
    "Hawkeye",
    "Hela",
    "Hulk",
    "Human Torch",
    "Invisible Woman",
    "Iron Fist",
    "Iron Man",
    "Jeff",
    "Loki",
    "Luna Snow",
    "Magik",
    "Magneto",
    "Mantis",
    "Mister Fantastic",
    "Moon Knight",
    "Namor",
    "Peni Parker",
    "Phoenix",
    "Psylocke",
    "Punisher",
    "Rocket Raccoon",
    "Scarlet Witch",
    "Squirrel Girl",
    "Spider Man",
    "Star Lord",
    "Storm",
    "The Thing",
    "Thor",
    "Ultron",
    "Venom",
    "Winter Soldier",
    "Wolverine",
  ],
};

export const getRandomCharacter = (selectedGame) => {
  if (!selectedGame || !character[selectedGame]) return null;
  const chars = character[selectedGame];
  const randomIndex = Math.floor(Math.random() * chars.length);
  return chars[randomIndex];
};

export function Character({ onGameChange, onSelectedChange }) {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleGameChange = (e) => {
    const game = e.target.value;
    setSelectedGame(game);
    if (onGameChange) {
      onGameChange(game);
    }
    // when game changes, select all characters by default
    if (game && character[game]) {
      setSelectedCharacters([...character[game]]);
      if (typeof onSelectedChange === "function")
        onSelectedChange([...character[game]]);
    } else {
      setSelectedCharacters([]);
      if (typeof onSelectedChange === "function") onSelectedChange([]);
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
              <input
                type="checkbox"
                name={char}
                checked={selectedCharacters.includes(char)}
                onChange={() => {
                  setSelectedCharacters((prev) => {
                    const next = prev.includes(char)
                      ? prev.filter((c) => c !== char)
                      : [...prev, char];
                    if (typeof onSelectedChange === "function")
                      onSelectedChange(next);
                    return next;
                  });
                }}
              />
            </label>
          ))}
        </div>
      )}
    </form>
  );
}
