import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Alert,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { member, updateLoginForm } from '../actions/auth';

import colors from '../styles/colors';

@connect(store => {
  const { member, username, password } = store.auth;
  return { member, username, password };
})
export default class LoginForm extends Component {
  updateUsername = (username) => {
    this.props.dispatch(
      updateLoginForm(username, 'username')
    );
  }

  updatePassword = (password) => {
    this.props.dispatch(
      updateLoginForm(password, 'password')
    );
  }

  logIn = () => {
    const { dispatch, username, password } = this.props;
    dispatch(member({ username, password }));
  }

  render() {
    return (
      <View onLayout={this.navigateToNextPage}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.updateUsername}
            value={this.props.username}
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder='Username'
            placeholderTextColor='#bbc'
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='next'
          />

          <TextInput
            style={styles.textInput}
            onChangeText={this.updatePassword}
            value={this.props.password}
            ref={input => this.passwordInput = input}
            placeholder='Password'
            placeholderTextColor='#bbc'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            returnKeyType='go'
          />
        </View>

        <TouchableHighlight
          onPress={this.logIn}
          style={styles.buttonContainer}
          underlayColor={colors.buttonUnderlay}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        { /*
          TODO: Add a 'Help me log in' link to forgot_username/reset_password page
        */ }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  textInput: {
    ...colors.textInput,
    borderBottomWidth: 1,
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    marginLeft: 15,
    width: 270,
  },
  buttonContainer: {
    ...colors.button,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
    width: 300,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    shadowOpacity: 0.21,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});
