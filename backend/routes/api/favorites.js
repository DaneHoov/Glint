const express = require("express");
const router = express.Router();
const { Favorite, Photos } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// POST /favorites - Favorite a photo
router.post("/", requireAuth, async (req, res) => {
  const { photoId } = req.body;
  const userId = req.user.id;

  const photo = await Photos.findByPk(photoId);
  if (!photo) {
    return res.status(404).json({ message: "Photo not found" });
  }

  const existing = await Favorite.findOne({ where: { photoId, userId } });
  if (existing) {
    return res.status(400).json({ message: "Photo already favorited" });
  }

  const newFavorite = await Favorite.create({ photoId, userId });
  res.status(201).json(newFavorite);
});

// GET /favorites - Get all favorited photos by the logged-in user
router.get("/", requireAuth, async (req, res) => {
  const favorites = await Favorite.findAll({
    where: { userId: req.user.id },
    include: {
      model: Photos,
    },
  });

  res.json(favorites);
});

// DELETE /favorites/:id - Remove a favorite (only by owner)
router.delete("/:id", requireAuth, async (req, res) => {
  const favorite = await Favorite.findByPk(req.params.id);

  if (!favorite) {
    return res.status(404).json({ message: "Favorite not found" });
  }

  if (favorite.userId !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await favorite.destroy();
  res.json({ message: "Favorite removed successfully" });
});

module.exports = router;
