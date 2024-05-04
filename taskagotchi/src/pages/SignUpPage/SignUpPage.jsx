import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/images/activities.jpeg'
import 'bootstrap/dist/css/bootstrap.min.css'
import { isValidEmail, isStrongPassword, isVaidPhonenumber } from '../../utils/validationUtils'
import './SignUpPage.css'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Name, email, and password are required fields.')
      return
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (!isStrongPassword(password)) {
      setErrorMessage('Password must be betwen 8 and 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Confirm password and passwork are not match')
      return
    }

    if (!isVaidPhonenumber(phoneNumber) && phoneNumber !== '') {
      setErrorMessage('Phone number is invalid')
      return
    }

    // Get user array form localstorage
    const users = JSON.parse(localStorage.getItem('users')) || []

    // Check if the email already exists in the users array
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      setErrorMessage('Email already exists. Please use a different email.')
      return
    }

    // Create new user
    const userId = generateUniqueId(users)
    const newUser = {
      id: userId,
      firstName,
      lastName,
      email,
      password,
      tasks: [],
      rewardPoints: 0,
      dateJoined: new Date().toISOString()
    };

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    setErrorMessage('')
    setSuccessMessage('Registration successful! Now try to log in hehe')

    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  // ID goes brm brm
  const generateUniqueId = (users) => {
    // Find the maximum ID from the existing users
    let maxId = 0
    if (users.length > 0) {
      maxId = Math.max(...users.map(user => user.id))
    } else {
      maxId = 0
    }
    // Increment the maximum ID by 1 to generate a new unique ID
    const newId = maxId + 1
    return newId
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    // main container
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
      {/* signup container */}
      <div className='row border rounded-5 p-3 bg-white shadow box-area'>

        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        {successMessage && <div className='alert alert-success'>{successMessage}</div>}

        {/* signup form (right) */}
        <div class='col-md-6 right-box'>
          <div class='row align-items-center'>
            <div class='header-text mb-4 text-start'>
              <h1>Welcome to Soil!</h1>
              <p>Fresh, organic goodness awaits. Let's embark on a journey to wellness together.</p>
            </div>
            <form>
              <div className='mb-3'>
                {/* <label htmlFor="email" className="form-label">Email</label> */}
                <input
                  type='email'
                  className='form-control form-control-lg bg-light fs-6'
                  placeholder='Email address'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='row mb-3'>
                <div className='col'>
                  <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='First Name'
                    id='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className='col'>
                  <input
                    type='text'
                    className='form-control form-control-lg bg-light fs-6'
                    placeholder='Last Name'
                    id='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className='mb-3'>
                <input
                  type='password'
                  className='form-control form-control-lg bg-light fs-6'
                  placeholder='Password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <input
                  type='password'
                  className='form-control form-control-lg bg-light fs-6'
                  placeholder='Confirm Password'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <input
                  type='tel'
                  className='form-control form-control-lg bg-light fs-6'
                  placeholder='Phone Number'
                  id='phoneNumber'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div class='input-group mb-3 mt-4'>
                <button
                  type='button'
                  class='btn btn-lg btn-primary w-100 fs-6'
                  style={{
                    background: '#ca5b16',
                    borderColor: '#ca5b16',
                    transition: 'background-color 0.3s, box-shadow 0.3s',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                  onClick={handleRegister}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#b65618'
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#ca5b16'
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className='row text-start'>
            <small>
              Want to go back to login? Click <span onClick={handleLoginClick} style={{ textDecoration: 'underline', color: '#ca5b16', cursor: 'pointer' }}>here</span>
            </small>
          </div>
        </div>
        {/* img */}
        <img
          src={img}
          alt='sunset'
          className='col-md-6 rounded-5 left-box mb-2 mt-2 object-fit-cover img-fluid'
        />

      </div>
    </div>
  )
}

export default SignUpPage