const express = require("express");

const Event = require("../models/event");

const router = express.Router();

router.post("", (req, res, next) => {
    const event = new Event({
        title: req.body.title,
        organizer: req.body.organizer,
        date: req.body.date,
        description: req.body.description
    });
    event.save();
    res.status(201).json({
        message: 'club added successfully'
    });
});

router.get("", (req, res, next) => {
    const events = [
        {
            id: 'nubvcu2092',
            title: 'EventI',
            Organizer: null,
            date: '5/21/2020',
            description: 'this Event is from node'
        },
        {
            id: 'kzk652bu9gfd2',
            title: 'first',
            Organizer: null,
            date: '5/21/2020',
            description: 'this is comming from node'
        }
    ];
    res.status(200).json({
        message: 'events sent succefully',
        events: events
    });
});

module.exports = router;