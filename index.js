import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./src/database/config.js";
import { errorHandler } from "./src/utils/index.js";
import { usersRouter } from "./src/modules/user/index.js";
import { authRouter } from "./src/modules/auth/index.js";
import { carsRouter } from "./src/modules/car/index.js";
import { ownersRouter } from "./src/modules/owner/index.js";
import { addressesRouter } from "./src/modules/address/index.js";
import { imageRouter } from "./src/modules/image-detect/index.js";

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cars", carsRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/addresses", addressesRouter);
app.use("/api/images", imageRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
