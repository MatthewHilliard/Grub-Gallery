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
        required: false,
    },
    favorites : {
        recipe_id: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        calories: {
            type: Number,
            required: false
        }
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;