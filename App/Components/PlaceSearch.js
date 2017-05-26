import React, { Component } from 'react';
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import Reactotron from 'reactotron-react-native'
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import * as LocationAction from '../Actions/LocationAction';
import * as WorkflowAction from '../Actions/WorkflowAction';
import * as ApiKey from '../Libs/ApiKey';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';
import Dimension from '../Libs/Dimension';


const { GooglePlacesAutocomplete } = require('react-native-google-places-autocomplete');

class PlaceSearch extends Component {
  showed = false;
  state = {
    height: new Animated.Value(50),
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0.9),
    padding: new Animated.Value(0),
    iconHeight: new Animated.Value(0),
    iconWidth: new Animated.Value(0),
    marginRight: new Animated.Value(0),
  };

  animatedStyle = {
    height: this.state.height,
    padding: this.state.padding,
    opacity: this.state.opacity,
    transform: [
      { scale: this.state.scale },
    ],
  };

  constructor(props) {
    super(props);
  }

  focus = () => {
    Animated.parallel([
      Animated.timing(this.state.padding, {
        toValue: 10,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.height, {
        toValue: Dimension.height - 200,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.scale, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.iconHeight, {
        toValue: 20,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.iconWidth, {
        toValue: 20,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.marginRight, {
        toValue: 15,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }

  blur = () => {
    this.googlePlace.triggerBlur();
    Animated.parallel([
      Animated.timing(this.state.padding, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0.9,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.height, {
        toValue: 50,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.scale, {
        toValue: 0.8,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.iconHeight, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.iconWidth, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.state.marginRight, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }

  cancelButton = () => {
    return (
      <TouchableWithoutFeedback onPress = { this.blur } >
        <Animated.View style = {{
          top: 4,
          marginRight: this.state.marginRight,
          width: this.state.iconWidth,
          height: this.state.iconHeight,
        }}>
          <Icon
            type = { 'material-community' }
            name = { 'keyboard-backspace' }
            color = { eGobie.EGOBIE_BLACK }
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  choosePlace = (data, detail) => {
    this.blur();
    this.props.choosePlace(detail);
  }

  show = () => {
    this.showed = true;
    Animated.timing(this.state.scale, {
      toValue: 0.8,
      easing: Easing.out(Easing.cubic),
      delay: 500,
    }).start();
  }

  hide = () => {
    this.showed = false;
    Animated.timing(this.state.scale, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.workflow) {
      case WorkflowAction.WORK_FLOW_ORDER:
        this.hide();
        break;

      case WorkflowAction.WORK_FLOW_LOCATION:
        this.show();
        break;
    }
  }

  componentDidMount() {
    this.show();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.showed;
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        width: Dimension.width,
        backgroundColor: 'transparent',
        ...this.animatedStyle,
      }}>
        <GooglePlacesAutocomplete
          ref = { (ref) => { this.googlePlace = ref; } }
          query = {{
            key: ApiKey.GOOGLE_PLACE_KEY,
            language: 'en',
          }}
          autoFocus = { false }
          fetchDetails = { true }
          placeholder = { 'Type Your Address' }
          placeholderTextColor = { eGobie.EGOBIE_GREY }
          predefinedPlaces = { this.props.places }
          minLength = { 2 }
          styles = { styles }
          renderLeftButton = { this.cancelButton }
          onPress = { this.choosePlace }
          textInputProps = {{
            onFocus: this.focus,
          }}
        />
      </Animated.View>
    );
  }
}

const styles = {
  textInputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    height: 50,
    lineHeight: 50,
    borderRadius: 0,
    color: eGobie.EGOBIE_BLACK,
    ...BoxShadow,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 45,
    height: 45,
  },
  predefinedPlacesDescription: {
    color: eGobie.EGOBIE_BLUE,
    lineHeight: 45,
    height: 45,
  },
  listView: {
    marginTop: 15,
    height: 100,
    paddingRight: 10,
    backgroundColor: 'white',
    ...BoxShadow,
  },
  row: {
    padding: 0,
    marginTop: 0,
    paddingLeft: 10,
    height: 45,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  separator: {
    backgroundColor: eGobie.EGOBIE_GREY,
    marginLeft: 10,
  },
  poweredContainer: {
    transform: [
      { scale: 0.8 },
    ],
  },
};


// predefined = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const mapStateToProps = (state) => {
  let places = [
    {
      eGobieId: 1,
      description: 'Kearny Point',
      geometry: {
        location: {
          lat: 40.72450439999999,
          lng: -74.10944999999998,
        },
      },
    },
    {
      eGobieId: 2,
      description: '555 US 1, Iselin',
      geometry: {
        location: {
          lat: 40.5592582,
          lng: -74.30493790000003,
        },
      },
    },
    {
      eGobieId: 3,
      description: '2200 Fletcher, Fort Lee',
      geometry: {
        location: {
          lat: 40.8600983,
          lng: -73.9719454,
        },
      },
    },
    {
      eGobieId: 4,
      description: '333 Meadowlands, Secaucus',
      geometry: {
        location: {
          lat: 40.7795858,
          lng: -74.08218390000002,
        },
      },
    },
  ]
  return {
    workflow: state.workflow.name,
    places,
    // places: state.service.places,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    choosePlace: (detail) => {
      dispatch({
        type: LocationAction.LOCATION_SELECT,
        detail,
      });
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(PlaceSearch);
