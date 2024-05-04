import { useState } from 'react'

const DetailTaskPopup = ({ onClose, onTaskSaved, onTaskDeleted, selectedTask }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(selectedTask ? selectedTask.title : '')
  const [description, setDescription] = useState(selectedTask ? selectedTask.description : '')
  const [startDate, setStartDate] = useState(selectedTask ? selectedTask.startDate : '')
  const [endDate, setEndDate] = useState(selectedTask ? selectedTask.endDate : '')
  const [priority, setPriority] = useState(selectedTask ? selectedTask.priority : '')
  const [reward, setReward] = useState(selectedTask ? selectedTask.reward : '')

  const handleSaveTask = () => {
    const updatedTask = {
      ...selectedTask,
      title,
      description,
      startDate,
      endDate,
      priority,
      reward
    }
    onTaskSaved(updatedTask)
    setIsEditMode(false)
  }

  const handleDeleteTask = () => {
    onTaskDeleted(selectedTask.id)
    onClose()
  }

  const handleCloseTaskDetail = (event) => {
    event.stopPropagation()
    onClose()
    window.location.reload()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10'>
      <div className='bg-[#FAF4E6] rounded-lg shadow-lg p-6 w-96 border-2 border-black rounded-xl'>
        <div className='flex justify-between items-center mb-4 '>
          <h2 className='text-2xl font-semibold'>Task Details</h2>
          <button
            type='button'
            className='bg-[#F27C7C] hover:bg-[#F06565] focus:outline-none text-black font-bold py-0 px-2 border-2 border-black rounded-lg'
            onClick={(event) => handleCloseTaskDetail(event)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        {isEditMode ? (
          <form>
            {/* Render form fields for editing task details */}
            <div className='mb-4 '>
              <label htmlFor='title' className='block text-gray-700 font-semibold mb-2 '>
                Title:
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'
              />
            </div>

            {/* Description */}
            <div className='mb-4'>
              <label htmlFor='description' className='block text-gray-700 font-semibold mb-2'>
                Description:
              </label>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'
                rows='3'
              />
            </div>

            {/* Start Date */}
            <div className='mb-4'>
              <label htmlFor='startDate' className='block text-gray-700 font-semibold mb-2 '>
                Start Date:
              </label>
              <input
                type='date'
                id='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'
              />
            </div>

            {/* End Date */}
            <div className='mb-4'>
              <label htmlFor='endDate' className='block text-gray-700 font-semibold mb-2'>
                End Date:
              </label>
              <input
                type='date'
                id='endDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='reward' className='block text-gray-700 font-semibold mb-2'>
                Reward:
              </label>
              <textarea
                id='description'
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'
                rows='3'
              />
            </div>

            {/* Priority */}
            <div className='mb-4'>
              <label htmlFor='priority' className='block text-gray-700 font-semibold mb-2'>
                Priority:
              </label>
              <select
                id='priority'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'
              >
                <option value=''>Select Priority</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>

            {/* Add other form fields */}
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={handleSaveTask}
                className='bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 rounded-lg'
              >
                Save
              </button>
              <button
                type='button'
                onClick={() => setIsEditMode(false)}
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Render task details */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>Title:</label>
              <p className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'>{title}</p>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>Description:</label>
              <p className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'>{description}</p>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>Start Date:</label>
              <p className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'>{startDate}</p>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>End Date:</label>
              <p className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'>{endDate}</p>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>Reward:</label>
              <p className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'>{reward}</p>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>Priority:</label>
              <p className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 rounded-lg'>{priority}</p>
            </div>

            {selectedTask.completed
              ? <div />
              : <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => setIsEditMode(true)}
                  className='bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 rounded-lg'
                >
                          Edit
                </button>
                <button
                  type='button'
                  onClick={handleDeleteTask}
                  className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 rounded-lg'
                >
                          Delete
                </button>
                </div>}

          </>
        )}
      </div>
    </div>
  )
}
export default DetailTaskPopup
