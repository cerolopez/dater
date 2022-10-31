// begin example code

import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const url = process.env.URI || "mongodb://localhost:27017";
  const DB_NAME = "daterdb";
  const USER_COLLECTION = "users";
  
  // Need to utilize the following collections 
  const DATE_COLLECTION = "dates";
  // ... any other collections? form questions, date_responses, 
  
  // NEW CODE -- TESTING
  myDB.getName = async (user) => {
    let client;

    try {
      client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const cursor = await usersCol.find({ email: user.email }).toArray();
      const res = cursor[0];
      return res.name;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  }

  myDB.authenticate = async (user) => {
    let client; 
    
    try {
      client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      console.log(`Searching for user w/ email ${user.email}...`);
      const cursor = await usersCol.find({ email: user.email }).toArray();
      if (cursor.length < 1) {
        return false;
      }
      const res = cursor[0];
      if (res.password === user.password) return true;
      return false;

    } finally {
      console.log("Closing the connection");
      client.close();
    }

  };
  
  async function _isUniqueEmail(client, email) {
    //let client;
    try {
      //client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      //await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const cursor = usersCol.find({email: email}).toArray();
      const res = cursor[0];
      // If res is undefined, return true. Else return false
      return (res ? false : true); 
      
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.createUser = async (userName, email, password) => {
    let client;
    try {
      client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const user = {
        name: userName,
        email: email,
        password: password
      }
      const cursor = await usersCol.find({ email: user.email }).toArray();
      if (cursor.length >= 1) {
        return false;
      }

      
      console.log("Attempting to create a new user");
      
      const res = await usersCol.insertOne(user);
      console.log("Inserted", res);
      return true;


    } finally {
      console.log("Closing the connection");
      client.close();
    }
  }

  myDB.uniqueEmail = async (email) => {
    let client;
    try {
      client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const cursor = usersCol.find({email: email}).toArray();
      const res = cursor[0];
      // If res is undefined, return true. Else return false
      return (res ? false : true); 
      
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.updateAccount = async (oldEmail, newName, newEmail, newPassword) => {
    let client;
    // FINISH
    try {
      client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log("connection successful");
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const cursor = await usersCol.find({email: newEmail}).toArray();
      if (cursor.length <= 1) {
         await usersCol.updateOne( {email: oldEmail}, {
          $set: {
            name: newName,
            email: newEmail,
            password: newPassword
          }
        });
        return true;
      } else return false;

    } finally {
      console.log("Closing the connection");
      client.close();
    }
  }


  return myDB;
}

export default MyMongoDB();

// end example code