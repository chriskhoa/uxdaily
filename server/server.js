import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { userRouter } from "../routes/userRoutes.js";
import { errorHandler } from "../middleware/errorHandler.js";

dotenv.config();

const port = 6790;
const app = express();

app.use(cors());

app.use(express.json());
app.use(errorHandler);

app.use("/users", userRouter);

app.listen(port);
