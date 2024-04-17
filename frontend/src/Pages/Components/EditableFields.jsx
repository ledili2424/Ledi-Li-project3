import { useState } from "react";
import axios from "axios";
import "./editable_fields.css";

function EditableField({ initialValue, id, field }) {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = async () => {
    setIsEditing(false);

    const res = await axios.put(
      `http://localhost:5000/password/${id}`,
      { [field]: value },
      {
        withCredentials: true,
      }
    );

    setValue(res.data.data[field]);
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={handleBlur}
      autoFocus
      className="editable-input"
    />
  ) : (
    <p onClick={() => setIsEditing(true)} className="editable-field">
      {value}
    </p>
  );
}

export default EditableField;
