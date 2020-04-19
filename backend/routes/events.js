const express = require("express");

const Event = require("../models/event");

const router = express.Router();

router.post("", (req, res, next) => {
    const event = new Event({
        title: req.body.title,
        organizer: req.body.organizer,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        topic: req.body.topic
    });
    event.save();
    res.status(201).json({
        message: 'event added successfully'
    });
});

router.get("", (req, res, next) => {
    Event.find().then(documents => {
        res.status(200).json({
            message: 'events sent succefully',
            events: documents
        });
    });
});

module.exports = router;