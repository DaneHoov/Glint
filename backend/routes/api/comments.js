const express = require("express");
const { Comment, Photo, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// GET comments for a specific photo
router.get("/photo/:photoId", async (req, res, next) => {
  try {
    const { photoId } = req.params;
    const comments = await Comment.findAll({
      where: { photo_id: photoId },
      include: [{ model: User, attributes: ["id", "username"] }],
      order: [["createdAt", "ASC"]],
    });
    return res.json({ comments });
  } catch (err) {
    next(err);
  }
});

// POST create a comment on a photo (requires auth)
router.post("/photo/:photoId", requireAuth, async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    const { photoId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const photo = await Photo.findByPk(photoId);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const newComment = await Comment.create({
      content,
      photo_id: photoId,
      user_id: req.user.id,
    });

    return res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
});

// PUT edit a comment (requires auth and ownership)
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    comment.content = content;
    await comment.save();

    const updatedComment = await Comment.findByPk(id, {
      include: [{ model: User, attributes: ["id", "username"] }],
    });

    return res.json(updatedComment);
  } catch (err) {
    next(err);
  }
});

// DELETE a comment (requires auth and ownership)
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await comment.destroy();
    return res.json({ message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
