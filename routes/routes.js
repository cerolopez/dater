// Made by both Tim and Cecilia
import express from 'express';
import myMongoDB from '../db/MyMongoDB.js';
import datesDB from '../db/datesDB.js';

const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const user = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  let result = await myMongoDB.createUser(name, email, password);
  console.log(result);

  if (result) {
    req.session.user = user;
    req.session.isLoggedIn = true;
    res.json({isCreated: true, isLoggedIn: true, err: null});
    console.log(req.session);
  } else {
    req.session.user = null;
    res.json({ isCreated: false, isLoggedIn: false, err: "An account is already registered with given email. Try again." });
  }
});

router.post('/authenticate(.html)?', async (req, res) => {
  const user = req.body;
  if (await myMongoDB.authenticate(user)) {
    // NEW ADDITION
    req.session.user = user;
    req.session.user.isLoggedIn = true;
    // NEW CODE -- TESTING
    req.session.user.name = await myMongoDB.getName(user);
    //
    console.log(req.session);
    res.json({isLoggedIn: true, err: null});
  } else {
    req.session.user = null;
    res.json({ isLoggedIn: false, err: "Wrong email or password." });
  }
});

router.post("/update-account", async (req, res) => {
  const user = req.body;
  // FINISH
  const result = await myMongoDB.updateAccount(req.session.user.email, user.name, user.email, user.password);
  if (result) {
    req.session.user = user;
    res.json({isUpdated: true, err: null});
  } else {
    res.json({isUpdated: false, err: "Something went wrong."});
  }
});

router.get("/deleteAccount", async (req, res) => {
  const result = await myMongoDB.deleteAccount(req.session.user.email);
  if (result) {
    req.session.user = null;
    res.json({isDeleted: true, err: null});
  } else {
    res.json({isDeleted: false, err: "Something went wrong."});
  }
})

router.get('/getUser', (req, res) => {
  res.json({
    isLoggedIn: !!req.session.user,
    user: req.session.user
  });
  console.log("User: ", req.session.user);
});

router.post('/postSurvey', async (req, res) => {
  console.log(`I'm in the /postSurvey route`);
  const responses = req.body;
  const currentUserEmail = req.session.user.email;
  const dateID = req.session.user.currentDateID;
  console.log("date ID: ", req.session.user.currentDateID);

  const newSurvey = await datesDB.submitSurvey(responses, currentUserEmail, dateID);
  res.json(newSurvey)
});

router.get('/getDates', async (req, res) => {
  console.log("I'm in the /getDates route");
  if (!req.session.user) {
    console.log("user is logged out");
    return;
  }

  const query = req.session.user.email;
  const dates = await datesDB.getDates(query);

  // gets data from datesDB.js and sends it to clientDates.js
  return res.json(dates);
});

router.get('/getDate', async (req, res) => {
  console.log("I'm in the /getDate route. ID: ", req.query.id);
  // call getDate function from the db

  const query = req.query.id;
  req.session.user.currentDateID = req.query.id;
  const currentDate = await datesDB.getDate(query);
  return res.json(currentDate);
});

router.post('/create-date', async (req, res) => {
  const currentUserName = req.session.user.name;
  console.log('user name: ', currentUserName);
  const currentUserEmail = req.session.user.email;

  const otherUserName = req.body.name;
  const otherUserEmail = req.body.email;
  const date = req.body.date;

  const newSurveyObj = {};

  const currentUser = { name: currentUserName, email: currentUserEmail, formResponses: newSurveyObj };
  const otherUser = { name: otherUserName, email: otherUserEmail, formResponses: newSurveyObj };

  const createResult = await datesDB.createDate(currentUser, currentUserEmail, otherUser, otherUserEmail, date);
  if (createResult) {
    res.json({datePosted: true, err: null})
  } else {
    res.json({datePosted: false, err: "Please enter another registered user."})
  }
});

router.get('/sign-out', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({isSuccessful: false, errMsg: "Unable to sign out"});
    } else {
      res.json({isSuccessful: true, errMsg: null});
    }
  });
});

export default router;