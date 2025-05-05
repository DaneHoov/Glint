const express = require("express");
const router = express.Router();
const { PhotoLabels, Photos, Labels } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// POST /photolabels - Associate a label with a photo
router.post("/", requireAuth, async (req, res) => {
  const { photoId, labelId } = req.body;

  const photo = await Photos.findByPk(photoId);
  const label = await Labels.findByPk(labelId);

  if (!photo || !label) {
    return res.status(404).json({ message: "Photo or Label not found" });
  }

  const photoLabel = await PhotoLabels.create({ photoId, labelId });
  res.status(201).json(photoLabel);
});

// DELETE /photolabels - Remove a label from a photo
router.delete("/", requireAuth, async (req, res) => {
  const { photoId, labelId } = req.body;

  const photoLabel = await PhotoLabels.findOne({
    where: { photoId, labelId }
  });

  if (!photoLabel) {
    return res.status(404).json({ message: "PhotoLabel association not found" });
  }

  await photoLabel.destroy();
  res.json({ message: "Label removed from photo" });
});

module.exports = router;
