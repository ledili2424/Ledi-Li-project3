import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/manager">Manage Password</Link>
      </nav>
      <nav>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}
