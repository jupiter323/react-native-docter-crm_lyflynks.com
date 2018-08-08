import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from "react-native";

// import { FontAwesome } from "@expo/vector-icons";
import NavigatorService from "../Navigation/service/navigator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import _ from "lodash";
import { connect } from "react-redux";
import { completed } from "../actions/activities";

import { NavigationEvents } from "react-navigation";
import Moment from "moment";

@connect(store => {
  const { completed, isFetching, error } = store.activities;
  const { member_account } = store.auth;
  const { notifications } = store;
  return { member_account, completed, isFetching, error, notifications };
})
export default class ActivitiesAlertsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: "Alerts",
    headerLeft: (
      <TouchableOpacity onPress={() => this.navigateScreen()}>
        <FontAwesome style={{ marginLeft: 15, color: "#fff" }} name={"bars"} size={25} />
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

  constructor() {
    super();
    this.state = { expand: false };
  }

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
    navigateScreen = () => {
      NavigatorService.navigate("DrawerToggle");
    };
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.notificationContainer}>
          <View style={styles.leftContainer}>
            <FontAwesome name="user-plus" size={30} color="white" />
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.activityAlertDescription}> A new member invited </Text>
              <FontAwesome name="times" size={15} color="grey" style={styles.dismiss} />
            </View>
            <Text style={styles.activityWhen}>Detained Info Here</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View style={styles.leftContainer}>
            <FontAwesome name="user-plus" size={30} color="white" />
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.activityAlertDescription}> A new member invited </Text>
              <FontAwesome name="times" size={15} color="grey" style={styles.dismiss} />
            </View>
            <Text style={styles.activityWhen}>Detained Info Here</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = {
  headerActionsRight: {
    display: "flex",
    flexDirection: "row",
    flex: 0.2
  },
  notificationContainer: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    marginBottom: 25,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  leftContainer: {
    flex: 0.2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a68c"
  },
  rightContainer: {
    flex: 0.8,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  cardHeader: {
    flexDirection: "row"
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f9",
    padding: 20
  },
  cardFolded: {
    height: 100
  },
  cardExpanded: {
    height: 200
  },
  dismiss: { flex: 0.1, marginTop: 10 },
  activityAlertDescription: {
    fontWeight: "700",
    fontSize: 16,
    flex: 0.9,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 7
  },
  activityWhen: {
    color: "#AFB1B4",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 10
  }
};
