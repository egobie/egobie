import React, { Component } from 'react';
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

import MapView from 'react-native-maps';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';

import PlaceSearch from '../Components/PlaceSearch';
import eGobie from '../Styles/Egobie';
import Dimension from '../Libs/Dimension';


class MapScreen extends Component {
  state = {
    region: {},
  };
  delta = 0.01;
  animation = {
    height: new Animated.Value(Dimension.height),
  };

  constructor(props) {
    super(props);
    this.focus = this._focus.bind(this);
    this.blur = this._blur.bind(this);
    this.goToCurrentLocation = this._goToCurrentLocation.bind(this);
  }

  selectPlace(place) {
    Reactotron.log(place);
  }

  onPress(place) {
    
  }

  _focus() {
    Animated.timing(this.animation.height, {
      toValue: Dimension.height,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.refs.placeSearch.show();
    });
  }

  _blur() {
    this.refs.placeSearch.hide();
    Animated.timing(this.animation.height, {
      toValue: 150,
      easing: Easing.out(Easing.cubic),
    }).start();
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

  componentDidMount() {
    // this.goToCurrentLocation();
    this.blur();
  }

  render() {
    return (
      <Animated.View style = {{
        height: this.animation.height,
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
        <PlaceSearch
          ref = { 'placeSearch' }
          selectPlace = { this.selectPlace.bind(this) }
        />
      </Animated.View>
    );
  }
}

MapScreen.propTypes = {

}

export default MapScreen;
