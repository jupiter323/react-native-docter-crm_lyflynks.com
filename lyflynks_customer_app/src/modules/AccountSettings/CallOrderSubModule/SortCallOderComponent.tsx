import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Font from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux';
import SortableListView from 'react-native-sortable-listview';

import {
  colorSwatch,
} from 'styles/Theme';
import GradientNavigationBar from 'components/GradientNavigationBar';
import CallOrderItem from 'components/CallOrder';
import CustomTabBar from 'components/CustomTabBar';
// import { getList, updateList, reorderList } from './action';
import PrimeButton from 'components/PrimeButton';

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0])
  return this
}

const stateMap = (store) => {
  const { member_account, account_id } = store.auth;
  const { isFetching, list, error } = store.member_call;
  return { isFetching, list, error, member_account, account_id }
};

class SortCallOderComponent extends Component {

  renderTimeLine = (index) => {
    let { data } = this.props.list
    return (
      <View style={styles.timeLine}>
        <View style={index === 0 ? {} : styles.line} />
        <View style={[styles.circle, index === 0 ? { marginTop: 22 } : {}]}>
          <Text style={{ color: '#fff', fontSize: 15 }}>
            {index + 1}
          </Text>
        </View>
        <View style={data.length - 1 === index ? {} : styles.line} />
      </View>
    )
  }

 
  renderItem = (data, section, index) => {
    return (
      <View
        style={{ display: 'flex', flexDirection: 'row' }} >
        {this.renderTimeLine(parseInt(index))}
        <CallOrderItem {...data} />
      </View>
    )
  }
 
  renderList() {
    let { data, success } = this.props.list

    if (success) {

      let order = Object.keys(data);
      return (
        <View style={styles.containerList}>
          <SortableListView
            data={data}
            order={order}
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderRow={this.renderItem}
          />
        </View>
      )
    } return null // return component for failed request
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    // marginLeft:0
   
  },
  containerList: {
    // padding: 20,
    paddingBottom: 0,
    flex: 1
  },
  list: {
    margin: 20,
  },
  timeLine: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 70
  },
  circle: {
    width: 26,
    height: 26,
    backgroundColor: colorSwatch.persianGreen,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    borderWidth: 1,
    borderColor: colorSwatch.persianGreen,
    height: 23,
  },

})

export default connect(stateMap)(SortCallOderComponent);