import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Login succeeded — send user to main page
        localStorage.setItem(
          "session",
          JSON.stringify({
            isLoggedIn: true,
            user: data.user,
          })
        );
        navigate("/main");
      } else if (res.status === 401) {
        alert(
          "Invalid username or password. Make sure you created an account."
        );
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Error logging in");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="site-title">Game Changer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p>
          <Link to="/create-account">Create Account</Link>
        </p>
      </form>
    </div>
  );
}
