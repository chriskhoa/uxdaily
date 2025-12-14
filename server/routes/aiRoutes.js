import express from "express";
import { aiControllers } from "../controllers/aiControllers.js";
// import { validateJWT } from "../middleware/validateJWT.js";

const aiRouter = express.Router();

aiRouter.post("/", aiControllers.chat);

export { aiRouter };
