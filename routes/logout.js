var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});
/* 
The logout endpoint is not needed.
The act of logging out can solely be done through the client side.
A token is usually kept in a cookie or the browser’ s localstorage.
Logging out is as simple as destroying the token on the client.
This /logout endpoint is created to logically depict what happens when you log out.
The token gets set to null. */

module.exports = router;