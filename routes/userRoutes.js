const express = require("express");
const { getUsers, createUser, loginUser } = require("../controllers/userController.js");
const router = express.Router();

router.get("/", getUsers);
router.post("/create", createUser);
router.post("/login",loginUser);

module.exports = router;


