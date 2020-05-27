const mongoose = require('mongoose');
require('mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);