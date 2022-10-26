// begin example code

import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const url = process.env.URI || "mongodb://localhost:27017";
  const DB_NAME = "daterdb";
  const USER_COLLECTION = "users";
  
  // Need to utilize the following collections 
  const DATE_COLLECTION = "dates";
  // ... any other collections?

  myDB.authenticate = async (user) => {
    let client; 
    
    try {
      client = new MongoClient(url);
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      console.log(`Searching for, ${user}...`);
      const res = await usersCol.findOne({ email: user.email });
      console.log("res", res, res.password === user.password);
      if (res.password === user.password) return true;
      return false;

    } finally {
      console.log("Closing the connection");
      client.close();
    }

  };
  
  // Will only be used within the module 
  async function isUniqueEmail(email) {
    let client;
    try {
      client = new MongoClient(url);
      await client.connect();
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = usersCol.find({email: email});
      // If res is undefined, return true. Else return false
      return (res ? false : true); 
      
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.createUser = async (username, email, password) => {
    let client;
    try {
      client = new MongoClient(url);
      if (!isUniqueEmail(email)) {
        return false;
      }

      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const user = {
        name: username,
        email: email,
        password: password
      }
      console.log("Attempting to create a new user");
      
      const res = await usersCol.insertOne(user);
      console.log("Inserted", res);
      return true;


    } finally {
      console.log("Closing the connection");
      client.close();
    }
    
  };

  return myDB;
}

export default MyMongoDB();

// end example code