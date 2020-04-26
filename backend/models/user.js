const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    fullName: {type:String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accessLevel: {type: Number, min: 0, max: 3, default: 0},
    clubEnrolled: {type: []},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);