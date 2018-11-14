import * as React from 'react';
import { View, Text, StyleSheet, StatusBar } from "react-native";
import RegistrationForm from './Signup Forms/RegistrationForm/RegistrationForm';
import { INSTRUCTIONS_FOR_REGISTRATION_FORM }from './Signup Forms/RegistrationForm/instructions';
import PrefferedDayTimeForm from './Signup Forms/PreferrdDayTimeForm/PreferredDayTimeForm';
import { INSTRUCTIONS_FOR_PREFERRED_DAY_TIME_FORM } from './Signup Forms/PreferrdDayTimeForm/instructions'
import INSTRUCTIONS_FOR_INVITATION_FORM from './Signup Forms/InviteOthersForm/instructions';
import InviteOthersForm from './Signup Forms/InviteOthersForm/InviteOthersForm';

import GradientNavigationBar from 'components/GradientNavigationBar';
import CommonStyles from 'styles/CommonStyles';

class Signup extends React.Component {
  constructor(props) {
    super(props);
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
    this.setState({ step: step + 1 }, ()=> {
      console.log('next step', this.state.step);
    });
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Sign up'
          /> 
        {this.getScreenForCurrentStep()}
      </View>
    );
  }

  getScreenForCurrentStep() {
    switch (this.state.step) {
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

export default Signup;

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
