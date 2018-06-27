import React, { Component } from 'react';
import { View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Picker,
} from 'react-native';
import { ListItem, Card, Text, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Input } from "../../UI";
import InputFields from "./inputFieldsConfig.json";
import activitiesFields from "./activitiesFieldsConfig.json";
import Roles from "./rolesConfig.json";
import {
  updateMemberFormField,
  updateErrorMessage
} from "../../../actions/member_form";

import _ from "lodash";
import { updateEntity } from "../../../actions/member_form";

const mapStateToProps = state => {
  return { ...state.member_form };
};

@connect(mapStateToProps)
export default class NewMemberWizardForm extends Component {

  render() {
    this.state = {
      checked: false,
    }
    const { instructions, renderInstructions, proceedAhead } = this.props;
    return (
      <ScrollView>
        <View style={styles.formFieldsContainer}>
          {renderInstructions(instructions)}
          <Text style={styles.label}>Describe your relationship with {this.props.username} </Text>
          <View style={styles.picker}>
            {this.renderPicker()}
          </View>
          <Text style={styles.label}>Now tell us a little about the caregiving activities that you are able to provide for {this.props.username}</Text>
          {this.renderActivitiesList()}
          <Button
              large
              raised
              title="Done"
              backgroundColor="#00A68C"
              onPress={proceedAhead}
            />
        </View>
      </ScrollView>
    );
  }


  renderActivitiesList() {
    const { activities } = this.props;
    return _.map(activities, (activity, key) => {
      return (
        <ListItem
          key={key}
          title={activity.title}
          switchButton
          hideChevron
          switched={activity.selected}
          onSwitch={this.updateEntity.bind(this, "activities", key, activity)}
        />
      );
    });
  }


  updateEntity(entityType, key, entity) {
    const { dispatch } = this.props;
    dispatch(updateEntity({ entityType, key, selected: !entity.selected }));
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
