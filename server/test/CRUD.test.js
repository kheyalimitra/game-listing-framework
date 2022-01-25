const {MongoClient} = require('mongodb');

describe('Select and Insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const collection = db.collection('games');

    const mockData = {_id: 'some-id', category: 'Live Event', title: 'new game', author: 'test'};
    await collection.insertOne(mockData);

    const insertedRecord = await collection.findOne({_id: 'some-id'});
    expect(insertedRecord).toEqual(mockData);
  });
  it('should fetch all docs from collection', async () => {
    const collection = db.collection('games');
    return new Promise((resolve, reject) => {
    collection.find().toArray((err, docs) => {
      if (err) {
        console.log("No documents found!");
        console.error(err);
        throw new Error(err);
      }
      resolve(docs);
      expect(docs.length).toEqual(1);
    });

    });
  });
  it('should fetch doc based on query from collection', async () => {
    const collection = db.collection('games');
    // insert another record to make it 2
    const mockData = {_id: 'some-new-id', category: 'Live Event1', title: 'new game', author: 'test'};
    await collection.insertOne(mockData);
    return new Promise((resolve, reject) => {
    collection.find({_id: 'some-id'}).toArray((err, docs) => {
      if (err) {
        console.log("No documents found!");
        console.error(err);
        throw new Error(err);
      }
      resolve(docs);
      // only 1 record matches
      expect(docs.length).toEqual(1);
    });

    });
  });
  it('should delete doc based on query from collection', async () => {
    const collection = db.collection('games');
    return new Promise((resolve, reject) => {
    collection.deleteMany({_id: 'some-id'}, (err, docs) => {
      if (err) {
        console.log("No documents found!");
        console.error(err);
        throw new Error(err);
      }
      resolve(docs);
      // only 1 record matches
      expect(docs.deletedCount).toEqual(1);
    });

    });
  });
});
