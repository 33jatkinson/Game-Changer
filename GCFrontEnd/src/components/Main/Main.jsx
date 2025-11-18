import { Character } from "../Characters/Character";
import "./Main.css";

export function Main() {
  return (
    <div className="main-page organized-container">
      <h2 className="main-title">Game Changer</h2>

      <div className="main-layout">
        <div className="main-left">
          <div className="main-section">
            <Character />
          </div>
        </div>

        <aside className="main-right">
          <div className="actions-panel">
            <button className="primary">Random Character</button>
            <button className="secondary">Assign Mission</button>
          </div>

          <div className="history-panel">
            <h4>History</h4>
            <div className="history-list">No history yet.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
