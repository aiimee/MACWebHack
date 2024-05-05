import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignUpPage/SignUpPage'
import HomePage from '../pages/HomePage/HomePage'
import Footer from '../components/Footer/Footer'
import TaskPage from '../pages/TaskPage/TaskPage'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import { ExperienceProvider } from '../components/ExperienceContext/ExperienceProvider'
import { TaskUpdateProvider } from '../components/TaskUpdateContext/TaskUpdateContext'
function App() {
  return (
    <ExperienceProvider>
      <TaskUpdateProvider>
        <div className='App flex flex-col min-h-screen'>
          <Router>
            <NavigationBar />
            <div className="flex-grow">
              <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/tasks' element={<TaskPage />} />
                <Route path='/' element={<HomePage />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>

      </TaskUpdateProvider>
    </ExperienceProvider>
  )
}


export default App
