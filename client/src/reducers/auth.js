import * as ACTypes from '../const/ActionTypes';
import { setLogInfoToLocal, clearLogInfo } from '../common/appLogin';

export default function auth(state = {
  isLogging: false,
  isRegistering: false,
  userInfo: {},
}, action) {
  switch (action.type) {
    case `${ACTypes.LOCAL_APP_LOGIN}`: {
      const { userInfo } = action;
      return {
        ...state,
        userInfo,
      };
    }
    case `${ACTypes.APP_LOGIN}_REQ`: {
      return {
        ...state,
        isLogging: true,
      };
    }
    case `${ACTypes.APP_LOGIN}_SUC`: {
      const { userInfo } = action.response;
      setLogInfoToLocal(userInfo);
      return {
        ...state,
        isLogging: false,
        userInfo,
      };
    }
    case `${ACTypes.APP_LOGIN}_FAI`: {
      return {
        ...state,
        isLogging: false,
      };
    }
    case `${ACTypes.APP_REGISTER}_REQ`: {
      return {
        ...state,
        isRegistering: true,
      };
    }
    case `${ACTypes.APP_REGISTER}_SUC`: {
      const { userInfo } = action.response;
      setLogInfoToLocal(userInfo);
      return {
        ...state,
        isRegistering: false,
        userInfo,
      };
    }
    case `${ACTypes.APP_REGISTER}_FAI`: {
      return {
        ...state,
        isRegistering: false,
      };
    }
    case ACTypes.APP_LOGOUT: {
      clearLogInfo();
      return {
        ...state,
        userInfo: {},
      };
    }
    default:
      return state;
  }
}
