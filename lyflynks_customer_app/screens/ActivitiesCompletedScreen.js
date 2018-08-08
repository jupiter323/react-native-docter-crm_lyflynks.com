import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from "react-native";
import { NavigationActions } from "react-navigation";

// import { FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";
import { completed } from "../actions/activities";
import { memberLogout } from "../actions/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Moment from "moment";

@connect(store => {
  const { completed, isFetching, error } = store.activities;
  const { member_account } = store.auth;
  return { member_account, completed, isFetching, error };
})
export default class ActivitiesCompleted extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: "Completed",
    tabBarOptions: {
      style: {
        backgroundColor: "black"
      }
    },
    headerRight: (
      <View style={styles.headerActionsRight}>
        <TouchableOpacity
          onPress={() => navigation.getParam("navigateToNofications")()}
          style={{ flex: 0.7, flexDirection: "row", marginRight: 30 }}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="bell" size={25} color="white" style={{ marginTop: 7 }} />
            <Text style={{ color: "white", marginLeft: -3 }}>2</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 0.3, marginRight: 10 }}>
          <TouchableOpacity onPress={() => this.logOut()}>
            <FontAwesome name="sign-out" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    )
  });

  componentDidMount() {
    const { dispatch, member_account } = this.props;
    const token = member_account.data;
    this.props.navigation.setParams({
      navigateToNofications: this.navigateToNofications.bind(this)
    });
    dispatch(
      completed(
        {
          limit: 3
        },
        token
      )
    );
  }

  navigateToNofications() {
    this.props.navigation.navigate("Alerts");
  }

  render() {
    const { completed, dispatch } = this.props;

    logOut = () => {
      dispatch(memberLogout());
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "MemberLogin"
          })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    };

    let activities;

    if (completed.success) {
      activities = completed.data.map((activity, index) => {
        const for_who =
          activity.type === "medical appointment" ? activity.for_who : activity.for_who;

        const who = activity.type === "medical appointment" ? activity.who : activity.who;

        const whenDate = Moment(activity.when).format("MMM D YYYY");
        const whenTime = Moment(activity.when).format("h:mm A");

        return (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.cardView}>
              <View style={styles.leftCol}>
                <Text style={styles.activityType}>{activity.type.toUpperCase()}</Text>
                <Text style={styles.activityForWho}>{for_who}</Text>
              </View>
              <View style={styles.rightCol}>
                <Text style={styles.activityWhen}>{whenDate}</Text>
                <Text style={styles.activityWhen}>{whenTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
          // <TouchableOpacity key={index} style={styles.card}>
          //   <Text style={styles.activityWhen}>
          //     <FontAwesome name='calendar-o'/> {when}
          //   </Text>
          //   <Text style={styles.activityStatus(activity.status)}>
          //     {activity.status.toUpperCase()}
          //   </Text>
          //   <Text style={styles.activityType}>{activity.type.toUpperCase()}</Text>
          //   <Text style={styles.activityWho}>{who}</Text>
          //   <Text style={styles.activityForWhoLabel}>MEMBERS</Text>
          //   <Text style={styles.activityForWho}>{for_who}</Text>
          // </TouchableOpacity>
        );
      });
    }

    return (
      // TODO: on scroll, dispatch request for next page of activities
      // append new page to old page
      <ScrollView contentContainerStyle={styles.container}>{activities}</ScrollView>
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
