var express = require('express');
var router = express.Router();

/* GET User */
router.get('/', function(req, res, next) {
    res.json({ message: "Hello, get Spot!" });
});

/* Post User */
router.post('/', function(req, res, next) {
    res.json({ message: "Hello, post Spot!" });
});

/* Put User. */
router.put('/', function(req, res, next) {
    res.json({ message: "Hello, put Spot!" });
});

/* Delete User */
router.delete('/', function(req, res, next) {
    res.json({ message: "Hello, delete Spot!" });
});

module.exports = router;
