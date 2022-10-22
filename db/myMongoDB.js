// begin example code

import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const url = process.env.MOGO_URL || "mongodb://localhost:27017";
  const DB_NAME = "fakeUsers";
  const COLLECTION_NAME = "users";

  myDB.authenticate = async (user) => {
    const client = new MongoClient(url);

    const db = client.db(DB_NAME);
    const usersCol = db.collection(COLLECTION_NAME);
    console.log("searching for", user);
    const res = await usersCol.findOne({ user: user.user });
    console.log("res", res, res.password === user.password);
    if (res.password === user.password) return true;
    return false;
  };

  return myDB;
}

export default MyMongoDB();

// end example code