import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import SearchResults from './components/SearchResults'
import Favorites from './components/Favorites'
import Schedule from './components/Schedule'
import './index.css'
import Browse_Meals from './components/Browse_Meals'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // Setting "globally" the searchMeals useState so that multiple components can change/use its information
  const [searchMealsList, setSearchMealsList] = useState([])
  const [browseMealsList, setBrowseMealsList] = useState([])
  // states to hold user and authentication status
  const [ user, setUser ] = useState({})
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  useEffect(() => {
    console.log("1 APP")
    // check localStorage cache to see if user has been saved
    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser) {
        // update user and authentication status
        setUser(JSON.parse(localStorageUser))
        setIsAuthenticated(true)
    }
  }, [])

  console.log("app domain user:", user, isAuthenticated)

  return (
    <Router>
      {/* Will change searchMealsList depending on the search. Not a web-page so will be outside of <Routes> */}
      <NavBar setSearchMealsList={setSearchMealsList} />
      <Routes>
        <Route path='/' element={<Home setBrowseMealsList={setBrowseMealsList}/>} />
        <Route path='/Browse_Meals' element={<Browse_Meals browseMealsList={browseMealsList}/>} />
        {/* Sets the route pathnames to X, to used later when trying to route Y to X */}
        <Route path='/login' element={<Login 
                                        user={user} 
                                        setUser={setUser} 
                                        isAuthenticated={isAuthenticated} 
                                        setIsAuthenticated={setIsAuthenticated} 
                                      />} 
        />
        <Route path='/search-results' element={<SearchResults searchMealsList={searchMealsList} />} /> {/* Will configure search result page based on the searchMealsList */}
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </Router>
  )
}

export default App