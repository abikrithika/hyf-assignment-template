
import express from "express";
const router = express.Router();

let tags = [];
let tagIdCounter = 1;

export default router;

import z from "zod";
const tagCreateSchema  = z.object({
 name: z.string().min(1, "Tag name is required"),
});
const tagUpdateSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
});


router.get("/", (req, res) => {
  res.json(tags);
});

router.get("/:id", (req, res) => {
  const tag = tags.find((t) => t.id === Number(req.params.id));

  if (!tag) {
    return res.status(404).json({ error: "Tag not found" });
  }

  res.json(tag);
});

router.post("/", (req, res) => {
  const result = tagCreateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.errors,
    });
  }

  const { name } = result.data;

  const newTag = {
    id: tagIdCounter++,
    name,
  };

  tags.push(newTag);

  res.status(201).json(newTag);
});

router.put("/:id", (req, res) => {
  const tag = tags.find((t) => t.id === Number(req.params.id));

  if (!tag) {
    return res.status(404).json({ error: "Tag not found" });
  }

  const result = tagUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.errors,
    });
  }

  const { name } = result.data;

  tag.name = name;

  res.json(tag);
});

router.delete("/:id", (req, res) => {
  const index = tags.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Tag not found" });
  }

  tags.splice(index, 1);

  res.json({ message: "Deleted tag" });
});
