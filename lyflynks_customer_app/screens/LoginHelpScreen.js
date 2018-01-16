import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

@connect(store => {
  return {};
})
export default class LoginHelpScreen extends Component {
  navBack = () => {
    this.props.navigation.dispatch({ type: 'LOGGED_OUT_1_BACK' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Back' onPress={this.navBack} />
        <Text style={styles.text}>Reset Password</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  }
});
