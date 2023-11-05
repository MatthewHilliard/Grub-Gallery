// Note: this file exists to process spoonacular api call from frontend
const express = require("express")
const router = express.Router()
const axios = require('axios');
const cors = require('cors')


router.use(express.json())
router.use(cors())

router.post("/meals", async (req, res) => {
  try {
    // initialization for spoonacular api call
    const param = req.body.searchString
    let config = {
      method: 'get',
      url: `https://api.spoonacular.com/recipes/complexSearch?query=${param}&apiKey=ea7e76522981472aaa961dde6913a48e`,
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



module.exports = router