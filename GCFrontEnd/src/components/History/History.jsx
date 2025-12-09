import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./History.css";

export function History() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load session
  useEffect(() => {
    const sessionStr = localStorage.getItem("session");
    if (!sessionStr) {
      navigate("/");
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
    } catch {
      localStorage.removeItem("session");
      navigate("/");
    }
  }, [navigate]);

  // Fetch history
  useEffect(() => {
    if (!user?.username) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/history/${encodeURIComponent(user.username)}`
        );

        const data = await res.json();

        if (res.ok) {
          // newest first
          const sorted = (data.history || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setHistory(sorted);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error loading history:", err);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="history-page">
      <h2>Your History</h2>

      <div className="history-actions">
        <button className="back-btn" onClick={() => navigate("/main")}>
          ← Back to Main
        </button>
        <button
          className="clear-btn"
          onClick={async () => {
            if (!user?.username) return;
            try {
              const res = await fetch(
                `http://localhost:5000/history/${encodeURIComponent(
                  user.username
                )}`,
                { method: "DELETE" }
              );
              if (res.ok) {
                setHistory([]);
              }
            } catch (_) {
              //error
            }
          }}
        >
          Clear History
        </button>
      </div>

      <ul className="history-list">
        {history.length === 0 && <li>No history yet</li>}
        {history.map((item, idx) => (
          <li key={idx}>
            <strong>{item.character}</strong> — {item.game}{" "}
            {item.createdAt && `(${new Date(item.createdAt).toLocaleString()})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
