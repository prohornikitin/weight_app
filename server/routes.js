const { Db } = require('mongodb');
const User = require('./models/User');

exports.signIn = function (request, response) {
  User.findOne({
    email: request.body.email,
    password: request.body.password,
  }).exec((err, user) => {
    if(err) {
      response.send({
        status: 'fail',
        error: err.toString(),
      });
    } else if(!user) {
      response.send({
        status: 'fail',
        error: 'Invalid email or password',
      });
    } else {
      response.send({
        status: 'success',
        user: user,
      });
    }
  });
};

exports.signUp = function (request, response) {
  User.findOne({
    email: request.body.email,
  }).exec((err, user) => {
    if(err) {
      response.send({
        status: 'fail',
        error: err.toString(),
      });
    } else if(user != null) {
      response.send({
        status: 'fail',
        error: 'user alredy exists'
      });
    } else {
      const newUser = new User({
        email: request.body.email,
        password: request.body.password,
      });
      newUser.save();
      response.send({
        status: 'success',
      });
    }
  });
  // const email=request.body.email;
  // const password=request.body.password;
  // response.send({status: 'success'});
};