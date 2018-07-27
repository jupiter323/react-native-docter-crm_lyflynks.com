import {
  Dimensions,
  Platform
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const isIphoneX = Platform.OS === "ios" && (deviceHeight > 800 || deviceWidth > 800) ? true : false
const NAV_HEIGHT = (isIphoneX) ? 80 : 45;
const TAB_HEIGHT = (isIphoneX) ? 60 : 50;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const shadowOpt = {
  btnWidth: deviceWidth - 55,
  btnHeight: 45
}

// Only for FindDoctors, FindHospital, Appointment screens
const spaceHeight = deviceHeight -  375 - 45;
// Only for Intro screens
const introSpaceHeight = deviceHeight - 364;

// Common gradient colors
const blueGradient = {
  colors: ['rgb(0,156,140)', 'rgb(51,147,191)'],
  colorsStart: {x: 0.2, y: 0.4},
  colorsEnd: {x: 1.0, y: 1.0}
}

const colors = {
  white: '#fff',
  black: 'rgb(19,19,19)',
  darkWhite: 'rgba(255,255,255,0.6)',
  grey: 'rgb(105,105,105)',
  lightGrey: 'rgb(150,150,150)',
  softBlue: 'rgb(75,102,234)',
  darkSkyBlue: 'rgb(63,103,230)',
  periBlue: 'rgb(79,109,230)',
  red: 'rgb(255,16,0)',
  borderColor: 'rgb(229,229,229)',
} 

// Color Swatch
const colorSwatch = {
  edenBlue: '#0E3A53',
  persianGreen: '#00A68C',
  caribbeanGreen: '#06C5AC',
  pampasCream: '#F0EDE5',
  bombayGray: '#AFB1B4',
  indianKhaki: '#C5AE91',
  red: '#FF0000',
  bostonBlue: '#3293BE',
  silverSand: '#C5C7C9',
  codGray: '#131313',
  dustyGray: '#969696',
  white: '#FFFFFF',
}

const fontFamily = {
  light: 'Avenir-Light',
  regular: 'Avenir-Book',
  medium: 'Avenir-Medium',
  semiBold: 'Avenir-Heavy',
  extraBold: 'Avenir-Black',
}


let fontSize = {
  extraLarge: 36,
  title: 32,
  header: 20,
  itemHeader: 17,
  medium: 16,
  normal: 15,
  small: 13
}

let lineHeight = {
  title: 38,
  header: 30,
  itemHeader: 29,
  normal: 23,
  small: 30
}

if (deviceWidth <= 320) {
  fontSize = {
    extraLarge: 27,
    title: 20,
    header: 16,
    itemHeader: 14,
    medium: 12,
    normal: 11,
    small: 10
  }

  lineHeight = {
    title: 28,
    header: 20,
    itemHeader: 19,
    normal: 13,
    small: 20
  }
}

export {
  NAV_HEIGHT,
  TAB_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceHeight,
  deviceWidth,
  shadowOpt,

  spaceHeight,
  introSpaceHeight,

  blueGradient,
  colors,
  colorSwatch,
  fontSize,
  fontFamily,
  lineHeight,
};
