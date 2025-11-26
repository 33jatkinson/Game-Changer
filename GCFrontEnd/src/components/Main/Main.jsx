import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Character, getRandomCharacter } from "../Characters/Character";
import "./Main.css";

export function Main() {
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

  const handleRandomCharacter = () => {
    const random = getRandomCharacter(selectedGame);
    if (random) {
      setRandomChar(random);
    } else {
      alert("Please select a game first");
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
              {randomChar
                ? `Selected: ${randomChar}`
                : "Character will appear here"}
            </div>
            <button className="secondary">Assign Mission</button>
          </div>

          <div className="history-panel">
            <h4>History</h4>
            <div className="history-list">"No History yet"</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
