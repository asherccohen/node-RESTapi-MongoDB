var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
var Post = require('../models/postModel');

describe("Get all posts", function() {
    // Test will pass if we get all posts
    it("should return all posts", function(done) {
        var PostMock = sinon.mock(Post);
        var expectedResult = {
            status: true,
            todo: []
        };
        PostMock.expects('find').yields(null, expectedResult);
        Post.find(function(err, result) {
            PostMock.verify();
            PostMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    // Test will pass if we fail to get a post
    it("should return error", function(done) {
        var PostMock = sinon.mock(Post);
        var expectedResult = {
            status: false,
            error: "Something went wrong"
        };
        PostMock.expects('find').yields(expectedResult, null);
        Post.find(function(err, result) {
            PostMock.verify();
            PostMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the post is saved
describe("Post a new post", function() {
    it("should create new post", function(done) {
        var PostMock = sinon.mock(new Post({
            body: 'Save new post from mock'
        }));
        var post = PostMock.object;
        var expectedResult = {
            status: true
        };
        PostMock.expects('save').yields(null, expectedResult);
        post.save(function(err, result) {
            PostMock.verify();
            PostMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the post is not saved
    it("should return error, if post not saved", function(done) {
        var PostMock = sinon.mock(new Post({
            body: 'Save new todo from mock'
        }));
        var post = PostMock.object;
        var expectedResult = {
            status: false
        };
        PostMock.expects('save').yields(expectedResult, null);
        post.save(function(err, result) {
            PostMock.verify();
            PostMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

/*      // Test will pass if the post is updated based on an ID
 describe("Update a new post by id", function(){
   it("should updated a post by id", function(done){
     var PostMock = sinon.mock(new Post({ completed: true}));
     var post = PostMock.object;
     var expectedResult = { status: true };
     PostMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
     post.save(function (err, result) {
       PostMock.verify();
       PostMock.restore();
       expect(result.status).to.be.true;
       done();
     });
   });
   // Test will pass if the post is not updated based on an ID
   it("should return error if update action is failed", function(done){
     var PostMock = sinon.mock(new Post({ completed: true}));
     var post = PostMock.object;
     var expectedResult = { status: false };
     PostMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);
     post.save(function (err, result) {
       PostMock.verify();
       PostMock.restore();
       expect(err.status).to.not.be.true;
       done();
     });
   });
 }); */

// Test will pass if the post is deleted based on an ID
describe("Delete a post by id", function() {
    it("should delete a postc by id", function(done) {
        var PostMock = sinon.mock(Post);
        var expectedResult = {
            status: true
        };
        PostMock.expects('deleteOne').withArgs({
            _id: 12345
        }).yields(null, expectedResult);
        Post.deleteOne({
            _id: 12345
        }, function(err, result) {
            PostMock.verify();
            PostMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the post is not deleted based on an ID
    it("should return error if delete action is failed", function(done) {
        var PostMock = sinon.mock(Post);
        var expectedResult = {
            status: false
        };
        PostMock.expects('deleteOne').withArgs({
            _id: 12345
        }).yields(expectedResult, null);
        Post.deleteOne({
            _id: 12345
        }, function(err, result) {
            PostMock.verify();
            PostMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});