import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {
  Svg,
  LinearGradient
} from 'expo';

import { 
  colors,
  fontSize,
  fontFamily,
} from '../../styles/Theme';

export default class GradientButton extends Component {
  render = () => {
    // Get the shadow settings and give them default values
    const {
      setting: {
        btnWidth = 0,
        btnHeight = 0,
        fontSize = 18,
        shadowHeight = 100,
        backgroundColor = '#4b66ea',
        color = "#000",
        realColor = "#fff",
        style = {}
      },
      onPressButton,
      btnText,
    } = this.props;

    // Define button style
    const styles = StyleSheet.create({
      button: {
        width: btnWidth,
        height: btnHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
      },
      text: {
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize,
        color: '#fff',
      },
    });

    // Return a view ,whose background is a svg picture
    return (
      <View>
        <View
          style={{
            width: btnWidth,
            height: shadowHeight,
            position:"absolute",
            top: -8,
            left: -15,
          }}
        >
          <Image
            source={require('../../assets/images/shadow.png')}
            style={{
              width: btnWidth + 30,
              height: (btnWidth + 30) * 145 / 660,
            }}
          />
        </View>
        {/* { false &&
        <Svg
          width={btnWidth}
          height={shadowHeight}
          style={{position:"absolute",top:0,left:0}}>
          <Svg.Defs>
            <Svg.RadialGradient
              id="grad"
              cx={btnWidth/2}
              cy={btnHeight/2}
              rx={btnWidth/2}
              ry={btnHeight}
            >
              <Svg.Stop
                offset="0"
                stopColor={color}
                stopOpacity="1"
                key={'Linear0'}
              />
              <Svg.Stop
                offset="1"
                stopColor={realColor}
                stopOpacity="1"
                key={'Linear1'}
              />
            </Svg.RadialGradient>
          </Svg.Defs>
          <Svg.Rect
            rx={btnHeight/2}
            ry={btnHeight/2}
            width={btnWidth}
            height={btnHeight*3/2}
            style="stroke:black;stroke-width:0;opacity:0.5"
            fill="url(#grad)"
          />
        </Svg>
        } */}
        <LinearGradient
          start={{x: 0.2, y: 0.4}} end={{x: 1.0, y: 1.0}}
          colors={['rgb(75,102,234)', 'rgb(130,160,247)']}
          style={[styles.button, {position: 'relative'}]}>
          <TouchableHighlight
            underlayColor={'rgb(105,105,105)'}
            style={styles.button}
            onPress={onPressButton}>
            <Text style={styles.text}>{btnText}</Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    )
  }
}
