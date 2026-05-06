import express from "express";
import knex from "../../../db.js";
const router = express.Router();

export default router;
import z from "zod";
const snippetCreateSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(6),
  user_id: z.string().min(1),
});

router.get("/", async (req, res) => {
  try {
    const data = await knex("snippets");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/search", (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json(snippets);
  }

  const result = snippets.filter(
    (s) =>
      s.title.toLowerCase().includes(q.toLowerCase()) ||
      s.contents.toLowerCase().includes(q.toLowerCase()),
  );

  res.json(result);
});

router.post("/search", (req, res) => {
  const { q } = req.query;
  const { fields } = req.body;

  if (q && fields) {
    return res.status(400).json({
      error: "Cannot use both q and fields",
    });
  }

  if (q) {
    const result = snippets.filter(
      (s) =>
        s.title.toLowerCase().includes(q.toLowerCase()) ||
        s.contents.toLowerCase().includes(q.toLowerCase()),
    );
    return res.json(result);
  }

  if (fields) {
    if (fields.tags) {
      const result = snippets.filter((s) => s.tags.includes(fields.tags));
      return res.json(result);
    }
  }

  res.json(snippets);
});

router.get("/sort", async (req, res) => {
  let query = knex("snippets");

  const allowedColumns = ["title", "created_at"];
  const allowedDirections = ["asc", "desc"];

  if (req.query.sort) {
    const [column, direction = "asc"] = req.query.sort.split(" ");

    if (!allowedColumns.includes(column)) {
      return res.status(400).json({ error: "Invalid column" });
    }

    if (!allowedDirections.includes(direction.toLowerCase())) {
      return res.status(400).json({ error: "Invalid direction" });
    }

    query = query.orderBy(column, direction);
  }

  console.log("SAFE SQL:", query.toSQL().sql);

  try {
    const data = await query;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const snippet = await knex("snippets").where({ id }).first();

  if (!snippet) {
    return res.status(404).json({ error: "Snippet not found" });
  }

  res.json(snippet);
});

router.post("/", async (req, res) => {
  const { title, contents, tags = "" } = req.body;

  if (!title || !contents) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const [id] = await knex("snippets").insert({
      title,
      contents,
      tags: JSON.stringify(tags),
    });

    const newSnippet = await knex("snippets").where({ id }).first();

    res.status(201).json(newSnippet);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const updated = await knex("snippets")
    .where({ id })
    .update({ title, contents });

  if (!updated) {
    return res.status(404).json({ error: "Snippet not found" });
  }

  res.json({ message: "Updated" });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const deleted = await knex("snippets").where({ id }).del();

  if (!deleted) {
    return res.status(404).json({ error: "Snippet not found" });
  }

  res.json({ message: "Deleted snippet" });
});
