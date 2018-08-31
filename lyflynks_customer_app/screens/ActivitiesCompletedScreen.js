import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from "react-native";
import { NavigationActions } from "react-navigation";

<<<<<<< HEAD
// import { FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";
import { completed } from "../actions/activities";
import { memberLogout } from "../actions/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome";
=======
import { FontAwesome } from '@expo/vector-icons';
import ActivitiesTimeline from '../components/ActivityLogTimeline'
import { connect } from 'react-redux';
import { completed } from '../actions/activities';
import { memberLogout } from '../actions/auth';
>>>>>>> develop

import Moment from "moment";

@connect(store => {
  const { completed, isFetching, error } = store.activities;
  const { member_account } = store.auth;
  return { member_account, completed, isFetching, error };
})
export default class ActivitiesCompleted extends Component {
  componentDidMount() {
    const { dispatch, member_account } = this.props;
    const token = member_account.data;
    dispatch(completed({
      limit: 3,
    }, token));
  }

  navigateToNofications() {
    this.props.navigation.navigate("Alerts");
  }
  _renderContent () {
    let { error, completed } = this.props
    if (completed.success) {
      return <ActivitiesTimeline data={completed.data}/>
    }
  }
  render() {
    return (
      // TODO: on scroll, dispatch request for next page of activities
      // append new page to old page
      <View>
        {
          // activities
          this._renderContent()
        }
      </View>
    );
  }
}

const styles = {
  headerActionsRight: {
    display: "flex",
    flexDirection: "row",
    flex: 0.2
  },
  headerDrawerButton: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 20
  },
  headerSettingsButton: {
    color: "#fff",
    fontSize: 24,
    marginRight: 20
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f9"
  },
  leftCol: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  rightCol: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 25,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.11,
    display: "flex",
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowColor: "#000"
  },
  cardView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch"
  },
  activityStatus(status) {
    let color;
    switch (status) {
      case "completed":
        color = "orange";
        break;
      case "cancelled":
        color = "red";
        break;
    }
    return {
      position: "absolute",
      color,
      right: 20,
      top: 15,
      fontSize: 14,
      fontWeight: "700"
    };
  },
  activityForWhoLabel: {
    fontSize: 14,
    color: "#334",
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 20
  },
  activityForWho: {
    fontSize: 18,
    color: "#0E3A53",
    fontWeight: "200",
    letterSpacing: 0.5,
    marginTop: 5
  },
  activityWho: {
    fontSize: 20,
    color: "#002",
    fontWeight: "200",
    letterSpacing: 0.5,
    marginTop: 5
  },
  activityType: {
    fontSize: 14,
    color: "#C5AE91",
    fontWeight: "900",
    letterSpacing: 1
  },
  activityWhen: {
    fontSize: 12,
    color: "#0E3A53"
  }
};
