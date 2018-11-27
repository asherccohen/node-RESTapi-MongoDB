var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

router.post('/', function(req, res, next) {
    authController.login(req, res)
});

module.exports = router;