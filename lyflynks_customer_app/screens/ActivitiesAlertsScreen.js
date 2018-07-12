import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  Button
} from 'react-native';
import ListItem from '../components/ListItem';
import Styles from '../styles/CommonStyles'
import { alerts } from '../actions/activities'
import { connect } from 'react-redux'

@connect(store => {
  const { isFetching, error, alerts } = store.activities
  const { member_account } = store.auth;
  return { isFetching, error, alerts, member_account }
})
export default class AcitiviesAlerts extends Component {
  constructor (props) {
    super(props)
    this._handleClickListDoctorsItem = this._handleClickListDoctorsItem.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.loadActivities = this.loadActivities.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.state = { refreshing: false }
  }
  _handleClickListDoctorsItem (item) {
    // send view to inspect item
  }

  loadActivities (page = 1) {
    const { dispatch, member_account } = this.props;
    const token = member_account.data;
    dispatch(alerts({
      limit: 2,
      page
    }, token));
  }

  componentDidMount () {
    this.loadActivities();
  }

  _onRefresh () {
    this.setState({
      refreshing: true
    })
    // this.loadActivities();
  }

  _renderItem ({ item }) {
    return (
      <ListItem
      key={item.id}
      image={{
        url: item.image.url,
        width: item.image.width,
        height: item.image.height,
      }}
      header={item.name}
      subText={item.career}
        bottomText={item.distance}
        isSpecial={item.isSpecial}
        onPressButton={() => this._handleClickListDoctorsItem(item)}
      />
    )
  }
  _keyExtractor = (item, index) => item.id;
  _renderContent () {
   let { error } = this.props
   if (error) return <View><Text>we have problems, please try later</Text></View>
   return (
      <FlatList
      data={this.props.alerts.data}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}
      onRefresh={this._onRefresh}
      refreshing={this.state.refreshing}
    />
   )
  }
  render () {
    return (
      <View style={{ marginBottom: 50 }}>
       {this._renderContent()}
      </View>
    );
  }
};
