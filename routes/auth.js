var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../controllers/verifyToken');

/* GET users listing. */
/* router.get('/', function(req, res, next) {
    //res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
}); */

router.get('/me', verifyToken, function(req, res) {
    authController.verify(req, res)
});


module.exports = router;