var express = require("express");
var router = express.Router();
const Reservation = require("../models/reservation");

/* GET Reservation */
router.get("/", function (req, res, next) {
    res.json({ message: "Hello, get Reservation!" });
});

/* Post Reservation */
router.post("/", async (req, res, next) => {
    const reservation = await Reservation.create({
    date: "12",
    name: "Tanya",
    note: "Good",
    status: "1",
    userId: 1,
    spotId: 1,
    roomId: 1,
});

    res.json({ message: reservation });
});

/* Put Reservation. */
router.put("/", function (req, res, next) {
    res.json({ message: "Hello, put Reservation!" });
});

/* Delete Reservation */
router.delete("/", function (req, res, next) {
    res.json({ message: "Hello, delete Reservation!" });
});

module.exports = router;
