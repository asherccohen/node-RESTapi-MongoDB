'use strict';

var User = require('../models/userModel');
var mongoose = require('mongoose');

exports.list_all_User = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_a_User = function(user, res) {
    var user_instance = new User({
        user: user.login || null,
        id: user.id || null,
        location: user.location || null,
        type: user.type || null,
        language: user.language || null,
    });
    // Save the new model instance, passing a callback
    user_instance.save(function(err) {
        if (err) throw err;
        console.log('User created!');
        //res.send(user_instance);
    });
};

exports.read_a_User = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_a_User = function(req, res) {
    User.findOneAndUpdate({
        _id: req.params.userId
    }, req.body, {
        new: true
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_User = function(req, res) {
    User.deleteOne({
        _id: req.params.userId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User successfully deleted'
        });
    });
};