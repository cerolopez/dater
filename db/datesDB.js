import { MongoClient } from "mongodb";

function datesDB() {
    const datesDB = {};
    const url = process.env.URI || "mongodb://localhost:27017";
    const DB_NAME = "daterdb";
    const DATE_COLLECTION = "dates";
    const USER_COLLECTION = "users";
    const PAGE_SIZE = 6;


    datesDB.getDatesByUser = async function (query = {}) {
        let client;
        console.log("first query is: ", query);

        try {
            client = new MongoClient(url);
            const userCollection = client.db(DB_NAME).collection(USER_COLLECTION);
            
            const cursor = await userCollection.find(
                {
                    email: query.email
                }).toArray();
                const reggie = cursor[0];

                console.log("reggie's email: ", reggie);

                return datesDB.getDatesArray(reggie);
            //return datesDB.getDatesArray(reggie);
            // figure out how to query based on object ID
            //.skip(PAGE_SIZE * page)
            //.limit(PAGE_SIZE)
        } finally {
            console.log("getDates: closing DB connection");
            client.close;
        }
    };

    datesDB.getDatesArray = async function (query = {}) {
        let client;
        console.log("second query is: ", query);

        try {
            client = new MongoClient(url);
            const datesCollection = client.db(DB_NAME).collection(DATE_COLLECTION);
            
            const myCursor = await datesCollection.find(
                {
                    email: query.email
                }
            ).toArray();

            return myCursor;
            // figure out how to query based on object ID
            //.skip(PAGE_SIZE * page)
            //.limit(PAGE_SIZE)
        } finally {
            console.log("getDates: closing DB connection");
            client.close;
        }
    }


    datesDB.getDate = async function (query = {}) {
        let client;

        try {
            client = new MongoClient(url);
            const datesCollection = client.db(DB_NAME).collection(DATE_COLLECTION);
            
            const result = await datesCollection.find(
                {
                    email: query.email
                }).toArray();
            console.log("query is: ", query);
            console.log("result is: ", result);

            return result;
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