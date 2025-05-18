const express = require("express");
const { Favorite, Photo } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth");
const router = express.Router();

// GET favorite count for a photo (+ user hasFavorited if logged in)
router.get("/photo/:photoId/count", restoreUser, async (req, res, next) => {
  try {
    const photoId = parseInt(req.params.photoId, 10);
    const count = await Favorite.count({ where: { photo_id: photoId } });

    let hasFavorited = false;
    if (req.user) {
      const favorite = await Favorite.findOne({
        where: { photo_id: photoId, user_id: req.user.id },
      });
      hasFavorited = !!favorite;
    }

    return res.json({ count, hasFavorited });
  } catch (err) {
    next(err);
  }
});

// GET all favorites for the current logged-in user with photo data
router.get("/current", requireAuth, async (req, res, next) => {
  try {
    const favoritesRaw = await Favorite.findAll({
      where: { user_id: req.user.id },
      attributes: ["id", "photo_id", "user_id", "createdAt"],
      include: {
        model: Photo,
        as: "Photo",
        attributes: ["id", "image_url", "title", "description"],
      },
      order: [["createdAt", "DESC"]],
    });

    const favorites = favoritesRaw.map((fav) => {
      const plain = fav.toJSON();
      return {
        id: plain.id,
        photoId: plain.photo_id,
        userId: plain.user_id,
        createdAt: plain.createdAt,
        Photo: plain.Photo ?? null,
      };
    });

    return res.json({ favorites });
  } catch (err) {
    console.error("Favorites fetch error:", err);
    next(err);
  }
});

// POST add a favorite
router.post("/photo/:photoId", requireAuth, async (req, res, next) => {
  try {
    const photoId = parseInt(req.params.photoId, 10);
    const userId = req.user.id;

    const photo = await Photo.findByPk(photoId);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const existingFavorite = await Favorite.findOne({
      where: { photo_id: photoId, user_id: userId },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Already favorited" });
    }

    await Favorite.create({ photo_id: photoId, user_id: userId });

    const count = await Favorite.count({ where: { photo_id: photoId } });
    const favoritesRaw = await Favorite.findAll({
      where: { user_id: userId },
      attributes: ["id", "photo_id", "user_id", "createdAt"],
      include: {
        model: Photo,
        as: "Photo",
        attributes: ["id", "image_url", "title", "description"],
      },
      order: [["createdAt", "DESC"]],
    });

    const favorites = favoritesRaw.map((fav) => {
      const plain = fav.toJSON();
      return {
        id: plain.id,
        photoId: plain.photo_id,
        userId: plain.user_id,
        createdAt: plain.createdAt,
        Photo: plain.Photo ?? null,
      };
    });

    return res.status(201).json({ count, favorites });
  } catch (err) {
    next(err);
  }
});

// DELETE remove a favorite
router.delete("/photo/:photoId", requireAuth, async (req, res, next) => {
  try {
    const photoId = parseInt(req.params.photoId, 10);
    const userId = req.user.id;

    const favorite = await Favorite.findOne({
      where: { photo_id: photoId, user_id: userId },
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await favorite.destroy();

    const count = await Favorite.count({ where: { photo_id: photoId } });
    const favoritesRaw = await Favorite.findAll({
      where: { user_id: userId },
      attributes: ["id", "photo_id", "user_id", "createdAt"],
      include: {
        model: Photo,
        as: "Photo",
        attributes: ["id", "image_url", "title", "description"],
      },
      order: [["createdAt", "DESC"]],
    });

    const favorites = favoritesRaw.map((fav) => {
      const plain = fav.toJSON();
      return {
        id: plain.id,
        photoId: plain.photo_id,
        userId: plain.user_id,
        createdAt: plain.createdAt,
        Photo: plain.Photo ?? null,
      };
    });

    return res.json({ count, favorites });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
