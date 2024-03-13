// Importation des modèles Sequelize basé sur le fichier index.js
const { Reservation, User } = require('../models');

// Fonction pour créer une réservation
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

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Contrôleur pour obtenir la liste des réservations
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll()
        res.json({ reservations });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Ajouter d'autres méthodes au besoin, par exemple, pour mettre à jour ou annuler une réservation