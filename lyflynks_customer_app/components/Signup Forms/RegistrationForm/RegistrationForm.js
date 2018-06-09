import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  ActionSheetIOS,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { Input, Card, Button } from "../../UI";
import { validator } from "../index";
import InputFields from "./inputFieldsConfig.json";
import Roles from "./rolesConfig.json";
import {
  updateFormValue,
  updateErrorMessage
} from "../../../actions/member_form";

const mapStateToProps = state => {
  return {
    ...state.accountCreationForm
  };
};
@connect(mapStateToProps)
class RegistrationForm extends React.Component {
  getNextInputFieldReference(arrayOfInputs, currentIndex) {
    const nextInputFieldReference =
      arrayOfInputs.length - 1 === currentIndex
        ? null
        : InputFields[currentIndex + 1].id;
    this.focusNextInput(nextInputFieldReference);
  }

  focusNextInput(nextInputFieldReference) {
    nextInputFieldReference !== null
      ? this[nextInputFieldReference].focus()
      : "";
  }

  validateValue(inputElementName, value) {
    return validator(inputElementName, value);
  }

  renderInputFields() {
    const { dispatch } = this.props;
    return InputFields.map((input, index) => {
      return (
        <View key={input.id}>
          <Input
            value={this.props[input.id]}
            placeholder={input.placeholder}
            setReference={inputElement => (this[input.id] = inputElement)}
            onChangeText={value =>
              dispatch(updateFormValue({ prop: input.id, value }))
            }
            onBlur={() =>
              dispatch(
                updateErrorMessage({
                  prop: input.errorId,
                  value: this.validateValue(input.id, this.props[input.id])
                })
              )
            }
            focusNextInput={() =>
              this.getNextInputFieldReference(InputFields, index)
            }
          />
          <Text style={styles.errorMessage}>
            {this.props.errors[input.errorId]}
          </Text>
        </View>
      );
    });
  }

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
        </View>
        {this.renderPLatformSpecificComponent()}
        <Button
          style={styles.nextButton}
          onPress={proceedAhead}
          disabled={false}
        >
          Next
        </Button>
      </ScrollView>
    );
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

  renderPLatformSpecificComponent() {
    return Platform.OS == "ios" ? this.renderForIOS() : this.renderForAndroid();
  }

  renderForIOS() {
    return (
      <Button
        style={styles.roleButton}
        onPress={this.openActionSheetInIOS.bind(this, ROLES)}
      >
        Describe your Role
      </Button>
    );
  }

  renderForAndroid() {
    const { dispatch } = this.props;
    return (
      <View style={styles.androidPickerConatiner}>
        <Text style={styles.androidPickerLabel}>Role</Text>
        <Picker
          selectedValue="js"
          onValueChange={selectedRole =>
            dispatch(updateFormValue({ prop: "role", value: selectedRole }))
          }
          style={styles.androidPicker}
        >
          {this.renderPickerItemsForAndroid(ROLES)}
        </Picker>
      </View>
    );
  }

  openActionSheetInIOS(options) {
    const { dispatch } = this.props;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1
      },
      selectedRoleIndex =>
        dispatch(
          updateFormValue({ prop: "role", value: options[selectedRoleIndex] })
        )
    );
  }

  renderPickerItemsForAndroid(options) {
    return options.map(role => {
      return <Picker.Item label={role} value={role} key={role} />;
    });
  }
}

const ROLES = Roles["roles"];

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "white",
    alignItems: "center"
  },
  formFieldsContainer: {
    width: "100%",
    marginTop: 0
  },
  errorMessage: {
    color: "red",
    alignSelf: "center"
  },
  roleButton: {
    borderRadius: 5,
    alignSelf: "center",
    width: "90%"
  },
  nextButton: {
    backgroundColor: "#aaf255",
    width: 150,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    borderColor: "#aaf255"
  },
  androidPickerConatiner: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  androidPickerLabel: {
    flex: 0.1
  },
  androidPicker: {
    flex: 0.6
  }
});

export { RegistrationForm };
