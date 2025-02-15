const generateToken = require("../helper/jwt.helper");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllPatients = async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const users = await User.find(
      { role: "patient" },
      {},
      { skip: parseInt(skip), limit: parseInt(limit) }
    );
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getMyDetails = async (req, res) => {
  try {
    const userDetails = req.user;
    const user = await User.findOne({ email: userDetails.email });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = await generateToken({
      email: user.email,
      role: user.role,
    });
    res
      .status(200)
      .json({ message: "Login successful", data: { user, token } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getMyDetails,
  getAllPatients,
};
