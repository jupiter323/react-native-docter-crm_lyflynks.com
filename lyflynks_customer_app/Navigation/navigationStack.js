import React, { Component } from 'react';
import {
  StackNavigator,
  TabNavigator,
 } from 'react-navigation';

import MemberLoginScreen from '../screens/MemberLoginScreen';
import MemberAccountLoginScreen from '../screens/MemberAccountLoginScreen';
import ActivitiesUpcomingScreen from '../screens/ActivitiesUpcomingScreen';
import ActivitiesCompletedScreen from '../screens/ActivitiesCompletedScreen';
import LoginHelpScreen from '../screens/LoginHelpScreen';

export const ActivityLog = TabNavigator({
  Upcoming: {
    screen: ActivitiesUpcomingScreen,
  },
  Completed: {
    screen: ActivitiesCompletedScreen,
  },
}, {
  order: ['Upcoming', 'Completed'],
  animationEnabled: true,
});

const Navigation = StackNavigator(
  {
    MemberLogin: {
      screen: MemberLoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    LoginHelp: {
      screen: LoginHelpScreen,
    },
    MemberAccountLogin: {
      screen: MemberAccountLoginScreen,
    },
    ActivityLog: {
      screen: ActivityLog,
      navigationOptions: {
        title: 'Activity Log',
        headerLeft: null,
        headerStyle: {
          backgroundColor: '#2196F3',
          shadowRadius: 5,
          shadowOpacity: 0.11,
          shadowOffset: {
            height: 5,
            width: 0,
          },
          shadowColor: '#000',
        },
        headerTitleStyle: {
          color: '#fff',
          fontSize: 24,
          fontWeight: '600',
        },
      },
    },
  }, {
    headerMode: 'screen',
    initialRouteName:'MemberLogin',
  }
);


export default Navigation;
