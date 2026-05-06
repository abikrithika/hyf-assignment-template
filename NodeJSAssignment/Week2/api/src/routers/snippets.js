import express from "express";
import knex from "../../../db.js";
const router = express.Router();

export default router;
import z from "zod";
const snippetCreateSchema = z.object({
  title: z.string().min(2),
  contents: z.string().min(6),
});

const snippetUpdateSchema = z.object({
  title: z.string().min(2),
  contents: z.string().min(6),
});

router.get("/", async (req, res) => {
  try {
    const data = await knex("snippets");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/search", async (req, res) => {
  const { q } = req.query;

  try {
    let query = knex("snippets");

    if (q) {
      query = query.where((builder) => {
        builder
          .where("title", "like", `%${q}%`)
          .orWhere("contents", "like", `%${q}%`);
      });
    }

    const data = await query;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
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

router.get("/filter", async (req, res) => {
  const { tag } = req.query;

  try {
    let query = knex("snippets");

    if (tag) {
      query = query.where("tags", "like", `%${tag}%`);
    }

    const data = await query;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/public", async (req, res) => {
  try {
    const data = await knex("snippets").where({ is_private: 0 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
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
  const result = snippetCreateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.errors,
    });
  }

  const { title, contents } = result.data;

  try {
    const [id] = await knex("snippets").insert({
      title,
      contents,
      tags: "",
    });

    const newSnippet = await knex("snippets").where({ id }).first();

    res.status(201).json(newSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const result = snippetUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.errors,
    });
  }

  const { title, contents } = result.data;

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
