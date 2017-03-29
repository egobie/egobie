import React, { Component } from 'react';
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Reactotron from 'reactotron-react-native'
const { GooglePlacesAutocomplete } = require('react-native-google-places-autocomplete');

import * as LocationAction from '../Actions/LocationAction';
import * as WorkflowAction from '../Actions/WorkflowAction';
import * as ApiKey from '../Libs/ApiKey';
import eGobie from '../Styles/Egobie';
import BoxShadow from '../Styles/BoxShadow';
import Dimension from '../Libs/Dimension';


class PlaceSearch extends Component {
  animation = {
    height: new Animated.Value(50),
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0.9),
    padding: new Animated.Value(0),
    iconHeight: new Animated.Value(0),
    iconWidth: new Animated.Value(0),
    marginRight: new Animated.Value(0),
  };

  animatedStyle = {
    height: this.animation.height,
    padding: this.animation.padding,
    opacity: this.animation.opacity,
    transform: [
      { scale: this.animation.scale },
    ],
  };

  constructor(props) {
    super(props);
  }

  focus = () => {
    Animated.parallel([
      Animated.timing(this.animation.padding, {
        toValue: 10,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.opacity, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.height, {
        toValue: Dimension.height - 200,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.scale, {
        toValue: 1,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.iconHeight, {
        toValue: 20,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.iconWidth, {
        toValue: 20,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.marginRight, {
        toValue: 15,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }

  blur = () => {
    this.googlePlace.triggerBlur();
    Animated.parallel([
      Animated.timing(this.animation.padding, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.opacity, {
        toValue: 0.9,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.height, {
        toValue: 50,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.scale, {
        toValue: 0.8,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.iconHeight, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.iconWidth, {
        toValue: 0,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(this.animation.marginRight, {
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
          marginRight: this.animation.marginRight,
          width: this.animation.iconWidth,
          height: this.animation.iconHeight,
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
    Animated.timing(this.animation.scale, {
      toValue: 0.8,
      easing: Easing.out(Easing.cubic),
      delay: 500,
    }).start();
  }

  hide = () => {
    Animated.timing(this.animation.scale, {
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
          placeholder = { 'Where can we serve your car' }
          placeholderTextColor = { eGobie.EGOBIE_GREY }
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
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 14,
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

const mapStateToProps = (state) => {
  return {
    workflow: state.workflow.name,
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
