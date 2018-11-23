import * as React from "react";
import { Provider } from "react-redux";
import { AsyncStorage, Platform ,Alert, BackHandler } from "react-native";
// import configureStore from "./store";
import NavigatorService from "./navigationService";
import Navigation from "./routes";

import FCM, {  FCMEvent } from "react-native-fcm";

import {YellowBox} from 'react-native';

export default class LyfLynks_App extends React.Component {

  constructor(props: any) {
    YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
    super(props);
  }

  async componentDidMount() { 
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('Back Pressed');
    });

    try {
      let result = await FCM.requestPermissions();
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
    // const store = configureStore(); 
    return (
      <Provider store={this.props.store}>
        <Navigation
          ref={navigatorRef => {
            NavigatorService.setContainer(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}