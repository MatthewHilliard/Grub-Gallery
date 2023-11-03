import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './components/NavBar'
import Home from './components/Home'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <Home />

  </React.StrictMode>,
)
