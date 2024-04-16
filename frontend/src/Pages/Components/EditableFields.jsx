import { useState } from "react";

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
    />
  ) : (
    <p onDoubleClick={() => setIsEditing(true)}>{value}</p>
  );
}

export default EditableField;
