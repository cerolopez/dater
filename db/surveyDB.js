import { MongoClient } from "mongodb";

function surveyDB() {
    const surveyDB = {};
    const url = process.env.URI || "mongodb://localhost:27017";
    const DB_NAME = "daterdb";
    const SURVEY_COLLECTION = "formResponses";

    surveyDB.submitSurvey = async (survey, dateID, currentUserEmail) => {
        let client;
        try {
          client = new MongoClient(url);
    
          const db = client.db(DB_NAME);
          const surveyCollection = db.collection(SURVEY_COLLECTION);

          const findExisting = await surveyCollection.find({
            date: dateID
          }).toArray();
          console.log(findExisting.length);

          if (findExisting.length < 1) {
            const newSurvey = {
              date: { dateID },
              respondants: { 0: { 0: currentUserEmail, 1: survey } }
            }
            console.log('Attempting to create a new survey');
            const newSurveyCursor = await surveyCollection.insertOne(newSurvey);
            console.log('Added new form response', newSurveyCursor);
          } else {
            await surveyCollection.updateOne(
              {"date" : dateID},
              {
                $push: { respondants: { 0: { 0: currentUserEmail, 1: survey } } } 
              }) }
              console.log('edited existing response');
        } finally {
          console.log("Closing the connection");
          client.close();
        }
        
      };

      return surveyDB;
    }

export default surveyDB();