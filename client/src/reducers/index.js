import { combineReducers } from 'redux';
import * as ActionTypes from '../const/ActionTypes';

const INIT_STATE = {
  user: {},
};

function smc(state = INIT_STATE, action) {
  switch (action.type) {
    case `${ActionTypes.READY}_SUC`: {
      return {
        ...state,
        user: {
          ...action.response.data,
        },
      };
    }
    default:
      return state;
  }
}


export default combineReducers({ smc });
