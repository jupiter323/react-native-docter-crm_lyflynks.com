import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from "react-native";
import { NavigationActions } from "react-navigation";

// import { FontAwesome } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import { upcoming } from "../actions/activities";
import { memberLogout } from "../actions/auth";

import Moment from "moment";

@connect(store => {
  const { upcoming, isFetching, error } = store.activities;
  const { member_account } = store.auth;
  return { member_account, upcoming, isFetching, error };
})
export default class ActivitiesUpcoming extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: "Upcoming",
    tabBarOptions: {
      style: {
        backgroundColor: "black"
      }
    },
    headerLeft: (
      <TouchableOpacity onPress={() => this.toggleDrawer()} style={{ flex: 0.1 }}>
        <Icon style={{ marginLeft: 15, color: "#fff" }} name={"bars"} size={25} />
      </TouchableOpacity>
    ),
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

  componentDidUpdate(prevPros) {
    if (prevPros.unread != this.props.unread) {
      this.props.navigation.setParams({ unread: this.props.unread });
    }
  }

  componentDidMount() {
    const { dispatch, member_account, unread } = this.props;
    this.props.navigation.setParams({ unread });
    this.props.navigation.setParams({
      navigateToNofications: this.navigateToNofications.bind(this)
    });
    const token = member_account.data;

    dispatch(
      upcoming(
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
    const { upcoming, dispatch } = this.props;
    let activities;

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

    toggleDrawer = () => {
      this.props.navigation.navigate("DrawerToggle");
    };

    if (upcoming.success) {
      activities = upcoming.data.map((activity, index) => {
        const for_who =
          activity.type === "medical appointment" ? activity.for_who : activity.for_who.join("\n");

        const who =
          activity.type === "medical appointment" ? activity.who : activity.who.join("\n");

        const when =
          activity.when === "TBD" ? "Pending" : Moment(activity.when).format("MMM D YYYY, h:mm A");

        return (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.cardView}>
              <View style={styles.leftCol}>
                <Text style={styles.activityType}>{activity.type.toUpperCase()}</Text>
                <Text style={styles.activityForWho}>{who}</Text>
              </View>
              <Text style={styles.activityWhen}>{when}</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: "black",
    fontSize: 24,
    marginLeft: 20
  },
  headerSettingsButton: {
    color: "#fff",
    fontSize: 24,
    marginRight: 20
  },
  leftCol: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f9",
    padding: 20
  },
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 25,
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
      case "requested":
        color = "#2196F3";
        break;
      case "in progress":
        color = "yellow";
        break;
      case "scheduled":
        color = "green";
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
    fontSize: 13,
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
