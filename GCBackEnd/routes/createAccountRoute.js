import { Router } from "express";
import { createUser } from "../data/users.js";

export const createAccountRouter = Router();
createAccountRouter.route("/").post(async (req, res) => {
  try {
    console.log("Received create account request:", req.body);
    let data = req.body;
    let result = await createUser(data.username, data.password);
    console.log("User created successfully:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({ error: error.message });
  }
});
