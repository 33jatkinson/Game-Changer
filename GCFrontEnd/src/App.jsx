import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { CreateAccount } from "./components/CreateAccount/CreateAccount";
import { MainPage } from "./components/Main/MainPage";
import { History } from "./components/History/History";

function App() {
  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
