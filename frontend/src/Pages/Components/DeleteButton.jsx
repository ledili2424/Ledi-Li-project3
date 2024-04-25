import axios from "axios";

function DeleteButton({ id, refreshPasswordList }) {
  async function handleDelete() {
    await axios.delete(`https://ledi-li-project3.onrender.com/password/${id}`, {
      withCredentials: true,
    });
    refreshPasswordList(id);
  }

  const buttonStyle = {
    marginRight: "30px",
    backgroundColor: "#ede9fe",
    cursor: "pointer",
  };

  return (
    <button onClick={handleDelete} style={buttonStyle}>
      ❌
    </button>
  );
}

export default DeleteButton;
