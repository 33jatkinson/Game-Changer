import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { CreateAccount } from "./components/CreateAccount/CreateAccount";
import { Main } from "./components/Main/Main";

function App() {
  return (
    <div className="page-container">
      <h1 className="site-title">Game Changer</h1>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
