export const GET_LIST_CALL_ORDER_UPCOMING = 'GET_LIST_CALL_ORDER_UPCOMING';
export const GET_LIST_CALL_ORDER_SUCCESS = 'GET_LIST_CALL_ORDER_SUCCES';
export const GET_LIST_CALL_ORDER_FAILURE = 'GET_LIST_CALL_ORDER_FAILURE';

export const  UPDATE_LIST_CALL_ORDER_FAILURE = 'UPDATE_LIST_CALL_ORDER_FAILURE';
export const  UPDATE_LIST_CALL_ORDER_SUCCESS = 'UPDATE_LIST_CALL_ORDER_SUCCESS';
export const  UPDATE_LIST_CALL_ORDER_UPCOMING = 'UPDATE_LIST_CALL_ORDER_UPCOMING';

export const REORDER_lIST = 'REORDER_lIST';

import accounts  from "apis/account";

export function getList (id ,token) {
  return async (dispatch) => {
    dispatch(listUpcoming());
    try {
      dispatch(callListSuccess(
        await accounts.getOrderCall(id, token)
      ));
    } catch (e) {
      dispatch(callListFailure(e));
    }
  }
}

export function updateList (id, token, list) {
  return async (dispatch) => {
    dispatch(updateListUpcoming());
    try {
      dispatch(updateListSuccess(
        await accounts.updateOrderCall(id, token, { member_ids: list})
      ))
    } catch (e) {
      dispatch(updateListFailure(e))
    }
  }
}

function listUpcoming () {
  return { type: GET_LIST_CALL_ORDER_UPCOMING };
}

function callListSuccess (data) {
  return { type: GET_LIST_CALL_ORDER_SUCCESS, data };
}

function callListFailure (err) {
  return {  type: GET_LIST_CALL_ORDER_FAILURE, err }
}

function updateListSuccess (list) {
  return  { type: UPDATE_LIST_CALL_ORDER_SUCCESS, list }
}

function updateListFailure (err) {
  return  { type: UPDATE_LIST_CALL_ORDER_FAILURE, err }
}
function updateListUpcoming () {
  return  { type: UPDATE_LIST_CALL_ORDER_UPCOMING }
}

export function reorderList (list) {
  return { type: REORDER_lIST, list }
}