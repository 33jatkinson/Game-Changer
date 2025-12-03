import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Character, getRandomCharacter } from "../Characters/Character";
import "./MainPage.css";

export function MainPage() {
  const [selectedGame, setSelectedGame] = useState("");
  const [randomChar, setRandomChar] = useState(null);
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
    const random = getRandomCharacter(selectedGame);
    if (!random) {
      alert("Please select a game first");
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
    <div className="main-page organized-container">
      <div className="main-header">
        <h2 className="main-title">Game Changer</h2>
        {user && <span className="welcome-text">Welcome, {user.username}</span>}
        <button className="secondary logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

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
            <h4>Random Pick</h4>
            <div className="character">
              {randomChar ? `${randomChar}` : "Character will appear here"}
            </div>
            <button className="secondary">Assign Mission</button>
          </div>

          <div className="history-panel">
            <button className="secondary" onClick={() => navigate("/history")}>
              View History
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
