const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://matthewhilliard:birjit@cluster0.yoaoe5y.mongodb.net/MealPlanner?retryWrites=true&w=majority&appName=AtlasApp")

// endpoint to obtain all users
app.get("/getUsers", async (req, res) => {
    try{
        const users = await UserModel.find()
        res.status(200).json(users);
      } catch (error){
        res.status(500).json({ message: error.message })
      }
})



app.post("/createUser", async (req, res) =>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
})

app.listen(3001, () => {
    console.log("SERVER RUNS")
})