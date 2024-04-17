import { useState } from "react";
import './editable_fields.css';

function EditableField({ initialValue }) {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    //TODO:update the data in database
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
    <p
      onClick={() => setIsEditing(true)}
      className="editable-field"
    >
      {value}
    </p>
  );
}

export default EditableField;
