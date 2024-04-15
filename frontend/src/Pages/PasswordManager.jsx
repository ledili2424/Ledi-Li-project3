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
  const [error, setError] = useState("");

  function handleCheckboxChange(e) {
    const { name } = e.target;
    setCheckbox((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  function generateRandomPassword(checkbox, length) {
    const lowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseAlphabet = lowerCaseAlphabet.toUpperCase();
    const alphabet = lowerCaseAlphabet + upperCaseAlphabet;
    const numerics = "0123456789";
    const symbols = "!@#$%^&*()-_=+";

    let password = "";
    let optionalChars = "";

    //TODO(deal with length == 0 or checkbox not checked)

    optionalChars += checkbox.alphabet ? alphabet : "";
    optionalChars += checkbox.numerics ? numerics : "";
    optionalChars += checkbox.symbols ? symbols : "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * optionalChars.length);
      password += optionalChars[randomIndex];
    }
    return password;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!url) setError("Please enter url");
    else {
      if (password) {
        console.log("do post request");
      } else {
        if (!length || parseInt(length) < 4 || parseInt(length) > 40 || isNaN(parseInt(length))) {
          setError("Password length should be between 4 and 40");
        } else if (
          checkbox.alphabet === false &&
          checkbox.numerics === false &&
          checkbox.symbols === false
        ) {
          setError("Please check at least one box");
        } else {
          setPassword(generateRandomPassword(checkbox, length));
          console.log("Password Generated");
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-form">
      {error && <p>{error}</p>}
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
