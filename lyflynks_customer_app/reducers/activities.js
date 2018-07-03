import {
  UPCOMING_ACTIVITIES,
  UPCOMING_ACTIVITIES_SUCCESS,
  UPCOMING_ACTIVITIES_FAILURE,
  COMPLETED_ACTIVITIES,
  COMPLETED_ACTIVITIES_SUCCESS,
  COMPLETED_ACTIVITIES_FAILURE,
} from '../actions/activities';

const initialState = {
  upcoming: {},
  completed: {},
  isFetching: false,
  error: {},
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

    default:
      return state;
  }
}
