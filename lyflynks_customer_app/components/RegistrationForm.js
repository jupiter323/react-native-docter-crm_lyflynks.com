import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  ActionSheetIOS,
  Platform
} from "react-native";
import { Input } from "./Input";
import { Card } from "./Card";
import { Button } from "./Button";
import { connect } from "react-redux";
import { updateValue, signup } from "../actions/account_creation_form";
import Color from "color";

const InputFields = [
  {
    id: "firstName",
    placeholder: "First Name"
  },
  {
    id: "lastName",
    placeholder: "Last Name",
    ref: "lastName"
  },
  {
    id: "userName",
    placeholder: "Username"
  },
  {
    id: "email",
    placeholder: "Email Address"
  },
  {
    id: "primaryPhoneNumber",
    placeholder: "Primary Phone Number"
  },
  {
    id: "secondaryPhoneNumber",
    placeholder: "Secondary Phone Number"
  },
  {
    id: "zipCode",
    placeholder: "Elder's Zip Code"
  }
];

const ROLES = ["Primary Caregiver", "Elder", "Member(other famlily/friend)"];

class RegistrationForm extends React.Component {
  render() {
    const {
      instructions,
      renderInstructions,
      proceedAhead,
      firstName,
      lastName,
      userName,
      email,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      zipCode,
      role
    } = this.props;

    return (
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.textContainer}>
          <Card style={{ backgroundColor: Color("#2196F3").lighten(0.1) }}>
            {renderInstructions(instructions)}
          </Card>
        </View>
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

  renderInputFields() {
    const { updateValue } = this.props;
    return InputFields.map((input, index) => {
      return (
        <Input
          key={input.id}
          setReference={inputElement => (this[input.id] = inputElement)}
          onChangeText={value => updateValue({ prop: input.id, value })}
          value={this.props[input.id]}
          focusNextInput={() =>
            this.getNextInputFieldReference(InputFields, index)
          }
          placeholder={input.placeholder}
        />
      );
    });
  }

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

  renderPLatformSpecificComponent() {
    a = Platform.OS == "ios" ? this.renderForIOS() : this.renderForAndroid();
    return a;
  }

  openActionSheet(options) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          /* destructive action */
        }
      }
    );
  }

  openPickerForAndroid(options) {
    return options.map(role => {
      return <Picker.Item label={role} value={role} key={role} />;
    });
  }

  renderForIOS() {
    return (
      <Button
        style={styles.roleButton}
        onPress={this.openActionSheet.bind(this, ROLES)}
      >
        Describe your Role
      </Button>
    );
  }

  renderForAndroid() {
    return (
      <View style={styles.androidPickerConatiner}>
        <Text style={styles.androidPickerLabel}>Role</Text>
        <Picker selectedValue="js" style={styles.androidPicker}>
          {this.openPickerForAndroid(ROLES)}
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => {
  //debugger;
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

export default connect(
  mapStateToProps,
  { updateValue, signup }
)(RegistrationForm);

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  formFieldsContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  roleButton: {
    borderRadius: 5,
    alignSelf: "center"
  },
  nextButton: {
    backgroundColor: "#aaf255",
    width: 150,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center"
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

// onPress={() => {
//   ActionSheetIOS.showActionSheetWithOptions(
//     {
//       options: [
//         "Primary Caregiver",
//         "Elder",
//         "Member(other famlily/friend)",
//         "Cancel"
//       ],
//       cancelButtonIndex: 3
//     },
//     buttonIndex => {
//       if (buttonIndex === 1) {
//         /* destructive action */
//       }
//     }
//   );
// }}

{
  /* <Picker.Item label="Primary Caregiver" value="java" />
          <Picker.Item label="Elder" value="js" />
          <Picker.Item label="Member(other famlily/friend)" value="jsp" /> */
}
