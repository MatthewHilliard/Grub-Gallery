const mongoose = require("mongoose")

// Defines the schema for User
const UserSchema = new mongoose.Schema({

    // Users are required to have a name
    name: {
        type: String,
        required: true,
    },

    // Users are required to have an email
    email: {
        type: String,
        required: true,
    },

    // Users are required to have a unique identifier (`sub` in google user object)
    user_id: {
        type: String,
        required: true,
    },

    // Users are not required to have dietary restricts
    dietary_restrict: {
        type: [String],
        required: false,
    },

    // Users are not required to have favorite dishes
    favorites: {
        recipe_id: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        }
    }
})

// Connects with the MongoDB and sets this model for the "users" collection. Should be called "UserCollection"
const UserModel = mongoose.model("users", UserSchema)

// Exports this model so that we can use it outside this file. Makes it so that we can update/change the "users" collection
module.exports = UserModel;