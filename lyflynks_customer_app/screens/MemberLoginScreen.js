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
import { member } from '../actions/auth';

@connect(store => {
  const {member, username, password, isFetching, error} = store.auth;
  return {member, username, password, isFetching, error}
})
export default class MemberLogin extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.member.success && !this.props.member.success) {
      this.props.navigation.navigate('MemberAccountLogin');
    }
  }

  navToLoginHelpScreen = () => {
    this.props.navigation.navigate('LoginHelp');
  }

  logIn = () => {
    const { dispatch, username, password } = this.props;
    dispatch(member({ username, password }));
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <LyfLynks_Logo style={styles.logo} />
        <LoginForm logIn={this.logIn} />
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
