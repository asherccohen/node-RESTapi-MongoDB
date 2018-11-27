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
/*     tagged_Users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }] */
           tagged_Users: {
               type: Array,
           }
});

module.exports = mongoose.model('Post', PostSchema, 'posts');