const express = require('express');
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
