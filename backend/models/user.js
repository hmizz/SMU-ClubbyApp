const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    fullName: {type:String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accessLevel: {type: String, default: "Standard"},
    clubEnrolled: {type: []},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);