import React from 'react';
import { Text, View, Dimensions, Image, StyleSheet } from 'react-native';
import Screen from 'components/Screen';
import { connect } from 'react-redux';
import GradientNavigationBar from 'components/GradientNavigationBar';
import Button from 'componentsLib/Button';
import { TransportIcon } from 'components/icons';
import LocationAutocomplete from './LocationAutocomplete'
import MapView from 'react-native-maps';
import { originUpdated } from './action';
import {
    colorSwatch
  } from 'styles/Theme';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

class TransportationPickup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapBounds: null
    }
  }

  originSelected = (location) => {
    const { dispatch } = this.props;

    const newOrigin = {
      latitude: location.geometry.location.lat,
      longitude: location.geometry.location.lng
    };

    const mapBounds = {
      latitude: newOrigin.latitude,
      longitude: newOrigin.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }

    this.setState({
      mapBounds: mapBounds
    })

    dispatch(originUpdated(newOrigin, location.formatted_address));
  }

  renderNextScreen = () => {
    this.props.navigation.navigate('TransportationDestination');
  }

  render() {
    return (
      <View style={styles.container}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Enter a Pickup Address'
          back={true}
          />

        <View style={styles.innerContainer}>
          { this.props.originCoordinates && this.state.mapBounds &&
            <MapView style={styles.mapview} region={{
              latitude: this.state.mapBounds.latitude,
              longitude: this.state.mapBounds.longitude,
              latitudeDelta: this.state.mapBounds.latitudeDelta,
              longitudeDelta: this.state.mapBounds.longitudeDelta
            }}
            onLoad={() => this.forceUpdate()}
            >
              <MapView.Marker
                coordinate={this.props.originCoordinates}
                pinColor={colorSwatch.caribbeanGreen}
                title={this.props.originAddress}
                onLoad={() => this.forceUpdate()}
              />
            </MapView>
          }

          <View style={styles.searchbar}>
            <LocationAutocomplete
              onLocationSelect={this.originSelected}
              location={this.props.originCoordinates}
               />
          </View>
          <View style={styles.button}>
            <Button primary
              title='Continue'
              disabled={!this.props.originCoordinates}
              onPress={ () => this.renderNextScreen() } />
          </View>
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
    position: 'relative'
  },
  mapview: {
    flex: 1,
  },
  searchbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10
  }
});

const mapStateToProps = (state) => ({
  originAddress: state.transport.originAddress,
  originCoordinates: state.transport.originCoordinates
});

export default connect(mapStateToProps, null)(TransportationPickup);
