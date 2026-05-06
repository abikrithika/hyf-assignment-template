import knex from "knex";

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "./data.db",
  },
  useNullAsDefault: true,
});

export default knexInstance;
