import * as ACTypes from '../const/ActionTypes';

export const acAppLoginViaLocal = user => ({
  type: ACTypes.LOCAL_APP_LOGIN,
  userInfo: user,
});

export const acLogin = ({ email, password }) => ({
  API: {
    type: ACTypes.APP_LOGIN,
    endpoint: '/api/login',
    params: {
      email,
      password,
    },
  },
});

export const acLogout = () => ({
  type: ACTypes.APP_LOGOUT,
});

export const acRegister = ({ username, password, email }) => ({
  API: {
    type: ACTypes.APP_REGISTER,
    endpoint: '/api/register',
    params: {
      username, password, email,
    },
  },
});
