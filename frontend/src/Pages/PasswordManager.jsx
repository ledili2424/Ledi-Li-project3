import { useState } from "react";
import "./password_manager.css";

export default function PasswordManager() {
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState({
    alphabet: false,
    numerics: false,
    symbols: false,
  });
  const [length, setLength] = useState("");
  function handleCheckboxChange(e) {
    const { name } = e.target;
    setCheckbox((prev) => ({ ...prev, [name]: !prev[name] }));
  }
  return (
    <form className="input-form" >
      <input
        type="text"
        placeholder="website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="password length"
        min="4"
        max="50"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />

      <div className="checkbox">
        <div className="option">
          <input
            type="checkbox"
            id="alphabet"
            name="alphabet"
            checked={checkbox.alphabet}
            onChange={handleCheckboxChange}
            className="option-name"
          />
          <label htmlFor="alphabet">Alphabet</label>
        </div>

        <div className="option">
          <input
            type="checkbox"
            id="numerics"
            name="numerics"
            checked={checkbox.numerics}
            onChange={handleCheckboxChange}
            className="option-name"
          />
          <label htmlFor="numerics">Numerals</label>
        </div>
        <div className="option">
          <input
            type="checkbox"
            id="symbols"
            name="symbols"
            checked={checkbox.symbols}
            onChange={handleCheckboxChange}
            className="option-name"
          />
          <label htmlFor="symbols">Symbols</label>
        </div>
      </div>

      <button className="add-psw-btn">Add Password</button>
    </form>
  );
}
