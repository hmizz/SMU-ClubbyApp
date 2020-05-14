const mongoose = require("mongoose");

const clubSchema = mongoose.Schema({
    title: {type:String, required:true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    clubPresident: {type: {name:String, id:String}},
    members: {type:[] },
    approved: {type: Boolean, default : false},
    imagePath : {type: String,required: true}
});

module.exports = mongoose.model("Club", clubSchema);