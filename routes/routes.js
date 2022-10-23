import express from 'express';
import myDB from '../db/MyMongoDB.js';

export const PORT = process.env.PORT || 3000;

const router = express.Router();

// begin example code

router.post('/login', async (req, res) => {
  const user = req.body;

  // TODO check that we got the correct info

  if (await myDB.authenticate(user)) {
    req.session.user = user.user;

    res.redirect("/?msg=authenticated");
  } else {
    res.redirect("/?msg=error authenticating");
  }
});

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