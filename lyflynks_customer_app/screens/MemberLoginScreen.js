import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import LyfLynks_Logo from '../components/LyfLynks_Logo';

@connect(store => {
  const {member, isFetching, error} = store.auth;
  return {member, isFetching, error}
})
export default class MemberLogin extends Component {
  navToLoginHelpScreen = () => {
    this.props.navigation.dispatch({ type: 'LoginHelp' });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <LyfLynks_Logo style={styles.logo} />
        <LoginForm />
        <Text style={styles.loginHelpText} onPress={this.navToLoginHelpScreen}>Help me log in</Text>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 0,
  },
  logo: {
    height: 100,
    width: 100,
    bottom: 40,
  },
  loginHelpText: {
    marginTop: 20,
    color: '#359',
  }
});
