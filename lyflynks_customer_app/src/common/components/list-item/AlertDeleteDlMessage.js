import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import Text from '../Text';
import CommonStyles from 'styles/CommonStyles';

export default class AlertDeleteDlMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text normal grey regular style={{textAlign: 'center'}}>
        {this.props.frontText}
        <Text> </Text>
        <Text style={CommonStyles.softBlueColor}>
          {this.props.highlightText}
        </Text>
        <Text> </Text>
        {this.props.behindText}
      </Text>
    );
  }
}
