const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: String,
    default: 'party',
  },
});

userSchema.methods = {

};

mongoose.model('User', userSchema);
