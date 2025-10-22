// server.js
import express from "express";
import { dbConnection } from "./config/mongoConnection.js";
import { createUser } from "./data/users.js";

const app = express();
app.use(express.json());

// Connect to the database once when the server starts
const db = await dbConnection();

// Example route to create a user
app.post("/users", async (req, res) => {
  try {
    // If your createUser function uses request data:
    // const user = await createUser(req.body);

    // If it doesn’t take arguments yet:
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
