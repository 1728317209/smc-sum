const mongoose = require('mongoose');


class UserService {
  async checkPassword(email, password) {
    const User = mongoose.model('User');
    let match = false;
    const user = await User.findOne({ email });
    if (user) {
      match = await user.comparePassword(password, user.password);
    }
    return {
      match,
      user,
    };
  }

  async checkExistByEmail(email) {
    const User = mongoose.model('User');
    let isExist = false;
    const user = await User.findOne({ email });
    if (user) {
      isExist = true;
    }
    return {
      isExist,
      user,
    };
  }

  async checkExistById(id) {
    const User = mongoose.model('User');
    let isExist = false;
    const user = await User.findOne({ _id: id });
    if (user) {
      isExist = true;
    }
    return {
      isExist,
      user,
    };
  }

  async insertUser({ username, password, email }) {
    const User = mongoose.model('User');
    const newUser = new User({
      username,
      email,
      password,
      role: 'user',
    });
    await newUser.save();
  }

  async queryMemberList() {
    const User = mongoose.model('User');
    const list = await User.find({});
    return { list };
  }

  async updateOneMember({ ownId, targetMemberData }) {
    const User = mongoose.model('User');
    const newData = await User.findByIdAndUpdate({ _id: ownId }, { $set: {
      username: targetMemberData.username,
      role: targetMemberData.role,
      tags: targetMemberData.tags,
      updatedAt: Date.now(),
    },
    }, { new: true });
    return { newData };
  }

  async deleteOneMember({ targetId }) {
    const User = mongoose.model('User');
    const delResult = await User.findOneAndDelete({ _id: targetId });
    return { delResult };
  }
}

module.exports = new UserService();
