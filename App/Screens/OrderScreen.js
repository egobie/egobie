import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import Dimension from '../Libs/Dimension';


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: new Animated.Value(0),
    }
  }

  show() {
    Animated.timing(this.state.translateX, {
      toValue: 0 - Dimension.width,
      duration: 500,
      easing: Easing.out(Easing.cubic)
    }).start();
  }

  render() {
    return (
      <Animated.View style = {{
        width: Dimension.width,
        transform: [
          { translateX: this.state.translateX },
        ],
      }}>
        <Text>New Page</Text>
      </Animated.View>
    );
  }
}