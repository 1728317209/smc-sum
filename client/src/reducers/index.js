import { combineReducers } from 'redux';
import auth from './auth';
import member from './member';

export default combineReducers({
  auth,
  member,
});
