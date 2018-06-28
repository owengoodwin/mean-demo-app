const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://owen:aNoL42ei0AdlmHHQ@cluster0-zk2k8.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(() => {
    console.log("Failed to connect to database.");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
