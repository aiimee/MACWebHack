import { useState } from 'react'
import { useEffect } from 'react';
import './TaskLine.css'
import DetailTaskPopup from '../DetailTaskPopup/DetailTaskPopup';

const TaskLine = ({ task, onTaskAdded }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [detailTaskPopUp, setDetailTaskPopUp] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const getTaskPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f27c7c'
      case 'medium':
        return '#93aaff'
      case 'low':
        return '#a8ff93'
      default:
        return 'inherit'
    }
  }

  const handleOpenDetailTaskPopUp = () => {
    // console.log("opening");
    setDetailTaskPopUp(true);
    setSelectedTask(task);
  };

  const handleCloseDetailTaskPopUp = () => {
    // console.log("closing");
    setDetailTaskPopUp(false);
    setSelectedTask(null);
  };

  const handleBoxClick = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'))
    const users = JSON.parse(localStorage.getItem('users')) || []

    if (currentUser) {
      const updatedTasks = currentUser.tasks.map((t) =>
        t.id === task.id ? { ...t, completed: true } : t
      )

      // adding the score to reward points
      const taskScore = task.score;
      currentUser.rewardPoints = currentUser.rewardPoints + taskScore;

      currentUser.tasks = updatedTasks
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      )

      localStorage.setItem('loggedInUser', JSON.stringify(currentUser))
      localStorage.setItem('users', JSON.stringify(updatedUsers))

      // trigger reload data from local storage
      // to make it disapear in todo list after user tick
      onTaskAdded();
    }
    window.location.reload();
  }

  const handleTaskDeleted = (taskId) => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (currentUser && currentUser.tasks) {
      const updatedTasks = currentUser.tasks.filter((task) => task.id !== taskId);
      const updatedUser = { ...currentUser, tasks: updatedTasks };
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      setTasks(updatedTasks);
      onTaskAdded();

      // Update the users array in the local storage
      const userIndex = users.findIndex((user) => user.id === currentUser.id);
      if (userIndex !== -1) {
        const updatedUsers = [
          ...users.slice(0, userIndex),
          updatedUser,
          ...users.slice(userIndex + 1),
        ];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    }

    setDetailTaskPopUp(false);
    setSelectedTask(null);
    window.location.reload();
  };

  const handleTaskSaved = (updatedTask) => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // check login
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks);
    }

    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      // create a new array with the updated task
      const updatedTasks = [
        ...tasks.slice(0, taskIndex),
        updatedTask,
        ...tasks.slice(taskIndex + 1),
      ];

      // update the tasks state
      setTasks(updatedTasks);

      // update the tasks in the loggedInUser object
      const updatedUser = { ...currentUser, tasks: updatedTasks };
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

      // update the users array in the local storage
      const userIndex = users.findIndex((user) => user.id === currentUser.id);
      if (userIndex !== -1) {
        const updatedUsers = [
          ...users.slice(0, userIndex),
          updatedUser,
          ...users.slice(userIndex + 1),
        ];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    }
  };

  return (
    <div
      className='task-line'
      onClick={handleOpenDetailTaskPopUp}
    >
      {/* PopUp onclick */}
      {detailTaskPopUp && (
        <DetailTaskPopup
          onClose={handleCloseDetailTaskPopUp}
          onTaskSaved={handleTaskSaved}
          onTaskDeleted={handleTaskDeleted}
          selectedTask={selectedTask}
        />

      )}

      {/* check box */}
      <div
        className='task-checkbox'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={task.completed ? undefined : handleBoxClick}
      >
        {(isHovered || task.completed) && <span className="text-4xl">&#10003;</span>}
      </div>

      <div className='task-details'>
        <div className='task-title'>{task.title.length > 20 ? `${task.title.slice(0, 20)}...` : task.title}</div>
        <div className='task-info'>
          <div className='task-end-date'>due date: {task.endDate}</div>
          <div className='flex justify-end'>
            <div
              className='task-priority inline-block px-2 py-1 rounded text-white'
              style={{ backgroundColor: getTaskPriorityColor(task.priority) }}
            >
              {task.priority}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskLine
