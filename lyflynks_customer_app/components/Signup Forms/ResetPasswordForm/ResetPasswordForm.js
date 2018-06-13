import React, { Component } from 'react';
import { View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Button
} from 'react-native';
import { connect } from "react-redux";
import { Input } from "../../UI";
import InputFields from "./inputFieldsConfig.json";
import {
  updateMemberFormField,
  updateErrorMessage
} from "../../../actions/member_form";

const mapStateToProps = state => {
  return { ...state.member_form };
};

@connect(mapStateToProps)
export default class ResetPasswordForm extends Component {
  render() {
  const { instructions, renderInstructions, proceedAhead } = this.props;
    debugger;
    return (
      <ScrollView>
        <View style={styles.formFieldsContainer}>
          {this.renderInputFields()}
          <Button
              large
              raised
              iconRight={{ name: "trending-flat" }}
              title="Next"
              backgroundColor="#00A68C"
              onPress={proceedAhead}
            />
        </View>
      </ScrollView>
    );
  }


  renderInputFields(){
    const { dispatch } = this.props;
    return InputFields.map((input, index) => {
      return (
        <View key={input.id}>
          <Input
            value={this.props[input.id]}
            placeholder={input.placeholder}
            onChangeText={this.updateInputFieldValue.bind(this, input.id)}
            secureTextEntry={true}
          />
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
  scrollViewContainer: {
    backgroundColor: "white",
    alignItems: "center"
  },
  formFieldsContainer: {
    width: "100%",
  },
  label: {
    fontSize: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  picker: {
    width: '90%',
    borderColor: "#0E3A53",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    backgroundColor: '#00A68C',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginLeft: '10%',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#00A68C',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
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
