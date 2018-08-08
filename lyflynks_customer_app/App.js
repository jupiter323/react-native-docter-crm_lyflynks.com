import React, { Component } from "react";
import { Provider } from "react-redux";
import { AsyncStorage, Platform } from "react-native";
import store from "./store";
import NavigatorService from "./Navigation/service/navigator";
import Navigation from "./Navigation/navigationStack";

import { StackNavigator } from "react-navigation";

import FCM, { NotificationActionType } from "react-native-fcm";


export default class LyfLynks_App extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let currentToken;
    if (Platform.OS === "ios") {
      currentToken = await FCM.getAPNSToken();
    } else {
      currentToken = await FCM.getFCMToken();
    }
    const deviceToken = await AsyncStorage.getItem('device_token');
    console.log('deviceToken', deviceToken);
    if(deviceToken == null || deviceToken != currentToken ){
      console.log(0);
      AsyncStorage.setItem('device_token', currentToken);
      AsyncStorage.setItem('has_device_token_been_posted', 'false', (error) => console.log(error));
    }
    try {
    let result = await FCM.requestPermissions({
      badge: false,
      sound: true,
      alert: true
    });
    } catch (e) {
      console.error(e);
    }
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
