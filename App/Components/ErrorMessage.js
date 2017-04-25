import React, { Component } from 'react';
import { View, Animated, Text, Easing } from 'react-native';

import * as ErrorAction from '../Actions/ErrorAction';
import Dimensions from '../Libs/Dimension';
import eGobie from '../Styles/Egobie';


class ErrorMessage extends Component {
  state = {
    top: new Animated.Value(-70),
    errorMessage: ' ',
  };
  timer = null;

  constructor(props) {
    super(props);
  }

  show(errorMessage) {
    this.setState({
      errorMessage,
    });
    Animated.timing(this.state.top, {
      toValue: 0,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.hide();
      }, 2000);
    });
  }

  hide() {
    Animated.timing(this.state.top, {
      toValue: -70,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.setState({
        errorMessage: ' ',
      });
    });
  }

  render() {
    return (
      <Animated.View style = {{
        position: 'absolute',
        height: 70,
        width: Dimensions.width,
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        backgroundColor: eGobie.EGOBIE_RED,
        top: this.state.top,
      }}>
        <Text style = {{
          color: eGobie.EGOBIE_WHITE,
        }}>{ this.state.errorMessage }</Text>
      </Animated.View>
    );
  }
}

export default ErrorMessage;
