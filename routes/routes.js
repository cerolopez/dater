import express from 'express';
let router = express.Router();

import myDB from "../db/MyMongoDB.js";

//Is this needed??
//export const PORT = process.env.PORT || 3000;

import bodyParser from "body-parser";


// begin example code

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/sign-up', urlencodedParser, (req, res) => {

  console.log("I've made it to the router")
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const result = myDB.createUser(name, email, password);

  if (!result) {
    console.log("Didn't work... sorry!");
  } else {
    console.log("Everything went well! Create user was successful");
    res.sendStatus(201);
  }

  // db.collection('users').insertOne({
  //   name: name,
  //   email: email,
  //   password: password
  //  }, (err, result) => {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   console.log('insert was successful - user added from app.js');
  //   console.log(res);
  //   res.sendStatus(201);
  // });
});

router.post('/authenticate(.html)?', async (req, res) => {
  const user = req.body;

  // TODO check that we got the correct info

  if (await myDB.authenticate(user)) {
    req.session.user = {user: user};
    res.json({isLoggedIn: true, err: null});
    console.log(req.session);
  } else {
    req.session.user = null;
    res.json({ isLoggedIn: false, err: "Wrong email or password." });
  }
});

// router.get('/dashboard(.html)?', async (req, res) => {
//   if (req.session.user) {

//   }
// });

router.get('/users', (req, res) => {
  res.send("Users will be here!");
});

router.get('/getUser', (req, res) => {
  res.json({ user: req.session.user });
});

// end example code

router.post('/sign-up', (req, res) => {

  console.log("I've made it to the router")
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  myDB.collection('users').insertOne({
    name: name,
    email: email,
    password: password
   }, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log('insert was successful - user added');
    res.sendStatus(201);
  });
});

export default router;