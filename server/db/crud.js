const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config');

const client = new MongoClient(dbConfig.url, {useUnifiedTopology:true});

const insertEntry = async(jsonData)  => {
  await client.connect(); 
  const db = client.db(dbConfig.dbName);
  console.log("Connected correctly to server");
  try {
    db.collection(dbConfig.collectionName).insertOne(jsonData._doc, (err, res) => {
      return res;
    })
  } catch (err){
    throw new Error(err);
  } finally {
    await client.close();
  }
}

const findEntry = async(query={}, options={})  => {
  await client.connect(); 
  const db = client.db(dbConfig.dbName);
  console.log("Connected correctly to server");
  try {
    return new Promise(async function(resolve, reject) {
      await db.collection(dbConfig.collectionName).find().toArray(async (err, docs) => {
        if (err) {
          console.log("No documents found!");
          console.error(err);
        }
        // result = await cursor;
        // return result;
        await client.close();
        return resolve(docs);
      });
    });
  } catch (err){
    await client.close();
    throw new Error(err);
  } 
}

module.exports = { 
  insertEntry,
  findEntry
}