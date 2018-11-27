# Node.js, MongoDB REST Api

<img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png" height="50"> <img src="https://worldvectorlogo.com/logos/nodejs-icon.svg" height="50"> <img src="https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67" height="50">


Goal:

Create a Node + Express backend service as described:
 + Follow REST principles -> https://en.wikipedia.org/wiki/Representational_state_transfer
 + Authenticated with jwt -> https://jwt.io/
 + Follow an MVC architecture -> https://developer.mozilla.org/en-US/Apps/Fundamentals/Modern_web_app_architecture/MVC_architecture
 - All the routes must be fully tested, we recommend to follow Test Driven Development (TDD)

Part 1:
Create a fast search API proxy for github users API saving the results in a MongoDB collection -> https://developer.github.com/v3/search/#search-users
 + Your service must include a route to perform queries based on username, location and programming language. For example I can search users where the username starts with "tom", in "Barcelona", with a majority of their repositories written in "Javascript".
 + After each search the service must save all the new information or missing fields for each user in a MongoDB collection called User.
 + We suggest to use an ODM such as Mongoose for your database operations.

Part 2:
Use the first search created to retrieve users. Using this information you can create Posts documents in a new collection as described:
* Your service must include a route to perform CRUD operations for a new Post model:
  + I can create a post object.
  + I can retrieve posts by id, populating taggedUsers information.
  + I can retrieve posts by specific author or authenticated jwt user, population taggedUsers information.
  + I can update any field of a post, this request must return the updated object.
  + I can deactivate a Post.

* Your model must include this fields:
  + title (String),
  + body (String),
  + createdDate (Unix Timestamp),
  + updatedDate (Unix Timestamp),
  + deactivated (Boolean),
  + picture (String),
  + creator (ObjectId)
  + taggedUsers (Array)

Notes:
+ creator field must be the jwt user that signed the request.
+ taggedUsers field is an Array referenced documents from your Users collection.


Part 3: (not mandatory, added value)
- Search routes for Users and Posts can perform pagination.
- This service must be documented using swagger -> https://swagger.io/

### [Live Demo](https://null/)

## Features

**Server-side**
* [x] **[Node.JS](https://nodejs.org)** v6.x.x
* [x] [MongoDB](https://www.mongodb.com/) with [Mongoose](https://github.com/Automattic/mongoose)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# start server
node index.js

# start mongodb
mongod

```

Before start, you have to install production dependencies with npm: `npm install`


## Routes
```
_REGISTER
http://localhost:3000/register
req.body={name: 'name', email: 'email', password: 'password'}

_LOGIN
POST http://localhost:3000/login 
req.body={email: email, password: password}

_GET JWT USER
http://localhost:3000/auth/me
header = x-access-token 


_SEND POST
POST http://localhost:3000/posts 
req.body={title: 'title', body: 'password', picture: 'picture'}
header = x-access-token 

_GET MY POSTS
GET http://localhost:3000/posts/me
header = x-access-token 

_GET POSTS BY ID
GET http://localhost:3000/posts/5bfb2a7b5c50c4081c5e264c
header = x-access-token 

_GET POSTS BY ID
GET http://localhost:3000/posts/5bfb2a7b5c50c4081c5e264c
header = x-access-token 

_GET POSTS BY author
GET http://localhost:3000/posts/author_id
header = x-access-token 

_GET ALL POSTS
http://localhost:3000/posts
header = x-access-token 

_DEACTIVATE A POST
http://localhost:3000/posts/5bf9975b60e8d8fe51571fdd
header = x-access-token

_GET GITHUB USERS
GET http://localhost:3000/users/username/location/type/language/order
header = x-access-token 

__UPDATE POST BY ID
PUT http://localhost:3000/posts/5bfb2a7b5c50c4081c5e264c
```


## License

This repo is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact

Copyright (C) 2016 Snake

[![@asherccohen](https://img.shields.io/badge/github-asherccohen-green.svg)](https://github.com/asherccohen) [![@asherccohen](https://img.shields.io/badge/twitter-iSnake_-blue.svg)](https://twitter.com/iSnake_)











