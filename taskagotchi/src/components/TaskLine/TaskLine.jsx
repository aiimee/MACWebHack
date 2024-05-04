import { useState } from 'react'
import './TaskLine.css'

const TaskLine = ({ task }) => {
  const [isHovered, setIsHovered] = useState(false)

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
    }
  }

  return (
    <div
      className='task-line'
    >
      <div
        className='task-checkbox'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleBoxClick}
      >
        {isHovered && <span>&#10003;</span>}
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
