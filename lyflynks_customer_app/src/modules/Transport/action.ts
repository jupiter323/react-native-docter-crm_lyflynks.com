import { upcoming } from '../Activity/action'
import api from './api'

export const ELDERS_SELECTED = 'ELDERS_SELECTED';
export const TRANSPORTATION_DATE_UPDATED = 'TRANSPORTATION_DATE_UPDATED';
export const ORIGIN_UPDATED = 'ORIGIN_UPDATED';
export const DESTINATION_UPDATED = 'DESTINATION_UPDATED';
export const SPECIAL_NEEDS_UPDATED = 'SPECIAL_NEEDS_UPDATED';
export const RIDE_ESTIMATE_UPDATED = 'RIDE_ESTIMATE_UPDATED';
export const REQUEST_TRANSPORTATION_SUCCESS = 'REQUEST_TRANSPORTATION_SUCCESS';
export const REQUEST_TRANSPORTATION_FAILURE = 'REQUEST_TRANSPORTATION_FAILURE';
export const RESET_TRANSPORTATION = 'RESET_TRANSPORTATION';
export const GET_HOUSEHOLD_ADDRESS_SUCCESS = 'GET_HOUSEHOLD_ADDRESS_SUCCESS';
export const GET_HOUSEHOLD_ADDRESS_FAILURE = 'GET_HOUSEHOLD_ADDRESS_FAILURE';

export function eldersSelected(elders) {
  return dispatch => {
    dispatch(eldersSelectedAction(elders));
  }
}

export function transportationDateUpdated(newDate) {
  return dispatch => {
    dispatch(transportationDateUpdatedAction(newDate));
  }
}

export function originUpdated(coordinates, address) {
  return dispatch => {
    dispatch(originUpdatedAction(coordinates, address));
  }
}

export function destinationUpdated(coordinates, address) {
  return dispatch => {
    dispatch(destinationUpdatedAction(coordinates, address));
  }
}

export function specialNeedsUpdated(value) {
  return dispatch => {
    dispatch(specialNeedsUpdatedAction(value));
  }
}

export function rideEstimateUpdated(value) {
  return dispatch => {
    dispatch(rideEstimateUpdatedAction(value));
  }
}

export function requestTransportation(params, token) {
  return async (dispatch) => {
    try {
      let response = await requestTransportation(params, token)
      dispatch(requestTransportationSuccess(response));
      dispatch(upcoming({ limit: 15, }, token));

    } catch (err) {
      dispatch(requestTransportationFailure(err));
    }
  }
}

export function resetTransportation() {
  return dispatch => {
    dispatch(resetTransportationAction());
  }
}

export function getHouseholdAddress(token) {
  return async (dispatch) => {
    try {
      let response = await api.getHouseholdAddressApiCall(token);
      dispatch(getHouseholdAddressSuccess(response));
    } catch (err) {
      dispatch(getHouseholdAddressError(err));
    }
  }
}


function eldersSelectedAction(elders) {
  return  { type: ELDERS_SELECTED, selectedElders: elders }
}

function transportationDateUpdatedAction(newDate) {
  return  { type: TRANSPORTATION_DATE_UPDATED, transportationDate: newDate }
}

function originUpdatedAction(coordinates, address) {
  return  { type: ORIGIN_UPDATED, originCoordinates: coordinates, originAddress: address }
}

function destinationUpdatedAction(coordinates, address) {
  return  { type: DESTINATION_UPDATED, destinationCoordinates: coordinates, destinationAddress: address }
}

function specialNeedsUpdatedAction(value) {
  return  { type: SPECIAL_NEEDS_UPDATED, specialNeedsRequired: value }
}

function rideEstimateUpdatedAction(estimate) {
  return  { type: RIDE_ESTIMATE_UPDATED, rideEstimate: estimate }
}

function requestTransportationSuccess(data) {
  return { type: REQUEST_TRANSPORTATION_SUCCESS, data };
}

function requestTransportationFailure(error) {
  return { type: REQUEST_TRANSPORTATION_FAILURE, error };
}

function getHouseholdAddressSuccess(data) {
  return { type: GET_HOUSEHOLD_ADDRESS_SUCCESS, data };
}

function getHouseholdAddressError(error) {
  return { type: GET_HOUSEHOLD_ADDRESS_FAILURE, error };
}

function resetTransportationAction() {
  return  { type: RESET_TRANSPORTATION }
}
