const express = require('express');
const router = express.Router();
const UserModel = require('../models/Users');

// endpoint to obtain all users
router.get("/getUsers", async (req, res) => {
    try{
        const users = await UserModel.find()
        res.status(200).json(users)
      } catch (error){
        res.status(500).json({ message: error.message })
      }
})

// endpoint to create new user, will only store if user does not already exist
router.post("/createUsers", async (req, res) =>{
    const user = req.body
    const existUsername = await UserModel.findOne({email: user.email})
    if(existUsername){
      console.log("username exists")
    }
    else{
      const newUser = new UserModel(user)
      await newUser.save()
      console.log("new user")
    }
    res.json(user)
})

// endpoint to retrieve all of user's dietary restrictions
router.get("/getRestrictions", async (req, res) => {
  try{
      const user = req.body
      const restrictions = await UserModel.find({"email": user.email}, {"dietary_restrict" : 1, "_id": 0}) 
      res.status(200).json(restrictions)
    } catch (error){
      res.status(500).json({ message: error.message })
    }
})

// endpoint to add dietary restriction to user
router.put("/addRestriction", async (req, res) =>{
  const user = req.body
  const result = await UserModel.findOneAndUpdate(
    { email: user.email },
    { $push: {dietary_restrict : "gluten free"}},
  )
  res.send(result)
})

// endpoint to remove dietary restriction from user
router.delete("/removeRestriction", async(req, res) =>{
  const user = req.body
  try{
    const result = await UserModel.updateOne(    
      {"email": user.email},
      {
        "$pull": {
          "dietary_restrict": "gluten free"
        }
      })
      res.send(result)
  } catch (error){
    res.status(500).json({ message: error.message })
  }
})

// endpoint to retrieve all of user's favorite recipes
router.get("/getFavorites", async (req, res) => {
  try{
      const user = req.body
      const favorites = await UserModel.find({"email": user.email}, {"favorites" : 1, "_id": 0}) 
      res.status(200).json(favorites)
    } catch (error){
      res.status(500).json({ message: error.message })
    }
})

// endpoint to add recipe to user's favorites
router.put("/addFavorite", async (req, res) =>{
  const user = req.body
  const result = await UserModel.findOneAndUpdate(
    { email: user.email },
    { $push: {favorites : {recipe_id: "123", title: "Salmon Borgir", calories: "10000"}}},
  )
  res.send(result)
})

// endpoint to remove recipe from user's favorites
router.delete("/removeFavorite", async(req, res) =>{
  const user = req.body
  try{
    const result = await UserModel.updateOne(    
      {"email": user.email},
      {
        "$pull": {
          "favorites": {
            "recipe_id": "123"
          }
        }
      })
      res.send(result)
  } catch (error){
    res.status(500).json({ message: error.message })
  }
})

module.exports = router