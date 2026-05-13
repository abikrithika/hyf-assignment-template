import dotenv from "dotenv";
dotenv.config();
import express from "express";
import snippetsRouter from "./api/src/routers/snippets.js";
import tagsRouter from "./api/src/routers/tags.js";
import authRouter from "./api/src/routers/auth.js";
import requireApiKey from "./api/src/middleware/requireApiKey.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import knex from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

app.get("/health", requireApiKey, (req, res) => {
  res.json({
    status: "ok",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
