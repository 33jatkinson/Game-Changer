import { users } from "../config/mongoCollections.js";

export async function createUser() {
    const usersCollection = await users();

    const newUser = {
        username: "Jared",
        password: "password"
    }

    const insertInfo = await usersCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw new Error("Could not add user!");
    console.log("User created successfully")
}