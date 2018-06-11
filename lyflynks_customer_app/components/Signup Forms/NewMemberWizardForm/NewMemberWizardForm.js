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
import { Input, Card, Button } from "../../UI";
import { connect } from "react-redux";
import { updateValue } from "../../../actions/member_form";
import { signup } from "../../../actions/members_signup";
import Color from "color";
import InputFields from "./inputFieldsConfig.json";
import Roles from "./rolesConfig.json";

const mapStateToProps = state => {
  return ({
    firstName,
    lastName,
    userName,
    email,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    zipCode,
    role
  } = state.accountCreationForm);
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

  renderInputFields() {
    const { dispatch } = this.props;
    return InputFields.map((input, index) => {
      return (
        <Input
          key={input.id}
          setReference={inputElement => (this[input.id] = inputElement)}
          onChangeText={value =>
            dispatch(updateValue({ prop: input.id, value }))
          }
          value={this.props[input.id]}
          focusNextInput={() =>
            this.getNextInputFieldReference(InputFields, index)
          }
          placeholder={input.placeholder}
        />
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
        <Button style={styles.nextButton} onPress={proceedAhead}>
          Next
        </Button>
      </ScrollView>
    );
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
            dispatch(updateValue({ prop: "role", value: selectedRole }))
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
          updateValue({ prop: "role", value: options[selectedRoleIndex] })
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
    marginTop: 20
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
