import { useState } from "react";


const EditTask = ({ taskName, onSave, onCancel }) => {
  const [newName, setNewName] = useState(taskName);

  const handleSave = () => {
    if (newName.trim() !== '') {
      onSave(newName);
    }
  };

  return (
    <span>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </span>
  );
};

export default EditTask;
