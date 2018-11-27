var express = require('express');
var router = express.Router();
const postsController = require('../controllers/postsController');
const verifyToken = require('../controllers/verifyToken');

/* POST a post. */
router.post('/', verifyToken, function(req, res, next) {
    postsController.create_a_Post(req, res)
});

/* GET all posts */
router.get('/', verifyToken, function(req, res, next) {
    postsController.list_all_Posts(req, res)
});

/* DELETE a post by ID */
router.param('/_id', function(request, response, next, _id) {
    request.params._id = _id;
    next();
});
router.delete('/:_id', verifyToken, function(req, res, next) {
    postsController.deactivate_a_Post(req, res)
});
/* GET a post by ID or author. */
router.param('/key', function(request, response, next, key) {
    request.params.key = key;
    next();
});
router.get('/:key?', verifyToken, function(req, res, next) {
    if (req.params.key.length < 24) {
        req.params.creator = req.params.key;
        postsController.read_a_Post_byAuthor(req, res)
    } else if (req.params.key.length >= 24) {
        req.params._id = req.params.key;
        postsController.read_a_Post_byId(req, res)
    } else {
        console.log("error");

    }
    //res.send('respond with a resource');

});
/* GET a post by JWT user. */
router.param('/me', function(request, response, next, me) {

    next();
});
router.get('/:me?', verifyToken, function(req, res, next) {
    req.params.creator = req.userId;
    postsController.read_a_Post_byAuthor(req, res)
    //res.send('respond with a resource');

});
/* router.param('/_id', function(request, response, next, _id) {
    // Do something with user
    //console.log(request);
    // Store id or other info in req object
    request.params._id = _id;
    // Call next when done
    next();
});
router.param('/creator', function(request, response, next, creator) {
    // Do something with user
    //console.log(request);
    // Store id or other info in req object
    request.params.creator = creator;
    // Call next when done
    next();
}); */

/* router.get('/:_id', function(req, res, next) {
    console.log(req.params);

    postsController.read_a_Post_byId(req, res)
        //res.send('respond with a resource');
        //res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
router.get('/:creator', function(req, res, next) {
    //console.log(req.params);

    postsController.read_a_Post_byAuthor(req, res)
        //res.send('respond with a resource');
        //res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
}); */

/* UPDATE a post. */
router.param('_id', function(request, response, next, _id) {
    request.params._id = _id;
    next();
});

router.put('/:_id', verifyToken, function(req, res, next) {
    postsController.update_a_Post(req, res)
});

module.exports = router;