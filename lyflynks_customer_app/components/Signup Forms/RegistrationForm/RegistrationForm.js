import React from "react";
import { View, Text, StyleSheet, Picker, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";

import { Input } from "../../UI";
import { validator } from "../index";
import InputFields from "./inputFieldsConfig.json";
import Roles from "./rolesConfig.json";
import {
  updateMemberFormField,
  updateErrorMessage
} from "../../../actions/member_form";

const mapStateToProps = state => {
  return { ...state.member_form };
};

@connect(mapStateToProps)
class RegistrationForm extends React.Component {
  render() {
    const { instructions, renderInstructions, proceedAhead } = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderInstructions(instructions)}
        <View style={styles.formFieldsContainer}>
          {this.renderInputFields()}
          <Text style={styles.pickerLabel}>Select your Role</Text>
          {this.renderPicker()}
          <Button
            large
            raised
            iconRight={{ name: "trending-flat" }}
            title="Next"
            backgroundColor="#00A68C"
            onPress={proceedAhead}
            disabled={this.disableNextButton()}
          />
        </View>
      </ScrollView>
    );
  }

  renderInputFields() {
    const { dispatch } = this.props;
    return InputFields.map((input, index) => {
      return (
        <View key={input.id}>
          <Input
            value={this.props[input.id]}
            placeholder={input.placeholder}
            setReference={this.bindReferenceToInputFields.bind(this, input)}
            focusNextInput={this.focusNextInput.bind(this, InputFields, index)}
            onChangeText={this.updateInputFieldValue.bind(this, input.id)}
            onBlur={this.updateErrorMessage.bind(this, input)}
          />
          <Text style={styles.errorMessage}>
            {this.props.errors[input.errorId]}
          </Text>
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
      return <Picker.Item label={role} value={role} key={role} />;
    });
  }

  renderPicker() {
    const { dispatch, role } = this.props;
    return (
      <Picker
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
  scrollViewContainer: {
    backgroundColor: "white",
    alignItems: "center"
  },
  formFieldsContainer: {
    width: "100%"
  },
  errorMessage: {
    color: "red",
    alignSelf: "center"
  },
  pickerLabel: {
    textAlign: "center",
    fontSize: 18
  }
});

export { RegistrationForm };
