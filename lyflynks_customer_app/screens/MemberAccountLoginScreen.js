import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { Input, Button } from "../components/UI";
import { list } from '../actions/members_accounts';
import { member_account } from '../actions/auth';

@connect(store => {
  const { member, member_account, username, password } = store.auth;
  const { account_list, isFetching, error } = store.members_accounts;
  return {
    member,
    member_account,
    account_list,
    isFetching,
    error,
    username,
    password
  }
})
export default class MemberAccountLogin extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Select Account',
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
      fontWeight: '600',
    },
    headerLeft: null,
  })

  componentWillReceiveProps(nextProps) {
    if (nextProps.member_account.success) {
      this.props.navigation.navigate('ActivityLogScreen');
    }
  }

  componentDidMount() {
    const { dispatch, member } = this.props;
    const token = member.data;

    if (token) dispatch(list(token));
  }

  logIn = (account_id) => {
    const { dispatch, username, password, member } = this.props;
    const token = member.data;

    dispatch(member_account({
      username,
      password,
      account_id,
    }, token))
  }

  // TODO:
  // Get names of seniors on member's accounts to display
  // Needs new route to get seniors' names for accounts
  // Check memberId is associated with account to prevent access of unauthorized accounts

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
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  resetForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    marginBottom: 30,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.11,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowColor: '#000',
  },
  headerBackButton: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20,
    fontWeight: '200',
  }
});
