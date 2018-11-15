import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import Text from '../Text';
import CommonStyles from 'styles/CommonStyles';

export default class AlertDeleteDlTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text header black mediumBold style={{marginBottom: 8, textAlign: 'center'}}>
        {this.props.text}
      </Text>
    );
  }
}
