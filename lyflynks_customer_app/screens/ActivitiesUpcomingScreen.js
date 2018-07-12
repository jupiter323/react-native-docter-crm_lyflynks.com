import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationActions
 } from 'react-navigation';

import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ACtivitiesTimeline from '../components/ActivityLogTimeline'
import { connect } from 'react-redux';
import { upcoming } from '../actions/activities';
import { memberLogout } from '../actions/auth';

import Moment from 'moment';

@connect(store => {
  const { upcoming, isFetching, error } = store.activities;
  const { member_account } = store.auth;
  return { member_account, upcoming, isFetching, error };
})
export default class ActivitiesUpcoming extends Component {
  componentDidMount() {
    const { dispatch, member_account } = this.props;
    const token = member_account.data;

    dispatch(upcoming({
      limit: 15,
    }, token));
  }

  render() {

    return (
      // TODO: on scroll, dispatch request for next page of activities
      // append new page to old page
      <View>
        <ACtivitiesTimeline  />
      </View>
    );
  }
}


const styles = {
  headerDrawerButton: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20,
  },
  headerSettingsButton: {
    color: '#fff',
    fontSize: 24,
    marginRight: 20,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f9',
    padding: 20,
  },
  card: {
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 25,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.11,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowColor: '#000',
  },
  activityStatus(status) {
    let color;
    switch(status) {
      case 'requested':
        color = '#2196F3';
        break;
      case 'in progress':
        color = 'yellow';
        break;
      case 'scheduled':
        color = 'green';
        break;
    }

    return {
      position: 'absolute',
      color,
      right: 20,
      top: 15,
      fontSize: 14,
      fontWeight: '700',
    }
  },
  activityWhen: {
    position: 'absolute',
    fontSize: 14,
    color: '#9090a5',
    top: 15,
    left: 20,
  },
  activityForWhoLabel: {
    fontSize: 14,
    color: '#334',
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 20,
  },
  activityForWho: {
    fontSize: 20,
    color: '#002',
    fontWeight: '200',
    letterSpacing: 0.5,
    marginTop: 5,
  },
  activityWho: {
    fontSize: 20,
    color: '#002',
    fontWeight: '200',
    letterSpacing: 0.5,
    marginTop: 5,
  },
  activityType: {
    fontSize: 14,
    color: '#334',
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 35,
  },
}
