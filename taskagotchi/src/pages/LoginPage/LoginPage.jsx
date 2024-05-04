/* global localStorage */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/images/browse.png'

import './LoginPage.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(user => user.email === email && user.password === password)

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      setErrorMessage('')
      setSuccessMessage('Login successful!')

      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else {
      setSuccessMessage('')
      setErrorMessage('Invalid email or password')
    }
  }

  const handleSignupClick = () => {
    navigate('/signup')
  }

  return (
  // main container
    <div class='container d-flex justify-content-center align-items-center min-vh-100'>
      {/* login container */}
      <div class='row border rounded-5 p-3 bg-white shadow box-area'>
        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        {successMessage && <div className='alert alert-success'>{successMessage}</div>}
        {/* img */}
        <img
          src={img}
          alt='sunset'
          className='col-md-6 rounded-5 left-box mb-2 mt-2 object-fit-cover img-fluid'
        />
        {/* right box */}
        <div class='col-md-6 right-box  '>
          <div class='row align-items-center'>
            <div className='header-text mb-4 text-start'>
              <h2>Hey there!</h2>
              <p>Missed us? We sure missed you.</p>
            </div>
            <form>
              <div class='input-group mb-3'>
                <input
                  type='text'
                  class='form-control form-control-lg bg-light fs-6'
                  placeholder='Email address'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='password-box'>
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
                  onClick={handleLogin}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#b65618'
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#ca5b16'
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                >Login

                </button>
              </div>
            </form>
            <div className='row text-start'>
              <small>
                Don't have an account? Sign up <span onClick={handleSignupClick} style={{ textDecoration: 'underline', color: '#ca5b16', cursor: 'pointer' }}>here</span>.
              </small>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
