import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    deviceWidth,
    deviceHeight,
    blueGradient,
    NAV_HEIGHT,
    STATUSBAR_HEIGHT,
    colorSwatch,
  } from 'styles/Theme';

const styles = {
    outerContainerStyle: {
        backgroundColor: colorSwatch.white,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'flex-start'
    },
    innerContainerStyle: {
        backgroundColor: colorSwatch.white,
        // position: 'absolute',
        // flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        height: deviceHeight,
        right: 0
    },
    gradientBgStyle: {
        color: blueGradient.colors,
        start: {x: 0.2, y: 0.4},
        end: {x: 1.2, y: 1.0},
    }
};

const CustomBackground = () => (
    <LinearGradient
          start={styles.gradientBgStyle.start}
          end={styles.gradientBgStyle.end}
          colors={styles.gradientBgStyle.color}
          style={[styles.outerContainer]}
          >
          <Text>Great</Text>
    </LinearGradient>
);

export default CustomBackground;
