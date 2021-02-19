const User = require('./models/User');

exports.signUp = function(request, response) {
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
    console.log(err);
    response.send({
      status: 'fail',
      error: err.toString(),
    });
  });
};


exports.signIn = function(request, response) {
  getUserFromDb(request.body.email, request.body.password)
  .then(user => {
    user.password = ''; //for security we don't transfer password hash
    response.send({
      status: 'success',
      user: user,
    });
  })
  .catch(err => {
    console.log(err);
    response.send({
      status: 'fail',
      error: err.toString(),
    });
  });
};


exports.updateUser = function(request, response) {
  const user = request.body.user;
  getUserFromDb(user.email, user.password)
  .then(userModel => {
    console.log(user.weightStatistics);
    userModel.weightStatistics = user.weightStatistics;
    userModel.save()
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
};


function getUserFromDb(email, password)  {
  return User.findOne({
    email: email,
  }).exec()
  .then(userOrNull => {
    if(userOrNull != null) {
      return userOrNull;
    } else {
      throw 'User not found';
    }
  })
  .then(user => {
    const passwordMathes = user.comparePassword(password);
    if(passwordMathes) {
      return user;
    } else {
      throw 'Invalid Password'
    }
  })
}
