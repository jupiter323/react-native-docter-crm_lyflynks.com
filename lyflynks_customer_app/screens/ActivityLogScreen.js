import React, { Component } from 'react';
import Font from 'react-native-vector-icons/FontAwesome';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import SideMenu from 'react-native-side-menu'
import GradientNavigationBar from '../components/styleguide/GradientNavigationBar';
import SwitchButton from '../components/styleguide/SwitchButton';
import PrimeButton from '../components/styleguide/PrimeButton';
import { Input, Item, Icon, Button, Text } from 'native-base';
import { Tabs } from 'native-base';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import CommonStyles from '../styles/CommonStyles';
import ListItem from '../components/ListItem';
import CustomTabBar from '../components/CustomTabBar';
import ActivityLogTimeline from '../components/ActivityLogTimeline';
import { colorSwatch } from '../styles/Theme';
import ActivitiesCompletedScreen from './ActivitiesCompletedScreen'
import ActivitiesUpcommingScreen from './ActivitiesUpcomingScreen';
import ActivitiesAlertsScreen from './ActivitiesAlertsScreen'
import { showMenu, toogleMenu } from '../actions/menu'
import { connect } from 'react-redux'


const stateMap = (store) => {
  const { isActiveMenu } = store.menu;
  return { isActiveMenu }
};


 class ActivityLogScreen extends Component {
  static navigationOptions = {
    title: 'Activity Log',
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      isOpen: false,
    }

    this._handleClickListDoctorsItem = this._handleClickListDoctorsItem.bind(this);
  }



  async componentDidMount() {
    await Font.loadAsync({
      'Avenir-Light': require('../assets/fonts/Avenir-Light.ttf'),
      'Avenir-Book': require('../assets/fonts/Avenir-Book.ttf'),
      'Avenir-Medium': require('../assets/fonts/Avenir-Medium.ttf'),
      'Avenir-Heavy': require('../assets/fonts/Avenir-Heavy.ttf'),
      'Avenir-Black': require('../assets/fonts/Avenir-Black.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  showMenu = () => {
    this.props.navigation.navigate('MainMenuScreen')
  }
  render() {
    if (this.state.fontLoaded != true) {
      return (
        <View />
      )
    }

    const shadowOpt = {
      btnWidth: 260,
      btnHeight: 40,
      backgroundColor: colorSwatch.caribbeanGreen,
    }

    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Activity Log'
          menu
          actionMenu = {this.showMenu}
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../assets/images/notification.png'),
                buttonAction: this._handleClickPlaceButton.bind(this),
                buttonWidth: 19,
                buttonHeight: 24,
              },
            ]
          }
        />
        <Tabs
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarUnderlineStyle={{
            backgroundColor: '#00A68C'
          }}
          tabBarBackgroundColor={'#fff'}
          tabBarActiveTextColor={'#00A68C'}
          tabBarInactiveTextColor={'#929395'}
          tabBarTextStyle={{
            fontFamily: 'Avenir-Heavy',
            fontSize: 16
          }}
        >
          <ScrollView heading='UPCOMING' style={CommonStyles.scrollView}>
            <ActivitiesUpcommingScreen navigation={this.props.navigation}/>
          </ScrollView>
          <ScrollView heading='COMPLETED'>
            <ActivitiesCompletedScreen />
          </ScrollView>
          <ScrollView heading='ALERTS'>
            <ActivitiesAlertsScreen />
          </ScrollView>
        </Tabs>
        <CustomTabBar
          navigation={this.props.navigation}
          isActive = 'tabHome'
        />
      </View>
    );
  }

  // Goto MapScreen
  _handleClickPlaceButton() {
    // this.props.navigation.navigate('MainMenuScreen');
  }

  // Goto DoctorDeatailsScreen
  _handleClickListDoctorsItem() {
    // this.props.navigation.navigate('ActivityLogScreen');
    const l = 0;
  }
}

// ActivityLogScreen.navigationOptions = {
//   tabBarVisible: false
// }

export default connect(stateMap)(ActivityLogScreen);
