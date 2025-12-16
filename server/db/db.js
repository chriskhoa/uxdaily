import { MongoClient, ObjectId } from "mongodb";

let mongoClient = null;
let theDb = null;

const USERS = "users";

const init = async () => {
  const mongoURI = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DBNAME;
  mongoClient = new MongoClient(mongoURI);
  await mongoClient.connect();
  theDb = mongoClient.db(dbName);
};

const getAllInCollection = async (collectionName) => {
  if (!mongoClient) {
    await init();
  }
  const allDocs = await theDb.collection(collectionName).find();
  return allDocs.toArray();
};

const getFromCollectionById = async (collectionName, id) => {
  if (!mongoClient) {
    await init();
  }
  const doc = await theDb
    .collection(collectionName)
    .findOne({ _id: new ObjectId(String(id)) });
  return doc;
};

const addToCollection = async (collectionName, docData) => {
  if (!mongoClient) {
    await init();
  }
  const result = await theDb.collection(collectionName).insertOne(docData);
  return result;
};

const updateToCollectionById = async (collectionName, id, docData) => {
  if (!mongoClient) {
    await init();
  }
  const query = { _id: new ObjectId(String(id)) };
  const update = { $set: { ...docData } };
  const result = await theDb
    .collection(collectionName)
    .updateOne(query, update);
  return result;
};

const deleteFromCollectionById = async (collectionName, id) => {
  if (!mongoClient) {
    await init();
  }
  const result = await theDb
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(String(id)) });
  return result;
};

const getFromCollectionByFieldValue = async (
  collectionName,
  fieldName,
  fieldValue
) => {
  if (!mongoClient) {
    await init();
  }
  const doc = await theDb
    .collection(collectionName)
    .findOne({ [fieldName]: fieldValue });
  return doc;
};

// AI suggested API route to handle add mistakes
const pushToArrayInCollection = async (
  collectionName,
  id,
  arrayFieldName,
  itemToPush
) => {
  if (!mongoClient) {
    await init();
  }
  const query = { _id: new ObjectId(String(id)) };
  const update = { $push: { [arrayFieldName]: itemToPush } };
  const result = await theDb
    .collection(collectionName)
    .updateOne(query, update);
  return result;
};
////

export const db = {
  init,
  getAllInCollection,
  getFromCollectionById,
  addToCollection,
  deleteFromCollectionById,
  updateToCollectionById,
  pushToArrayInCollection,
  getFromCollectionByFieldValue,
  USERS,
};
