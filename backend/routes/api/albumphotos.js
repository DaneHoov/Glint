const express = require("express");
const router = express.Router();
const { AlbumPhoto, Photo } = require("../../db/models");

// GET /albumphotos/:albumId - Get all photos in an album
router.get("/:albumId", async (req, res) => {
  const albumId = req.params.albumId;

  const photos = await AlbumPhoto.findAll({
    where: { album_id: albumId },
    include: { model: Photo },
  });

  res.json(photos);
});

// POST /albumphotos - Add a photo to an album
router.post("/", async (req, res) => {
  const { album_id, photo_id } = req.body;

  const newEntry = await AlbumPhoto.create({ album_id, photo_id });

  res.status(201).json(newEntry);
});

// DELETE /albumphotos - Remove a photo from an album
router.delete("/", async (req, res) => {
  const { album_id, photo_id } = req.body;

  const entry = await AlbumPhoto.findOne({ where: { album_id, photo_id } });

  if (!entry) {
    return res.status(404).json({ error: "Photo not found in album" });
  }

  await entry.destroy();
  res.json({ message: "Photo removed from album" });
});

module.exports = router;
