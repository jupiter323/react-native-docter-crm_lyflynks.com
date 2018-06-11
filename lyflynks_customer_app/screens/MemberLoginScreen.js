import React, { Component } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";

import { connect } from "react-redux";

import LoginForm from "../components/LoginForm";
import LyfLynks_Logo from "../components/LyfLynks_Logo";
import { member } from "../actions/auth";
import { Button } from "../components/UI";

@connect(store => {
  const { member, username, password, isFetching, error } = store.auth;
  return { member, username, password, isFetching, error };
})
export default class MemberLogin extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.member.success && !this.props.member.success) {
      this.props.navigation.navigate("MemberAccountLogin");
    }
  }

  navToLoginHelpScreen = () => {
    this.props.navigation.navigate("LoginHelp");
  };

  logIn = () => {
    const { dispatch, username, password } = this.props;
    dispatch(member({ username, password }));
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LyfLynks_Logo style={styles.logo} />
        <LoginForm logIn={this.logIn} />
        <Text style={styles.loginHelpText} onPress={this.navToLoginHelpScreen}>
          Help me log in
        </Text>
        <View style={styles.signupContainer}>
          <Text style={{ textAlign: "center" }}>
            Interested in joining the Lyflynks{"\n"}community and spending more{
              "\n"
            }meaningful time with your aging family{"\n"} members?
          </Text>
          <Button
            style={styles.signupButton}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Signup
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 0
  },
  signupContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  signupButton: {
    borderRadius: 5,
    width: 150,
    marginTop: 20
  },
  logo: {
    height: 100,
    width: 100,
    bottom: 40
  },
  loginHelpText: {
    marginTop: 20,
    color: "#359"
  }
});
