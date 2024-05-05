import { useState, useEffect } from 'react';
import './AddTaskPopup.css';

const AddTaskPopup = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reward, setReward] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!title || !description || !priority || !startDate || !endDate) {
      setErrorMessage('All fields are required');
      setSuccessMessage('');
      return;
    }

    const taskScore = Math.min(20 + Math.floor(description.length / 10), 40);
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
    };

    if (currentUser) {
      currentUser.tasks = [...currentUser.tasks, newTask];
      const updatedUsers = users.map(user => user.id === currentUser.id ? currentUser : user);
      localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      onTaskAdded(); // Notify parent component to update the state
      setSuccessMessage('Task added successfully');
      setErrorMessage('');
      setTimeout(onClose, 1000); // Close popup after a delay
    } else {
      setErrorMessage('No current user found');
    }
  };

  const generateUniqueId = (currentUser) => {
    return currentUser.tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 popup-overlay'>
      <div className='bg-[#FAF4E6] rounded-lg shadow-lg p-6 w-96 border-2 border-black rounded-xl'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-semibold'>Add Task</h2>
          <button
            type='button'
            className='bg-[#F27C7C] hover:bg-[#F06565] focus:outline-none text-black font-bold py-0 px-2 border-2 border-black rounded-lg'
            onClick={onClose}
          >
            {/* Close Icon */}
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        {successMessage && <div className='alert alert-success'>{successMessage}</div>}
        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <label className='block text-gray-700 font-semibold mb-2' htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />

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

          {/* Additional fields as above with handlers for description, dates, etc. */}
          {/* Submit Button */}
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;
