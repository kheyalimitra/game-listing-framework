const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config');

const client = new MongoClient(dbConfig.url, {useUnifiedTopology:true});

const insertEntry = async(jsonData)  => {
  await client.connect(); 
  const db = client.db(dbConfig.dbName);
  console.log("Connected correctly to server");
  try {
    db.collection(dbConfig.collectionName).insertOne(jsonData, async(err, res) => {
      await client.close();
      return res;
    })
  } catch (err){
    await client.close();
    throw new Error(err);
  }
}

const findEntry = async(query={}, options={})  => {
  await client.connect(); 
  const db = client.db(dbConfig.dbName);
  console.log("Connected correctly to server");
  try {
    return new Promise(async (resolve, reject) => {
      db.collection(dbConfig.collectionName).find(query).toArray(async (err, docs) => {
        if (err) {
          console.log("No documents found!");
          console.error(err);
          throw new Error(err);
        }
        await client.close();
        return resolve(docs);
      });
    });
  } catch (err) {
    await client.close();
    throw new Error(err);
  } 
}

module.exports = { 
  insertEntry,
  findEntry
}