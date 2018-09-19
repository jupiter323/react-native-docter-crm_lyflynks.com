import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Picker,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { Input } from "../../UI";
import { validator, confirmPasswordValidator } from "../index";
import InputFields from "./inputFieldsConfig.json";
import Roles from "./rolesConfig.json";
import { updateMemberFormField, updateErrorMessage } from "../../../actions/member_form";

const stateMap = (store) => {
  const { member } = state.auth;
  return { ...state.member_form, member };
};

// @connect(mapStateToProps)
class NewMemberWizardFormFirstStep extends Component {
  render() {
    const { username, instructions, renderInstructions, proceedAhead } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.formFieldsContainer}>
              <Text style={styles.label}>Describe your relationship with {this.props.username} </Text>
              {renderInstructions(instructions)}
              {this.renderInputFields()}
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
        </View>
      </KeyboardAvoidingView>
    );
  }

  renderInputFields() {
    const { dispatch, email, member } = this.props;
    return InputFields.map((input, index) => {
      if (input.id === "userName") {
        return (
          <View key={input.id}>
            <Input value={this.props.userName} placeholder={input.placeholder} editable={false} />
            <Text style={styles.errorMessage}>{this.props.errors[input.errorId]}</Text>
          </View>
        );
      } else if (input.id === "confirmPassword") {
        return (
          <View key={input.id}>
            <Input
              value={this.props[input.id]}
              placeholder={input.placeholder}
              onChangeText={this.updateInputFieldValue.bind(this, input.id)}
              setReference={this.bindReferenceToInputFields.bind(this, input)}
              focusNextInput={this.focusNextInput.bind(this, InputFields, index)}
              onBlur={this.validateConfirmPasswordValue.bind(this, input)}
              secureTextEntry
            />
            <Text style={styles.errorMessage}>{this.props.errors[input.errorId]}</Text>
          </View>
        );
      }
      return (
        <View key={input.id}>
          <Input
            value={this.props[input.id]}
            placeholder={input.placeholder}
            onChangeText={this.updateInputFieldValue.bind(this, input.id)}
            setReference={this.bindReferenceToInputFields.bind(this, input)}
            focusNextInput={this.focusNextInput.bind(this, InputFields, index)}
            onBlur={this.updateErrorMessage.bind(this, input)}
          />
          <Text style={styles.errorMessage}>{this.props.errors[input.errorId]}</Text>
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
    const nextInputFieldReference = this.getNextInputFieldReference(InputFields, indexOfCurrentFocusedElement);
    nextInputFieldReference !== null ? this[nextInputFieldReference].focus() : "";
  }

  updateInputFieldValue(inputFieldId, value) {
    const { dispatch } = this.props;
    dispatch(updateMemberFormField({ prop: inputFieldId, value }));
  }

  validateValue(inputElementName, value) {
    return validator(inputElementName, value);
  }

  validateConfirmPasswordValue(input) {
    const { dispatch } = this.props;
    const passwordArray = {
      password: this.props.password,
      confirmPassword: this.props.confirmPassword
    };
    dispatch(
      updateErrorMessage({
        prop: input.errorId,
        value: confirmPasswordValidator(passwordArray)
      })
    );
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
      <Picker selectedValue={role} onValueChange={this.setSelectedRole.bind(this)}>
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
  container: {
    paddingBottom: 50
  },
  formFieldsContainer: {
    width: "100%"
  },
  label: {
    fontSize: 12,
    marginLeft: 15,
    marginRight: 15
  },
  picker: {
    width: "90%",
    borderColor: "#0E3A53",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15
  },
  button: {
    backgroundColor: "#00A68C",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    marginLeft: "10%",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#00A68C"
  },
  buttonText: {
    fontSize: 24,
    color: "#fff"
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


export default connect(stateMap)(NewMemberWizardFormFirstStep);

// export default connect(mapStateToProps)(InviteOthersForm);