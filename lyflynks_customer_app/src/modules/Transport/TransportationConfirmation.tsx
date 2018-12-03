import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import GradientNavigationBar from 'components/GradientNavigationBar';
import Button from 'componentsLib/Button';
import moment from 'moment';
import {
  colorSwatch,
  fontSize,
  fontFamily,
} from 'styles/Theme';
import { resetTransportation } from './action';
import { CheckInIcon } from 'components/icons';

class TransportationConfirmation extends React.Component  {
  backToHomePressed = () => {
    const { dispatch } = this.props;
    this.props.navigation.popToTop();
    dispatch(resetTransportation());
  }

  render() {
    return (
      <View style={styles.container}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Ride Requested'
          back={false}
          />

        <View style={styles.innerContainer}>
          <View style={styles.checkmarkContainer}>
            <CheckInIcon style={styles.checkmark} color={colorSwatch.caribbeanGreen} />
          </View>
          <Text style={styles.header}>Your ride has been requested.</Text>
          <Text style={styles.text}>Pickup Time: {moment(this.props.transportationDate).format('MM/DD/YYYY hh:mm a')}</Text>
          <Text style={styles.text}>Pickup Address: {this.props.originAddress}</Text>
          <Text style={styles.text}>Destination: {this.props.destinationAddress}</Text>
          <Text style={styles.text}>Estimate: {this.props.rideEstimate}</Text>
          { this.props.specialNeedsRequired &&
            <Text style={styles.text}>Special Needs: Yes</Text>
          }
        </View>

        <View style={styles.button}>
          <Button primary
            title='Done'
            onPress={ () => this.backToHomePressed() } />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkmarkContainer: {
    width: 80,
    height: 80,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  checkmark: {
    width: 80,
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -50,
    paddingHorizontal: 20
  },
  header: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.header,
    color: colorSwatch.edenBlue,
    marginBottom: 50,
    textAlign: 'center'
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.medium,
    color: colorSwatch.codGray,
    marginBottom: 10,
    textAlign: 'left',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10
  }
});

const mapStateToProps = (state) => ({
  specialNeedsRequired: state.transport.specialNeedsRequired,
  originAddress: state.transport.originAddress,
  originCoordinates: state.transport.originCoordinates,
  destinationAddress: state.transport.destinationAddress,
  destinationCoordinates: state.transport.destinationCoordinates,
  transportationDate: state.transport.transportationDate,
  rideEstimate: state.transport.rideEstimate,
  rideSaved: state.transport.rideSaved,
  token: state.auth.member_account.data
});

export default connect(mapStateToProps, null)(TransportationConfirmation);
