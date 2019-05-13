const mongoose = require('mongoose');

class UserService {
  async insertUser() {
    const User = mongoose.model('User');
    const readyPartyNum = await this.getReadyPartyNum();
    const role = readyPartyNum ? 'party' : 'sponsor';
    const newUser = new User({ role });
    const user = await newUser.save().then(product => product);
    return user;
  }

  async getReadyPartyNum() {
    const User = mongoose.model('User');
    const list = await User.find({});
    return list.length;
  }
}

module.exports = new UserService();
