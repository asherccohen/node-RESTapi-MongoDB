//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require('dotenv').config({
    path: './config/prod.env'
})

let mongoose = require("mongoose");
var Post = require('../models/postModel');
const verifyToken = require('../controllers/verifyToken');

let chai = require('chai'), expect = chai.expect;
let chaiHttp = require('chai-http');

let should = chai.should();

var app = require('../app');
var http = require('http');
var server = http.createServer(app);
var JWT_TOKEN = process.env.JWT_VALID;

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        chai.request(server)
            .post('/login')
            .send({
                'email': process.env.AUTH_EMAIL,
                'password': process.env.AUTH_PASSWORD,
  }).end(function (err, res) {
       JWT_TOKEN = res.body.token;
  });
         Post.remove({}, (err) => { 
           done();           
        });        
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
                  res.body.length.should.be.eql(0);
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