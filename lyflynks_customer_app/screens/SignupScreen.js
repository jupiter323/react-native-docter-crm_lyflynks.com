import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Card } from "react-native-elements";

import {
  RegistrationForm,
  PrefferedDayTimeForm,
  InviteOthersForm,
  INSTRUCTIONS_FOR_PREFERRED_DAY_TIME_FORM,
  INSTRUCTIONS_FOR_REGISTRATION_FORM,
  INSTRUCTIONS_FOR_INVITATION_FORM
} from "../components/Signup Forms";

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = { step: 1 };
    this.renderNextScreen = this.renderNextScreen.bind(this);
  }

  renderInstructions(instructions) {
    return (
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionStyles}>{instructions}</Text>
      </View>
    );
  }

  renderNextScreen() {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" hidden={false} />
        {this.getScreenForCurrentStep()}
      </View>
    );
  }

  getScreenForCurrentStep() {
    switch (this.state.step) {
      case 1:
        return (
          <RegistrationForm
            instructions={INSTRUCTIONS_FOR_REGISTRATION_FORM}
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
          />
        );
      case 2:
        return (
          <PrefferedDayTimeForm
            instructions={INSTRUCTIONS_FOR_PREFERRED_DAY_TIME_FORM}
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
            navigation={this.props.navigation}
          />
        );
      case 3:
        return (
          <InviteOthersForm
            instructions={INSTRUCTIONS_FOR_INVITATION_FORM}
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
            navigation={this.props.navigation}
          />
        );
      default:
        return (
          <RegistrationForm
            instructions={INSTRUCTIONS_FOR_REGISTRATION_FORM}
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
          />
        );
    }
  }
}

export default SignupScreen;

const styles = StyleSheet.create({
  instructionContainer: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: "#0E3A53",
    width: "100%"
  },
  instructionStyles: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontWeight: "500"
  }
});
