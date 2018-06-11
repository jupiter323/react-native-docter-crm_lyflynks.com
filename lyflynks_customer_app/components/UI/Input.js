import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export class Input extends React.Component {
  render() {
    const {
      onChangeText,
      value,
      placeholder,
      focusNextInput,
      setReference,
      onBlur
    } = this.props;
    return (
      <TextInput
        ref={setReference}
        style={[styles.textInput, this.props.style]}
        placeholderTextColor="black"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={focusNextInput}
        onBlur={onBlur}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderColor: "#0E3A53",
    borderWidth: 1,
    width: "90%",
    margin: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5
  },
  invalid: {
    backgroundColor: "#f9c0c0",
    borderColor: "red"
  }
});

// const styles = StyleSheet.create({
//   textInput: {
//     ...colors.textInput,
//     borderBottomWidth: 1,
//     fontSize: 18,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginBottom: 30,
//     marginLeft: 15,
//     width: 300
//   }
// });
