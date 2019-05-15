import * as ACTypes from '../const/ActionTypes';

export const acReady = () => ({
  API: {
    type: ACTypes.READY,
    endpoint: '/api/ready',
    params: {},
  },
});

export const acSendPubKey = ({ pubKey }) => ({
  API: {
    type: ACTypes.SEND_PUB_KEY,
    endpoint: '/api/send_pub_key',
    params: {
      pubKey,
    },
  },
});

export const acSendPartyNum = ({ partyNum }) => ({
  API: {
    type: ACTypes.SEND_PART_NUM,
    endpoint: '/api/send_part_num',
    params: {
      partyNum,
    },
  },
});

export const acSendData = ({ encData }) => ({
  API: {
    type: ACTypes.SEND_ENC_DATA,
    endpoint: '/api/send_enc_data',
    params: {
      encData,
    },
  },
});

export const acGetEncDataProduct = () => ({
  API: {
    type: ACTypes.GET_ENC_DATA_PRODUCT,
    endpoint: '/api/get_enc_data_product',
    params: {},
  },
});

export const acSendRsult = ({ result }) => ({
  API: {
    type: ACTypes.SEND_RESULT,
    endpoint: '/api/send_result',
    params: {
      result,
    },
  },
});

export const acGetResult = () => ({
  API: {
    type: ACTypes.GET_RESULT,
    endpoint: '/api/get_result',
    params: {},
  },
});

export const acGetPubKey = () => ({
  API: {
    type: ACTypes.GET_PUB_KEY,
    endpoint: '/api/get_pub_key',
    params: {},
  },
});

export const acCclearDatabase = () => ({
  API: {
    type: ACTypes.CLEAR_DATABASE,
    endpoint: '/api/clear_database',
    params: {},
  },
});
