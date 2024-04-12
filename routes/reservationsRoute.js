const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.get("/", reservationController.getReservationsAsAdmin);
router.get("/me", reservationController.getReservationsForMe);
router.post("/", reservationController.createReservation);
router.put("/:id", reservationController.updateReservation);
router.delete("/:reservationId", reservationController.deleteReservation);

module.exports = router;
