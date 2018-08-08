import React, { Component } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button as ReactButton } from "react-native-elements";
import { connect } from "react-redux";

import LoginForm from "../components/LoginForm";
import LyfLynks_Logo from "../components/LyfLynks_Logo";
import { member } from "../actions/auth";

@connect(store => {
  const { member, username, password, isFetching, error } = store.auth;
  return { member, username, password, isFetching, error };
})
export default class MemberLogin extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.member.success && !this.props.member.success) {
      if (nextProps.member.success && nextProps.member.data.newUser) {
        this.props.navigation.navigate("NewMemberWizard");
      } else {
        this.props.navigation.navigate("MemberAccountLogin");
      }
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
        <Text style={styles.errorMessage}>{this.props.error.message}</Text>
        <Text style={styles.loginHelpText} onPress={this.navToLoginHelpScreen}>
          Help me log in
        </Text>
        <View style={styles.signupContainer}>
          <Text style={styles.signUpText}>
            Interested in joining the Lyflynks{"\n"}
            community and spending more{"\n"}
            meaningful time with your aging family{"\n"} members?
          </Text>
          <ReactButton
            raised
            title="Sign Up for a New Account"
            containerViewStyle={styles.signupButton}
            backgroundColor="#00A68C"
            containerViewStyle={styles.inviteButton}
            onPress={() => this.props.navigation.navigate("Signup")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    alignSelf: "center"
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 0
  },
  signupContainer: {
    marginTop: 40,
    marginBottom: 10,
    alignItems: "center"
  },
  signUpText: {
    textAlign: "center",
    marginBottom: 20
  },
  signupButton: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    width: 180
  },
  logo: {
    height: 100,
    width: 200,
    bottom: 40
  },
  loginHelpText: {
    marginTop: 20,
    color: "#359"
  }
});