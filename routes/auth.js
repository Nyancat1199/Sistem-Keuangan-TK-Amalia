const express = require("express");
const { body } = require("express-validator");
const AuthController = require("../controllers/auth");

const router = express.Router();

// GET
router.get("/login", AuthController.getLogin);

router.get("/logout", AuthController.postLogout);

// POST
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  AuthController.postLogin
);



module.exports = router;
