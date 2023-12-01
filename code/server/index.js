const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3000

// obtain .env variables using `dotenv`
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') }) // Adjust the path accordingly
const mongoUri = process.env.MONGODB_URI        // obtain URI from .env file

// initialize express application
const app = express()

app.use(express.json())

// Cors is needed to connect APIs to the frontend
app.use(cors())

// Connects to the MongoDB (URI)
mongoose.connect(mongoUri)

// use express Router to specific endpoints
const userRoute = require("./routes/user.js")
const spoonacularRoute = require("./routes/spoonacular.js")

// NOTE: access all users e.g. http://localhost:3000/users/getUsers
app.use("/users", userRoute)
app.use("/search", spoonacularRoute)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})