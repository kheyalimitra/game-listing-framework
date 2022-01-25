const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config');

const client = new MongoClient(dbConfig.url, {useUnifiedTopology:true});
async function run() {
  await client.connect(); 
  const db = client.db(dbConfig.dbName);
  const collection = db.collection(dbConfig.collectionName);
  console.log("Connected correctly to server");
  try {
    await db.createCollection(dbConfig.collectionName);
    console.log(`created ${dbConfig.collectionName} collection`); 
  } catch (err){
    console.error(`Encountered an error: ${err}`);
  }
}
run().catch(console.dir);