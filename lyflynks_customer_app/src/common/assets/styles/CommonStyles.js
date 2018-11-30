import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
// import Constants from 'react-native-basic-constants';
import {
  NAV_HEIGHT,
  TAB_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceHeight,
  deviceWidth,
  iosShadowOpt,
  spaceHeight,
  introSpaceHeight,
  colorSwatch,
  fontFamily,
  fontSize
} from './Theme';

// CommonStyles
export default CommonStyles = StyleSheet.create({
  normalPage: {
    position: 'relative',
    flex: 1,
    backgroundColor: colorSwatch.white,
    ...Platform.select({
      android: {
        marginBottom: 0,
      },
    }),
  },
  normalSinglePage: {
    flex: 1,
    height: deviceHeight,
    backgroundColor: colorSwatch.white,
    ...Platform.select({
      android: {
        marginBottom: 30,
      },
    }),
  },
  wrapperBox: {
    marginVertical: 20,
  },
  noTabScrollView: {
    marginTop: 0,
  },
  scrollView: {
    marginBottom: TAB_HEIGHT,
    marginTop: 0,
  },
  chatView: {
    marginTop: 0,
    flex: 1,
  },
  itemWhiteBox: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: colorSwatch.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1
      },
      android: {
        elevation: 6,
      },
    }),
  },
  textInputField: {
    flexDirection: 'row',
    width: deviceWidth - 55,
    height: 45,
    marginBottom: 25,
    borderColor: colorSwatch.silverSand,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    backgroundColor: colorSwatch.white,
  },
  textInput: {
    width: deviceWidth - 55,
    height: 45,
    paddingLeft: 50,
    color: colorSwatch.silverSand,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.regular,
  },
  selectboxField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth - 55,
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: colorSwatch.silverSand,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    backgroundColor: colorSwatch.white,
  },
  selectboxLabel: {
    color: colorSwatch.silverSand,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.regular,
  },
  backButton: {
    alignItems: 'center',
    width: 58,
    height: 58
  },
  nextButton: {
    alignItems: 'center',
    width: 90,
    height: 90
  },
  introPageImageBox: {
    alignItems: 'center',
    marginTop: introSpaceHeight * 0.33,
  },
  introPageTextBox: {
    flex: 1,
    alignItems: 'center',
    marginTop: introSpaceHeight * 0.27,
  },
  introPageSubText: {
    width: deviceWidth - 75,
    height: 60,
    marginTop: 15,
    color: colorSwatch.silverSand,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
  },
  introPageButtonBox: {
    flexDirection: 'row',
  },
  introPageLeftBtn: {
    width: deviceWidth / 3,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 20,
  },
  introPageRightBtn: {
    width: deviceWidth / 3,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 8,
  },
  introPageCenterBtn: {
    width: deviceWidth / 3,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelField: {
    marginTop: 30,
    marginBottom: 25,
    paddingLeft: (deviceWidth - (deviceWidth - 55)) / 2,
  },
  pickerBox: {
    position: 'relative',
    height: 350,
    flexDirection: 'row',
    marginBottom: 15,
  },
  pickerText: {
    fontSize: fontSize.normal,
  },
  selectedOption: {
    position: 'absolute',
    top: deviceHeight / 2.6 + NAV_HEIGHT + STATUSBAR_HEIGHT,
    width: deviceWidth,
    height: 75,
  },
  screenTitleBox: {
    height: 75,
    marginTop: spaceHeight * 0.3,
    marginBottom: spaceHeight * 0.15,
    paddingLeft: (deviceWidth - (deviceWidth - 55)) / 2,
  },
  buttonBox: {
    height: 45,
    alignItems: 'center',
  },
  itemText: {
    color: '#000000',
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  itemTextSelected: {
    color: '#FFFFFF',
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  InputActiveStatus: { //////////////inputfields height 50 
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#00A68C",
    borderWidth: 2,
    width: "100%",
    color: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 25
  },
  InputNormalStatus: {
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 0,
    width: "100%",
    color: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 25
  },
  InputErrorStatus: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: colorSwatch.red,
    borderWidth: 2,
    width: "100%",
    color: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 25
  },
  BtnStyle: { ////////height 50 standard button
    backgroundColor: "#00A68C",
    width: '100%',
    height: 50,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 25,
    zIndex: 0,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    elevation: 2,
  },
  BtnTxtStyle: {
    fontSize: 17,
    fontFamily: 'Avenir'
  },  
  fieldLabel: {
    textAlign: "left",
    fontSize: 15,
    marginLeft: 25,
    marginTop: 10,
    zIndex: 0,
    color: '#000'
  }
});
