const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const app = express();
const authRouter = require('./routes/auth');
const jwt = require('jsonwebtoken');

// Middlewares (code executed between req and res)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const verifyJWT = (req, res, next) => {
  const SECRET_KEY = "secretkey23456"; // A remplacer par la même clé secrète que dans la route signin dans fichier auth.js
  const token = req.header('Authorization');

  if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  // Try code snippet and catch error if it occurs, and send response
  try {
    // On crée une const decoded contantn l'objet jwt, on applique la méthode verify qui a 2 paramètres : token et clé 
    // decoded reçoit un booléen qui confirme si le token est correct ou non
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    req.user = decoded; // req.user (l'utilidateur: email et password) est gardé en mémoire pour y accéder ultérieurement
    next(); // Si le token est valide, on passe à la suite
  } catch (err) {
    console.error(err)
    res.status(400).json({ auth: false, message: 'Invalid token.' });
  }
};

// app implements a router plus middlewares (logger, json, url encoded, cookie parser, etc.)
app.use('/api', verifyJWT, indexRouter); // All routes check verifyJwt but auth
app.use('/auth', authRouter);

module.exports = app;