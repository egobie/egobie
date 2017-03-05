import React, { Component } from 'react';
import { View } from 'react-native';

import MapView from 'react-native-maps';

import PlaceSearch from '../Components/PlaceSearch';
import eGobie from '../Styles/Egobie';


class MapScreen extends Component {

  state = {
    region: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.refs.map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    });
  }

  selectPlace(place) {
    Reactotron.log(place);
  }

  render() {
    return (
      <View style = {{
        flex: 1,
      }}>
        <View style = {{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
          <MapView
            ref = { 'map' }
            showsUserLocation = { true }
            loadingEnabled = { true }
            loadingIndicatorColor = { eGobie.EGOBIE_WHITE }
            loadingBackgroundColor = { eGobie.EGOBIE_SHADOW }
            region = { this.state.region }
            style = {{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </View>
        <PlaceSearch selectPlace = { this.selectPlace.bind(this) } />
      </View>
    );
  }
}

MapScreen.propTypes = {

}

export default MapScreen;
