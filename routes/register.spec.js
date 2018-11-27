//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
require('dotenv').config({
    path: './config/prod.env'
})

let mongoose = require("mongoose");
var Post = require('../models/postModel');
var jwt = require('jsonwebtoken');

let chai = require('chai'), expect = chai.expect;
let chaiHttp = require('chai-http');

let should = chai.should();

var app = require('../app');
var http = require('http');
var server = http.createServer(app);


chai.use(chaiHttp);

describe('Register', () => {
    beforeEach((done) => { //Before each test we empty the database
        Post.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /REGISTER route
  */
  describe('/register', () => {
      it('it should REGISTER a new JWT user', (done) => {
        chai.request(server)
            .post('/register')
            .send({
                'name': 'john',
                'email': 'john@outlook.com',
                'password': 'mysecretpasswords',
  })
            .end((err, res) => {
                  res.should.have.status(200);
                  expect(res.body.auth).to.be.true;
                  res.body.should.be.a('object');
              done();
            });
      });
  });

});