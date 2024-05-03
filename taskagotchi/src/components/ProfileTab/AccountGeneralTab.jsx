import React, { useState, useEffect } from 'react'

import { Trash } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import DeleteMessagePopup from '../DeleteMessagePopup/DeleteMessagePopup'
import { isValidEmail, isVaidPhonenumber } from '../../utils/validationUtils'

const AccountGeneralTab = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [dateJoined, setDateJoined] = useState('')

  const [editModePersonal, setEditModePersonal] = useState(false)
  const [editModeContact, setEditModeContact] = useState(false)
  // const [activeTab, setActiveTab] = useState('account-general');

  // error message triggers
  const [errorMessagePersonalInfo, setErrorMessagePersonalInfo] = useState('')
  const [successMessagePersonalInfo, setSuccessMessagePersonalInfo] = useState('')

  const [errorMessageContactInfo, setErrorMessageContactInfo] = useState('')
  const [successMessageContactInfo, setSuccessMessageContactInfo] = useState('')

  //
  const [deletePopUp, setDeletePopUp] = useState(false)

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (loggedInUser) {
      setUser(loggedInUser)
      setFirstName(loggedInUser.firstName || '')
      setLastName(loggedInUser.lastName || '')
      setEmail(loggedInUser.email || '')
      setPhoneNumber(loggedInUser.phoneNumber || '')
      setDateOfBirth(loggedInUser.dateOfBirth || 'mm/dd/yyyy')
      setDateJoined(loggedInUser.dateJoined || '')
    } else {
      navigate('/login')
    }
  }, [navigate])

  // HANDLE SAVE PERSONAL INFORMATION
  const handleSavePersonal = () => {
    if (!firstName || !lastName) {
      setErrorMessagePersonalInfo('Name is required fields.')
      setSuccessMessagePersonalInfo('')
      return
    }

    // temp data
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth
    }

    // store in localstorage
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))

    setUser(updatedUser)
    setEditModePersonal(false)
    setErrorMessagePersonalInfo('')
    setSuccessMessagePersonalInfo('Saved')
  }

  // HANDLE SAVE CONTACT
  //
  const handleSaveContact = () => {
    // check userinfo
    if (!isValidEmail(email)) {
      setErrorMessageContactInfo('Please enter a valid email address.')
      setSuccessMessageContactInfo('')
      return
    }

    if (!isVaidPhonenumber(phoneNumber) && phoneNumber !== '') {
      setErrorMessageContactInfo('Phone number is invalid')
      setSuccessMessageContactInfo('')
      return
    }

    // temp data
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth
    }
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setEditModeContact(false)

    // clear error message
    setErrorMessageContactInfo('')
    setSuccessMessageContactInfo('Saved')
  }

  // HANDLE CANCEL EDIT
  const handleCancelPersonal = () => {
    setFirstName(user.firstName || '')
    setLastName(user.lastName || '')
    setEmail(user.email || '')
    setPhoneNumber(user.phoneNumber || '')
    setDateOfBirth(user.dateOfBirth || '')
    setEditModePersonal(false)
  }
  const handleCancelContact = () => {
    setFirstName(user.firstName || '')
    setLastName(user.lastName || '')
    setEmail(user.email || '')
    setPhoneNumber(user.phoneNumber || '')
    setDateOfBirth(user.dateOfBirth || '')
    setEditModeContact(false)
  }

  // HANDLE close DELETE
  const handleCloseDeletePopUp = () => {
    setDeletePopUp(false)
  }

  return (
    <>
      <div className='tab-pane fade active show' id='account-general'>
        <div className='card-body'>

          {/* sub heading */}
          <div className='row'>
            <div className='col'>
              <h5 className='mb-4 text-start your-details'>Your details</h5>
            </div>
            <div className='col text-end' onClick={() => setDeletePopUp(true)}>
              <Trash className='delete-icon' />
            </div>
            {deletePopUp && (
              <DeleteMessagePopup
                text='Are your sure about that ?'
                user={user}
                onClose={handleCloseDeletePopUp}
              />
            )}
          </div>

          {/* error message */}
          {successMessagePersonalInfo && !errorMessagePersonalInfo && (
            <div className='alert alert-success' style={{ width: '100%' }}>
              {successMessagePersonalInfo}
            </div>
          )}
          {errorMessagePersonalInfo && !successMessagePersonalInfo && (
            <div className='alert alert-danger' style={{ width: '100%' }}>
              {errorMessagePersonalInfo}
            </div>
          )}

          {/* personal row */}
          <div className='row'>
            {/* Personal + edit */}
            <div className='row'>
              <div className='col'>
                <h6 className='mb-3 text-start personal-contact'>Personal </h6>

              </div>

              <div className='col text-end'>
                {!editModePersonal
                  ? (
                    <a href='#' className='ml-1 edit-link' onClick={() => setEditModePersonal(true)}>Edit</a>
                    )
                  : (
                    <>
                      <a href='#' className='ml-1 cancel-link' onClick={handleCancelPersonal}>Cancel</a>
                      <a href='#' className='ml-1 save-link' onClick={handleSavePersonal}>Save</a>
                    </>
                    )}
              </div>

            </div>

            {/* personal detail */}
            {/* FIRST NAME */}
            <div className='form-group text-start'>
              <label className='personal-detail'>First name:</label>
              <div>
                {editModePersonal
                  ? (
                    <input type='text' className='form-control personal-detail-thin' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    )
                  : (
                    <span className='form-control personal-detail-thin'>{firstName}</span>
                    )}
              </div>
            </div>

            {/* LAST NAME */}
            <div className='form-group text-start mb-2'>
              <label className='personal-detail'>Last name:</label>
              <div>
                {editModePersonal
                  ? (
                    <input type='text' className='form-control personal-detail-thin' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    )
                  : (
                    <span className='form-control personal-detail-thin'>{lastName}</span>
                    )}
              </div>
            </div>

            {/* DATE OF BIRTH */}
            <div className='form-group text-start mb-2'>
              <label className='personal-detail'>Date of birth:</label>
              <div>
                {editModePersonal
                  ? (
                    <input type='date' className='form-control personal-detail-thin' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                    )
                  : (
                    <span className='form-control personal-detail-thin'>{dateOfBirth}</span>
                    )}
              </div>
            </div>

            {/* Date Joined */}
            <div className='form-group text-start mb-2'>
              <label className='personal-detail'>Date Joined:</label>
              <div>
                <span className='form-control personal-detail-thin'>
                  {new Date(dateJoined).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <hr className='my-4' />

          {/* contact row */}
          <div className='row mb-3'>

            {/* error message */}
            {successMessageContactInfo && !errorMessageContactInfo && (
              <div className='alert alert-success' style={{ width: '100%' }}>
                {successMessageContactInfo}
              </div>
            )}
            {errorMessageContactInfo && !successMessageContactInfo && (
              <div className='alert alert-danger' style={{ width: '100%' }}>
                {errorMessageContactInfo}
              </div>
            )}

            <div className='row'>
              <div className='col'>
                <h6 className='mb-2 text-start personal-contact'>Contact</h6>
              </div>
              <div className='col text-end'>
                {!editModeContact
                  ? (
                    <a href='#' className='ml-1 edit-link' onClick={() => setEditModeContact(true)}>Edit</a>
                    )
                  : (
                    <>
                      <a href='#' className='ml-1 cancel-link' onClick={handleCancelContact}>Cancel</a>
                      <a href='#' className='ml-1 save-link' onClick={handleSaveContact}>Save</a>
                    </>
                    )}
              </div>
            </div>

            {/* EMAIL */}
            <div className='form-group text-start mb-2'>
              <label className='personal-detail'>Email:</label>
              <div>
                {editModeContact
                  ? (
                    <input type='email' className='form-control personal-detail-thin' value={email} onChange={(e) => setEmail(e.target.value)} />
                    )
                  : (
                    <span className='form-control personal-detail-thin'>{email}</span>
                    )}
              </div>
            </div>

            {/* PHONENUMBER */}
            <div className='form-group text-start mb-2'>
              <label className='personal-detail'>Phone number:</label>
              <div>
                {editModeContact
                  ? (
                    <input type='tel' className='form-control personal-detail-thin' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    )
                  : (
                    <span className='form-control personal-detail-thin'>{phoneNumber}</span>
                    )}
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}
export default AccountGeneralTab
