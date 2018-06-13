import {
  UPDATE_FORM_VALUE,
  UPDATE_ERROR_MESSAGE,
  UPDATE_PREFERRED_DAYS,
  UPDATE_PREFERRED_TIME,
  UPDATE_ACTIVITIES
} from "../actions/member_form";

export const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  primaryPhoneNumber: "",
  secondaryPhoneNumber: "",
  zipCode: "",
  role: "Primary Caregiver",
  preferredDays: {
    monday: { title: "Monday", selected: false },
    tuesday: { title: "Tuesday", selected: false },
    wednesday: { title: "Wednesday", selected: false },
    thursday: { title: "Thursday", selected: false },
    friday: { title: "Friday", selected: false },
    saturday: { title: "Saturday", selected: false },
    sunday: { title: "Sunday", selected: false }
  },
  preferredTime: {
    morning: { title: "Morning", selected: false },
    earlyAfternoon: { title: "Early Afternoon", selected: false },
    evening: { title: "Evening", selected: false }
  },
  activities: {
    transportation: { title: "Transportation", selected: false},
    checkins: { title: "Checkins", selected: false},
    medicalScheduling: { title: "Medical Scheduling", selected: false}
  },
  errors: {
    firstNameErrorMessage: true,
    lastNameErrorMessage: "",
    userNameErrorMessage: "",
    emailErrorMessage: "",
    primaryPhoneNumberErrorMessage: "",
    zipCodeErrorMessage: ""
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FORM_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case UPDATE_ERROR_MESSAGE:
      const errors = {
        ...state.errors,
        [action.payload.prop]: action.payload.value
      };
      return { ...state, errors };
    case UPDATE_PREFERRED_DAYS:
      const dayToEdit = state.preferredDays[action.payload.key];
      const updatedDay = { ...dayToEdit, selected: action.payload.selected };
      const updatedPreferredDays = {
        ...state.preferredDays,
        [action.payload.key]: updatedDay
      };
      return { ...state, preferredDays: updatedPreferredDays };
    case UPDATE_PREFERRED_TIME:
      const timeToEdit = state.preferredTime[action.payload.key];
      const updatedTime = { ...timeToEdit, selected: action.payload.selected };
      const updatedpreferredTime = {
        ...state.preferredTime,
        [action.payload.key]: updatedTime
      };
      return { ...state, preferredTime: updatedpreferredTime };
    case UPDATE_ACTIVITIES:
      debugger;
      const activityToEdit = state.activities[action.payload.key];
      const updatedActivity = { ...activityToEdit, selected: action.payload.selected };
      const updatedActivities = {
        ...state.activities,
        [action.payload.key]: updatedActivity
      };
      return { ...state, activities: updatedActivities };
    default:
      return state;
  }
};
