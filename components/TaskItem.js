import React, { useState } from 'react';

const TaskItem = ({ task, onToggleComplete, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const updatedTask = {
    ...task,
      title: editedTitle,
      description: editedDescription
    };
    onEditTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      {isEditing? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleEditToggle}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className={`text-xl font-bold ${task.completed? 'line-through' : ''}`}>{task.title}</h3>
          <p className="text-gray-700">{task.description}</p>
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`${task.completed? 'bg-green-500' : 'bg-yellow-500'} text-white px-4 py-2 rounded mt-2 mr-2`}
          >
            {task.completed? 'Completed' : 'Mark as Completed'}
          </button>
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;