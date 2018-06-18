import React, { Component } from "react";
import { Provider, connect, Alert } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import Expo, { Notifications } from "expo";

import Navigation from "./Navigation/navigationStack";
import store from "./store";
import registerForNotifications from "./services/pushNotifications";

export default class LyfLynks_App extends Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      const {
        data: { text },
        origin
      } = notification;
      if (origin === "received" && text) {
        Alert.alert("New", text, [{ text: "Ok" }]);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
