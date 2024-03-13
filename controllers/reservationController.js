// Importation des modèles Sequelize basé sur le fichier index.js
const { Reservation, User } = require("../models");

// Create Reservation
exports.createReservation = async (req, res) => {
  try {
    const { date, note, userId, numberOfGuests } = req.body;
    // Ajouter des vérifications ici, par exemple, vérifier la disponibilité de la table
    // Check if there is an existing reservation for the same spot and date
    const existingReservation = await Reservation.findOne({
      where: {
        date,
      },
    });

    if (existingReservation) {
      // Spot is already reserved for the specified date
      return res
        .status(400)
        .json({ error: "Spot is already reserved for this date and time." });
    }

    const reservation = await Reservation.create({
      numberOfGuests,
      date,
      note,
      userId,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// All reservations List for Admin only
exports.getReservationsAsAdmin = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reservation list for current user
exports.getReservationsForMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservations = await Reservation.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to Update a reservation
exports.updateReservation = async (req, res) => {
  const id = req.params.id;
  const { note, numberOfGuests, date } = req.body;

  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    reservation.note = note;
    reservation.numberOfGuests = numberOfGuests;
    reservation.date = date;

    await reservation.save();
    res.json({ reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to Delete a reservation
exports.deleteReservation = async (req, res) => {
  const reservationId = req.params.reservationId;

  try {
    Reservation.destroy({
      where: { id: reservationId },
    }).then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: "Reservation not found." });
      }
      res.status(200).json({ message: "Reservation deleted." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
