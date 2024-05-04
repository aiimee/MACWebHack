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
      <div className="bg-transparent border-black rounded-xl p-4 mb-10 border-2">
          {/* ADD BUTTON */}
          <button
            className="bg-[#A8FF93] hover:bg-[#8FE67E] text-black font-bold py-0 px-2 border-2 border-black rounded-lg flex items-center justify-center mb-4 ml-auto mr-2"
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
    </>
  );
};

export default ToDo;

