// 引入 React 库中的 useState 和 useEffect 钩子
import React, { useState, useEffect } from 'react';
// 引入 TaskInput 组件
import TaskInput from '../components/TaskInput';
// 引入 TaskList 组件
import TaskList from '../components/TaskList';

/**
 * HomePage 组件是应用程序的主页，它负责显示和管理任务列表。
 * @returns {JSX.Element} - 渲染的 HomePage 组件。
 */
const HomePage = () => {
  // 使用 useState 钩子来管理任务列表的状态
  const [tasks, setTasks] = useState([]);

  /**
   * 在组件挂载后，从本地存储中获取任务数据并更新状态。
   */
  useEffect(() => {
    // 从本地存储获取任务数据
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // 更新任务列表状态
    setTasks(storedTasks);
  }, []);

  /**
   * 添加新任务到任务列表。
   * @param {Object} newTask - 要添加的新任务对象。
   */
  const addTask = (newTask) => {
    // 将新任务添加到任务列表中
    setTasks([...tasks, newTask]);
  };

  /**
   * 切换任务的完成状态。
   * @param {number} taskId - 要切换完成状态的任务的 ID。
   */
  const toggleComplete = (taskId) => {
    // 更新任务列表，切换指定任务的完成状态
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        // 如果任务 ID 匹配，则切换完成状态
        return {
         ...task,
          completed:!task.completed
        };
      }
      // 如果任务 ID 不匹配，则返回原始任务
      return task;
    }));
  };

  /**
   * 编辑任务。
   * @param {Object} updatedTask - 更新后的任务对象。
   */
  const editTask = (updatedTask) => {
    // 更新任务列表，替换指定任务为更新后的任务
    setTasks(tasks.map(task => {
      if (task.id === updatedTask.id) {
        // 如果任务 ID 匹配，则返回更新后的任务
        return updatedTask;
      }
      // 如果任务 ID 不匹配，则返回原始任务
      return task;
    }));
  };

  /**
   * 删除任务。
   * @param {number} taskId - 要删除的任务的 ID。
   */
  const deleteTask = (taskId) => {
    // 更新任务列表，过滤掉指定 ID 的任务
    setTasks(tasks.filter(task => task.id!== taskId));
  };

  /**
   * 在任务列表更新后，将任务数据保存到本地存储。
   */
  useEffect(() => {
    // 将任务数据保存到本地存储
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 渲染 HomePage 组件
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 渲染 TaskInput 组件，用于添加新任务 */}
      <TaskInput onAddTask={addTask} />
      {/* 渲染 TaskList 组件，用于显示任务列表，并处理任务的完成、编辑和删除操作 */}
      <TaskList tasks={tasks} onToggleComplete={toggleComplete} onEditTask={editTask} onDeleteTask={deleteTask} />
    </div>
  );
};

// 导出 HomePage 组件
export default HomePage;
