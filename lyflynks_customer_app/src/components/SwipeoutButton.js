import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  colorSwatch,
  fontSize,
  fontFamily,
} from '../styles/Theme';
export default class SwipeoutButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.btnCont]}>
        <Icon
          name="md-close"
          size={30}
          color={'#fff'}
          style={{backgroundColor: 'transparent'}}
        />
        <Text style={styles.btnText}>Delete</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnCont: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8
  },
  btnText: {
    color: colorSwatch.white,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.regular,
    lineHeight: 29,
    textAlign: 'center',
  },
});
