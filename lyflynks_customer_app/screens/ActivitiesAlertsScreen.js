import React, { Component } from 'react';
import {
  FlatList,
  View
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
    this.data = [
      {
        id: 0,
        image: {
          url: require('../assets/images/doctor-01.png'),
          width: 70,
          height: 70,
        },
        name: 'Dr. John send you a message.',
        career: '30 minutes ago',
        distance: 0.8,
        isSpecial: true
      },
      {
        id: 1,
        image: {
          url: require('../assets/images/doctor-01.png'),
          width: 70,
          height: 70,
        },
        name: 'Nurse is heading home.',
        career: '1 hour ago',
        distance: 0.8,
        isSpecial: false
      },
      {
        id: 2,
        image: {
          url: require('../assets/images/doctor-01.png'),
          width: 70,
          height: 70,
        },
        name: 'Emergency Alert',
        career: 'Yesterday, 2:00 pm',
        distance: 0.8,
        isSpecial: true
      },
      {
        id: 3,
        image: {
          url: require('../assets/images/doctor-01.png'),
          width: 70,
          height: 70,
        },
        name: 'Transportation Service',
        career: 'Friday, 4:55 pm',
        distance: 0.8,
        isSpecial: true
      },
      {
        id: 4,
        image: {
          url: require('../assets/images/doctor-01.png'),
          width: 70,
          height: 70,
        },
        name: 'Time to take your pills',
        career: 'June 15th, 10:00 am',
        distance: 0.8,
        isSpecial: true,
      },
    ]
    this._handleClickListDoctorsItem = this._handleClickListDoctorsItem.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.loadActivities = this.loadActivities.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }
  _handleClickListDoctorsItem (item) {
    // send view to inspect item
    console.log(item);
  }

  loadActivities (page = 1) {
    const { dispatch, member_account } = this.props;
    const token = member_account.data;
    dispatch(alerts({
      limit: 15,
      page
    }, token));
  }

  componentDidMount () {
    this.loadActivities();
  }

  _onRefresh () {
    this.loadActivities();
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
  render () {
    return (
      <View style={[Styles.wrapperBox, { marginBottom: 50 }]}>
        <FlatList
          data={this.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onRefresh={()=> this.onRefresh()}
          refreshing={this.props.isFetching}
        />
      </View>
    );
  }
};
