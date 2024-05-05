import { useState, useEffect } from 'react'

import TaskLine from '../../TaskLine/TaskLine'

const LateTask = () => {
  const [lateTasks, setLateTasks] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks)
    }
  }, [])

  useEffect(() => {
    const currentDate = new Date()
    const filteredLateTasks = tasks.filter((task) => {
      const dueDate = new Date(task.endDate)
      return dueDate < currentDate && !task.completed
    })
    setLateTasks(filteredLateTasks)
  }, [tasks])

  const handleTaskSaved = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks)
    }
  }

  return (
    <>
      {/* UPCOMING TASKS */}
      <div className='bg-transparent border-black rounded-xl p-4 mb-10 border-2 shadow-custom'>
        <div className='task-list'>
          {lateTasks.map((task) => (
            <TaskLine key={task.id} task={task} onTaskAdded={handleTaskSaved} />

          ))}
        </div>
      </div>
    </>
  )
}
export default LateTask
