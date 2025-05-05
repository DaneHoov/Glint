const express = require("express");
const router = express.Router();
const { Comment, Photos, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// POST /comments - Create a comment for a photo
router.post("/", requireAuth, async (req, res) => {
  const { photoId, content } = req.body;
  const userId = req.user.id;

  const photo = await Photos.findByPk(photoId);
  if (!photo) {
    return res.status(404).json({ message: "Photo not found" });
  }

  const newComment = await Comment.create({
    photoId,
    userId,
    content,
  });

  res.status(201).json(newComment);
});

// GET /comments/:photoId - Get all comments for a photo
router.get("/:photoId", async (req, res) => {
  const { photoId } = req.params;

  const comments = await Comment.findAll({
    where: { photoId },
    include: {
      model: User,
      attributes: ["id", "username"],
    },
    order: [["createdAt", "DESC"]],
  });

  res.json(comments);
});

// DELETE /comments/:id - Delete a comment (only by owner)
router.delete("/:id", requireAuth, async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.userId !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await comment.destroy();
  res.json({ message: "Comment deleted successfully" });
});

module.exports = router;
