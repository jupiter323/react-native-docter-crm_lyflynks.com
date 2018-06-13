import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../components/UI";
import { connect } from 'react-redux';
import { member_account } from '../actions/auth';
import NewMemberWizardFormFirstStep from '../components/Signup Forms/NewMemberWizardForm/NewMemberWizardFormFirstStep'
import NewMemberWizardFormLastStep from '../components/Signup Forms/NewMemberWizardForm/NewMemberWizardFormLastStep'
import ResetPasswordForm from '../components/Signup Forms/ResetPasswordForm/ResetPasswordForm'
import INSTRUCTIONS_FOR_NEWMEMBERWIZARD_FORM from '../components/Signup Forms/NewMemberWizardForm/instructions'


const mapStateToProps = state => {
  return { ...state.member_form };
};
@connect(mapStateToProps)

export default class NewMemberWizard extends Component {
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


  createAccount(data){
    console.log(data)
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
          <ResetPasswordForm
            instructions={INSTRUCTIONS_FOR_NEWMEMBERWIZARD_FORM}
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
          />
        );
      case 2:
        return (
          <NewMemberWizardFormFirstStep
            instructions="First we need to know a little bit about you."
            renderInstructions={this.renderInstructions}
            proceedAhead={this.renderNextScreen}
          />
        );
      case 3:
        return (
          <NewMemberWizardFormLastStep
            instructions="Describe your relationship widh (Elder)"
            renderInstructions={this.renderInstructions}
            proceedAhead={this.createAccount(this.props)}
          />
        );
      default:
        return (
          <ResetPasswordForm
            instructions={INSTRUCTIONS_FOR_NEWMEMBERWIZARD_FORM}
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionContainer: {
    backgroundColor: "#2196F3"
  },
  instructionStyles: {
    fontSize: 16,
    color: "white"
  }
});
