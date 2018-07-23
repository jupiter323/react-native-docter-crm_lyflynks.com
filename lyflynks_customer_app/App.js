import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import Expo, { Notifications } from "expo";
import { Alert } from "react-native";

import store from "./store";
import registerForNotifications from "./services/pushNotifications";
import NavigatorService from "./Navigation/service/navigator";
import Navigation from "./Navigation/navigationStack";

export default class LyfLynks_App extends Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      debugger;
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
        <Navigation
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
