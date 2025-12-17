import { createUser } from "./data/users.js";

async function seed() {
  await createUser("John", "password");
}
seed();
