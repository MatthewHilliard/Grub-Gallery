import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import DisplayResults from './components/DisplayResults'
import Favorites from './components/Favorites'
import Schedule from './components/Schedule'
import './index.css'
import Recipe from './components/Recipe'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { auth, handleSignOut } from "./Firebase"

function App() {

  // assign state variables (keep track of meals lists, favorites lists, recipe, and user info)
  const [searchMealsList, setSearchMealsList] = useState([])
  const [browseMealsList, setBrowseMealsList] = useState([])
  const [recipe, setRecipe] = useState({})
  const [favoritesList, setFavoritesList] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // use Firebase auth to detect if user is logged in
  const user = auth.currentUser
  // console.log(user, isAuthenticated)

  useEffect(() => {
    // firebase function (check if authentication changes...)
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setIsAuthenticated(user !== null) // update isAuthenticated based on if user signed in
    })
    return unsubscribe
  }, [])

  useEffect(() => {
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

    // check localStorage cache to see if `favorite` has been saved
    const localStorageFavorites = localStorage.getItem('favoritesList')
    if (localStorageFavorites) {
      // update `browseMealsList` state array
      setFavoritesList(JSON.parse(localStorageFavorites))
    }
  }, [])

  return (
    <Router>
      {/* Will change searchMealsList depending on the search. Not a web-page so will be outside of <Routes> */}
      <NavBar setSearchMealsList={setSearchMealsList} user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home setBrowseMealsList={setBrowseMealsList} />} />
        {/* Sets the route pathnames to X, to be used later when trying to route Y to the X's element. So X is used as a pathname to route to X's element */}
        <Route path='/login' element={<Login isAuthenticated={isAuthenticated} />} />
        <Route path='/browse/display-results' element={<DisplayResults user={user} mealsList={browseMealsList} setRecipe={setRecipe} isAuthenticated={isAuthenticated} favoritesList={favoritesList} setFavoritesList={setFavoritesList}/>} />
        <Route path='/search/display-results' element={<DisplayResults user={user} mealsList={searchMealsList} setRecipe={setRecipe} isAuthenticated={isAuthenticated} favoritesList={favoritesList} setFavoritesList={setFavoritesList}/>} />
        <Route path='/favorites' element={<Favorites user={user} favoritesList={favoritesList} setFavoritesList={setFavoritesList} isAuthenticated={isAuthenticated} setRecipe={setRecipe} />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/recipe' element={<Recipe recipe={recipe} isAuthenticated={isAuthenticated} user={user} favoritesList={favoritesList} setFavoritesList={setFavoritesList} />} />
      </Routes>
    </Router>
  )
}

export default App