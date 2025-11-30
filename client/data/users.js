import { handleGet, handlePost, handlePatch, USERS_ENDPOINT } from "./api";

const getUserById = async (id) => {
  const user = await handleGet(`${USERS_ENDPOINT}/${id}`);
  return user;
};

const createUser = async (name, email, password) => {
  const newUser = await handlePost(USERS_ENDPOINT, {
    name,
    email,
    password,
  });
  return newUser;
};

const updateUser = async (id, updatedFields) => {
  const updatedUser = await handlePatch(
    `${USERS_ENDPOINT}/${id}`,
    updatedFields
  );
  return updatedUser;
};

const validateLogin = async (email, password) => {
  const user = await handlePost(`${USERS_ENDPOINT}/login`, {
    email,
    password,
  });
  return user;
};

export { getUserById, createUser, updateUser, validateLogin };
