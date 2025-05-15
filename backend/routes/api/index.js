const express = require("express");
const router = express.Router();

// Middleware
const { restoreUser } = require("../../utils/auth.js");

// Resource routers
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const photosRouter = require("./photos.js");
const commentsRouter = require("./comments.js");
const albumsRouter = require("./albums.js");
const albumPhotosRouter = require("./albumphotos.js");
const labelsRouter = require("./labels.js");
const photoLabelsRouter = require("./photolabels.js");
const favoritesRouter = require("./favorites.js");

// Restore user middleware
router.use(restoreUser);

// Resource routes
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/photos", photosRouter);
router.use("/comments", commentsRouter);
router.use("/albums", albumsRouter);
router.use("/album-photos", albumPhotosRouter);
router.use("/labels", labelsRouter);
router.use("/photo-labels", photoLabelsRouter);
router.use("/favorites", favoritesRouter);

module.exports = router;
