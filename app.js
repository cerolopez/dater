const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://fulltimers4real:gejg9wDDBJNgvMw@3rdwheel.ohwtksk.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "daterdb";

app.listen(3000, () => {
    console.log('Server listening on 3000');
 });

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Connection failed for some reason");
  }
  console.log("Connection established - All well");
  const db = client.db(databaseName);
});


// begin example code

/*

import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

import router from "./routes/routes.js";

export const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({ secret: "John Loves Web", cookie: { maxAge: 60000 } }));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(router);

app.use(express.static("frontend"));

app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`);
});
*/