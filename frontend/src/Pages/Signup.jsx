import { useState } from "react";
import axios from "axios";
import "./auth_pages.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSignUp(e) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/signup",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User sign up successfully!");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={onSignUp} className="auth-form">
      <h1 className="signup-txt">SIGN UP</h1>
      <input
        type="text"
        placeholder="new username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signup-btn">Sign Up</button>
    </form>
  );
}
