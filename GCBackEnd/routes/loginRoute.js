import { Router } from "express";
import { users } from "../config/mongoCollections.js";

export const loginRouter = Router();

loginRouter.route("/").post(async (req, res) => {
  try {
    console.log("Received login request:", req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const usersCollection = await users();
    const user = await usersCollection.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: error.message });
  }
});
