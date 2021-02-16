import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.js";

const app = express();
const config = dotenv.config();
if (config.error) {
  throw config.error;
}
const env = config.parsed;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes); //every route inside of post routes will start with post

const CONNECTION_URL = env.DB_CONNECTION;
const PORT = env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Server Running on port:" + PORT))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
