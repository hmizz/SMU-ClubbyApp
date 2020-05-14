const mongoose = require("mongoose");
const User = require("./user");

const userDetails = mongoose.Schema({

    firstName: {type: String},
    lastName: {type: String},
    gender: {type: String},
    doBirth: {type: String},
    level: {type: String},
    institute: {type: String},
    created_on:{type: Date},
    modified_on: {type: Date},
    description : {type: String},    
    user: { type : mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model('UserDetails', userDetails); 