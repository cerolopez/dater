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

const dbTest = app.post('/signup', (req, res, next) => {
  console.log('testing');
  async function run() {
      try {
          const database = client.db("insertDB");
          const users = database.collection("users");
          const doc = {
              name: "Tim",
              eyeColor: "brown"
          }
          const result = await users.insertOne(doc);
          console.log('Successful insertion');
      } finally {
          await client.close();
      }
  }
  run().catch(console.dir);
});

export default router;