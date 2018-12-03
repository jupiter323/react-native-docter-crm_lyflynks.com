import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_MAPS_API_KEY = "AIzaSyB2wrnLJa4_WcPqbe0K6CtYOGxT2Y8vTY4";

class LocationAutocomplete extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      showPlacesList: false
    };
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Enter Pickup Address'
        minLength={2}
        autoFocus={true}
        returnKeyType={'search'}
        listViewDisplayed={this.state.showPlacesList}
        fetchDetails={true}
        renderDescription={(row) => row.description || row.vicinity}
        onPress={(data, details = null) => {
          this.props.onLocationSelect(details);
        }}
        textInputProps={{
          onFocus: () => this.setState({showPlacesList: true}),
          onBlur: () => this.setState({showPlacesList: false}),
        }}
        getDefaultValue={() => ''}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
          types: 'address'
        }}
        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        currentLocation={false}
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch'
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'geocode'
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        predefinedPlaces={[]}
        debounce={200}
      />
    );
  }
}

export default LocationAutocomplete;
