import  { useState } from 'react';
import EditTask from './EditTask';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleCompletion = () => {
    updateTask(task.id, { isCompleted: !task.isCompleted });
  };

  const handleEdit = (newName) => {
    updateTask(task.id, { name: newName });
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={handleToggleCompletion}
      />
      {isEditing ? (
        <EditTask
          taskName={task.name}
          onSave={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <span
            onClick={() => setIsEditing(true)}
            style={{
              textDecoration: task.isCompleted ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {task.name}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
