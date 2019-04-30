import * as ACTypes from '../const/ActionTypes';

export const acQueryMemberList = ({ ownId }) => ({
  API: {
    type: ACTypes.QUERY_MEMBER_LIST,
    endpoint: '/api/query_member_list',
    params: {
      ownId,
    },
  },
});

export const acUpdateOneMember = ({ ownId, targetMemberData }) => ({
  API: {
    type: ACTypes.UPDATE_ONE_MEMBER,
    endpoint: '/api/update_one_member',
    params: {
      ownId, targetMemberData,
    },
  },
});

export const acDeleteOneMember = ({ ownId, targetId }) => ({
  API: {
    type: ACTypes.DELETE_ONE_MEMBER,
    endpoint: '/api/delete_one_member',
    params: {
      ownId, targetId,
    },
    targetId,
  },
});
