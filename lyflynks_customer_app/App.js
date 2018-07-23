import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import Expo, { Notifications } from "expo";
import { Alert, AppState } from "react-native";

import store from "./store";
import { registerForPushNotifications } from "./services/pushNotifications";
import NavigatorService from "./Navigation/service/navigator";
import Navigation from "./Navigation/navigationStack";

export default class LyfLynks_App extends Component {
  constructor() {
    super();
    this.state = { appState: AppState.currentState };
  }

  componentDidMount() {
    registerForPushNotifications();
    AppState.addEventListener("change", this.handleAppStateChange);
    Notifications.addListener(notification => {
      debugger;
      this.state.appState === "active"
        ? this.displayNotifications(notification)
        : this.displayNotifications(notification);
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
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

  handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
      //TODO call saveNotifications();
    }
    this.setState({ appState: nextAppState });
  };

  saveNotifications(notification) {}

  displayNotifications(notification) {
    debugger;
    const {
      data: { text },
      origin
    } = notification;

    if (origin === "received" && text) {
      Alert.alert("New", text, [{ text: "Ok" }]);
    }
  }
}
