import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onEditTask, onDeleteTask }) => {
  return (
    <div className="container mx-auto px-4">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  );
};

export default TaskList;