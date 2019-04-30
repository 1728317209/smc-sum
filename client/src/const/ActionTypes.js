const authCT = type => `@auth/${type}`;

export const APP_LOGIN = authCT('APP_LOGIN');
export const LOCAL_APP_LOGIN = authCT('LOCAL_APP_LOGIN');
export const APP_LOGOUT = authCT('APP_LOGOUT');
export const APP_REGISTER = authCT('APP_REGISTER');


const memberCenterCT = type => `@memberCenter/${type}`;

export const QUERY_MEMBER_LIST = memberCenterCT('QUERY_MEMBER_LIST');
export const UPDATE_ONE_MEMBER = memberCenterCT('UPDATE_ONE_MEMBER');
export const DELETE_ONE_MEMBER = memberCenterCT('DELETE_ONE_MEMBER');

