const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {type: String, required:true},
    organizer: {type: String, required:true},
    date:{type: String, required: true },
    time:{type: String, required: true},
    location: {type: String},
    description: {type: String},
    topic: {type: String},
    approved: {type: Boolean, default: true},
    imagePath : {type: String,required: true}
});

module.exports = mongoose.model('Event', eventSchema);