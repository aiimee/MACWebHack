import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignUpPage/SignUpPage'
import HomePage from '../pages/HomePage/HomePage'
import Footer from '../components/Footer/Footer'
import TaskPage from '../pages/TaskPage/TaskPage'
import NavigationBar from '../components/NavigationBar/NavigationBar'

function App () {
  return (
    <div className='App content'>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/tasks' element={<TaskPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
