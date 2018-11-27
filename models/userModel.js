'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    user: {
        type: String,
        required: [true, 'Kindly enter the username']
    },
    id: {
        type: Number,
        required: [true, 'Kindly enter the id']
    },
    location: {
        type: String,
    },
    type: {
        type: String,
        required: [true, 'Kindly enter the type']
    },
    language: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema, 'users');