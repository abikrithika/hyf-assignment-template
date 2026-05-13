import express from "express";
const router = express.Router();

let tags = [];
let tagIdCounter = 1;

export default router;

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
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing tag name" });
  }

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

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing tag name" });
  }

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
