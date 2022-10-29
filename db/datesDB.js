import { MongoClient } from "mongodb";

function datesDB() {
    const datesDB = {};
    const url = process.env.URI || "mongodb://localhost:27017";
    const DB_NAME = "daterdb";
    const DATE_COLLECTION = "dates";
    const PAGE_SIZE = 6;


    datesDB.getDates = async function (query = {}) {
        let client;

        try {
            client = new MongoClient(url);
            const datesCollection = client.db(DB_NAME).collection(DATE_COLLECTION);
            console.log("searching for dates...", query);
            
            // query will be user ID
            return await datesCollection.find(query).toArray();
            // figure out how to query based on object ID
            //.skip(PAGE_SIZE * page)
            //.limit(PAGE_SIZE)
        } finally {
            console.log("getDates: closing DB connection");
            client.close;
        }

    };

    /*
    datesDB.createDate = async (email, date) => {
        let client;
        try {
          client = new MongoClient(url);
    
          const db = client.db(DB_NAME);
          const datesCollection = db.collection(USER_COLLECTION);
          const newDate = {
            email: email,
            date: date
          }
          console.log("Attempting to create a new date");
          
          const res = await datesCollection.insertOne(newDate);
          console.log("Inserted", res);
          return true;
        } finally {
          console.log("Closing the connection");
          client.close();
        }
        
      };    
      */

      return datesDB;
    }

export default datesDB();