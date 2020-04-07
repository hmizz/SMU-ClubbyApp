const express = require("express");

const Club = require("../models/club");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const club = new Club({
        title: req.body.title,
        description: req.body.description
    });
    club.save().then(createdClub => {
        res.status(201).json({
            message: 'club added successfully',
            clubId:  createdClub._id
        });
    });
});

router.get("", (req, res, next) => {
    Club.find().then(documents => {
        res.status(200).json({
            message: 'clubs sent succefully',
            clubs: {}
        });
    });
});

module.exports = router;