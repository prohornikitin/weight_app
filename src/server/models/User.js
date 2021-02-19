const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 9;

const OneDayStatisticsSchema = Schema({
  weight: {
    type: Number,
    min: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

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
  weightStatistics: [OneDayStatisticsSchema],
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
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.isNull = function() {
  return email==='' && password==='' && weightStatistics.length===0;
}


  
module.exports = db.model('User', userSchema);
