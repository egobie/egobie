import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import MapView from 'react-native-maps';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';

import PlaceSearch from '../Components/PlaceSearch';
import eGobie from '../Styles/Egobie';


class MapScreen extends Component {

  state = {
    region: {},
  };
  delta = 0.01;

  constructor(props) {
    super(props);
    this.goToCurrentLocation = this._goToCurrentLocation.bind(this);
  }

  componentDidMount() {
    this.goToCurrentLocation();
  }

  selectPlace(place) {
    Reactotron.log(place);
  }

  onPress(place) {
    
  }

  _goToCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.refs.map && this.refs.map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: this.delta,
        longitudeDelta: this.delta,
      });
    });
  }

  render() {
    return (
      <View style = {{
        flex: 1,
      }} onPress = { () => { Reactotron.log('click') } } >
        <View style = {{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {
          <MapView
            ref = { 'map' }
            showsUserLocation = { true }
            followsUserLocation = { true }
            loadingEnabled = { true }
            loadingIndicatorColor = { eGobie.EGOBIE_WHITE }
            loadingBackgroundColor = { eGobie.EGOBIE_SHADOW }
            region = { this.state.region }
            onPress = { this.onPress.bind(this) }
            style = {{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        }
        </View>
        <TouchableWithoutFeedback onPress = { this.goToCurrentLocation }>
          <View style = {{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            right: 10,
            bottom: 100,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: eGobie.EGOBIE_WHITE
          }}>
            <Icon
              type = { 'material' }
              name = { 'my-location' }
              size = { 16 }
              iconStyle = {{
                color: eGobie.EGOBIE_BLACK,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <PlaceSearch selectPlace = { this.selectPlace.bind(this) } />
      </View>
    );
  }
}

MapScreen.propTypes = {

}

export default MapScreen;
