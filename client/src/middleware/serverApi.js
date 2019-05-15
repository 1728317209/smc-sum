import axios from 'axios';

// const API_DOMAIN = 'http://188.131.246.175:3000';
const API_DOMAIN = '';

/* eslint-disable  */
export default store => next => action => {
  if (!action.API) {
    return next(action);
  }
  const {
    type,
    endpoint,
    params
  } = action.API;


  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }

  next({
    type: `${type}_REQ`
  });

  return callServerApi(endpoint, params)
    .then(res => {
      return next({
        type: `${type}_SUC`,
        response: res.data
      });
    }).catch(err => {
      next({
        type: `${type}_FAI`,
        response: err.data
      });
      return Promise.reject(err.data)
    });
};

const callServerApi = (endpoint, params) => new Promise((resolve, reject) => {
  axios({
    method: 'POST',
    url: API_DOMAIN + endpoint,
    data: params,
  }).then(response => {
    if (response.data.ret === 1 || response.ret === 1) {
      return resolve({data: response.data});
    }
    return reject({data: response.data});
  },
  (err)=>{
    return reject(err);
  }).catch(err => reject({
     errMsg: JSON.stringify(err)
  }));
});
