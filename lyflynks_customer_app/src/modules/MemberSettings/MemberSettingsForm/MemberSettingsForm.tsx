import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  AsyncStorage,
} from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import { Content, Right } from 'native-base';
import { validator } from "util/validator";
import InputFields from "./inputFieldsConfig";
import Roles from "./rolesConfig";
import {
  updateMemberFormField,
  updateErrorMessage,
  updateMemberNotifications,
  updateInputStatus,
  ERROR_STATUS,
  SUCCESS_STATUS,
  NORMAL_STATUS,
  ACTIVE_STATUS
} from "../../Auth/memberAction";
import Input from 'componentsLib/Input';
import { colorSwatch, deviceWidth } from 'styles/Theme';
import SwitchCustom from 'componentsLib/SwitchCustom';
import notificationsConfig from './notificationsConfig';
import BoundaryLine from 'componentsLib/BoundaryLine';
import CloseIcon from 'components/icons/CloseIcon';
import Check from 'components/icons/Check';
import DropdownMenu from 'componentsLib/dropdown';

const mapStateToProps = state => {
  return { ...state.member_form };
};

class MemberSettingsForm extends React.Component {

  render() {
    return (
      <Content>
        <View style={styles.containerStyle}>
          {this.renderInputFields()}
          <Text style={styles.fieldLabel}>ROLE</Text>
          {this.renderPicker()}
          <Text style={styles.fieldLabel}>NOTIFICATIN SETTINGS</Text>
          <BoundaryLine style={styles.boundaryLine} />
          {this.renderNotifications()}

          <Button
            title="Update"
            fontWeight='bold'
            fontFamily='Avenir'
            buttonStyle={styles.BtnStyle}
            textStyle={styles.BtnTxtStyle}
            onPress={() => true}
          />

          <Button
            buttonStyle={[styles.BtnStyle, { marginTop: 5 }]}
            title="Reset Password"
            fontWeight='bold'
            fontFamily='Avenir'
            textStyle={styles.BtnTxtStyle}
            onPress={() => true}
          />
        </View>
      </Content>
    );
  }
  renderNotifications() {
    return notificationsConfig.map((notification, index) => {
      return <View key={index} style={styles.notificationContainer}>
        <Text style={styles.notificationLabel}>{notification.title}</Text>
        <SwitchCustom
          onValueChange={this.updateSwitchValue.bind(this, notification.id)}
          value={this.props[notification.id]}></SwitchCustom>
      </View>

    })
  }
  renderInputFields() {
    return InputFields.map((input, index) => {
      return (
        <View key={input.id}>
          {input.id == "email" ? <Text style={styles.fieldLabel}>MY CONTACT DETAILS</Text> : null}
          <View key={input.id} style={styles.inputContainer}>
            <View key={input.id} style={styles}>
              <Input
                onFocus={this.updateActive.bind(this, input)}
                value={this.props[input.id]}
                placeholder={input.placeholder}
                style={this.props.inputStatus[input.statusId] == NORMAL_STATUS ? styles.InputNormalStatus : this.props.inputStatus[input.statusId] == ACTIVE_STATUS ? styles.InputActiveStatus : this.props.inputStatus[input.statusId] == ERROR_STATUS ? styles.InputErrorStatus : styles.InputActiveStatus}
                onChangeText={this.updateInputFieldValue.bind(this, input)}
                setReference={this.bindReferenceToInputFields.bind(this, input)}
                focusNextInput={this.focusNextInput.bind(
                  this,
                  InputFields,
                  index
                )}
                onBlur={this.updateErrorMessage.bind(this, input)}
              />

              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 20,
                height: 20,
                position: 'absolute',
                right: 40,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 4
                },
                elevation: 4,
              }}>
                {this.props.inputStatus[input.statusId] == ERROR_STATUS ? <CloseIcon style={{ width: 20, height: 20, zIndex: 100 }} color='red' /> : this.props.inputStatus[input.statusId] == SUCCESS_STATUS ? <Check style={{ width: 20, height: 20, zIndex: 100 }} color={colorSwatch.persianGreen} /> : null}
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: '100%', height: 10, marginTop: 5 }}>
              <Text style={styles.errorMessage}>
                {this.props.inputStatus[input.statusId] == ERROR_STATUS ? this.props.errors[input.errorId] : null}
              </Text>
            </View>

          </View>
        </View>
      );
    });
  }
  //{this.props.errors[input.errorId]}
  bindReferenceToInputFields(inputField, inputElement) {
    this[inputField.id] = inputElement;
  }

  getNextInputFieldReference(InputFields, indexOfCurrentFocusedElement) {
    return InputFields.length - 1 === indexOfCurrentFocusedElement
      ? null
      : InputFields[indexOfCurrentFocusedElement + 1].id;
  }

  focusNextInput(InputFields, indexOfCurrentFocusedElement) {
    const nextInputFieldReference = this.getNextInputFieldReference(
      InputFields,
      indexOfCurrentFocusedElement
    );
    nextInputFieldReference !== null
      ? this[nextInputFieldReference].focus()
      : "";
  }
  updateSwitchValue(notificationId, value) {
    const { dispatch } = this.props;
    dispatch(updateMemberNotifications({ prop: notificationId, value }));

  }
  updateActive(inputField) {
    const { dispatch } = this.props;
    dispatch(updateInputStatus(
      {
        prop: inputField.statusId,
        value: ACTIVE_STATUS
      }
    )
    )
  }
  updateInputFieldValue(inputField, value) {
    const { dispatch } = this.props;
    dispatch(updateMemberFormField({ prop: inputField.id, value }));
    dispatch(updateInputStatus(
      {
        prop: inputField.statusId,
        value: this.validateValue(inputField.id, this.props[inputField.id]) ? ACTIVE_STATUS : SUCCESS_STATUS
      }
    )
    )
  }

  validateValue(inputElementName, value) {
    return validator(inputElementName, value);
  }

  updateErrorMessage(inputField) {
    const { dispatch } = this.props;
    dispatch(
      updateErrorMessage({
        prop: inputField.errorId,
        value: this.validateValue(inputField.id, this.props[inputField.id])
      })
    );
    dispatch(
      updateInputStatus({
        prop: inputField.statusId,
        value: this.validateValue(inputField.id, this.props[inputField.id]) ? ERROR_STATUS : SUCCESS_STATUS
      })
    );
  }

  renderPickerItems(roles) {
    return roles.map(role => {
      return (
        <Picker.Item label={role.title} value={role.role} key={role.role} />
      );
    });
  }

  renderPicker() {
    const { role } = this.props;
    return (        
      <DropdownMenu
        style={styles.Picker}
        bgColor={'white'}
        tintColor={colorSwatch.bombayGray}
        activityTintColor={colorSwatch.persianGreen}
        titleStyle={{ color: colorSwatch.bombayGray }}     
        handler={(selection, row) => this.setSelectedRole(Roles['roles'][selection][row])}
        data={Roles['titles']}
        panelAbsoluteStyle={{ top: 46 }}
        activeIndex={[Roles['roles'][0].indexOf(role)]}
      >
      </DropdownMenu>
    );
  }

  setSelectedRole(selectedRole) {
    const { dispatch } = this.props;
    dispatch(updateMemberFormField({ prop: "role", value: selectedRole }));
  }

  disableNextButton() {
    const { errors } = this.props;
    for (let errorId in errors) {
      if (errors.hasOwnProperty(errorId)) {
        if (errors[errorId]) {
          return true;
        }
      }
    }
    return false;
  }
}


const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20
  },
  btnIcon: {
    position: "absolute",
    right: 0
  },
  Picker: {
    margin: 25,
    borderBottomColor: colorSwatch.bombayGray,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  BtnStyle: {
    backgroundColor: "#00A68C",
    width: '100%',
    height: 50,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 25,
    marginBottom: 20,
    zIndex: 0,
    shadowOpacity: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    elevation: 3,
    marginTop: 20
  },
  BtnTxtStyle:{
    fontSize: 18,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
  InputActiveStatus: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#00A68C",
    borderWidth: 2,
    width: "90%",
    color: "#000",
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 3,
    borderRadius: 25
  },
  InputNormalStatus: {
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 0,
    width: "90%",
    color: "#000",
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 4,
    borderRadius: 25
  },
  InputErrorStatus: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: colorSwatch.red,
    borderWidth: 2,
    width: "90%",
    color: "#000",
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 3,
    borderRadius: 25
  },
  inputContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    // height: 83,
    alignItems: "center"
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 0
    //  paddingTop: 20,
    //   paddingBottom:0
  },
  fieldLabel: {
    textAlign: "left",
    fontSize: 18,
    marginLeft: 25,
    marginTop: 10,
    color: '#000'
  },
  notificationLabel: {
    textAlign: "center",
    fontSize: 16,
    color: '#000',
    marginLeft: 25
  },
  switchContainer: {
    position: 'absolute',
    height: 36.5,
    width: 62,
    top: 5.3,
    right: 60,
    borderRadius: 17.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  notificationContainer: {
    marginTop: 0,
    flexDirection: 'row',
    width: deviceWidth,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 60,
  },
  boundaryLine: {
    margin: 25,
    marginTop: 15
  }
});


export default connect(mapStateToProps)(MemberSettingsForm);
