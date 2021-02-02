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


userSchema.pre('save', (next) => {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);

        this.password = hash;
        next();
    });
  });
});


userSchema.methods.comparePassword = async function(candidatePassword)  {
  return await bcrypt.compare(candidatePassword, this.password);
};


  
module.exports = db.model('User', userSchema);
