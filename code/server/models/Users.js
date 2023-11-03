const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    dietary_restrict: {
        type: [String],
        required: true,
    },
    favorites : {
        recipe_id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        calories: {
            type: Number,
            required: true
        }
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;