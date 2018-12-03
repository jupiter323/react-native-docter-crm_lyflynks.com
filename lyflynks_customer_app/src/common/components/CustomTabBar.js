import React, {Component} from 'react';
import { Image } from 'react-native';

import BottomNavigationBar from './BottomNavigationBar';

export default class CustomTabBar extends Component {
  constructor(props) {
    console.log("custom tabbar constructor",BottomNavigationBar);
    super(props);
  }

  componentDidMount = () => {
    this._onHomeIconClick();
  }

  render() {
    return (
      <BottomNavigationBar
        isActive={this.props.isActive}
        tabHomeBtn={{
          active: '#00A68C',
          inactive: '#696969',
          width: 28,
          height: 30,
          onPressButton: this._onHomeIconClick.bind(this),
        }}
        tabOneBtn={{
          active: '#00A68C',
          inactive: '#696969',
          width: 24,
          height: 24,
          action: this._onDrugsIconClick.bind(this),
        }}
        tabTwoBtn={{
          active: '#00A68C',
          inactive: '#696969',
          width: 18,
          height: 24,
          action: this._onDoctorsIconClick.bind(this),
        }}
        tabThreeBtn={{
          active: '#00A68C',
          inactive: '#696969',
          width: 24,
          height: 20,
          action: this._onDashboardIconClick.bind(this),
        }}
        tabFourBtn={{
          active: '#00A68C',
          inactive: '#696969',
          width: 20,
          height: 24,
          action: this._onProfileIconClick.bind(this),
        }}
      />
    );
  }

  // Handle click buttons of tabbar
  _onHomeIconClick() {
    this.props.navigation.navigate('ActivityLogScreen');
  }

  _onDrugsIconClick() {
    this.props.navigation.navigate('ActivityLogScreen');
  }

  _onDoctorsIconClick() {
    this.props.navigation.navigate('TransportationIntroScreen');
  }

  _onDashboardIconClick() {
    this.props.navigation.navigate('ActivityLogScreen');
  }

  _onProfileIconClick() {
    this.props.navigation.navigate('ActivityLogScreen');
  }
}
