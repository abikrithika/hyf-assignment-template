import knex from "./db.js";

async function setup() {
  await knex.schema.createTable("snippets", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.text("contents");
    table.string("tags");
    table.boolean("is_private").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  console.log("Table created!");
  process.exit();
}

setup();

await knex.schema.createTable("users", (table) => {
  table.increments("id").primary();
  table.string("email").unique();
  table.string("password");
  table.string("role").defaultTo("user");
});
