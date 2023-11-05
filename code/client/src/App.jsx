import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [searchMealsList, setSearchMealsList] = useState([])

  return (
    <Router>
      <NavBar setSearchMealsList={setSearchMealsList} />
      <Routes>
        <Route path='/' element={<Home searchMealsList={searchMealsList} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}
//testing push again

export default App