import storage from './storage';
import { LOCAL_LOG_INFO_KEY } from '../const/common';
import { acAppLoginViaLocal, acLogout } from '../actions';

export const getLocalLogInfo = () => storage.get(LOCAL_LOG_INFO_KEY);
export const setLogInfoToLocal = user => storage.set(LOCAL_LOG_INFO_KEY, user);
export const clearLogInfo = () => { storage.remove(LOCAL_LOG_INFO_KEY); storage.clear(); };

class AppLogin {
  store = null;

  history = null;

  hasLogined = false;

  init(store, history) {
    this.store = store;
    this.history = history;
    this.checkLocalLoginInfo();
  }

  checkLocalLoginInfo() {
    const localLoginUserInfo = getLocalLogInfo();
    if (localLoginUserInfo) {
      this.hasLogined = true;
      this.store.dispatch(acAppLoginViaLocal(localLoginUserInfo));
    } else {
      this.logout();
      this.history.replace('/');
    }
  }

  logout() {
    this.store.dispatch(acLogout());
    clearLogInfo();
  }
}

export default new AppLogin();
