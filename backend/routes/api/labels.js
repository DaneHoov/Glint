const express = require("express");
const router = express.Router();
const { Labels } = require("../../db/models");

// GET /labels - Get all labels
router.get("/", async (req, res) => {
  const labels = await Labels.findAll();
  res.json(labels);
});

// POST /labels - Create a new label
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Label name is required" });
  }

  const label = await Labels.create({ name });
  res.status(201).json(label);
});

module.exports = router;
