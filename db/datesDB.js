import { MongoClient } from "mongodb";

function datesDB() {
    const datesDB = {};
    const url = process.env.URI || "mongodb://localhost:27017";
    const DB_NAME = "daterdb";
    const DATE_COLLECTION = "dates";

    // query will be current user's email
    datesDB.getDates = async function (query = {}) {
        let client;

        try {
            client = new MongoClient(url);
            const datesCollection = client.db(DB_NAME).collection(DATE_COLLECTION);
            
            const myCursor = await datesCollection.find({
                $or: [
                    { 'users.0': query },
                    { 'users.1': query }
                ]
            }
            ).toArray();

            return myCursor;
        } finally {
            console.log("getDates: closing DB connection");
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
                    _id: query
                }
            ).toArray();

            return myCursor;
        } finally {
            console.log("getDates: closing DB connection");
            client.close;
        }

    };

    datesDB.createDate = async (currentUserEmail, otherUserEmail, date) => {
        let client;
        try {
          client = new MongoClient(url);
    
          const db = client.db(DB_NAME);
          const datesCollection = db.collection(DATE_COLLECTION);
          const newDate = {
            users: [currentUserEmail, otherUserEmail],
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