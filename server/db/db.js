import { MongoClient, ObjectId } from "mongodb";

let mongoClient = null;
let theDb = null;

// coll names
const USERS = "users";
// const POSTS = "posts";

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

// const getAllInCollectionByUserId = async (collectionName, userId) => {
//   if (!mongoClient) {
//     await init();
//   }
//   const doc = await theDb.collection(collectionName).find({ authorId: userId });
//   return doc.toArray();
// };

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

export const db = {
  init,
  getAllInCollection,
  getFromCollectionById,
  addToCollection,
  deleteFromCollectionById,
  updateToCollectionById,
  //   getAllInCollectionByUserId,
  getFromCollectionByFieldValue,
  USERS,
  //   POSTS,
};
