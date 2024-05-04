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

  const handleOpenAddTaskPopUp = () => {
    setAddTaskPopUp(true);
  };

  const handleCloseAddTaskPopUp = () => {
    setAddTaskPopUp(false);
  };

  return (
    <>
      <div className='bg-white shadow-md rounded-lg mt-4'>
        <div className='px-4 py-2 border-b border-gray-200'>
          <h4 className='text-lg font-semibold'>To-Do</h4>
        </div>

        <div className='p-4'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleOpenAddTaskPopUp}>Add Task</button>
          {addTaskPopUp && (
            <AddTaskPopup onClose={handleCloseAddTaskPopUp} />
          )}

          <div className='space-y-4 mt-4'>
            {tasks.filter((task) => !task.completed).map((task) => (
              <TaskLine key={task.id} task={task} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default ToDo;

