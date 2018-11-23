import React from 'react';
import { TextInput, StyleSheet } from "react-native";

const Input = (props: any) => (
    <TextInput
        {...props}
        ref={props.setReference}
        style={[styles.textInput, props.style]}
        placeholderTextColor="#c2c2c2"
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        returnKeyType="next"
      />
);

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderColor: "#0E3A53",
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

export default Input;
