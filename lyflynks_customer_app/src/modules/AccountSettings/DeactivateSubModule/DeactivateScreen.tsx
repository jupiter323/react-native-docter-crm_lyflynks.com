import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Content } from 'native-base';
import { Screen, Input, Button } from 'componentsLib';
import { colorSwatch, deviceWidth } from 'styles/Theme';
import CommonStyles from 'styles/CommonStyles';
import { validator, mmyyValidator } from "util/validator";
import CloseIcon from 'components/icons/CloseIcon';
import Check from 'components/icons/Check';

import {

  updateMemberFormField,
  updateErrorMessage,
  updateInputStatus,
  ERROR_STATUS,
  SUCCESS_STATUS,
  NORMAL_STATUS,
  ACTIVE_STATUS
} from './action'
const mapStateToProps = state => {
  return { ...state.creditCard };
};
class DeactivateScreen extends React.Component {
  render() {
    return (
      <Screen
        navigation={this.props.navigation}
        title="DEACTIVATE ACCOUNT"
        back={true}
      >

        <Content >
          <View style={styles.containerStyle}>

         </View>
        </Content>
      </Screen >

    );
  }

}


const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingTop: 30

  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    height: 50,
    marginTop: 10
  },
  rowSubContainerLeft: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50
  },
  rowSubContainerRight: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 50
  },
  btnContainer: {
    flex: 1,
    marginTop: 50,
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 4,
  },
  inputIconStyle: {
    width: 20,
    height: 20,
    zIndex: 100
  },
  inputContainer: {
    justifyContent: 'flex-start',
    width: '100%'
  },
  inputSubContainer: {
    width: '100%',
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',

  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 20,
    marginTop: 3,
    marginBottom: 10
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 0
  }
});

export default connect(mapStateToProps)(DeactivateScreen);