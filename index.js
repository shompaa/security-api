import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/config.js";
import {
  addressesRouter,
  authRouter,
  carsRouter,
  ownersRouter,
  usersRouter,
} from "./routes/index.routes.js";
import { errorHandler } from "./utils/index.js";

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cars", carsRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/addresses", addressesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
