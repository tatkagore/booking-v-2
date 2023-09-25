var express = require('express');
var router = express.Router();

/* GET User */
router.get('/', function(req, res, next) {
    res.json({ message: "Hello, get Room!" });
});

/* Post User */
router.post('/', function(req, res, next) {
    res.json({ message: "Hello, post Room!" });
});

/* Put User. */
router.put('/', function(req, res, next) {
    res.json({ message: "Hello, put Room!" });
});

/* Delete User */
router.delete('/', function(req, res, next) {
    res.json({ message: "Hello, delete Room!" });
});

module.exports = router;
