import {
    UPCOMING_ACTIVITIES,
    UPCOMING_ACTIVITIES_SUCCESS,
    UPCOMING_ACTIVITIES_FAILURE,
    COMPLETED_ACTIVITIES,
    COMPLETED_ACTIVITIES_SUCCESS,
    COMPLETED_ACTIVITIES_FAILURE,
    ALERT_ACTIVITIES,
    ALERT_ACTIVITIES_SUCCESS,
    ALERT_ACTIVITIES_FAILURE
  } from './action';
  import { REMOVE_CHECKIN, CHECK_IN_ADDED } from '../CheckIn/action';
  
  const initialState = {
    upcoming: {},
    alerts: {
    },
    completed: {},
    isFetching: false,
    error: {},
    newAddedCheckIn: [],
  }
  
  export default function activitiesReducer(state = initialState, action) {
    switch (action.type) {
      case UPCOMING_ACTIVITIES:
        return {
          ...state,
          isFetching: true,
        }
  
      case UPCOMING_ACTIVITIES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          upcoming: action.data,
          error: {},
        }

      // case REMOVE_CHECKIN:
      
      
      case CHECK_IN_ADDED:
        return {
          ...state,
          newAddedCheckIn: [...state.newAddedCheckIn, { ...action.payload, type: 'check_in' }]
        }
  
      case UPCOMING_ACTIVITIES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.error,
        }
  
      case COMPLETED_ACTIVITIES:
        return {
          ...state,
          isFetching: true,
        }
  
      case COMPLETED_ACTIVITIES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          completed: action.data,
        }
  
      case COMPLETED_ACTIVITIES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.error,
        }
  
        case ALERT_ACTIVITIES:
          return {
            ...state,
            isFetching: true,
            error: {}
          }
        case ALERT_ACTIVITIES_SUCCESS:
          return {
            ...state,
            isFetching: false,
            error: {},
            alerts: action.data
          }
        case ALERT_ACTIVITIES_FAILURE:
          return {
            ...state,
            isFetching: false,
            error: action.error
          }
      default:
        return state;
    }
  }
  