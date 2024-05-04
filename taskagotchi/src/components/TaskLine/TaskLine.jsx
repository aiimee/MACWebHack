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
      currentUser.tasks = updatedTasks
      console.log(currentUser.tasks)
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      )

      localStorage.setItem('loggedInUser', JSON.stringify(currentUser))
      localStorage.setItem('users', JSON.stringify(updatedUsers))

      // trigger reload data from local storage
      // to make it disapear in todo list after user tick
      onTaskAdded();
    }
  }

  const handleTaskDeleted = (taskId) => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (currentUser && currentUser.tasks) {
      const updatedTasks = currentUser.tasks.filter((task) => task.id !== taskId);
      const updatedUser = { ...currentUser, tasks: updatedTasks };
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      setTasks(updatedTasks);
      onTaskAdded();
    }
    setDetailTaskPopUp(false);
    setSelectedTask(null);
  };

  const handleTaskSaved = (updatedTask) => {
    // Find the index of the updated task in the tasks array
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks);
    }

    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      // Create a new array with the updated task
      const updatedTasks = [
        ...tasks.slice(0, taskIndex),
        updatedTask,
        ...tasks.slice(taskIndex + 1),
      ];
      // Update the tasks state
      setTasks(updatedTasks);
      // Update the tasks in local storage
      const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const updatedUser = { ...currentUser, tasks: updatedTasks };
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
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
        onClick={handleBoxClick}
      >
        {(isHovered || task.completed) && <span>&#10003;</span>}
      </div>

      <div className='task-details'>
        <div className='task-title'>{task.title.length > 20 ? `${task.title.slice(0, 20)}...` : task.title}</div>
        <div className='task-info'>
          <div className='task-end-date'>{task.endDate}</div>
          <div className='task-priority' style={{ backgroundColor: getTaskPriorityColor(task.priority) }}>
            {task.priority}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskLine
