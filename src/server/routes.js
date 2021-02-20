/**
 * @module
 * 
 */
const User = require('./models/User');


/**
 * Handler for route '/signup'
 * @param {Object} request - express request Object
 * @param {Object} response - object used for response sedning
 */
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


/**
 * Handler for route '/signin'
 * @param {Object} request - express request Object
 * @param {Object} response - object used for response sedning
 */
exports.signIn = function(request, response) {
  getUserFromDb(request.body.email, request.body.password)
  .then(user => {
    user.password = ''; //for security we don't transfer password hash
    console.log(user);
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


/**
 * Handler for route '/update_user'
 * @param {Object} request - express request Object
 * @param {Object} response - object used for response sedning
 */
exports.updateUser = function(request, response) {
  const user = request.body.user;
  getUserFromDb(user.email, user.password)
  .then(userModel => {
    userModel.weightStatistics = user.weightStatistics;
    return userModel.save();
  })
  .catch(err => {
    console.log(err);
  });
};


/**
 * Get model of {@link module:server/models/User~userSchema} from database
 * @param {String} email
 * @param {String} password
 */
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
