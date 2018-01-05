import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to LyfLynks</Text>
        <LoginForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
