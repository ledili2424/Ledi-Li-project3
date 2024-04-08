import "./auth_pages.css";

export default function Signup() {
  return (
    <form action="" className="auth-form">
      <h1 className="signup-txt">SIGN UP</h1>
      <input type="text" placeholder="new username" />
      <input type="text" placeholder="password" />
      <button className="signup-btn">Sign Up</button>
    </form>
  );
}
