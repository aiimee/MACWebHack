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
  const [reward, setReward] = useState('')

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
    const taskScore = Math.min(20 + Math.floor(description.length / 10), 40)

    // temp new task
    const newTask = {
      id: generateUniqueId(currentUser),
      title,
      description,
      priority,
      score: taskScore,
      completed: false,
      startDate,
      endDate,
      reward,
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
    window.location.reload();
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
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
      <div className="bg-[#FAF4E6] rounded-lg shadow-lg p-6 w-96 border-2 border-black rounded-xl">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-2xl font-semibold">Add Task</h2>
          <button
            type="button"
            className="bg-[#F27C7C] hover:bg-[#F06565] focus:outline-none text-black font-bold py-0 px-2 border-2 border-black rounded-lg"
            onClick={onClose}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {successMessage && <div className='alert alert-success'>{successMessage}</div>}
        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        <form>

          {/* Render form fields for editing task details */}
          <div className="mb-4 ">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2 ">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg"
              rows="3"
            ></textarea>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2 ">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg"
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-2">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg"
            />
          </div>


          <div className="mb-4">
            <label htmlFor="reward" className="block text-gray-700 font-semibold mb-2">
              Reward:
            </label>
            <textarea
              id="description"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg"
              rows="3"
            ></textarea>
          </div>


          {/* Priority */}
          <div className="mb-4">
            <label htmlFor="priority" className="block text-gray-700 font-semibold mb-2">
              Priority:
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Add other form fields */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default AddTaskPopup
