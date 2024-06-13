const jwt = require("jsonwebtoken");
const { User } = require("../db.js");

const verifyJWT = (req, res, next) => {
  const SECRET_KEY = "secretkey23456"; // A remplacer par la même clé secrète que dans la route signin dans fichier auth.js
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  // Try code snippet and catch error if it occurs, and send response
  try {
    // On crée une const decoded contantn l'objet jwt, on applique la méthode verify qui a 2 paramètres : token et clé
    // decoded reçoit un booléen qui confirme si le token est correct ou non
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // req.user (l'utilidateur: email et password) est gardé en mémoire pour y accéder ultérieurement
    next(); // Si le token est valide, on passe à la suite
  } catch (err) {
    console.error(err);
    res.status(400).json({ auth: false, message: "Invalid token." });
  }
};

// Middleware function to check if the user has the "admin" role
const isAdmin = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  }); // Check if the user has the "admin" role
  if (user && user.isAdmin) {
    // User has admin role, allow access to the route
    next();
  } else {
    // User does not have admin role, deny access
    res
      .status(403)
      .json({ error: "Access denied. Only admins can access this route." });
  }
};

module.exports = {
  isAdmin,
  verifyJWT,
};
