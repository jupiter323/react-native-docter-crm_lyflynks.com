import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import NavigatorService from '../Navigation/service/navigator';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Upcoming',
    tabBarOptions: {
      style: {
         backgroundColor: 'black',
      }
    },
        headerLeft: (
          <TouchableOpacity onPress={() => this.navigateScreen()} >
            <Icon style={{ marginLeft:15,color:'#fff' }} name={'bars'} size={25} />
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => this.logOut()} >
            <Text style={{ marginRight:15,color:'#fff' }}>LOGOUT</Text>
          </TouchableOpacity>
        ),
  })



  componentDidMount() {
    const { dispatch, member_account } = this.props;
    const token = member_account.data;

    dispatch(upcoming({
      limit: 3,
    }, token));
  }

  render() {
    const token = this.props.member_account.data

    logOut = () => {
      const { dispatch } = this.props;
      NavigatorService.navigate('MemberLogin')
      dispatch(memberLogout(token));
    }

    navigateScreen = () => {
      NavigatorService.navigate('DrawerToggle')
    }
    const { upcoming } = this.props;
    let activities;

    if (upcoming.success) {
      activities = upcoming.data.map((activity, index) => {
        console.log(activity)
        const for_who = activity.type === 'medical appointment'
                        ? activity.for_who
                        : activity.for_who.join('\n')

        const who = activity.type === 'medical appointment'
                    ? activity.who
                    : activity.who.join('\n')

        const when = activity.when === 'TBD'
                     ? 'Pending'
                     : Moment(activity.when).format('MMM D YYYY, h:mm A');

        return (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.cardView}>
              <View style={styles.leftCol}>
                <Text style={styles.activityType}>{activity.type.toUpperCase()}</Text>
                <Text style={styles.activityForWho}>{who}</Text>
              </View>
              <Text style={styles.activityWhen}>
                {when}
              </Text>
            </View>
          </TouchableOpacity>
        )
      });
    }

    return (
      // TODO: on scroll, dispatch request for next page of activities
      // append new page to old page
      <ScrollView contentContainerStyle={styles.container}>
        {activities}
      </ScrollView>
    );
  }
}


const styles = {
  headerDrawerButton: {
    color: '#fff',
    backgroundColor: "black",
    fontSize: 24,
    marginLeft: 20,
  },
  headerSettingsButton: {
    color: '#fff',
    fontSize: 24,
    marginRight: 20,
  },
  leftCol: {
    width: '70%', 
    display: 'flex',
    flexDirection:'column', 
    justifyContent:'flex-start'
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f9',
    padding: 20,
  },
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 25,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.11,
    display: 'flex',
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowColor: '#000',
  },
  cardView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
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
  activityForWhoLabel: {
    fontSize: 13,
    color: '#334',
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 20,
  },
  activityForWho: {
    fontSize: 18,
    color: '#0E3A53',
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
    color: '#C5AE91',
    fontWeight: '900',
    letterSpacing: 1,
  },
  activityWhen: {
    fontSize: 12,
    color: '#0E3A53',
  }
}
