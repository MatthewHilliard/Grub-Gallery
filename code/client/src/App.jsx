import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import SearchResults from './components/SearchResults'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [searchMealsList, setSearchMealsList] = useState([])

  // states to hold user and authentication status
  const [ user, setUser ] = useState({})
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  return (
    <Router>
      <NavBar setSearchMealsList={setSearchMealsList} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login 
                                        user={user} 
                                        setUser={setUser} 
                                        isAuthenticated={isAuthenticated} 
                                        setIsAuthenticated={setIsAuthenticated} 
                                      />} 
        />
        <Route path='/search-results' element={<SearchResults searchMealsList={searchMealsList}/>} />
      </Routes>
    </Router>
  )
}
//testing push again

export default App