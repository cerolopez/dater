// Code by Cecilia

import { MongoClient, ObjectId } from 'mongodb';

function datesDB () {
  const datesDB = {};

  const url = process.env.URI || 'mongodb://localhost:27017';
  const DB_NAME = 'daterdb';
  const DATE_COLLECTION = 'dates';
  const USER_COLLECTION = 'users';

  // query will be current user's email
  datesDB.getDates = async function (query = {}) {
    let client;

    try {
      client = new MongoClient(url);
      const datesCollection = client.db(DB_NAME).collection(DATE_COLLECTION);
      const myCursor = await datesCollection.find({
        $or: [
          { 'users.0.email': query },
          { 'users.1.email': query }
        ]
      }
      ).toArray();

      return myCursor;
    } finally {
      console.log('getDates: closing DB connection');
      client.close;
    }
  }

  //query will be ObjectId of selected date
  datesDB.getDate = async function (query = {}) {
    let client;

    try {
      client = new MongoClient(url);
      const datesCollection = client.db(DB_NAME).collection(DATE_COLLECTION);
      const myCursor = await datesCollection.find(
        {
          _id: ObjectId(`${query}`)
        }
      ).toArray();

      console.log('in the datesdb: ', myCursor.at(0));

      return myCursor;
    } finally {
      console.log('getDates: closing DB connection');
      client.close;
    }
  };

  datesDB.createDate = async (currentUser, currentUserEmail, otherUser, otherUserEmail, date) => {
    if (currentUserEmail === otherUserEmail) {
      return false;
    }
    let client;

    try {
      client = new MongoClient(url);
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCollection = db.collection(USER_COLLECTION);
      const cursor = await usersCollection.find({email: otherUserEmail}).toArray();
      console.log(cursor.length);
      if (cursor.length < 1) {
        return false;
      }
      const resEmail = await cursor[0].email;
      if (resEmail !== otherUserEmail) {
        return false;
      }

      const datesCollection = db.collection(DATE_COLLECTION);
      const newDate = {
        users: [currentUser, otherUser],
        date: date
      }
      console.log('Attempting to create a new date');
      const res = await datesCollection.insertOne(newDate);
      console.log('Inserted', res);
      return true;
    } finally {
      console.log('Closing the connection');
      client.close();
    }
  }

  datesDB.submitSurvey = async (responses, currentUserEmail, dateID) => {
    let client;

    try {
      client = new MongoClient(url);
      await client.connect();
      const db = client.db(DB_NAME);
      const dateCollection = db.collection(DATE_COLLECTION);

      const findCorrectIndex = await dateCollection.find({
        _id: ObjectId(`${dateID}`)
      }).toArray();

      if (findCorrectIndex.at(0).users.at(0).email === currentUserEmail) {
        const updateSurvey = await dateCollection.updateOne(
          {
            _id: ObjectId(`${dateID}`)
          }, {
            $set: { 'users.0.formResponses': responses }
          });
        console.log('Updated', updateSurvey);
      } else {
        const updateSurvey = await dateCollection.updateOne(
          {
            _id: ObjectId(`${dateID}`)
          }, {
            $set: { 'users.1.formResponses': responses }
          });
        console.log('Updated', updateSurvey);
      }

      const res = await dateCollection.find({
        _id: ObjectId(`${dateID}`)
      }).toArray();

      return res;
    } finally {
      console.log('Closing the connection');
      client.close();
    }
  }

  return datesDB;
};

export default datesDB();