import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../styles/colors";

export class Input extends React.Component {
  render() {
    const { onChangeText, value, placeholder, focusNextInput, setReference } = this.props;
    return (
      <TextInput
        ref={setReference}
        style={styles.textInput}
        placeholderTextColor="black"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={focusNextInput}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    ...colors.textInput,
    borderBottomWidth: 1,
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    marginLeft: 15,
    width: 300
  }
});
