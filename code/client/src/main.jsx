import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './NavBar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar/>
    <div class="grid grid-cols-2 gap-y-6 relative top-[200px]"> 
      <div class="">
        <h1 class="text-7xl font-semibold px-10">Find. Plan. Eat.</h1>
      </div>
      <div class="row-span-3">
        <div class="box-border h-80 w-90 rounded-3xl bg-[#B28370] boxShadow max-w-[600px] ml-auto mr-[20px]">
        </div>
        <div>
            <img></img>
        </div>
      </div>
      <div class="px-10">
        <h2>Discover delectable dishes and seamlessly integrate them into your schedule with Google Calender integration. Elevate your dining experience effortlessly with Meal Planner.</h2>
      </div>
      <div class="px-10">
        <button class="bg-gray-700 hover:bg-gray-900 text-white py-2 px-5 rounded">
          Browse Meals
        </button>
      </div>
    </div>
  </React.StrictMode>,
)
