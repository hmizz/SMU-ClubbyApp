const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const clubsRoutes = require("./routes/clubs");
const eventsRoutes = require("./routes/events");
const userRoutes = require("./routes/users")

const app = express();

mongoose.connect("mongodb+srv://projectAdmin:strissbiss@issproject-wleiz.mongodb.net/ClubbyApp?retryWrites=true&w=majority")
.then(() => {
    console.log('Conneted to database');
}).catch(() => {
    console.log('Failed to Connet to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/clubs",clubsRoutes);
app.use("/api/events",eventsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;