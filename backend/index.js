const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes.js");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/auth", authRouter);

app.listen(5000);
