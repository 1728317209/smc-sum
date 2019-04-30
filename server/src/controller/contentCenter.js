const userServer = require('../service/user');

class ContentController {
  async submitArticle(ctx) {
    const { ownId } = ctx.request.body;
    const resultInfo = await userServer.checkExistById(ownId);
    if (!resultInfo.isExist) {
      ctx.body = {
        ret: 2,
        errMsg: '非法请求，请使用正确的ID',
      };
    }
  }
}

module.exports = new ContentController();
