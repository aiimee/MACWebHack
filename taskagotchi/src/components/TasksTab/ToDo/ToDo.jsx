import { useState, useEffect } from 'react';

import AddTaskPopup from '../../AddTaskPopup/AddTaskPopup';
import TaskLine from '../../TaskLine/TaskLine';

const ToDo = () => {
  const [addTaskPopUp, setAddTaskPopUp] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks);
    }
  }, []);

  const handleTaskSaved = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks);
    }
  };

  const handleOpenAddTaskPopUp = () => {
    setAddTaskPopUp(true);
  };

  const handleCloseAddTaskPopUp = () => {
    setAddTaskPopUp(false);
  };

  return (
    <>
      <div className="mt-4">
        <div className="p-4">
          {/* ADD BUTTON */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center mb-4"
            onClick={handleOpenAddTaskPopUp}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>

          {addTaskPopUp && (
            <AddTaskPopup 
              onClose={handleCloseAddTaskPopUp} 
              onTaskAdded={handleTaskSaved} 
              />
          )}

          <div className='space-y-4 mt-4'>
            {tasks.filter((task) => !task.completed).map((task) => (
              <TaskLine key={task.id} task={task} onTaskAdded={handleTaskSaved}/>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default ToDo;

