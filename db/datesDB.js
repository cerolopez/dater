import { MongoClient } from "mongodb";

function datesDB() {
    const datesDB = {};
    const url = process.env.URI || "mongodb://localhost:27017";
    const DB_NAME = "daterdb";
    const USER_COLLECTION = "dates";
    const PAGE_SIZE = 6;

    datesDB.getDates = async (query = {}, page = 0) => {
        let client;

        try {
            client = new MongoClient(url);
            const userDates = client.db(DB_NAME).collection(DATES_DB);
            console.log("searching for dates belonging to", user);
            
            // query will be user ID
            return await userDates
            // figure out how to query based on object ID
            //.find(query: "dates")
            .skip(PAGE_SIZE * page)
            .limit(PAGE_SIZE)
            .toArray()
        } finally {
            console.log("getDates: closing DB connection");
            client.close;
        }
    };

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

      return datesDB;
    }

export default datesDB();