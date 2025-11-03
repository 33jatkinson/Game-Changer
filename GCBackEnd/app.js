import { createUser } from "./data/users.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import { configureRoutes } from "./routes/index.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
configureRoutes(app);
app.listen(5000, () => {
  console.log("GCBackEnd webserver is running on http://localhost:5000");
});
