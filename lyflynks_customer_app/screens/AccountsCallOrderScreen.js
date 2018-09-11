import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from 'react-native'
import Font from "react-native-vector-icons/FontAwesome";
import GradientNavigationBar from '../components/styleguide/GradientNavigationBar';

import SortableListView from 'react-native-sortable-listview'
import {
  deviceWidth,
  deviceHeight,
  colorSwatch,
  fontFamily,
  fontSize,
} from '../styles/Theme';
import CallOrderItem from '../components/CallOrder';
import CustomTabBar from '../components/CustomTabBar';
import Button from '../components/styleguide/PrimeButton';
import { connect } from 'react-redux';
import { getList, updateList, reorderList } from '../actions/member_call';
import PrimeButton from '../components/styleguide/PrimeButton';
Array.prototype.move = function (from, to ) {
  this.splice(to, 0, this.splice(from, 1)[0])
  return this
}

@connect(store => {
  const { member_account, account_id } = store.auth;
  const { isFetching, list, error } = store.member_call;
  return { isFetching, list, error, member_account, account_id }
})
export default class CallOrder extends Component {
  constructor (props) {
    super(props);
      this.state = {
        fontLoaded: false,
        data: []
      };
    this.laodFonts = this.laodFonts.bind(this);
    this.dispatch = this.props.dispatch
  }

  loadList = () => {
    let { member_account, account_id } = this.props
    let token = member_account.data
    this.dispatch(getList(account_id, token))
  }

  componentDidMount () {
    this.laodFonts();
    this.loadList();
  }

  updateList = () => {
    let { member_account, account_id } = this.props
    let token = member_account.data
    let { data } = this.props.list
    if (data && data.length > 0) {
      let ids = data.map(item => {
        return item.ll_member.id
      })
      this.dispatch(updateList(account_id, token, ids))
    }
  }


  async laodFonts() {
    await Font.loadAsync({
      'Avenir-Light': require('../assets/fonts/Avenir-Light.ttf'),
      'Avenir-Book': require('../assets/fonts/Avenir-Book.ttf'),
      'Avenir-Medium': require('../assets/fonts/Avenir-Medium.ttf'),
      'Avenir-Heavy': require('../assets/fonts/Avenir-Heavy.ttf'),
      'Avenir-Black': require('../assets/fonts/Avenir-Black.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  renderTimeLine = (index) => {
    let { data } = this.props.list
    return (
      <View style={styles.timeLine}>
      <View style={index  === 0 ? {}: styles.line} />
        <View style={[styles.circle, index === 0 ? {marginTop: 22} : {}]}>
          <Text style={{ color: '#fff', fontSize: 15 }}>
            {index + 1}
          </Text>
        </View>
        <View style={data.length -1 === index ? {}: styles.line} />
      </View>
    )
  }

  renderButton = () => {
    let settingBtn = {
      btnWidth: 260,
      btnHeight: 40,
      backgroundColor: colorSwatch.indianKhaki,
    }

    let btnContainer = {
      backgroundColor: colorSwatch.white,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 15,
      bottom: 75,
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 100
    }

    return (
      <View style={btnContainer}>
        <PrimeButton onPressButton={()=> this.updateList()} btnText='Save' setting={settingBtn} />
      </View>
    )
  }

  renderItem = (data, section, index) => {
    return (
      <TouchableHighlight underlayColor={'#eee'} {...this.props.sortHandlers} style={{ flex: 1,}} >
        <View
        style= {{ display: 'flex', flexDirection: 'row' }} >
          {this.renderTimeLine(parseInt(index))}
          <CallOrderItem {...data} />
        </View>
      </TouchableHighlight>
    )
  }

  handleMove = (e) => {
    let orderList = [...this.props.list.data]
    orderList = orderList.move(e.from, e.to)
    this.dispatch(reorderList(orderList))
  }

  renderList () {
    let {data, success} = this.props.list
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
            onRowMoved={e => {
              order.splice(e.to, 0, order.splice(e.from, 1)[0]);
              this.handleMove(e)
            }}
            renderRow={this.renderItem}
          />
        </View>
      )
    } return null // return component for failed request
  }

  render () {
    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>
          <GradientNavigationBar
            back
            navigation={this.props.navigation}
            titleText='Call Order' />
            {this.renderList()}
            {this.renderButton()}
            <CustomTabBar
            navigation={this.props.navigation}
            isActive = 'tabHome' />
        </View>
      )
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerList: {
    padding: 20,
    paddingBottom: 140,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  }
})

