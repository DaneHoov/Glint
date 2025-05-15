const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Comment } = require("../../db/models");

// GET all comments
router.get("/", async (req, res) => {
  const comments = await Comment.findAll();
  res.json(comments);
});

// POST new comment (requires auth)
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { photoId, text } = req.body;
    const comment = await Comment.create({
      userId: req.user.id,
      photoId,
      text,
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

// PUT comment (requires auth and ownership)
router.put("/:commentId", requireAuth, async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.userId !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    const { text } = req.body;
    await comment.update({ text });
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// DELETE comment (requires auth and ownership)
router.delete("/:commentId", requireAuth, async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.userId !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
