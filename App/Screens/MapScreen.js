import React, { Component } from 'react';
import { View, Text, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Reactotron from 'reactotron-react-native';
import { Icon } from 'react-native-elements';

import * as LocationAction from '../Actions/LocationAction';
import * as WorkflowAction from '../Actions/WorkflowAction';
import Nav from '../Components/Nav';
import PlaceSearch from '../Components/PlaceSearch';
import eGobie from '../Styles/Egobie';
import Dimension from '../Libs/Dimension';


class MapScreen extends Component {
  delta = 0.01;
  state = {
    height: new Animated.Value(Dimension.height),
    scale: new Animated.Value(0),
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
  };

  constructor(props) {
    super(props);
  }

  selectPlace = () => {
    this.goToLocation(place.latitude, place.longitude);
    this.props.selectPlace(place);
  }

  focus = (showCallout = false) => {
    Animated.timing(this.state.height, {
      toValue: Dimension.height,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      if (showCallout) {
        this.marker.showCallout();
      }
    });
  }

  blur = (hideCallout = true) => {
    Animated.timing(this.state.height, {
      toValue: 128,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      if (hideCallout) {
        this.marker.hideCallout();
      }
    });
  }

  show = () => {
    Animated.timing(this.state.scale, {
      toValue: 1,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  hide = () => {
    Animated.timing(this.state.scale, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  goToLocation = (latitude, longitude) => {
    this.map && this.map.animateToRegion({
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

  goToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.getCurrentLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  goToOrder = () => {
    this.props.changeWorkflow(WorkflowAction.WORK_FLOW_ORDER);
  }

  componentDidMount() {
    this.goToCurrentLocation();
  }

  componentWillReceiveProps(nextProps) {
    this.goToLocation(nextProps.latitude, nextProps.longitude);
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_ORDER:
        this.blur();
        break;

      case WorkflowAction.WORK_FLOW_LOCATION:
        this.focus(true);
        break;
    }
  }

  renderMarker() {
    return (
      <MapView.Marker
        ref = { (ref) => { this.marker = ref; } }
        coordinate = { this.state.currentLocation }
      >
        <MapView.Callout style = {{
          width: Dimension.width * 0.8,
          height: 25,
          padding: 0,
        }} >
          <TouchableWithoutFeedback onPress = { this.goToOrder }>
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
        height: this.state.height,
      }}>
        <View style = {{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {
          <MapView
            ref = { (ref) => { this.map = ref; } }
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
              { scale: this.state.scale },
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
        <PlaceSearch />
        <Nav />
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
    changeWorkflow: (type) => {
      dispatch({ type });
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
