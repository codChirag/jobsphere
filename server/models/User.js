const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  skills: [String],
  resume: String
});

module.exports = mongoose.model('User', userSchema);
