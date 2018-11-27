//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require('dotenv').config({
    path: './config/prod.env'
})

let mongoose = require("mongoose");
var Post = require('../models/postModel');

let chai = require('chai'),
    expect = chai.expect;
let chaiHttp = require('chai-http');

let should = chai.should();

var app = require('../app');
var http = require('http');
var server = http.createServer(app);
var JWT_TOKEN = process.env.JWT_VALID;

chai.use(chaiHttp);

describe('Users', () => {
    chai.request(server)
        .post('/login')
        .send({
            'email': process.env.AUTH_EMAIL,
            'password': process.env.AUTH_PASSWORD,
        }).end(function(err, res) {
            JWT_TOKEN = res.body.token;
        });

    /*
     * Test the /USERS route
     */
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .set('x-access-token', JWT_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET Github users', () => {
        it('it should GET Gihub users', (done) => {
            chai.request(server)
                .get('/users/mike/canada/user/js/asc')
                .set('x-access-token', JWT_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.items.should.be.a('array');
                    done();
                });
        });
    });

});