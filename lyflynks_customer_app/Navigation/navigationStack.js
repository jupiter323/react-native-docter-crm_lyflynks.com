import { StackNavigator } from 'react-navigation';

import MemberLoginScreen from '../screens/MemberLoginScreen';
import MemberAccountLoginScreen from '../screens/MemberAccountLoginScreen';
import ActivityLogScreen from '../screens/ActivityLogScreen';
import LoginHelpScreen from '../screens/LoginHelpScreen';

const Navigation = StackNavigator(
  {
    LoginHelp: {
      screen: LoginHelpScreen,
    },
    MemberLogin: {
      screen: MemberLoginScreen,
    },
    MemberAccountLogin: {
      screen: MemberAccountLoginScreen,
    },
    ActivityLog: {
      screen: ActivityLogScreen,
    }
  }, {
    headerMode: 'none',
  }
);

export default Navigation;
