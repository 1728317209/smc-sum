import * as ACTypes from '../const/ActionTypes';

export default function member(state = {
  isQuerying: false,
  isUpdating: false,
  isDeleting: false,
  memberList: [],
}, action) {
  switch (action.type) {
    case `${ACTypes.QUERY_MEMBER_LIST}_REQ`: {
      return {
        ...state,
        isQuerying: true,
      };
    }
    case `${ACTypes.QUERY_MEMBER_LIST}_SUC`: {
      const { memberList } = action.response.data;
      return {
        ...state,
        isQuerying: false,
        memberList,
      };
    }
    case `${ACTypes.QUERY_MEMBER_LIST}_FAI`: {
      return {
        ...state,
        isQuerying: false,
      };
    }
    case `${ACTypes.UPDATE_ONE_MEMBER}_REQ`: {
      return {
        ...state,
        isUpdating: true,
      };
    }
    case `${ACTypes.UPDATE_ONE_MEMBER}_SUC`: {
      const newData = action.response.data;
      const { memberList } = state;
      const newList = memberList.filter(item => item.id !== newData.id);
      return {
        ...state,
        isUpdating: false,
        memberList: [
          { ...newData },
          ...newList,
        ],
      };
    }
    case `${ACTypes.UPDATE_ONE_MEMBER}_FAI`: {
      return {
        ...state,
        isUpdating: false,
      };
    }
    case `${ACTypes.DELETE_ONE_MEMBER}_REQ`: {
      return {
        ...state,
        isDeleting: true,
      };
    }
    case `${ACTypes.DELETE_ONE_MEMBER}_SUC`: {
      const { deletedId } = action.response.data;
      console.log('TCL: action', deletedId);
      const { memberList } = state;
      const newList = memberList.filter(item => item.id !== deletedId);
      return {
        ...state,
        isDeleting: false,
        memberList: newList,
      };
    }
    case `${ACTypes.DELETE_ONE_MEMBER}_FAI`: {
      return {
        ...state,
        isDeleting: false,
      };
    }
    default:
      return state;
  }
}
