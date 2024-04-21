import { useState, useEffect } from "react";
import axios from "axios";

export default function SharePasswordForm() {
  const [message, setMessage] = useState("");
  const [sharedPasswordList, setSharedPasswordList] = useState([]);
  const [url, setUrl] = useState("");
  const [receiverName, setReceiverName] = useState("");

  function handleSubmitShareRequest(e) {
    e.preventDefault();
    if (!url || !receiverName) {
      setMessage("Please enter url and receiver!");
    } else {
      axios
        .post(
          "http://localhost:5000/password/share-request",
          { receiverName, url },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("Share Password response data:", res.data);
          setMessage("Password sent successfully!");
        })
        .catch((err) => {
          console.error("Share Password Error:", err);
          if (err.response) {
            const { message } = err.response.data;
            setMessage(message);
          }
        });
    }
  }

  return (
    <>
      <h1>Share Password</h1>
      <form onSubmit={handleSubmitShareRequest} className="input-form">
        {message && <p>{message}</p>}
        <input
          type="text"
          placeholder="website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="receiver"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
        />
        <button className="add-psw-btn">Share Password</button>
      </form>
    </>
  );
}
