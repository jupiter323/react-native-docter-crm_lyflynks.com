import React from "react";
import { View, Text, StyleSheet, Picker, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
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
        <Card containerStyle={styles.formFieldsContainer}>
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
        </Card>
      </ScrollView>
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
    backgroundColor: "#0E3A53",
    alignItems: "center"
  },
  input: {
    height: 40,
    margin: 10,
    backgroundColor: "#fafafa",
    borderColor: "#eeeeee",
    borderWidth: 1,
    width: "100%"
  },
  inputContainer: {
    justifyContent: "center",
    height: 70,
    alignItems: "center"
  },
  formFieldsContainer: {
    width: "100%"
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start"
  },
  pickerLabel: {
    textAlign: "center",
    fontSize: 18
  }
});

export { RegistrationForm };

// import {
//   FormLabel,
//   FormInput,
//   FormValidationMessage
// } from "react-native-elements";

{
  /* <FormLabel>{input.placeholder}</FormLabel>
          <FormInput
            value={this.props[input.id]}
            ref={this.bindReferenceToInputFields.bind(this, input)}
            onChangeText={this.updateInputFieldValue.bind(this, input.id)}
            onBlur={this.updateErrorMessage.bind(this, input)}
            onSubmitEditing={this.focusNextInput.bind(this, InputFields, index)}
            shake={this.props.errors[input.errorId]}
          />
          <FormValidationMessage>
            {this.props.errors[input.errorId]}
          </FormValidationMessage> */
}
