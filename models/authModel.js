'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AuthSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Kindly enter the username']
    },
    email: {
        type: String,
        required: [true, 'Kindly enter the email']
    },
    password: {
        type: String,
        required: [true, 'Kindly enter the password']
    }
});


module.exports = mongoose.model('Auth', AuthSchema, 'auths');