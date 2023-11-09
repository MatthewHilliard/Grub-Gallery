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

router.put("/addFavorite", async (req, res) =>{
  const user = req.body
  const result = await UserModel.findOneAndUpdate(
    { email: user.email },
    { $push: {favorites : {recipe_id: "12345", title: "Borgir", calories: "10000"}}},
  )
  res.send(result)
})

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