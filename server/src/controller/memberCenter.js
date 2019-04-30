const userServer = require('../service/user');

class MemberController {
  async queryMemberList(ctx) {
    const { ownId } = ctx.request.body;
    const resultInfo = await userServer.checkExistById(ownId);
    if (!resultInfo.isExist) {
      ctx.body = {
        ret: 2,
        errMsg: '非法请求，请使用正确的ID',
      };
    } else {
      const { list } = await userServer.queryMemberList();
      const memberList = [];
      list.forEach(item => {
        const memberItem = {
          // eslint-disable-next-line no-underscore-dangle
          id: item._id,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          role: item.role,
          tags: item.tags,
          username: item.username,
          email: item.email,
        };
        memberList.push(memberItem);
      });
      ctx.body = {
        ret: 1,
        data: {
          memberList,
        },
      };
    }
  }

  async updateOneMember(ctx) {
    const { ownId, targetMemberData } = ctx.request.body;
    const resultInfo = await userServer.checkExistById(ownId);
    if (!resultInfo.isExist) {
      ctx.body = {
        ret: 2,
        errMsg: '非法请求，请使用正确的ID',
      };
    } else {
      const resultData = await userServer.updateOneMember({ ownId, targetMemberData });
      const { _id: id, createdAt, updatedAt, role, tags, username, email } = resultData.newData;
      ctx.body = {
        ret: 1,
        data: {
          id, createdAt, updatedAt, role, tags, username, email,
        },
      };
    }
  }

  async deleteOneMember(ctx) {
    const { ownId, targetId } = ctx.request.body;
    const resultInfo = await userServer.checkExistById(ownId);
    if (!resultInfo.isExist) {
      ctx.body = {
        ret: 2,
        errMsg: '非法请求，请使用正确的ID',
      };
    } else {
      const delData = await userServer.deleteOneMember({ targetId });
      const { _id: id } = delData.delResult;
      ctx.body = {
        ret: 1,
        data: {
          deletedId: id,
        },
      };
    }
  }
}

module.exports = new MemberController();
