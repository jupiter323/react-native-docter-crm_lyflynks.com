import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import GradientNavigationBar from 'components/GradientNavigationBar';
import Button from 'componentsLib/Button';
import colors from "styles/colors";
import {
  colorSwatch,
  fontSize,
  fontFamily,
} from 'styles/Theme';

class TransportationIntroScreen extends React.Component  {
  renderNextScreen = () => {
    this.props.navigation.navigate('SelectElders')
  }

  render() {
    return (
      <View style={styles.container}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Transportation'
          back={true}
          />

        <View style={styles.innerContainer}>
          <Text style={styles.text}>Transportation for your loved ones.</Text>
          <Text style={styles.text}>Where you need it, when you need it.</Text>

          <TouchableHighlight
            onPress={() => this.renderNextScreen()}
            style={styles.buttonContainer}
            underlayColor={colors.buttonUnderlay}
          >
            <Text style={styles.buttonText}>Request a Ride</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
    paddingHorizontal: 20
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.medium,
    color: colorSwatch.edenBlue,
    marginBottom: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    ...colors.button,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
    width: 300,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 6,
    shadowOpacity: 0.21
  },
  buttonText: {
    color: "#fff",
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
    textAlign: "center",
    elevation: 3,
  }
});

export default TransportationIntroScreen;
