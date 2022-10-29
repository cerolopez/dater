import { MongoClient } from "mongodb";

function surveyDB() {
    const surveyDB = {};
    const url = process.env.URI || "mongodb://localhost:27017";
    const DB_NAME = "daterdb";
    const USER_COLLECTION = "formResponses";

    // datesDB.getDates = async (query = {}, page = 0) => {
    //     let client;

    //     try {
    //         client = new MongoClient(url);
    //         const userDates = client.db(DB_NAME).collection(DATES_DB);
    //         console.log("searching for dates belonging to", user);
            
    //         // query will be user ID
    //         return await userDates
    //         // figure out how to query based on object ID
    //         //.find(query: "dates")
    //         .skip(PAGE_SIZE * page)
    //         .limit(PAGE_SIZE)
    //         .toArray()
    //     } finally {
    //         console.log("getDates: closing DB connection");
    //         client.close;
    //     }
    // };

    surveyDB.addToSurvey = async (currentDateID) => {

    }

    surveyDB.createSurvey = async (responses) => {
        let client;
        try {
          client = new MongoClient(url);
    
          const db = client.db(DB_NAME);
          const surveyCollection = db.collection(USER_COLLECTION);

          const newSurvey = {
            respondants: [{ 'current user ID goes here': responses }],
          }
          console.log('Attempting to create a new survey');
          
          const res = await surveyCollection.insertOne(newSurvey);
          console.log('Added', res);
          return true;    
        } finally {
          console.log("Closing the connection");
          client.close();
        }
        
      };    

      return surveyDB;
    }

export default surveyDB();