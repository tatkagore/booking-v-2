const express = require("express");
const { createPlate, getAllPlates } = require("../controllers/PlateController");
const { createOrder, getUserOrders } = require("../controllers/OrderController");

const router = express.Router();

// Plates routes
router.post("/plates", createPlate);
router.get("/plates", getAllPlates);

// Orders routes
router.post("/orders", createOrder);
router.get("/orders/me", getUserOrders);

module.exports = router;
