const mongoose = require('mongoose');
const glob = require('glob');
const { resolve } = require('path');

const db = 'mongodb://188.131.246.175/CMS';

mongoose.Promise = global.Promise;

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
};

exports.initAdmin = async () => {
  const User = mongoose.model('User');
  const user = await User.findOne({
    email: 'bruink@klovex.cn',
  });

  if (!user) {
    const newUser = new User({
      username: 'Bruin',
      email: 'bruink@klovex.cn',
      password: '123abc',
      role: 'admin',
    });

    await newUser.save();
  }
};

exports.connect = () => {
  let maxConnectTimes = 0;

  return new Promise(() => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db, { useNewUrlParser: true });

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes += 1;

      if (maxConnectTimes < 5) {
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂了吧，快去修吧少年');
      }
    });

    mongoose.connection.on('error', err => {
      console.log(err);
      maxConnectTimes += 1;

      if (maxConnectTimes < 5) {
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂了吧，快去修吧少年');
      }
    });

    mongoose.connection.once('open', () => {
      this.initSchemas();
      this.initAdmin();
      resolve();
      console.log(' 👍  👍  👍  ==> MongoDB Connected successfully!');
    });
  });
};
