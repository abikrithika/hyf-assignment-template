import bcrypt from "bcrypt";
import knex from "./db.js";

async function seed() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await knex("users").insert({
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("User created");

  process.exit();
}

seed();
