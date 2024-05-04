import { useState } from 'react'
import './AddTaskPopup.css'

const AddTaskPopup = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'))
    const users = JSON.parse(localStorage.getItem('users'))

    // all fields must be fill
    if (!title || !description || !priority || !startDate || !endDate) {
      setErrorMessage('All fields are required')
      setSuccessMessage('')
      return
    }

    // generate score
    const taskScore = Math.min(10 + Math.floor(description.length / 10), 15)

    // temp new task
    const newTask = {
      id: generateUniqueId(currentUser),
      title,
      description,
      priority,
      score: taskScore,
      completed: false,
      startDate,
      endDate
    }

    // store in local storage
    if (currentUser && users) {
      currentUser.tasks.push(newTask)
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      )

      localStorage.setItem('loggedInUser', JSON.stringify(currentUser))
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    }

    // set return msg
    setSuccessMessage('Task added successfully')
    setErrorMessage('')

    // trigger reload data from local storage
    onTaskAdded();

    setTimeout(() => {
      onClose()
    }, 1000)
  }

  const generateUniqueId = (user) => {
    // find the maximum ID from the existing users
    let maxId = 0
    if (user.tasks.length > 0) {
      maxId = Math.max(...user.tasks.map(task => task.id))
    } else {
      maxId = 0
    }
    // increment the maximum ID by 1 to generate a new unique ID
    const newId = maxId + 1
    return newId
  }

  return (
    <div className='popup-overlay'>
      <div className='row border rounded-5 p-3 bg-white shadow box-area'>
        <h2>Add Task</h2>
        {successMessage && <div className='alert alert-success'>{successMessage}</div>}
        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className='form-group'>
            <label htmlFor='taskTitle'>Title</label>
            <input
              type='text'
              className='form-control'
              id='taskTitle'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              required
            />
          </div>

          {/* Start date */}
          <div className='form-group'>
            <label htmlFor='startDate'>Start Date</label>
            <input
              type='date'
              className='form-control'
              id='startDate'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* End date */}
          <div className='form-group'>
            <label htmlFor='endDate'>End Date</label>
            <input
              type='date'
              className='form-control'
              id='endDate'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className='form-group'>
            <label htmlFor='taskDescription'>Description</label>
            <textarea
              className='form-control'
              id='taskDescription'
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Priority lv */}
          <div className='form-group'>
            <label htmlFor='taskPriority'>Priority</label>
            <select
              className='form-control'
              id='taskPriority'
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value=''>Select priority</option>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>

          {/* buttons */}
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
          <button type='button' className='btn btn-secondary' onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>

  )
}

export default AddTaskPopup
