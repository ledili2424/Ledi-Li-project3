const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes.js");
const passwordRouter = require("./routes/passwordRoutes.js");

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// let frontendDir = path.join(__dirname, "../frontend/dist");
// app.use(express.static(frontendDir));
// app.get("*", function (req, res) {
//   console.log("Received request");
//   res.sendFile(path.join(frontendDir, "index.html"));
// });

app.use("/api/auth", authRouter);
app.use("/api/password", passwordRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
