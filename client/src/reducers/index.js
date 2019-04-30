import { combineReducers } from 'redux';
import * as ActionTypes from '../const/ActionTypes';

function auth(state = {
  isLogging: false,
  isRegistering: false,
  userInfo: {},
}, action) {
  switch (action.type) {
    case `${ActionTypes.LOCAL_APP_LOGIN}`: {
      const { userInfo } = action;
      return {
        ...state,
        userInfo,
      };
    }
    default:
      return state;
  }
}


export default combineReducers({
  auth,
});
