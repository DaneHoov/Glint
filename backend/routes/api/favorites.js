const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Favorite } = require("../../db/models");

// GET current user's favorites (requires auth)
router.get("/", requireAuth, async (req, res) => {
  const favorites = await Favorite.findAll({
    where: { userId: req.user.id },
  });
  res.json(favorites);
});

// POST add a favorite (requires auth)
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { photoId } = req.body;
    const favorite = await Favorite.create({
      userId: req.user.id,
      photoId,
    });
    res.status(201).json(favorite);
  } catch (err) {
    next(err);
  }
});

// DELETE remove a favorite (requires auth and ownership)
router.delete("/:favoriteId", requireAuth, async (req, res, next) => {
  try {
    const favorite = await Favorite.findByPk(req.params.favoriteId);

    if (!favorite) return res.status(404).json({ error: "Favorite not found" });
    if (favorite.userId !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    await favorite.destroy();
    res.json({ message: "Favorite removed" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
