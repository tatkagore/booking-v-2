const express = require('express');
const router = express.Router();

const reservationRouter = require('./reservation');
const roomRouter = require('./room');
const spotRouter = require('./spot');
const userRouter = require('./user');
const authRouter = require('./auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: "Hello, get!" });
});

/* Post home page. */
router.post('/', function(req, res, next) {
  res.json({ message: "Hello, post!" });
});

/* Put home page. */
router.put('/', function(req, res, next) {
  res.json({ message: "Hello, put!" });
});

/* Delete home page. */
router.delete('/', function(req, res, next) {
  res.json({ message: "Hello, delete!" });
});

router.use('/reservation', reservationRouter);
router.use('/room', roomRouter);
router.use('/spot', spotRouter);
router.use('/user', userRouter);
router.use('/auth', userRouter);

module.exports = router;
