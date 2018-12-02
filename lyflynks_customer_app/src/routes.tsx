import { Platform, Text, View } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { MemberLogin, SignUp, SignupComplete, NewMemberWizard, MemberAccountLogin, LoginHelpScreen, InviteOthersForm } from './modules/Auth';
import { ActivityLogScreen, MainMenuScreen } from './modules/Activity';
import { MemberInviteScreen } from './modules/Invite';
import { CheckInDetailsScreen, CheckInFormScreen } from './modules/CheckIn';
import { TransportationDetails, TransportationForm } from './modules/Transportation';
import { AccountCallOrder } from './modules/CallOrder';
import { MemberSettingsScreen } from './modules/MemberSettings';
import { AccountSettingsScreen, CreditCardForm } from './modules/AccountSettings';

import { Screen } from 'components/Screen';
import ResetPasswordForm from './modules/Auth/Signup Forms/ResetPasswordForm/ResetPasswordForm';
const Navigation = StackNavigator(
  {
    CheckInFormScreen: {
      screen: CheckInFormScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    MemberLogin: {
      screen: MemberLogin,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    Signup: {
      screen: SignUp,
      navigationOptions: {
        header: null
      }
    },
    SignUpComplete: {
      screen: SignupComplete,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    EmailInvite: {
      screen: InviteOthersForm,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    LoginHelp: {
      screen: LoginHelpScreen
    },
    MemberAccountLogin: {
      screen: MemberAccountLogin,
    },
    ActivityLogScreen: {
      screen: ActivityLogScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    MainMenuScreen: {
      screen: MainMenuScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    CheckInDetailsScreen: {
      screen: CheckInDetailsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    login: {
      screen: AccountCallOrder,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    logout: {
      screen: MemberLogin,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    MemberInvite: {
      screen: MemberInviteScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    NewMemberWizard: {
      screen: NewMemberWizard,
      navigationOptions: {
        title: "New Member Wizard",
        headerLeft: null,
        headerStyle: {
          marginTop: Platform.OS === "android" ? 24 : 0,
          backgroundColor: "#0E3A53",
          shadowRadius: 5,
          shadowOpacity: 0.11,
          shadowOffset: {
            height: 5,
            width: 0
          },
          shadowColor: "#000"
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 24,
          fontWeight: "600"
        }
      }
    },   
    MemberSettings: {
      screen: MemberSettingsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    AccountSettings: {
      screen: AccountSettingsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    CreditCardUpdate: {
      screen: CreditCardForm,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },     
    CallOrder: {
      screen: AccountCallOrder,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    ResetPassword: {
      screen: ResetPasswordForm,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    }, 
    TransportationDetailsScreen: {
      screen: TransportationDetails,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    TransportationFormScreen:{
      screen: TransportationForm,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }

    }

  },
  {
    headerMode: "screen",
    initialRouteName: "ActivityLogScreen"
  }
);

export default Navigation;
