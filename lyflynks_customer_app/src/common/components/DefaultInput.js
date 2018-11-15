import React from "react";
import { TextInput, StyleSheet } from "react-native";

const DefaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#0E3A53',
    borderWidth: 1,
    width: '90%',
    margin: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: "red"
  }
});

export default DefaultInput;
