import knex from "./db.js";

async function setupUsers() {
  const exists = await knex.schema.hasTable("users");

  if (!exists) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.string("role").defaultTo("user");
      table.timestamps(true, true);
    });

    console.log("Users table created");
  } else {
    console.log("Users table already exists");
  }

  process.exit();
}

setupUsers();
