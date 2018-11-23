import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  colorSwatch,
  fontSize,
  fontFamily,
} from 'styles/Theme';

const SwipeoutButton = (props: any) => (
    <View style={[styles.btnCont]}>
      <Icon
        name="md-close"
        size={30}
        color={'#fff'}
        style={{backgroundColor: 'transparent'}}
      />
      {props.children}
    </View>
);

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

export default SwipeoutButton;