import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { INSTRUCTIONS_FOR_SIGNUP_COMPLETE } from "./instructions";

class SignupComplete extends React.Component {
  navigateToLogin() {
    const { navigation } = this.props;
    navigation.navigate("MemberLogin");
  }

  render() {
    const { instructions, renderInstructions } = this.props;
    return (
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionStyles}>{INSTRUCTIONS_FOR_SIGNUP_COMPLETE}</Text>
        <Button
          containerViewStyle={styles.finishButton}
          raised
          backgroundColor="#00A68C"
          iconRight={{ name: "done" }}
          title="Finish"
          onPress={this.navigateToLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructionContainer: {
    marginTop: 160,
    padding: 10,
    flex: 1
  },
  instructionStyles: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: "bold"
  },
  continueButton: {
    marginTop: 30
  },
  finishButton: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    width: 180
  }
});

export { SignupComplete };
