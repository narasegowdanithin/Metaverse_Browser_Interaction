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
      const jsonFilePath = path.resolve(__dirname, '../public/jsonData/JsonDataGeneralEasy.json'); // inserting Easy questions
      //const jsonFilePath = path.resolve(__dirname, '../public/jsonData/JsonDataGeneralMid.json'); // inserting Mid questions
      const jsonData = fs.readFileSync(jsonFilePath);
      const data = JSON.parse(jsonData);
      const insert = await coll.insertMany(data);
      console.log('Documents inserted with IDs:', insert.insertedIds);
      //await cursor.forEach(doc => console.dir(doc));
    } finally {
      await client.close();
    }
  }
run().catch(console.dir);
