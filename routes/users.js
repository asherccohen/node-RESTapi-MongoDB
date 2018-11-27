var express = require('express');
var router = express.Router();

const verifyToken = require('../controllers/verifyToken');
const userController = require('../controllers/userController');

const axios = require('axios');

router.param('user', function(request, response, next, user) {
    // Store id in req object
    request.user = user;
    next();
});
router.param('location', function(request, response, next, location) {
    // Store location  in req object
    request.location = location;
    next();

});
router.param('type', function(request, response, next, type) {
    // Store type in req object
    request.type = type;
    next();
});
router.param('language', function(request, response, next, language) {
    // Store language in req object
    request.language = language;
    next();
});
router.param('order', function(request, response, next, order) {
    // Store order in req object
    request.order = order;
    next();
});

/* GET all users */
router.get('/', verifyToken, function(req, res, next) {
    userController.list_all_User(req, res)
});


router.get('/:user?/:location?/:type?/:language?/:order?', verifyToken, function(req, res, next) {
    axios.get('https://api.github.com/search/users?q=' + req.user + 'location:' + req.location + '+type:' + req.type + '+language:' + req.language + '&order=' + req.order)
        .then(response => {
            const result = response.data.items
                // Create an instance of model
            for (const user of result) {
                userController.create_a_User(user, res)
            }
            res.json(response.data);
        })
        .catch(error => {
            res.render('index', {
                title: error
            });
            console.log(error);
        });
    //res.json(response.data);

})
module.exports = router;