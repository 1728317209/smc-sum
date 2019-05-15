const smcController = require('./controller/smc');

module.exports = (router) => {
  router.prefix('/api');
  router
    .post('/ready', smcController.ready)
    .post('/get_result', smcController.sendResult)
    .post('/send_result', smcController.getResult)
    .post('/get_pub_key', smcController.sendPubKey)
    .post('/send_pub_key', smcController.getPubKey)
    .post('/send_part_num', smcController.getPartyNum)
    .post('/send_enc_data', smcController.getEncData)
    .post('/clear_database', smcController.clearDatabase)
    .post('/get_enc_data_product', smcController.sendEncDataProduct);
};
