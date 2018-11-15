import { SHOW_MENU, HIDE_MENU, TOOGLE_MENU } from '../actions/menu';
const intialState = {
  isActiveMenu: false
}
export default function activitiesReducer(state = intialState, action) {
  switch (action.type) {
    case SHOW_MENU:
      return {
        ...state,
        isActiveMenu: true
      }
    case HIDE_MENU:
      return {
        ...state,
        isActiveMenu: false
      }
    case TOOGLE_MENU: {
      return {
        ...state,
        isActiveMenu: !state.isActiveMenu
      }
    }
    default:
      return state
  }
}