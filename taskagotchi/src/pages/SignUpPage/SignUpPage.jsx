import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/images/tama.png';
import { isValidEmail, isStrongPassword, isVaidPhonenumber } from '../../utils/validationUtils';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Name, email, and password are required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage('Password must be between 8 and 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Confirm password and password do not match');
      return;
    }

    if (!isVaidPhonenumber(phoneNumber) && phoneNumber !== '') {
      setErrorMessage('Phone number is invalid');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      setErrorMessage('Email already exists. Please use a different email.');
      return;
    }

    const userId = generateUniqueId(users);
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

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setErrorMessage('');
    setSuccessMessage('Registration successful! Now try to log in hehe');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const generateUniqueId = (users) => {
    let maxId = 0;
    if (users.length > 0) {
      maxId = Math.max(...users.map(user => user.id));
    }
    return maxId + 1;
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='flex justify-center items-center m-12'>
      <div className='flex flex-row bg-[#FAF4E6] shadow-custom rounded-xl p-6 w-full max-w-5xl border-2 border-[#45473F]'>


        <div className='flex-1 space-y-6 p-8'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-semibold text-[#31332C]'>Welcome to TaskaGotchi!</h1>
            <p>*beep beep beep*</p>
          </div>
          {errorMessage && <div className='text-red-600'>{errorMessage}</div>}
          {successMessage && <div className='text-green-600'>{successMessage}</div>}
          <div>
            <input
              type='email'
              className='form-input bg-gray-100 w-full text-lg p-3 rounded-lg border-2 border-[#45473F] shadow-custom'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='flex space-x-4'>
            <input
              type='text'
              className='form-input bg-gray-100 w-full text-lg p-3 rounded-lg border-2 border-[#45473F] shadow-custom'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type='text'
              className='form-input bg-gray-100 w-full text-lg p-3 rounded-lg border-2 border-[#45473F] shadow-custom'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type='password'
              className='form-input bg-gray-100 w-full text-lg p-3 rounded-lg border-2 border-[#45473F] shadow-custom'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type='password'
              className='form-input bg-gray-100 w-full text-lg p-3 rounded-lg border-2 border-[#45473F] shadow-custom'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            className='bg-[#FAF4E6] hover:bg-orange-600 w-full text-[#45473F] font-bold py-3 px-6 rounded-lg shadow-custom transition duration-300 border-2 border-[#45473F]'
            onClick={handleRegister}
          >
            Sign Up
          </button>
          <p>
            Want to go back to login? Click <span onClick={handleLoginClick} className='text-orange-600 cursor-pointer underline'>here</span>.
          </p>
        </div>

        <div className='flex-1 w-full'>
          <img
            src={img}
            alt='sunset'
            className='inset-0 w-full h-full object-cover rounded-xl p-6'
          />
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;

