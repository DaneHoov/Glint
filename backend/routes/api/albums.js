const express = require("express");
const router = express.Router();
const { Albums } = require("../../db/models");

// GET /albums - Get all albums
router.get("/", async (req, res) => {
  const albums = await Albums.findAll();
  res.json(albums);
});

// GET /albums/:id - Get an album by ID
router.get("/:id", async (req, res) => {
  const album = await Albums.findByPk(req.params.id);
  if (album) {
    res.json(album);
  } else {
    res.status(404).json({ error: "Album not found" });
  }
});

// POST /albums - Create a new album
router.post("/", async (req, res) => {
  const { user_id, title, description } = req.body;
  const newAlbum = await Albums.create({ user_id, title, description });
  res.status(201).json(newAlbum);
});

// PUT /albums/:id - Update an album
router.put("/:id", async (req, res) => {
  const album = await Albums.findByPk(req.params.id);
  if (album) {
    const { title, description } = req.body;
    await album.update({ title, description });
    res.json(album);
  } else {
    res.status(404).json({ error: "Album not found" });
  }
});

// DELETE /albums/:id - Delete an album
router.delete("/:id", async (req, res) => {
  const album = await Albums.findByPk(req.params.id);
  if (album) {
    await album.destroy();
    res.json({ message: "Album deleted" });
  } else {
    res.status(404).json({ error: "Album not found" });
  }
});

module.exports = router;
