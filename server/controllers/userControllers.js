import { userService } from "../services/userService.js";

const getUsers = async (req, res) => {
  const allUsers = await userService.getAll();
  res.json(allUsers);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const theUser = await userService.getById(id);
  res.json(theUser);
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userId = await userService.add(name, email, password);
    const user = await userService.getById(userId);
    delete user.hashedPassword;
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.validateLogin(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await userService.deleteIt(id);
  res.json({ deletedCount });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const result = await userService.updateById(id, req.body);
  res.json(result);
};

export const userControllers = {
  getUsers,
  getUserById,
  createUser,
  login,
  deleteUser,
  updateUser,
};
