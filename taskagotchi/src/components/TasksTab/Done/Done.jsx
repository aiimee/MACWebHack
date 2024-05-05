import { useState, useEffect } from 'react'

import TaskLine from '../../TaskLine/TaskLine'

const Done = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks.filter((task) => task.completed))
    }
  }, [])

  const handleTaskDone = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks.filter((task) => task.completed))
    }
  }
  return (
    <>
      {/* UPCOMING TASKS */}
      <div class='bg-transparent border-black rounded-xl p-4 mb-10 border-2'>
        <div className='task-list'>
          {tasks.map((task) => (
            <TaskLine key={task.id} task={task} onTaskDone={handleTaskDone} />

          ))}
        </div>
      </div>
    </>
  )
}
export default Done
