import React, { Component } from 'react';
import { Button } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator,
 } from 'react-navigation';

import MemberLoginScreen from '../screens/MemberLoginScreen';
import MemberAccountLoginScreen from '../screens/MemberAccountLoginScreen';
import ActivitiesUpcomingScreen from '../screens/ActivitiesUpcomingScreen';
import ActivitiesCompletedScreen from '../screens/ActivitiesCompletedScreen';
import ActivitiesAlertsScreen from '../screens/ActivitiesAlertsScreen';
import LoginHelpScreen from '../screens/LoginHelpScreen';
import MemberInviteScreen from '../screens/MemberInviteScreen';
import NewMemberWizard from '../screens/NewMemberWizard';
import SignupScreen from "../screens/SignupScreen";

export const ActivityLog = TabNavigator({
    Upcoming: {
      screen: ActivitiesUpcomingScreen
    },
    Completed: {
      screen: ActivitiesCompletedScreen
    },
    Alerts: {
      screen: ActivitiesAlertsScreen,
    },
  },
    {
      tabBarPosition: 'top', 
      tabBarOptions: {
        indicatorStyle: { backgroundColor: '#0E3A53', },
        labelStyle: {
          fontSize: 14,
          color: '#fff',
        },
        style: {
          backgroundColor: '#00a68c',
        },
      },
    order: ['Upcoming', 'Completed', 'Alerts'],
    animationEnabled: true,
});


const DrawerStack = DrawerNavigator({
  Activities: { 
    screen: ActivityLog,
    navigationOptions: {
    title: 'Activity Log',
    }, 
  },
  MemberInvite: { 
    screen: MemberInviteScreen, 
    navigationOptions: {
      title: 'Invite Member',
    },
  },
  NewMemberWizard: { 
    screen: NewMemberWizard, 
    navigationOptions: {
      title: 'New Member Wizard',
    },
  },
})

const Navigation = StackNavigator(
  {
    // MemberLogin: {
    //   screen: MemberLoginScreen,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        header: null
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
    }
  },
  {
    headerMode: "screen"
  }
);

export default Navigation;
