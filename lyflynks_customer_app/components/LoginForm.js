import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  signUp() { Alert.alert('Sign up successful!'); }
  logIn() { Alert.alert('Log in successful!'); }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signUp} style={styles.buttonContainer} >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.logIn} style={styles.buttonContainer} >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  buttonContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginTop: 10,
    borderRadius: 50
  },
  buttonText: {
    color: '#2196F3',
    textAlign: 'center'
  }
});
