const { Db } = require('mongodb');
const User = require('./models/User');

exports.signIn = function (request, response) {
  User.findOne({
    email: request.body.email,
  }).exec((err, user) => {
    if(err) {
      console.log(err.toString());
      response.send({
        status: 'fail',
        error: 'Internal server error, try again later'
      });
    } else if(user == null) {
      console.log(user)
      response.send({
        status: 'fail',
        error: 'Invalid email',
      });
    } else if(!user.comparePassword(request.body.password))  {
      response.send({
        status: 'fail',
        error: 'password',
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
      new User({
        email: request.body.email,
        password: request.body.password,
      }).save();
      response.send({
        status: 'success',
      });
    }
  });
  // const email=request.body.email;
  // const password=request.body.password;
  // response.send({status: 'success'});
};