import express from 'express';
let router = express.Router();

import myDB from "../db/MyMongoDB.js";
import datesDB from "../db/datesDB.js";

//Is this needed??
//export const PORT = process.env.PORT || 3000;

//import bodyParser from "body-parser";


// begin example code

// const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/sign-up', async (req, res) => {
  const user = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  //const isUnique = await myDB.uniqueEmail(email);

  let result = await myDB.createUser(name, email, password);
  
  console.log(result);

  if (result) {
    req.session.user = {user: user};
    res.json({isCreated: true, isLoggedIn: true, err: null});
    console.log(req.session);
  } else {
    req.session.user = null;
    res.json({ isCreated: false, isLoggedIn: false, err: "An account is already registered with given email. Try again." });
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
    // NEW ADDITION
    req.session.user = user;
    req.session.user.isLoggedIn = true;
    //
    console.log(req.session);
    res.json({isLoggedIn: true, err: null});
  } else {
    req.session.user = null;
    res.json({ isLoggedIn: false, err: "Wrong email or password." });
  }
});

// router.get('/dashboard(.html)?', async (req, res) => {
//   if (req.session.user) {

//   }
// });


router.get('/getUser', (req, res) => {
  res.json({ user: req.session.user });
});

router.post('/new-date', async (req, res) => {
  console.log("About to log a new date");
  const email = req.body.email;
  const date = req.body.date;

  const newDate = await datesDB.createDate(email, date);
  res.json(newDate);
})

/*
router.post('/sign-up', (req, res) => {

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
*/
export default router;