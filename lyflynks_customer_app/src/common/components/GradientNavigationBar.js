import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { makeLogout } from 'actions/auth';

import {
  deviceWidth,
  deviceHeight,
  blueGradient,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  colorSwatch,
  fontSize,
  fontFamily,
} from 'styles/Theme';

class GradientNavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: "", 
      login: {}
    };
  }


  static propTypes= {
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
    },
    gradientBgStyle: {
      color: blueGradient.colors,
      start: {x: 0.2, y: 0.4},
      end: {x: 1.2, y: 1.0},
    },
    titleTextStyle: {
      color: colorSwatch.white,
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
      paddingHorizontal: 10.5,
    },
  };

  async componentDidMount(){
   
   let user_token =  this.props.member; 

    if(user_token.success){
      this.setState(
        {
          height: 22,
          width: 22,
        }
        ); 
    }else{
      this.setState({
        height: 0,
          width: 0,
      });
    } 
  }

  _handleLogout = async() => {
    // console.log('logout');
    AsyncStorage.clear(); 
    // AsyncStorage.removeItem('isLogin');  
    // AsyncStorage.setItem('isLogin', null); 
    this.props.makeLogout();
    this.props.navigation.navigate('MemberLogin'); 
  }

  render() { 
    return (
      <View style={[styles.outerContainer, this.props.outerContainerStyle]}>
        <LinearGradient
          start={this.props.gradientBgStyle.start}
          end={this.props.gradientBgStyle.end}
          colors={this.props.gradientBgStyle.color}
          style={[styles.innerContainer, this.props.innerContainerStyle]}
        >
          <View style={styles.leftCol}>
            {this.props.menu &&
              <TouchableOpacity
                onPress={this._onClickMenuButton.bind(this)}
              >
                <View style={[this.props.leftBtnStyle, styles.leftBtn]}>
                  <Image
                    source={require('images/menu.png')}
                    style={{width: 26, height: 17}}
                  />
                </View>
              </TouchableOpacity>
            }
            {this.props.back &&
              <TouchableOpacity
                onPress={this._onClickBackButton.bind(this)}
              >
                <View style={[this.props.leftBtnStyle, styles.leftBtn]}>
                  <Icon
                    name="md-arrow-back"
                    size={this.props.backIconStyle.size}
                    color={this.props.backIconStyle.color}
                    style={{backgroundColor: 'transparent'}}
                  />
                  <Icon
                    name="md-remove"
                    size={this.props.backIconStyle.size}
                    color={this.props.backIconStyle.color}
                    style={{width: 5, marginLeft: 3, backgroundColor: 'transparent'}}
                  />
                </View>
              </TouchableOpacity>
            }
            {!this.props.menu && !this.props.back && this.props.leftChildren}
          </View>
          <View style={styles.titleCol}>
            {this.props.titleImg != null && this.props.titleText == null &&
              <Image
                source={this.props.titleImg}
                style={{width: 'auto', height: this.props.titleImgStyle.height}}
              />
            }
            {this.props.titleText != null && this.props.titleImg == null &&
              <Text style={[this.props.titleTextStyle, styles.titleText]}>
                {this.props.titleText}
              </Text>
            }
            {this.props.titleText == null && this.props.titleImg == null && this.props.centerChildren}
          </View>
          <View style={styles.rightCol}>
            {this.props.rightButtons != null &&
              this.props.rightButtons.map(button => (
                <View key={button.key}>
                  <TouchableOpacity
                    onPress={button.buttonAction}
                  >
                    <View style={[styles.rightBtn, this.props.rightBtnStyle && this.props.rightBtnStyle]}>
                      <Image
                        source={button.buttonIcon}
                        style={{marginRight:13,zIndex:1}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            }
            {!this.props.rightButtons && this.props.rightButtons == null &&
              <View style={[this.props.rightBtnStyle, styles.rightBtn]}>
                {this.props.rightChildren}
              </View>
            }
          </View>
          <View style={styles.logoutButton}>
            <TouchableOpacity
                onPress={this._handleLogout.bind(this)}
              >
              <Image 
                source={require('images/logout24x24.png')} 
                style={{width:this.state.width,height:this.state.height}}

                /> 
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Handle click menu button
  _onClickMenuButton() {
    this.props.actionMenu()
  }

  // Handle click back button
  _onClickBackButton() {
    this.props.navigation.goBack();
  }
}

const mapStateToProps = (state) => ({
  member : state.auth.member
});

const mapDispatchToProps = (dispatch) => (
  {
    makeLogout() {
      dispatch(makeLogout());
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GradientNavigationBar);


const styles = StyleSheet.create({
  outerContainer: {
    top: 0,
    left: 0,
    right: 0,
    width: deviceWidth,
    ...Platform.select({
      ios: {
        height: NAV_HEIGHT + STATUSBAR_HEIGHT,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
          width: 0,
          height: 12 
        },
        shadowRadius: 5,
        shadowOpacity: 0.3 
      },
      android: {
        height: NAV_HEIGHT,
        elevation: 20,
      },
    }),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  leftCol: {
    flex: 1,
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
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
    ...Platform.select({
      ios: {
        marginTop: 16,
      }
    })
    // paddingHorizontal: 7.5,
  },
  rightCol: {
    flex: 1,
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

 