import "./auth_pages.css";

export default function Login() {
  return (
    <form className="auth-form">
      <h1 className="login-txt">LOG IN</h1>
      <input type="text" placeholder="username" />
      <input type="text" placeholder="password" />
      <button className="login-btn">Log in</button>
    </form>
  );
}
