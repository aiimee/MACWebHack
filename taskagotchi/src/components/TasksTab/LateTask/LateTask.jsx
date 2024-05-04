import { useState } from "react"
import { useEffect } from "react"
import TaskLine from "../../TaskLine/TaskLine";

const LateTask = () => {
  const [lateTasks, setLateTasks] = useState([]);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks);
    }
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const filteredLateTasks = tasks.filter((task) => {
      const dueDate = new Date(task.endDate);
      return dueDate < currentDate && !task.completed;
    });
    setLateTasks(filteredLateTasks);
  }, [tasks]);

  const handleTaskSaved = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks);
    }
  };

  return (
    <>
      {/* UPCOMING TASKS */}
      <div class='mt-4'>
        <div class='p-4'>
          <div className='task-list'>
            {lateTasks.map((task) => (
              <TaskLine key={task.id} task={task} onTaskAdded={handleTaskSaved}/>

            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default LateTask
