const mongoose = require("mongoose");

const clubSchema = mongoose.Schema({
    title: {type:String, required:true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    events: {type:[] },
    approved: {type: Boolean, default : false}
});

module.exports = mongoose.model("Club", clubSchema);