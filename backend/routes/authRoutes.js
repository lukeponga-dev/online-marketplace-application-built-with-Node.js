const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
} = require("../controllers/authController");

router.post(
  "/register",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("role", "Role must be either vendor or buyer").isIn([
      "vendor",
      "buyer",
    ]),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
  ],
  loginUser
);

router.get("/logout", logoutUser);

router.get("/isAuthenticated", isAuthenticated);

module.exports = router;
