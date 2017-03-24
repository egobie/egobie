import React, { Component } from 'react';
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

import MapView from 'react-native-maps';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';

import PlaceSearch from '../Components/PlaceSearch';
import Callout from '../Components/Callout';
import eGobie from '../Styles/Egobie';
import Dimension from '../Libs/Dimension';


class MapScreen extends Component {
  delta = 0.01;
  animation = {
    height: new Animated.Value(Dimension.height),
    scale: new Animated.Value(0),
  };
  state = {
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
  };

  constructor(props) {
    super(props);
    this.focus = this._focus.bind(this);
    this.blur = this._blur.bind(this);
    this.show = this._show.bind(this);
    this.hide = this._hide.bind(this);
    this.goToLocation = this._goToLocation.bind(this);
    this.goToCurrentLocation = this._goToCurrentLocation.bind(this);
    this.selectPlace = this._selectPlace.bind(this);
  }

  _selectPlace(place) {
    this.goToLocation(place.latitude, place.longitude);
    this.props.selectPlace(place);
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
      toValue: 128,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  _show() {
    Animated.timing(this.animation.scale, {
      toValue: 1,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  _hide() {
    Animated.timing(this.animation.scale, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  _goToLocation(latitude, longitude) {
    this.refs.map && this.refs.map.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: this.delta,
      longitudeDelta: this.delta,
    });
    this.setState({
      currentLocation: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  }

  _goToCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.goToLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  componentDidMount() {
    this.show();
    this.goToCurrentLocation();
  }

  renderMarker() {
    return (
      <MapView.Marker coordinate = { this.state.currentLocation } >
        <MapView.Callout style = {{
          width: Dimension.width * 0.8,
          height: 25,
          padding: 0,
        }}>
          <Callout location = { '414 Hackensack Ave' }/>
        </MapView.Callout>
      </MapView.Marker>
    );
  }

  render() {
    return (
      <Animated.View style = {{
        height: this.animation.height,
      }}>
        <View style = {{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {
          <MapView
            ref = { 'map' }
            showsUserLocation = { false }
            showsMyLocationButton = { false }
            followsUserLocation = { true }
            loadingEnabled = { true }
            loadingIndicatorColor = { eGobie.EGOBIE_WHITE }
            loadingBackgroundColor = { eGobie.EGOBIE_SHADOW }
            style = {{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            { this.renderMarker() }
          </MapView>
        }
        </View>
        <TouchableWithoutFeedback onPress = { this.goToCurrentLocation }>
          <Animated.View style = {{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            right: 10,
            bottom: 100,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: eGobie.EGOBIE_WHITE,
            transform: [
              { scale: this.animation.scale },
            ],
          }}>
            <Icon
              type = { 'material' }
              name = { 'my-location' }
              size = { 16 }
              iconStyle = {{
                color: eGobie.EGOBIE_BLACK,
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <PlaceSearch
          ref = { 'placeSearch' }
          selectPlace = { this.selectPlace }
        />
      </Animated.View>
    );
  }
}

MapScreen.propTypes = {
  selectPlace: React.PropTypes.func.isRequired,
}


export default MapScreen;
