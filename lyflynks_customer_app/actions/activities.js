import { activities } from '../api/LyfLynks_API';

export const UPCOMING_ACTIVITIES = 'UPCOMING_ACTIVITIES';
export const UPCOMING_ACTIVITIES_SUCCESS = 'UPCOMING_ACTIVITIES_SUCCESS';
export const UPCOMING_ACTIVITIES_FAILURE = 'UPCOMING_ACTIVITIES_FAILURE';

export const COMPLETED_ACTIVITIES = 'COMPLETED_ACTIVITIES';
export const COMPLETED_ACTIVITIES_SUCCESS = 'COMPLETED_ACTIVITIES_SUCCESS';
export const COMPLETED_ACTIVITIES_FAILURE = 'COMPLETED_ACTIVITIES_FAILURE';

export function upcoming(data, token) {
  return async (dispatch) => {
    dispatch(activitiesUpcoming());
    try {
      dispatch(activitiesUpcomingSuccess(
        await activities.upcoming(data, token)
      ));
    } catch (err) {
      dispatch(activitiesUpcomingFailure(err));
    }
  }
}

export function completed(data, token) {
  return async (dispatch) => {
    dispatch(activitiesCompleted());
    try {
      dispatch(activitiesCompletedSuccess(
        await activities.completed(data, token)
      ));
    } catch (err) {
      dispatch(activitiesCompletedFailure(err));
    }
  }
}

function actvitiesUpcoming() {
  return { type: UPCOMING_ACTIVITIES };
}

function actvitiesUpcomingSuccess(data) {
  return { type: UPCOMING_ACTIVITIES_SUCCESS, data };
}

function activitiesUpcomingFailure(error) {
  return { type: UPCOMING_ACTIVITIES_FAILURE, error };
}

function actvitiesCompleted() {
  return { type: COMPLETED_ACTIVITIES };
}

function actvitiesCompletedSuccess(data) {
  return { type: COMPLETED_ACTIVITIES_SUCCESS, data };
}

function activitiesCompletedFailure(error) {
  return { type: COMPLETED_ACTIVITIES_FAILURE, error };
}
