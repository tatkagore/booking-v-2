const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRoute");
const apiRoutes = require("./routes/apiRoutes"); // Import the new routes
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./middlewares/middlewares.js");
const cors = require("cors");
const morganMiddleware = require("./middlewares/morgan.middleware");
const logger = require("./utils/logger");

const app = express();

// Middlewares
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "http://localhost:5173" }));

logger.http("Debut session");

// Use routes
app.use("/api", verifyJWT, indexRouter); // Existing routes
app.use("/api", apiRoutes); // New plates and orders routes
app.use("/auth", authRouter); // Authentication routes

module.exports = app;
