import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
    children: any;
    style?: any;
}

const Card = (props: Props) => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#fff",
    margin: 10,
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

export default Card;