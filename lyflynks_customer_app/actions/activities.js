import { activities } from '../api/LyfLynks_API';

export const UPCOMING_ACTIVITIES = 'UPCOMING_ACTIVITIES';
export const UPCOMING_ACTIVITIES_SUCCESS = 'UPCOMING_ACTIVITIES_SUCCESS';
export const UPCOMING_ACTIVITIES_FAILURE = 'UPCOMING_ACTIVITIES_FAILURE';

export const COMPLETED_ACTIVITIES = 'COMPLETED_ACTIVITIES';
export const COMPLETED_ACTIVITIES_SUCCESS = 'COMPLETED_ACTIVITIES_SUCCESS';
export const COMPLETED_ACTIVITIES_FAILURE = 'COMPLETED_ACTIVITIES_FAILURE';
export const ALERT_ACTIVITIES = 'ALERT_ACTIVITIES';
export const ALERT_ACTIVITIES_SUCCESS = 'ALERT_ACTIVITIES_SUCCESS';
export const ALERT_ACTIVITIES_FAILURE = 'export const ALERT_ACTIVITIES_FAILURE';

export function upcoming(params, token) {
  return async (dispatch) => {
    dispatch(activitiesUpcoming());
    try {
      dispatch(activitiesUpcomingSuccess(
        await activities.upcoming(params, token)
      ));
    } catch (err) {
      dispatch(activitiesUpcomingFailure(err));
    }
  }
}

export function completed(params, token) {
  return async (dispatch) => {
    dispatch(activitiesCompleted());
    try {
      dispatch(activitiesCompletedSuccess(
        await activities.completed(params, token)
      ));
    } catch (err) {
      dispatch(activitiesCompletedFailure(err));
    }
  }
}

export function alerts (params, token) {
  return async (dispatch) => {
   dispatch(activitiesAlerts());
    try {
      dispatch(activitiesAlertsSuccess(
        await activities.alerts(params, token)
      ))
    } catch (err) {
      dispatch(activitiesAlertsError(err));
    }
  }
}

function activitiesUpcoming() {
  return { type: UPCOMING_ACTIVITIES };
}

function activitiesUpcomingSuccess(data) {
  return { type: UPCOMING_ACTIVITIES_SUCCESS, data };
}

function activitiesUpcomingFailure(error) {
  return { type: UPCOMING_ACTIVITIES_FAILURE, error };
}

function activitiesCompleted() {
  return { type: COMPLETED_ACTIVITIES };
}

function activitiesCompletedSuccess(data) {
  return { type: COMPLETED_ACTIVITIES_SUCCESS, data };
}

function activitiesCompletedFailure(error) {
  return { type: COMPLETED_ACTIVITIES_FAILURE, error };
}

function activitiesAlerts () {
  return { type: ALERT_ACTIVITIES };
}

function activitiesAlertsSuccess (data) {
  console.log('activity alerts sucess')
  // return { type: ALERT_ACTIVITIES_SUCCESS, data };
}

function activitiesAlertsError (error) {
  console.log('activities alerts error', error)
  // return { type: ALERT_ACTIVITIES_FAILURE, error };
}