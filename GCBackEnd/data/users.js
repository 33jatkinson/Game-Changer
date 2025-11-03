import { users } from "../config/mongoCollections.js";

export async function createUser(username, password) {
  const usersCollection = await users();

  const newUser = { username, password };

  const insertInfo = await usersCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw new Error("Could not add user!");
  return true;
}
