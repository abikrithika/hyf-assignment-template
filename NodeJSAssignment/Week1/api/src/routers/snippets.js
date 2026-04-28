import express from "express";
const router = express.Router();

let snippets = [];
let idCounter = 1;

export default router;

router.get("/", (req, res) => {
  res.json(snippets);
});

router.get("/:id", (req, res) => {
  const snippet = snippets.find((s) => s.id === Number(req.params.id));

  if (!snippet) {
    return res.status(404).json({ error: "Snippet not found" });
  }

  res.json(snippet);
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newSnippet = {
    id: idCounter++,
    title,
    contents,
    tags: [],
  };

  snippets.push(newSnippet);

  res.status(201).json(newSnippet);
});

router.put("/:id", (req, res) => {
  const snippet = snippets.find((s) => s.id === Number(req.params.id));

  if (!snippet) {
    return res.status(404).json({ error: "Snippet not found" });
  }

  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).json({ error: "Missing fields" });
  }

  snippet.title = title;
  snippet.contents = contents;

  res.json(snippet);
});

router.delete("/:id", (req, res) => {
  const index = snippets.findIndex((s) => s.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Snippet not found" });
  }

  snippets.splice(index, 1);

  res.json({ message: "Deleted snippet" });
});
