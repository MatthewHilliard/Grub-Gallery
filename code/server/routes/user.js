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
    const existUsername = await UserModel.findOne({id: user.id})
    if(existUsername){
      console.log("username exists")
    }
    else{
      const newUser = new UserModel(user)
      await newUser.save()
    }
    res.json(user)
})


module.exports = router