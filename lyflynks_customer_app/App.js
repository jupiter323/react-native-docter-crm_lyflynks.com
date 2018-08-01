import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./store";
import { registerForPushNotifications } from "./services/pushNotifications";
import NavigatorService from "./Navigation/service/navigator";
import Navigation from "./Navigation/navigationStack";

export default class LyfLynks_App extends Component {
  componentDidMount() {
    registerForPushNotifications();
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
