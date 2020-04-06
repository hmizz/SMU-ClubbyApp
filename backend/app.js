const express = require('express');
const bodayParser = require("body-parser");

const app = express();

app.use(bodayParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.post("/api/clubs", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'club added successfully'
    });
});

app.get('/api/clubs', (req, res, next) => {
    const clubs = [
        {
            id: 'nububybu23JJ2',
            title: 'first',
            description: 'this is coming from node'
        },
        {
            id: 'kzk652bu9gfd2',
            title: 'first',
            description: 'this is comming from node'
        }
    ];
    res.status(200).json({
        message: 'clubs sent succefully',
        clubs: clubs
    });
    next();
});

app.get('/api/events', (req, res, next) => {
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

module.exports = app;