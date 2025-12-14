import express from "express";
import { userControllers } from "../controllers/userControllers.js";
import { validateJWT } from "../middleware/validateJWT.js";

const userRouter = express.Router();

userRouter.get("/:id", userControllers.getUserById);
userRouter.post("/", userControllers.createUser);
userRouter.post("/login", userControllers.login);
userRouter.post("/:id/mistakes", validateJWT, userControllers.addMistake);
userRouter.delete("/:id", validateJWT, userControllers.deleteUser);
userRouter.patch("/:id", validateJWT, userControllers.updateUser);

export { userRouter };
