import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { INSTRUCTIONS_FOR_SIGNUP_COMPLETE } from "./instructions";

class SignupComplete extends React.Component {
  render() {
    const { instructions, renderInstructions } = this.props;
    return (
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionStyles}>
          {INSTRUCTIONS_FOR_SIGNUP_COMPLETE}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructionContainer: {
    marginTop: 160,
    padding: 10
  },
  instructionStyles: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: "bold"
  },
  continueButton: {
    marginTop: 30
  }
});

export { SignupComplete };
