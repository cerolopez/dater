import { MongoClient } from "mongodb";

// Module
function MyMongoDB() {
  const myDB = {};
  const url = process.env.URI || "mongodb://localhost:27017";
  const DB_NAME = "daterdb";
  const USER_COLLECTION = "users";
  
  // Getting the name of the user when logging in --  will add name to session in routes.js
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

  // Authenticating users when logging in
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
  
  // Currently not used... will delete
  // async function _isUniqueEmail(client, email) {
  //   //let client;
  //   try {
  //     //client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  //     //await client.connect();
  //     const db = client.db(DB_NAME);
  //     const usersCol = db.collection(USER_COLLECTION);
  //     const cursor = usersCol.find({email: email}).toArray();
  //     const res = cursor[0];
  //     // If res is undefined, return true. Else return false
  //     return (res ? false : true); 
      
  //   } finally {
  //     console.log("Closing the connection");
  //     client.close();
  //   }
  // };

  // Creating a user in the database -- will return 
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
      
      const res = await usersCol.insertOne(user);
      console.log("Inserted", res);
      return true;


    } finally {
      console.log("Closing the connection");
      client.close();
    }
  }

  // checking to see if the user entered a unique email
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

  myDB.deleteAccount = async (email) => {
    let client;
    try {
      client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log("connection successful");
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const result = await usersCol.deleteOne({email: email});
      return (result.acknowledged ? true : false);
      

    } finally {
      console.log("Closing the connection");
      client.close();
    }
  }


  return myDB;
}

export default MyMongoDB();

// end example code