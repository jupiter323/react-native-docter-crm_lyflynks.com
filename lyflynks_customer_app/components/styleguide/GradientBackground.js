import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PrimeButton from '../../components/styleguide/PrimeButton';
import {
  ActivityLogIcon,
  EmergencyIcon,
  TransportIcon,
  EditIcon,
  HealthIcon,
  CompanionIcon,
  CloseIcon,
  CheckInIcon,
  MemberCenterIcon,
  SettingsIcon,
  MemberIcon,
} from '../icons';

import {
  deviceWidth,
  deviceHeight,
  blueGradient,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  colorSwatch,
  fontSize,
  fontFamily,
} from '../../styles/Theme';

export default class GradientBackground extends React.Component{
  constructor(props) {
    super(props);
  }

  static propTypes = {
    titleText: PropTypes.string,
    titleImg: PropTypes.number,
    centerChildren: PropTypes.any,
    leftChildren: PropTypes.any,
    rightChildren: PropTypes.any,
  
    // Styles
    outerContainerStyle: PropTypes.any,
    innerContainerStyle: PropTypes.any,
    gradientBgStyle: PropTypes.any,
    leftBtnStyle: PropTypes.any,
    rightBtnStyle: PropTypes.any,
    titleTextStyle: PropTypes.any,
    titleImgStyle: PropTypes.any,
    backIconStyle: PropTypes.any,
  };

  static defaultProps = {
    statusBarProps: {
      translucent: true,
      barStyle: "light-content",
      backgroundColor: colorSwatch.edenBlue,
    },
    outerContainerStyle: {
      backgroundColor: colorSwatch.white,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'flex-start'
    },
    innerContainerStyle: {
      backgroundColor: colorSwatch.white,
      // position: 'absolute',
      // flex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      height: deviceHeight,
      right: 0
    },
    gradientBgStyle: {
      color: blueGradient.colors,
      start: {x: 0.2, y: 0.4},
      end: {x: 1.2, y: 1.0},
    },
    titleTextStyle: {
      color: colorSwatch.white,
      textAlign: 'center',
      fontSize: 18,
      fontFamily: fontFamily.semiBold,
    },
    backIconStyle: {
      size: 28,
      color: colorSwatch.white,
    },
    leftBtnStyle: {
      height: NAV_HEIGHT,
      paddingHorizontal: 15,
    },
    rightBtnStyle: {
      height: NAV_HEIGHT,
      paddingHorizontal: 7.5,
    },
  };

InviteMember(){
  this.props.navigation.navigate('MemberInvite');
 // Alert.alert('invite member');
}

  render() {
    const shadowOpt = {
      btnWidth: 260,
      btnHeight: 40,
      backgroundColor: colorSwatch.indianKhaki,
    }
    const iconsProps = {
      style: {
        width: 24,
        height: 24,
      },
      color: colorSwatch.white,
    }
    const editIconProps = {
      style: {
        width: 16,
        height: 16,
      },
      color: colorSwatch.white,
    }

     
    

    return (
        <LinearGradient
          start={this.props.gradientBgStyle.start}
          end={this.props.gradientBgStyle.end}
          colors={this.props.gradientBgStyle.color}
          style={[styles.outerContainer]}
          >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{right: 30,position: 'absolute', top: 60, zIndex: 100  }}>
            <CloseIcon {...editIconProps} />
          </TouchableOpacity>
        <ScrollView>
            <View style={styles.avatarContainer}>
              <Text style={[this.props.titleTextStyle, styles.titleText]}>LyfLynks</Text>
              <Image
                source={require('../../assets/images/default-avatar.png')}
                style={styles.avatarImage}
              />
              <View style={styles.avatarNameContainer}>
                <Text style={[this.props.titleTextStyle, styles.memberNameText, styles.avatarText]}>WILLIAM HALFORD</Text>
                <EditIcon {...editIconProps} />
              </View>
            </View>
            <View style={styles.serviceIconWrapper}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.serviceIconContainer, styles.serviceIconContainerTopLeft]}
                onPress={() => true}>
                <View style={styles.serviceIconCircle}>
                  <ActivityLogIcon {...iconsProps} />
                </View>
                <Text style={[this.props.titleTextStyle, styles.serviceIconText]}>ACTIVITY LOG</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.serviceIconContainer, styles.serviceIconContainerTopRight]}
                onPress={() => true}>
                <View style={styles.serviceIconCircle}>
                  <SettingsIcon {...iconsProps} />
                </View>
                <Text style={[this.props.titleTextStyle, styles.serviceIconText]}>SETTINGS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.serviceIconContainer, styles.serviceIconContainerTopLeft]}
                onPress={() => true}>
                <View style={styles.serviceIconCircle}>
                  <MemberIcon {...iconsProps} />
                </View>
                <Text style={[this.props.titleTextStyle, styles.serviceIconText]}>ACCOUNT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.serviceIconContainer, styles.serviceIconContainerTopRight]}
                onPress={() => this.props.navigation.navigate('CallOrder')}>
                <View style={styles.serviceIconCircle}>
                  <MemberCenterIcon {...iconsProps} />
                </View>
                <Text style={[this.props.titleTextStyle, styles.serviceIconText]}>MEMBER CENTER</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.serviceIconContainer, styles.serviceIconContainerTopLeft]}
                onPress={() => true}>
                <View style={styles.serviceIconCircle}>
                  <CompanionIcon {...iconsProps} />
                </View>
                <Text style={[this.props.titleTextStyle, styles.serviceIconText]}>COMPANION SERVICES</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.serviceIconContainer, styles.serviceIconContainerTopRight]}
                onPress={() => true}>
                <View style={styles.serviceIconCircle}>
                  <HealthIcon {...iconsProps} />
                </View>
                <Text style={[this.props.titleTextStyle, styles.serviceIconText]}>MEDICAL APPOINTMENT</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.serviceIconContainer, styles.serviceIconContainerBottomLeft]}
                onPress={() => true}>
                <View style={styles.serviceIconCircle}>
                  <CheckInIcon {...iconsProps} />
                </View>
                <Text style={[this.props.titleTextStyle, styles.serviceIconText]}>CHECK IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.serviceIconContainer, styles.serviceIconContainerBottomRight]}
                onPress={() => true}>
                <View style={styles.serviceIconCircle}>
                  <TransportIcon {...iconsProps} />
                </View>
                <Text style={[this.props.titleTextStyle, styles.serviceIconText]}>TRANSPORT</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.avatarContainer}>
              <PrimeButton
                setting={shadowOpt}
                btnText="Invite Member"
                onPressButton={() => this.InviteMember()}>
              </PrimeButton>
            </View>
          </ScrollView>
        </LinearGradient>
    );
  }

  // Handle click menu button
  _onClickMenuButton() {
    this.props.navigation.openDrawer()
  }

  // Handle click back button
  _onClickBackButton() {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    top: 0,
    left: 0,
    right: 0,
    width: deviceWidth,
    ...Platform.select({
      ios: {
        paddingTop: NAV_HEIGHT,
        paddingBottom: NAV_HEIGHT,
        // paddingTop: NAV_HEIGHT + STATUSBAR_HEIGHT,
        // height: NAV_HEIGHT + STATUSBAR_HEIGHT,
        height: deviceHeight,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
          width: 0,
          height: 12
        },
        shadowRadius: 5,
        shadowOpacity: 0.3
      },
      android: {
        paddingTop: NAV_HEIGHT,
        height: deviceHeight,
        // height: NAV_HEIGHT,
        elevation: 20,
      },
    }),
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarContainer: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  avatarNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarText: {
    marginRight: 5
  },
  avatarImage: {
    width: 80,
    height: 80,
    marginTop: 15,
    marginBottom: 15,
  },
  titleCol: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth * 3/5,
    ...Platform.select({
      ios: {
        paddingTop: STATUSBAR_HEIGHT,
      }
    }),
  },
  titleText: {
    backgroundColor: 'transparent',
    fontSize: fontSize.header,
    color: colorSwatch.white,
    fontFamily: fontFamily.semiBold,
  },
  memberNameText: {
    backgroundColor: 'transparent',
    fontSize: fontSize.medium,
    color: colorSwatch.white,
    fontFamily: fontFamily.medium,
  },
  serviceIconText: {
    backgroundColor: 'transparent',
    fontSize: fontSize.normal,
    color: colorSwatch.white,
    fontFamily: fontFamily.normal,
  },
  serviceIconWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 15
  },
  serviceIconCircle: {
    backgroundColor: colorSwatch.indianKhaki,
    borderRadius: 50,
    width: 46,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  serviceIconContainer: {
    width: (deviceWidth - 30) / 2,
    // height: 100,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: '#ffffff',
    borderWidth: 1
  },
  serviceIconContainerTopLeft: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  serviceIconContainerTopRight: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  serviceIconContainerBottomLeft: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  serviceIconContainerBottomRight: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  serviceIcon: {
    marginTop: 15,
    marginBottom: 15,
    // color: '#ffffff',
    width: 80,
    height: 80
  },
  leftCol: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingTop: STATUSBAR_HEIGHT,
      }
    }),
  },
  leftBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightCol: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 7.5,
    ...Platform.select({
      ios: {
        paddingTop: STATUSBAR_HEIGHT,
      }
    }),
  },
  rightBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});




