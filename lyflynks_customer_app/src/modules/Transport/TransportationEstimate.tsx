import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import GradientNavigationBar from 'components/GradientNavigationBar';
import Button from 'componentsLib/Button';
import Switch from 'componentsLib/Switch';
import { InfoCard } from '../CheckIn/components';
import { specialNeedsUpdated } from './action';
import { requestTransportation } from './action';
import { rideEstimateUpdated } from './action';
import TransportApi from './api';

import {
  ActivityLogIcon
} from 'components/icons';
import moment from 'moment';

import {
  colorSwatch,
  fontSize,
  fontFamily,
} from 'styles/Theme';

class TransportationEstimate extends React.Component  {
  componentDidMount = async () => {
    this.fetchRideEstimate();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.rideSaved) {
      this.props.navigation.navigate('TransportationConfirmation');
    }
  }

  fetchRideEstimate = async () => {
    const { dispatch } = this.props;
    const response = await TransportApi.getLyftEstimate(this.props.originCoordinates, this.props.destinationCoordinates);
    dispatch(rideEstimateUpdated(response));
  }

  handleOnSpecialNeedsChanged = (value) => {
    const { dispatch } = this.props;
    dispatch(specialNeedsUpdated(value));
  }

  getEstimateText = () => {
    return (this.props.rideEstimate || 'Calculating...');
  }

  requestRide = () => {
    const { dispatch, token } = this.props;

    const params = {
      elder_names: this.props.selectedElders,
      origin_lat: this.props.originCoordinates.latitude,
      origin_long: this.props.originCoordinates.longitude,
      follow_up_method: 'app',
      destination_lat: this.props.destinationCoordinates.latitude,
      destination_long: this.props.destinationCoordinates.longitude,
      special_needs_transport: this.props.specialNeedsRequired,
      origin_address_txt: this.props.originAddress,
      destination_address_txt: this.props.destinationAddress,
      first_requested_date: moment(this.props.transportationDate).toISOString(),
      publish_to_app: true
    };

    console.log("params", params);

    dispatch(requestTransportation(params, token));
  }

  render() {
    return (
      <View style={styles.container}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Ride Estimate'
          back={true}
          />

        <View style={styles.innerContainer}>
          <Text style={styles.text}>Do any of the passengers require special needs transportation?</Text>
          <View style={styles.switchContainer}>
            <Switch value={this.props.specialNeedsRequired} onValueChange={(val) => this.handleOnSpecialNeedsChanged(val)} />
          </View>

          <View>
            <Text style={styles.estimateHeader}>Estimate</Text>
          </View>
          <View>
            <Text style={styles.estimate}>{this.getEstimateText()}</Text>
          </View>
        </View>

        <View style={styles.button}>
          <Button primary
            title='Accept & Confirm Ride'
            onPress={ () => this.requestRide() } />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
    paddingHorizontal: 20
  },
  switchContainer: {
    marginBottom: 70
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.header,
    color: colorSwatch.edenBlue,
    marginBottom: 20,
    textAlign: 'center'
  },
  estimateHeader: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.header,
    color: colorSwatch.caribbeanGreen,
    marginBottom: 20,
    textAlign: 'center'
  },
  estimate: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.medium,
    color: colorSwatch.edenBlue,
    textAlign: 'center'
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
  selectedElders: state.transport.selectedElders,
  originAddress: state.transport.originAddress,
  originCoordinates: state.transport.originCoordinates,
  destinationAddress: state.transport.destinationAddress,
  destinationCoordinates: state.transport.destinationCoordinates,
  transportationDate: state.transport.transportationDate,
  rideEstimate: state.transport.rideEstimate,
  rideSaved: state.transport.rideSaved,
  token: state.auth.member_account.data
});

export default connect(mapStateToProps, null)(TransportationEstimate);
