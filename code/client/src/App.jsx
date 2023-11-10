import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import DisplayResults from './components/DisplayResults'
import Favorites from './components/Favorites'
import Schedule from './components/Schedule'
import './index.css'
import Recipe from './components/Recipe'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  
  // Setting "globally" the searchMeals useState so that multiple components can change/use its information
  const [searchMealsList, setSearchMealsList] = useState([])
  const [browseMealsList, setBrowseMealsList] = useState([])
  const [recipe, setRecipe] = useState({})
  // states to hold user and authentication status
  const [user, setUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    // check localStorage cache to see if user has been saved (How is it checking if localStorageUser = true?)
    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser) {
      // update user and authentication status
      setUser(JSON.parse(localStorageUser))
      setIsAuthenticated(true)
    }

    // check localStorage cache to see if `searchMealsList` has been saved
    const localStorageSearchMeals = localStorage.getItem('searchMealsList')
    if (localStorageSearchMeals) {
      // update `searchMealsList` state array
      setSearchMealsList(JSON.parse(localStorageSearchMeals))
    }

    // check localStorage cache to see if `browseMealsList` has been saved
    const localStorageBrowseMeals = localStorage.getItem('browseMealsList')
    if (localStorageBrowseMeals) {
      // update `browseMealsList` state array
      setBrowseMealsList(JSON.parse(localStorageBrowseMeals))
    }

    // check localStorage cache to see if `recipe` has been saved
    const localStorageRecipe = localStorage.getItem('recipe')
    if (localStorageRecipe) {
      // update `browseMealsList` state array
      setRecipe(JSON.parse(localStorageRecipe))
    }
  }, [])

  return (
    <Router>
      {/* Will change searchMealsList depending on the search. Not a web-page so will be outside of <Routes> */}
      <NavBar setSearchMealsList={setSearchMealsList} user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home setBrowseMealsList={setBrowseMealsList}  />} />
        <Route path='/browse/display-results' element={<DisplayResults mealsList={browseMealsList} setRecipe={setRecipe} />} />
        {/* Sets the route pathnames to X, to be used later when trying to route Y to the X's element. So X is used as a pathname to route to X's element */}
        <Route path='/login' element={<Login
          user={user}
          setUser={setUser}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />}
        />
        <Route path='/search/display-results' element={<DisplayResults mealsList={searchMealsList} setRecipe={setRecipe}/>} /> {/* Will configure search result page based on the searchMealsList */}
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/recipe' element={<Recipe recipe={recipe}/>} />
      </Routes>
    </Router>
  )
}

export default App