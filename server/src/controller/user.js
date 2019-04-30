const userServer = require('../service/user');

class UserController {
  async login(ctx) {
    const { email: loginEmail, password } = ctx.request.body;
    const loginUser = await userServer.checkPassword(loginEmail, password);
    if (!loginUser.user) {
      ctx.body = {
        ret: 2,
        errMsg: '该用户不存在，请确认后重试',
      };
    } else if (!loginUser.match) {
      ctx.body = {
        ret: 2,
        errMsg: '密码输入错误，请确认后重试',
      };
    } else {
      const { _id: id, createdAt, updatedAt, role, tags, username, email } = loginUser.user;
      ctx.body = {
        ret: 1,
        userInfo: {
          id, createdAt, updatedAt, role, tags, username, email,
        },
      };
    }
  }

  async register(ctx) {
    const { username, password, email } = ctx.request.body;
    const result = await userServer.checkExistByEmail(email);
    if (result.isExist) {
      ctx.body = {
        ret: 2,
        errMsg: '该邮箱已被注册！',
      };
    } else {
      await userServer.insertUser({ username, password, email });
      const checkResult = await userServer.checkExistByEmail(email);
      const { _id: id, createdAt, updatedAt, role, tags } = checkResult.user;
      ctx.body = {
        ret: 1,
        userInfo: {
          id, createdAt, updatedAt, role, tags, username, email,
        },
      };
    }
  }

  async logout(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }
}

module.exports = new UserController();
