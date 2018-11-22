import React from 'react';
import {
  Dimensions,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Picker,
  Image,
  AsyncStorage
} from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import { Content } from 'native-base';
var { width, height } = Dimensions.get('window');

import { validator } from "util/validator";
import InputFields from "./inputFieldsConfig";
import Roles from "./rolesConfig";
import {
  updateMemberFormField,
  updateErrorMessage
} from "../memberAction";
import Input from '../../../common/componentLib/Input';

const mapStateToProps = state => {
  return { ...state.member_form };
};

class MemberSettingsForm extends React.Component {

  render() {
    return ( 
        <Content>
          <View style={styles.containerStyle}>         
            {this.renderInputFields()}
            <Text style={styles.pickerLabel}>Role</Text>
            {this.renderPicker()}         
            <Button
              style={styles.nextBtn}
              title="Update"
              fontWeight='bold'
              fontFamily='Avenir'
              buttonStyle={{
                backgroundColor: "#00A68C",
                width: '100%',
                height: 50,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 25,
                // elevation: 3,
                marginBottom: 20,
                zIndex: 0,
              }}
              textStyle={{
                fontSize: 18,
                fontFamily: 'Avenir',
                fontWeight: 'bold'
              }}
              containerStyle={{ marginTop: 20 }}
              onPress={() => true}
            />
            <Button
              style={styles.nextBtn}
              title="Reset Password"
              fontWeight='bold'
              fontFamily='Avenir'
              buttonStyle={{
                backgroundColor: "#00A68C",
                width: '100%',
                height: 50,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 25,
                // elevation: 3,
                marginBottom: 5,
                zIndex: 0,
              }}
              textStyle={{
                fontSize: 18,
                fontFamily: 'Avenir',
                fontWeight: 'bold'
              }}
              containerStyle={{ marginTop: 20 }}
              onPress={() => true}
            />
          </View>
        </Content>   
    );
  }

  renderInputFields() {
    const { dispatch } = this.props;
    return InputFields.map((input, index) => {
      return (
        <View key={input.id}>
          <View key={input.id} style={styles.inputContainer}>
            <Input
              value={this.props[input.id]}
              placeholder={input.placeholder}
              style={styles.input}
              setReference={this.bindReferenceToInputFields.bind(this, input)}
              focusNextInput={this.focusNextInput.bind(
                this,
                InputFields,
                index
              )}
              onChangeText={this.updateInputFieldValue.bind(this, input.id)}
              onBlur={this.updateErrorMessage.bind(this, input)}
            />
            <Text style={styles.errorMessage}>
              {this.props.errors[input.errorId]}
            </Text>
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

  updateInputFieldValue(inputFieldId, value) { 
    const { dispatch } = this.props;
    dispatch(updateMemberFormField({ prop: inputFieldId, value }));
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
  }

  renderPickerItems(roles) {
    return roles.map(role => {
      return (
        <Picker.Item label={role.title} value={role.role} key={role.role} />
      );
    });
  }

  renderPicker() {
    const { dispatch, role } = this.props;
    return (
      <Picker
        style={styles.Picker}
        selectedValue={role}
        onValueChange={this.setSelectedRole.bind(this)}
      >
        {this.renderPickerItems(ROLES)}
      </Picker>
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

const ROLES = Roles["roles"];

const styles = StyleSheet.create({
  containerStyle:{
    marginTop:30
  },
  btnIcon: {
    position: "absolute",
    right: 0
  },
  Picker: {
    marginLeft: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  nextBtn: {
    borderRadius: 10,
    shadowOpacity: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    elevation: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#00A68C",
    borderWidth: 1,
    width: "90%",
    color: "#000",
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 2,
    borderRadius: 25
  },
  inputContainer: {
    justifyContent: "center",
    height: 83,
    alignItems: "center"
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 20
  },
  pickerLabel: {
    textAlign: "center",
    fontSize: 18,
    color: '#000'
  }
});


export default connect(mapStateToProps)(MemberSettingsForm);
