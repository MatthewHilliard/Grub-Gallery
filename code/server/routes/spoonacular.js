// Note: this file exists to process spoonacular api call from frontend
const express = require("express")
const router = express.Router()
const axios = require('axios');
const cors = require('cors')


router.use(express.json())
router.use(cors())

// obtain Spoonacular API key for environmental variables
const spoonacular_key = process.env.SPOONACULAR_KEY

// Endpoint for Calling the spoonacular api call for meals based on searchString from req.body
router.post("/meals", async (req, res) => {
  try {
    const numberOfRecipes = 100
    // initialization for spoonacular api call
    const param = req.body.searchString
    let config = {
      method: 'get',
      url: `https://api.spoonacular.com/recipes/complexSearch?query=${param}&number=${numberOfRecipes}&apiKey=${spoonacular_key}`,
      headers: { }
    }

    // call spoonacular api
    try {
      const response = await axios.request(config)

      // Turns the data from JSON (defualt) to string
      meals = JSON.stringify(response.data)
      console.log("meals from search results: " + meals)

      // Sends back the "OK" status and meals in JSON and ends request
      res.status(200).json(meals)
    }
    // If caught error, then sends back the "Error" status and the error msg in JSON
    catch (error) {
      console.log("Error calling Spoonacular API:", error)

      res.status(500).json({ message: 'Error calling Spoonacular API' })
    }
  } catch (error) {
    console.log("Error in post to Spoonacular:", error)
    res.status(500).json({ message: 'Error in post to Spoonacular' })
  }
})

// Endpoint for Calling spoonacular api call for random meals
router.post("/browse", async (req, res) => {
  try {
    const numberOfRecipes = 100
    // initialization for spoonacular api call
    // const param = req.body.searchString // unused input from frontend?
    let config = {
      method: 'get',
      url: `https://api.spoonacular.com/recipes/random?number=${numberOfRecipes}&apiKey=${spoonacular_key}`,
      headers: { }
    }

    // call spoonacular api
    try {
      const response = await axios.request(config)
      meals = JSON.stringify(response.data)
      console.log(meals)
      res.status(200).json(meals)
    }
    catch (error) {
      console.log("Error calling Spoonacular API:", error)
      res.status(500).json({ message: 'Error calling Spoonacular API' })
    }


  } catch (error) {
    console.log("Error in post to Spoonacular:", error)
    res.status(500).json({ message: 'Error in post to Spoonacular' })
  }
})

router.post("/recipe", async (req, res) => {
  try {
    const { id } = req.body
    if(!id) {
      return res.status(400).json({ message: 'Recipe ID not found' })
    }
    // initialization for spoonacular api call
    let config = {
      method: 'get',
      url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacular_key}`,
      headers: { }
    }

    // call spoonacular api
    try {
      const response = await axios.request(config)
      meals = JSON.stringify(response.data)
      console.log(meals)
      res.status(200).json(meals)
    }
    catch (error) {
      console.log("Error calling Spoonacular API:", error)
      res.status(500).json({ message: 'Error calling Spoonacular API' })
    }


  } catch (error) {
    console.log("Error in post to Spoonacular:", error)
    res.status(500).json({ message: 'Error in post to Spoonacular' })
  }
})
module.exports = router;