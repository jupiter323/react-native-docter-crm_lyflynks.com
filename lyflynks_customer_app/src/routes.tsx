import { Platform, Text, View } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { MemberLogin, SignUp, SignupComplete, NewMemberWizard, MemberAccountLogin, LoginHelpScreen, InviteOthersForm } from './modules/Auth';
import { ActivityLogScreen, MainMenuScreen } from './modules/Activity';
import { MemberInviteScreen } from './modules/Invite';
import { CheckInDetailsScreen, CheckInFormScreen } from './modules/CheckIn';
import { AccountCallOrder } from './modules/CallOrder';
import {
  SelectElders,
  TransportDateSelect,
  TransportationIntroScreen,
  TransportationPickup,
  TransportationDestination,
  TransportationEstimate,
  TransportationConfirmation
} from './modules/Transport';

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
    TransportationIntroScreen: {
      screen: TransportationIntroScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    SelectElders: {
      screen: SelectElders,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    TransportDateSelect: {
      screen: TransportDateSelect,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    TransportationPickup: {
      screen: TransportationPickup,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    TransportationDestination: {
      screen: TransportationDestination,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    TransportationEstimate: {
      screen: TransportationEstimate,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    TransportationConfirmation: {
      screen: TransportationConfirmation,
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
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "MemberLogin"
  }
);

export default Navigation;
