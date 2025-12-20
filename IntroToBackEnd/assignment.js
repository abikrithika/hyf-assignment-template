const express = require("express");
const knexLibrary = require("knex");
const bodyParser = require("body-parser");
const path = require("path");

const port = 4002;
const app = express();

app.use(bodyParser.json());

app.get("/home", (_req, res) => {
  res.send("/home works!");
});

const dbFile = path.join(__dirname, "../tasks.sqlite3");

const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
  useNullAsDefault: true,
});

app.get("/users/id", async (_req, res) => {
  try {
    const users = await knex("user").select("id");

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/latest-users", async (_req, res) => {
  try {
    const users = await knex("user").select("*").orderBy("id", "desc").limit(5);

    if (!users.length) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/gmail-users", async (_req, res) => {
  try {
    const users = await knex("user")
      .select("name")
      .where("email", "like", "%@gmail.com");

    if (!users.length) {
      return res.status(404).json({ error: "No Gmail users found" });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
