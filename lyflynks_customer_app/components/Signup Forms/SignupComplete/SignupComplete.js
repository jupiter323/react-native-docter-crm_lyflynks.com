import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Card, Button } from "../../UI";

class SignupComplete extends React.Component {
  render() {
    const { instructions, renderInstructions } = this.props;
    return (
      <View
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderInstructions(instructions)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "white",
    alignItems: "center"
  }
});

export { SignupComplete };
