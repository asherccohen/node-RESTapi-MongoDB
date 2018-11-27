'use strict';
var mongoose = require('mongoose');
var User = require('../models/userModel');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var PostSchema = new Schema({
    title: {
        type: String,
        //required: [true, 'Kindly enter the title of the post']
    },
    body: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    updated_date: {
        type: Date,
        default: Date.now()
    },
    deactivated: {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
    },
    creator: {
        type: ObjectId,
    },
    tagged_Users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    /*     tagged_Users: {
            type: Array,
        } */
});

/* User.find({}).populate('PostSchema.tagged_Users').exec(function(err, users) {
    //console.log(users)
    if (err) return handleError(err);
    //console.log('The tagged_Users is %s', users);
    // prints "The author is Ian Fleming"
});
console.log(PostSchema); */

/* PostSchema.virtual('posts', {
    ref: 'User',
    localField: '_id',
    foreignField: 'tagged_Users'
}); */

module.exports = mongoose.model('Post', PostSchema, 'posts');