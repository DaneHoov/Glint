const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  // Serve the frontend's index.html at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });

  // Serve static assets from frontend build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve index.html at all routes not starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });
}

// ✅ CSRF restore endpoint (works in both prod and dev)
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
