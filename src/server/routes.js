const User = require('./models/User');

exports.signIn = function (request, response) {
  let user = null;

  User.findOne({
    email: request.body.email,
  }).exec()
  .then(userOrNull => {
    if(userOrNull != null) {
      user = userOrNull;
      return user.comparePassword(request.body.password);
    } else {
      throw 'User not found';
    }
  })
  .then(result => {
    if(result) {
      user.password = ''; //for security we don't transfer password hash
      response.send({
        status: 'success',
        user: user,
      });
    } else {
      throw 'Invalid Password';
    }
  })
  .catch(err => {
    response.send({
      status: 'fail',
      error: err.toString(),
    });
  });
};

exports.signUp = function (request, response) {
  User.findOne({
    email: request.body.email,
  }).exec()
  .then(userOrNull => {
    if(userOrNull == null) {
      const newUser = new User({
        email: request.body.email,
        password: request.body.password,
      })
      newUser.save();
      response.send({status: 'success'});
    } else {
      throw 'User alredy exists';
    }
  })
  .catch(err => {
    response.send({
      status: 'fail',
      error: err.toString(),
    });
  });
};