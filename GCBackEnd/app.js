// server.js
import express from "express";
import { dbConnection } from "./config/mongoConnection.js";
import { createUser } from "./data/users.js";

const app = express();
app.use(express.json());

// Connect to the database once the server starts
const db = await dbConnection();

app.post("/users", async (req, res) => {
  try {

    const user = await createUser();

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
