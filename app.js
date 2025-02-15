const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
// const medicalReport = require("./routes/medicalReport")

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// Routes
app.use("/api/users", userRoutes);
// app.use("/api/medical-report", medicalReport);

module.exports = app;
