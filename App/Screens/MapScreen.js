import React, { Component } from 'react';
import { View, Text, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';

import * as LocationAction from '../Actions/LocationAction';
import * as WorkflowAction from '../Actions/WorkflowAction';
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
    this.goToOrder = this._goToOrder.bind(this);
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
      }
    });
  }

  _goToCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.getCurrentLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  _goToOrder() {
    this.blur();
  }

  componentDidMount() {
    this.show();
    this.goToCurrentLocation();
  }

  componentWillReceiveProps(nextProps) {
    this.goToLocation(nextProps.latitude, nextProps.longitude);
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_ORDER:
        this.blur();
    }
  }

  renderMarker() {
    return (
      <MapView.Marker coordinate = { this.state.currentLocation } >
        <MapView.Callout style = {{
          width: Dimension.width * 0.8,
          height: 25,
          padding: 0,
        }} >
          <TouchableWithoutFeedback onPress={() => {this.blur()} }>
            <View style = {{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style = {{
                flex: 9,
                fontSize: 14,
                color: eGobie.EGOBIE_BLUE,
                height: 25,
                lineHeight: 25,
              }}>
                { this.props.address }
              </Text>
              <View style = {{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 25,
              }}>
                <Icon
                  type = { 'material-community' }
                  name = { 'chevron-right' }
                  color = { eGobie.EGOBIE_BLUE }
                  iconStyle = {{
                    flex: 1,
                    justifyContent: 'center',
                    paddingTop: 1,
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
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
        <PlaceSearch ref = { 'placeSearch' } />
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    latitude: state.location.latitude,
    longitude: state.location.longitude,
    address: state.location.formattedAddress,
    workflow: state.workflow.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: (latitude, longitude) => {
      dispatch({
        type: LocationAction.LOCATION_GET_CURRENT,
        latitude,
        longitude,
      });
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
