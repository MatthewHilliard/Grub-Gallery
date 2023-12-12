const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');


// req is for sending data from the frontend to the backend (requesting data), and res is for sending data from the backend to the frontend (response data)
// async allows this function to run "UserModel.find()" independently of the other program, so no need to wait

// endpoint to obtain all users. Sends from backend to frontend all users, .get is for getting data
router.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Endpoint for creating a user. Will not create one if the user email already exists. .post is for posting new data
router.post("/createUser", async (req, res) => {
  const user = req.body
  const existUsername = await UserModel.findOne({ email: user.email })
  if (existUsername) {
    console.log("username exists")
  }
  else {
    const newUser = new UserModel(user)
    await newUser.save()
    console.log("new user")
  }
  res.json(user)
})

// endpoint to retrieve all of user's dietary restrictions
router.get("/getRestrictions", async (req, res) => {
  try {
    const user = req.body
    const restrictions = await UserModel.find({ "email": user.email }, { "dietary_restrict": 1, "_id": 0 })
    res.status(200).json(restrictions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// endpoint to add dietary restriction to user
router.put("/addRestriction", async (req, res) => {
  const user = req.body
  const result = await UserModel.findOneAndUpdate(
    { email: user.email },
    { $push: { dietary_restrict: "gluten free" } },
  )
  res.send(result) //is this needed? 
})

// endpoint to remove dietary restriction from user
router.delete("/removeRestriction", async (req, res) => {
  const user = req.body
  try {
    const result = await UserModel.updateOne(
      { "email": user.email },
      {
        "$pull": {
          "dietary_restrict": "gluten free"
        }
      })
    res.send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// endpoint to retrieve all of user's favorite recipes
router.get("/getFavorites", async (req, res) => {
  try {
    const user_id = req.query.user_id
    // console.log("user:", user)
    const user = await UserModel.findOne({ "user_id": user_id }, { "favorites": 1, "_id": 0 })
    
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const favorites =  user.favorites

    console.log("fav:", favorites)
    res.status(200).json(favorites)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// endpoint to add recipe to user's favorites
router.put("/addFavorite", async (req, res) => {
  try {
    console.log(req)
    const body = req.body
    const result = await UserModel.findOneAndUpdate(
      { user_id: body.user_id },
      {
        $push: {
          favorites: {
            recipe_id: body.recipe_id,
            title: body.title,
            image: body.image
          }
        }
      },
    )
  
    // Sends data back and ends request
    res.send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Endpoint to remove recipe from user's favorites .delete is for deleting existing data
router.delete("/removeFavorite", async (req, res) => {
  // console.log(req.query)
  try {
    const user_id = req.query.user_id
    const recipe = req.query.recipe

    const result = await UserModel.updateOne(
      { "user_id": user_id },
      {
        "$pull": {
          "favorites": {
            "recipe_id": recipe.recipe_id
          }
        }
      })
    res.send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router