import React, { useState, useEffect, useContext } from 'react';
import TaskLine from '../../TaskLine/TaskLine';
import { TaskUpdateContext } from '../../TaskUpdateContext/TaskUpdateContext';
const LateTask = () => {
  const [lateTasks, setLateTasks] = useState([]);
  const { updateFlag } = useContext(TaskUpdateContext);

  const fetchTasks = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (currentUser && currentUser.tasks) {
      const currentDate = new Date();
      const filteredLateTasks = currentUser.tasks.filter((task) => {
        const dueDate = new Date(task.endDate);
        return dueDate < currentDate && !task.completed;
      });
      setLateTasks(filteredLateTasks);
    }
  };

  useEffect(() => {
    console.log('Task update flag changed:', updateFlag); 
    fetchTasks();
  }, [updateFlag]);

  return (
    <div className='bg-transparent border-black rounded-xl p-4 mb-10 border-2 shadow-custom'>
      <div className='task-list'>
        {lateTasks.map((task) => (
          <TaskLine key={task.id} task={task} onTaskAdded={fetchTasks} />
        ))}
      </div>
    </div>
  );
};


export default LateTask;

