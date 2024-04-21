import { useState, useEffect } from "react";
import axios from "axios";
export default function SharePasswordForm() {
  const [error, setError] = useState("");
  const [sharedPasswordList, setSharedPasswordList] = useState([]);
  const [passwordUrl, setPasswordUrl] = useState("");
  const [receiver, setReceiver] = useState("");
  function handleSubmitShareRequest(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmitShareRequest} className="input-form">
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="website URL"
        value={passwordUrl}
        onChange={(e) => setPasswordUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <button className="add-psw-btn">Share Password</button>
    </form>
  );
}
