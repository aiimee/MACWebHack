import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/images/browse.png'

// Assume TailwindCSS is properly configured in your project

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
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6 border'>
        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        {successMessage && <div className='alert alert-success'>{successMessage}</div>}
        <img
          src={img}
          alt='sunset'
          className='md:w-1/2 rounded-lg mb-4 mt-4 md:mt-0 object-cover'
        />
        <div className='md:w-1/2'>
          <div className='flex flex-col justify-center'>
            <div className='mb-4 text-left'>
              <h2 className='text-2xl font-bold'>Hey there!</h2>
              <p>Missed us? We sure missed you.</p>
            </div>
            <form>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-input form-control-lg bg-gray-100 text-base p-2 w-full'
                  placeholder='Email address'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <input
                  type='password'
                  className='form-input form-control-lg bg-gray-100 text-base p-2 w-full'
                  placeholder='Password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='mt-4 mb-3'>
                <button
                  type='button'
                  className='btn btn-lg bg-orange-600 border-orange-600 w-full text-base p-3 transition-colors duration-300 ease-in-out hover:bg-orange-700 focus:bg-orange-700'
                  onClick={handleLogin}
                >Login</button>
              </div>
            </form>
            <div className='text-left'>
              <small>
                Don't have an account? Sign up <span onClick={handleSignupClick} className='underline text-orange-600 cursor-pointer'>here</span>.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

