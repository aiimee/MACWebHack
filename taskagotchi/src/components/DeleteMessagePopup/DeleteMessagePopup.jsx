import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DeleteMessagePopup.css'
import { Trash } from 'react-bootstrap-icons'

const DeleteMessagePopup = ({ text, user, onClose }) => {
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState(false)

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        onClose()
        navigate('/')
      }, 2000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [successMessage, onClose, navigate])

  const handleConfirm = () => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    // find user id
    const userId = users.findIndex((u) => u.id === user.id)

    // check if the user exists
    if (userId !== -1) {
      // delete the user
      users.splice(userId, 1)

      // update the users array
      localStorage.setItem('users', JSON.stringify(users))

      // remove the loggedInUser
      localStorage.removeItem('loggedInUser')

      // show success message
      setSuccessMessage('Success! Redirecting to Homepage...')
    } else {
      onClose()
    }
  }

  return (
    <div className='popup-overlay'>
      <div className='middle-pls'>
        {successMessage && <div className='alert alert-success'>{successMessage}</div>}
        <div className='popup-content'>
          <Trash className='popup-trash-icon' />
          <p className='popup-text'>{text}</p>
          <div className='popup-buttons'>
            {!successMessage && (
              <>
                <button className='popup-close-button' onClick={onClose}>
                  Close
                </button>
                <button className='popup-confirm-button' onClick={handleConfirm}>
                  Confirm
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteMessagePopup
