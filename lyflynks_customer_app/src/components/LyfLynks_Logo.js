import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";

export default class LyfLynks_Logo extends Component {
  render() {
    return (
      <Image source={require("images/Lyflynks.png")} style={this.props.style} />
    );
  }
}
