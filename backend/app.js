const express = require('express');

const app = express();

app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.use('/api/clubs', (req, res, next) => {
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
        message : 'clubs sent succefully', 
        clubs: clubs 
    });
});

module.exports = app;