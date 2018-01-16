import { NavigationActions } from 'react-navigation';
import Navigator from "../Navigation/navigationStack";

const loggedOutAction1 = Navigator.router.getActionForPathAndParams('MemberLogin');
const loggedOutState1 = Navigator.router.getStateForAction(loggedOutAction1);

const loggedOutAction2 = Navigator.router.getActionForPathAndParams('MemberAccountLogin');
const loggedOutState2 = Navigator.router.getStateForAction(loggedOutAction2);

const loggedInAction = Navigator.router.getActionForPathAndParams('ActivityLog');
const loggedInState = Navigator.router.getStateForAction(loggedInAction);

const LoginHelpAction = Navigator.router.getActionForPathAndParams('LoginHelp');
const LoginHelpState = Navigator.router.getStateForAction(LoginHelpAction);

const initialState = {
  loggedOutState1,
  loggedOutState2,
  loggedInState,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MemberLogin':
      return {
        ...state,
        loggedOutState1: Navigator.router.getStateForAction(
          loggedOutAction1,
          loggedOutState1
        )
      }

    case 'LoginHelp':
      return {
        ...state,
        loggedOutState1: Navigator.router.getStateForAction(
          LoginHelpAction,
          loggedOutState1,
        )
      }

    default:
      return {
        ...state,
        loggedInState: Navigator.router.getStateForAction(
          action,
          state.loggedInState
        )
      }
  }
}
