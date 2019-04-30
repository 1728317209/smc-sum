// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import '@alifd/next/reset.scss';
import rootReducer from './reducers';
import serverApi from './middleware/serverApi';
import router from './router';
import AppLogin from './common/appLogin';
import history from './history';

const ICE_CONTAINER = document.getElementById('ice-container');
const logger = createLogger();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(serverApi, logger))
);

AppLogin.init(store, history);

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  ICE_CONTAINER);
