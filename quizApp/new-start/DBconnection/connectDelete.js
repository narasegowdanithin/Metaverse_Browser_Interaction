//October@2023
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const path = require('path'); 
//const uri = "mongodb+srv://dev:October2023@metaverse.rgiuqsa.mongodb.net/?retryWrites=true&w=majority"; // inserting api
const uri = "mongodb+srv://dev:October2023@metaverse.rgiuqsa.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      await client.connect();
      const database = client.db("quiz");
      const coll = database.collection("quiz_data");

      // Define your delete condition here
      const deleteCondition = {
        // Add your condition here, for example:
        // fieldName: valueToMatch
      };
      const deleteResult = await coll.deleteMany(deleteCondition);
    
      if (deleteResult.deletedCount > 0) {
            console.log(`${deleteResult.deletedCount} documents deleted`);
      } else {
            console.log('No documents matching the condition were found.');
      }
      
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
