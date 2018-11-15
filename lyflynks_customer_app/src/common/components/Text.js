import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {
  colorSwatch,
  fontSize,
  lineHeight,
  fontFamily,
} from 'styles/Theme';

class TextElement extends Component {

  constructor(props) {
    super(props);
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <Text
        ref={component => this._root = component} {...this.props}
        style={[
          this.props.extraLarge && {
            fontSize: fontSize.extraLarge
          },
          this.props.title && {
            fontSize: fontSize.title,
            lineHeight: lineHeight.title
          },
          this.props.header && {
            fontSize: fontSize.header,
            lineHeight: lineHeight.header
          },
          this.props.itemHeader && {
            fontSize: fontSize.itemHeader,
            lineHeight: lineHeight.itemHeader
          },
          this.props.medium && {
            fontSize: fontSize.medium
          },
          this.props.normal && {
            fontSize: fontSize.normal,
            lineHeight: lineHeight.normal
          },
          this.props.small && {
            fontSize: fontSize.small,
            lineHeight: lineHeight.small
          },
          this.props.light && { fontFamily: fontFamily.light },
          this.props.regular && { fontFamily: fontFamily.regular },
          this.props.mediumBold && { fontFamily: fontFamily.medium },
          this.props.semiBold && { fontFamily: fontFamily.semiBold },
          this.props.extraBold && { fontFamily: fontFamily.extraBold },

          this.props.white && { color: colorSwatch.white },
          this.props.codGray && { color: colorSwatch.codGray },
          this.props.pampasCream && { color: colorSwatch.pampasCream },
          this.props.dustyGray && { color: colorSwatch.dustyGray },
          this.props.silverSand && { color: colorSwatch.silverSand },
          this.props.red && { color: colorSwatch.red },
          this.props.edenBlue && { color: colorSwatch.edenBlue },
          this.props.indianKhaki && { color: colorSwatch.indianKhaki },
          this.props.persianGreen && { color: colorSwatch.persianGreen },
          this.props.border && { color: colorSwatch.bombayGray },

          this.props.style && this.props.style,
        ]}
      >
        {this.props.children}
      </Text> 
    );
  }
}

export default TextElement;
