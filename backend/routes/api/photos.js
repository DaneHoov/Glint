const express = require("express");
const router = express.Router();
const { Photos } = require("../../db/models");

// GET /photos - Get all photos
router.get("/", async (req, res) => {
  const photos = await Photos.findAll();
  res.json(photos);
});

// GET /photos/:id - Get a single photo by ID
router.get("/:id", async (req, res) => {
  const photo = await Photos.findByPk(req.params.id);
  if (photo) {
    res.json(photo);
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

// POST /photos - Create a new photo
router.post("/", async (req, res) => {
  const { user_id, image_url, title, description } = req.body;
  const newPhoto = await Photos.create({
    user_id,
    image_url,
    title,
    description,
  });
  res.status(201).json(newPhoto);
});

// PUT /photos/:id - Update a photo
router.put("/:id", async (req, res) => {
  const photo = await Photos.findByPk(req.params.id);
  if (photo) {
    const { image_url, title, description } = req.body;
    await photo.update({ image_url, title, description });
    res.json(photo);
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

// DELETE /photos/:id - Delete a photo
router.delete("/:id", async (req, res) => {
  const photo = await Photos.findByPk(req.params.id);
  if (photo) {
    await photo.destroy();
    res.json({ message: "Photo deleted" });
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

module.exports = router;
