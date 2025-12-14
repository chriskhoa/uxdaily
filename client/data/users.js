import {
  handleGet,
  handlePost,
  handlePatch,
  handleDelete,
  USERS_ENDPOINT,
} from "./api";

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

const updateUser = async (id, updatedFields, token) => {
  const updatedUser = await handlePatch(
    `${USERS_ENDPOINT}/${id}`,
    updatedFields,
    null,
    token
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

const deleteUser = async (id, token) => {
  await handleDelete(`${USERS_ENDPOINT}/${id}`, null, token);
};

const addMistake = async (id, exerciseId, lessonId, token) => {
  const updatedUser = await handlePost(
    `${USERS_ENDPOINT}/${id}/mistakes`,
    {
      exerciseId,
      lessonId,
    },
    null,
    token
  );
  return updatedUser;
};

export {
  getUserById,
  createUser,
  updateUser,
  validateLogin,
  deleteUser,
  addMistake,
};
