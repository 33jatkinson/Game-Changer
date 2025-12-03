// historyRoute.js
import { Router } from "express";
import { users } from "../config/mongoCollections.js";

export const historyRouter = Router();

historyRouter.post("/", async (req, res) => {
  try {
    const { username, game, character } = req.body;

    if (!username || !game || !character) {
      return res
        .status(400)
        .json({ error: "username, game, and character are required" });
    }

    const usersCollection = await users();

    const updateResult = await usersCollection.updateOne(
      { username },
      {
        $push: {
          history: {
            game,
            character,
            createdAt: new Date(),
          },
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving history:", error);
    return res.status(500).json({ error: error.message });
  }
});

historyRouter.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const usersCollection = await users();
    const user = await usersCollection.findOne(
      { username },
      { projection: { history: 1, _id: 0 } }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ history: user.history || [] });
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({ error: error.message });
  }
});
