//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require('dotenv').config({
    path: './config/prod.env'
})

let mongoose = require("mongoose");
var Post = require('../models/postModel');
const verifyToken = require('../controllers/verifyToken');

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

var app = require('../app');
var http = require('http');
var server = http.createServer(app);
var JWT_TOKEN = process.env.JWT_VALID;

chai.use(chaiHttp);

describe('Posts', () => {
    chai.request(server)
        .post('/login')
        .send({
            'email': process.env.AUTH_EMAIL,
            'password': process.env.AUTH_PASSWORD,
        }).end(function(err, res) {
            JWT_TOKEN = res.body.token;
        });
    /*
     * Test the /POST route
     */
    describe('/GET post', () => {
        it('it should GET all the posts', (done) => {
            chai.request(server)
                .get('/posts')
                .set('x-access-token', JWT_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

});