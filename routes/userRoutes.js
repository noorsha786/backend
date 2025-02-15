const express = require("express");
const {
  createUser,
  loginUser,
  getMyDetails,
  getAllPatients
} = require("../controllers/userController.js");
const protectRoute = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/me", protectRoute("all"), getMyDetails);
router.get("/patients",protectRoute("provider"),getAllPatients);

module.exports = router;
