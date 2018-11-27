'use strict';

var Post = require('../models/postModel');
var User = require('../models/userModel');
//var Auth = require('../models/AuthModel');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.list_all_Posts = function(req, res) {
    Post.find({}, function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};
//I have tries with mongoose populate but couldn't make it work

/* exports.create_a_Post = function(req, res) {
    var post_instance = new Post({
        title: req.body.title || null,
        body: req.body.body || null,
        createdDate: Date.now(),
        updatedDate: Date.now(),
        deactivated: false,
        picture: req.body.picture || null,
        creator: req.userId, //(ObjectId) -
        tagged_Users: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }]  //taggedUsers field is an Array referenced documents from your Users collection
    });


    User.find({}).populate('tagged_Users').exec(function(err, users) {
        //console.log(users)
        if (err) return handleError(err);
        console.log('The tagged_Users is %s', users);
        // prints "The author is Ian Fleming"
    });

    getUserWithPosts("mikesuchor")

    function getUserWithPosts(user) {
        return User.findOne({
                user: user
            })
            .populate('post_instance').exec((err, tagged_Users) => {
                console.log("Populated User " + tagged_Users);
            })
    }


    // Save the new model instance, passing a callback
    post_instance.save(function(err) {
        if (err) throw err;

        console.log('Post created!');
        res.send(post_instance);
    });
};
 */

//This version has the problem of always saving a copy of the User's model in each post, with obvious performance issues
exports.create_a_Post = function(req, res) {
    var promise = User.find({}, function(err, taggedUsers) {
        if (err)
            console.log(err);
        // taggedUsers is an array
    }).exec();

    promise.then(function(taggedUsers) {
        var post_instance = new Post({
            title: req.body.title || null,
            body: req.body.body || null,
            createdDate: Date.now(),
            updatedDate: Date.now(),
            deactivated: false,
            picture: req.body.picture || null,
            creator: req.userId, //(ObjectId) -
            tagged_Users: [...taggedUsers] //taggedUsers field is an Array referenced documents from your Users collection
        });

        // Save the new model instance, passing a callback
        post_instance.save(function(err) {
            if (err) throw err;

            console.log('Post created!');
            res.send(post_instance);
        });
    });
};



exports.read_a_Post_byAuthor = function(req, res) {
    if (!req.params.creator) {
        res.json("No record exist")
    } else {
        Post.find({
            creator: req.params.creator
        }, null, function(err, post) {
            if (err)
                res.send(err);
            res.json(post);
        })
    }
};

exports.read_a_Post_byId = function(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
        res.json("No record exist")
    } else {
        Post.findById(req.params._id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    }
};

exports.update_a_Post = function(req, res) {
    //update the date in updated_date field
    req.body.updated_date = Date.now()

    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
        res.json("No record exist")
    } else {
        Post.findOneAndUpdate({
            _id: req.params._id
        }, req.body, {
            new: true
        }, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
            console.log(`Post ${req.params._id} updated!`);
        });
    }
};


exports.deactivate_a_Post = function(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
        res.json("No record exist")
    } else {
        Post.update({
            _id: req.params._id
        }, {
            deactivated: true,
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({
                message: 'Post successfully deactivated'
            });
        });
    }
};

exports.delete_a_Post = function(req, res) {
    Post.deleteOne({
        _id: req.params._id
    }, function(err, post) {
        if (err)
            res.send(err);
        res.json({
            message: 'Post successfully deleted'
        });
    });
};