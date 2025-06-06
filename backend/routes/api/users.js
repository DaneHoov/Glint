const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Album, Photo } = require("../../db/models"); // <-- Added Album, Photo
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// Sign up validation
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage("First name is required and must be less than 30 characters."),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage("Last name is required and must be less than 30 characters."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    username,
    hashedPassword,
    firstName,
    lastName,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

router.get("/search", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Username is required in query params" });
  }

  const user = await User.findOne({
    where: { username },
    include: [{ model: Album }, { model: Photo }],
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.json(user);
});

module.exports = router;
