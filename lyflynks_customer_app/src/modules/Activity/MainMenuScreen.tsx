import React, { Component } from 'react';
import Font from 'react-native-vector-icons/FontAwesome';
import {
  View,
} from 'react-native';

import GradientBackground from 'components/GradientBackground';
import CommonStyles from 'styles/CommonStyles';
import { colorSwatch } from 'styles/Theme';

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
      'Avenir-Light': require('fonts/Avenir-Light.ttf'),
      'Avenir-Book': require('fonts/Avenir-Book.ttf'),
      'Avenir-Medium': require('fonts/Avenir-Medium.ttf'),
      'Avenir-Heavy': require('fonts/Avenir-Heavy.ttf'),
      'Avenir-Black': require('fonts/Avenir-Black.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded == true) {
      return (
        <View />
      )
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
