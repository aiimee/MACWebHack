import React, { useState, useEffect, useContext } from 'react';
import { useExperience } from '../../ExperienceContext/ExperienceProvider';
import TaskLine from '../../TaskLine/TaskLine';
import { TaskUpdateContext } from '../../TaskUpdateContext/TaskUpdateContext';
const Done = () => {
  const { addExperience } = useExperience();
  const { updateFlag } = useContext(TaskUpdateContext); // Listens to task completion changes
  const [tasks, setTasks] = useState([]);

  // Fetch and update completed tasks from localStorage
  useEffect(() => {
    const fetchTasks = () => {
      const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (currentUser && currentUser.tasks) {
        const completedTasks = currentUser.tasks.filter(task => task.completed);
        setTasks(completedTasks);
      }
    };

    fetchTasks();
  }, [updateFlag]); // Rerun this effect if updateFlag changes

  return (
    <div className='bg-transparent border-black rounded-xl p-4 mb-10 border-2'>
      <div className='task-list'>
        {tasks.map((task) => (
          <TaskLine key={task.id} task={task} onTaskAdded={() => addExperience(20)} />
        ))}
      </div>
    </div>
  );
};

export default Done;


