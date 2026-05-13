import knex from "./db.js";

async function setup() {
  // USERS TABLE
  const hasUsers = await knex.schema.hasTable("users");

  if (!hasUsers) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.string("role").defaultTo("user");
    });

    console.log("Users table created");
  }

  // SNIPPETS TABLE
  const hasSnippets = await knex.schema.hasTable("snippets");

  if (!hasSnippets) {
    await knex.schema.createTable("snippets", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.text("contents");
      table.string("tags");
      table.boolean("is_private").defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    console.log("Snippets table created");
  }

  // TOKENS TABLE
  const hasTokens = await knex.schema.hasTable("tokens");

  if (!hasTokens) {
    await knex.schema.createTable("tokens", (table) => {
      table.increments("id").primary();
      table.integer("user_id");
      table.string("token").unique();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("expires_at");
    });

    console.log("Tokens table created");
  }

  process.exit();
}

setup();
