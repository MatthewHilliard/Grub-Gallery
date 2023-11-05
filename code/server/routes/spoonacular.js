// Note: this file exists to process spoonacular api call from frontend
const express = require("express")
const router = express.Router()
const cors = require('cors')
const port = 3000


router.use(express.json())
router.use(cors())

router.get("/meals", (req, res) => {
  try {
    const meals = ["pasta", "pasta", "pasta"]

    res.status(200).json(meals)
  } catch (error) {
    console.log(error)
  }
})



module.exports = router