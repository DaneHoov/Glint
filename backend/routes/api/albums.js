const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Album, Photo } = require("../../db/models");

// Get all albums for current user
router.get("/", requireAuth, async (req, res) => {
  const albums = await Album.findAll({
    where: { userId: req.user.id },
  });
  res.json({ albums });
});

// Create a new album
router.post("/", requireAuth, async (req, res) => {
  const { name, description } = req.body;

  const newAlbum = await Album.create({
    userId: req.user.id,
    name,
    description,
  });

  res.status(201).json(newAlbum);
});

// Update an album
router.put("/:albumId", requireAuth, async (req, res) => {
  const { name, description } = req.body;
  const { albumId } = req.params;

  const album = await Album.findByPk(albumId);
  if (!album || album.userId !== req.user.id) {
    return res.status(404).json({ message: "Album not found or unauthorized" });
  }

  album.name = name;
  album.description = description;
  await album.save();

  res.json(album);
});

// Delete an album
router.delete("/:albumId", requireAuth, async (req, res) => {
  const album = await Album.findByPk(req.params.albumId);
  if (!album || album.userId !== req.user.id) {
    return res.status(404).json({ message: "Album not found or unauthorized" });
  }

  await album.destroy();
  res.json({ message: "Album deleted" });
});

// Get all photos in an album
router.get("/:albumId/photos", async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.albumId, {
      include: [{ model: Photo }],
    });

    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json({ photos: album.Photos });
  } catch (err) {
    next(err);
  }
});

// Add a photo to an album return updated album
router.post("/:albumId/photos", requireAuth, async (req, res, next) => {
  const { photoId } = req.body;
  const { albumId } = req.params;

  try {
    const album = await Album.findByPk(albumId);
    if (!album) return res.status(404).json({ message: "Album not found" });

    if (album.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const photo = await Photo.findByPk(photoId);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    await album.addPhoto(photo);

    const updatedAlbum = await Album.findByPk(albumId, {
      include: [{ model: Photo }],
    });

    res.status(200).json(updatedAlbum);
  } catch (err) {
    next(err);
  }
});

// Remove a photo from an album return updated album
router.delete(
  "/:albumId/photos/:photoId",
  requireAuth,
  async (req, res, next) => {
    const { albumId, photoId } = req.params;

    try {
      const album = await Album.findByPk(albumId);
      if (!album) return res.status(404).json({ message: "Album not found" });

      if (album.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const photo = await Photo.findByPk(photoId);
      if (!photo) return res.status(404).json({ message: "Photo not found" });

      await album.removePhoto(photo);

      const updatedAlbum = await Album.findByPk(albumId, {
        include: [{ model: Photo }],
      });

      res.status(200).json(updatedAlbum);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
