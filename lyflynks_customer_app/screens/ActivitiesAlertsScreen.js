import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import NavigatorService from "../Navigation/service/navigator";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import { completed } from "../actions/activities";

import Moment from "moment";
import { AlertCard } from "../components/AlertCard";

@connect(store => {
  const { completed, isFetching, error } = store.activities;
  const { member_account } = store.auth;
  return { member_account, completed, isFetching, error };
})
export default class ActivitiesAlertsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: "Alerts",
    headerLeft: (
      <TouchableOpacity onPress={() => this.navigateScreen()}>
        <Icon style={{ marginLeft: 15, color: "#fff" }} name={"bars"} size={25} />
      </TouchableOpacity>
    )
  });

  constructor() {
    super();
    this.state = { expand: false };
  }

  componentDidMount() {
    const { dispatch, member_account } = this.props;
    const token = member_account.data;

    dispatch(
      completed(
        {
          limit: 3
        },
        token
      )
    );
  }

  expandCard() {
    this.setState(prevState => {
      return { expand: !prevState.expand };
    });
  }

  render() {
    navigateScreen = () => {
      NavigatorService.navigate("DrawerToggle");
    };
    const { alerts } = this.props;
    let activities;

    return (
      // TODO: on scroll, dispatch request for next page of activities
      // append new page to old page
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity key="1" style={this.state.expand ? styles.cardExpanded : styles.card}>
          <Text style={styles.activityAlertDescription}> A new member invited </Text>
          <Text style={styles.activityWhen}>
            <FontAwesome name="calendar-o" />
            <Text>12 may 2018, 8:30 pm</Text>
          </Text>
          <Button title="expand" onPress={this.expandCard.bind(this)} />
        </TouchableOpacity>

        <TouchableOpacity key="2" style={styles.card}>
          <Text style={styles.activityAlertDescription}> Billyj@gmail.com has joined your account </Text>
          <Text style={styles.activityWhen}>
            <FontAwesome name="calendar-o" />
            <Text>12 may 2018, 8:30 pm</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity key="3" style={styles.card}>
          <Text style={styles.activityAlertDescription}> Reminder to book an medical appointment </Text>
          <Text style={styles.activityWhen}>
            <FontAwesome name="calendar-o" />
            <Text>12 may 2018, 8:30 pm</Text>
          </Text>
        </TouchableOpacity>
        <AlertCard expand={false} />
      </ScrollView>
    );
  }
}

const styles = {
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
  card: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
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
  cardFolded: {
    height: 100
  },
  cardExpanded: {
    height: 200
  },
  activityAlertDescription: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10
  },
  activityWhen: {
    color: "#AFB1B4",
    fontSize: 14,
    textAlign: "right"
  }
};
