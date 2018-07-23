import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Picker } from "react-native";
import { ListItem, Card, Text, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Input } from "../../UI";
import InputFields from "./inputFieldsConfig.json";
import activitiesFields from "./activitiesFieldsConfig.json";
import Roles from "./rolesConfig.json";
import { updateMemberFormField, updateErrorMessage } from "../../../actions/member_form";

import _ from "lodash";
import { updateEntity } from "../../../actions/member_form";
import { signUpAccount } from "../../../actions/accounts";

const mapStateToProps = state => {
  const memberData = state.auth.member.data;
  if (memberData === undefined) {
    return { ...state.member_form };
  } else {
    const userToken = memberData["token"];
    return { ...state.member_form, userToken };
  }
};

@connect(mapStateToProps)
export default class NewMemberWizardForm extends Component {
  render() {
    this.state = {
      checked: false
    };
    const { instructions, renderInstructions, proceedAhead, creatingAccount } = this.props;
    return (
      <ScrollView>
        <View style={styles.formFieldsContainer}>
          {renderInstructions(instructions)}
          <Text style={styles.label}>Describe your relationship with {this.props.username} </Text>
          <View style={styles.picker}>{this.renderPicker()}</View>
          <Text style={styles.label}>
            Now tell us a little about the caregiving activities that you are able to provide for {this.props.username}
          </Text>
          {this.renderActivitiesList()}
          <Button
            large
            raised
            title="Done"
            loading={creatingAccount === true}
            backgroundColor="#00A68C"
            buttonStyle={styles.nextButton}
            onPress={this.signUpAccount.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }

  signUpAccount() {
    const {
      dispatch,
      firstName,
      lastName,
      userName,
      password,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      relationship,
      activities,
      userToken
    } = this.props;
    const member = {
      firstName,
      lastName,
      userName,
      password,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      relationship,
      activities
    };
    dispatch(signUpAccount(member, this.props.userToken));
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
    const { dispatch, relationship } = this.props;
    return (
      <Picker selectedValue={relationship} onValueChange={this.setSelectedRole.bind(this)}>
        {this.renderPickerItems(ROLES)}
      </Picker>
    );
  }

  setSelectedRole(selectedRole) {
    const { dispatch } = this.props;
    dispatch(updateMemberFormField({ prop: "relationship", value: selectedRole }));
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
