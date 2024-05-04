import { useState, useEffect } from 'react'

import AddTaskPopup from '../../AddTaskPopup/AddTaskPopup'
import TaskLine from '../../TaskLine/TaskLine'

const ToDo = () => {
  const [addTaskPopUp, setAddTaskPopUp] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (currentUser && currentUser.tasks) {
      setTasks(currentUser.tasks)
    }
  }, [])

  const handleOpenAddTaskPopUp = () => {
    setAddTaskPopUp(true)
  }
  const handleCloseAddTaskPopUp = () => {
    setAddTaskPopUp(false)
  }

  return (
    <>
      <div class='card mt-4'>
        <div class='card-header'>
          <h4>To-Do</h4>
        </div>

        <div class='card-body'>
          <button class='btn btn-primary' onClick={handleOpenAddTaskPopUp}>Add Task</button>
          {addTaskPopUp && (
            <AddTaskPopup onClose={handleCloseAddTaskPopUp} />
          )}

          <div className='task-list'>
            {tasks.filter((task) => !task.completed).map((task) => (
              <TaskLine key={task.id} task={task} />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
export default ToDo
