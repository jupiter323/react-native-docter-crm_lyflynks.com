import React, { Component } from "react";
import { Provider } from "react-redux";
import { AsyncStorage, Platform } from "react-native";
import store from "./store";
import NavigatorService from "./Navigation/service/navigator";
import Navigation from "./Navigation/navigationStack";

import FCM, {  FCMEvent } from "react-native-fcm";


export default class LyfLynks_App extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    console.log('deviceToken from componentDidMount');  

    try {
      let result = await FCM.requestPermissions({
        badge: false,
        sound: true,
        alert: true
      });
      } catch (e) {
        console.error(e);
      }
      
      FCM.on(FCMEvent.RefreshToken, token => {
        console.log("Custom Refreshed Token", token)
      if (Platform.OS === "ios") {
        AsyncStorage.setItem('device_token', token);
      } 
      else {
         AsyncStorage.setItem('device_token', token);
      }
  });
  
    
    
    AsyncStorage.setItem('has_device_token_been_posted', 'false', (error) => console.log(error));

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
