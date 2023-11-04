import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <Router>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/login' element={<Login />} />
        </Routes>
    </Router>
  )
}

export default App