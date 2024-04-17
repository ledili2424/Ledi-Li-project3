import EditableField from "./EditableFields";
import "./password_list.css";

function PasswordList({ passwordInfos }) {
  function handleDelete() {}

  return (
    <div className="password-list">
      <div className="title-container">
        <h4 className="url-title">URL</h4>
        <h4 className="password-title">Password</h4>
      </div>

      {passwordInfos &&
        passwordInfos.map((info, index) => (
          <div key={index} className="password-item">
            <EditableField initialValue={info.url} className="url" />
            <EditableField initialValue={info.password} />
            <button onClick={handleDelete} className="delete-btn">
              ❌
            </button>
          </div>
        ))}
    </div>
  );
}

export default PasswordList;
