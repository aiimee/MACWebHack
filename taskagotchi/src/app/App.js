import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignUpPage/SignUpPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
// import HomePage from '../pages/HomePage/HomePage'
import Footer from '../components/Footer/Footer'
import TaskPage from '../pages/TaskPage/TaskPage'


function App() {
  return (
    <div className="App content">
      {/* <ProductsRepo />
      <CartProvider> */}
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tasks" element={<TaskPage />} />
            {/* <Route path="/" element={<HomePage />} /> */}
          </Routes>
          <Footer />
        </Router>
      {/* </CartProvider> */}
    </div>
  )
}

export default App
