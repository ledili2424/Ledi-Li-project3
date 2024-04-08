import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/manager" className="nav-link">
          Manage Password
        </Link>
        <div className="auth">
          <Link to="/login" className="nav-link">
            Log in
          </Link>
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
