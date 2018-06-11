import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../components/UI";
import {
  RegistrationForm,
  PrefferedDayTimeForm,
  InviteOthersForm,
  SignupComplete,
  TEXT_FOR_PREFERRED_DAY_TIME_FORM,
  INSTRUCTIONS_FOR_REGISTRATION_FORM,
  TEXT_FOR_INVITATION_FORM,
  INSTRUCTIONS_FOR_SIGNUP_COMPLETE
} from "../components/Signup Forms";

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = { step: 1 };
    this.renderNextScreen = this.renderNextScreen.bind(this);
  }

  renderInstructions(instructions) {
    return (
      <Card style={styles.instructionContainer}>
        <Text style={styles.instructionStyles}>{instructions}</Text>
      </Card>
    );
  }

  renderNextScreen() {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 25 }}>
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
            instructions={TEXT_FOR_PREFERRED_DAY_TIME_FORM}
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
          />
        );
      case 3:
        return (
          <InviteOthersForm
            instructions={TEXT_FOR_INVITATION_FORM}
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
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
    backgroundColor: "#2196F3"
  },
  instructionStyles: {
    fontSize: 16,
    color: "white"
  }
});
