import React from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";

export const Button = props => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[styles.buttonContainer, props.style]}
      underlineColorAndroid="transparent"
    >
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#00A68C",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#00A68C"
  },
  buttonText: {
    fontSize: 24,
    color: "#fff"
  }
});

// buttonContainer: {
//   ...colors.button,
//   paddingVertical: 15,
//   paddingHorizontal: 50,
//   borderRadius: 50,
//   width: 300,
//   shadowOffset: {
//     width: 0,
//     height: 4
//   },
//   shadowRadius: 6,
//   shadowOpacity: 0.21
// },
// buttonText: {
//   color: "#fff",
//   fontWeight: "bold",
//   fontSize: 20,
//   textAlign: "center"
// },
