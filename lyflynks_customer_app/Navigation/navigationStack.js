import React, { Component } from "react";
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from "react-navigation";
import MemberLoginScreen from "../screens/MemberLoginScreen";
import MemberAccountLoginScreen from "../screens/MemberAccountLoginScreen";
import ActivitiesUpcomingScreen from "../screens/ActivitiesUpcomingScreen";
import ActivitiesCompletedScreen from "../screens/ActivitiesCompletedScreen";
import ActivityLogScreen from "../screens/ActivityLogScreen";
import LoginHelpScreen from "../screens/LoginHelpScreen";
import SignupScreen from "../screens/SignupScreen";
import { SignupComplete } from "../components/Signup Forms/SignupComplete/SignupComplete";
import { InviteOthersForm } from "../components/Signup Forms/InviteOthersForm/InviteOthersForm";
import NewMemberWizardScreen from '../screens/NewMemberWizard';
import MemberInviteScreen from '../screens/MemberInviteScreen';

export const ActivityLog = TabNavigator(
  {
    Upcoming: {
      screen: ActivitiesUpcomingScreen
    },
    Completed: {
      screen: ActivitiesCompletedScreen
    }
  },
  {
    order: ["Upcoming", "Completed"],
    animationEnabled: true
  }
);

const DrawerStack = DrawerNavigator({
  Activities: { 
    screen: ActivityLog,
    navigationOptions: {
      title: 'Activity Log',
      headerTitleStyle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "600"
      }
    }, 
  },
  MemberInvite: { 
    screen: MemberInviteScreen, 
    navigationOptions: {
      title: 'Invite Member',
        headerTitleStyle: {
          color: "#fff",
          fontSize: 24,
          fontWeight: "600"
        }
    },
  },
})

const Navigation = StackNavigator(
  {
    MemberLogin: {
      screen: MemberLoginScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    Signup: {
      screen: SignupScreen,
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
      screen: MemberAccountLoginScreen
    },
    ActivityLog: {
      screen: DrawerStack,
      navigationOptions: {
        headerStyle: {
          marginTop: Platform.OS === 'android' ? 24 : 0,
          backgroundColor: '#0E3A53',
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
    ActivityLogScreen: {
      screen: ActivityLogScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    NewMemberWizard: { 
      screen: NewMemberWizardScreen, 
      navigationOptions: {
        title: 'New Member Wizard',
        headerLeft: null,
        headerStyle: {
          marginTop: Platform.OS === 'android' ? 24 : 0,
          backgroundColor: '#0E3A53',
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
      },
    },
  },
  {
    headerMode: "screen",
    initialRouteName: 'ActivityLogScreen',
  }
);


export default Navigation;
