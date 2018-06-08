import React from "react";
import { View, StyleSheet } from "react-native";

export const Card = props => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 25,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.11,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowColor: "#000"
  }
});
