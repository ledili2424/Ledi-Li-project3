import { Link } from "react-router-dom";
import "./header.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/profile", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Response from server:", res.data);
        setUsername(res.data.name);
      })
      .catch((err) => console.log("Error fetching user profile:", err));
  }, []);

  function handleLogout() {}

  return (
    <header>
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/manager" className="nav-link">
          Manage Password
        </Link>
        {username && (
          <div className="auth-div">
           <Link to="/manager" className="username">
          {username}
        </Link>
            <Link to="/login" className="nav-link">
              Log out
            </Link>
          </div>
        )}
        {!username && (
          <div className="auth-div">
            <Link to="/login" className="nav-link">
              Log in
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
