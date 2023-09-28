const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    // if req.body.password is empty, add "Password field is empty"
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const { role, firstName, lastName, email, phoneNumber } = req.body
    const user = { 
        role,
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword 
    };
    await User.create(user);
    res.json({ message: 'User created', user });
});

const SECRET_KEY = 'secretkey23456'; // A remplacer par une clé secrète

router.post('/signin', async (req, res) => {
const user = await User.findOne({
    where: {
        email: req.body.email,
    },
});

    if (!user) return res.status(400).json({message: `Nom d'utilisateur ou mot de passe incorrect`});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({message: `Nom d'utilisateur ou mot de passe incorrect`});

    const payload = {
        email: req.body.email,
        id: user.id

    // Vous pouvez ajouter d'autres propriétés ici
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({message: token});
});

module.exports = router;