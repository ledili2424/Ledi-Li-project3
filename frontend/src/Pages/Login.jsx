import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth_pages.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function onLogin(e) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log("User log in successfully!");
      navigate("/manager");
    } catch (err) {
      console.log("Error log in", err);
    }
  }
  return (
    <form className="auth-form" onSubmit={onLogin}>
      <h1 className="login-txt">LOG IN</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn">Log in</button>
    </form>
  );
}
