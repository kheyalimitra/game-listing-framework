const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config');

const client = new MongoClient(dbConfig.url, {useUnifiedTopology:true});

const insertEntry = async(jsonData)  => {
  await client.connect(); 
  const db = client.db(dbConfig.dbName);
  try {
    db.collection(dbConfig.collectionName).insertOne(jsonData, async(err, res) => {
      await client.close();
      console.log("Inserted document successfully.");
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
  try {
    return new Promise(async (resolve, reject) => {
      db.collection(dbConfig.collectionName).find(query, {projection:{_id:0}}).toArray(async (err, docs) => {
        if (err) {
          console.log("No documents found!");
          console.error(err);
          throw new Error(err);
        }
        console.log("Fetched records successfully.");
        await client.close();
        return resolve(docs);
      });
    });
  } catch (err) {
    await client.close();
    throw new Error(err);
  } 
}

const deleteEntry = async(query={}, isRemoveAll=false)  => {
  await client.connect(); 
  const db = client.db(dbConfig.dbName);
  try {
    return new Promise(async (resolve, reject) => {
    db.collection(dbConfig.collectionName).deleteMany(query, async(err, obj) => {
      if (err) throw err;
      console.log("documents deleted");
      await client.close();
      return resolve(obj);
    });
    // run 1 time to remove all entry
    if (isRemoveAll) {
      db.collection(dbConfig.collectionName).drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        client.close();
        return resolve(delOK);
      });
    }
  });
  } catch (err) {
    await client.close();
    throw new Error(err);
  } 
}
module.exports = { 
  insertEntry,
  findEntry,
  deleteEntry
}