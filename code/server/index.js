const express = require("express");
const app = express();
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

mongoose.connect("mongodb+srv://matthewhilliard:birjit@cluster0.yoaoe5y.mongodb.net/MealPlanner?retryWrites=true&w=majority&appName=AtlasApp")

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
})

app.listen(3000, () => {
    console.log("SERVER RUNS")
})