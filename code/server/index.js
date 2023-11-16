const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const port = 3000

const app = express()

app.use(express.json())

// Cors is needed to connect APIs to the frontend
app.use(cors())

// Connects to the MongoDB 
mongoose.connect("mongodb+srv://matthewhilliard:birjit@cluster0.yoaoe5y.mongodb.net/MealPlanner?retryWrites=true&w=majority&appName=AtlasApp")

// use express Router to specific endpoints
const userRoute = require("./routes/user.js")
const spoonacularRoute = require("./routes/spoonacular.js")
const calendarRoute = require("./routes/calendar.js")

// NOTE: access all users e.g. http://localhost:3000/users/getUsers
app.use("/users", userRoute)
app.use("/search", spoonacularRoute)
app.use("/calendar", calendarRoute)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})