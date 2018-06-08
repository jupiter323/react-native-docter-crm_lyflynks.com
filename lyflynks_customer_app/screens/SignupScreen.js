import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../components/UI";
import {
  RegistrationForm,
  PrefferedDayTimeForm,
  InviteOthersForm,
  TEXT_FOR_PREFERRED_DAY_TIME_FORM,
  INSTRUCTIONS_FOR_REGISTRATION_FORM,
  TEXT_FOR_INVITATION_FORM
} from "../components/Signup Forms";

class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = { step: 1 };
    this.renderNextScreen = this.renderNextScreen.bind(this);
  }

  renderInstructions(instructions) {
    const _instructions = instructions.map(instruction => {
      return (
        <Text key={instruction.id} style={styles.instructionStyles}>
          {instruction.text}
        </Text>
      );
    });
    return (
      <Card style={styles.instructionContainer}>
        <Text>{_instructions}</Text>
      </Card>
    );
  }

  renderNextScreen() {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>{this.getScreenForCorrespondingStep()}</View>
    );
  }

  getScreenForCorrespondingStep() {
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
    fontSize: 14,
    color: "white"
  }
});

// import {
//   InviteOthersForm,
//   TEXT_FOR_INVITATION_FORM
// } from "../components/InviteOthersForm";
// import {
//   INSTRUCTIONS_FOR_REGISTRATION_FORM,
//   RegistrationForm
// } from "../components/RegistrationForm";
// import {
//   TEXT_FOR_PREFERRED_DAY_TIME_FORM,
//   PrefferedDayTimeForm
// } from "../components/PreferrdDayTimeForm";
