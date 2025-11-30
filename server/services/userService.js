import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

import { db } from "../db/db.js";
import { User } from "../models/user.js";

// const getAll = async () => {
//   const userDocs = await db.getAllInCollection(db.USERS);
//   return userDocs.map((uDoc) => User.fromUserDocument(uDoc));
// };

const getById = async (id) => {
  if (!id) throw new Error("Null or undefined ID not allowed.");
  const userDoc = await db.getFromCollectionById(db.USERS, id);
  return User.fromUserDocument(userDoc);
};

const SALT_ROUNDS = 11;

const add = async (name, email, password) => {
  // 1. check if username already exists, error if yes
  const existingUser = await db.getFromCollectionByFieldValue(
    db.USERS,
    "email",
    email
  );
  if (existingUser) {
    throw new Error(
      "Account with this email already exists. Please try a different email."
    );
  }

  // 2. hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 3. create user instance with defaults
  const user = new User({
    name,
    email,
    hashedPassword,
  });

  // 4. save user record with all default fields
  const { id, ...userDataToSave } = user;
  const result = await db.addToCollection(db.USERS, userDataToSave);
  if (!result.acknowledged || !result.insertedId) {
    throw new Error("error adding user to DB");
  }
  return result.insertedId.toString();
};

/////////////////
// let jwtPrivateKey, jwtPublicKey;

// const loadKeys = () => {
//   jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
//   jwtPublicKey = process.env.JWT_PUBLIC_KEY;
// };

// const generateToken = (userId) => {
//   loadKeys();
//   let data = {
//     time: Date(),
//     userId,
//   };
//   return jwt.sign(data, jwtPrivateKey, { algorithm: "RS256", expiresIn: "1h" });
// };
/////////////////

const validateLogin = async (email, password) => {
  const userDoc = await db.getFromCollectionByFieldValue(
    db.USERS,
    "email",
    email
  );
  if (!userDoc) {
    throw new Error("account not found.");
  }

  const user = User.fromUserDocument(userDoc);
  const result = await bcrypt.compare(password, user.hashedPassword);
  if (result) {
    // const jwt = generateToken(user.id);
    // user.jwt = jwt;
    // console.log(jwt);
    delete user.hashedPassword;
    return user;
  } else {
    throw new Error("invalid password");
  }
};

const updateById = async (id, userInfo) => {
  if (!id) throw new Error("Null or undefined ID not allowed.");
  // GenAI //
  if (userInfo.password) {
    const hashedPassword = await bcrypt.hash(userInfo.password, SALT_ROUNDS);
    userInfo.hashedPassword = hashedPassword;
    delete userInfo.password;
  }
  ///////////
  await db.updateToCollectionById(db.USERS, id, userInfo);
};

const deleteIt = async (id) => {
  if (!id) throw new Error("Null or undefined ID not allowed.");
  const { deletedCount } = await db.deleteFromCollectionById(db.USERS, id);
  return { deletedCount };
};

export const userService = {
  //   getAll,
  getById,
  add,
  deleteIt,
  updateById,
  validateLogin,
};
