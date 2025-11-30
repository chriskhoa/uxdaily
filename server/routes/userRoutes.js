import express from "express";
import { userControllers } from "../controllers/userControllers.js";
// import { validateJWT } from "../middleware/validateJWT.js";

const userRouter = express.Router();

// userRouter.get("/", userControllers.getUsers);
userRouter.get("/:id", userControllers.getUserById);
userRouter.post("/", userControllers.createUser);
userRouter.post("/login", userControllers.login);
userRouter.delete("/:id", userControllers.deleteUser);
userRouter.patch("/:id", userControllers.updateUser);

export { userRouter };
