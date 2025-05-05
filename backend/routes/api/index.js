const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");

const photosRouter = require("./photos.js");
const commentsRouter = require("./comments.js");
const albumsRouter = require("./albums.js");
const albumPhotosRouter = require("./albumPhotos.js");
const labelsRouter = require("./labels.js");
const photoLabelsRouter = require("./photoLabels.js");
const favoritesRouter = require("./favorites.js");

const { restoreUser } = require("../../utils/auth.js");
// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/photos", photosRouter);
router.use("/comments", commentsRouter);
router.use("/albums", albumsRouter);
router.use("/album-photos", albumPhotosRouter);
router.use("/labels", labelsRouter);
router.use("/photo-labels", photoLabelsRouter);
router.use("/favorites", favoritesRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
