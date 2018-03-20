import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

@connect(store => {
  return {};
})
export default class LoginHelpScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Login Help',
    headerStyle: {
      backgroundColor: '#2196F3',
      shadowRadius: 5,
      shadowOpacity: 0.11,
      shadowOffset: {
        height: 5,
        width: 0,
      },
      shadowColor: '#000',
    },
    headerTitleStyle: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerLeft: <FontAwesome
      name={'chevron-left'}
      style={styles.headerBackButton}
      onPress={() => {
        navigation.goBack();
      }}/>,
  })

  render() {
    return (
      <View style={styles.container}>
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
  },
  headerBackButton: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20,
  }
});
