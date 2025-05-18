const express = require("express");
const { Photo, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// GET all photos belonging to the logged-in user
router.get("/", requireAuth, async (req, res) => {
  try {
    const photos = await Photo.findAll({
      where: { user_id: req.user.id },
    });
    return res.json({ photos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST create a new photo
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { title, url, description } = req.body;
    const newPhoto = await Photo.create({
      title,
      image_url: url,
      description,
      user_id: req.user.id,
    });
    return res.status(201).json(newPhoto);
  } catch (err) {
    next(err);
  }
});

// PUT update a photo
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, url, description } = req.body;

    const photo = await Photo.findByPk(id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    if (photo.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    photo.title = title;
    photo.image_url = url;
    photo.description = description;
    await photo.save();

    return res.json(photo);
  } catch (err) {
    next(err);
  }
});

// DELETE a photo
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const photo = await Photo.findByPk(id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    if (photo.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await photo.destroy();

    return res.json({ message: "Photo deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
