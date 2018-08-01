import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../components/UI";
import { connect } from "react-redux";
import { member_account } from "../actions/auth";
import NewMemberWizardFormFirstStep from "../components/Signup Forms/NewMemberWizardForm/NewMemberWizardFormFirstStep";
import NewMemberWizardFormLastStep from "../components/Signup Forms/NewMemberWizardForm/NewMemberWizardFormLastStep";

const mapStateToProps = state => {
  const { username, member, password } = state.auth;
  return { ...state.member_form, username, member, password };
};
@connect(mapStateToProps)
export default class NewMemberWizardScreen extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.member !== this.props.member) {
      this.props.navigation.navigate("MemberAccountLogin");
    }
  }
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

  createAccount(data) {
    console.log(data);
  }

  render() {
    return <View style={{ flex: 1, marginTop: 25 }}>{this.getScreenForCurrentStep()}</View>;
  }

  getScreenForCurrentStep() {
    switch (this.state.step) {
      case 1:
        return (
          <NewMemberWizardFormFirstStep
            instructions="First we need to know a little bit about you."
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
            email={this.props.username}
          />
        );
      case 2:
        return (
          <NewMemberWizardFormLastStep
            instructions="Describe your relationship widh (Elder)"
            renderInstructions={this.renderInstructions}
            proceedAhead={this.createAccount(this.props)}
          />
        );
      default:
        return (
          <NewMemberWizardFormFirstStep
            instructions="First we need to know a little bit about you."
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
          />
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  instructionContainer: {
    backgroundColor: "#2196F3"
  },
  instructionStyles: {
    fontSize: 16,
    color: "white"
  }
});
