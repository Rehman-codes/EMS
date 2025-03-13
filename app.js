require("dotenv").config();
const express = require("express");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Event Planner API is running...");
});

// Use routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
