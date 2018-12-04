import {
  ELDERS_SELECTED,
  TRANSPORTATION_DATE_UPDATED,
  ORIGIN_UPDATED,
  DESTINATION_UPDATED,
  SPECIAL_NEEDS_UPDATED,
  RIDE_ESTIMATE_UPDATED,
  REQUEST_TRANSPORTATION_SUCCESS,
  REQUEST_TRANSPORTATION_FAILURE,
  RESET_TRANSPORTATION,
  GET_HOUSEHOLD_ADDRESS_FAILURE,
  GET_HOUSEHOLD_ADDRESS_SUCCESS
} from './action';

import moment from 'moment';

const initialState = {
  transportationDate: new Date(),
  originCoordinates: null,
  originAddress: "",
  destinationCoordinates: null,
  destinationAddress: "",
  rideEstimate: null,
  specialNeedsRequired: false,
  selectedElders: [],
  rideSaved: false,
  household: null
};

export default function transportReducer(state = initialState, action) {
  switch (action.type) {
    case ELDERS_SELECTED:
      return {
        ...state,
        selectedElders: action.selectedElders
      }
    case TRANSPORTATION_DATE_UPDATED:
      return {
        ...state,
        transportationDate: action.transportationDate
      }
    case ORIGIN_UPDATED:
      return {
        ...state,
        originCoordinates: action.originCoordinates,
        originAddress: action.originAddress
      }
    case DESTINATION_UPDATED:
      return {
        ...state,
        destinationCoordinates: action.destinationCoordinates,
        destinationAddress: action.destinationAddress
      }
    case SPECIAL_NEEDS_UPDATED:
      return {
        ...state,
        specialNeedsRequired: action.specialNeedsRequired
      }
    case RIDE_ESTIMATE_UPDATED:
      return {
        ...state,
        rideEstimate: action.rideEstimate
      }
    case REQUEST_TRANSPORTATION_FAILURE:
      return {
        ...state,
        rideSaved: false
      }
    case REQUEST_TRANSPORTATION_SUCCESS:
      return {
        ...state,
        rideSaved: true
      }
    case GET_HOUSEHOLD_ADDRESS_FAILURE:
      return {
        ...state
      }
    case GET_HOUSEHOLD_ADDRESS_SUCCESS:
      return {
        ...state,
        household: action.data.data
      }
    case RESET_TRANSPORTATION:
      return initialState;
    default:
      return state
  }
}
