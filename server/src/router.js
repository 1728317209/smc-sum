const memberController = require('./controller/memberCenter');
const userController = require('./controller/user');
const contentController = require('./controller/contentCenter');

module.exports = (router) => {
  router.prefix('/api');
  router
    .post('/login', userController.login)
    .post('/register', userController.register)
    .post('/logout', userController.logout)
    .post('/query_member_list', memberController.queryMemberList)
    .post('/update_one_member', memberController.updateOneMember)
    .post('/delete_one_member', memberController.deleteOneMember)
    .post('/upload', contentController.submitArticle);
};
