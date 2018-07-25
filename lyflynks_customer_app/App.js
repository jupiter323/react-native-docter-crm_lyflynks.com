import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import Expo, { Notifications } from "expo";
import { Alert, AppState } from "react-native";

import store from "./store";
import { registerForPushNotifications } from "./services/pushNotifications";
import NavigatorService from "./Navigation/service/navigator";
import Navigation from "./Navigation/navigationStack";
import { saveNotification } from "./actions/notifications";

export default class LyfLynks_App extends Component {
  componentDidMount() {
    registerForPushNotifications();
    Notifications.addListener(notification => {
      debugger;
      const {
        data: { text },
        origin
      } = notification;

      if (origin === "received" && text) {
        store.dispatch(saveNotification(notification));
        //Alert.alert("New", text, [{ text: "Ok" }]);
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

// const mapStateToProps = (state, ownProps) => {
//   debugger;
//   const { notifications } = state;
//   return {
//     notifications,
//     props: ownProps
//   };
// };
// export default connect(
//   mapStateToProps,
//   {
//     saveNotification
//   }
// )(Provider);

// handleAppStateChange = nextAppState => {
//   if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
//     //TODO call saveNotifications();
//   }
//   this.setState({ appState: nextAppState });
// };

// saveNotifications(notification) {}

// displayNotifications(notification) {
//   debugger;
//   const {
//     data: { text },
//     origin
//   } = notification;

//   if (origin === "received" && text) {
//     Alert.alert("New", text, [{ text: "Ok" }]);
//   }
// }
