const express = require("express");
const knexLibrary = require("knex");
const bodyParser = require("body-parser");
const port = 4002;
const app = express();

app.use(bodyParser.json());

app.get("/home", (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>User Dashboard</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f6f8;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .card {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .count {
          font-size: 48px;
          color: #2c7be5;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Total Users</h1>
        <div class="count" id="count">Loading...</div>
      </div>

      <script>
        fetch("/user-count")
          .then(res => res.json())
          .then(data => {
            document.getElementById("count").innerText = data.count;
          });
      </script>
    </body>
    </html>
  `);
});

const dbFile = "C:/Users/abikr/database_tasks/tasks.sqlite3";

const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
  useNullAsDefault: true,
});

app.get("/users/id", async (_req, res) => {
  const users = await knex("user").select("id");
  res.json(users);
});

app.get("/latest-users", async (_req, res) => {
  const users = await knex("user").select("*").orderBy("id").limit(5);

  res.json(users);
});

app.get("/gmail-users", async (req, res) => {
  const users = await knex("user")
    .select("name")
    .where("email", "like", "%@gmail.com");
  res.json(users);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
