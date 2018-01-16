import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

@connect(store => {
  return {};
})
export default class ActivityLog extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Activity Log</Text>
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
