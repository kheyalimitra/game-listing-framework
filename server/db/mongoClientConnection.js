const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config');


const client = new MongoClient(dbConfig.url, {useUnifiedTopology:true});

async function run() {
  await client.connect(); 
  const db = client.db(dbConfig.dbName);
  const collection = db.collection(dbConfig.collectionName);
  console.log("Connected correctly to server");
  try {
    // await db.createCollection(dbConfig.collectionName);
    // await collection.drop({}); 
    console.log(`created ${dbConfig.collectionName} collection`); 
    db.collection(dbConfig.collectionName).insertOne({id: 2, name: "2"}, (err, res) => {
      console.log("1 record inserted");

    })

    // db.collection(dbConfig.collectionName).find({}, function(err, result) {
    //   if (err) throw err;
    //   console.log(result.name);
    // });
  } catch (err){
    console.error(`Encountered an error: ${err}`);
  }
}
run().catch(console.dir);
// const url = "mongodb://localhost:27017/";
// async function main() {
//   try {
//     await client.connect(dbConfig.url);
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//   } catch (e) {
//       console.error(e);
//   }
//   finally {
//     await client.close();
//   }
// }
// module.exports = main;

