import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Character, getRandomCharacter } from "../Characters/Character";
import "./MainPage.css";

export function MainPage() {
  const [selectedGame, setSelectedGame] = useState("");
  const [randomChar, setRandomChar] = useState(null);
  const [selectedCharacters, setSelectedCharacters] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionStr = localStorage.getItem("session");
    if (!sessionStr) {
      navigate("/"); // not logged in
      return;
    }

    try {
      const session = JSON.parse(sessionStr);
      if (!session.isLoggedIn || !session.user) {
        localStorage.removeItem("session");
        navigate("/");
        return;
      }
      setUser(session.user);
    } catch (e) {
      console.error("Invalid session data:", e);
      localStorage.removeItem("session");
      navigate("/");
    }
  }, [navigate]);

  const handleRandomCharacter = async () => {
    if (!selectedGame) {
      alert("Please select a game first");
      return;
    }

    let random = null;
    // if parent received selected characters from Character component, use them
    if (selectedCharacters === null) {
      // no data yet from Character; fall back to full list
      random = getRandomCharacter(selectedGame);
    } else if (
      Array.isArray(selectedCharacters) &&
      selectedCharacters.length === 0
    ) {
      alert("Please select at least one character to randomize");
      return;
    } else {
      const pool = selectedCharacters;
      const idx = Math.floor(Math.random() * pool.length);
      random = pool[idx];
    }

    if (!random) {
      alert("No available character for the selected game");
      return;
    }

    // Display the picked character
    setRandomChar(random);

    // Save to database
    if (user?.username) {
      try {
        const res = await fetch("http://localhost:5000/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            game: selectedGame,
            character: random,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          console.error("Error saving to history:", data.error);
        }
      } catch (err) {
        console.error("Error saving to history:", err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("session");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="main-page">
      <div className="main-header">
        <span className="username-display">{user?.username}</span>
        <h1 className="site-title">Game Changer</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="character-box">
        <Character
          onGameChange={setSelectedGame}
          onSelectedChange={setSelectedCharacters}
        />
      </div>

      <div className="randomize-area">
        <button
          className="primary randomize-btn"
          onClick={handleRandomCharacter}
        >
          Randomize
        </button>

        <div className="random-result">
          {randomChar ? (
            <>
              <p className="you-got">You got,</p>
              <p className="result-character">{`${randomChar}`}</p>
            </>
          ) : (
            <>
              <p className="you-got">You got,</p>
              <p className="result-character">Character</p>
            </>
          )}
        </div>
      </div>

      <div className="history-footer">
        <button
          className="secondary history-btn"
          onClick={() => navigate("/history")}
        >
          History
        </button>
      </div>
    </div>
  );
}
