import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { connect } from "react-redux";
import { Content } from 'native-base';
import { validator, secondaryPhonenumberValidator } from "util/validator";
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
import { colorSwatch, deviceWidth } from 'styles/Theme';
import { SwitchCustom, Button, Input, BoundaryLine, DropdownMenu } from 'componentsLib';
import notificationsConfig from './notificationsConfig';
import CloseIcon from 'components/icons/CloseIcon';
import Check from 'components/icons/Check';

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
          <View style={styles.firstBtnContainer}>
            <Button primary onPress={() => true} title="UPDATE" btnStyle={styles.BtnStyle} txtStyle={styles.BtnTxtStyle} />
          </View>
          <View style={styles.secondBtnContainer}>
            <Button primary onPress={() => true} title="RESET PASSWORD" btnStyle={styles.BtnStyle} txtStyle={styles.BtnTxtStyle} />
          </View>
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
            <View key={input.id} style={styles.inputSubContainer}>
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

              <View style={styles.inputIconContainerStyle}>
                {this.props.inputStatus[input.statusId] == ERROR_STATUS ? <CloseIcon style={styles.inputIconStyle} color='red' /> : this.props.inputStatus[input.statusId] == SUCCESS_STATUS ? <Check style={styles.inputIconStyle} color={colorSwatch.persianGreen} /> : null}
              </View>
            </View>
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>
                {this.props.inputStatus[input.statusId] == ERROR_STATUS ? this.props.errors[input.errorId] : null}
              </Text>
            </View>

          </View>
        </View>
      );
    });
  }

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
    dispatch(updateMemberFormField({ prop: inputField.id, value })).then(() => {
      dispatch(updateInputStatus(
        {
          prop: inputField.statusId,
          value: this.validateValue(inputField.id, this.props[inputField.id]) ? ACTIVE_STATUS : SUCCESS_STATUS
        }
      )
      )
    })

  }

  validateValue(inputElementName, value) {
    if (inputElementName == "secondaryPhoneNumber") return secondaryPhonenumberValidator(inputElementName, value);
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

  renderPicker() {
    const { role } = this.props;
    return (
      <DropdownMenu
        style={styles.Picker}
        bgColor={'white'}
        tintColor={colorSwatch.bombayGray}
        activityTintColor={colorSwatch.persianGreen}
        titleStyle={styles.dropdownTitle}
        handler={(selection, row) => this.setSelectedRole(Roles['roles'][selection][row])}
        data={Roles['titles']}
        panelAbsoluteStyle={styles.dropdownPanelStyle}
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
  dropdownPanelStyle: {
    top: 46
  },
  dropdownTitle: {
    color: colorSwatch.bombayGray
  },
  Picker: {
    margin: 25,
    borderBottomColor: colorSwatch.bombayGray,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  firstBtnContainer: {
    flex: 1,
    marginTop: 25
  },
  secondBtnContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 30
  },
  BtnStyle: {
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
  InputActiveStatus: {
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
  inputIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    position: 'absolute',
    right: 0,
    shadowRadius: 2,
    shadowOpacity:0.1,
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
    marginTop: 20,
    marginRight: 25,
    alignItems: "center"
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
    height: 10,
    marginTop: 5,
    marginBottom:1
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 0
  },
  fieldLabel: {
    textAlign: "left",
    fontSize: 18,
    marginLeft: 25,
    marginTop: 10,
    zIndex:0,
    color: '#000'
  },
  notificationLabel: {
    textAlign: "center",
    fontSize: 16,
    color: '#000',
    marginLeft: 25
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
