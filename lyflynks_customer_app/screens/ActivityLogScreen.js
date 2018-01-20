import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { upcoming, completed } from '../actions/activities';

@connect(store => {
  const { } = store.activities;
  return {};
})
export default class ActivityLog extends Component {
  componentDidMount() {
    this.props.dispatch(upcoming({
      // data
    }, token));
  }

  render() {
    const { account_list } = this.props;
    let accountList;

    if (account_list.success) {
      accountList = account_list.data.map((account_id, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => this.logIn(account_id)}
          >
            <Text>{account_id}</Text>
          </TouchableOpacity>
        )
      });
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {accountList}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  card: {
    padding: 20,
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    marginTop: 30,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.11,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowColor: '#000',
  }
});
