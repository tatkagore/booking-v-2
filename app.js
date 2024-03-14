const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const app = express();
const authRouter = require("./routes/authRoute");
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./middlewares.js");
const cors = require("cors");

// Middlewares (code executed between req and res)
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "http://localhost:8000" }));

// app implements a router plus middlewares (logger, json, url encoded, cookie parser, etc.)
app.use("/api", verifyJWT, indexRouter); // All routes check verifyJwt but auth
app.use("/auth", authRouter);

module.exports = app;
