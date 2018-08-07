import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import CommonStyles from '../../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  TAB_HEIGHT
} from '../../styles/Theme';

import {
  EmergencyIcon,
  TransportIcon,
  HealthIcon,
  CompanionIcon,
  MemberIcon
} from '../icons';

export default class BottomNavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[this.props.outerContainerStyle, styles.outerContainer]}>
        <View style={[this.props.innerContainerStyle, styles.innerContainer]}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this.props.tabOneBtn.action}>
              <EmergencyIcon
                style={{
                  // color: (this.props.isActive == 'tabOne') ? this.props.tabOneBtn.active : this.props.tabOneBtn.inactive,
                  width: this.props.tabOneBtn.width,
                  height: this.props.tabOneBtn.height
                }}
              />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this.props.tabTwoBtn.action}>
              <TransportIcon
                style={{
                  // color: (this.props.isActive == 'tabTwo') ? this.props.tabTwoBtn.active : this.props.tabTwoBtn.inactive,
                  width: this.props.tabTwoBtn.width,
                  height: this.props.tabTwoBtn.height
                }}
              />
          </TouchableOpacity>
          <View style={styles.btn} />
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this.props.tabThreeBtn.action}>
              <CompanionIcon
                style={{
                  width: this.props.tabThreeBtn.width,
                  height: this.props.tabThreeBtn.height
                }}
              />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this.props.tabFourBtn.action}>
              <MemberIcon
                style={{
                  width: this.props.tabFourBtn.width,
                  height: this.props.tabFourBtn.height
                }}
              />
          </TouchableOpacity>
        </View>
        {
          <TouchableOpacity
            style={styles.inactiveHomeBtn}
            onPress={this.props.tabHomeBtn.onPressButton}>
              <HealthIcon
                color={(this.props.isActive == 'tabHome') ? this.props.tabHomeBtn.active : this.props.tabHomeBtn.inactive}
                style={{
                  width: this.props.tabHomeBtn.width,
                  height: this.props.tabHomeBtn.height
                }}
              />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: TAB_HEIGHT + 50,
    backgroundColor: 'transparent',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: TAB_HEIGHT,
    marginTop: 50,
  },
  btn: {
    width: deviceWidth / 5,
    height: TAB_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHomeBtn: {
    position: 'absolute',
    left: (deviceWidth - 70)/2,
    bottom: -3,
  },
  inactiveHomeBtn: {
    position: 'absolute',
    left: (deviceWidth - 60)/2,
    bottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#F0EDE5',
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'rgba(229,229,229,0.8)',
    borderStyle: 'solid',
  }
});

BottomNavigationBar.propTypes = {
  outerContainerStyle: View.propTypes.style,
  innerContainerStyle: View.propTypes.style,
  tabHomeBtn: PropTypes.any,
  tabOneBtn: PropTypes.any,
  tabTwoBtn: PropTypes.any,
  tabThreeBtn: PropTypes.any,
  tabFourBtn: PropTypes.any,
};

BottomNavigationBar.defaultProps = {
  innerContainerStyle: {
    backgroundColor: '#F0EDE5',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229,229,229,0.4)',
    borderStyle: 'solid',
  },
};
