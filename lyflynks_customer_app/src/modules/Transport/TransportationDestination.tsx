import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import Screen from 'components/Screen';
import { connect } from 'react-redux';
import GradientNavigationBar from 'components/GradientNavigationBar';
import Button from 'componentsLib/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import LocationAutocomplete from './LocationAutocomplete'
import { destinationUpdated } from './action';
import {
    colorSwatch
  } from 'styles/Theme';

const GOOGLE_MAPS_API_KEY = "AIzaSyB2wrnLJa4_WcPqbe0K6CtYOGxT2Y8vTY4";

class TransportationDestination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapBounds: null
    }
  }

  regionContainingPoints(points) {
    var minX, maxX, minY, maxY;

    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    var midX = (minX + maxX) / 2;
    var midY = (minY + maxY) / 2;
    var midPoint = [midX, midY];

    var deltaX = (maxX - minX);
    var deltaY = (maxY - minY);

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX * 1.2,
      longitudeDelta: deltaY * 1.2
    };
  }

  destinationSelected = (location) => {
    const { dispatch } = this.props;

    const newDestination = {
      latitude: location.geometry.location.lat,
      longitude: location.geometry.location.lng
    };

    dispatch(destinationUpdated(newDestination, location.formatted_address));

    const mapBounds = this.regionContainingPoints([this.props.originCoordinates, newDestination]);
    this.setState({
      mapBounds: mapBounds,
    });
  }

  onMapViewDirectionsReady = (result) => {
    const mapBounds = this.regionContainingPoints(result.coordinates);
    this.setState({
      mapBounds: mapBounds
    });
  }

  renderNextScreen = () => {
    this.props.navigation.navigate('TransportationEstimate');
  }

  render() {
    return (
      <View style={styles.container}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Enter a Destination'
          back={true}
          />

        <View style={styles.innerContainer}>
          { this.props.originCoordinates && this.props.destinationCoordinates && this.state.mapBounds &&
            <MapView style={styles.mapview} region={{
              latitude: this.state.mapBounds.latitude,
              longitude: this.state.mapBounds.longitude,
              latitudeDelta: this.state.mapBounds.latitudeDelta,
              longitudeDelta: this.state.mapBounds.longitudeDelta
            }}>
              <MapView.Marker
                coordinate={this.props.originCoordinates}
                pinColor={colorSwatch.caribbeanGreen}
                title={this.props.originAddress}
                onLoad={() => this.forceUpdate()}
              />
              <MapView.Marker
                coordinate={this.props.destinationCoordinates}
                pinColor={colorSwatch.caribbeanGreen}
                title={this.props.destinationAddress}
                onLoad={() => this.forceUpdate()}
              />
              <MapViewDirections
                origin={this.props.originCoordinates}
                destination={this.props.destinationCoordinates}
                strokeWidth={5}
                strokeColor={colorSwatch.caribbeanGreen}
                apikey={GOOGLE_MAPS_API_KEY}
                onReady={(result) => this.onMapViewDirectionsReady(result)}
              />
            </MapView>
          }
          <View style={styles.searchbar}>
            <LocationAutocomplete
              location={this.props.destinationCoordinates}
              onLocationSelect={this.destinationSelected} />
          </View>

          <View style={styles.button}>
            <Button primary
              title='Continue'
              disabled={!this.props.destinationCoordinates}
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
  originCoordinates: state.transport.originCoordinates,
  destinationAddress: state.transport.destinationAddress,
  destinationCoordinates: state.transport.destinationCoordinates
});

export default connect(mapStateToProps, null)(TransportationDestination);
