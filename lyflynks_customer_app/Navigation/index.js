import React, { Component } from "react";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import Navigation from "./navigationStack";

@connect(store => {
  return {
    isMember: store.auth.member.success,
    isMemberAccount: store.auth.member_account.success,
    navigationState: store.nav
  }
})
export default class AppNavigation extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigationState } = this.props;
    if (navigationState.loggedInState.index <= 1) {
      BackHandler.exitApp();
      return;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const {
      navigationState,
      dispatch,
      isMember,
      isMemberAccount,
    } = this.props;
    let state;

    if (isMember && !isMemberAccount) {
      state = navigationState.loggedOutState2;
    } else if (isMember && isMemberAccount) {
      state = navigationState.loggedInState;
    } else {
      state = navigationState.loggedOutState1;
    }

    return (
      <Navigation navigation={addNavigationHelpers({ dispatch, state })} />
    );
  }
}
