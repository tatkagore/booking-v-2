const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const {
  postValidationRules,
  putValidationRules,
} = require("../middlewares/validators/reservation");
const { isAdmin } = require("../middlewares/middlewares");

router.get("/", isAdmin, reservationController.getReservationsAsAdmin);
router.get("/me", reservationController.getReservationsForMe);
router.post("/", postValidationRules(), reservationController.createReservation);
router.put("/:id", putValidationRules(), reservationController.updateReservation);
router.delete("/:reservationId", reservationController.deleteReservation);

module.exports = router;
