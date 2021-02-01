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
        error: 'user not found'
      });
    } else {
      console.log(user)
      response.send({
        status: 'success',
        user: user,
      });
    }
  });
};

exports.signUp = (request, response) => {
  const newUser = new User({
    email: request.body.email,
    password: request.body.password,
  });
  User.findOne(newUser).exec((err, user) => {
    if(err) {
      response.send({
        status: 'fail',
        error: err.toString(),
      });
    } else if(user) {
      response.send({
        status: 'fail',
        error: 'user alredy exists'
      });
    } else {
      newUser.save();
    }
  });
  // const email=request.body.email;
  // const password=request.body.password;
  // response.send({status: 'success'});
};