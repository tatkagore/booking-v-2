var express = require('express');
var router = express.Router();

/* GET User */
router.get('/', function(req, res, next) {
    res.json({ message: "Hello, get Reservation!" });
});

/* Post User */
router.post('/', function(req, res, next) {
    res.json({ message: "Hello, post Reservation!" });
});

/* Put User. */
router.put('/', function(req, res, next) {
    res.json({ message: "Hello, put Reservation!" });
});

/* Delete User */
router.delete('/', function(req, res, next) {
    res.json({ message: "Hello, delete Reservation!" });
});

module.exports = router;
