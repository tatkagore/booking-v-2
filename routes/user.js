var express = require('express');
var router = express.Router();

/* GET User */
router.get('/', function(req, res, next) {
    res.json({ message: "Hello, get User!" });
});

/* Post User */
router.post('/', function(req, res, next) {
    res.json({ message: "Hello, post User!" });
});

/* Put User. */
router.put('/', function(req, res, next) {
    res.json({ message: "Hello, put User!" });
});

/* Delete User */
router.delete('/', function(req, res, next) {
    res.json({ message: "Hello, delete User!" });
});

module.exports = router;
