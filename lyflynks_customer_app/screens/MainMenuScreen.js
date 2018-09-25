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

import GradientBackground from '../components/styleguide/GradientBackground';
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


export default class MainMenuScreen extends Component {
  static navigationOptions = {
    title: 'Activity Log',
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
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

  render() {
    if (this.state.fontLoaded == true) {
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
        <GradientBackground
          navigation={this.props.navigation}
          titleText='LyfLynks'
          back
        />
      </View>
    );
  }
}
