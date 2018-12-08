import {
  GET_LIST_CALL_ORDER_SUCCESS,
  GET_LIST_CALL_ORDER_FAILURE,
  GET_LIST_CALL_ORDER_UPCOMING,
  UPDATE_LIST_CALL_ORDER_FAILURE,
  UPDATE_LIST_CALL_ORDER_SUCCESS,
  UPDATE_LIST_CALL_ORDER_UPCOMING,
  REORDER_lIST
} from './action';
const intialState = {
  isFetching: false,
  list: {
    data: [
      {
        ll_member: {
          fname: "Teodor",
          lname: "Milano"
        },
        roles: ["Elder", "Member"]
      },
      {
        ll_member: {
          fname: "deodor",
          lname: "nilano"
        },
        roles: ["Member"]
      },
      {
        ll_member: {
          fname: "Leonor",
          lname: "Dilano"
        },
        roles: ["Elder"]
      }
    ],
    success:1
  },
  error: false
}
export default function member_call(state = intialState, action) {
  switch (action.type) {
    case GET_LIST_CALL_ORDER_UPCOMING:
      return {
        ...state,
        isFetching: true
      }
    case GET_LIST_CALL_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.data
      }
    case GET_LIST_CALL_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case UPDATE_LIST_CALL_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case UPDATE_LIST_CALL_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }
    case UPDATE_LIST_CALL_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: true,
      }
    case REORDER_lIST:
      return {
        ...state,
        list: { ...state.list, data: action.list }
      }
    default:
      return state
  }
}