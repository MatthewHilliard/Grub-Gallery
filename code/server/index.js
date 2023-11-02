const express = require("express");
const app = express();

const mongoose = require('mongoose')
const UserModel = require('./models/Users')

mongoose.connect("mongodb+srv://matthewhilliard:birjit@cluster0.yoaoe5y.mongodb.net/MealPlanner?retryWrites=true&w=majority&appName=AtlasApp")

app.get("/getUsers", async (req, res) => {
    try{
        const users = await UserModel.find()
        res.status(200).json(users);
      } catch (error){
        res.status(500).json(users)
      }
})

app.listen(5173, () => {
    console.log("SERVER RUNS")
})