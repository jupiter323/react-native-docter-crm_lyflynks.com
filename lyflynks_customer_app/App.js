import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./store";
import { registerForPushNotifications } from "./services/pushNotifications";
import NavigatorService from "./Navigation/service/navigator";
import Navigation from "./Navigation/navigationStack";

import { StackNavigator } from "react-navigation";
import FCM, { NotificationActionType } from "react-native-fcm";
import { registerKilledListener, registerAppListener } from "./Listeners";
import firebaseClient from "./FirebaseClient";

export default class LyfLynks_App extends Component {
  
  

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
