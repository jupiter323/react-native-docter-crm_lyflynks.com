import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";

export default class LyfLynks_Logo extends Component {
  render() {
    return (
      <Image source={require("../img/Lyflynks.png")} style={this.props.style} />
    );
  }
}
