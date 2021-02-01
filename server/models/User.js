const Schema = require('mongoose').Schema;

const userSchema = Schema({
  email: String,
  password: String,
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
  
module.exports = db.model('User', userSchema);
