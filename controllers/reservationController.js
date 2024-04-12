// Importing required models
const { Reservation, User } = require("../models");

// Defines a class to handle reservation-related requests
class ReservationController {
  constructor() {
    // Binding "this" to ensure it refers to the class instance in the methods
    this.createReservation = this.createReservation.bind(this);
    this.getReservationsAsAdmin = this.getReservationsAsAdmin.bind(this);
    this.getReservationsForMe = this.getReservationsForMe.bind(this);
    this.updateReservation = this.updateReservation.bind(this);
    this.deleteReservation = this.deleteReservation.bind(this);
  }

  // Method to create a new reservation
  // Requires request body to contain date, note, userId, and numberOfGuests
  async createReservation(req, res) {
    try {
      // Extracting data from request body
      const { date, note, userId, numberOfGuests } = req.body;

      // Checking for existing reservations on the same date
      const existingReservation = await Reservation.findOne({
        where: { date },
      });

      if (existingReservation) {
        // If a reservation exists, return an error message
        return res
          .status(400)
          .json({ error: "Spot is already reserved for this date and time." });
      }

      // If no existing reservation, create a new one with provided details
      const reservation = await Reservation.create({
        numberOfGuests,
        date,
        note,
        userId,
      });

      // Respond with the created reservation details
      res.status(201).json(reservation);
    } catch (error) {
      // Handle any errors by sending an error response
      res.status(400).json({ error: error.message });
    }
  }

  // Method to get all reservations (Admin only)
  async getReservationsAsAdmin(req, res) {
    try {
      // Fetching all reservations from the database
      const reservations = await Reservation.findAll();

      // Respond with all reservations
      res.status(200).json(reservations);
    } catch (error) {
      // Handle any errors by sending an error response
      res.status(400).json({ error: error.message });
    }
  }

  // Method to get reservations for the current logged-in user
  async getReservationsForMe(req, res) {
    try {
      // Extracting user ID from the request (assuming middleware sets req.user)
      const userId = req.user.id;

      // Fetching reservations for the specific user
      const reservations = await Reservation.findAll({ where: { userId } });

      // Respond with user-specific reservations
      res.status(200).json(reservations);
    } catch (error) {
      // Handle any errors by sending an error response
      res.status(400).json({ error: error.message });
    }
  }

  // Method to update an existing reservation by ID
  async updateReservation(req, res) {
    const id = req.params.id; // Extracting reservation ID from URL parameters
    const { note, numberOfGuests, date } = req.body; // Extracting data from request body

    try {
      // Fetching the reservation by primary key (ID)
      const reservation = await Reservation.findByPk(id);

      if (!reservation) {
        // If no reservation found, return an error
        return res.status(404).json({ error: "Reservation not found." });
      }

      // Updating reservation details
      reservation.note = note;
      reservation.numberOfGuests = numberOfGuests;
      reservation.date = date;

      // Saving the updated reservation
      await reservation.save();

      // Respond with the updated reservation details
      res.json({ reservation });
    } catch (error) {
      // Handle any errors by sending an error response
      res.status(500).json({ error: error.message });
    }
  }

  // Method to delete a reservation by ID
  async deleteReservation(req, res) {
    const reservationId = req.params.reservationId; // Extracting reservation ID from URL parameters

    try {
      // Attempting to delete the specified reservation
      Reservation.destroy({ where: { id: reservationId } }).then(
        (rowsDeleted) => {
          if (rowsDeleted === 0) {
            // If no reservation was deleted, it means it wasn't found
            return res.status(404).json({ message: "Reservation not found." });
          }
          // Respond that the reservation was successfully deleted
          res.status(200).json({ message: "Reservation deleted." });
        }
      );
    } catch (error) {
      // Handle any errors by sending an error response
      res.status(500).json({ error: error.message });
    }
  }
}

// Exporting an instance of the ReservationController class
// This allows the routes to use the same instance across all requests
module.exports = new ReservationController();
