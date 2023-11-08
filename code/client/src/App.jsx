import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import SearchResults from './components/SearchResults'
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  {/* Setting "globally" the searchMeals useState so that multiple components can change/use its information */ }
  const [searchMealsList, setSearchMealsList] = useState([])

  return (
    <Router>
      {/* Will change searchMealsList depending on the search. Not a web-page so will be outside of <Routes> */}
      <NavBar setSearchMealsList={setSearchMealsList} />
      <Routes>
        {/* Sets the route pathnames to X, to used later when trying to route Y to X */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search-results' element={<SearchResults searchMealsList={searchMealsList} />} /> {/* Will configure search result page based on the searchMealsList */}
      </Routes>
    </Router>
  )
}

export default App