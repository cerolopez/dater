import { MongoClient } from "mongodb";

function surveyDB() {
    const surveyDB = {};
    const url = process.env.URI || "mongodb://localhost:27017";
    const DB_NAME = "daterdb";
    const SURVEY_COLLECTION = "formResponses";

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

    surveyDB.addToSurvey = async (survey, dateID, currentUserEmail) => {
      
      const res = await surveyCollection.insertOne(newSurvey);
    }

    surveyDB.createSurvey = async (survey, dateID, currentUserEmail) => {
        let client;
        try {
          client = new MongoClient(url);
    
          const db = client.db(DB_NAME);
          const surveyCollection = db.collection(SURVEY_COLLECTION);

          const newSurvey = {
            date: { dateID },
            respondants: { 0: [{ 0: currentUserEmail }, { 1: survey }] }
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