const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 9;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    }
  },
  password: {
    type: String,
    required: true,
  },
  weightStatistics: [
    {
      weight: {
        type: Number,
        min: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }
  ]
});



userSchema.pre('save', function(next) {
  return bcrypt.hash(this.password, SALT_WORK_FACTOR)
  .then(hash => {
    if (this.isModified('password')) {
      this.password = hash;
    }
  })
});


userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


  
module.exports = db.model('User', userSchema);
